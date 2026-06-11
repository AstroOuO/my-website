import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'scale',
      type: 'number',
      admin: {
        components: {
          Field: '@/fields/ImageScale#ImageScaleField',
        },
        description: 'Scale the image size as a percentage of its container width.',
        step: 5,
      },
      defaultValue: 100,
      max: 200,
      min: 25,
    },
  ],
}
