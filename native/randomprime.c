#include <node_api.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <assert.h>

typedef struct async_carrier {
  char* json;
  napi_ref callbackRef;
  char* callbackText;
} async_carrier;

typedef void (*callback_t)(void *, const char *);
void randomprime_patch_iso(const char *, void *, callback_t);

void callback(void *data, const char *message) {
  // Get carrier from data argument
  async_carrier *carrier = (async_carrier *) data;

  free(carrier->callbackText);
  carrier->callbackText = malloc(strlen(message) + 1);
  strcpy(carrier->callbackText, message);
}

void executePatch(napi_env env, void *data) {
  // Get carrier from data argument
  async_carrier *carrier = (async_carrier *) data;
  char* json = carrier->json;

  // Patch the randomized iso. No callbacks for now as I'm not sure how to make callbacks to javascript from a napi_async_execute_callback yet.
  randomprime_patch_iso(json, carrier, callback);
}

void patchComplete(napi_env env, napi_status status, void *data) {
  // Set up instance variable, get carrier from data argument
  napi_value callback;
  async_carrier *carrier = (async_carrier *) data;
  char* callbackText = carrier->callbackText;

  // Get our callback value from the reference, and then delete the reference
  status = napi_get_reference_value(env, carrier->callbackRef, &callback);
  assert(status == napi_ok);
  status = napi_delete_reference(env, carrier->callbackRef);
  assert(status == napi_ok);

  // Add message string to callback argument
  napi_value cbArgs[1]; // this is the argument array for the callback function, length of 1 (just the message)
  status = napi_create_string_utf8(env, callbackText, strlen(callbackText), cbArgs);
  assert(status == napi_ok);

  // Set global napi object for callback
  napi_value global;
  status = napi_get_global(env, &global);
  assert(status == napi_ok);

  // Send JSON message as an argument to node callback function
  napi_value result;
  status = napi_call_function(env, global, callback, 1, cbArgs, &result);
  assert (status == napi_ok);

  // Free allocated values
  free(carrier->json);
  free(carrier->callbackText);
  free(carrier);
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
  // async_carrier *carrier = malloc(sizeof(inputJson) + sizeof(callbackRef));
  async_carrier *carrier = malloc(sizeof(async_carrier));
  carrier->json = inputJson;
  carrier->callbackRef = callbackRef;
  carrier->callbackText = malloc(sizeof(char)); // temporarily allocate to avoid issues freeing from memory later

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