import type { Block } from 'payload'

import { link } from '../../fields/link'

export const ButtonGrid: Block = {
  slug: 'buttonGrid',
  interfaceName: 'ButtonGridBlock',
  labels: {
    plural: 'Button Grids',
    singular: 'Button Grid',
  },
  fields: [
    {
      name: 'columns',
      type: 'select',
      admin: {
        description: 'How many buttons appear per row on larger screens.',
      },
      defaultValue: '2',
      options: [
        { label: '1 column', value: '1' },
        { label: '2 columns', value: '2' },
        { label: '3 columns', value: '3' },
        { label: '4 columns', value: '4' },
      ],
    },
    {
      name: 'buttons',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: [
        link({ appearances: false }),
        {
          name: 'color',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Primary', value: 'default' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
            { label: 'Ghost', value: 'ghost' },
            { label: 'Destructive', value: 'destructive' },
          ],
        },
        {
          name: 'icon',
          type: 'select',
          admin: {
            description: 'Optional icon shown after the label.',
          },
          options: [
            { label: 'Arrow Right', value: 'arrowRight' },
            { label: 'Calendar', value: 'calendar' },
            { label: 'Check', value: 'check' },
            { label: 'Download', value: 'download' },
            { label: 'External Link', value: 'externalLink' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'Document', value: 'fileText' },
            { label: 'GitHub', value: 'github' },
            { label: 'Globe', value: 'globe' },
            { label: 'Heart', value: 'heart' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Mail', value: 'mail' },
            { label: 'Map Pin', value: 'mapPin' },
            { label: 'Message', value: 'messageCircle' },
            { label: 'Phone', value: 'phone' },
            { label: 'Play', value: 'play' },
            { label: 'Send', value: 'send' },
            { label: 'Shopping Cart', value: 'shoppingCart' },
            { label: 'Star', value: 'star' },
            { label: 'Twitter / X', value: 'twitter' },
            { label: 'YouTube', value: 'youtube' },
          ],
        },
      ],
      minRows: 1,
    },
  ],
}
