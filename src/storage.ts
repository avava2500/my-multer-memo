import { randomUUID } from 'crypto'
import fs from 'fs'
import multer from 'multer'

export const storage = multer.diskStorage({
  // uploads/[uuid] ディレクトリを新たに作成し、
  // アップロードされたファイルをそこに格納する。
  destination: (req, file, cb) => {
    const uuid = randomUUID()
    const uploadDir = `uploads/${uuid}`
    fs.mkdirSync(uploadDir, { recursive: true })
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
