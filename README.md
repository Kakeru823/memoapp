メモツール

ブラウザ上でメモを管理できるツール
メモの追加と今まで保存したメモの閲覧ができる


## 使い方
docker上にmy-memoappとしてデータベースを立てる
サーバーを立ち上げブラウザからlocalhostにアクセスすると題名入力欄、本文入力欄、保存したメモが表示される
入力後送信ボタンを押すとデータベースが更新され、ページ更新後に保存した内容が追加で表示される

サーバー起動手順
docker run --rm --name=my-app-db -p 27017:27017 mongo   <- 資料のは間違ってるからこっち
別ウィンドウで
docker exec -it my-app-db mongosh
test> use my-memoapp

中身の確認は
db.memo.find()

直接の追加は
my-memoapp> db.memo.insertOne({ tytle: 'tytle', note: 'text' })