// 特定の名前のクッキーの値を取得する関数
function getCookie(name) {
  var cookieValue = null;

  // ドキュメントのクッキーコンテンツが存在し、空でない場合
  if (document.cookie && document.cookie !== "") {
    // クッキーをセミコロンで分割し、配列に格納する
    var cookies = document.cookie.split(";");

    // クッキーの数だけ繰り返すループ
    for (var i = 0; i < cookies.length; i++) {
      // クッキーの前後の余分なスペースをトリムする
      var cookie = cookies[i].trim();

      // クッキーが指定した名前と等しい場合
      if (cookie.substring(0, name.length + 1) === name + "=") {
        // クッキーの値をデコードし、cookieValueに代入する
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }

  // 取得したクッキーの値を返す
  return cookieValue;
}

// "csrftoken"という名前のクッキーの値を取得し、CSRF_TOKENに代入する
var CSRF_TOKEN = getCookie("csrftoken");

// CSRF_TOKENを他のファイルから利用できるようにエクスポートする
export { CSRF_TOKEN };
