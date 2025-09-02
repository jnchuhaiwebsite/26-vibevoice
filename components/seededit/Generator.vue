<template>
  <div class="relative w-full overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
    <div class="container mx-auto px-4 relative z-10 pt-[64px]">
      <h1 class="text-4xl font-bricolage-grotesque lg:text-5xl xl:text-6xl 2xl:text-[4rem] bg-gradient-to-r from-[#00ffd1] via-[#00ffd1]/80 via-[#00b8ff] to-[#00ffd1] bg-clip-text text-transparent whitespace-nowrap lg:whitespace-normal text-center leading-tight mb-6 mobile-large-title">
        SeedEdit 3.0 - AI Image Generator
      </h1>
      <p class="text-lg sm:text-xl text-gray-300 text-center mb-8 max-w-3xl mx-auto">
        Transform your images with SeedEdit 3.0, Use simple text commands to enhance portraits, alter backgrounds, and adjust lighting with superior detail.
      </p>
      
      <!-- 主布局：两列网格 -->
      <div class="flex flex-col md:flex-row gap-8 lg:gap-12 items-stretch justify-center">

        <!-- 左列：表单 -->
        <div class="w-full mx-auto md:mx-0 md:w-[45%] max-w-[720px] md:max-w-[560px] bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-700/50 p-6 flex flex-col gap-4">

          <!-- 图片上传 -->
          <div>
            <label for="image-upload" class="block text-lg font-semibold text-gray-200 mb-2">Upload Image (Required)</label>
            <div class="w-full h-[150px] border-2 border-dashed border-gray-600 rounded-xl p-4 hover:border-[#00ffd1] transition-colors relative bg-gray-800">
              <input 
                type="file" 
                accept="image/jpeg,image/png" 
                class="hidden" 
                ref="fileInput"
                @change="handleImageUpload"
              />
              <div 
                v-if="!imagePreview" 
                class="flex flex-col items-center justify-center gap-2 h-full cursor-pointer"
                @click="handleImageUploadClick"
              >
                <svg class="h-8 w-8 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="text-center">
                                  <p class="text-sm text-gray-300">Click or drag image here</p>
                <p class="text-xs text-gray-500 mt-1">JPEG, PNG only. Max 10MB. Dims: >14px. Ratio: 1/3-3</p>
                </div>
              </div>
              <div v-else class="relative w-full h-full">
                <img 
                  :src="imagePreview" 
                  class="w-full h-full object-contain rounded-lg"
                  alt="Image preview"
                />
                <button 
                  @click="removeSelectedImage"
                  class="absolute -top-2 -right-2 p-1 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
                >
                  <svg class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <!-- 显示图片来源标识 -->
                <div v-if="!selectedImage" class="absolute -top-2 -left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  Template
                </div>
              </div>
            </div>
          </div>

          <!-- 编辑提示 -->
          <div>
            <label for="prompt" class="block text-lg font-semibold text-gray-200 mb-2 flex justify-between items-center">
              <span>Edit Instructions</span>
              <button @click="showPromptGuide = true" class="text-sm text-[#00ffd1] hover:underline flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.546-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Prompt Guide
              </button>
            </label>
            <textarea
              v-model="prompt"
              id="prompt"
              ref="promptInput"
              class="w-full h-32 rounded-xl bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 text-gray-200 px-4 py-3 focus:ring-2 focus:ring-[#00ffd1] focus:border-transparent transition placeholder-gray-500 text-base resize-none"
              placeholder="Please provide a prompt describing the video you want to generate. Both Chinese and English are supported."
              @focus="withLoginCheck()"
            ></textarea>
          </div>

          <!-- 质量等级 -->
          <div>
            <label for="quality" class="block text-lg font-semibold text-gray-200 mb-2">
              <span class="flex items-center gap-1">
                Quality Level
                <div class="group relative">
                  <span class="h-5 w-5 inline-flex items-center justify-center rounded-full bg-gray-700 text-[#00ffd1] text-xs font-bold cursor-help">?</span>
                  <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 w-[300px] text-left break-normal">
                    Higher quality levels produce better results but may take longer to process and cost more credits.
                  </div>
                </div>
              </span>
            </label>
            <div class="flex items-center gap-4">
              <input
                type="range"
                id="quality"
                v-model.number="qualityLevel"
                min="1"
                max="5"
                step="1"
                class="w-full"
                :style="{ '--range-progress': qualityProgress + '%' }"
                @input="updateQualityProgress"
              />
              <span class="bg-gradient-to-b from-gray-900 to-gray-800 text-[#00ffd1] text-sm font-bold px-3 py-1 rounded-md w-16 text-center">{{ qualityLevel }}</span>
            </div>
          </div>
          
          <!-- 预设样式 -->
          <div class="preset-gallery pt-4">
            <p class="text-gray-400 text-center">Or, get inspired by a preset style:</p>
            <div class="grid grid-cols-2 gap-3 mt-4">
              <button
                v-for="preset in presets"
                :key="preset.name"
                @click="applyPreset(preset)"
                class="px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-lg text-gray-300 hover:bg-[#00ffd1] hover:text-gray-900 hover:border-[#00ffd1] transition-colors text-sm text-center"
              >
                <span class="font-semibold">{{ preset.name }}</span>
              </button>
            </div>
          </div>
          
          <!-- 编辑按钮 -->
          <button @click="editImage" :disabled="loading || !imagePreview" class="relative w-full flex items-center justify-center gap-2 px-4 mt-6 lg:px-6 py-3 sm:py-4 bg-[#00ffd1]/50 text-gray-900 hover:bg-[#00ffd1]/70 rounded-full font-extrabold text-base sm:text-lg lg:text-xl shadow-xl transition transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed">
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span v-if="loading">Editing...</span>
            <span v-else>✨ Generate Image</span>
            <span class="absolute -top-2 -right-2 bg-[#00b8ff] text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg border-2 border-white/50">1 credit</span>
          </button>
        </div>

        <!-- 右列：预览 -->
        <div class="w-full mx-auto md:mx-0 md:w-[55%] max-w-[720px] bg-gray-800/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-700/50 p-4 relative overflow-hidden flex flex-col justify-center">
          <!-- 固定高度的图片容器 -->
          <div class="w-full h-[500px] md:h-[550px] lg:h-[600px] flex items-center justify-center bg-gray-900/50 rounded-2xl">
                         <!-- 原始图片 -->
            <img v-if="imagePreview && !previewImage" :src="imagePreview" class="max-w-full max-h-full object-contain rounded-lg transition-opacity duration-300" :class="{'opacity-50': loading}" />
                         <!-- 编辑后的图片 -->
            <img v-else-if="previewImage" :src="previewImage" class="max-w-full max-h-full object-contain rounded-lg transition-opacity duration-300" :class="{'opacity-50': loading}" />
            <!-- 视频预览占位符 -->
            <ClientOnly v-else>
              <video
                src="https://resp.seedancepro.net/seedance/video/SeedEdit-3-0-final-version-video.mp4"
                autoplay
                loop
                muted
                loading="lazy"
                playsinline
                class="max-w-full max-h-full object-contain rounded-lg"
              >
                Your browser does not support the video tag.
              </video>
              <template #fallback>
                <img 
                  src="https://resp.seedancepro.net/seedance/images/SeedEdit-3-0-final-version-video.webp" 
                  class="max-w-full max-h-full object-contain rounded-lg" 
                  alt="SeedEdit Preview"
                >
              </template>
            </ClientOnly>
          </div>

          <!-- Demo Text -->
          <div v-if="!imagePreview && !previewImage" class="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 text-white text-base px-5 py-2.5 rounded-full pointer-events-none shadow-lg">
            SeedEdit 3.0 Generation Demo
          </div>

          <!-- 加载覆盖层 -->
          <div v-if="loading" class="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800/50 rounded-lg">
              <svg class="animate-spin h-10 w-10 text-[#00ffd1]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p class="text-white mt-4 text-lg">Creating your masterpiece with SeedEdit 3.0...</p>
          </div>

          <!-- 下载按钮 -->
          <button 
            v-if="previewImage" 
            @click="downloadImage" 
            class="absolute top-6 right-6 bg-gradient-to-r from-[#00ffd1] to-[#00b8ff] text-black font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            :disabled="loading"
          >
            <svg 
              v-if="!loading" 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <svg 
              v-else 
              class="animate-spin h-5 w-5" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ loading ? 'Downloading...' : 'Download' }}</span>
          </button>
        </div>

      </div>
    </div>
    
    <!-- Prompt Guide Modal -->
    <div v-if="showPromptGuide" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div class="bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl border border-gray-700/50 overflow-hidden">
        <div class="p-6 border-b border-gray-700/50 flex justify-between items-center">
          <h3 class="text-2xl font-bold text-white">Prompt Guide</h3>
          <button @click="showPromptGuide = false" class="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-8">
          <div class="space-y-6">
            <!-- Item 1: Prompt Length -->
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-[#00ffd1]/10 text-[#00ffd1]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h4 class="font-bold text-white text-lg">Prompt Length</h4>
                <p class="text-gray-400">Keep prompts under 120 characters for optimal results.</p>
              </div>
            </div>

            <!-- Item 2: Language -->
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-[#00ffd1]/10 text-[#00ffd1]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h4 class="font-bold text-white text-lg">Language</h4>
                <p class="text-gray-400">Use simple, natural language for your instructions.</p>
              </div>
            </div>

            <!-- Item 3: Clarity -->
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-[#00ffd1]/10 text-[#00ffd1]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h4 class="font-bold text-white text-lg">Clarity</h4>
                <p class="text-gray-400">For better accuracy, provide one clear instruction per edit.</p>
              </div>
            </div>

            <!-- Item 4: Specificity -->
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-[#00ffd1]/10 text-[#00ffd1]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 class="font-bold text-white text-lg">Specificity</h4>
                <p class="text-gray-400">When editing a specific area, precisely describe the target and the desired change.</p>
              </div>
            </div>
            
            <!-- Item 5: Edit Strength -->
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-[#00ffd1]/10 text-[#00ffd1]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 16v-2m0-8v-2m0 4h.01M6 12H4m16 0h-2m-8 0h.01M12 18h.01M18 12h.01M6 12h.01M12 6h.01M18 6L6 18" />
                </svg>
              </div>
              <div>
                <h4 class="font-bold text-white text-lg">Edit Strength</h4>
                <p class="text-gray-400">If the effect is too subtle, increase the 'scale' value for a stronger impact.</p>
              </div>
            </div>

            <!-- Item 6: Image Quality -->
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-[#00ffd1]/10 text-[#00ffd1]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <h4 class="font-bold text-white text-lg">Image Quality</h4>
                <p class="text-gray-400">Start with clear, high-resolution images for the best outcomes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue';
import { useUserStore } from '~/stores/user';
import { useUiStore } from '~/stores/ui';
import { useRouter } from 'vue-router';
import { editImage as editImageApi, upload } from '~/api';
import { useNuxtApp } from 'nuxt/app';

const { $toast } = useNuxtApp() as any;
const showPromptGuide = ref(false);

interface ImageResponse {
  code: number;
  msg: string;
  data?: {
    task_id: string;
    image_url: string;
  };
  success: boolean;
}

const router = useRouter()

interface Preset {
  name: string;
  prompt: string;
}

const userStore = useUserStore();
const uiStore = useUiStore();

const userInfo = computed(() => userStore.userInfo);

const withLoginCheck = async (callback?: () => void | Promise<void>) => {
  const isLoggedIn = await checkLoginStatus();
  if (isLoggedIn && callback) {
    await callback();
  }
};

const checkLoginStatus = async () => {
  if (!userInfo.value) {
    uiStore.showLoginPrompt();
    return false;
  }
  return true;
};

const prompt = ref('');
const promptInput = ref<HTMLTextAreaElement | null>(null);
const selectedImage = ref<File | null>(null);
const imagePreview = ref<string>('');
const fileInput = ref<HTMLInputElement | null>(null);

const qualityLevel = ref(3);

// 计算滑块的进度百分比
const qualityProgress = computed(() => {
  const min = 1;
  const max = 5;
  const value = qualityLevel.value;
  return ((value - min) / (max - min)) * 100;
});

const updateQualityProgress = () => {
  // 强制重新计算样式
  nextTick(() => {
    const slider = document.getElementById('quality') as HTMLInputElement;
    if (slider) {
      slider.style.setProperty('--range-progress', qualityProgress.value + '%');
    }
  });
};

const loading = ref(false);
const previewImage = ref<string>('');

const presets = [
  {
    name: 'Shape Shifter',
    prompt: 'Turn [Object A] into [Object B] (e.g., Turn the bubbles into heart shapes)'
  },
  {
    name: 'Atmosphere Shift', // 修正：去除了前面的空格
    prompt: 'Change the scene to [Time/Weather/Environment] (e.g., Change the scene to daytime)'
  },
  {
    name: 'Style Transfer',
    prompt: 'Change style to [Art Style] (e.g., Change style to a sketch)' // 优化：更简洁，“style”已足够清晰
  },
  {
    name: 'Text Editor',
    prompt: 'Change "[Original Text]" to "[New Text]" (e.g., Change "LOVE" to "SEED")' // 优化：更直接，引号已表明这是文本
  }
];



// 处理图片上传区域点击
const handleImageUploadClick = async () => {
  if (!await checkLoginStatus()) return
  fileInput.value?.click()
}

// 处理图片上传
const handleImageUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return

  const file = input.files[0]

  // 在处理完文件后，重置 input 的值
  const cleanup = () => {
    // 重置 input 值，以便可以重新上传相同的文件
    if (input) {
      input.value = ''
    }
  }

  // 1. 检查图片格式
  const allowedTypes = ['image/jpeg', 'image/png']
  if (!allowedTypes.includes(file.type)) {
    $toast.error('Unsupported image format. Please use JPEG or PNG.');
    cleanup()
    return
  }

  // 2. 检查图片大小
  if (file.size > 10 * 1024 * 1024) { // 10MB
    $toast.error('Image size should be less than 10MB.');
    cleanup()
    return
  }

  // 3. 检查图片尺寸和宽高比
  const reader = new FileReader()
  reader.onload = (e) => {
    const img = new Image()
    img.onload = () => {
      const { width, height } = img
      
      // 检查宽高长度
      if (width <= 14 || height <= 14) {
        $toast.error('Image dimensions must be greater than 14px.');
        cleanup()
        return
      }

      // 检查宽高比
      const aspectRatio = width / height
      if (aspectRatio <= 1/3 || aspectRatio >= 3) {
        $toast.error('Image aspect ratio must be between 1/3 and 3.');
        cleanup()
        return
      }

      // 所有检查通过
      selectedImage.value = file
      imagePreview.value = URL.createObjectURL(file)
      cleanup()
    }
    img.onerror = () => {
        $toast.error('Failed to load image, it may be corrupted.');
        cleanup()
    }
    img.src = e.target?.result as string
  }
  reader.onerror = () => {
    $toast.error('Failed to read file.');
    cleanup()
  }
  reader.readAsDataURL(file)
}

// 移除已选择的图片
const removeSelectedImage = () => {
  if (imagePreview.value) {
    // 只有当是用户上传的图片时才需要释放 URL
    if (selectedImage.value) {
      URL.revokeObjectURL(imagePreview.value)
    }
  }
  selectedImage.value = null
  imagePreview.value = ''
}

const applyPreset = (preset: Preset) => {
  prompt.value = preset.prompt;
};

const editImage = async () => {
  if (!imagePreview.value) {
    $toast.error('Please upload an image first');
    return;
  }

  if (!prompt.value.trim()) {
    $toast.error('Please enter edit instructions');
    return;
  }

  const remainingTimes = computed(() => userStore.userInfo?.free_limit + userStore.userInfo?.remaining_limit || 0)
  // 检查使用限制
  const checkUsageLimit = () => {
    if (remainingTimes.value <= 0) {
      $toast.info('Usage limit reached. Please upgrade to premium for more credits');
      router.push('/pricing')
      return false
    }
    return true
  }
  if (!checkUsageLimit()) {
    return;
  }

  loading.value = true;
  
  try {
    let imageUrl = '';
    
    // 如果是使用模板图片（selectedImage为null但imagePreview有值）
    if (!selectedImage.value && imagePreview.value) {
      // 直接使用模板URL
      imageUrl = imagePreview.value;
    } 
    // 如果是用户上传的图片
    else if (selectedImage.value) {
      // 使用upload API上传图片获取URL
      const formData = {
        file: selectedImage.value
      };
      const response = await upload(formData);
      
      if (!response.data || typeof response.data !== 'string') {
        throw new Error('图片上传失败');
      }
      
      imageUrl = response.data as string;
    }
    
    // 准备请求参数
    const requestData = {
      file_url: imageUrl,
      prompt: prompt.value.trim(),
      scale: qualityLevel.value
    };
    
    // 调用editImage API
    const result = await editImageApi(requestData) as ImageResponse;
    
    if (result.code !== 200 || !result.success || !result.data?.image_url) {
      throw new Error(result.msg || '图片编辑失败');
    }
    
    // 显示编辑后的图片
    previewImage.value = result.data.image_url;
    
    $toast.success('Image edited successfully!');
    // Deduct credit on frontend for immediate feedback, backend should be the source of truth
    if(userStore.userInfo) {
      userStore.userInfo.credits -= 1;
    }
  } catch (error: any) {
    $toast.error(error.message || 'Failed to edit image');
    console.error('编辑图片失败:', error);
  } finally {
    loading.value = false;
  }
};

async function downloadImage() {
  if (previewImage.value) {
    try {
      // 开始下载时显示加载状态
      loading.value = true;
      
      // 获取图片数据
      const response = await fetch(previewImage.value);
      const blob = await response.blob();
      
      // 创建 blob URL
      const blobUrl = window.URL.createObjectURL(blob);
      
      // 创建一个临时的 a 标签
      const link = document.createElement('a');
      link.href = blobUrl;
      // 设置文件名
      const fileName = 'seedream-ai-image.png';
      link.download = fileName;
      
      // 触发下载
      document.body.appendChild(link);
      link.click();
      
      // 清理
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      
      $toast.success('Image downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      $toast.error('Download failed, please try again later');
    } finally {
      loading.value = false;
    }
  }
};

onMounted(() => {
  // 组件挂载时初始化滑块样式
  nextTick(() => {
    updateQualityProgress();
  });
});
</script>

<style scoped>
/* 重置滑块的基础样式 */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background: linear-gradient(to right, #00ffd1 0%, #00ffd1 var(--range-progress), #374151 var(--range-progress), #374151 100%);
  border-radius: 8px;
  height: 8px;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #00ffd1;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 255, 209, 0.3);
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #00ffd1;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 6px rgba(0, 255, 209, 0.3);
}
</style>
