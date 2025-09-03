<template>
  <div class="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto lg:items-stretch" :class="{ 'relative': isFullscreen }">
    <!-- 左侧：主配置区域 -->
    <div class="w-full lg:w-3/5 bg-[#111827] rounded-2xl shadow-2xl border border-[#1F2937] p-8 flex flex-col gap-6">
      
      <!-- 脚本输入区域 -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <label for="script" class="block text-lg font-semibold text-gray-200">
            <span>Podcast Script</span>
          </label>
          <button 
            @click="toggleFullscreen"
            class="p-2 text-gray-400 hover:text-[#00ffd1] transition-colors"
            title="Toggle Fullscreen"
          >
            <svg v-if="!isFullscreen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5M15 9v-4.5M15 9h4.5M15 9l5.5-5.5M9 15v4.5M9 15H4.5M9 15l-5.5 5.5M15 15v4.5M15 15h4.5m0 0l5.5 5.5" />
            </svg>
          </button>
        </div>
        <textarea
          v-model="script"
          id="script"
          :class="[
            'w-full rounded-xl bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 text-gray-200 px-4 py-3 focus:ring-2 focus:ring-[#00ffd1] focus:border-transparent transition placeholder-gray-500 text-base resize-none',
            isFullscreen ? 'h-[80vh]' : 'h-48'
          ]"
          :placeholder="placeholderText"
          @focus="withLoginCheck()"
        ></textarea>
      </div>

      <!-- 扬声器配置 -->
      <div>
        <label class="block text-lg font-semibold text-gray-200 mb-4">Speaker Configuration</label>
        <div class="space-y-4">
          <div v-for="(speaker, index) in speakers" :key="index" class="flex items-center gap-3">
            <!-- Speaker 名称和复制按钮 -->
            <div class="flex items-center gap-2 min-w-0 flex-shrink-0">
              <input 
                :value="`Speaker ${index}`"
                readonly
                class="w-24 px-3 py-2 bg-gray-700/50 border border-gray-600 text-gray-300 rounded-lg text-sm font-semibold cursor-default text-center"
              />
              <button 
                @click="copySpeakerName(index)"
                class="p-2 text-gray-400 hover:text-[#00ffd1] transition-colors relative flex-shrink-0"
                title="Copy Speaker Name"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <!-- 复制成功提示 -->
                <div 
                  v-if="copySuccessStates[index]"
                  class="absolute -top-8 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md shadow-lg whitespace-nowrap z-10 animate-pulse"
                >
                  Copy Success
                </div>
              </button>
            </div>
            
            <!-- 语音选择下拉框 -->
            <select 
              v-model="speaker.voice" 
              class="flex-1 min-w-0 max-w-64 px-4 py-3 bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 text-gray-200 rounded-xl focus:ring-2 focus:ring-[#00ffd1] focus:border-transparent transition placeholder-gray-500"
            >
              <option v-for="voice in voiceOptions" :key="voice" :value="voice">{{ voice }}</option>
            </select>
            
            <!-- 删除按钮 -->
            <button 
              v-if="speakers.length > 1"
              @click="removeSpeaker(index)"
              class="p-2 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
              title="Remove Speaker"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        <button
          v-if="speakers.length < maxSpeakers"
          @click="addSpeaker"
          class="mt-4 w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm py-2 px-4 rounded-lg transition-colors duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20"
        >
          + Add Speaker ({{ speakers.length }}/{{ maxSpeakers }})
        </button>
        
        <!-- 升级提示 -->
        <!-- <div v-if="userLevel === 'basic' && speakers.length >= 2" class="mt-4 p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div class="text-sm">
              <p class="text-yellow-200 font-medium">Upgrade to Premium</p>
              <p class="text-yellow-300/80">Create up to 4 speakers for more dynamic conversations</p>
            </div>
          </div>
        </div> -->
      </div>

      <!-- 操作按钮 -->
      <div class="flex gap-4">
        <button 
          @click="randomPrompt" 
          class="flex-1 flex items-center justify-center gap-2 px-6 py-4 border border-gray-600 rounded-lg text-gray-300 bg-gray-700/50 hover:bg-gray-600 hover:text-white transition-colors duration-300 font-semibold text-lg"
        >
        🎲 Random Prompt
        </button>
        <button 
          @click="handleGenerateClick" 
          :disabled="loading || !script.trim()" 
          class="flex-1 relative flex items-center justify-center gap-2 px-6 py-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-lg rounded-lg transition-colors duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span v-if="loading">Generating...</span>
          <span v-else>Generate Podcast</span>
        </button>
      </div>
      

    </div>

    <!-- 右侧：预览区域 -->
    <div class="w-full lg:w-2/5 flex-shrink-0 relative flex flex-col">
      <!-- 示例展示 -->
      <div v-if="!generatedAudio" class="bg-[#111827] rounded-2xl border border-[#1F2937] shadow-2xl shadow-black/50 overflow-hidden flex-1 flex flex-col">
        <div class="p-6 border-b border-[#1F2937]">
          <h3 class="text-xl font-bold text-white mb-2">VibeVoice Case Study: An Emotional Conversation</h3>
          <audio 
            ref="audioPlayerRef" 
            id="showcase-audio" 
            controls 
            class="w-full mt-4" 
            @play="handlePlay"
          >
            <source src="https://resp.vibevoices.net/vvoice/mp3/Spontaneous-Singing.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
          </audio>
        </div>
        <div id="transcript-container" class="transcript-container max-h-[400px] overflow-y-auto">
          <div
            v-for="(item, index) in transcriptData"
            :key="index"
            :ref="el => { if (el) transcriptLineRefs[index] = el }"
            class="transcript-line p-4 border-b border-[#1F2937] cursor-pointer hover:bg-[#1F2937]/50"
            :class="{ 'active': activeIndex === index }"
            @click="seekAudio(item.start)"
          >
            <p class="font-bold" :class="item.speaker === 'Speaker 1' ? 'text-[#A78BFA]' : 'text-[#60A5FA]'">{{ item.speaker }}</p>
            <p class="text-[#D1D5DB] mt-1">{{ item.text }}</p>
          </div>
        </div>
      </div>

      <!-- 生成结果展示 -->
      <div v-if="generatedAudio" class="bg-[#111827] rounded-2xl border border-[#1F2937] shadow-2xl shadow-black/50 overflow-hidden flex-1 flex flex-col">
        <div class="p-6 border-b border-[#1F2937]">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-xl font-bold text-white">Generated Podcast</h3>
            <button 
              @click="resetPreview"
              class="p-2 text-gray-400 hover:text-[#00ffd1] transition-colors"
              title="Back to Example"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
          </div>
          <audio 
            ref="generatedAudioRef" 
            id="generated-audio" 
            controls 
            class="w-full mt-4" 
            @play="handlePlay"
          >
            <source :src="generatedAudio" type="audio/mpeg">
            Your browser does not support the audio element.
          </audio>
        </div>
        <div class="p-6">
          <button 
            @click="downloadGeneratedAudio"
            class="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-lg py-3 px-6 rounded-lg transition-colors duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Audio
          </button>
        </div>
      </div>

      <!-- 加载遮罩层 -->
      <div v-if="loading" class="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
        <div class="bg-[#111827] rounded-xl border border-[#1F2937] p-8 max-w-sm mx-4">
          <div class="flex items-center justify-center mb-4">
            <svg class="animate-spin h-8 w-8 text-[#2563EB]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <div class="text-center">
            <h4 class="text-lg font-semibold text-white mb-2">Generating Podcast</h4>
            <p class="text-sm text-gray-300">{{ taskStatus || 'Processing...' }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 全屏文本编辑遮罩层 -->
    <div v-if="isFullscreen" class="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="w-full max-w-6xl bg-[#111827] rounded-2xl border border-[#1F2937] shadow-2xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-white">Podcast Script Editor</h3>
          <button 
            @click="toggleFullscreen"
            class="p-2 text-gray-400 hover:text-[#00ffd1] transition-colors"
            title="Exit Fullscreen"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <textarea
          v-model="script"
          id="fullscreen-script"
          class="w-full h-[calc(100vh-200px)] rounded-xl bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 text-gray-200 px-4 py-3 focus:ring-2 focus:ring-[#00ffd1] focus:border-transparent transition placeholder-gray-500 text-base resize-none"
          :placeholder="placeholderText"
          @focus="withLoginCheck()"
        ></textarea>
        <div class="flex justify-end mt-4 space-x-4">
          <button 
            @click="randomPrompt" 
            class="px-6 py-3 border border-gray-600 rounded-lg text-gray-300 bg-gray-700/50 hover:bg-gray-600 hover:text-white transition-colors duration-300 font-semibold"
          >
            Random Prompt
          </button>
          <button 
            @click="toggleFullscreen"
            class="px-6 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-lg transition-colors duration-300"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useNuxtApp } from 'nuxt/app';
import { createTaskVibeVoice, checkTask } from '~/api';
import { useUserStore } from '~/stores/user';
import { useUiStore } from '~/stores/ui';
import { useRouter } from 'vue-router';
import { useClerkAuth } from '~/utils/authHelper';

const { $toast } = useNuxtApp() as any;

// 引入stores和工具
const userStore = useUserStore();
const uiStore = useUiStore();
const router = useRouter();
const { isSignedIn } = useClerkAuth();

// 获取用户信息
const userInfo = computed(() => userStore.userInfo);

const voiceOptions = [
  'Alice [EN]',
  'Alice [EN] (Background Music)',
  'Carter [EN]',
  'Frank [EN]',
  'Maya [EN]',
  'Anchen [ZH] (Background Music)',
  'Bowen [ZH]',
  'Xinran [ZH]',
];

// 随机选择语音的函数
const getRandomVoice = () => {
  return voiceOptions[Math.floor(Math.random() * voiceOptions.length)];
};

const speakers = ref([
  { voice: getRandomVoice() },
]);

const addSpeaker = () => {
  if (speakers.value.length < maxSpeakers.value) {
    speakers.value.push({ voice: getRandomVoice() });
  } else {
    $toast.error(`Maximum ${maxSpeakers.value} speakers allowed for your current plan`);
  }
};

const removeSpeaker = (index: number) => {
  if (speakers.value.length > 1) {
    speakers.value.splice(index, 1);
  }
};

// 复制成功状态管理
const copySuccessStates = ref<Record<number, boolean>>({});

const copySpeakerName = (index: number) => {
  const speakerName = `Speaker ${index}:`;
  navigator.clipboard.writeText(speakerName).then(() => {
    // 显示复制成功提示
    showCopySuccess(index);
  }).catch(err => {
    console.error('Copy failed:', err);
  });
};

const showCopySuccess = (index: number) => {
  copySuccessStates.value[index] = true;
  // 2秒后隐藏提示
  setTimeout(() => {
    copySuccessStates.value[index] = false;
  }, 2000);
};

// 从脚本中提取 Speaker 顺序并构建 speakers 数组
const getSpeakersFromScript = (script: string) => {
  // 使用正则表达式匹配所有 "Speaker X:" 格式
  const speakerMatches = script.match(/Speaker\s+(\d+):/g);
  
  if (!speakerMatches) {
    // 如果没有找到 Speaker 格式，使用当前配置的 speakers
    return speakers.value.map(speaker => ({
      preset: speaker.voice || voiceOptions[0]
    }));
  }
  
  // 提取唯一的 Speaker 编号并排序
  const speakerNumbers = [...new Set(
    speakerMatches.map(match => {
      const numberMatch = match.match(/Speaker\s+(\d+):/);
      return numberMatch ? parseInt(numberMatch[1]) : 0;
    })
  )].sort((a, b) => a - b);
  
  // 根据 Speaker 编号构建 speakers 数组
  return speakerNumbers.map(speakerNum => {
    // 如果配置中有对应的 Speaker，使用配置的语音
    // 否则使用默认语音
    const configuredVoice = speakers.value[speakerNum]?.voice;
    return {
      preset: configuredVoice || voiceOptions[0]
    };
  });
};

const script = ref('');
const loading = ref(false);
const generatedAudio = ref('');
const taskProgress = ref(0);
const taskStatus = ref('');
const isFullscreen = ref(false);

// 用户等级和最大说话人数限制
const userLevel = ref('basic'); // 可以从用户状态或API获取
const maxSpeakers = computed(() => {
  // return userLevel.value === 'premium' ? 4 : 2;
  return 4;
});

// 获取用户等级
const getUserLevel = async () => {
  try {
    // 这里可以从用户状态、localStorage 或 API 获取用户等级
    // 示例：从 localStorage 获取
    const storedLevel = localStorage.getItem('userLevel');
    if (storedLevel) {
      userLevel.value = storedLevel;
    }
    
    // 或者从 API 获取用户信息
    // const userInfo = await getCurrentUser();
    // userLevel.value = userInfo.data.level || 'basic';
  } catch (error) {
    console.error('获取用户等级失败:', error);
    userLevel.value = 'basic'; // 默认为基础用户
  }
};

// 预览区域相关变量
const audioPlayerRef = ref(null);
const generatedAudioRef = ref(null);
const activeIndex = ref(-1);
const transcriptLineRefs = ref([]);

const transcriptData = [
    {
        "start": 0.0,
        "speaker": "Speaker 1",
        "text": "Hey, remember \"See You Again\"?"
    },
    {
        "start": 1.2000000000000002,
        "speaker": "Speaker 2",
        "text": "Yeah… from Furious 7, right? That song always hits deep."
    },
    {
        "start": 5.41,
        "speaker": "Speaker 1",
        "text": "Let me try to sing a part of it for you. \"It's been a long day… without you, my friend. And I'll tell you all about it when I see you again…\""
    },
    {
        "start": 16.09,
        "speaker": "Speaker 2",
        "text": "Wow… that line. Every time."
    },
    {
        "start": 19.03,
        "speaker": "Speaker 1",
        "text": "Yeah, and then this part always makes me think of the people I've lost. \"We've come a long way… from where we began. Oh, I'll tell you all about it when I see you again…\""
    },
    {
        "start": 30.979999999999997,
        "speaker": "Speaker 2",
        "text": "It's beautiful, really. It's not just sad—it's like… hopeful."
    },
    {
        "start": 35.64,
        "speaker": "Speaker 1",
        "text": "Right? Like no matter how far apart we are, there's still that promise."
    },
    {
        "start": 39.68000000000001,
        "speaker": "Speaker 2",
        "text": "I think that's what made it the perfect farewell for Paul Walker."
    },
    {
        "start": 43.25,
        "speaker": "Speaker 1",
        "text": "Yeah. And the rap verse? It hits differently too. \"How can we not talk about family, when family's all that we got?\""
    },
    {
        "start": 53.79,
        "speaker": "Speaker 2",
        "text": "That line's deep. Makes you realize what really matters."
    },
    {
        "start": 57.92,
        "speaker": "Speaker 1",
        "text": "Exactly. It's more than a song—it's a tribute."
    }
];

const placeholderText = `Enter your podcast script here. You can format it as:

Speaker 0: Welcome to our podcast today!
Speaker 1: Thanks for having me. I'm excited to discuss...`;

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
  
  // 全屏时禁用页面滚动
  if (isFullscreen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

// 键盘快捷键支持
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isFullscreen.value) {
    toggleFullscreen();
  }
};

