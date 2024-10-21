<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import { AppBskyRichtextFacet, RichText } from '@atproto/api'

definePageMeta({ name: 'profile' })

const agent = useAgent()
const route = useRoute('profile')
// const { parseRichText } = useRichText()

const { data } = await useAsyncData(async () => {
  const profile = await agent.app.bsky.actor.getProfile({ actor: route.params.handle })

  // const rt = await parseRichText(profile.data.description)

  return {
    ...profile.data,
    // description: rt,
  }
})

// const description = computedAsync(async () => {
//   if (!data.value?.description)
//     return null

const description = ref<null | RichText >(null)

// whenever(() => data.value, async (d) => {
if (data.value?.description) {
  const rt = new RichText({ text: data.value.description })
  await rt.detectFacets(agent)
  description.value = rt
}

const items = computed(() => {
  const tis: TabsItem[] = [
    { label: 'Posts' },
    { label: 'Replies' },
    { label: 'Media' },
  ]

  if (data.value?.associated?.feedgens)
    tis.push({ label: 'Feeds' })

  if (data.value?.associated?.starterPacks)
    tis.push({ label: 'Starter Packs' })

  if (data.value?.associated?.lists)
    tis.push({ label: 'Lists' })

  return tis
})
// })
</script>

<template>
  <main v-if="data">
    <div class="relative">
      <!-- banner -->
      <div class="h-[12rem] overflow-hidden">
        <img :src="data.banner" class="object-cover h-full w-full">
      </div>
      <!-- profile -->
      <div class="p-4 gap-1 flex flex-col">
        <!-- actions -->
        <div class="flex items-center justify-end gap-2">
          <UButton icon="mingcute-add-line">
            Follow
          </UButton>
          <UButton icon="mingcute-more-1-line" color="neutral" variant="soft" />
        </div>
        <!-- name & handle -->
        <div class="">
          <div class="text-3xl font-bold">
            {{ data.displayName }}
          </div>
          <div class="text-[var(--ui-text-muted)] -mt-1">
            {{ `@${data.handle}` }}
          </div>
        </div>
        <!-- stats -->
        <div class="inline-flex gap-2">
          <span class="inline-flex gap-1">
            <span class="font-semibold">{{ data.followersCount }}</span>
            <span class="text-[var(--ui-text-muted)]">followers</span>
          </span>
          <span class="inline-flex gap-1">
            <span class="font-semibold">{{ data.followsCount }}</span>
            <span class="text-[var(--ui-text-muted)]">following</span>
          </span>
          <span class="inline-flex gap-1">
            <span class="font-semibold">{{ data.postsCount }}</span>
            <span class="text-[var(--ui-text-muted)]">posts</span>
          </span>
        </div>
        <!-- description -->
        <div v-if="description" class="whitespace-pre-wrap break-words mt-1">
          <template v-for="segment, key in description.segments()" :key>
            <RichTextMention
              v-if="AppBskyRichtextFacet.isMention(segment.mention)"
              :mention="segment.mention"
              :text="segment.text"
            />
            <RichTextLink
              v-else-if="AppBskyRichtextFacet.isLink(segment.link)"
              :link="segment.link"
              :text="segment.text"
            />
            <RichTextTag
              v-else-if="AppBskyRichtextFacet.isTag(segment.tag)"
              :tag="segment.tag"
              :text="segment.text"
              :author="data.handle"
            />
            <template v-else>
              {{ segment.text }}
            </template>
          </template>
        </div>
      </div>
      <!-- avatar -->
      <div class="absolute top-[9rem] left-2.5 rounded-full border-[var(--ui-bg)] border-2">
        <UAvatar :src="data.avatar" class="w-[6rem] h-[6rem] border-[var(--ui-border-accented)] border-1" />
      </div>
    </div>
    <div class="sticky top-0">
      <UTabs :ui="{ list: 'bg-[var(--ui-bg)]' }" size="xl" variant="link" :items />
    </div>
    <div class="p-4">
      <div class="break-words whitespace-break-spaces">
        {{ "Cat ipsum dolor sit amet, i hate cucumber pls dont throw it at me. Purrr purr littel cat, little cat purr purr lies down behind the couch. Cat ass trophy stare at owner accusingly then wink for meoooow so climb into cupboard and lick the salt off rice cakes play time i like to spend my days sleeping and eating fishes that my human fished for me we live on a luxurious yacht, sailing proudly under the sun, i like to walk on the deck, watching the horizon, dreaming of a good bowl of milk. Bawl under human beds cat playing a fiddle in hey diddle diddle? bite nose of your human yet sleep in the bathroom sink hiss and stare at nothing then run suddenly away scratch at the door then walk away you call this cat food. Leave fur on owners clothes for plop down in the middle where everybody walks damn that dog yet pounce on unsuspecting person. Morning beauty routine of licking self walk on a keyboard but proudly present butt to human. Jump launch to pounce upon little yarn mouse, bare fangs at toy run hide in litter box until treats are fed run at 3am. If it fits, i sits purr for no reason and im so hungry i'm so hungry but ew not for that . Lick sellotape spill litter box, scratch at owner, destroy all furniture, especially couch. Do doodoo in the litter-box, clickityclack on the piano, be frumpygrumpy Gate keepers of hell purr when being pet yet toilet paper attack claws fluff everywhere meow miao french ciao litterbox all of a sudden cat goes crazy get scared by sudden appearance of cucumber for fish i must find my red catnip fishy fish. do not try to mix old food with new one to fool me! put toy mouse in food bowl run out of litter box at full speed for jump on counter removed by human jump on counter again removed by human meow before jumping on counter this time to let the human know am coming back eats owners hair then claws head or meow meow pee in shoe refuse to leave cardboard box. Eat a rug and furry furry hairs everywhere oh no human coming lie on counter don't get off counter cough stare out cat door then go back inside. Why can't i catch that stupid red dot refuse to drink water except out of someone's glass so unwrap toilet paper eat from dog's food bawl under human beds pet right here, no not there, here, no fool, right here that other cat smells funny you should really give me all the treats because i smell the best and omg you finally got the right spot and i love you right now. Ask for petting. All of a sudden cat goes crazy annoy the old grumpy cat, start a fight and then retreat to wash when i lose cat cat moo moo lick ears lick paws, or throw down all the stuff in the kitchen and scratch at door to be let outside, get let out then scratch at door immmediately after to be let back in licks your face, hack up furballs. Weigh eight pounds but take up a full-size bed warm up laptop with butt lick butt fart rainbows until owner yells pee in litter box hiss at cats decide to want nothing to do with my owner today, licks your face yet licks your face toy mouse squeak roll over rub my belly hiss. " }}
      </div>
    </div>
  </main>
</template>
