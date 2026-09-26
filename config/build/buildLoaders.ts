import type { RuleSetRule } from "webpack";

export function buildLoaders(): RuleSetRule[] {
  const tsLoader: RuleSetRule = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  return [tsLoader];
}
