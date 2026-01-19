module.exports = function (api) {
  api.cache(true);

  return {
    presets: [["babel-preset-expo"], "nativewind/babel"],

    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],

          alias: {
            "@": "./",
            "tailwind.config": "./tailwind.config.js",
          },
        },
      ],

      // 2. Este é o plugin CORRETO que deve estar aqui.
      // (O reanimated já cuida dos worklets)
      "react-native-reanimated/plugin",
    ],
  };
};
