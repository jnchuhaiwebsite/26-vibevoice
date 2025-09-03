<template>
  <div class="relative w-full overflow-hidden bg-[#0B0B12] pt-48">
    <div class="aurora-background"></div>
    <div class="container mx-auto px-6 relative z-10">
      <h1 class="text-5xl md:text-5xl leading-tight tracking-tighter text-white text-center">
        <span class="hero-gradient-text">VibeVoice</span> - Podcast Generator
      </h1>
      <p class="mt-6 text-xl text-[#D1D5DB] max-w-3xl mx-auto text-center mb-12">
        Effortlessly create multi-speaker podcasts from your text scripts with realistic AI voices.
      </p>
      
      <!-- 主布局：两列网格 -->
      <VibeVoiceGenerator />
    </div>
  </div>
</template>

<script setup lang="ts">
// 页面级别的逻辑（如果需要的话）
</script>

<style scoped>
/* 页面级别的样式 */
</style>