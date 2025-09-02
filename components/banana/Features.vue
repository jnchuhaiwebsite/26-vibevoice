<template>
  <section id="features" class="py-20 md:py-32 border-b border-banana-border-color">
    <div class="container max-w-6xl mx-auto px-6">
      <div class="section-header text-center mb-16">
        <h2 class="font-['Poppins'] text-4xl md:text-5xl font-bold mb-4">Banana AI: Core Advantages</h2>
        <p class="text-lg text-banana-text-muted max-w-3xl mx-auto">
          Explore the powerful toolkit designed to bring any vision to life with
          unprecedented speed and precision.
        </p>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        <div 
          v-for="(benefit, index) in features" 
          :key="index"
          class="flex flex-col bg-banana-card-bg border border-banana-border-color p-8 rounded-xl transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
        >
          <div class="flex-grow">
            <div class="flex items-center mb-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 rounded-lg bg-banana-primary-yellow/10 text-banana-primary-yellow flex items-center justify-center">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" v-html="benefit.icon"></svg>
                </div>
              </div>
              <h3 class="font-['Poppins'] text-xl ml-4 text-banana-primary-yellow">{{ benefit.title }}</h3>
            </div>
            <p class="text-banana-text-muted">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const features = ref([
  //   {
  //   title: 'Intuitive Editing',
  //   description: 'Modify any image by simply describing the changes you want. Add objects, change colors, or alter styles without complex software.',
  //   icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z"></path>'
  // },
  // {
  //   title: 'High-Resolution',
  //   description: 'Generate crisp, print-ready images perfect for marketing campaigns, digital content, and professional artistic projects.',
  //   icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>'
  // },
  // {
  //   title: 'Blazing-Fast',
  //   description: 'Experience rapid image generation and editing. Our optimized infrastructure delivers high-quality results in seconds, not minutes.',
  //   icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>'
  // },
  // {
  //   title: 'Stylistic Versatility',
  //   description: 'From corporate photography to abstract art and cartoons, master any visual style through intuitive text prompts.',
  //   icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>'
  // }
  {
    title: 'Creative Workflow',
    description: 'Simplify your design process without the need for complex photo editing software. Achieve professional-quality edits in minutes, not hours.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 16v-2m0-8v-2m0 4h.01M6 12H4m16 0h-2m-8 0h.01M12 18h.01M18 12h.01M6 12h.01M12 6h.01M18 6L6 18"></path>'
  },
  {
    title: 'Cost-Effective',
    description: 'Cut down on expenses for stock photography and professional design services while still maintaining high-quality visual content for your projects.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1m0-1V4m0 2.01M12 18v-1m0-1v.01M12 16v-1m0 1V14m0-6a2 2 0 100-4 2 2 0 000 4zm0 12a2 2 0 100-4 2 2 0 000 4z"></path>'
  },
  {
    title: 'Team Productivity',
    description: 'Empower your entire team with AI-powered image editing capabilities, regardless of their design skills or technical background.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>'
  },
  {
    title: 'Creative Freedom',
    description: 'Break free from the limitations of stock photos and bring any concept to life, no matter how unique or specific your vision.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>'
  },
  {
    title: 'Marketing Advantage',
    description: 'Stand out with cutting-edge AI-edited visuals that capture attention and drive engagement across all platforms.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>'
  },
  {
    title: 'Style & Optimization',
    description: 'Easily apply different styles and intelligent enhancements to your images, ensuring they adapt to various scenarios and creative needs with ease.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>'
  }
]);
</script>
