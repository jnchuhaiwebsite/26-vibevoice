<template>
  <div class="relative py-20 sm:py-32">
    <div
      aria-hidden="true"
      class="absolute inset-0 bg-gray-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
    ></div>
    <div class="container mx-auto px-4 relative">
      <h2
        class="text-3xl sm:text-4xl font-bold text-center mb-4 text-white text-shadow-glow"
      >
        Editing with SeedEdit 3.0 AI Image Editor is Simple
      </h2>
      <p class="max-w-3xl mx-auto mb-12 text-center text-lg text-gray-300">
        Follow our 3 easy steps to go from a basic image to a professionally edited
        masterpiece with the SeedEdit 3.0 AI Image Editor.
      </p>

      <div class="max-w-5xl mx-auto">
        <!-- Desktop Timeline -->
        <div class="hidden md:block">
          <!-- Timeline visualizer -->
          <div class="flex items-center mb-12">
            <template v-for="(step, index) in steps" :key="step.number">
              <!-- Circle -->
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold z-10 cursor-pointer transition-all duration-300 transform"
                :class="
                  activeStep === step.number
                    ? 'bg-primary text-white scale-110'
                    : 'bg-gradient-to-b from-gray-900 to-gray-800/80 text-gray-400 hover:bg-primary/20 hover:text-white'
                "
                @click="setActiveStep(step.number)"
              >
                {{ step.number }}
              </div>
              <!-- Connector line -->
              <div
                v-if="index < steps.length - 1"
                class="flex-1 h-0.5 transition-colors duration-500"
                :class="activeStep > step.number ? 'bg-primary' : 'bg-gray-700'"
              ></div>
            </template>
          </div>

          <!-- Timeline Content Cards -->
          <div class="grid grid-cols-3 gap-8">
            <div
              v-for="step in steps"
              :key="step.number"
              class="relative bg-gradient-to-b from-gray-900 to-gray-800/80 backdrop-blur-sm p-6 rounded-2xl cursor-pointer transition-all duration-300 transform border border-transparent"
              :class="{
                'active-card': activeStep === step.number,
              }"
              @click="setActiveStep(step.number)"
            >
              <h3 class="text-xl font-bold mb-4 text-white">{{ step.title }}</h3>
              <p class="text-gray-400">{{ step.description }}</p>
            </div>
          </div>
        </div>

        <!-- Mobile Timeline -->
        <div class="md:hidden">
          <div v-for="(step, index) in steps" :key="step.number" class="flex items-start mb-8">
            <div class="flex flex-col items-center mr-6">
              <div
                class="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold z-10 cursor-pointer transition-all duration-300 transform flex-shrink-0"
                :class="
                  activeStep === step.number
                    ? 'bg-primary text-white scale-110'
                    : 'bg-gradient-to-b from-gray-900 to-gray-800/80 text-gray-400'
                "
                @click="setActiveStep(step.number)"
              >
                {{ step.number }}
              </div>
              <div
                v-if="index < steps.length - 1"
                class="w-0.5 grow min-h-[8rem] mt-2 transition-colors duration-500"
                :class="activeStep > step.number ? 'bg-primary' : 'bg-gray-700'"
              ></div>
            </div>
            <div
              class="relative bg-gradient-to-b from-gray-900 to-gray-800/80 backdrop-blur-sm p-6 rounded-2xl flex-1 transition-all duration-300 transform border border-transparent"
              :class="{
                'active-card': activeStep === step.number,
              }"
              @click="setActiveStep(step.number)"
            >
              <h3 class="text-xl font-bold mb-4 text-white">{{ step.title }}</h3>
              <p class="text-gray-400">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeStep = ref(1);

const steps = [
  {
    number: 1,
    title: 'Upload Your Image',
    description: 'Simply drag and drop your image or click to browse. We support JPEG and PNG formats up to 10MB.'
  },
  {
    number: 2,
    title: 'Describe Your Edits',
    description: 'Tell our AI what changes you want. Use natural language like "Remove background", "Enhance colors", or "Change hair color to blonde".'
  },
  {
    number: 3,
    title: 'Download & Share',
    description: 'Our AI processes your image and delivers professional results in seconds. Download your masterpiece and share it with the world.'
  }
];

const setActiveStep = (stepNumber: number) => {
  activeStep.value = stepNumber;
};
</script>

<style scoped>
.bg-primary {
  background: linear-gradient(135deg, #00ffd1, #00b8ff);
}

.text-shadow-glow {
  text-shadow:
    0 0 5px rgba(120, 119, 198, 0.5),
    0 0 10px rgba(120, 119, 198, 0.4),
    0 0 20px rgba(120, 119, 198, 0.3);
}

.active-card {
  transform: translateY(-0.25rem) scale(1.02);
  box-shadow: 0 0 20px rgba(120, 119, 198, 0.2);
  border-color: rgba(120, 119, 198, 0.5);
}

.active-card::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  margin: -1px; /* The width of the border */
  border-radius: inherit; /* Follow the parent's border radius */
  background: conic-gradient(
    from 180deg at 50% 50%,
    rgba(120, 119, 198, 0.5) 0%,
    rgba(59, 130, 246, 0.3) 50%,
    rgba(120, 119, 198, 0.5) 100%
  );
  opacity: 1;
}
</style>
