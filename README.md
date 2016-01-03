速度はかるくん
==

Webサイトの表示速度を計測するChrome拡張機能です

![キャプチャー](https://raw.githubusercontent.com/wiki/qazsato/chrome-speed-measure/image.png)

特徴
--
- Webサイトの読み込み完了までの時間の確認ができます
- ネットワーク/サーバ/フロントの各項目の時間も確認できます
- 合計時間はアイコンにバッジで表示します

追加手順
--
1. Download ZIPからコードをDL
2. srcフォルダを任意のローカルディレクトリにコピー
2. Chromeブラウザのハンバーガーアイコン→[設定]→[Chrome拡張]を選択
3. [デベロッパーモード]にチェックをつける
4. [パッケージ化されていない拡張機能を読み込む]を選択し、srcフォルダを追加
5. 拡張機能一覧に「速度はかるくん」が表示されたらOK


算出方法
--
HTML5のNavigation Timing APIを使用し算出しています。
各項目の算出は下記の通りです。

####Network

    // Redirect (リダイレクトをおこなう時間)
    performance.timing.redirectEnd - performance.timing.redirectStart

    // AppCache (アプリケーションキャッシュの確認と要求をおこなう時間)
    performance.timing.domainLookupStart - performance.timing.fetchStart

    // DNS (DNSルックアップをおこなう時間)
    performance.timing.domainLookupEnd - performance.timing.domainLookupStart

    // TCP (ブラウザがサーバに接続するまでの時間)
    performance.timing.connectEnd - performance.timing.connectStart

####Server

    // Request (ブラウザがサーバにリクエストし処理をするまでの時間)
    performance.timing.responseStart - performance.timing.requestStart

    // Response (ブラウザがサーバからレスポンスを受け取るまでの時間)
    performance.timing.responseEnd - performance.timing.responseStart

####Client

    // Processing (ブラウザがDOM構築を完了するまでの時間)
    performance.timing.domComplete - performance.timing.domLoading

    // DomInteractive (HTMLを解析しDOMの準備をするまでの時間)
    performance.timing.domInteractive - performance.timing.domLoading

    // ParserBlock (パーサーブロックJavaScriptの時間)
    performance.timing.domContentLoadedEventStart - performance.timing.domInteractive

    // DomContentLoaded (CSSOMの準備をするまでの時間)
    performance.timing.domContentLoadedEventEnd - performance.timing.domInteractive

    // DomComplete (ページとサブリソースの準備が整うまでの時間)
    performance.timing.domComplete - performance.timing.domContentLoadedEventEnd

    // Load (ブラウザがloadイベントを発火するまでの時間)
    performance.timing.loadEventEnd - performance.timing.loadEventStart

参考
--
- [W3C Navigation Timing](http://www.w3.org/TR/navigation-timing/#processing-model)
- [Google Developers](https://developers.google.com/web/fundamentals/performance/?hl=ja)
