// @vue/cli-serviceパッケージからdefineConfigをインポートする
const { defineConfig } = require("@vue/cli-service");

// defineConfig関数を使用して設定オブジェクトを定義し、モジュールとしてエクスポートする
module.exports = defineConfig({});

// webpack-bundle-trackerパッケージをインポートする
const BundleTracker = require("webpack-bundle-tracker");

// Webpackの設定オブジェクトを定義し、モジュールとしてエクスポートする
module.exports = {
  // プロジェクトの公開パスを指定
  publicPath: "http://0.0.0.0:8080/",

  // ビルドされたアセットの出力ディレクトリを指定
  outputDir: "./dist/",

  // transpileDependenciesに"vuetify"を指定し、トランスパイルの対象に含める
  transpileDependencies: ["vuetify"],

  // chainWebpackはWebpackの設定を変更できる関数
  chainWebpack: (config) => {
    config
      // BundleTrackerプラグインを追加
      .plugin("BundleTracker")
      // webpack-stats.jsonという名前でビルド情報のJSONファイルを出力
      .use(BundleTracker, [{ filename: "./webpack-stats.json" }]);

    // 出力ファイルの名前を"bundle.js"に変更する
    config.output.filename("bundle.js");

    // チャンクの分割を無効にする(すべてのコードが1つのバンドルファイルにまとめられる)
    config.optimization.splitChunks(false);

    //  __STATIC__ というエイリアスを使用することで static パスを参照できるようにする
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
