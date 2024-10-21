<script setup lang="ts">
import { AppBskyEmbedImages, AppBskyFeedDefs, AppBskyFeedPost } from '@atproto/api'
import { formatDate } from '@vueuse/core'
import { joinURL } from 'ufo'

definePageMeta({ name: 'post' })

const toast = useToast()
const agent = useAgent()
const route = useRoute('post')
const uri = joinURL(
  'at://',
  route.params.handle,
  'app.bsky.feed.post',
  route.params.rkey,
)

const { data } = await useAsyncData(async () => {
  const thread = await agent.app.bsky.feed.getPostThread({ uri })

  if (!AppBskyFeedDefs.isThreadViewPost(thread.data.thread)) {
    throw new Error('Expected a thread view post')
  }

  const post = thread.data.thread.post

  if (!AppBskyFeedPost.isRecord(post.record)) {
    throw new Error('Expected a post with a record')
  }

  return { ...post, record: post.record, replies: thread.data.thread.replies }
})

const { copy: copyLink, copied: copiedLink } = useClipboard({
  source: joinURL('https://bsky.app', 'profile', route.params.handle, 'post', route.params.rkey),
})
const { copy: copyText, copied: copiedText } = useClipboard({
  source: data.value?.record.text,
})

whenever(copiedLink, () => toast.add({
  title: 'Post link copied to clipboard',
  // color: 'primary',
  icon: 'mingcute-clipboard-line',
}))
whenever(copiedText, () => toast.add({
  title: 'Post text copied to clipboard',
  icon: 'mingcute-clipboard-line',
}))
</script>

