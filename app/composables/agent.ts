// import type {AtpSessionData, AtpSessionEvent } from '@atproto/api'
import { AtpAgent } from '@atproto/api'

export const useAgent = createGlobalState(() => {
  // const { clearSession, saveSession, session } = useSession()

  // const agent = new AtpAgent({
    // service: 'https://bsky.social',
    // persistSession: (evt: AtpSessionEvent, sess?: AtpSessionData) => {
    //   switch(evt) {
    //     case 'create':
    //     case 'update':
    //       if (!sess) throw new Error('unreachable') //todo error management
    //       saveSession(sess)
    //       break
    //     case 'expired':
    //       clearSession()
    //       break
    //   }
    // }
  // })

  const agent = new AtpAgent({
    service: 'https://api.bsky.app'
  })

  return agent
})
