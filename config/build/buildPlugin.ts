import path from "path";
import { ProgressPlugin, type WebpackPluginInstance } from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";
import type { BuildOptions } from "./types/config";

export function buildPlugins({ paths }: BuildOptions): WebpackPluginInstance[] {
  return [
    new HTMLWebpackPlugin({
      template: paths.html,
    }),
    new ProgressPlugin(),
  ];
}
