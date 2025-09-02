<template>
  <div class="relative py-16 sm:py-20">
    <div
      aria-hidden="true"
      class="absolute inset-0 bg-gray-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
    ></div>
    <div class="mx-auto max-w-7xl px-6 lg:px-8 relative">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl text-shadow-glow">Why Professionals Love The SeedEdit AI Video Editor</h2>
        <p class="mt-6 text-lg leading-8 text-gray-300">
          Discover why filmmakers, marketers, and content creators trust SeedEdit AI for professional video editing.
        </p>
      </div>
      <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <!-- Testimonial 1 -->
        <article class="relative overflow-hidden rounded-xl border border-gray-700 bg-gray-800 p-8">
          <div class="absolute -top-2 left-4 text-8xl text-gray-600 font-serif opacity-50 z-0">"</div>
          <blockquote class="relative z-10">
            <p class="text-lg text-gray-300 mb-6">"This is a total game-changer for our production team. We can finally edit videos with professional quality without the steep learning curve of traditional software. SeedEdit AI has slashed our editing time by over 60% and our video quality has improved dramatically."</p>
            <footer class="flex items-center gap-4 border-t border-gray-700 pt-6">
              <img class="h-12 w-12 rounded-full object-cover" src="/img/default-avatar.png" alt="Photo of Sarah K.">
              <div>
                <strong class="block font-bold text-white">Sarah K.</strong>
                <span class="text-sm text-gray-400">Video Production Manager</span>
              </div>
              <div class="ml-auto flex gap-0.5">
                <!-- 5 Stars -->
                <svg v-for="i in 5" :key="i" class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              </div>
            </footer>
          </blockquote>
        </article>

        <!-- Testimonial 2 -->
        <article class="relative overflow-hidden rounded-xl border border-gray-700 bg-gray-800 p-8">
          <div class="absolute -top-2 left-4 text-8xl text-gray-600 font-serif opacity-50 z-0">"</div>
          <blockquote class="relative z-10">
            <p class="text-lg text-gray-300 mb-6">"As a freelance videographer, I used to spend hours on color grading and effects. SeedEdit AI understands exactly what I want and applies professional techniques automatically. The quality is incredible, and I can focus on capturing great footage instead of endless post-production."</p>
            <footer class="flex items-center gap-4 border-t border-gray-700 pt-6">
              <img class="h-12 w-12 rounded-full object-cover" src="/img/default-avatar.png" alt="Photo of Alex R.">
              <div>
                <strong class="block font-bold text-white">Alex R.</strong>
                <span class="text-sm text-gray-400">Freelance Videographer</span>
              </div>
              <div class="ml-auto flex gap-0.5">
                <!-- 5 Stars -->
                <svg v-for="i in 5" :key="i" class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              </div>
            </footer>
          </blockquote>
        </article>

        <!-- Testimonial 3 -->
        <article class="relative overflow-hidden rounded-xl border border-gray-700 bg-gray-800 p-8">
          <div class="absolute -top-2 left-4 text-8xl text-gray-600 font-serif opacity-50 z-0">"</div>
          <blockquote class="relative z-10">
            <p class="text-lg text-gray-300 mb-6">"I run a small marketing agency, and professional video editing was always our biggest expense. Now, we create stunning promotional videos and social media content in minutes. It's our go-to tool for making our clients' videos look amazing on a budget."</p>
            <footer class="flex items-center gap-4 border-t border-gray-700 pt-6">
              <img class="h-12 w-12 rounded-full object-cover" src="/img/default-avatar.png" alt="Photo of Maria G.">
              <div>
                <strong class="block font-bold text-white">Maria G.</strong>
                <span class="text-sm text-gray-400">Founder, Creative Media Agency</span>
              </div>
              <div class="ml-auto flex gap-0.5">
                <!-- 5 Stars -->
                <svg v-for="i in 5" :key="i" class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              </div>
            </footer>
          </blockquote>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// This component is static and does not require any script.
</script>

<style scoped>
/* A generic serif font is used for the quote mark. If 'Playfair Display' is available in the project, it would be used. */
.font-serif {
  font-family: 'Playfair Display', serif;
}
.text-shadow-glow {
  text-shadow:
    0 0 5px rgba(120, 119, 198, 0.5),
    0 0 10px rgba(120, 119, 198, 0.4),
    0 0 20px rgba(120, 119, 198, 0.3);
}
</style>
