<template>
    <header class="hero-section">
        <div class="container">
            <h1><span class="highlight-primary">OmniHuman 1.5</span>: <br> The New Standard for <span class="highlight-secondary">AI-Powered Virtual Human</span> Content Generation</h1>
            <p>Welcome to <span class="highlight-primary">OmniHuman 1.5</span>, an advanced AI-powered character animation platform. <span class="highlight-primary">OmniHuman 1.5</span> excels by generating expressive digital avatars from just a single image and a voice input. Our innovative <span class="highlight-primary">OmniHuman 1.5</span> system integrates Multimodal Large Language Models with Diffusion Transformers, simulating both intuitive reactions and deliberate reasoning. This empowers <span class="highlight-primary">OmniHuman 1.5</span> to produce animations with unparalleled emotional depth, semantic coherence, and natural motion.</p>
            <!-- <a href="#demo" class="btn btn-primary">Experience OmniHuman 1.5 Now</a> -->
        </div>
    </header>
</template>

<script setup lang="ts">
</script>

<style scoped>
/* Hero Section */
.hero-section {
    background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://via.placeholder.com/1920x1080/222222/ffffff?text=Background+Image') no-repeat center center / cover; /* Placeholder background image */
    text-align: center;
    padding: 150px 0;
    min-height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hero-section h1 {
    margin-bottom: 30px;
    font-size: 4.5em; /* Further enlarged H1 */
}

.hero-section p {
    font-size: 1.3em;
    max-width: 800px;
    margin: 0 auto 40px auto;
    color: #cccccc;
}

@media (max-width: 768px) {
    .hero-section {
        padding: 100px 0;
        min-height: 400px;
    }
    .hero-section p {
        font-size: 1.1em;
    }
}
</style>
