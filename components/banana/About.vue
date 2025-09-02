<template>
  <section id="about" class="relative overflow-hidden py-20 md:py-32 border-b border-banana-border-color">
    <!-- Background Glow -->
    <div aria-hidden="true" class="absolute inset-0 -z-10">
      <div class="absolute inset-0 bg-banana-dark-bg"></div>
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--banana-secondary-blue-rgb),0.1)_0%,transparent_80%)]"></div>
    </div>

    <div class="container max-w-6xl mx-auto px-6">
      <div class="section-header text-center mb-16">
        <h2 class="font-['Poppins'] text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-banana-primary-yellow to-banana-secondary-blue text-transparent bg-clip-text">
          What Is Nano Banana AI?
        </h2>
        <p class="text-lg text-banana-text-muted max-w-3xl mx-auto">
          Discover the state-of-the-art AI that transforms your text into
          breathtaking visuals and intelligently edits images with simple
          commands.
        </p>
      </div>
      
      <div class="relative bg-banana-card-bg/50 rounded-2xl p-8 md:p-12 border border-banana-border-color/30 shadow-xl shadow-banana-secondary-blue/10 backdrop-blur-sm">
        <svg class="absolute top-6 left-6 md:top-8 md:left-8 w-10 h-10 text-banana-border-color/30 opacity-50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
        <p class="text-center text-lg md:text-xl text-banana-text-light leading-relaxed max-w-3xl mx-auto">
          Nano Banana AI represents the next frontier in generative artificial
          intelligence. Born from cutting-edge research and validated by top
          performance on platforms like LMArena, it is a premier text-to-image
          model designed for excellence. More than just a generator, it offers an
          unparalleled ability to understand complex prompts and, uniquely, allows
          users to modify existing images using natural language. This seamless
          fusion of creation and editing makes it the indispensable tool for
          professionals who demand quality, speed, and creative freedom.
        </p>
        <svg class="absolute bottom-6 right-6 md:bottom-8 md:right-8 w-10 h-10 text-banana-border-color/30 opacity-50 transform rotate-180" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Since Tailwind doesn't support RGBA colors directly in gradients, 
// we need to define the color in a way that can be used in a style attribute if needed.
// However, here we are using a pseudo-class trick with rgba in the class itself.
// We need to add the RGB values for our theme color to tailwind.config.ts if we want to use it like this.
// For now, I'll just hardcode it. Let's assume banana-secondary-blue is #00BFFF
const bananaSecondaryBlueRgb = '0, 191, 255';
</script>
<style scoped>
/* A utility class for radial gradient with variable color might be needed in a global CSS if used often */
.bg-radial-gradient-banana {
  background-image: radial-gradient(ellipse at center, rgba(var(--banana-secondary-blue-rgb), 0.1) 0%, transparent 80%);
}
</style>
