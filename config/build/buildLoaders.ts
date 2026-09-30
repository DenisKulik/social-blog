import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { RuleSetRule } from "webpack";
import type { BuildOptions } from "./types";

export function buildLoaders({ isDev }: BuildOptions): RuleSetRule[] {
  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            auto: (resPath: string) => Boolean(resPath.includes(".module.")),
            localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
          },
        },
      },
      "sass-loader",
    ],
  };

  const svgLoader = {
    test: /\.svg$/,
    use: ["@svgr/webpack"],
  };

  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff2?|eot|ttf|otf)$/i,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
          outputPath: "assets",
        },
      },
    ],
  };

  const tsLoader: RuleSetRule = {
    test: /\.tsx?$/,
    use: [
      {
        loader: "babel-loader",
        options: {
          babelrc: false,
          configFile: false,
          cacheDirectory: true,
          presets: [
            ["@babel/preset-env", { targets: "defaults" }],
            ["@babel/preset-react", { runtime: "automatic" }],
          ],
          plugins: isDev ? ["react-refresh/babel"] : [],
        },
      },
      {
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          compilerOptions: {
            jsx: "preserve",
          },
        },
      },
    ],
    exclude: /node_modules/,
  };

  return [tsLoader, cssLoader, svgLoader, fileLoader];
}
