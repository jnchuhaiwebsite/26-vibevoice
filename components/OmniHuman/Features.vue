<template>
    <section id="features" class="section-block bg-dark">
        <div class="container">
            <h2>Core <span class="highlight-primary">Features</span> of OmniHuman 1.5</h2>
            <p class="subtitle">Explore the powerful features that make OmniHuman 1.5 a leader in AI-driven animation, from audio-driven expressions to text-guided multimodal control.</p>
            <div class="feature-grid">
                <div class="feature-item">
                    <h3>Audio-driven Animation with <span class="highlight-primary">OmniHuman 1.5</span></h3>
                    <p>The <span class="highlight-primary">OmniHuman 1.5</span> model transcends simple lip-sync and
                        repetitive gestures by interpreting audio's semantic context, enabling characters to exhibit
                        genuine emotional shifts and match gestures to their words and intent, as if driven by a will of
                        their own. This is a key capability of <span class="highlight-primary">OmniHuman 1.5</span>.</p>
                </div>
                <div class="feature-item">
                    <h3>Text-guided Multimodal Animation in <span class="highlight-primary">OmniHuman 1.5</span></h3>
                    <p>Our carefully designed <span class="highlight-primary">OmniHuman 1.5</span> framework accepts
                        text prompts and demonstrates exceptional prompt-following, enabling precise control over object
                        generation, camera movements, and specific actions, all while maintaining perfect audio sync.
                        Control your animations with <span class="highlight-primary">OmniHuman 1.5</span>.</p>
                </div>
                <div class="feature-item">
                    <h3>Multi-Person Scene Performance by <span class="highlight-primary">OmniHuman 1.5</span></h3>
                    <p>The <span class="highlight-primary">OmniHuman 1.5</span> framework extends to complex
                        multi-person scenes. It generates dynamic group dialogues and ensemble performances by routing
                        separate audio tracks to the correct characters in a single frame. Multi-character interactions
                        are seamless with <span class="highlight-primary">OmniHuman 1.5</span>.</p>
                </div>
                <div class="feature-item">
                    <h3>Cross-Style Adaptability of <span class="highlight-primary">OmniHuman 1.5</span></h3>
                    <p>The <span class="highlight-primary">OmniHuman 1.5</span> model demonstrates true robustness by
                        generating high-quality, synchronized video across an incredible diversity of subjects,
                        including real animals, anthropomorphic characters, and stylized cartoons. Whatever your style,
                        <span class="highlight-primary">OmniHuman 1.5</span> adapts.</p>
                </div>
                <!-- <div class="feature-item">
                    <h3>Long-Form Video Generation with <span class="highlight-primary">OmniHuman 1.5</span></h3>
                    <p><span class="highlight-primary">OmniHuman 1.5</span> produces stable 1+ minute videos with highly
                        dynamic motion, continuous camera movement, and complex multi-character interactions. Create
                        extended narratives effortlessly with <span class="highlight-primary">OmniHuman 1.5</span>.</p>
                </div> -->
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
/* Feature Grid */
.feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 40px;
    margin-top: 40px;
}

.feature-item {
    background-color: #3a3a3a;
    padding: 30px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-item:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
}

.feature-item h3 {
    color: #ff4081;
    /* Feature title accent color */
}

@media (max-width: 768px) {
    .feature-grid {
        grid-template-columns: 1fr;
    }
}
</style>
