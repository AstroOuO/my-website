import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const AboutMe: Block = {
  slug: 'aboutMe',
  interfaceName: 'AboutMeBlock',
  labels: {
    plural: 'About Me Blocks',
    singular: 'About Me',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'bio',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      label: false,
      required: true,
    },
    {
      name: 'imagePosition',
      type: 'select',
      admin: {
        description: 'Which side the image appears on (larger screens only).',
      },
      defaultValue: 'left',
      options: [
        { label: 'Image on the left, text on the right', value: 'left' },
        { label: 'Image on the right, text on the left', value: 'right' },
      ],
    },
  ],
}
