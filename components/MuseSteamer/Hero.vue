<template>
    <div class="container mx-auto px-4"  style="background-color: var(--bg-color);">
        <PageHero title="MuseSteamer AI Video Generator with Pro Audio"
            subtitle="With the Baidu MuseSteamer AI Model, create dynamic MuseSteamer AI videos from images and prompts, featuring cinematic camera moves and pro audio effects with MuseSteamer." />

        <!-- 主生成器区域 -->
        <div class="relative w-full  mt-8 mb-12">
            <div class="relative z-10">

                <!-- 主布局：两列 -->
                <div class="flex flex-col md:flex-row gap-6 lg:gap-8 items-stretch justify-center">

                    <!-- 左列：表单 -->
                    <div class="w-full mx-auto md:mx-0 md:w-[40%] max-w-[720px] md:max-w-[560px]
                  rounded-3xl border border-white/10 dark:border-white/10
                  bg-gray-800/80  backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,.25)]
                  p-6 md:p-7 lg:p-8 flex flex-col gap-2">

                        <!-- 模型选择 -->
                        <div>
                            <label for="model"
                                class="block text-white md:text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">
                                <span class="flex items-center gap-2">
                                    Select Model
                                    <span class="group relative">
                                        <span class="inline-flex h-5 w-5 items-center justify-center rounded-full
                         
                             text-white bg-gray-500 text-[10px] font-bold cursor-help shadow">?</span>
                                        <span class="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                             w-[260px] rounded-lg border border-white/10 bg-gray-800/90 text-white
                             text-xs px-3 py-2 opacity-0 group-hover:opacity-100 transition
                             shadow-xl">
                                            Models vary in quality, resolution, audio support, and duration limits.
                                        </span>
                                    </span>
                                </span>
                            </label>

                            <div class="relative" ref="modelDropdown">
                                <button @click="isModelDropdownOpen = !isModelDropdownOpen" type="button" class="relative w-full cursor-pointer rounded-2xl border-2 border-dashed border-slate-300/60 dark:border-slate-600/70 bg-gray-800/70 dark:bg-gray-800/50 py-2.5 pl-4 pr-10 text-left shadow-sm hover:border-[#6209F6] focus:outline-none focus:ring-2 focus:ring-[#6209F6] sm:text-sm sm:leading-6 transition-colors duration-300">
                                    <span class="flex flex-col" v-if="selectedModelObject">
                                        <span class="block truncate font-semibold text-white">{{
                                            selectedModelObject.name }}</span>
                                        <span class="block truncate text-xs text-slate-400">{{
                                            selectedModelObject.description }}</span>
                                    </span>
                                    <span
                                        class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                        <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"
                                            aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.24a.75.75 0 011.06.04l2.7 2.92 2.7-2.92a.75.75 0 111.12 1.004l-3.25 3.5a.75.75 0 01-1.12 0l-3.25-3.5a.75.75 0 01.06-1.06z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                </button>

                                <ul v-if="isModelDropdownOpen" class="absolute z-10 mt-2 max-h-72 w-full overflow-auto rounded-2xl bg-gray-800/95 backdrop-blur-lg border border-slate-700/80 p-1.5 text-base shadow-2xl ring-1 ring-black/5 focus:outline-none sm:text-sm"
                                    tabindex="-1" role="listbox">
                                    <li v-for="model in models" :key="model.id" @click="selectModel(model.id)" :class="[
                                        'relative cursor-pointer select-none rounded-xl p-3 transition-colors duration-200',
                                        selectedModel === model.id ? 'bg-gradient-to-r from-[#6209F6]/25 via-[#DC8AF6]/25 to-[#83D0FB]/25' : 'hover:bg-slate-700/60'
                                    ]" role="option">
                                        <div class="flex flex-col">
                                            <span class="font-semibold block truncate text-white">{{
                                                model.name }}</span>
                                            <span class="text-xs text-slate-400">{{ model.description
                                            }}</span>
                                        </div>
                                        <!-- <span v-if="selectedModel === model.id"
                                            class="text-[#6209F6] absolute inset-y-0 right-0 flex items-center pr-4">
                                            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clip-rule="evenodd" />
                                            </svg>
                                        </span> -->
                                    </li>
                                </ul>
                            </div>

                        </div>

                        <!-- 图片上传 -->
                        <div>
                            <label for="image-upload"
                                class="block text-white md:text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">
                                Upload Image for Your MuseSteamer AI Video <span class="text-rose-500">*</span>
                            </label>
                            <div class="group relative w-full h-[160px] rounded-2xl p-4
                      border-2 border-dashed border-slate-300/60 dark:border-slate-600/70
                      bg-gray-800/80 dark:bg-gray-800/40
                      hover:border-[#6209F6] hover:bg-gray-800/70
                      transition-all duration-300">
                                <input type="file" accept="image/jpeg,image/png" class="hidden" ref="fileInput"
                                    @change="handleImageUpload" />
                                <div v-if="!imagePreview"
                                    class="flex flex-col items-center justify-center gap-2 h-full cursor-pointer select-none"
                                    @click="handleImageUploadClick">
                                    <svg class="h-8 w-8 text-slate-400 group-hover:text-[#6209F6] transition-colors"
                                        stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                        <path
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <div class="text-center">
                                        <p class="text-sm text-slate-500 dark:text-slate-400">Click or drag an image
                                            here</p>
                                        <p class="text-xs text-slate-400/90 dark:text-slate-500/90 mt-1">JPEG, PNG or WEBP,
                                            max 10MB, min 300px</p>
                                    </div>
                                </div>

                                <div v-else class="relative w-full h-full">
                                    <img :src="imagePreview" class="w-full h-full object-contain rounded-xl"
                                        alt="Image Preview" />
                                    <button @click="removeSelectedImage" class="absolute -top-2 -right-2 p-1.5 rounded-full
                      bg-gray-800/80 dark:bg-slate-800/90 backdrop-blur
                      border border-white/50 dark:border-white/10
                      shadow-md hover:scale-110 transition" aria-label="Remove Image">
                                        <svg class="h-4 w-4 text-rose-500" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>

                                    <!-- 来源标识 -->
                                    <div v-if="!selectedImage" class="absolute -top-2 -left-2 rounded-full px-2.5 py-1 text-xs
                         text-white bg-gradient-to-r from-[#6209F6] via-[#DC8AF6] to-[#83D0FB]
                         shadow-lg border-2 border-white/60 dark:border-white/20">
                                        Template
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 提示词 -->
                        <div>
                            <label for="prompt"
                                class="block text-white md:text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3 flex justify-between items-center">
                                <span>Video Prompt <span class="text-rose-500">*</span></span>

                            </label>

                            <textarea v-model="prompt" id="prompt" ref="promptInput" class="w-full h-32 rounded-2xl px-4 py-3 text-[15px]
                  border-2 border-dashed border-slate-300/60 dark:border-slate-600/70
                  bg-gray-800/70 dark:bg-gray-800/50 text-white
                  placeholder:text-slate-400 dark:placeholder:text-slate-500
                  hover:border-[#6209F6] focus:border-[#6209F6] focus:ring-2 focus:ring-[#6209F6]/30
                  transition-all resize-none"
                                placeholder="Describe the video you want to create. English is supported."
                                @focus="withLoginCheck()"></textarea>
                        </div>


                        <!-- 视频时长 -->
                        <Transition enter-active-class="transition-all duration-300 ease-in-out"
                            enter-from-class="opacity-0 -translate-y-2 scale-95"
                            enter-to-class="opacity-100 translate-y-0 scale-100"
                            leave-active-class="transition-all duration-200 ease-in-out"
                            leave-from-class="opacity-100 translate-y-0 scale-100"
                            leave-to-class="opacity-0 -translate-y-2 scale-95">
                            <div v-if="selectedModel === 'musesteamer-2.0-turbo-i2v-audio'">
                                <label
                                    class="block text-white md:text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3 ">MuseSteamer AI Video Duration</label>
                                <div class="grid grid-cols-2 gap-3 ">
                                    <label v-for="duration in currentVideoDurations" :key="duration.value"
                                        class="cursor-pointer group">
                                        <input type="radio" :value="duration.value" v-model="selectedDuration"
                                            class="sr-only" />
                                        <div class="rounded-2xl p-1 text-center border-2 border-dashed border-slate-600/70 bg-gray-800/80
                      transition-all duration-300 shadow-sm
                      group-hover:shadow-md group-hover:border-[#6209F6]" :class="selectedDuration === duration.value
                                                ? 'border-solid border-transparent text-white bg-gradient-to-r from-[#6209F6]/80 via-[#6209F6]/80 to-[#6209F6]/80 '
                                                : 'text-slate-400 hover:border-[#6209F6]'">
                                            <div class="font-semibold text-lg ">{{ duration.value }}s</div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </Transition>

                        <!-- 生成按钮 -->
                        <button @click="handleGenerateClick" class="relative w-full inline-flex items-center justify-center gap-2
                rounded-full px-5 py-3.5 md:py-4 text-base md:text-lg font-bold text-white
                bg-gradient-to-r from-[#6209F6] via-[#DC8AF6] to-[#83D0FB]
                shadow-[0_10px_35px_rgba(98,9,246,.35)]
                hover:opacity-95 active:scale-[.98]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6209F6]/40
                disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none
                transition-all mt-2">
                            <svg v-if="isGenerating" class="animate-spin -ml-1 mr-2 h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4" />
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                            </svg>
                            <span v-if="isGenerating">Generating Your MuseSteamer AI Video...</span>
                            <span v-else>🎬 Generate MuseSteamer AI Video</span>

                            <span class="absolute -top-2 -right-2 rounded-full px-2.5 py-1 text-xs font-bold text-white
                      bg-gradient-to-r from-emerald-500 to-teal-500
                      shadow-lg border-2 border-white/60 dark:border-white/20">
                                {{ currentCreditCost }} {{ currentCreditCost === 1 ? 'Credit' : 'Credits' }}
                            </span>
                        </button>
                    </div>

                    <!-- 右列：预览 -->
                    <div class="w-full mx-auto md:mx-0 md:w-[60%] max-w-[960px]
                  rounded-3xl border border-white/10 dark:border-white/10
                  bg-gray-800/10 dark:bg-gray-800/[.04] backdrop-blur-xl
                  shadow-[0_10px_40px_rgba(0,0,0,.25)]
                  p-4 md:p-5 lg:p-6 relative overflow-hidden flex flex-col justify-center">

                        <div class="w-full aspect-video
                   rounded-2xl overflow-hidden
                   border-2 border-dashed border-slate-300/70 dark:border-slate-600/70
                   bg-gray-800/70 dark:bg-gray-800/40 grid place-items-center">
                            <!-- 生成的视频 -->
                            <video v-if="generatedVideoUrl" :src="generatedVideoUrl" class="w-full h-full object-contain"
                                :class="{ 'opacity-50': isGenerating }" controls autoplay loop muted></video>

                            <!-- 上传的图片 -->
                            <img v-else-if="imagePreview" :src="imagePreview" class="w-full h-full object-contain"
                                :class="{ 'opacity-50': isGenerating }" alt="Image Preview" />

                            <!-- 默认视频 -->
                            <video v-if="pageLoaded" src="https://resp.musesteamer2.com/steamer/videos/MuseSteamer-AI-demo.mp4"
                                poster="https://resp.musesteamer2.com/steamer/images/MuseSteamer-AI-demo.webp"
                                loading="lazy" controls
                                class="w-full h-full object-contain" autoplay loop muted playsinline></video>
                            <img v-else src="https://resp.musesteamer2.com/steamer/images/MuseSteamer-AI-demo.webp" class="w-full h-full object-contain" alt="MuseSteamer AI Video Demo Preview"/>
                        </div>

                        <!-- 提示条 -->
                        <div v-if="!generatedVideoUrl && !imagePreview" class="absolute bottom-8 left-1/2 -translate-x-1/2
                   px-5 py-2.5 rounded-full text-white text-sm md:text-base
                   bg-gray-800/70 backdrop-blur shadow-lg pointer-events-none whitespace-nowrap">
                            MuseSteamer AI Video Generation Demo
                        </div>

                        <!-- 加载遮罩 -->
                        <div v-if="isGenerating" class="absolute inset-0 grid place-items-center
                   rounded-3xl bg-gray-800/70 backdrop-blur-sm">
                            <div class="flex flex-col items-center gap-3">
                                <svg class="animate-spin h-9 w-9 text-white/90" xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4" />
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                </svg>
                                <p class="text-white/95 text-sm md:text-base">Creating your MuseSteamer AI video with MuseSteamer...
                                </p>
                            </div>
                        </div>

                        <!-- 下载按钮 -->
                        <button v-if="generatedVideoUrl" @click="downloadVideo" :disabled="isDownloading" class="absolute top-6 right-6 inline-flex items-center gap-2 rounded-full
                bg-gradient-to-r from-[#6209F6] via-[#DC8AF6] to-[#83D0FB]
                text-white font-semibold px-4 py-2 shadow-lg hover:shadow-xl hover:opacity-95
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6209F6]/40
                disabled:opacity-60 disabled:cursor-not-allowed transition">
                            <svg v-if="!isDownloading" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            <svg v-else class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4" />
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            <span>{{ isDownloading ? 'Downloading...' : 'Download' }}</span>
                        </button>
                    </div>
                </div>
            </div>
    </div>


    </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onBeforeUnmount, watch } from 'vue';
import { useUserStore } from '~/stores/user';
import { useVideoTaskStore } from '~/stores/videoTask';
import { useUiStore } from '~/stores/ui'; // 引入 uiStore
import { useNotificationStore } from '~/stores/notification';
import { useRouter } from 'vue-router';
import { createTaskTextVideo, checkTask, upload } from '~/api';
import { useNuxtApp } from 'nuxt/app';
import PageHero from '~/components/PageHero.vue';

const { $toast } = useNuxtApp() as any;


const router = useRouter();
const userStore = useUserStore();
const videoTaskStore = useVideoTaskStore();
const uiStore = useUiStore(); // 实例化 uiStore
const notificationStore = useNotificationStore(); // 保留用于可能的全局通知，但主要交互使用toast

const userInfo = computed(() => userStore.userInfo);

const pageLoaded = ref(false);

const showPromptGuide = ref(false);

interface Preset {
    name: string;
    prompt: string;
}

const prompt = ref('');
const promptInput = ref<HTMLTextAreaElement | null>(null);
const selectedImage = ref<File | null>(null);
const imagePreview = ref<string>('');
const fileInput = ref<HTMLInputElement | null>(null);

// 移除 qualityLevel 和相关计算属性
// const qualityLevel = ref(3);
// const qualityProgress = computed(...)

// 新的状态变量
const isGenerating = ref(false); // 替换 loading
const isDownloading = ref(false);
const generatedVideoUrl = ref(''); // 替换 previewVideo
const progress = ref(0);
let checkTaskInterval: NodeJS.Timeout | null = null; // 检查任务状态定时器


const presets = [
    {
        name: 'Cinematic Style',
        prompt: 'Transform the scene into a cinematic style, adding dynamic camera moves and professional audio effects.'
    },
    {
        name: 'Animation Effect',
        prompt: 'Add smooth animations to the image, including zoom, pan, and rotation.'
    },
    {
        name: 'Environmental Change',
        prompt: 'Change the scene\'s environment, like from day to night, or from indoors to outdoors.'
    },
    {
        name: 'Special Effects Boost',
        prompt: 'Add visual effects like particles, light effects, or dynamic textures.'
    }
];

// 模型选择数据
const models = [
    {
        id: 'musesteamer-2.0-turbo-i2v-audio',
        name: 'MuseSteamer AI 2.0 Turbo (Audio)',
        description: 'Supports audio generation for more dynamic videos.',
        durations: [5, 10],
        defaultDuration: 5,
        costs: { 5: 70, 10: 120 }
    },
    {
        id: 'musesteamer-2.0-turbo-i2v',
        name: 'MuseSteamer AI 2.0 Turbo',
        description: 'Standard base model, widely applicable.',
        durations: [5],
        defaultDuration: 5,
        costs: { 5: 40 }
    },
    {
        id: 'musesteamer-2.0-pro-i2v',
        name: 'MuseSteamer AI 2.0 Pro',
        description: 'Precise response, ultra-high definition quality.',
        durations: [5],
        defaultDuration: 5,
        costs: { 5: 70 }
    },
    {
        id: 'musesteamer-2.0-lite-i2v',
        name: 'MuseSteamer AI 2.0 Lite',
        description: 'For simple creative expression, extremely fast generation.',
        durations: [5],
        defaultDuration: 5,
        costs: { 5: 20 }
    }
];

// 选中的模型和时长
const selectedModel = ref('musesteamer-2.0-turbo-i2v-audio'); // 默认选择
const selectedDuration = ref(5); // 默认选择 5s

// 根据所选模型和时长动态计算消耗的积分
const currentCreditCost = computed(() => {
    const model = models.find(m => m.id === selectedModel.value);
    if (model && model.costs) {
        const cost = model.costs[selectedDuration.value as keyof typeof model.costs];
        return cost || 0;
    }
    return 0;
});

// 根据所选模型动态计算可用的视频时长
const currentVideoDurations = computed(() => {
    const model = models.find(m => m.id === selectedModel.value);
    if (model) {
        return model.durations.map(d => ({ value: d, label: `${d}s` }));
    }
    return [{ value: 5, label: '5s' }]; // 默认或备用选项
});

// 监听模型变化，以更新时长
watch(selectedModel, (newModelId) => {
    const model = models.find(m => m.id === newModelId);
    if (model) {
        // 检查当前时长是否对新模型有效
        if (!model.durations.includes(selectedDuration.value)) {
            // 如果无效，则重置为新模型的默认时长
            selectedDuration.value = model.defaultDuration;
        }
    }
});

const isModelDropdownOpen = ref(false);
const modelDropdown = ref<HTMLDivElement | null>(null);

const selectedModelObject = computed(() => {
    return models.find(m => m.id === selectedModel.value);
});

const selectModel = (modelId: string) => {
    selectedModel.value = modelId;
    isModelDropdownOpen.value = false;
};

// 处理图片上传区域点击
const handleImageUploadClick = () => {
    withLoginCheck(() => {
        fileInput.value?.click();
    });
};

// 处理图片上传
const handleImageUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];

    // 处理后重置输入值
    const cleanup = () => {
        if (input) {
            input.value = '';
        }
    };

    // 1. 检查图片格式
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
        $toast.error('Unsupported image format for MuseSteamer AI Video. Please use JPEG, PNG or WEBP.');
        cleanup();
        return;
    }

    // 2. 检查图片大小
    if (file.size > 10 * 1024 * 1024) { // 10MB
        $toast.error('Image size must be less than 10MB for a MuseSteamer AI Video.');
        cleanup();
        return;
    }

    // 3. 检查图片尺寸和宽高比
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const { width, height } = img;

            // 检查尺寸
            if (width < 300 || height < 300) {
                $toast.error('Image dimensions must be at least 300px for a MuseSteamer AI Video.');
                cleanup();
                return;
            }

            // 检查宽高比 (示例，可以调整)
            const aspectRatio = width / height;
            if (aspectRatio <= 1 / 4 || aspectRatio >= 4) {
                 $toast.error('Image aspect ratio for MuseSteamer AI Video must be between 1/4 and 4.');
                cleanup();
                return;
            }

            // 所有检查通过
            selectedImage.value = file;
            imagePreview.value = URL.createObjectURL(file);
            cleanup();
        };
        img.onerror = () => {
            $toast.error('Failed to load the image. It may be corrupted.');
            cleanup();
        };
        img.src = e.target?.result as string;
    };
    reader.onerror = () => {
        $toast.error('Failed to read the file.');
        cleanup();
    };
    reader.readAsDataURL(file);
};

