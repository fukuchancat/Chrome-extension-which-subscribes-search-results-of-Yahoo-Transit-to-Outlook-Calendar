# Yahoo!路線情報の検索結果をOutlookカレンダーに登録するChrome拡張機能

## 概要

[Yahoo!路線情報の検索結果をGoogleカレンダーに登録するユーザースクリプト](https://github.com/ia15076/Userscript-which-subscribes-search-results-of-Yahoo-Transit-to-Google-Calendar) を元に作成した、

[Yahoo!路線情報](https://transit.yahoo.co.jp/)の検索結果を[Outlookカレンダー](https://outlook.office.com/calendar/)に登録するリンクを作成するChrome拡張機能です。

![スクリーンショット](https://user-images.githubusercontent.com/19220989/128806535-a65a74a1-3260-4422-9917-ce4c23bfe7a4.png)

![スクリーンショット](https://user-images.githubusercontent.com/19220989/128806433-2e0f23cf-0a6f-44e8-ad6b-cb0a5ff4064f.png)

ルート全体を一つの予定として登録するのではなく、乗り換えごとに別々の予定として登録します。

登録の際、列車名を予定のタイトル、列車の出発・到着時刻を予定の開始・終了時刻、出発駅を予定の場所、発着番線を予定の説明欄に記載します。

徒歩は登録しません。

深夜バスなど日を跨ぐルートにも対応しています。

## インストール方法

[chrome://extensions/](chrome://extensions/)にアクセスし、以下の手順でインストールを行ってください。

1. 本リポジトリをclone(`git clone https://github.com/ia15076/Chrome-extension-which-subscribes-search-results-of-Yahoo-Transit-to-Outlook-Calendar.git`)または [zipでダウンロード](https://github.com/ia15076/Chrome-extension-which-subscribes-search-results-of-Yahoo-Transit-to-Outlook-Calendar/archive/refs/heads/master.zip)して解凍する
2. 画面右上の「デベロッパーモード」のトグルスイッチをONにする
3. 「パッケージ化されていない拡張機能を読み込む」ボタンを押下し、1の手順で作成したフォルダを指定する

インストール後Yahoo!路線情報の検索結果内でルート共有を開けば、入力済みの状態でOutlookカレンダーの予定登録画面が開きます。

## ライセンス

[MIT License](LICENSE)
