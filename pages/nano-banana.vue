<template>
  <div>
    <Head>
      <Title>Nano Banana AI | Next-Generation AI Image Generation & Editing</Title>
      <Meta name="description" content="Experience Nano Banana AI, the state-of-the-art image Editor model for creating stunning visuals and performing intelligent, text-based image editing. Perfect for creators and marketers." />
      <Meta name="keywords" content="Nano Banana AI, AI image generator, image Editor, AI image editing, generative AI, content creation, marketing visuals" />
      <Link rel="preconnect" href="https://fonts.googleapis.com" />
      <Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <Link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700;800&family=Inter:wght@400;500&display=swap" rel="stylesheet" />
    </Head>
    <div class="bg-banana-dark-bg text-banana-text-light font-['Inter']">
      <Hero />
      <About />
      <Features />
      <Benefits />
      <WhyChooseUs />
      <Faq />
    </div>
  </div>
</template>

<script setup lang="ts">
import Hero from '~/components/banana/Hero.vue';
import About from '~/components/banana/About.vue';
import Features from '~/components/banana/Features.vue';
import Benefits from '~/components/banana/Benefits.vue';
import WhyChooseUs from '~/components/banana/WhyChooseUs.vue';
import Faq from '~/components/banana/Faq.vue';
</script>
