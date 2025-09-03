<template>
  <section class="min-h-screen bg-[#0B0B12] text-white relative overflow-hidden pt-48">
    <div class="aurora-background"></div>
    <div class="container mx-auto px-6 relative z-10">
      <!-- 用户信息卡片 -->
      <div class="max-w-7xl mx-auto bg-[#111827] p-8 rounded-2xl shadow-2xl border border-[#1F2937] mb-8">
      <!-- 基本信息 -->
      <div class="flex items-center space-x-6">
        <div class="relative">
          <img :src="userInfo.avatar||'/img/default-avatar.png'" alt="avatar" class="w-24 h-24 rounded-full border-4 border-[#2563EB] shadow-md">
          <div v-if="userInfo.vip_last_time > 0" class="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white rounded-full p-1 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
        <div class="flex-1">
          <div class="flex items-center space-x-3">
            <h2 class="text-2xl font-bold text-white">{{ userInfo.nickname }}</h2>
            <span v-if="userInfo.vip_last_time > 0" class="px-2 py-1 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white text-sm rounded-full shadow-md">VIP Member</span>
          </div>
          <p class="text-[#D1D5DB] mt-1">{{ userInfo.email }}</p>
          <p class="text-[#D1D5DB] text-sm mt-1">Registered: {{ formatDate(userInfo.created_at) }}</p>
          <p class="text-[#D1D5DB] text-sm">Login Method: {{ userInfo.from_login === 'google' ? 'Google' : 'Other' }}</p>
        </div>
      </div>
      
      <!-- 使用次数信息 -->
      <div class="mt-8">
        <div class="bg-gradient-to-r from-[#1F2937] to-[#374151] p-6 rounded-xl border border-[#374151] shadow-lg">
          <div class="flex items-center gap-4">
            <div class="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] p-3 rounded-full shadow-lg">
              <SparklesIcon class="h-8 w-8 text-white" />
            </div>
            <div>
              <p class="text-[#D1D5DB] text-sm font-medium">Remaining Credits</p>
              <p class="text-3xl font-bold bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] bg-clip-text text-transparent mt-1">{{ userInfo.free_limit + userInfo.remaining_limit }}</p>
            </div>
            <!-- 添加查看记录按钮 -->
            <button 
              @click="openCreditRecords"
              class="ml-auto px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] rounded-lg text-white transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
              </svg>
              View History
            </button>
          </div>
        </div>
      </div>

      <!-- VIP信息 -->
      <div v-if="userInfo.vip_last_time > 0" class="mt-6 bg-gradient-to-r from-[#1F2937] to-[#374151] p-4 rounded-lg border border-[#2563EB] shadow-lg">
        <div class="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#2563EB]" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <p class="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] bg-clip-text text-transparent font-medium">VIP Membership Valid Until: {{ formatDate(userInfo.vip_last_time) }}</p>
        </div>
      </div>
    </div>

    <!-- 积分记录弹框 -->
    <div v-if="showCreditRecords" 
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      @click="closeCreditRecords"
    >
      <div class="relative w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] max-w-3xl bg-[#111827] backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-[#1F2937]" 
        @click.stop
      >
        <!-- 弹框头部 -->
        <div class="flex items-center justify-between p-6 border-b border-[#1F2937]">
          <h3 class="text-xl font-bold text-white">Credit History</h3>
          <button 
            @click="closeCreditRecords"
            class="text-[#D1D5DB] hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 弹框内容 -->
        <div class="p-6 overflow-y-auto max-h-[70vh] custom-scrollbar" @wheel.stop @touchmove.stop>
          <!-- 积分记录列表 -->
          <div class="space-y-4">
            <div v-for="record in creditRecords" :key="record.id" 
              class="flex items-center justify-between p-4 bg-[#1F2937] backdrop-blur-sm rounded-xl hover:bg-[#374151] transition-all duration-300 border border-[#374151]">
              <div class="flex items-center space-x-4">
                <!-- 图标 -->
                <div class="p-3 rounded-xl" :class="{
                  'bg-green-900 text-green-400': record.change_type === 'register_give',
                  'bg-gradient-to-r from-[#1F2937] to-[#374151] text-[#2563EB]': record.change_type === 'buy_package',
                  'bg-yellow-900 text-yellow-400': record.change_type === 'create_task_free',
                  'bg-red-900 text-red-400': record.change_type === 'create_task'
                }">
                  <component :is="getCreditTypeIcon(record.change_type)" class="h-6 w-6" />
                </div>
                
                <!-- 记录信息 -->
                <div>
                  <p class="text-white font-medium">{{ getCreditTypeText(record.change_type) }}</p>
                  <p class="text-[#D1D5DB] text-sm">{{ formatDate(record.created_at) }}</p>
                </div>
              </div>
              
              <!-- 积分变化 -->
              <div class="text-right">
                <p class="text-lg font-semibold" :class="{
                  'text-green-400': record.use_limit > 0,
                  'text-red-400': record.use_limit < 0
                }">
                  {{ record.use_limit > 0 ? '+' : '' }}{{ record.use_limit }}
                </p>
              </div>
            </div>
          </div>

          <!-- 加载状态 -->
          <div v-if="creditLoading" class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#374151] border-t-[#2563EB]"></div>
          </div>

          <!-- 空状态 -->
          <div v-if="!creditLoading && creditRecords.length === 0" class="text-center py-12">
            <div class="inline-block p-4 rounded-full bg-[#1F2937] mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#D1D5DB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
              </svg>
            </div>
            <p class="text-[#D1D5DB]">No credit history yet</p>
          </div>

          <!-- 分页控件 -->
          <div v-if="!creditLoading && creditRecords.length > 0" class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <!-- 每页显示数量选择器 -->
            <div class="flex items-center gap-2">
              <span class="text-[#D1D5DB] text-sm">Show</span>
              <select 
                v-model="creditPageSize"
                @change="handlePageSizeChange(Number(creditPageSize))"
                class="bg-[#1F2937] text-[#D1D5DB] rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] border border-[#374151]"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <span class="text-[#D1D5DB] text-sm">entries</span>
            </div>

            <!-- 分页按钮 -->
            <div class="flex items-center gap-2">
              <button 
                @click="handlePageChange(creditPage - 1)"
                :disabled="creditPage === 1"
                class="px-3 py-1.5 rounded-lg text-sm transition-colors border"
                                  :class="[
                    creditPage === 1 
                      ? 'bg-[#374151] text-[#9CA3AF] cursor-not-allowed border-[#4B5563]' 
                      : 'bg-[#1F2937] text-[#D1D5DB] hover:bg-[#374151] border-[#374151]'
                  ]"
              >
                Previous
              </button>
              
              <div class="flex items-center gap-1">
                <button 
                  v-for="page in totalPages" 
                  :key="page"
                  @click="handlePageChange(page)"
                  class="w-8 h-8 rounded-lg text-sm transition-colors border"
                  :class="[
                    page === creditPage 
                      ? 'bg-gradient-to-r from-[#6209F6] to-[#2574E9] text-white border-transparent' 
                      : 'bg-gray-700 text-gray-200 hover:bg-gray-600 border-gray-600'
                  ]"
                >
                  {{ page }}
                </button>
              </div>

              <button 
                @click="handlePageChange(creditPage + 1)"
                :disabled="creditPage === totalPages"
                class="px-3 py-1.5 rounded-lg text-sm transition-colors border"
                :class="[
                  creditPage === totalPages 
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed border-gray-500' 
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600 border-gray-600'
                ]"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 作品列表 -->
    <div id="works-section" class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-white">My Audio Works</h3>
        <button 
          @click="handleRefresh"
          class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-white"
          :disabled="loading"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{'animate-spin': loading}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M23 4v6h-6M1 20v-6h6"/>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
          </svg>
          <span>{{ loading ? 'Refreshing...' : 'Refresh' }}</span>
        </button>
      </div>

      <!-- 标签选项卡 -->
      <div class="flex space-x-4 mb-6">
        <button 
          v-for="tab in tabs" 
          :key="tab.value"
          @click="handleTabChange(tab.value)"
          class="px-6 py-2 rounded-full transition-all border"
          :class="[
            currentTab === tab.value 
              ? 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white shadow-lg font-medium border-transparent' 
              : 'bg-[#1F2937] text-[#D1D5DB] hover:bg-[#374151] border-[#374151]'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>
      
      <!-- 音频网格布局 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" v-if="works.length > 0">
        <div v-for="work in works" :key="work.task_id" class="bg-[#111827] rounded-xl border border-[#1F2937] p-6 hover:border-[#2563EB] transition-all duration-300">
          <!-- 音频图标和标题 -->
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] rounded-lg flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="text-lg font-semibold text-white truncate">{{ work.task_id }}</h4>
              <div class="flex items-center gap-2 mt-1">
                <span v-if="work.status === 1" class="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                  Completed
                </span>
                <span v-else class="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full border border-yellow-500/30">
                  Processing
                </span>
              </div>
            </div>
          </div>
          
          <!-- 音频播放器 -->
          <div v-if="work.status === 1 && work.quality_image" class="mb-4">
            <audio 
              :src="work.quality_image" 
              controls 
              class="w-full h-10 rounded-lg"
              preload="metadata"
            >
              Your browser does not support the audio element.
            </audio>
          </div>
          
          <!-- 提示词 -->
          <div v-if="work.prompt" class="text-[#D1D5DB] text-sm mb-4 line-clamp-3">
            <span class="font-medium" v-html="work.prompt.replace(/\n/g, '<br>')"></span> 
          </div>
          
          <!-- 创建时间和操作按钮 -->
          <div class="flex items-center justify-between">
            <p class="text-[#9CA3AF] text-xs">{{ formatDate(work.created_at) }}</p>
            
            <div class="flex items-center gap-2">
              <button 
                v-if="work.prompt"
                @click="copyPrompt(work.prompt)"
                class="p-2 text-[#D1D5DB] hover:text-white transition-colors rounded-lg hover:bg-[#1F2937]"
                title="Copy prompt"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
              
              <button 
                v-if="work.status === 1 && work.quality_image"
                @click="handleDownload(work.quality_image)"
                class="p-2 text-[#D1D5DB] hover:text-white transition-colors rounded-lg hover:bg-[#1F2937]"
                :disabled="isDownloading"
                title="Download audio"
              >
                <svg v-if="!isDownloading" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <div v-else class="w-4 h-4 border-2 border-[#D1D5DB] border-t-transparent rounded-full animate-spin"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else-if="!loading && works.length === 0" class="text-center py-12">
        <div class="inline-block p-4 rounded-full bg-[#1F2937] mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-[#D1D5DB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        </div>
        <p class="text-[#D1D5DB]">No audio works yet</p>
        <p class="text-[#9CA3AF] text-sm mt-2">Create your first podcast with VibeVoice!</p>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="text-center py-8 mt-4">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#374151] border-t-[#2563EB]"></div>
        <p class="text-[#D1D5DB] mt-2">Loading your audio works...</p>
      </div>

      <!-- 分页控件 -->
      <div v-if="!loading && works.length > 0" class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <!-- 每页显示数量选择器 -->
        <div class="flex items-center gap-2">
          <span class="text-[#D1D5DB] text-sm">Show</span>
          <select 
            v-model="pageSize"
            @change="handleWorksPageSizeChange(Number(pageSize))"
            class="bg-[#1F2937] text-[#D1D5DB] rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] border border-[#374151]"
          >
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="18">18</option>
            <option value="24">24</option>
          </select>
          <span class="text-[#D1D5DB] text-sm">entries</span>
        </div>

        <!-- 分页按钮 -->
        <div class="flex items-center gap-2">
          <button 
            @click="handleWorksPageChange(page - 1)"
            :disabled="page === 1"
            class="px-3 py-1.5 rounded-lg text-sm transition-colors border"
            :class="[
              page === 1 
                ? 'bg-[#374151] text-[#9CA3AF] cursor-not-allowed border-[#4B5563]' 
                : 'bg-[#1F2937] text-[#D1D5DB] hover:bg-[#374151] border-[#374151]'
            ]"
          >
            Previous
          </button>
          
          <div class="flex items-center gap-1">
            <button 
              v-for="pageNum in totalWorksPages" 
              :key="pageNum"
              @click="handleWorksPageChange(pageNum)"
              class="w-8 h-8 rounded-lg text-sm transition-colors border"
                                :class="[
                    pageNum === page 
                      ? 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white border-transparent' 
                      : 'bg-[#1F2937] text-[#D1D5DB] hover:bg-[#374151] border-[#374151]'
                  ]"
            >
              {{ pageNum }}
            </button>
          </div>

          <button 
            @click="handleWorksPageChange(page + 1)"
            :disabled="page === totalWorksPages"
            class="px-3 py-1.5 rounded-lg text-sm transition-colors border"
            :class="[
              page === totalWorksPages 
                ? 'bg-[#374151] text-[#9CA3AF] cursor-not-allowed border-[#4B5563]' 
                : 'bg-[#1F2937] text-[#D1D5DB] hover:bg-[#374151] border-[#374151]'
            ]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

    <!-- 视频/图片预览模态框 -->
    <div v-if="showPreview" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/95" @click="closePreview">
      <div class="relative w-full h-full flex items-center justify-center p-4">
        <div class="relative w-full h-full flex items-center justify-center">
          <!-- 视频预览 -->
          <video 
            v-if="previewType === 'video'"
            :src="previewVideo" 
            class="max-w-full max-h-full w-auto h-auto object-contain cursor-pointer"
            controls
            autoplay
            @click.stop
          />
          <!-- 图片预览 -->
          <img 
            v-else
            :src="previewVideo" 
            class="max-w-full max-h-full w-auto h-auto object-contain cursor-pointer"
            @click.stop
          />
          <button 
            @click="closePreview"
            class="absolute top-4 right-4 text-white bg-gradient-to-r from-[#6209F6] to-[#2574E9] p-2 rounded-full hover:from-[#5A08E0] hover:to-[#1E63C7] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 返回顶部按钮 -->
    <BackToTop />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineAsyncComponent, watch } from 'vue'
