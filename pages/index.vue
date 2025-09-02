<template>
  <main>
    <OmniHumanHero />
    <OmniHumanVideoShowcase />
    <OmniHumanPositioning />
    <OmniHumanFeatures />
    <OmniHumanUsersValue />
    <OmniHumanUseCases />
    <!-- <OmniHumanCta /> -->
  </main>
</template>

<script setup lang="ts">
import OmniHumanHero from '~/components/OmniHuman/Hero.vue'
import OmniHumanVideoShowcase from '~/components/OmniHuman/VideoShowcase.vue'
import OmniHumanPositioning from '~/components/OmniHuman/Positioning.vue'
import OmniHumanFeatures from '~/components/OmniHuman/Features.vue'
import OmniHumanUsersValue from '~/components/OmniHuman/UsersValue.vue'
import OmniHumanUseCases from '~/components/OmniHuman/UseCases.vue'
import OmniHumanCta from '~/components/OmniHuman/Cta.vue'
import { useSeo } from '~/composables/useSeo';

useSeo({
  title: 'OmniHuman 1.5 - AI-Powered Character Animation Platform',
  description: 'OmniHuman 1.5 transforms a single photo and voice into lifelike digital avatars, delivering advanced AI character animation with expressive realism.',
})
</script>

<style>
/* General Styles */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', sans-serif;
    line-height: 1.2;
    margin-bottom: 20px;
    color: #ffffff; /* Headings default white */
}

h1 {
    font-size: 3.8em; /* Robust H1 */
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 2px;
}

h2 {
    font-size: 2.8em;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    text-align: center;
    margin-bottom: 20px;
}

.subtitle {
  font-size: 1.1em;
  max-width: 800px;
  margin: 0 auto 60px auto;
  color: #cccccc;
  text-align: center;
}

h3 {
    font-size: 1.8em;
    font-weight: 700;
    margin-bottom: 15px;
}

p {
    margin-bottom: 1em;
}

ul {
    list-style: none;
    padding: 0;
}

ul li {
    margin-bottom: 10px;
    position: relative;
    padding-left: 25px;
}

ul li::before {
    content: '▪'; /* Bullet point for list items */
    color: #00bcd4; /* Accent color */
    position: absolute;
    left: 0;
    font-size: 1.2em;
    top: -2px;
}

/* Accent Colors */
.highlight-primary {
    color: #ff4081; /* Striking pink/magenta */
}

.highlight-secondary {
    color: #00bcd4; /* Striking cyan/blue */
}

/* Button Styles */
.btn {
    display: inline-block;
    padding: 15px 30px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease, color 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 1em;
}

.btn-primary {
    background-color: #ff4081; /* Primary button accent */
    color: #ffffff;
    border: 2px solid #ff4081;
}

.btn-primary:hover {
    background-color: #e0005a;
    border-color: #e0005a;
}

.btn-secondary {
    background-color: transparent;
    color: #00bcd4; /* Secondary button accent */
    border: 2px solid #00bcd4;
}

.btn-secondary:hover {
    background-color: #00bcd4;
    color: #1a1a1a;
}

/* Content Blocks */
.section-block {
    padding: 80px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08); /* Thin separator between blocks */
}

.section-block:last-of-type {
    border-bottom: none;
}

.section-block.bg-dark {
    background-color: #2a2a2a; /* Dark background block */
}

/* Responsive Design */
@media (max-width: 768px) {
    h1 {
        font-size: 2.8em;
    }
    h2 {
        font-size: 2.2em;
        margin-bottom: 40px;
    }
    .section-block {
        padding: 60px 0;
    }
}

@media (max-width: 480px) {
    h1 {
        font-size: 2em;
        letter-spacing: 1px;
    }
    h2 {
        font-size: 1.8em;
        letter-spacing: 1px;
    }
    .btn {
        padding: 12px 20px;
        font-size: 0.9em;
    }
}
</style>
