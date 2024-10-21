export default defineAppConfig({
  ui: {
    colors: {
      primary: 'purple',
      neutral: 'zinc',
    },
    container: {
      base: 'max-w-2xl border-x-1 border-[var(--ui-border-accented)] px-0 sm:px-0 lg:px-0',
    },
    dropdownMenu: {
      slots: {
        content: 'divide-[var(--ui-border-accented)] ring-[var(--ui-border-accented)]',
        separator: 'bg-[var(--ui-border-accented)]',
      },
    },
    separator: {
      variants: {
        color: {
          neutral: {
            border: 'border-[var(--ui-border-accented)]',
          },
        },
      },
    },
  },
})
