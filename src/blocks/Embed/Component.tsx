import type { EmbedBlock as EmbedBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'

type Props = EmbedBlockProps & {
  className?: string
}

const aspectRatioClasses: Record<string, string> = {
  '1/1': 'aspect-square',
  '16/9': 'aspect-video',
  '4/3': 'aspect-[4/3]',
  '9/16': 'aspect-[9/16]',
}

const decodeHtmlEntities = (value: string) =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')

/** Accepts either a plain URL or a full <iframe> embed snippet and returns the src URL. */
const extractSrc = (embedCode: string): string => {
  const trimmed = embedCode.trim()
  const iframeMatch = trimmed.match(/<iframe[^>]*\ssrc=["']([^"']+)["']/i)

  return iframeMatch?.[1] ? decodeHtmlEntities(iframeMatch[1]) : trimmed
}

export const EmbedBlock: React.FC<Props> = ({ aspectRatio, caption, className, embedCode }) => {
  if (!embedCode) return null

  const src = extractSrc(embedCode)

  if (!src) return null

  return (
    <div className={cn('mx-auto my-8 w-full max-w-[48rem]', className)}>
      <div
        className={cn(
          'overflow-hidden rounded-xl border border-border',
          aspectRatioClasses[aspectRatio || '16/9'],
        )}
      >
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
          src={src}
          title={caption || 'Embedded content'}
        />
      </div>
      {caption && <p className="mt-2 text-center text-sm text-muted-foreground">{caption}</p>}
    </div>
  )
}
