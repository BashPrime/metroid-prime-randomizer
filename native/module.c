#include <node_api.h>
#include <stdint.h>
#include <stdio.h>

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

napi_value MyFunction(napi_env env, napi_callback_info info)
{
  napi_status status;
  size_t argc = 1;
  int number = 0;
  napi_value argv[1];
  status = napi_get_cb_info(env, info, &argc, argv, NULL, NULL);

  if (status != napi_ok)
  {
    napi_throw_error(env, NULL, "Failed to parse arguments");
  }

  status = napi_get_value_int32(env, argv[0], &number);

  if (status != napi_ok)
  {
    napi_throw_error(env, NULL, "Invalid number was passed as argument");
  }

  const char *json =
      "{"
      "   \"input_iso\": \"D:\\\\Users\\\\Evan\\\\Documents\\\\Emulation\\\\Roms\\\\GCN\\\\Metroid Prime 0-00.iso\","
      "   \"output_iso\": \"D:\\\\Users\\\\Evan\\\\Documents\\\\Emulation\\\\Roms\\\\GCN\\\\mp1r.iso\","
      "   \"layout_string\": \"8bLJvCGBbOREwv2Z8uY3AFtfvVtx-PTgZmbgOfee4jT2EYVhI5i5NI9SYZJAf8gCdhOtvzQkb1_7D-msyqfdDgr\""
      "}";
  randomprime_patch_iso(json, NULL, callback);

  napi_value myNumber;
  number = number * 2;
  status = napi_create_int32(env, number, &myNumber);

  if (status != napi_ok)
  {
    napi_throw_error(env, NULL, "Unable to create return value");
  }

  return myNumber;
}

napi_value Init(napi_env env, napi_value exports)
{
  napi_status status;
  napi_value fn;

  // Arguments 2 and 3 are function name and length respectively
  // We will leave them as empty for this example
  status = napi_create_function(env, NULL, 0, MyFunction, NULL, &fn);
  if (status != napi_ok)
  {
    napi_throw_error(env, NULL, "Unable to wrap native function");
  }

  status = napi_set_named_property(env, exports, "my_function", fn);
  if (status != napi_ok)
  {
    napi_throw_error(env, NULL, "Unable to populate exports");
  }

  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)