import { useUserStore } from '~/stores/user'
import { getOpusList, checkTask, getTimesLog } from '~/api'
import { SparklesIcon } from '@heroicons/vue/24/outline'
import { useNuxtApp } from 'nuxt/app'

// Get user info
const userStore = useUserStore()
const { $toast } = useNuxtApp() as any

interface UserInfo {
  avatar: string
  created_at: number
  email: string
  free_limit: number
  from_login: string
  id: number
  nickname: string
  remaining_limit: number
  total_limit: number
  use_limit: number
  uuid: string
  vip_last_time: number
}

// 添加积分记录接口
interface CreditRecord {
  id: number
  user_id: number
  change_type: 'register_give' | 'buy_package' | 'create_task_free' | 'create_task'
  use_limit: number
  created_at: number
  updated_at: number
}

interface CreditRecordResponse {
  count: number
  list: CreditRecord[]
  total_page: number
}

interface Work {
  task_id: string
  quality_image: string
  created_at: number
  origin_image: string
  status: number
  prompt?: string
  task_type: number // 1,2=图片，3,4=视频
}

const userInfo = ref<UserInfo>({
  avatar: '',
  created_at: 0,
  email: '',
  free_limit: 0,
  from_login: '',
  id: 0,
  nickname: '',
  remaining_limit: 0,
  total_limit: 0,
  use_limit: 0,
  uuid: '',
  vip_last_time: 0
})

