<template>
    <section id="video-showcase" class="video-demo-section">
        <div class="container">
            <h2>See <span class="highlight-primary">OmniHuman 1.5</span> in Action</h2>
            <p class="subtitle">This demo highlights how our advanced AI transforms a single image and voice input into a fully expressive digital human, showcasing the platform's capabilities in generating lifelike animations with emotional depth.</p>
            <div class="video-container">
                <video 
                    ref="videoPlayer"
                    preload="none"
                    poster="https://resp.musesteamer2.com/steamer/images/omniHuman-15.webp"
                    @play="onPlay"
                    @pause="onPause"
                >
                    <source src="https://resp.musesteamer2.com/steamer/videos/omniHuman-15.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <button v-if="!isPlaying" @click="playVideo" class="play-button" aria-label="Play Video">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48px" height="48px">
                        <path d="M8 5v14l11-7z"></path>
                    </svg>
                </button>
            </div>
            <p>Witness how <span class="highlight-primary">OmniHuman 1.5</span> transforms static images and audio into dynamic, lifelike character performances. This video showcases the power of <span class="highlight-primary">OmniHuman 1.5</span>'s cutting-edge AI for various content creation needs.</p>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const videoPlayer = ref<HTMLVideoElement | null>(null);
const isPlaying = ref(false);

const playVideo = () => {
  if (videoPlayer.value) {
    videoPlayer.value.play();
  }
};

const onPlay = () => {
  isPlaying.value = true;
  if (videoPlayer.value) {
    videoPlayer.value.controls = true;
  }
};

const onPause = () => {
  isPlaying.value = false;
  if (videoPlayer.value) {
    videoPlayer.value.controls = false;
  }
};
</script>

<style scoped>
/* Video Demo Section */
.video-demo-section {
    background-color: #0d0d0d;
    padding: 80px 0;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.video-demo-section h2 {
    margin-bottom: 40px;
    color: #ffffff;
}

.video-container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
    height: 0;
    overflow: hidden;
    max-width: 900px;
    margin: 0 auto 30px auto;
    background-color: #000; /* Fallback for video area */
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.video-container video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
}

.play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    background: rgba(0, 0, 0, 0.6);
    border: 2px solid white;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s ease, transform 0.3s ease;
    padding: 0;
    padding-left: 5px; /* Optical alignment for the play icon */
}

.play-button:hover {
    background-color: #ff4081; /* highlight-primary color */
    transform: translate(-50%, -50%) scale(1.1);
}

.play-button svg {
    fill: white;
}
</style>