<template>
  <main v-if="data">
    <div class="flex flex-col">
      <div class="p-2 flex items-center justify-center text-xl font-bold">
        Post
      </div>
      <USeparator />
      <!--  Main post -->
      <div class="flex flex-col p-4 gap-2">
        <!-- avatar + handle -->
        <div class="flex items-center gap-4">
          <UAvatar class="shrink-1" :src="data.author.avatar" size="2xl" />
          <div class="flex-1">
            <div class="text-md font-bold">
              {{ data.author.displayName }}
            </div>
            <div class="text-sm text-[var(--ui-text-muted)]">
              {{ `@${data.author.handle}` }}
            </div>
          </div>
          <UButton class="self-start" icon="mingcute-add-line" label="Follow" size="md" />
        </div>
        <!-- content -->
        <RichText class="text-lg" :text="data.record.text" :facets="data.record.facets" :author="data.author.handle" />
        <!-- embeds -->
        <div v-if="AppBskyEmbedImages.isView(data.embed)">
          <!-- 3 images -->
          <div v-if="data.embed.images.length === 3" class="flex aspect-[2/1] overflow-hidden rounded-lg">
            <div class="flex flex-1 gap-1">
              <div class="flex flex-1">
                <img :src="data.embed.images[0]?.thumb" class="w-full h-full object-cover">
              </div>
              <div class="flex flex-col flex-1 gap-1">
                <div class="flex flex-1 overflow-hidden">
                  <img :src="data.embed.images[1]?.thumb" class="w-full h-full object-cover">
                </div>
                <div class="flex flex-1 overflow-hidden">
                  <img :src="data.embed.images[2]?.thumb" class="w-full h-full object-cover">
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="data.embed.images.length === 4" class="flex flex-col gap-1 overflow-hidden rounded-lg">
            <div class="flex flex-row gap-1">
              <div class=" flex flex-1 aspect-[1.5/1]">
                <img :src="data.embed.images[0]?.thumb" class="w-full h-full object-cover">
              </div>
              <div class=" flex flex-1 aspect-[1.5/1]">
                <img :src="data.embed.images[1]?.thumb" class="w-full h-full object-cover">
              </div>
            </div>
            <div class="flex flex-row gap-1">
              <div class=" flex flex-1 aspect-[1.5/1]">
                <img :src="data.embed.images[2]?.thumb" class="w-full h-full object-cover">
              </div>
              <div class=" flex flex-1 aspect-[1.5/1]">
                <img :src="data.embed.images[3]?.thumb" class="w-full h-full object-cover">
              </div>
            </div>
          </div>
        </div>
        <!-- date -->
        <div class="text-sm text-[var(--ui-text-muted)]">
          <span>{{ formatDate(new Date(data.record.createdAt), 'MMMM D, YYYY - H:mm A', { locales: 'en' }) }}</span>
        </div>
        <USeparator size="xs" />
        <!-- stats -->
        <div class="text-[var(--ui-text-muted)] inline-flex gap-3">
          <span>
            <span class="text-[var(--ui-text)] font-semibold">{{ data.repostCount }}</span> repost(s)
          </span>
          <span>
            <span class="text-[var(--ui-text)] font-semibold">{{ data.quoteCount }}</span> quote(s)
          </span>
          <span>
            <span class="text-[var(--ui-text)] font-semibold">{{ data.likeCount }}</span> like(s)
          </span>
        </div>
        <USeparator size="xs" />
        <!-- actions -->
        <div class="flex justify-between items-center -mx-1.5 -mb-2">
          <UButton icon="mingcute-message-2-line" color="neutral" variant="ghost" size="lg" class="py-2 px-1.5 text-[var(--ui-text-muted)]">
            {{ data.replyCount }}
          </UButton>
          <UButton icon="mingcute-repeat-line" color="neutral" variant="ghost" size="lg" class="py-2 px-1.5 text-[var(--ui-text-muted)]">
            {{ data.repostCount }}
          </UButton>
          <UButton icon="mingcute-heart-line" color="neutral" variant="ghost" size="lg" class="py-2 px-1.5 text-[var(--ui-text-muted)]">
            {{ data.likeCount }}
          </UButton>
          <UButton icon="mingcute-share-3-line" color="neutral" variant="ghost" size="lg" class="py-2 px-1.5 text-[var(--ui-text-muted)]" @click="() => copyLink()" />
          <UDropdownMenu
            size="lg"
            :content="{ align: 'end' }"
            :items="[
              // TODO use onSelect when fixed
              // @ts-expect-error
              { label: 'Translate', icon: 'mingcute-translate-2-line' },
              // @ts-expect-error
              { label: 'Copy post text', icon: 'mingcute-clipboard-line', select: copyText },
              // @ts-expect-error
              { label: 'Copy link to post', icon: 'mingcute-share-3-line', select: copyLink },
              // @ts-expect-error
              { label: 'Embed post', icon: 'mingcute-code-line' },
            ]"
          >
            <UButton icon="mingcute-more-1-line" color="neutral" variant="ghost" size="lg" class="py-2 px-1.5 text-[var(--ui-text-muted)]" />
          </UDropdownMenu>
        </div>
      </div>
      <USeparator />
      <div class="">
        <template v-for="reply in data.replies" :key="reply.uri">
          <template v-if="AppBskyFeedDefs.isThreadViewPost(reply) && AppBskyFeedPost.isRecord(reply.post.record)">
            <div class="flex p-4 gap-4">
              <UAvatar :src="reply.post.author.avatar" size="2xl" />
              <div class="flex flex-1 flex-col gap-2">
                <div class="inline-flex gap-1">
                  <span class="font-semibold">{{ reply.post.author.displayName }}</span>
                  <span class="text-[var(--ui-text-muted)]">{{ `@${reply.post.author.handle}` }}</span>
                </div>
                <RichText :text="reply.post.record.text" :facets="reply.post.record.facets" />
                <div class="flex justify-between items-center -mx-1.5 -mb-2">
                  <div class="flex flex-1">
                    <UButton icon="mingcute-message-2-line" color="neutral" variant="ghost" size="lg" class="py-2 px-1.5 text-[var(--ui-text-muted)]">
                      {{ reply.post.replyCount }}
                    </UButton>
                  </div>
                  <div class="flex flex-1">
                    <UButton icon="mingcute-repeat-line" color="neutral" variant="ghost" size="lg" class="py-2 px-1.5 text-[var(--ui-text-muted)]">
                      {{ reply.post.repostCount }}
                    </UButton>
                  </div>
                  <div class="flex flex-1">
                    <UButton icon="mingcute-heart-line" color="neutral" variant="ghost" size="lg" class="py-2 px-1.5 text-[var(--ui-text-muted)]">
                      {{ reply.post.likeCount }}
                    </UButton>
                  </div>
                  <div class="flex flex-1">
                    <UButton icon="mingcute-more-1-line" color="neutral" variant="ghost" size="lg" class="py-2 px-1.5 text-[var(--ui-text-muted)]" />
                  </div>
                </div>
              </div>
            </div>
            <USeparator />
          </template>
        </template>
      </div>
    </div>
  </main>
</template>
