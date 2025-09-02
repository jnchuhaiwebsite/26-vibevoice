<template>
    <section id="use-cases" class="section-block bg-dark">
        <div class="container">
            <h2>Use <span class="highlight-secondary">Cases</span> for OmniHuman 1.5</h2>
            <p class="subtitle">From entertainment and social media to education and film production, see how OmniHuman 1.5 is being applied across various industries to create compelling content.</p>
            <div class="case-grid">
                <div class="case-item">
                    <h3>Entertainment & Social Media with <span class="highlight-primary">OmniHuman 1.5</span></h3>
                    <p>Create engaging short-form videos, virtual singers' MVs, and streaming avatars using <span class="highlight-primary">OmniHuman 1.5</span>.</p>
                </div>
                <div class="case-item">
                    <h3>Education & Training with <span class="highlight-primary">OmniHuman 1.5</span></h3>
                    <p>Develop virtual lecturers, animated storytelling for kids, and role-based language learning with <span class="highlight-primary">OmniHuman 1.5</span>.</p>
                </div>
                <div class="case-item">
                    <h3>Gaming & Metaverse powered by <span class="highlight-primary">OmniHuman 1.5</span></h3>
                    <p>Enable immersive NPC dialogue & story acting, and large-scale character generation with <span class="highlight-primary">OmniHuman 1.5</span>.</p>
                </div>
                <div class="case-item">
                    <h3>Film Production utilizing <span class="highlight-primary">OmniHuman 1.5</span></h3>
                    <p>Enhance animation pre-visualization, digital doubles, and crowd character creation with <span class="highlight-primary">OmniHuman 1.5</span>.</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
/* Use Case Grid */
.case-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 30px;
    margin-top: 40px;
}

.case-item {
    background-color: #3a3a3a;
    padding: 25px;
    border-radius: 8px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
}

.case-item h3 {
    color: #ff4081;
    font-size: 1.6em;
}

.case-item p {
    font-size: 0.95em;
    color: #ccc;
}

@media (max-width: 768px) {
    .case-grid {
        grid-template-columns: 1fr;
    }
}
</style>
