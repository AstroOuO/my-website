import type { ButtonGridBlock as ButtonGridBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import {
  ArrowRight,
  Calendar,
  Check,
  Download,
  ExternalLink,
  Facebook,
  FileText,
  Github,
  Globe,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Play,
  Send,
  ShoppingCart,
  Star,
  Twitter,
  Youtube,
} from 'lucide-react'
import React from 'react'

const icons = {
  arrowRight: ArrowRight,
  calendar: Calendar,
  check: Check,
  download: Download,
  externalLink: ExternalLink,
  facebook: Facebook,
  fileText: FileText,
  github: Github,
  globe: Globe,
  heart: Heart,
  instagram: Instagram,
  linkedin: Linkedin,
  mail: Mail,
  mapPin: MapPin,
  messageCircle: MessageCircle,
  phone: Phone,
  play: Play,
  send: Send,
  shoppingCart: ShoppingCart,
  star: Star,
  twitter: Twitter,
  youtube: Youtube,
} as const

const columnsClasses: Record<string, string> = {
  '1': 'grid-cols-1',
  '2': 'grid-cols-1 sm:grid-cols-2',
  '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

export const ButtonGridBlock: React.FC<ButtonGridBlockProps> = ({ buttons, columns }) => {
  if (!buttons?.length) return null

  return (
    <div className="container">
      <div className={cn('grid gap-4', columnsClasses[columns || '2'])}>
        {buttons.map(({ color, icon, link }, index) => {
          const Icon = icon ? icons[icon] : null

          return (
            <CMSLink
              key={index}
              appearance={color || 'default'}
              className="justify-center"
              size="lg"
              {...link}
            >
              {Icon && <Icon />}
            </CMSLink>
          )
        })}
      </div>
    </div>
  )
}
