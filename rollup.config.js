import peerDepsExternal from "rollup-plugin-peer-deps-external";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import fs from "fs";
import copy from "rollup-plugin-copy";
import { terser } from "rollup-plugin-terser";

const external = ["react", "react-dom"];

const presets = ["@babel/preset-react", "@babel/preset-env"];

const globals = {
  react: "React",
  "react-dom": "ReactDOM",
};

export default [
  {
    input: "src/index.js",
    output: [
      {
        file: "build/index.min.js",
        format: "cjs",
        plugins: [terser()],
        exports: "named",
      },
      {
        file: "build/index.module.js",
        format: "es",
        plugins: [terser()],
        exports: "named",
      },
      {
        file: "build/browser.min.js",
        format: "umd",
        plugins: [terser()],
        name: "ElementPopper",
        exports: "default",
        globals,
      },
    ],
    external,
    plugins: [
      resolve(),
      peerDepsExternal(),
      babel({
        exclude: /node_modules/,
        presets,
      }),
      commonjs(),
      copy({
        targets: [{ src: "src/element_popper.css", dest: "build" }],
      }),
    ],
  },
  ...build("animations"),
];

function build(path) {
  const nodePath = `./src/${path}`;
  const array = fs
    .readdirSync(`${nodePath}`)
    .map((file) => file.replace(/\.js$/, ""));

  return array.map((name) => ({
    input: `src/${path}/${name}.js`,
    output: [
      {
        file: `${path}/${name}.js`,
        format: "es",
        exports: "default",
        plugins: [terser()],
      },
    ],
  }));
}
