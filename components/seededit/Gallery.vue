<template>
  <section class="py-20 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-extrabold text-[#00ffd1] sm:text-5xl">
         SeedEdit 3.0 Examples
        </h2>
        <p class="mt-4 text-xl text-gray-300 max-w-4xl mx-auto">
          Hover to see the magic. Our AI enhances photos, replaces elements, and brings your vision to life.
        </p>
      </div>
      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
          <div v-for="(image, index) in beforeAfterImages" :key="index" class="relative overflow-hidden rounded-xl border border-gray-700 aspect-video hover-compare-container">
            <!-- 变化后的图片 (默认显示) -->
            <img 
              :src="image.after" 
              :alt="image.alt" 
              class="w-full h-full object-cover aspect-video after-image"
            />
            <!-- 变化前的图片 (鼠标悬停时显示) -->
            <img 
              :src="image.before" 
              :alt="image.alt + ' (before)'" 
              class="w-full h-full object-cover aspect-video before-image"
            />
            <!-- After标识 -->
            <div class="absolute top-2 right-2 bg-[#00ffd1] text-black text-xs font-bold py-1 px-2 rounded after-badge">
              after
            </div>
            <!-- Before标识 -->
            <div class="absolute top-2 right-2 bg-white text-black text-xs font-bold py-1 px-2 rounded before-badge opacity-0">
              before
            </div>
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p class="text-white text-center text-sm">{{ image.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const beforeAfterImages = [
  {
    before: 'https://resp.seedancepro.net/seedance/images/af1.webp',
    after: 'https://resp.seedancepro.net/seedance/images/bf1.webp',
    alt: 'Time Conversion',
    description: 'Time Conversion'
  },
  {
    before: 'https://resp.seedancepro.net/seedance/images/af2.webp',
    after: 'https://resp.seedancepro.net/seedance/images/bf2.webp',
    alt: 'Element Replacement',
    description: 'Element Replacement'
  },
  {
    before: 'https://resp.seedancepro.net/seedance/images/af3.webp',
    after: 'https://resp.seedancepro.net/seedance/images/bf3.webp',
    alt: 'Text Modification',
    description: 'Text Modification'
  },
  {
    before: 'https://resp.seedancepro.net/seedance/images/af4.webp',
    after: 'https://resp.seedancepro.net/seedance/images/bf4.webp',
    alt: 'Creative Elements & Visual Effects',
    description: 'Creative Elements & Visual Effects'
  },
  {
    before: 'https://resp.seedancepro.net/seedance/images/af5.webp',
    after: 'https://resp.seedancepro.net/seedance/images/bf5.webp',
    alt: 'Clothing Modification',
    description: 'Clothing Modification'
  },
  {
    before: 'https://resp.seedancepro.net/seedance/images/af6.webp',
    after: 'https://resp.seedancepro.net/seedance/images/bf6.webp',
    alt: 'Hairstyle Alteration',
    description: 'Hairstyle Alteration'
  },
  {
    before: 'https://resp.seedancepro.net/seedance/images/af7.webp',
    after: 'https://resp.seedancepro.net/seedance/images/bf7.webp',
    alt: 'Style Transfer',
    description: 'Style Transfer'
  },
  {
    before: 'https://resp.seedancepro.net/seedance/images/af8.webp',
    after: 'https://resp.seedancepro.net/seedance/images/bf8.webp',
    alt: 'Background Replacement',
    description: 'Background Replacement'
  },
  {
    before: 'https://resp.seedancepro.net/seedance/images/af9.webp',
    after: 'https://resp.seedancepro.net/seedance/images/bf9.webp',
    alt: 'Hair Colorization',
    description: 'Hair Colorization'
  },
];
</script>

<style scoped>
.hover-compare-container {
  position: relative;
  cursor: pointer;
}

.before-image {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.hover-compare-container:hover .before-image {
  opacity: 1;
}

.hover-compare-container:hover .after-image {
  opacity: 0;
}

.hover-compare-container:hover .before-badge {
  opacity: 1;
}

.hover-compare-container:hover .after-badge {
  opacity: 0;
}

.after-image, .before-image, .after-badge, .before-badge {
  transition: opacity 0.3s ease;
}

@media (max-width: 768px) {
  .grid {
    gap: 1.5rem;
  }
}

@media (max-width: 640px) {
  .grid {
    gap: 1rem;
  }
}

.hover-compare-container {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-compare-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
}
</style>