// 预览区域相关函数
const seekAudio = (startTime: number) => {
  if (audioPlayerRef.value) {
    (audioPlayerRef.value as HTMLAudioElement).currentTime = startTime;
    (audioPlayerRef.value as HTMLAudioElement).play();
  }
};

const handlePlay = (event: Event) => {
  const allAudioPlayers = document.querySelectorAll('audio');
  allAudioPlayers.forEach(player => {
    if (player !== event.target) {
      (player as HTMLAudioElement).pause();
    }
  });
};

const downloadGeneratedAudio = async () => {
  if (generatedAudio.value) {
    await downloadAudioFile(generatedAudio.value);
  }
};

const resetPreview = () => {
  generatedAudio.value = '';
};

// 统一的登录检查方法 - 参考MuseSteamer Hero组件
const withLoginCheck = async (callback?: () => void | Promise<void>) => {
  const isLoggedIn = await checkLoginStatus();
  if (isLoggedIn && callback) {
    await callback();
  }
};

// 检查登录状态 - 参考MuseSteamer Hero组件
const checkLoginStatus = async () => {
  if (!userInfo.value) {
    uiStore.showLoginPrompt(); // 调用全局登录弹窗
    // $toast.info('Please login to generate your podcast.');
    return false;
  }
  return true;
};

