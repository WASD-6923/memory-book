<script setup lang="ts">
import LogoIcon from '@/components/LogoIcon.vue'
</script>

<template>
  <div class="layout-footer">
    <LogoIcon />
    <a
      href="https://memory-book.space"
      target="_blank"
      rel="noopener noreferrer"
      class="text-primary font-bold hover:underline"
      >Книга памяти</a
    >
    by
    <a
      href="https://github.com/WASD-6923/memory-book"
      target="_blank"
      rel="noopener noreferrer"
      class="text-primary font-bold hover:underline"
      >Techno-hack</a
    >
    {{ new Date().getFullYear() }}
  </div>
</template>
