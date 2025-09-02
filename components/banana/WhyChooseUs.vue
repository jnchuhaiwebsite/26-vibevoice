<template>
  <section id="why-choose-us" class="py-20 md:py-32 border-b border-banana-border-color">
    <div class="container max-w-6xl mx-auto px-6">
      <div class="section-header text-center mb-16">
        <h2 class="font-['Poppins'] text-4xl md:text-5xl font-bold mb-4">Why Choose Nano Banana AI?</h2>
        <p class="text-lg text-banana-text-muted max-w-3xl mx-auto">
          Built on a foundation of superior performance, user-centric design,
          and relentless innovation.
        </p>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        <div 
          v-for="(reason, index) in reasons" 
          :key="index"
          class="flex flex-col bg-banana-card-bg border border-banana-border-color p-8 rounded-xl transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
        >

          <div class="flex-grow">
            <h3 class="font-['Poppins'] text-xl mb-3 text-banana-primary-yellow">{{ reason.title }}</h3>
            <p class="text-banana-text-muted">{{ reason.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const reasons = ref([
  {
    title: 'Power Beyond Limits',
    description: 'Consistently outperforming competitors in independent evaluations, our model delivers superior quality, accuracy, and prompt adherence.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>'
  },
  {
    title: 'Cutting-Edge Technology',
    description: 'Built on the latest breakthroughs in machine learning, ensuring you are always working with the most advanced AI technology available.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>'
  },
  {
    title: 'User-Centric Design',
    description: 'We designed our platform with an intuitive interface that makes sophisticated AI accessible to users of all skill levels, from beginner to expert.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>'
  },
  {
    title: 'Continuous Innovation',
    description: 'Benefit from regular model updates and feature enhancements. Our dedicated research team ensures you are always at the forefront of AI.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>'
  },
  {
    title: 'Reliable and Scalable',
    description: 'Whether you\'re an individual creator or a large enterprise, our robust infrastructure scales to meet your needs with consistent performance.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>'
  },
  {
    title: 'Community-Driven',
    description: 'Our platform evolves based on feedback from a global community of creators, ensuring we solve real-world creative challenges.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>'
  }
]);
</script>
