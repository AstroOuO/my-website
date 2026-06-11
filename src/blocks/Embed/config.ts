import type { Block } from 'payload'

export const Embed: Block = {
  slug: 'embed',
  interfaceName: 'EmbedBlock',
  fields: [
    {
      name: 'embedCode',
      type: 'textarea',
      admin: {
        description:
          'Paste a URL, or the full <iframe> embed code (e.g. from a YouTube/Vimeo "Share > Embed" dialog, Figma, CodePen, or Google Maps).',
      },
      required: true,
    },
    {
      name: 'aspectRatio',
      type: 'select',
      defaultValue: '16/9',
      options: [
        { label: '16:9 (widescreen)', value: '16/9' },
        { label: '4:3 (standard)', value: '4/3' },
        { label: '1:1 (square)', value: '1/1' },
        { label: '9:16 (vertical)', value: '9/16' },
      ],
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}