// 检查用户积分状态 - 参考MuseSteamer Hero组件
const checkUsageLimit = () => {
  const remainingCredits = (userInfo.value?.free_limit ?? 0) + (userInfo.value?.remaining_limit ?? 0);
  // VibeVoice生成消耗的积分（可以根据实际情况调整）
  const requiredCredits = 1; // 假设生成一次消耗1积分
  if (remainingCredits <= requiredCredits) {
    // $toast.info(`Not enough credits. This action requires ${requiredCredits} credits.`);
    $toast.info(`Please upgrade to premium for more credits.`);
    router.push('#pricing');
    return false;
  }
  return true;
};

// 验证脚本输入 - 参考MuseSteamer Hero组件的输入验证
const validateScriptInput = () => {
  if (!script.value.trim()) {
    $toast.error('Please enter a podcast script.');
    return false;
  }
  
  // 检查脚本长度
  if (script.value.trim().length < 10) {
    $toast.error('Script is too short. Please enter at least 10 characters.');
    return false;
  }
  
  // 检查是否包含Speaker格式
  const speakerMatches = script.value.match(/Speaker\s+\d+:/g);
  if (!speakerMatches || speakerMatches.length < 2) {
    $toast.error('Please include at least 2 speakers in your script (e.g., "Speaker 0:", "Speaker 1:").');
    return false;
  }
  
  return true;
};