const works = ref<Work[]>([])
const worksCount = ref(0)
const loading = ref(true)
const hasMore = ref(true)
const page = ref(1)
const pageSize = ref(6)
const totalWorksPages = ref(1)

// 视频加载状态
const videoLoadingStates = ref(new Map<string, boolean>())

// 视频预览相关状态
const showPreview = ref(false)
const previewVideo = ref('')
const previewType = ref('Audio') // 'video' 或 'image'
const isDownloading = ref(false)

// 标签选项卡配置
const tabs = [
  { label: 'My Audio', value: 1 },
  // { label: 'My Images', value: 2 },
  { label: 'In Progress', value: 0 }
]

const currentTab = ref(1)
const task_type = ref(6)

// 添加积分记录相关状态
const creditRecords = ref<CreditRecord[]>([])
const creditLoading = ref(false)
const creditPage = ref(1)
const creditPageSize = ref(10)
const totalPages = ref(1)


// 判断是否为视频类型
const isVideoType = (taskType: number) => {
  return taskType === 3 || taskType === 4
}

// 判断是否为图片类型
const isImageType = (taskType: number) => {
  return taskType === 1 || taskType === 2
}

// 视频播放控制
const handleVideoPlay = (event: Event) => {
  const video = event.target as HTMLVideoElement
  video.play().catch(() => {
    // 忽略自动播放策略导致的错误
  })
}

