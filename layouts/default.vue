<template>
  <div>
    <header class="top-0 sticky bg-background/75 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <navigation-bar />
    </header>
    <main class="min-h-[calc(100vh-var(--header-height))]">
      <slot />
    </main>
  </div>
</template>
