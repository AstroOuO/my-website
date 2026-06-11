import type { Payload, PayloadRequest } from 'payload'

import { randomBytes } from 'crypto'

const generateBlockId = () => randomBytes(12).toString('hex')

const textNode = (text: string) => ({
  detail: 0,
  format: 0,
  mode: 'normal' as const,
  style: '',
  text,
  type: 'text' as const,
  version: 1,
})

const paragraph = (text: string) => ({
  type: 'paragraph' as const,
  children: text ? [textNode(text)] : [],
  direction: null,
  format: '' as const,
  indent: 0,
  textFormat: 0,
  textStyle: '',
  version: 1,
})

/**
 * Builds richText content for a new track post, mirroring the layout of the
 * "ars" post: hero media block (60% scale), h1 title, album/genre placeholders,
 * an embed placeholder for the streaming player, and a 3-column button grid.
 */
const buildTrackContent = ({ mediaId, trackName }: { mediaId: number; trackName: string }) => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'block',
        fields: {
          id: generateBlockId(),
          blockName: 'work',
          blockType: 'mediaBlock',
          media: mediaId,
          scale: 60,
        },
        format: '',
        version: 2,
      },
      {
        type: 'heading',
        children: [textNode(`${trackName}_`)],
        direction: null,
        format: '',
        indent: 0,
        tag: 'h1',
        version: 1,
      },
      paragraph('from album '),
      paragraph('genre: '),
      {
        type: 'block',
        fields: {
          id: generateBlockId(),
          aspectRatio: '16/9',
          blockName: '',
          blockType: 'embed',
          embedCode: '<!-- TODO: paste streaming player embed code or URL here -->',
        },
        format: '',
        version: 2,
      },
      {
        type: 'block',
        fields: {
          id: generateBlockId(),
          blockName: '',
          blockType: 'buttonGrid',
          buttons: [
            {
              id: generateBlockId(),
              color: 'outline',
              icon: 'download',
              link: { type: 'custom', label: 'bandcamp', newTab: true, url: '#' },
            },
            {
              id: generateBlockId(),
              color: 'outline',
              icon: 'twitter',
              link: { type: 'custom', label: 'artwork', newTab: true, url: '#' },
            },
            {
              id: generateBlockId(),
              color: 'outline',
              link: { type: 'custom', label: 'album xfd', url: '#' },
            },
          ],
          columns: '3',
        },
        format: '',
        version: 2,
      },
      paragraph(''),
    ],
    direction: null,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})

/**
 * Creates a draft post for every media item that isn't already used as a
 * post's hero image, using the "ars" post as the layout/categories template.
 */
export const generateTrackPosts = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<{ created: string[]; skipped: number }> => {
  const [template, media, existingPosts] = await Promise.all([
    payload
      .find({
        collection: 'posts',
        depth: 0,
        limit: 1,
        overrideAccess: false,
        req,
        where: { slug: { equals: 'ars' } },
      })
      .then((res) => res.docs[0]),
    payload.find({
      collection: 'media',
      depth: 0,
      limit: 1000,
      overrideAccess: false,
      req,
    }),
    payload.find({
      collection: 'posts',
      depth: 0,
      limit: 1000,
      overrideAccess: false,
      req,
      select: { heroImage: true },
    }),
  ])

  const usedMediaIds = new Set(
    existingPosts.docs
      .map((post) => (typeof post.heroImage === 'object' ? post.heroImage?.id : post.heroImage))
      .filter((id): id is number => typeof id === 'number'),
  )

  const created: string[] = []
  let skipped = 0

  for (const file of media.docs) {
    if (usedMediaIds.has(file.id)) {
      skipped += 1
      continue
    }

    const trackName = (file.filename || `media-${file.id}`).replace(/\.[^/.]+$/, '')

    await payload.create({
      collection: 'posts',
      data: {
        title: trackName,
        _status: 'draft',
        authors: template?.authors,
        categories: template?.categories,
        content: buildTrackContent({ mediaId: file.id, trackName }),
        heroImage: file.id,
      },
      draft: true,
      req,
    })

    created.push(trackName)
  }

  return { created, skipped }
}
