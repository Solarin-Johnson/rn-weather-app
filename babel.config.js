module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        // {
        //   "react-compiler": {
        //     sources: (filename) => {
        //       // Match file names to include in the React Compiler.
        //       return filename.includes("src/app/Dom");
        //     },
        //   },
        // },
      ],
    ],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@": "./", // Alias '@' to point to the '/src' directory
          },
        },
      ],
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
        },
      ],
      // ["babel-plugin-react-compiler", ReactCompilerConfig],
      ["react-native-reanimated/plugin"],
    ],
  };
};
