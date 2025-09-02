<template>
  <div class="flex flex-col min-h-screen">
    <Navbar/>
    <main class="flex-grow">
      <slot />
    </main>
    <Footer />
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import Navbar from '~/components/Navbar.vue'

const Footer = defineAsyncComponent(() => import('~/components/Footer.vue'))
const BackToTop = defineAsyncComponent(() => import('~/components/BackToTop.vue'))
</script>