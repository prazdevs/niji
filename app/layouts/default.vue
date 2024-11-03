<template>
  <div class="h-full">
    <main class="flex w-full mx-auto lg:max-w-5xl">
      <aside class="hidden p-2 sm:flex w-1/8 lg:w-1/4 justify-end">
        <div class="flex flex-col gap-4">
          <!-- LOGO -->
          <div class="flex items-center gap-1">
            <BskyLogo class="w-[3rem]" />
            <!-- <div class="rounded-full border-primary overflow-hidden aspect-square ">
              <UIcon name="fluent-emoji-flat-rainbow-flag" class="size-10 scale-160" />
            </div> -->
            <!-- <div class="font-brand text-3xl">
              Niji
            </div> -->
          </div>

          <div class="text-sm">
            Sign in to join the conversation
          </div>
          <div>
            <UButton label="Sign in" size="sm" />
          </div>
        </div>
      </aside>
      <div class="w-full min-h-screen">
        <slot />
      </div>
      <aside class="hidden p-2 sm:flex w-1/8 lg:w-1/4 justify-start">
        <div>
          <!-- TODO: fix label/a11y -->
          <UInput class="hidden lg:inline" icon="mingcute-search-3-line" placeholder="Search" />
        </div>
      </aside>
    </main>
  </div>
</template>
