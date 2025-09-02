<template>
  <div class="text-center">
    <h1 class="font-['Poppins'] text-6xl md:text-8xl font-extrabold mb-6 bg-gradient-to-r from-[#6209F6] via-[#DC8AF6] to-[#83D0FB] text-transparent bg-clip-text">
      {{ title }}
    </h1>
    <p class="text-xl text-banana-text-muted max-w-2xl mx-auto">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
});
</script> 