import type { FileFilter } from './types'

export const fileFilter: FileFilter = (req, file, cb) => {
  // minetype が image/* でなければエラーを返す
  if (!file.mimetype.match(/^image\/*/)) {
    cb(new Error('画像ファイルではありません。'))
  }
  cb(null, true)
}
