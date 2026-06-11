import type { GalleryBlock as GalleryBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import React from 'react'

const columnsClasses: Record<string, string> = {
  '2': 'grid-cols-1 sm:grid-cols-2',
  '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

export const GalleryBlock: React.FC<GalleryBlockProps> = ({ columns, items }) => {
  if (!items?.length) return null

  return (
    <div className="container">
      <div className={cn('grid gap-4', columnsClasses[columns || '3'])}>
        {items.map(({ caption, media }, index) => (
          <figure className="m-0" key={index}>
            <div className="relative aspect-square overflow-hidden rounded-xl border border-border">
              {media && typeof media === 'object' && (
                <Media fill imgClassName="object-cover" resource={media} size="33vw" />
              )}
            </div>
            {caption && (
              <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                {caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  )
}
