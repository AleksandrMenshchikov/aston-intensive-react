import SpeedMeasurePlugin from "speed-measure-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {dirname, resolve} from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CircularDependencyPlugin from "circular-dependency-plugin";
import {CleanWebpackPlugin} from "clean-webpack-plugin";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";
import {fileURLToPath} from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default new SpeedMeasurePlugin().wrap({
    entry: './src/index.tsx',
    output: {
        path: resolve(__dirname, "dist"),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "ts-loader",
            },
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "autoprefixer",
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    plugins: [new HtmlWebpackPlugin({
        template: resolve(__dirname, "src/index.html"),
    }),
        new MiniCssExtractPlugin(),
        new CaseSensitivePathsPlugin(),
        new CircularDependencyPlugin(),
        new CleanWebpackPlugin()]
})

