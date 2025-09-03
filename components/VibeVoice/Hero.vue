<template>
    <!-- 1. Hero Section -->
    <section class="relative text-center pt-48 pb-32 px-6 overflow-hidden">
        <div class="aurora-background"></div>
        <div class="container mx-auto relative">
            <h1 class="text-5xl md:text-5xl  leading-tight tracking-tighter text-white">
                <span class="hero-gradient-text">VibeVoice</span> -  Bring Your Scripts to Life with a Full Cast of AI Voices.
           
            </h1>
            <p class="mt-6 text-xl text-[#D1D5DB] max-w-3xl mx-auto">
                Orchestrate Lifelike Conversations. Powered by Microsoft VibeVoice TTS.
            </p>
            <div class="mt-10">
                <VibeVoiceGenerator />
            </div>
        </div>
        
    </section>
</template>

<script setup>  
import VibeVoiceGenerator from './Generator.vue';
</script>
