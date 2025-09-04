<template>
    <!-- 6. Use Cases Section -->
    <section id="use-cases" class="py-24 px-6 bg-gradient-to-b from-[#0B0B12] to-[#0F1420]">
        <div class="container mx-auto">
            <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-black text-white mb-6">
                    Powering the Creator Economy with VibeVoice
                </h2>
                <p class="text-lg text-[#9CA3AF] max-w-3xl mx-auto">
                    From individual podcasters to enterprise e-learning platforms, VibeVoice is the trusted audio solution powered by VibeVoice technology.
                </p>
            </div>
            
            <!-- Use Cases Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                <!-- Podcasters -->
                <div class="use-case-card group">
                    <div class="flex items-center mb-4">
                        <div class="icon-container mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-white">Podcasters</h3>
                    </div>
                    <p class="text-[#9CA3AF] leading-relaxed">
                        Create professional podcast content faster than ever with VibeVoice technology, featuring multi-speaker conversations that bring your shows to life.
                    </p>
                </div>

                <!-- Audiobook Authors -->
                <div class="use-case-card group">
                    <div class="flex items-center mb-4">
                        <div class="icon-container mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-white">Audiobook Authors</h3>
                    </div>
                    <p class="text-[#9CA3AF] leading-relaxed">
                        Craft compelling audiobooks with VibeVoice innovation, giving each character a unique voice that captivates your audience.
                    </p>
                </div>

                <!-- Educators -->
                <div class="use-case-card group">
                    <div class="flex items-center mb-4">
                        <div class="icon-container mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M12 14L8 12"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-white">Educators</h3>
                    </div>
                    <p class="text-[#9CA3AF] leading-relaxed">
                        Create accessible e-learning content with VibeVoice technology, making knowledge dissemination more effective and engaging.
                    </p>
                </div>

                <!-- Audio Producers -->
                <div class="use-case-card group">
                    <div class="flex items-center mb-4">
                        <div class="icon-container mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-white">Audio Producers</h3>
                    </div>
                    <p class="text-[#9CA3AF] leading-relaxed">
                        Leverage VibeVoice technology to rapidly produce high-quality audio content, enhancing both efficiency and production quality.
                    </p>
                </div>

                <!-- Voice Actors -->
                <div class="use-case-card group">
                    <div class="flex items-center mb-4">
                        <div class="icon-container mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 10h6m-6 4h6m-6 4h4"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-white">Voice Actors</h3>
                    </div>
                    <p class="text-[#9CA3AF] leading-relaxed">
                        Expand your voice acting capabilities with VibeVoice technology, providing professional voice services for more characters and projects.
                    </p>
                </div>

                <!-- Radio Hosts -->
                <div class="use-case-card group">
                    <div class="flex items-center mb-4">
                        <div class="icon-container mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-white">Radio Hosts</h3>
                    </div>
                    <p class="text-[#9CA3AF] leading-relaxed">
                        Create rich radio content with VibeVoice technology, delivering more dynamic and engaging audio experiences for your listeners.
                    </p>
                </div>
            </div>

            <!-- Bottom CTA -->
            <div class="text-center mt-16">
                <div class="bg-gradient-to-r from-[#1E3A8A]/20 to-[#6A11CB]/20 p-8 rounded-2xl border border-[#1E3A8A]/30 backdrop-blur-sm">
                    <h3 class="text-2xl font-bold text-white mb-4">
                        Join the Audio Creator Community
                    </h3>
                    <p class="text-[#D1D5DB] mb-6 max-w-2xl mx-auto">
                        No matter what type of audio professional you are, VibeVoice provides powerful technical support for your creative endeavors.
                    </p>
                    <button 
                        class="bg-gradient-to-r from-[#1E3A8A] to-[#6A11CB] text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-[#1E40AF] hover:to-[#7C3AED] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        @click="scrollToGenerator"
                    >
                        Start Using VibeVoice
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const scrollToGenerator = () => {
    // 滚动到页面顶部的生成器部分
    const heroSection = document.querySelector('section');
    if (heroSection) {
        heroSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
};
</script>

<style scoped>
/* 使用场景卡片样式 */
.use-case-card {
    @apply bg-[#111827] p-8 rounded-2xl border border-[#1F2937] transition-all duration-300 hover:border-[#1E3A8A]/50 hover:shadow-lg hover:shadow-[#1E3A8A]/20;
    position: relative;
    overflow: hidden;
}

.use-case-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #1E3A8A, #6A11CB);
    transform: scaleX(0);
    transition: transform 0.3s ease;
}

.use-case-card:hover::before {
    transform: scaleX(1);
}

.use-case-card:hover {
    transform: translateY(-8px);
}

/* 图标容器样式 */
.icon-container {
    @apply h-12 w-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#1E3A8A]/30 to-[#6A11CB]/30 border border-[#1E3A8A]/50 text-[#A78BFA];
    transition: all 0.3s ease;
    flex-shrink: 0;
}

.use-case-card:hover .icon-container {
    @apply from-[#1E3A8A]/50 to-[#6A11CB]/50 border-[#1E3A8A] text-white;
    transform: scale(1.1);
    box-shadow: 0 10px 25px rgba(30, 58, 138, 0.3);
}

/* 标题悬停效果 */
.use-case-card h3 {
    transition: color 0.3s ease;
}

.use-case-card:hover h3 {
    @apply text-[#A78BFA];
}

/* 描述文字悬停效果 */
.use-case-card p {
    transition: color 0.3s ease;
}

.use-case-card:hover p {
    @apply text-[#D1D5DB];
}

/* 按钮动画效果 */
button {
    position: relative;
    overflow: hidden;
}

button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
}

button:hover::before {
    left: 100%;
}

/* 背景渐变动画 */
.bg-gradient-to-b {
    background-size: 100% 200%;
    animation: backgroundShift 8s ease-in-out infinite;
}

@keyframes backgroundShift {
    0%, 100% {
        background-position: 0% 0%;
    }
    50% {
        background-position: 0% 100%;
    }
}

/* 响应式调整 */
@media (max-width: 768px) {
    .use-case-card {
        @apply p-6;
    }
    
    .icon-container {
        @apply h-10 w-10;
    }
    
    .use-case-card h3 {
        @apply text-lg;
    }
    
    .flex.items-center {
        @apply mb-3;
    }
}
</style>
