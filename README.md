# Multer で画像をアップロードメモ

- 基本的な使い方は公式のリポジトリの README を見れば大体わかりそう<br />
  [公式](https://github.com/expressjs/multer)
- ファイルのアップロード先は multer オプション の `dest` か `diskStorage`の`destination`オプションで指定。<br />
  両方指定されている場合、`destination`が優先されるっぽい

- `diskStorage` の `destination` オプションは `string` か `method` で指定できる。<br />
  詳しくは公式の[README.md](https://github.com/expressjs/multer#diskstorage)を確認。
- アップロード先のディレクトリを `dest` 、 `diskStorage.destination: string` で指定した場合、実行時に自動で作成される。 <br />
  `diskStorage.destination: method` で指定した場合ディレクトリが存在場合はエラーが投げられる

```javascript
const storageOption = {
  destination: 'uploads01',
}
const multer = multer({
  dest: 'uploads02',
  storage: multer.diskStorage(storageOption),
})
// アップロードされる画像は uploads01/ に保存される
```

```javascript
// uploads/photo が存在しない場合作成される
multer({ dest: 'uploads/photo' })

// uploads/photo が存在しない場合作成される
multer({
  storage: multer.diskStorage({
    destination: 'uploads/photo',
  }),
})

// uploads/photo が存在しない場合エラー
multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/photo')
    },
  }),
})

// なので先にディレクトリを作成
multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      fs.mkdirSync('uploads/photo', { recursive: true })
      cb(null, 'uploads/photo')
    },
  }),
})
```

- `diskStorage` のオプションの `method` 引数の callback は複数回呼び出せる。

```javascript
// -> photo.jpg を post した場合
multer.diskStorage({
  destination: (req, file, cb) => {
    // uploads/, gazou_risuto/ は作成済みとする
    cb(null, 'uploads')
    cb(null, 'gazou_risuto')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
    cb(null, 'アップロード画像.jpg')
  },
  // 画像は以下の2箇所4枚保存される
  // uploads/photo.jpg
  // uploads/アップロード画像.jpg
  // gazou_risuto/photo.jpg
  // gazou_risuto/アップロード画像.jpg
})
```
