import { CSRF_TOKEN } from "./csrf_token.js";

// レスポンスを処理する関数
function handleResponse(response) {
  // ステータスコードが204の場合、空文字列を返す
  if (response.status === 204) {
    return "";
  }
  // ステータスコードが404の場合、nullを返す
  else if (response.status === 404) {
    return null;
  }
  // それ以外の場合、レスポンスをJSON形式で返す
  else {
    return response.json();
  }
}

// APIサービスを提供する関数
function apiService(endpoint, method, data) {
  // 設定オブジェクトを作成
  const config = {
    // メソッドを指定（デフォルトはGET）
    method: method || "GET",
    // データがある場合はJSON形式に変換して設定（ない場合はnull）
    body: data !== undefined ? JSON.stringify(data) : null,
    // ヘッダーを設定
    headers: {
      "content-type": "application/json",
      "X-CSRFTOKEN": CSRF_TOKEN,
    },
  };
  // エンドポイントと設定を元にフェッチリクエストを行い、レスポンスを処理する
  return fetch(endpoint, config).then(handleResponse);
}

// apiService関数を他のファイルから利用できるようにエクスポートする
export { apiService };
