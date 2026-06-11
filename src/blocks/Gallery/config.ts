import type { Block } from 'payload'

export const Gallery: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  labels: {
    plural: 'Galleries',
    singular: 'Gallery',
  },
  fields: [
    {
      name: 'columns',
      type: 'select',
      admin: {
        description: 'How many items appear per row on larger screens.',
      },
      defaultValue: '3',
      options: [
        { label: '2 columns', value: '2' },
        { label: '3 columns', value: '3' },
        { label: '4 columns', value: '4' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
      labels: {
        plural: 'Items',
        singular: 'Item',
      },
      minRows: 1,
    },
  ],
}
