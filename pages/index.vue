<template>
    <div class="bg-[#0B0B12] text-[#D1D5DB]">
            <VibeVoiceHero />
            <VibeVoiceAudioSamples />
            <VibeVoiceFeatures />
            <VibeVoiceInteractiveShowcase />
            <VibeVoiceTechnology />
            <VibeVoiceUseCases />
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

useHead({
    title: 'VibeVoice - Best TTS for Long-Form Multi-Speaker Audio',
    meta: [
        { name: 'description', content: 'Microsoft VibeVoice delivers long-form, multi-speaker, conversational TTS with natural flow and cross-language support.' }
    ],
    link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
        { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap', rel: 'stylesheet' }
    ],
    htmlAttrs: {
      lang: 'en'
    },
    bodyAttrs: {
      class: 'overflow-x-hidden'
    }
});
</script>