const handleVideoPause = (event: Event) => {
  const video = event.target as HTMLVideoElement
  video.pause()
  video.currentTime = 0
}

// 格式化日期
const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    const response = await userStore.fetchUserInfo()
    userInfo.value = response
  } catch (error) {
    console.error('Failed to fetch user info:', error)
  }
}

// 切换标签
const handleTabChange = (tabValue: number) => {
  currentTab.value = tabValue
  if(tabValue === 2){
    task_type.value = 1
  }else if(tabValue === 1){
    task_type.value = 3
  }
  // In Progress (tabValue === 0) 时不设置task_type

  // 重置分页和数据
  page.value = 1
  works.value = []
  fetchWorks()
}

// 刷新列表
const handleRefresh = () => {
  // 重置分页和数据
  page.value = 1
  works.value = []
  fetchWorks()
}

// 检查任务状态
const checkTaskStatus = async (taskId: string) => {
  try {
    const response = await checkTask(taskId) as any
    if (response.data?.status === 1) {
      // 如果任务完成，从列表中移除该作品
      works.value = works.value.filter(work => work.task_id !== taskId)
    }
  } catch (error) {
    console.error('Failed to check task status:', error)
  }
}

// 获取作品列表
const fetchWorks = async () => {
  loading.value = true
  try {
    // 构建请求参数
    const params: any = {
      page: page.value,
      page_size: pageSize.value,
      status: currentTab.value === 2 ? 1 : currentTab.value,
    }
    
    // 只有在非 In Progress 状态时才传递 task_type
    if (currentTab.value !== 0) {
      params.task_type = task_type.value
    }
    
    const response = await getOpusList(params) as any
    const data = response.data
    
    worksCount.value = data.count
    works.value = data.list
    totalWorksPages.value = Math.ceil(data.count / pageSize.value)

    // 如果是进行中的列表，检查每个任务的状态
    if (currentTab.value === 0) {
      data.list.forEach((work: Work) => {
        checkTaskStatus(work.task_id)
      })
    }
  } catch (error) {
    console.error('Failed to fetch works:', error)
    $toast.error('Failed to load works')
  } finally {
    loading.value = false
  }
}

