#include <cstdint>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <cassert>

#include <node_api.h>
#include "napi.h"

typedef void (*callback_t)(void *, const char *);
extern "C" void randomprime_patch_iso(const char *, void *, callback_t);

class PatcherWorker : public Napi::AsyncWorker
{
  std::string m_json;
  std::string m_finalMessage;

public:
  PatcherWorker(std::string &&json, Napi::Function cb)
    : Napi::AsyncWorker(cb, "patchRandomizedGame"), m_json(json)
  { }

private:
  void Execute()
  {
    randomprime_patch_iso(m_json.c_str(), (void*)this, [](void *self, const char *data) {
        PatcherWorker* this_ = (PatcherWorker*)self;
        this_->m_finalMessage = data;
    });
  }

  void OnOK()
  {
    Napi::HandleScope scope(Env());
    Napi::String s = Napi::String::New(Env(), m_finalMessage);
    Callback().Call(Env().Null(), {s});
  }
};

void patchRandomizedGame_(const Napi::CallbackInfo& info)
{
  Napi::String json = info[0].As<Napi::String>();
  Napi::Function cb = info[1].As<Napi::Function>();

  std::string jsonText = json.Utf8Value();
  PatcherWorker *worker = new PatcherWorker(std::move(jsonText), cb);;
  worker->Queue();
}

Napi::Object init(Napi::Env env, Napi::Object exports)
{
  exports.Set(Napi::String::New(env, "patchRandomizedGame"),
              Napi::Function::New(env, patchRandomizedGame_));
  return exports;
}

NODE_API_MODULE(randomprime, init)
