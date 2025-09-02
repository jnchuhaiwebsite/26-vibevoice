<template>
  <div class="bg-gradient-to-b from-gray-900 to-gray-800 py-20 sm:py-32">
    <div class="container mx-auto px-4">
      <h2
        class="text-3xl sm:text-4xl font-bold text-center mb-4 text-[#00ffd1]"
      >
      SeedEdit 3.0 - FAQ
      </h2>
      <p class="text-lg text-gray-300 text-center max-w-3xl mx-auto mb-16">
        Discover everything you need to know about our AI-powered image editor. From technical capabilities and usage rights to getting the most out of every feature, we've got you covered.
      </p>
      <div class="faq-accordion max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="(item, index) in faqItems"
          :key="index"
          class="bg-gradient-to-b from-gray-900 to-gray-800/80 backdrop-blur-sm border border-white/10 rounded-lg p-6"
        >
          <div class="flex items-center font-semibold text-lg text-gray-100">
            <span class="mr-4 text-teal-400 font-bold text-xl">{{ String(index + 1).padStart(2, '0') }}</span>
            <h3>{{ item.question }}</h3>
          </div>
          <div class="pt-3 text-gray-400 ml-10">
            {{ item.answer }}
          </div>
        </div>
      </div>
      <div class="max-w-7xl mx-auto">
        <!-- Call to Action Section -->
        <section class="text-center mt-16 sm:mt-20">
          <div class="bg-gray-800 border border-gray-700 rounded-2xl py-12 px-8">
              <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Ready to Revolutionize Your Workflow?</h2>
              <p class="mt-4 text-lg text-gray-300">Join thousands of creators and professionals transforming their ideas into stunning visuals. Start for free and experience the future of image editing.</p>
              <a href="#" class="mt-8 inline-block bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white font-bold py-4 px-10 rounded-full text-lg transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg" title="Try SeedEdit AI for Free">Start Creating with AI Now</a>
          </div>
        </section>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
const faqItems = [
  {
    question: "How does the SeedEdit 3.0 AI editor work?",
    answer: "Using the SeedEdit 3.0 editor is designed to be intuitive. Just upload an image, describe your desired changes in either English or Chinese, and hit 'Generate.' The powerful AI within SeedEdit processes your request to deliver professional-grade edits in seconds.",
  },
  {
    question: "How are credits used for image generation in SeedEdit?",
    answer: "Within SeedEdit, each complete image generation costs just one credit. This transparent system ensures you only pay for what you create. You can easily monitor and reload your credit balance in your SeedEdit account dashboard.",
  },
  {
    question: "What's the typical processing time for a SeedEdit AI edit?",
    answer: "Our powerful AI, the core of SeedEdit, typically delivers your edited image in about 60 seconds. While this can vary with request complexity and server traffic, the SeedEdit platform is fully optimized for speed.",
  },
  {
    question: "What are the requirements for images uploaded to SeedEdit?",
    answer: "To get the best results from SeedEdit, please ensure your image meets these requirements: format must be JPEG or PNG, with an aspect ratio between 1:3 and 3:1. Both width and height must be greater than 14 pixels, and the file size cannot exceed 10MB. Following these guidelines helps the SeedEdit AI perform with maximum accuracy.",
  },
  {
    question: "Do I have commercial rights to the images I create with SeedEdit?",
    answer: "Absolutely. You retain full commercial rights for any image generated through your SeedEdit account. Feel confident using your SeedEdit creations for business, marketing, or personal projects without any restrictions.",
  },
  {
    question: "What makes SeedEdit 3.0 different from other photo editors?",
    answer: "Unlike traditional photo editors, SeedEdit 3.0 uses advanced AI to understand plain English commands. This unique approach by SeedEdit eliminates the steep learning curve, allowing you to achieve complex, professional results in a fraction of the time.",
  }
];
</script>

<style scoped>
/* Scoped styles can remain if there are any others, otherwise this block can be removed if empty. */
</style>