// 验证扬声器配置
const validateSpeakerConfiguration = () => {
  if (speakers.value.length < 1) {
    $toast.error('Please configure at least one speaker.');
    return false;
  }
  
  // 检查每个扬声器是否都选择了语音
  for (let i = 0; i < speakers.value.length; i++) {
    if (!speakers.value[i].voice) {
      $toast.error(`Please select a voice for Speaker ${i}.`);
      return false;
    }
  }
  
  return true;
};

const randomPrompt = () => {
  // 设置对话人数为 2 人
  if (speakers.value.length !== 2) {
    speakers.value = [
      { voice: getRandomVoice() },
      { voice: getRandomVoice() }
    ];
  }
  
  const randomScripts = [
    `Speaker 0: Welcome to our podcast today!
Speaker 1: Thanks for having me. I'm excited to discuss this topic with you.

Speaker 0: Let's start with the basics. Can you tell us about your background?
Speaker 1: Absolutely! I've been working in this field for over 10 years now.`,

    `Speaker 0: Good morning everyone! Today we're diving into an interesting topic.
Speaker 1: Hi there! I'm thrilled to be here and share my thoughts on this subject.

Speaker 0: What do you think is the most important aspect to consider?
Speaker 1: That's a great question. I believe the key is understanding the fundamentals first.`,

    `Speaker 0: Hello and welcome to our show! I'm your host today.
Speaker 1: Thank you for having me! I'm really looking forward to our conversation.

Speaker 0: Let's begin with your perspective on recent developments.
Speaker 1: Well, I think we're seeing some fascinating changes in the industry right now.`
  ];
  
  const randomScript = randomScripts[Math.floor(Math.random() * randomScripts.length)];
  script.value = randomScript;
};

