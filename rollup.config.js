import peerDepsExternal from "rollup-plugin-peer-deps-external"
import babel from "@rollup/plugin-babel"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import { terser } from "rollup-plugin-terser"

const external = [
  "react",
  "react-dom"
]

const presets = [
  "@babel/preset-react",
  "@babel/preset-env"
]

const globals = {
  react: "React"
}

export default [
  {
    input: "index.js",
    output: [
      {
        file: "build/index.min.js",
        format: "esm",
        plugins: [terser()],
        exports: "named"
      },
      {
        file: "build/browser.min.js",
        format: "umd",
        plugins: [terser()],
        name: "ElementPopper",
        exports: "named",
        globals
      }
    ],
    external,
    plugins: [
      resolve(),
      peerDepsExternal(),
      babel({
        exclude: /node_modules/,
        presets
      }),
      commonjs()
    ]
  }
];

