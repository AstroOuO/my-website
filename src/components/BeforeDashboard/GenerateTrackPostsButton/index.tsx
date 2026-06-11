'use client'

import React, { Fragment, useCallback, useState } from 'react'
import { toast } from '@payloadcms/ui'

import '../SeedButton/index.scss'

export const GenerateTrackPostsButton: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if (loading) {
        toast.info('Already generating posts.')
        return
      }

      setLoading(true)

      try {
        const res = await fetch('/next/generate-track-posts', {
          credentials: 'include',
          method: 'POST',
        })

        if (!res.ok) {
          throw new Error('Request failed')
        }

        const { created, skipped } = (await res.json()) as { created: string[]; skipped: number }

        if (created.length === 0) {
          toast.info(`No new posts created. ${skipped} media item(s) already have a post.`)
        } else {
          toast.success(
            `Created ${created.length} draft post(s): ${created.join(', ')}. Skipped ${skipped} media item(s) that already have a post.`,
          )
        }
      } catch {
        toast.error('An error occurred while generating posts.')
      } finally {
        setLoading(false)
      }
    },
    [loading],
  )

  return (
    <Fragment>
      <button className="seedButton" onClick={handleClick}>
        {loading ? 'Generating posts...' : 'Generate posts from media library'}
      </button>
    </Fragment>
  )
}
