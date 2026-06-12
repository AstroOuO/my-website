import React from 'react'

import type { AboutMeBlock as AboutMeBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export const AboutMeBlock: React.FC<AboutMeBlockProps> = ({ bio, image, imagePosition }) => {
  const imageOnRight = imagePosition === 'right'

  return (
    <div className="container">
      <div className="grid gap-8 items-center md:grid-cols-2 md:gap-16">
        <div className={cn(imageOnRight && 'md:order-2')}>
          <Media imgClassName="rounded-xl w-full" resource={image} />
        </div>
        <div className={cn(imageOnRight && 'md:order-1')}>
          {bio && <RichText data={bio} enableGutter={false} />}
        </div>
      </div>
    </div>
  )
}
