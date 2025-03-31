import fs from 'node:fs'
import path from 'node:path'
import type { Request, Response } from 'express'

export const episodesController = {
  stream: async (req: Request, res: Response) => {
    const { videoUrl } = req.query

    try {
      if (typeof videoUrl !== 'string') throw new Error('type videoUrl incorrect')

      const filePath = path.join(__dirname, '..', '..', 'uploads', videoUrl)
      const fileStat = fs.statSync(filePath)

      const range = req.headers.range

      if (range) {
        const parts = range.replace(/bytes=/, '').split('-')

        const start = Number.parseInt(parts[0], 10)
        const end = parts[1] ? Number.parseInt(parts[1], 10) : fileStat.size - 1

        const chunkSize = end - start + 1

        const file = fs.createReadStream(filePath, { start, end })

        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileStat.size}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunkSize,
          'Content-Type': 'video/mp4',
        }

        res.writeHead(206, head)

        file.pipe(res)
      }
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },
}
