import fs from 'node:fs'
import path from 'node:path'
import type { Response } from 'express'

export const episodeService = {
  streamEpisodeToResponse: (res: Response, videoUrl: string, range: string | undefined) => {
    const filePath = path.join(__dirname, '..', '..', 'uploads', videoUrl)
    const fileStat = fs.statSync(filePath)

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

    if (!range) {
      const head = {
        'Content-Length': fileStat.size,
        'Content-Type': 'video/mp4',
      }

      res.writeHead(200, head)

      fs.createReadStream(filePath).pipe(res)
    }
  },
}
