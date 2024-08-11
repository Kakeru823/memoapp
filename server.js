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

  app.get('/', async (req, res) => {
    try {
      const memos = await db.collection('memo').find().toArray();
      const tytles = memos.map((memo) => {
         return memo.tytle ;
        });
      
      res.render(
        path.resolve(__dirname, 'views/mainpage.ejs'),
        { tytles: tytles }
      );

    } catch (e) {
      console.error(e);
      res.status(500).send('Internal Server Error');
    }
  });

  app.post('/api/memo', express.json(), async (req, res) => {
    const tytle = req.body.tytle;
    const text = req.body.note;
    if (!tytle) {
      res.status(400).send('Bad Request');
      return;
    }
    await db.collection('memo').insertOne({ tytle: tytle , note: text });
    res.status(200).send('Created');
  });

  
  app.post('/api/select', express.json(), async (req, res) => {
    const tytle = req.body.tytle;
    if (!tytle) {
      res.status(400).send('Bad Request');
      return;
    }
      

    await db.collection('memo').insertOne({ tytle: tytle , note: text });
    res.status(200).send('Created');
  });


  app.listen(3000, () => {
    console.log('start listening');
  });
}
main()