// 移除所选图片
const removeSelectedImage = () => {
    if (imagePreview.value) {
        if (selectedImage.value) {
            URL.revokeObjectURL(imagePreview.value);
        }
    }
    selectedImage.value = null;
    imagePreview.value = '';
    generatedVideoUrl.value = ''; // 使用 generatedVideoUrl
};

const applyPreset = (preset: Preset) => {
    prompt.value = preset.prompt;
};

// 获取模型描述
const getModelDescription = (modelId: string) => {
    const model = models.find(m => m.id === modelId);
    return model ? model.description : '';
};


// 统一的登录检查方法

const withLoginCheck = async (callback?: () => void | Promise<void>) => {
  const isLoggedIn = await checkLoginStatus();
  if (isLoggedIn && callback) {
    await callback();
  }
};

// 检查登录状态
const checkLoginStatus = async () => {
    if (!userInfo.value) {
        uiStore.showLoginPrompt(); // 调用全局登录弹窗
        return false;
    }
    return true;
};

// 检查使用限制
const checkUsageLimit = () => {
    const remainingCredits = (userInfo.value?.free_limit ?? 0) + (userInfo.value?.remaining_limit ?? 0);
    // 此处假设生成一次消耗1积分，可以根据模型和时长调整
    if (remainingCredits < currentCreditCost.value) {
        $toast.info(`Not enough credits. This action requires ${currentCreditCost.value} credits.`);
        router.push('/pricing');
        return false;
    }
    return true;
};