// 打开视频预览
const openLightbox = (video: string) => {
  previewVideo.value = video
  previewType.value = 'video'
  showPreview.value = true
}

// 打开图片预览
const openImageLightbox = (image: string) => {
  previewVideo.value = image
  previewType.value = 'image'
  showPreview.value = true
}

// 关闭视频预览
const closePreview = () => {
  showPreview.value = false
  previewVideo.value = ''
}

// 下载视频或图片
const handleDownload = async (fileUrl: string) => {
  if (!fileUrl || isDownloading.value) return
  isDownloading.value = true
  try {
    const response = await fetch(fileUrl)
    if (!response.ok) {
      throw new Error('Download failed')
    }
    
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    
    // 根据当前作品的task_type确定文件扩展名
    // 需要从URL或其他方式判断文件类型
    const extension = '.mp3'
    link.download = `${Date.now()}${extension}`
    
    document.body.appendChild(link)
    link.click()
    
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Download failed:', error)
    $toast.error('Download failed, please try again later')
  } finally {
    isDownloading.value = false
  }
}

// 视频加载事件处理
const handleVideoCanPlay = (taskId: string) => {
  videoLoadingStates.value.set(taskId, false)
}

// 视频加载开始事件处理
const handleVideoLoadStart = (taskId: string) => {
  videoLoadingStates.value.set(taskId, true)
}

