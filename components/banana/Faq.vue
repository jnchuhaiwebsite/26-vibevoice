<template>
  <section id="faq" class="py-20 md:py-32">
    <div class="container max-w-6xl mx-auto px-6">
      <div class="section-header text-center mb-16">
        <h2 class="font-['Poppins'] text-4xl md:text-5xl font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <p class="text-lg text-banana-text-muted max-w-3xl mx-auto">
          Answers to common questions about our platform, features, and pricing.
        </p>
      </div>
      <div class="grid md:grid-cols-2 gap-8">
        <div v-for="(item, index) in faqItems" :key="index" class="bg-banana-card-bg border border-banana-border-color p-8 rounded-xl">
          <h3 class="font-['Poppins'] text-xl mb-4 text-banana-primary-yellow">
            {{ item.question }}
          </h3>
          <p class="text-banana-text-muted whitespace-pre-line">{{ item.answer }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const faqItems = ref([
  {
    question: 'What makes Nano Banana AI different from other image editing tools?',
    answer: 'Nano Banana AI stands out with its exceptional text-based image editing capabilities and superior understanding of complex prompts. Unlike other AI editors, it excels at both creating new images and modifying existing ones through natural language commands.',
  },
  {
    question: 'Can I use Nano Banana AI for commercial projects?',
    answer: 'Yes. Images edited with Nano Banana AI can be used for commercial purposes, including marketing materials, website content, and product designs. Please review our Terms of Service for specific usage guidelines.',
  },
  {
    question: 'What are the requirements for uploading images?',
    answer: 'Formats: JPEG, PNG\nAspect Ratio (width/height): Within the range (1/3, 3)\nDimensions (px): Both width and height must be greater than 14 px\nFile Size: Up to 10 MB',
  },
  {
    question: 'How accurate is the image editing feature?',
    answer: 'Our text-based image editing is highly accurate, enabling precise modifications to existing images with simple natural language instructions. The AI understands context and applies changes while preserving image quality and consistency.',
  },
  {
    question: 'Is there a limit to how many edits I can perform?',
    answer: 'Limits depend on your subscription plan. We offer flexible pricing tiers to suit individuals, teams, and enterprise-level needs.',
  },
  {
    question: 'How long does it take to complete an edit?',
    answer: 'Most edits are completed within 15–30 seconds, depending on image complexity and server load. Our optimized processing ensures fast turnaround without sacrificing quality.',
  },
  {
    question: 'What kind of prompts work best with Nano Banana AI?',
    answer: 'Detailed, descriptive prompts deliver the best results. Include details such as style, composition, lighting, colors, and specific elements you want. The AI works well with both creative and technical instructions.',
  },
  {
    question: 'Is my data secure when using Nano Banana AI?',
    answer: 'We prioritize user privacy and data security. All edited images and prompts are processed securely, with private processing options available for sensitive commercial projects.',
  },
]);
</script>

<style scoped>
/* Using a class for the active state transition */
.faq-answer {
  max-height: 0;
  transition: max-height 0.5s ease-out;
}
.faq-item.active .faq-answer {
  max-height: 200px; /* Adjust as needed */
}
</style>