// 点击生成按钮的入口函数
const handleGenerateClick = () => {


    withLoginCheck(() => {
        // 1. 验证输入
        if (!imagePreview.value) {
            $toast.info('Please upload an image first.');
            return;
        }
        if (!prompt.value.trim()) {
            $toast.info('Please enter a video prompt.');
            return;
        }

        // 2. 检查积分
        if (!checkUsageLimit()) return;

        // 3. 开始生成
        handleVideoRequest();
    });
};

// 视频生成请求
const handleVideoRequest = async () => {
    isGenerating.value = true;
    progress.value = 0;
    if (generatedVideoUrl.value) {
        URL.revokeObjectURL(generatedVideoUrl.value);
        generatedVideoUrl.value = '';
    }

    let imageUrl = imagePreview.value; // 如果图片已是URL，则直接使用

    try {
        // 如果 selectedImage 是一个文件, 先上传
        if (selectedImage.value && selectedImage.value instanceof File) {
            const uploadResponse = await upload({ file: selectedImage.value });
            if (uploadResponse.code === 200 && typeof uploadResponse.data === 'string') {
                imageUrl = uploadResponse.data;
            } else {
                throw new Error(uploadResponse.msg || 'Failed to upload image for your MuseSteamer AI Video');
            }
        }

        startProgressAnimation();

        const requestData = {
            image_url: imageUrl,
            prompt: prompt.value,
            model: selectedModel.value,
            duration: selectedDuration.value,
            // is_show: isShow.value // 如果需要分享功能
        };

        console.log(requestData);
        const response = await createTaskTextVideo(requestData);
        console.log(response);
        await userStore.fetchUserInfo(true); // 刷新用户信息（积分）

        // 由于 response.data 类型为未知，需进行类型断言或类型检查
        if (
            response.code === 200 &&
            response.data &&
            typeof response.data === 'object' &&
            'task_id' in response.data
        ) {
            // 断言 response.data 为具有 task_id 属性的对象
            const taskId = (response.data as { task_id: string }).task_id;
            checkTaskInterval = setInterval(() => {
                checkTaskStatus(taskId);
            }, 5000); // 每5秒检查一次
        }

    } catch (error: any) {
        $toast.error(error.message || 'MuseSteamer AI Video generation failed, please try again.');
        stopProgressAnimation();
        stopCheckTask();
    }
};

