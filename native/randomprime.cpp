#include "napi.h"
#include "napi-thread-safe-callback.hpp"

typedef void (*callback_t)(void *, const char *);
extern "C" void randomprime_patch_iso(const char *, void *, callback_t);

template<typename T>
void callWrapper(void *ptr, const char*data) {
    (*static_cast<T*>(ptr))(data);
}

void patchRandomizedGame(const Napi::CallbackInfo& info)
{
    Napi::String json = info[0].As<Napi::String>();
    Napi::Function cb = info[1].As<Napi::Function>();

    std::string jsonText = json.Utf8Value();
    auto callback = std::make_shared<ThreadSafeCallback>(cb);

    std::thread([jsonText, callback] () {
        auto progressCb = [&callback] (const char *data) {
            // This call is async, so we need to make a copy of the message
            // that the lambda can then capture.
            std::string s(data);
            auto argConverter = [s] (napi_env env, std::vector<napi_value> &args) {
                args.push_back(Napi::String::New(env, s));
            };
            (*callback)(argConverter, nullptr);
        };

        randomprime_patch_iso(jsonText.c_str(), &progressCb,
                              callWrapper<decltype(progressCb)>);
    }).detach();
}

Napi::Object init(Napi::Env env, Napi::Object exports)
{
    exports.Set(Napi::String::New(env, "patchRandomizedGame"),
                Napi::Function::New(env, patchRandomizedGame));
    return exports;
}

NODE_API_MODULE(randomprime, init)
