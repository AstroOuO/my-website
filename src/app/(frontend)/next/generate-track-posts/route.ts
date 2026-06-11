import { createLocalReq, getPayload } from 'payload'
import { generateTrackPosts } from '@/endpoints/generateTrackPosts'
import config from '@payload-config'
import { headers } from 'next/headers'

export const maxDuration = 60 // This function can run for a maximum of 60 seconds

export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()

  // Authenticate by passing request headers
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return new Response('Action forbidden.', { status: 403 })
  }

  try {
    const payloadReq = await createLocalReq({ user }, payload)

    const result = await generateTrackPosts({ payload, req: payloadReq })

    return Response.json(result)
  } catch (e) {
    payload.logger.error({ err: e, message: 'Error generating track posts' })
    return new Response('Error generating track posts.', { status: 500 })
  }
}
