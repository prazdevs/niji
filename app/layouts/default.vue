<template>
  <div class="h-full">
    <main class="flex w-full mx-auto lg:max-w-5xl">
      <aside class="hidden sm:flex w-1/8 lg:w-1/4 justify-end bg-blue-900">
        <div>
          <div class="flex items-center gap-1">
            <div class="rounded-full border-primary overflow-hidden aspect-square ">
              <UIcon name="fluent-emoji-flat-rainbow-flag" class="size-10 scale-160" />
            </div>
            <div class="font-brand text-3xl">
              Niji
            </div>
          </div>
        </div>
      </aside>
      <div class="w-full min-h-screen">
        <slot />
      </div>
      <aside class="hidden sm:flex w-1/8 lg:w-1/4 justify-start bg-green-900">
        ASIDE RIGHT
      </aside>
    </main>
  </div>
</template>
