import type { BuildOptions } from "./types/config";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

export function buildDevServer({
  port,
  isDev,
}: BuildOptions): DevServerConfiguration {
  return {
    port: port,
    open: true,
    historyApiFallback: true,
    hot: isDev,
  };
}
