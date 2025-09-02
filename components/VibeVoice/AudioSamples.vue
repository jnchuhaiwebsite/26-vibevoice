<template>
    <!-- 2. Audio Samples Section -- UPDATED -->
    <section id="samples" class="py-24 px-6">
            <div class="container mx-auto">
            <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-black text-white">Listen to What's Possible</h2>
                <p class="mt-4 text-lg text-[#9CA3AF] max-w-3xl mx-auto">These are not just samples; they are a showcase of the emotional depth and clarity VibeVoice can achieve. Press play to believe.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <!-- Sample Card 1 -->
                <div class="bg-[#111827] p-6 rounded-2xl card-glow flex flex-col">
                    <h3 class="text-xl font-bold text-white">Spontaneous Emotion</h3>
                    <p class="mt-2 mb-4 text-sm text-[#9CA3AF] flex-grow">Hear the subtle shifts in tone and pacing that capture genuine human emotion, making the conversation feel authentic and unscripted.</p>
                    <audio controls class="w-full">
                        <source src="https://files.vibevoice.info/vibevoice/1.wav" type="audio/wav">
                    </audio>
                </div>
                <!-- Sample Card 2 -->
                <div class="bg-[#111827] p-6 rounded-2xl card-glow flex flex-col">
                    <h3 class="text-xl font-bold text-white">Cross-Lingual Synthesis</h3>
                    <p class="mt-2 mb-4 text-sm text-[#9CA3AF] flex-grow">Witness our model seamlessly switch between English and Chinese while maintaining a perfectly consistent vocal identity—a true breakthrough for global content.</p>
                    <audio controls class="w-full">
                        <source src="https://files.vibevoice.info/vibevoice/2.wav" type="audio/wav">
                    </audio>
                </div>
                <!-- Sample Card 3 -->
                <div class="bg-[#111827] p-6 rounded-2xl card-glow flex flex-col">
                    <h3 class="text-xl font-bold text-white">Long-Form Podcast</h3>
                    <p class="mt-2 mb-4 text-sm text-[#9CA3AF] flex-grow">Proof of performance. The model maintains its natural prosody and coherence over extended durations, making it ideal for audiobooks and full-length podcasts.</p>
                    <audio controls class="w-full">
                        <source src="https://files.vibevoice.info/vibevoice/3.wav" type="audio/wav">
                    </audio>
                </div>
            </div>
        </div>
    </section>
</template>
