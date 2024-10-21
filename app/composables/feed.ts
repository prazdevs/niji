import type { AppBskyFeedGetFeed } from '@atproto/api'

interface Options {
  feed: MaybeRefOrGetter<AppBskyFeedGetFeed.QueryParams['feed']>
  limit?: MaybeRefOrGetter<AppBskyFeedGetFeed.QueryParams['limit']>
  cursor?: MaybeRefOrGetter<AppBskyFeedGetFeed.QueryParams['cursor']>
}

export function useFeed(options: Options) {
  const agent = useAgent()

  return useAsyncData(async () => {
    const { data } = await agent.app.bsky.feed.getFeed({
      feed: toValue(options.feed),
      limit: toValue(options.limit),
      cursor: toValue(options.cursor),
    })

    return data.feed
  }, {
    watch: [() => toValue(options.feed)],
  })
}
