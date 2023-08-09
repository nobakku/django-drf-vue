// @vue/cli-serviceパッケージからdefineConfigをインポートする
const { defineConfig } = require("@vue/cli-service");

// defineConfig関数を使用して設定オブジェクトを定義し、モジュールとしてエクスポートする
module.exports = defineConfig({});

// webpack-bundle-trackerパッケージをインポートする
const BundleTracker = require("webpack-bundle-tracker");

// ウェブパックの設定オブジェクトを定義し、モジュールとしてエクスポートする
module.exports = {
  // プロジェクトの公開パスを指定する
  publicPath: "http://0.0.0.0:8080/",

  // 出力ディレクトリを指定する
  outputDir: "./dist/",

  // transpileDependenciesに"vuetify"を指定し、トランスパイルの対象に含める
  transpileDependencies: ["vuetify"],

  // chainWebpack関数を使用してウェブパックの設定を変更する
  chainWebpack: (config) => {
    // BundleTrackerプラグインを追加し、ファイル名を指定する
    config
      .plugin("BundleTracker")
      .use(BundleTracker, [{ filename: "./webpack-stats.json" }]);

    // 出力ファイルの名前を"bundle.js"に変更する
    config.output.filename("bundle.js");

    // チャンクの分割を無効にする
    config.optimization.splitChunks(false);

    // リゾルブのエイリアスを設定し、"__STATIC__"を"static"にマッピングする
    config.resolve.alias.set("__STATIC__", "static");

    // devServerの設定を変更する
    config.devServer
      // .hotOnly(true)
      // .watchOptions({ poll: 1000 })
      .https(false)
      // .disableHostCheck(true)
      .headers({ "Access-Control-Allow-Origin": ["*"] });
  },
};
