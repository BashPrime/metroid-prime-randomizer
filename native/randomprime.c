#include <node_api.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <assert.h>

enum message_type
{
  success,
  error,
  progress,
};

typedef void (*callback_t)(void *, uint32_t, const char *);
void randomprime_patch_iso(const char *, void *, callback_t);

void callback(void *data, uint32_t id, const char *message)
{
  printf("%d - %s\n", id, message);
}

napi_value PatchRandomizedGame(napi_env env, napi_callback_info info)
{
  napi_status status;
  size_t argc = 1;
  napi_value argv[1];
  status = napi_get_cb_info(env, info, &argc, argv, NULL, NULL);

  if (argc > 1) {
    return argv;
  }

  // printf("Past cb info\n");

  if (status != napi_ok)
  {
    napi_throw_error(env, NULL, "Failed to parse arguments");
  }

  // printf("Past first status check\n");

  size_t length;
  status = napi_get_value_string_utf8(env, argv[0], NULL, 0, &length);
  if (status != napi_ok)
  {
    napi_throw_error(env, NULL, "Error attempting to get string value");
  }

  // printf("Past first utf8\n");

  char* buf = malloc((length + 1) * sizeof(char));
  size_t res;
  status = napi_get_value_string_utf8(env, argv[0], buf, length+1, &res);

  // printf("Past nap value string utf8\n");

  if (status != napi_ok)
  {
    napi_throw_error(env, NULL, "Error attempting to save string to buffer");
  }

  randomprime_patch_iso(buf, NULL, callback);

  napi_value myStr;
  status = napi_create_string_utf8(env, buf, res, &myStr);

  if (status != napi_ok) {
    napi_throw_error(env, NULL, "Unable to create return string");
  }

  free(buf);
  return myStr;
}

napi_value Callback(napi_env env, napi_callback_info info) {
  napi_status status;
  size_t argc = 1;
  napi_value args[1];
  status = napi_get_cb_info(env, info, &argc, args, NULL, NULL);

  napi_value cb = args[0];

  napi_value argv[1];
  status = napi_create_string_utf8(env, "hello world", NAPI_AUTO_LENGTH, argv);
  assert(status == napi_ok);

  napi_value global;
  status = napi_get_global(env, &global);
  assert(status == napi_ok);

  for (int i = 0; i < 10; i++) {
    napi_value result;
    status = napi_call_function(env, global, cb, 1, argv, &result);
    assert (status == napi_ok);
  }
  
  return NULL;
}

napi_value Init(napi_env env, napi_value exports)
{
  napi_status status;
  napi_value fn;

  // Arguments 2 and 3 are function name and length respectively
  // We will leave them as empty for this example
  // patchRandomizedGame()
  status = napi_create_function(env, NULL, 0, PatchRandomizedGame, NULL, &fn);
  // if (status != napi_ok) napi_throw_error(env, NULL, "Unable to wrap native function patchRandomizedGame()");
  assert(status == napi_ok);
  status = napi_set_named_property(env, exports, "patchRandomizedGame", fn);
  // if (status != napi_ok) napi_throw_error(env, NULL, "Cannot add patchRandomizedGame() to exports");
  assert(status == napi_ok);
  // end patchRandomizedGame()

  // callback()
  status = napi_create_function(env, NULL, 0, Callback, NULL, &fn);
  // if (status != napi_ok) napi_throw_error(env, NULL, "Unable to wrap native function patchRandomizedGame()");
  assert(status == napi_ok);
  status = napi_set_named_property(env, exports, "callback", fn);
  // if (status != napi_ok) napi_throw_error(env, NULL, "Cannot add patchRandomizedGame() to exports");
  assert(status == napi_ok);

  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)