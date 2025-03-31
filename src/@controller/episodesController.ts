import type { Request, Response } from 'express'
import { episodeService } from '../@services/episodeService'

export const episodesController = {
  stream: async (req: Request, res: Response) => {
    const { videoUrl } = req.query

    try {
      if (typeof videoUrl !== 'string') throw new Error('type videoUrl incorrect')

      const range = req.headers.range

      episodeService.streamEpisodeToResponse(res, videoUrl, range)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },
}