// 点击生成按钮的入口函数 - 参考MuseSteamer Hero组件
const handleGenerateClick = () => {
  withLoginCheck(() => {
    // 1. 验证脚本输入
    if (!validateScriptInput()) {
      return;
    }
    
    // 2. 验证扬声器配置
    if (!validateSpeakerConfiguration()) {
      return;
    }
    
    // 3. 检查积分
    if (!checkUsageLimit()) {
      return;
    }
    
    // 4. 开始生成
    generatePodcast();
  });
};

const generatePodcast = async () => {
  loading.value = true;
  taskStatus.value = 'Creating task...';
  
  console.log('开始生成播客，loading:', loading.value, 'taskStatus:', taskStatus.value);
  
  try {
    // 准备请求数据
    const requestData = {
      script: script.value.trim(),
      speakers: getSpeakersFromScript(script.value.trim()),
      cfg_scale: 1.3
    };
    
    console.log(requestData);
    
    // 调用创建任务API
    const createResponse = await createTaskVibeVoice(requestData);
    
    if (createResponse.code !== 200 || !createResponse.success) {
      throw new Error(createResponse.msg || 'Failed to create task');
    }
    
    const taskId = createResponse.data.task_id;
    taskStatus.value = 'Task created, generating podcast...';
    
    // 刷新用户信息（积分）
    await userStore.fetchUserInfo(true);
    
    // 开始轮询检查任务状态
    await pollTaskStatus(taskId);
    
  } catch (error: any) {
    $toast.error('Failed to generate podcast: ' + (error.message || error));
    console.error('生成播客失败:', error);
    loading.value = false;
  }
};

