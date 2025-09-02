<template>
    <section id="users-value" class="section-block">
        <div class="container">
            <h2>Target Users & <span class="highlight-primary">Value</span> from OmniHuman 1.5</h2>
            <p class="subtitle">Learn who can benefit most from OmniHuman 1.5 and the unique value it provides to content creators, developers, and production studios.</p>
            <div class="content-pair">
                <div class="half-block">
                    <h3>🎯 Target Users for <span class="highlight-secondary">OmniHuman 1.5</span>:</h3>
                    <ul>
                        <li>Content creators (YouTubers, TikTok/Douyin creators) leveraging <span class="highlight-primary">OmniHuman 1.5</span></li>
                        <li>Virtual streamers & KOLs enhancing presence with <span class="highlight-primary">OmniHuman 1.5</span></li>
                        <li>Game & metaverse developers building worlds with <span class="highlight-primary">OmniHuman 1.5</span></li>
                        <li>Education & training organizations utilizing <span class="highlight-primary">OmniHuman 1.5</span></li>
                        <li>Film & media production studios innovating with <span class="highlight-primary">OmniHuman 1.5</span></li>
                    </ul>
                </div>
                <div class="half-block">
                    <h3>💡 User Value from <span class="highlight-secondary">OmniHuman 1.5</span>:</h3>
                    <ul>
                        <li>**Low-cost, high-quality**: <span class="highlight-primary">OmniHuman 1.5</span> allows one image + audio to produce minute-long videos efficiently.</li>
                        <li>**High flexibility**: Text prompts with <span class="highlight-primary">OmniHuman 1.5</span> provide precise action & camera control.</li>
                        <li>**Cross-domain adaptability**: <span class="highlight-primary">OmniHuman 1.5</span> works for humans, animals, cartoons, and multi-character scenes.</li>
                        <li>**Strong emotional expressiveness**: <span class="highlight-primary">OmniHuman 1.5</span> captures nuanced emotions and gestures from speech.</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
/* Content Pair */
.content-pair {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    justify-content: space-between;
}

.content-pair > * {
    flex: 1;
    min-width: 400px; /* Prevent content from becoming too narrow */
}

/* Half Width Blocks for Users & Value */
.half-block {
    padding: 20px;
    background-color: #2a2a2a;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.half-block h3 {
    text-align: center;
    margin-bottom: 25px;
    color: #00bcd4; /* Subtitle accent color */
}

@media (max-width: 768px) {
    .content-pair {
        flex-direction: column;
    }
    .content-pair > * {
        min-width: unset;
        width: 100%;
    }
}
</style>
