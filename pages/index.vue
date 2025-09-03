<template>
    <div class="bg-[#0B0B12] text-[#D1D5DB]">
            <VibeVoiceHero />
            <VibeVoiceAudioSamples />
            <VibeVoiceFeatures />
            <VibeVoiceInteractiveShowcase />
            <VibeVoiceTechnology />
            <VibeVoiceUseCases />
            <CommentSection />
            <!-- <PricingPlans /> -->
            <VibeVoiceFaq />
            <!-- <VibeVoiceCallToAction /> -->
    </div>
</template>

<script setup>
import VibeVoiceHero from '~/components/VibeVoice/Hero.vue';
import VibeVoiceAudioSamples from '~/components/VibeVoice/AudioSamples.vue';
import VibeVoiceFeatures from '~/components/VibeVoice/Features.vue';
import VibeVoiceInteractiveShowcase from '~/components/VibeVoice/InteractiveShowcase.vue';
import VibeVoiceTechnology from '~/components/VibeVoice/Technology.vue';
import VibeVoiceUseCases from '~/components/VibeVoice/UseCases.vue';
import VibeVoiceFaq from '~/components/VibeVoice/Faq.vue';
import VibeVoiceCallToAction from '~/components/VibeVoice/CallToAction.vue';
import VibeVoiceFooter from '~/components/VibeVoice/Footer.vue';
import CommentSection from '~/components/Comments/CommentSection.vue';
import { useSeo } from '~/composables/useSeo';

useSeo({
    title: 'VibeVoice - Best TTS for Long-Form Multi-Speaker Audio',
    description: 'Microsoft VibeVoice delivers long-form, multi-speaker, conversational TTS with natural flow and cross-language support.',
});

onMounted(() => {
  const scrollToAnchor = () => {
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      
      let attempts = 0;
      const maxAttempts = 30; // 增加尝试次数以应对慢网络
      
      const interval = setInterval(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          clearInterval(interval);
          const offset = 80; // 导航栏高度
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          attempts++;
          if (attempts > maxAttempts) {
            clearInterval(interval);
            console.warn(`无法找到ID为 '${sectionId}' 的元素`);
          }
        }
      }, 100);
    }
  };

  scrollToAnchor();
})
</script>