// 检查任务状态
const checkTaskStatus = async (taskId: string) => {
    try {
        const response = await checkTask(taskId) as any;
        if (response.code === 200) {
            const taskData = response.data;
            if (taskData.status == 1 && taskData.url) {
                // 任务成功
                if (generatedVideoUrl.value) {
                    URL.revokeObjectURL(generatedVideoUrl.value);
                }
                generatedVideoUrl.value = taskData.url;
                progress.value = 100;
                stopProgressAnimation();
                stopCheckTask();
                // videoTaskStore.clearTask();
                $toast.success('MuseSteamer AI Video generated successfully!');

            } else if (taskData.status < 0) { // 通常-1表示失败
                // 任务失败
                throw new Error(taskData.status_msg || 'MuseSteamer AI Video generation failed');
            }
            // 如果状态是进行中，则不执行任何操作，等待下一次轮询
        } else {
            throw new Error(response.msg || 'Failed to check task status');
        }
    } catch (error: any) {
        $toast.error(error.message);
        stopProgressAnimation();
        stopCheckTask();
        videoTaskStore.clearTask();
    }
};


// 动画和轮询控制
const startProgressAnimation = (startFrom = 0) => {
    progress.value = startFrom;
    // 模拟一个比较慢的、非线性的进度增长
    const animate = () => {
        if (progress.value < 99) {
            const increment = Math.random() * (99 - progress.value) * 0.05;
            progress.value = Math.min(99, progress.value + increment);
            setTimeout(animate, 500 + Math.random() * 1000);
        }
    };
    animate();
};

