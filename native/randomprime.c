#include <node_api.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <assert.h>

struct callback_data {
  napi_env env;
  napi_value cb;
};

typedef void (*callback_t)(void *, const char *);
void randomprime_patch_iso(const char *, void *, callback_t);

void callback(void *data, const char *message)
{
  struct callback_data *cbData = (struct callback_data*) data;
  napi_status status;
  napi_env env = cbData->env;
  napi_value cb = cbData->cb;

  // Add message string to callback argument
  napi_value cbArgs[1]; // this is the argument array for the callback function, length of 1 (just the message)
  status = napi_create_string_utf8(env, message, strlen(message), cbArgs);
  assert(status == napi_ok);

  // Set global napi object for callback
  napi_value global;
  status = napi_get_global(env, &global);
  assert(status == napi_ok);

  // Send JSON message as an argument to node callback function
  napi_value result;
  status = napi_call_function(env, global, cb, 1, cbArgs, &result);
  assert (status == napi_ok);
}

// C function for randomPrime.patchRandomizedGame(configJson, function(message)) in Node
napi_value PatchRandomizedGame(napi_env env, napi_callback_info info) {
  napi_status status;
  size_t argc = 2;
  napi_value args[2];
  status = napi_get_cb_info(env, info, &argc, args, NULL, NULL);
  assert(status == napi_ok);

  // Two arguments are required
  if (argc < 2) {
    napi_throw_type_error(env, NULL, "Wrong number of arguments");
    return NULL;
  }

  // Get napi typeofs for parameters
  napi_valuetype valuetype0;
  status = napi_typeof(env, args[0], &valuetype0);
  assert(status == napi_ok);

  napi_valuetype valuetype1;
  status = napi_typeof(env, args[1], &valuetype1);
  assert(status == napi_ok);

  // Ensure args[0] is a string and args[1] is a function
  if (valuetype0 != napi_string || valuetype1 != napi_function) {
    napi_throw_type_error(env, NULL, "Incorrect argument types");
    return NULL;
  }

  // Get length of json string parameter
  size_t length;
  status = napi_get_value_string_utf8(env, args[0], NULL, 0, &length);
  assert(status == napi_ok);

  // Assign json string to buffer
  char* inputJson = malloc((length + 1) * sizeof(char));
  size_t res;
  status = napi_get_value_string_utf8(env, args[0], inputJson, length+1, &res);
  assert(status == napi_ok);

  // Build callback data struct
  struct callback_data cbData = {env, args[1]};

  // Patch the game using json input string, passing callback data struct as well
  randomprime_patch_iso(inputJson, (void *) &cbData, callback);

  // Free up allocated memory
  free(inputJson);
  return NULL;
}

napi_value Init(napi_env env, napi_value exports)
{
  napi_status status;
  napi_value fn;

  // Create and set NAPI patcher function around C function
  status = napi_create_function(env, NULL, 0, PatchRandomizedGame, NULL, &fn);
  assert(status == napi_ok);
  status = napi_set_named_property(env, exports, "patchRandomizedGame", fn);
  assert(status == napi_ok);

  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)