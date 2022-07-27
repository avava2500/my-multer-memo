import type express from 'express'
import type multer from 'multer'

// -------------------------
// express
// -------------------------

// exprssのerror handling用middlewareの型
export type ErrorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => void

// -------------------------
// multer
// -------------------------

export type FileFilter = (
  req: express.Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => void
