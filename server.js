const express = require('express');
const app = express();
const path = require('node:path');
const { MongoClient } = require('mongodb');
const { mainModule } = require('node:process');
const client = new MongoClient('mongodb://localhost:27017');


app.set('view engine', 'ejs');
// publicディレクトリ以下のファイルを静的ファイルとして配信
app.use('/static', express.static(path.join(__dirname, 'public')));

const logMiddleware = (req, res, next) => {
  console.log(req.method, req.path);
  next();
}


async function main() {
  // サーバーのlisten前に接続する
  await client.connect();

  const db = client.db('my-memoapp');

  app.get('/', logMiddleware, async (req, res) => {
    try {

      const memos = await db.collection('memo').find().toArray();
      const tytles = memos.map((memo) => {
       return memo.tytle
      });

      const notes = memos.map((memo) => {
        return memo.note
       });

      let text = [];
      for(let i=0; i <= tytles.length-1; i++){
        text[i] = tytles[i] + " : " + notes[i];
      }
      res.render(path.resolve(__dirname, 'views/mainpage.ejs'), { notes: text });
    } catch (e) {
      console.error(e);
      res.status(500).send('Internal Server Error');
    };
  });

  app.post('/api/memo', express.json(), async (req, res) => {
    const tytle = req.body.tytle;
    const text = req.body.note;
    if (!tytle) {
      res.status(400).send('Bad Request');
      return;
    };
    await db.collection('memo').insertOne({ tytle: tytle , note: text });
    res.status(200).send('Created');
  });


  app.listen(3000, () => {
    console.log('start listening');
  });
};
main();

/*
サーバー起動手順
docker run --rm --name=my-app-db -p 27017:27017 mongo   <- 資料のは間違ってるからこっち
別ウィンドウで
docker exec -it my-app-db mongosh
test> use my-memoapp

中身の確認は
db.memo.find()

追加は
my-memoapp> db.memo.insertOne({ tytle: 'tytle', note: 'text' })
*/