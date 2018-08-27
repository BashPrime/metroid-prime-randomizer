#include <node_api.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <assert.h>

struct callback_data {
  napi_env env;
  napi_value cb;
};

struct async_carrier {
  char* json;
  napi_ref callbackRef;
};

typedef void (*callback_t)(void *, const char *);
void randomprime_patch_iso(const char *, void *, callback_t);

void callback(void *data, const char *message) {
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

void executePatch(napi_env env, void *data) {
  printf("Starting patch\n");

  // Double for loop to simulate work being done in the execution async context
  for(int i = 0; i < 2000000000; i++) {
    if (i % 1000000000 == 0) {
      printf("Hit modulo\n");
    }
  }
}

void patchComplete(napi_env env, napi_status status, void *data) {
  // Set up instance variable, get carrier from data argument
  napi_value callback;
  struct async_carrier *carrier = (struct async_carrier *) data;
  char* json = carrier->json;

  // Get our callback value from the reference, and then delete the reference
  status = napi_get_reference_value(env, carrier->callbackRef, &callback);
  assert(status == napi_ok);
  status = napi_delete_reference(env, carrier->callbackRef);
  assert(status == napi_ok);

  // Add message string to callback argument
  napi_value cbArgs[1]; // this is the argument array for the callback function, length of 1 (just the message)
  status = napi_create_string_utf8(env, json, strlen(json), cbArgs);
  assert(status == napi_ok);

  // Set global napi object for callback
  napi_value global;
  status = napi_get_global(env, &global);
  assert(status == napi_ok);

  // Send JSON message as an argument to node callback function
  napi_value result;
  status = napi_call_function(env, global, callback, 1, cbArgs, &result);
  assert (status == napi_ok);
}

napi_value patchRandomizedGame(napi_env env, napi_callback_info info) {
  napi_status status;
	napi_async_work work;
	napi_value async_resource_name;

  // Build up arguments array from js call
  napi_value args[2];
  size_t argc = 2;
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
  size_t jsonLength;
  status = napi_get_value_string_utf8(env, args[0], NULL, 0, &jsonLength);
  assert(status == napi_ok);

  // Assign json string to buffer
  char* inputJson = malloc((jsonLength + 1) * sizeof(char));
  size_t res;
  status = napi_get_value_string_utf8(env, args[0], inputJson, jsonLength + 1, &res);
  assert(status == napi_ok);

  // Create reference to callback function argument so it doesn't get lost to the stack (if this makes sense)
  napi_ref callbackRef;
  status = napi_create_reference(env, args[1], 1, &callbackRef);
  assert(status == napi_ok);

  // Allocate heap memory for carrier struct and pass in json, napi callback reference
  struct async_carrier *carrier = malloc(sizeof(inputJson) + sizeof(callbackRef));
  carrier->json = inputJson;
  carrier->callbackRef = callbackRef;  

  // Create resource name for async work
	napi_create_string_utf8(env, "patchRandomizedGame", NAPI_AUTO_LENGTH, &async_resource_name);

  // Create and queue the async work
	napi_create_async_work(env, NULL, async_resource_name, executePatch, patchComplete, carrier, &work);
	napi_queue_async_work(env, work);

	return NULL;
}

napi_value init(napi_env env, napi_value exports)
{
  napi_status status;
  napi_property_descriptor desc[] = {
		{
			.utf8name = "patchRandomizedGame",
			.method = patchRandomizedGame,
			.getter = NULL,
			.setter = NULL,
			.value = NULL,
			.attributes = napi_default,
			.data = NULL
		}
	};
	status = napi_define_properties(env, exports, 1, desc);

  return exports;
}

NAPI_MODULE(randomprime, init)