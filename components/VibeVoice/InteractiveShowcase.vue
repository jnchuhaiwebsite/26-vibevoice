<template>
    <!-- 4. Interactive Showcase Section -->
    <section id="showcase" class="py-24 px-6 bg-[#0F1420]/50 border-y border-[#1F2937]">
        <div class="container mx-auto">
            <div class="text-center mb-16"><h2 class="text-4xl md:text-5xl font-black text-white">Dive Into the Dialogue</h2><p class="mt-4 text-lg text-[#9CA3AF] max-w-3xl mx-auto">Experience the nuance of a VibeVoice-generated conversation. Play the audio and watch the transcript come alive.</p></div>
            <div class="max-w-4xl mx-auto bg-[#111827] rounded-2xl border border-[#1F2937] shadow-2xl shadow-black/50 overflow-hidden">
                <div class="p-6 border-b border-[#1F2937]"><h3 class="text-xl font-bold text-white mb-2">Case Study: An Emotional Conversation</h3>
                    <audio id="showcase-audio" controls class="w-full mt-4">
                        <source src="https://files.vibevoice.info/vibevoice/1.wav" type="audio/wav">
                    </audio>
                </div>
                <div id="transcript-container" class="transcript-container max-h-[400px] overflow-y-auto"></div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
    const transcriptData = [
        {"start": 0.0, "speaker": "Speaker 1", "text": "I can't believe you did it again. I waited for two hours. Two hours! Not a single call, not a text. Do you have any idea how embarrassing that was, just sitting there alone?"},
        {"start": 12.43, "speaker": "Speaker 2", "text": "Look, I know, I'm sorry, alright? Work was a complete nightmare. My boss dropped a critical deadline on me at the last minute. I didn't even have a second to breathe, let alone check my phone."},
        {"start": 23.195, "speaker": "Speaker 1", "text": "A nightmare? That's the same excuse you used last time. I'm starting to think you just don't care. It's easier to say 'work was crazy' than to just admit that I'm not a priority for you anymore."},
        {"start": 34.25, "speaker": "Speaker 2", "text": "That's not fair! Of course you're a priority. You think I enjoyed being stuck in that office, drowning in spreadsheets, while knowing I was letting you down? It was stressful and I felt terrible."},
        {"start": 45.47, "speaker": "Speaker 1", "text": "I just... I was really looking forward to tonight. I've had a rough week and I just wanted to see you. When you don't show, it doesn't just feel like a broken plan, it feels like I don't matter."},
        {"start": 56.14, "speaker": "Speaker 2", "text": "You're right. It's not fair to you. There's no excuse. I should have found a way to let you know, even if it was just a thirty-second call. I messed up. I'm really, truly sorry. How can I make it up to you?"}
    ];

    const audioPlayer = document.getElementById('showcase-audio');
    const container = document.getElementById('transcript-container');
    
    if (audioPlayer && container) {
        let transcriptLines = [];
        transcriptData.forEach(item => {
            const lineEl = document.createElement('div');
            lineEl.className = 'transcript-line p-4 border-b border-[#1F2937] cursor-pointer hover:bg-[#1F2937]/50';
            lineEl.dataset.start = item.start;
            const speakerColor = item.speaker === 'Speaker 1' ? 'text-[#A78BFA]' : 'text-[#60A5FA]';
            lineEl.innerHTML = `<p class="font-bold ${speakerColor}">${item.speaker}</p><p class="text-[#D1D5DB] mt-1">${item.text}</p>`;
            lineEl.addEventListener('click', () => {
                audioPlayer.currentTime = item.start;
                audioPlayer.play();
            });
            container.appendChild(lineEl);
            transcriptLines.push(lineEl);
        });

        let currentActiveIndex = -1;
        audioPlayer.addEventListener('timeupdate', () => {
            const currentTime = audioPlayer.currentTime;
            let activeIndex = -1;
            for (let i = transcriptData.length - 1; i >= 0; i--) {
                if (currentTime >= transcriptData[i].start) {
                    activeIndex = i;
                    break;
                }
            }
            if (activeIndex !== currentActiveIndex) {
                if (currentActiveIndex > -1 && transcriptLines[currentActiveIndex]) {
                    transcriptLines[currentActiveIndex].classList.remove('active');
                }
                if (activeIndex > -1 && transcriptLines[activeIndex]) {
                    const activeLine = transcriptLines[activeIndex];
                    activeLine.classList.add('active');
                    activeLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                currentActiveIndex = activeIndex;
            }
        });
    }
})
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
</style>
