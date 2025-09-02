<template>
  <div class="relative py-20 sm:py-32">
    <div
      aria-hidden="true"
      class="absolute inset-0 bg-gray-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
    ></div>
    <div class="container mx-auto px-4 relative">
      <h2
        class="text-3xl sm:text-4xl font-bold text-center mb-4 text-white text-shadow-glow"
      >
        SeedEdit 3.0 Advantage
      </h2>
      <p class="mb-12 mt-4 text-lg text-gray-300 text-center max-w-3xl mx-auto">
        Discover the unique features that make SeedEdit 3.0 AI the ultimate
        tool for high-quality, professional image editing.
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          class="relative bg-gradient-to-b from-gray-900 to-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border-gradient-animated"
        >
          <h3 class="text-2xl font-bold mb-4 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-white"
            >
              <path d="m12 14 4-4" />
              <path d="M3.34 19a10 10 0 1 1 17.32 0" />
            </svg>
            High-Precision Editing
          </h3>
          <p class="text-gray-400">
            Edit images with pixel-perfect precision, maintaining original quality
            while applying sophisticated transformations.
          </p>
        </div>
        <div
          class="relative bg-gradient-to-b from-gray-900 to-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border-gradient-animated"
        >
          <h3 class="text-2xl font-bold mb-4 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-white"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <line x1="10" y1="9" x2="8" y2="9" />
            </svg>
            Natural Language Editing
          </h3>
          <p class="text-gray-400">
            Simply describe your desired edits in plain language, and our AI 
            understands and executes complex editing tasks automatically.
          </p>
        </div>
        <div
          class="relative bg-gradient-to-b from-gray-900 to-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border-gradient-animated"
        >
          <h3 class="text-2xl font-bold mb-4 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-white"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <path d="m3.3 7 8.7 5 8.7-5" />
              <path d="M12 22V12" />
            </svg>
            Smart Object Manipulation
          </h3>
          <p class="text-gray-400">
            Intelligently identify and modify specific objects or elements in your images
            without affecting the surrounding areas.
          </p>
        </div>
        <div
          class="relative bg-gradient-to-b from-gray-900 to-gray-800/80 backdrop-blur-sm p-8 rounded-2xl border-gradient-animated"
        >
          <h3 class="text-2xl font-bold mb-4 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-white"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            Instant Results
          </h3>
          <p class="text-gray-400">
            Get professional-quality edits in seconds, not hours, saving you valuable time
            while delivering stunning results.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic here
</script>

<style scoped>
.text-shadow-glow {
  text-shadow:
    0 0 5px rgba(120, 119, 198, 0.5),
    0 0 10px rgba(120, 119, 198, 0.4),
    0 0 20px rgba(120, 119, 198, 0.3);
}

.border-gradient-animated {
  border: 1px solid transparent;
  background-clip: padding-box;
  position: relative;
  transition: all 0.3s ease-in-out;
}

.border-gradient-animated::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  margin: -1px; /* The width of the border */
  border-radius: inherit; /* Follow the parent's border radius */
  background: conic-gradient(
    from 180deg at 50% 50%,
    rgba(120, 119, 198, 0.5) 0%,
    rgba(59, 130, 246, 0.3) 50%,
    rgba(120, 119, 198, 0.5) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.border-gradient-animated:hover {
  transform: translateY(-0.25rem) scale(1.02);
  box-shadow: 0 0 20px rgba(120, 119, 198, 0.2);
}

.border-gradient-animated:hover::before {
  opacity: 1;
}
</style>