const stopProgressAnimation = () => {
    // 因为是setTimeout驱动，没有需要显式停止的循环
    // 任务结束时直接将进度设置为100
    if (progress.value < 100) {
       progress.value = 100;
       setTimeout(() => {
           if (!generatedVideoUrl.value) progress.value = 0; // 如果是失败，则重置
       }, 500);
    }
};

const stopCheckTask = () => {
    isGenerating.value = false;
    if (checkTaskInterval) {
        clearInterval(checkTaskInterval);
        checkTaskInterval = null;
    }
};


const downloadVideo = async () => {
    if (generatedVideoUrl.value) {
        isDownloading.value = true;
        try {
            const response = await fetch(generatedVideoUrl.value);
            if (!response.ok) throw new Error('Network response was not ok.');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `musesteamer-ai-video-${Date.now()}.mp4`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download error:', error);
            $toast.error('Download failed. Please try again later.');
        } finally {
            isDownloading.value = false;
        }
    }
};

const handleClickOutside = (event: MouseEvent) => {
    if (modelDropdown.value && !modelDropdown.value.contains(event.target as Node)) {
        isModelDropdownOpen.value = false;
    }
};


onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
    stopCheckTask(); // 确保组件卸载时停止轮询
});

onMounted(() => {
    // 延迟设置 pageLoaded 为 true，以确保页面渲染完成
    setTimeout(() => {
        pageLoaded.value = true;
    }, 200);

});
</script>