// 轮询任务状态
const pollTaskStatus = async (taskId: string) => {
  const maxAttempts = 60; // 最多轮询5分钟（60次 * 5秒）
  let attempts = 0;
  
  const poll = async (): Promise<void> => {
    try {
      attempts++;
      
      // 更新状态
      taskStatus.value = `Checking task status... (${attempts}/${maxAttempts})`;
      
      console.log('轮询状态更新:', { attempts, maxAttempts, status: taskStatus.value });
      
      const response = await checkTask(taskId);
      
      if (response.code !== 200 || !response.success) {
        throw new Error(response.msg || 'Failed to check task status');
      }
      
      const { status, status_msg, url } = response.data;
      console.log('轮询状态更新:', { status, status_msg, url });
      if (status === 1 && url) {
        // 任务完成
        taskStatus.value = 'Task completed!';
        $toast.success('Podcast generated successfully!');
        generatedAudio.value = url;
        
                // 轮询完成后设置 loading 为 false
        loading.value = false;
        return;
      } else if (status === 0) {
        // 任务进行中，继续轮询
        if (attempts >= maxAttempts) {
          throw new Error('Task timeout, please try again');
        }
        
        taskStatus.value = `Generating podcast... (${attempts}/${maxAttempts})`;
        setTimeout(poll, 5000); // 5秒后再次检查
      } else {
        // 任务失败
        throw new Error(status_msg || 'Task failed');
      }
      
    } catch (error: any) {
      if (attempts >= maxAttempts) {
        taskStatus.value = 'Task timeout';
        $toast.error('Task timeout, please try again');
        throw error;
      }
      
      // 如果是网络错误，继续重试
      taskStatus.value = `Retrying... (${attempts}/${maxAttempts})`;
      setTimeout(poll, 5000);
    }
  };
  
  await poll();
};

// 下载音频文件到本地
const downloadAudioFile = async (url: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    
    // 创建下载链接
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `vibevoice-podcast-${Date.now()}.mp3`;
    
    // 触发下载
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 清理URL
    window.URL.revokeObjectURL(downloadUrl);
    
    $toast.success('Audio file downloaded successfully!');
  } catch (error) {
    console.error('Download failed:', error);
    $toast.error('Download failed, but audio is ready to play');
  }
};

// 预览区域音频同步
onMounted(async () => {
  // 获取用户等级
  await getUserLevel();
  
  if (audioPlayerRef.value) {
    const audio = audioPlayerRef.value as HTMLAudioElement;
    audio.addEventListener('timeupdate', () => {
      let newActiveIndex = -1;
      for (let i = transcriptData.length - 1; i >= 0; i--) {
        if (audio.currentTime >= transcriptData[i].start) {
          newActiveIndex = i;
          break;
        }
      }
      activeIndex.value = newActiveIndex;
    });
  }
  
  // 添加键盘事件监听器
  document.addEventListener('keydown', handleKeydown);
});

// 组件卸载时清理事件监听器
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = ''; // 确保页面滚动恢复正常
});

watch(activeIndex, (newIndex) => {
  if (newIndex > -1 && transcriptLineRefs.value[newIndex]) {
    (transcriptLineRefs.value[newIndex] as HTMLElement).scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }
});
</script>

<style scoped>
/* Custom styles for better UX */
select option {
  background-color: #0B0B12;
  color: white;
}

textarea::placeholder {
  color: #6B7280;
}

/* 预览区域样式 */
.transcript-line { 
  transition: background-color 0.3s ease; 
}

.transcript-line.active {
  background-color: rgba(37, 99, 235, 0.15); /* Primary-Soft */
  border-left: 2px solid #2563EB; /* Primary */
}

/* 自定义滚动条 */
.transcript-container::-webkit-scrollbar { 
  width: 6px; 
}

.transcript-container::-webkit-scrollbar-track { 
  background: #111827; 
}

.transcript-container::-webkit-scrollbar-thumb { 
  background-color: #1F2937; 
  border-radius: 10px; 
}
</style>

