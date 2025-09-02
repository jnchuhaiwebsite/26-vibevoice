<template>
  <audio ref="audioRef" controls class="w-full" loading="lazy" :id="id" @play="handlePlay">
    <source :src="src" type="audio/wav">
    <source :src="src.replace('.wav', '.mp3')" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>
</template>

<script setup>
import { ref } from 'vue';

const audioRef = ref(null);

defineProps({
  src: {
    type: String,
    required: true
  },
  id: {
    type: String,
    default: null
  }
});

const handlePlay = (event) => {
  const allAudioPlayers = document.querySelectorAll('audio');
  allAudioPlayers.forEach(player => {
    if (player !== event.target) {
      player.pause();
    }
  });
};

defineExpose({
  audioEl: audioRef
});
</script>
