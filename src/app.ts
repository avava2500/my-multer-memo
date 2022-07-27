import express from 'express'
import multer from 'multer'
import { storage } from './storage'
import { fileFilter } from './fileFilter'
import { ErrorHandler } from './types'

const app = express()
const upload = multer({ storage, fileFilter })

app.use(express.static('public'))

app.post('/post', upload.array('file'), (req, res) => {
  res.redirect('/')
})

const errorHandler: ErrorHandler = (err, req, res: express.Response, next) => {
  res.status(500).json({ err: err.message })
}
app.use(errorHandler)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Server start!!')
  console.log(`port: ${port}`)
})