// 复制提示词
const copyPrompt = async (prompt: string) => {
  try {
    await navigator.clipboard.writeText(prompt)
    $toast.success('Prompt copied to clipboard', 3000, 'center')
  } catch (error) {
    console.error('Failed to copy prompt:', error)
    $toast.error('Failed to copy prompt', 3000, 'center')
  }
}

// 获取积分记录
const fetchCreditRecords = async () => {
  if (creditLoading.value) return
  
  creditLoading.value = true
  try {
    const response = await getTimesLog({
      page: creditPage.value,
      page_size: creditPageSize.value
    }) as any
    
    const data = response.data as CreditRecordResponse
    totalPages.value = data.total_page
    creditRecords.value = data.list
  } catch (error) {
    console.error('Failed to fetch credit records:', error)
    $toast.error('Failed to load credit records')
  } finally {
    creditLoading.value = false
  }
}

// 获取积分记录类型的中文描述
const getCreditTypeText = (type: string) => {
  const typeMap: Record<string, string> = {
    'register_give': 'Registration Bonus',
    'buy_package': 'Package Purchase',
    'create_task_free': 'Free Credit Usage',
    'create_task': 'Credit Usage'
  }
  return typeMap[type] || type
}

// 获取积分记录类型的图标
const getCreditTypeIcon = (type: string) => {
  switch (type) {
    case 'register_give':
      return 'gift'
    case 'buy_package':
      return 'shopping-bag'
    case 'create_task_free':
      return 'sparkles'
    case 'create_task':
      return 'fire'
    default:
      return 'currency-dollar'
  }
}

// 积分记录弹框状态
const showCreditRecords = ref(false)

// 切换页码
const handlePageChange = (page: number) => {
  creditPage.value = page
  fetchCreditRecords()
}

// 切换每页显示数量
const handlePageSizeChange = (size: number) => {
  creditPageSize.value = size
  creditPage.value = 1
  fetchCreditRecords()
}

// 打开积分记录弹框
const openCreditRecords = () => {
  showCreditRecords.value = true
  // 禁止背景滚动
  document.body.style.overflow = 'hidden'
  // 重置积分记录数据
  creditRecords.value = []
  creditPage.value = 1
  fetchCreditRecords()
}

const closeCreditRecords = () => {
  showCreditRecords.value = false
  // 恢复背景滚动
  document.body.style.overflow = ''
}

// 监听弹框显示状态变化
watch(showCreditRecords, (newValue) => {
  if (!newValue) {
    // 当弹框关闭时恢复滚动
    document.body.style.overflow = ''
  }
})

// 切换页码
const handleWorksPageChange = (newPage: number) => {
  if (newPage < 1 || newPage > totalWorksPages.value) return
  page.value = newPage
  fetchWorks()
  // 滚动到作品区域
  document.getElementById('works-section')?.scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  })
}

// 切换每页显示数量
const handleWorksPageSizeChange = (size: number) => {
  pageSize.value = size
  page.value = 1
  fetchWorks()
  // 滚动到作品区域
  document.getElementById('works-section')?.scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  })
}

onMounted(() => {
  fetchUserInfo()
  fetchWorks()
  fetchCreditRecords()
})

onUnmounted(() => {
  // 确保组件卸载时恢复滚动
  document.body.style.overflow = ''
})
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.7);
}
</style> 