<template>
  <section id="hero">
    <div class="container mx-auto px-4">
      <PageHero 
        class="mt-20 mb-16"
        title="Nano Banana AI Image Editor "
        subtitle2="Edit Photos Instantly with Text"
        subtitle="Experience Nano Banana, the revolutionary AI image editor. Transform your photos with simple text commands for professional-grade results. Trusted by creators & businesses."
      />
      <Generator class="mt-12" />
    </div>
  </section>
</template>

<script setup lang="ts">
import PageHero from '~/components/PageHero.vue';
import Generator from '~/components/banana/Generator.vue';
</script>

<style scoped>
/* Scoped styles are no longer needed as Tailwind classes are used directly. */
/* Keeping the section id for potential navigation links. */
#hero {
  /* Basic structure remains, but colors and typography are in Tailwind classes. */
}

/* Responsive font size adjustments can also be handled by Tailwind's responsive variants, e.g., md:text-8xl */
</style>
