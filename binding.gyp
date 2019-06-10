{
  "targets": [
    {
      "target_name": "randomprime",
      "sources": [ "./native/randomprime.cpp" ],
    "conditions": [
        ["OS=='win'", {
          "msvs_settings": {
            "VCCLCompilerTool": {
              "AdditionalOptions": [
                "/MD"
              ]
            }
          },
          "libraries": [
            "-l<(module_root_dir)/randomprime/target/release/randomprime",
            "-lcredui.lib",
            "-lmsimg32.lib",
            "-lopengl32.lib",
            "-lsecur32.lib",
            "-lsetupapi.lib",
            "-lws2_32.lib",
            "-luserenv.lib",
            "-lmsvcrt.lib"
          ],
          "defines": [
            "_HAS_EXCEPTIONS=1"
          ]
        }],
        ["OS=='mac'", {
          "libraries": [
            "<(module_root_dir)/randomprime/target/release/librandomprime.a"
          ]
        }],
        ["OS=='linux'", {
          "libraries": [
            "<(module_root_dir)/randomprime/target/release/librandomprime.a"
          ]
        }]
      ],
      'include_dirs': ["<!@(node -p \"require('node-addon-api').include\")",
                       "<!@(node -p \"require('napi-thread-safe-callback').include\")"],
      'dependencies': ["<!(node -p \"require('node-addon-api').gyp\")"],
      'cflags!': [ '-fno-exceptions' ],
      'cflags_cc!': [ '-fno-exceptions' ],
      'xcode_settings': {
          'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
          'CLANG_CXX_LIBRARY': 'libc++',
          'MACOSX_DEPLOYMENT_TARGET': '10.7',
      },
      'msvs_settings': {
          'VCCLCompilerTool': { 'ExceptionHandling': 1 },
      }
    }
  ]
}

