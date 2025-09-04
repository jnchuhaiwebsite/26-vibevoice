<template>
    <!-- 4. Interactive Showcase Section -->
    <section id="showcase" class="py-24 px-6 bg-[#0F1420]/50 border-y border-[#1F2937]">
        <div class="container mx-auto">
            <div class="text-center mb-16"><h2 class="text-4xl md:text-5xl font-black text-white">Dive Into the Dialogue with VibeVoice</h2><p class="mt-4 text-lg text-[#9CA3AF] max-w-3xl mx-auto">Experience the nuance of a VibeVoice-generated conversation. Play the audio and watch the transcript come alive with VibeVoice.</p></div>
            <div class="max-w-4xl mx-auto bg-[#111827] rounded-2xl border border-[#1F2937] shadow-2xl shadow-black/50 overflow-hidden">
                <div class="p-6 border-b border-[#1F2937]">
                    <h3 class="text-xl font-bold text-white mb-4">VibeVoice Case Study: An Emotional Conversation</h3>
                    
                    <!-- 默认播放按钮状态 -->
                    <div v-if="!isPlaying" class="text-center py-12">
                        <div class="mb-6">
                            <div class="play-button mx-auto w-20 h-20 bg-gradient-to-r from-[#1E3A8A] to-[#6A11CB] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-xl" @click="startPlayback">
                                <svg class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                </svg>
                            </div>
                        </div>
                        <p class="text-[#9CA3AF] text-lg">Click to experience a VibeVoice-generated conversation</p>
                        <p class="text-[#6B7280] text-sm mt-2">Watch the transcript come alive as the audio plays</p>
                    </div>
                    
                    <!-- 播放状态 -->
                    <div v-else>
                        <AudioPlayer ref="audioPlayerRef" id="showcase-audio" src="https://resp.vibevoices.net/vvoice/mp3/SpontaneousEmotion.mp3" class="mb-4" />
                    </div>
                </div>
                
                <!-- 转录内容 - 只在播放时显示 -->
                <div v-if="isPlaying" id="transcript-container" class="transcript-container max-h-[400px] overflow-y-auto">
                    <div
                        v-for="(item, index) in transcriptData"
                        :key="index"
                        :ref="el => { if (el) transcriptLineRefs[index] = el }"
                        class="transcript-line p-4 border-b border-[#1F2937] cursor-pointer hover:bg-[#1F2937]/50"
                        :class="{ 'active': activeIndex === index }"
                        @click="seekAudio(item.start)"
                    >
                        <p class="font-bold" :class="item.speaker === 'Speaker 1' ? 'text-[#A78BFA]' : 'text-[#60A5FA]'">{{ item.speaker }}</p>
                        <p class="text-[#D1D5DB] mt-1">{{ item.text }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted, ref, watch, nextTick } from 'vue';
import AudioPlayer from './AudioPlayer.vue';

const audioPlayerRef = ref(null);
const activeIndex = ref(-1);
const transcriptLineRefs = ref([]);
const isPlaying = ref(false);

const transcriptData = [
    {"start": 0.0, "speaker": "Speaker 1", "text": "I can't believe you did it again. I waited for two hours. Two hours! Not a single call, not a text. Do you have any idea how embarrassing that was, just sitting there alone?"},
    {"start": 12.43, "speaker": "Speaker 2", "text": "Look, I know, I'm sorry, alright? Work was a complete nightmare. My boss dropped a critical deadline on me at the last minute. I didn't even have a second to breathe, let alone check my phone."},
    {"start": 23.195, "speaker": "Speaker 1", "text": "A nightmare? That's the same excuse you used last time. I'm starting to think you just don't care. It's easier to say 'work was crazy' than to just admit that I'm not a priority for you anymore."},
    {"start": 34.25, "speaker": "Speaker 2", "text": "That's not fair! Of course you're a priority. You think I enjoyed being stuck in that office, drowning in spreadsheets, while knowing I was letting you down? It was stressful and I felt terrible."},
    {"start": 45.47, "speaker": "Speaker 1", "text": "I just... I was really looking forward to tonight. I've had a rough week and I just wanted to see you. When you don't show, it doesn't just feel like a broken plan, it feels like I don't matter."},
    {"start": 56.14, "speaker": "Speaker 2", "text": "You're right. It's not fair to you. There's no excuse. I should have found a way to let you know, even if it was just a thirty-second call. I messed up. I'm really, truly sorry. How can I make it up to you?"}
];

const startPlayback = async () => {
    isPlaying.value = true;
    
    // 等待DOM更新后再设置音频事件监听器
    await nextTick();
    
    if (audioPlayerRef.value && audioPlayerRef.value.audioEl) {
        const audio = audioPlayerRef.value.audioEl;
        
        // 添加时间更新事件监听器
        audio.addEventListener('timeupdate', () => {
            let newActiveIndex = -1;
            for (let i = transcriptData.length - 1; i >= 0; i--) {
                if (audio.currentTime >= transcriptData[i].start) {
                    newActiveIndex = i;
                    break;
                }
            }
            activeIndex.value = newActiveIndex;
        });
        
        // 添加播放结束事件监听器
        audio.addEventListener('ended', () => {
            activeIndex.value = -1;
        });
        
        // 自动开始播放
        audio.play().catch(error => {
            console.error('Audio playback failed:', error);
        });
    }
};

const seekAudio = (startTime) => {
    if (audioPlayerRef.value && audioPlayerRef.value.audioEl) {
        audioPlayerRef.value.audioEl.currentTime = startTime;
        audioPlayerRef.value.audioEl.play();
    }
};

watch(activeIndex, (newIndex) => {
    if (newIndex > -1 && transcriptLineRefs.value[newIndex]) {
        transcriptLineRefs.value[newIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
});
</script>

<style scoped>
/* Custom styles for the interactive transcript */
.transcript-line { transition: background-color 0.3s ease; }
.transcript-line.active {
    background-color: rgba(37, 99, 235, 0.15); /* Primary-Soft */
    border-left: 2px solid #2563EB; /* Primary */
}

/* Custom scrollbar for transcript */
.transcript-container::-webkit-scrollbar { width: 6px; }
.transcript-container::-webkit-scrollbar-track { background: #111827; }
.transcript-container::-webkit-scrollbar-thumb { background-color: #1F2937; border-radius: 10px; }

/* Play button animations */
.play-button {
    position: relative;
    overflow: hidden;
}

.play-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
}

.play-button:hover::before {
    transform: translateX(100%);
}

/* Fade in animation for transcript */
.transcript-container {
    animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Pulse animation for play button */
@keyframes pulse {
    0%, 100% {
        box-shadow: 0 0 0 0 rgba(30, 58, 138, 0.4);
    }
    50% {
        box-shadow: 0 0 0 20px rgba(30, 58, 138, 0);
    }
}

.play-button:hover {
    animation: pulse 2s infinite;
}
</style>