<style scoped>
/* 重置范围输入样式 */
input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    background: linear-gradient(to right, #4f46e5 0%, #4f46e5 var(--range-progress), #e5e7eb var(--range-progress), #e5e7eb 100%);
    border-radius: 8px;
    height: 8px;
    outline: none;
    transition: all 0.3s ease;
}

.dark input[type="range"] {
    background: linear-gradient(to right, #6366f1 0%, #6366f1 var(--range-progress), #4b5563 var(--range-progress), #4b5563 100%);
}

input[type="range"]:hover {
    background: linear-gradient(to right, #6366f1 0%, #6366f1 var(--range-progress), #d1d5db var(--range-progress), #d1d5db 100%);
}

.dark input[type="range"]:hover {
    background: linear-gradient(to right, #818cf8 0%, #818cf8 var(--range-progress), #6b7280 var(--range-progress), #6b7280 100%);
}

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #818cf8);
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
    transition: all 0.3s ease;
    border: 2px solid white;
}

.dark input[type="range"]::-webkit-slider-thumb {
    border-color: #1f2937;
}

input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.6);
}

input[type="range"]::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #818cf8);
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
    transition: all 0.3s ease;
}

.dark input[type="range"]::-moz-range-thumb {
    border-color: #1f2937;
}

input[type="range"]::-moz-range-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.6);
}
</style>
