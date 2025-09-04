<template>
    <!-- 2. Audio Samples Section -- UPDATED -->
    <section id="samples" class="py-24 px-6">
            <div class="container mx-auto">
            <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-black text-white">Listen to What's Possible with VibeVoice</h2>
                <p class="mt-4 text-lg text-[#9CA3AF] max-w-3xl mx-auto">These are not just samples; they are a showcase of the emotional depth and clarity VibeVoice can achieve. Press play to believe in VibeVoice.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <!-- Sample Card Loop -->
                <div v-for="(sample, index) in samples" :key="index" class="bg-[#111827] p-8 rounded-2xl card-glow flex flex-col">
                    <div class="w-14 h-14 mb-5 rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#6A11CB]/50 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 text-white">
                            <path stroke-linecap="round" stroke-linejoin="round" :d="sample.iconPath" />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-4">{{ sample.title }}</h3>
                    <AudioPlayer :src="sample.audioSrc" />
                    <p class="mt-6 text-base text-[#9CA3AF] flex-grow">{{ sample.description }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import AudioPlayer from './AudioPlayer.vue';

const samples = [
  {
    title: 'Spontaneous Emotion',
    description: 'Hear the subtle shifts in tone and pacing that capture genuine human emotion, making the conversation feel authentic and unscripted with VibeVoice technology.',
    audioSrc: 'https://resp.vibevoices.net/vvoice/mp3/Spontaneous-Emotion.mp3',
    iconPath: 'M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 9.75h.008v.008H9V9.75zm6 0h.008v.008H15V9.75z'
  },
  {
    title: 'Cross-Lingual Synthesis',
    description: 'Witness our model seamlessly switch between English and Chinese while maintaining a perfectly consistent vocal identity—a true breakthrough for global content, powered by VibeVoice innovation.',
    audioSrc: 'https://resp.vibevoices.net/vvoice/mp3/Mandarin-to-English.mp3',
    iconPath: 'M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.108m-5.252 8.706c.707.182 1.437.312 2.18.39m0 0a17.108 17.108 0 015.252-8.706m-5.252 8.706a23.1 23.1 0 005.252 8.706M3 18.379a48.474 48.474 0 006 .371m0 0c1.12 0 2.233-.038 3.334-.108m-5.252-8.706c.707-.182 1.437-.312 2.18-.39m0 0a17.108 17.108 0 005.252 8.706m-5.252-8.706a23.1 23.1 0 01-5.252-8.706'
  },
  {
    title: 'Long-Form Podcast',
    description: 'Proof of performance. The model maintains its natural prosody and coherence over extended durations, making it ideal for audiobooks and full-length podcasts using VibeVoice technology.',
    audioSrc: 'https://resp.vibevoices.net/vvoice/mp3/Podcast-with-Background-Music.mp3',
    iconPath: 'M12 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.75 0v1.5a.375.375 0 00.375.375zM8.25 12.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zM12 18.75a6 6 0 006-6v-1.5a6 6 0 00-12 0v1.5a6 6 0 006 6zM12 12.75a2.25 2.25 0 002.25-2.25v-1.5a2.25 2.25 0 00-4.5 0v1.5a2.25 2.25 0 002.25 2.25z'
  }
]
</script>
