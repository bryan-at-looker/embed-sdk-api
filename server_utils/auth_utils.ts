import {
  Looker40SDK
} from '@looker/sdk'

import { NodeSession, NodeSettings } from '@looker/sdk-rtl'

const settings = new NodeSettings('LOOKERSDK')
const session = new NodeSession(settings)
const sdk = new Looker40SDK(session)

export async function apiSignedUrl (url: string, user: any) {
  let signed = await sdk.ok(sdk.create_sso_embed_url({
    target_url: `${process.env.LOOKER_HOST_URL}${url}`,
    ...user
  }))
  return signed
}