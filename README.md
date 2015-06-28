速度はかるくん
==

Webサイトのパフォーマンスを計測するChrome拡張機能

![速度はかるくん](https://github.com/qaz-s/chrome-speed-measure/blob/master/src/icon.png?raw=true)

インストール方法
--
1. srcフォルダを任意のローカルディレクトリにコピー
2. Chromeブラウザのハンバーガーアイコン→[設定]→[Chrome拡張]を選択
3. [デベロッパーモード]にチェックをつける
4. [パッケージ化されていない拡張機能を読み込む]を選択し、srcフォルダを追加
5. 拡張機能一覧に「速度はかるくん」が表示されます

算出方法
--
HTML5のNavigation Timing APIを使用し算出をおこなっています。

各項目の算出は下記の通りです。

####Network
- Redirect (リダイレクトをおこなう時間)

  ``performance.timing.redirectEnd - performance.timing.redirectStart``
- AppCache (アプリケーションキャッシュの確認と要求をおこなう時間)

  ``performance.timing.domainLookupStart - performance.timing.fetchStart``

- DNS (DNSルックアップをおこなう時間)

  ``performance.timing.domainLookupEnd - performance.timing.domainLookupStart``

- TCP (ブラウザがサーバに接続するまでの時間)

  ``performance.timing.connectEnd - performance.timing.connectStart``

####Sever
- Request (ブラウザがサーバにリクエストし処理をするまでの時間)

  ``performance.timing.responseStart - performance.timing.requestStart``

- Response (ブラウザがサーバからレスポンスを受け取るまでの時間)

  ``performance.timing.responseEnd - performance.timing.responseStart``

####Client
- Processing (ブラウザがDOM構築を完了するまでの時間)

  ``performance.timing.domComplete - performance.timing.domLoading``

  - DomInteractive (HTMLを解析しDOMの準備をするまでの時間)

    ``performance.timing.domInteractive - performance.timing.domLoading``

  - ParserBlock (パーサーブロックJavaScriptの時間)

    ``performance.timing.domContentLoadedEventStart - performance.timing.domInteractive``

  - DomContentLoaded (CSSOMの準備をするまでの時間)

    ``performance.timing.domContentLoadedEventEnd - performance.timing.domInteractive``

  - DomComplete (ページとサブリソースの準備が整うまでの時間)

    ``performance.timing.domComplete - performance.timing.domContentLoadedEventEnd``

- Load (ブラウザがloadイベントを発火するまでの時間)

  ``performance.timing.loadEventEnd - performance.timing.loadEventStart``
