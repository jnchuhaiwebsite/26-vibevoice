<template>
    <!-- 3. Features Section -->
    <section id="features" class="py-24 px-6">
        <div class="container mx-auto">
            <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-black text-white">The VibeVoice Advantage</h2>
                <p class="mt-4 text-lg text-[#9CA3AF] max-w-3xl mx-auto">Our technology is engineered for quality,
                    realism, and creative freedom, setting a new standard for AI voice with VibeVoice technology.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div class="bg-[#111827] p-8 rounded-2xl card-glow">
                    <h3 class="text-2xl font-bold text-white">Multi-Speaker Mastery</h3>
                    <p class="mt-3 text-[#9CA3AF]">VibeVoice flawlessly generates distinct voices from a single script
                        using VibeVoice technology.</p>
                </div>
                <div class="bg-[#111827] p-8 rounded-2xl card-glow">
                    <h3 class="text-2xl font-bold text-white">Unrivaled Realism</h3>
                    <p class="mt-3 text-[#9CA3AF]">Our model captures the subtle prosody and emotion of human speech.
                        That's the power of VibeVoice innovation.</p>
                </div>
                <div class="bg-[#111827] p-8 rounded-2xl card-glow">
                    <h3 class="text-2xl font-bold text-white">Cross-Lingual Consistency</h3>
                    <p class="mt-3 text-[#9CA3AF]">Speak in English and Chinese with the same unique VibeVoice identity
                        powered by VibeVoice.</p>
                </div>
            </div>
            
            <!-- CTA Section -->
            <div class="text-center mt-16">
                <div class="bg-gradient-to-r from-[#1E3A8A] to-[#6A11CB] p-8 rounded-2xl border border-[#1E3A8A]/50">
                    <h3 class="text-2xl md:text-3xl font-bold text-white mb-4">
                        Ready to create your own professional audio content with VibeVoice?
                    </h3>
                    <p class="text-lg text-[#D1D5DB] mb-6 max-w-2xl mx-auto">
                        Experience the power of VibeVoice technology and bring your scripts to life with natural, multi-speaker conversations.
                    </p>
                    <button 
                        class="bg-white text-[#1E3A8A] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#F3F4F6] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform"
                        @click="scrollToGenerator"
                    >
                        Try VibeVoice Now
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
.card-glow {
    transition: all 0.3s ease;
}

.card-glow:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(30, 58, 138, 0.3);
}

/* CTA按钮动画效果 */
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

/* 渐变背景动画 */
.bg-gradient-to-r {
    background-size: 200% 200%;
    animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
</style>
