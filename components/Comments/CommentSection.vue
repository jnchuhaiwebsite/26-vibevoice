<template>
  <section class="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 标题部分 -->
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-white mb-4">
            Trusted by Creators Like You
        </h2>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear directly from the podcasters, authors, and professionals who are transforming their ideas into studio-quality audio with VibeVoice.
        </p>
      </div>

      <!-- 统计信息 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div class="text-center">
          <div class="text-4xl font-bold text-[#ec2657] mb-2">{{ commentsStore.averageRating }}</div>
          <div class="text-gray-300">Average Rating</div>
          <div class="flex justify-center mt-2">
            <span class="text-yellow-400 text-xl">★★★★★</span>
          </div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-[#ec2657] mb-2">{{ commentsStore.totalComments }}+</div>
          <div class="text-gray-300">User Reviews</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-[#ec2657] mb-2">{{ commentsStore.satisfactionRate }}%</div>
          <div class="text-gray-300">Satisfaction Rate</div>
        </div>
      </div>

      <!-- 加载状态 -->
      <div v-if="commentsStore.loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#ec2657]"></div>
        <p class="mt-4 text-gray-300">Loading reviews...</p>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="commentsStore.error" class="text-center py-12">
        <p class="text-red-400">{{ commentsStore.error }}</p>
        <button 
          @click="commentsStore.getComments(6)"
          class="mt-4 bg-[#ec2657] text-white px-6 py-2 rounded-lg hover:bg-[#f3a943] transition-colors"
        >
          Retry
        </button>
      </div>

      <!-- 滚动评论列表 -->
      <div v-else class="relative overflow-hidden">
        <div class="flex animate-scroll space-x-6">
          <!-- 第一组评论 -->
          <div 
            v-for="comment in commentsStore.comments" 
            :key="comment.id"
            class="flex-shrink-0 w-80 bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700"
          >
            <!-- 用户信息 -->
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 rounded-full bg-gradient-to-r from-[#ec2657] to-[#f3a943] flex items-center justify-center text-white font-bold text-sm">
                {{ comment.user.name.charAt(0).toUpperCase() }}
              </div>
              <div class="ml-3">
                <span class="text-white font-semibold text-sm">{{ comment.user.name }}</span>
                <p class="text-gray-400 text-xs">{{ comment.user.role }}</p>
              </div>
            </div>

            <!-- 评分 -->
            <div class="flex items-center mb-3">
              <div class="flex text-yellow-400">
                <span v-for="i in 5" :key="i" class="text-xs">
                  {{ i <= comment.rating ? '★' : '☆' }}
                </span>
              </div>
              <span class="ml-2 text-gray-400 text-xs">{{ comment.rating }}/5</span>
            </div>

            <!-- 评论内容 -->
            <p class="text-gray-300 text-sm leading-relaxed mb-3 line-clamp-3">
              "{{ comment.content }}"
            </p>

            <!-- 标签 -->
            <div class="flex flex-wrap gap-1 mb-3">
              <span 
                v-for="tag in comment.tags.slice(0, 2)" 
                :key="tag"
                class="px-2 py-1 bg-[#ec2657]/20 text-[#ec2657] rounded-full text-xs"
              >
                {{ tag }}
              </span>
            </div>

            <!-- 时间和地点 -->
            <!-- <div class="flex justify-between items-center text-xs text-gray-500">
              <span>{{ formatDate(comment.createdAt) }}</span>
              <span>{{ comment.user.location }}</span>
            </div> -->
          </div>
          
          <!-- 第二组评论（重复以创建无缝滚动） -->
          <div 
            v-for="comment in commentsStore.comments" 
            :key="`duplicate-${comment.id}`"
            class="flex-shrink-0 w-80 bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700"
          >
            <!-- 用户信息 -->
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 rounded-full bg-gradient-to-r from-[#ec2657] to-[#f3a943] flex items-center justify-center text-white font-bold text-sm">
                {{ comment.user.name.charAt(0).toUpperCase() }}
              </div>
              <div class="ml-3">
                <span class="text-white font-semibold text-sm">{{ comment.user.name }}</span>
                <p class="text-gray-400 text-xs">{{ comment.user.role }}</p>
              </div>
            </div>

            <!-- 评分 -->
            <div class="flex items-center mb-3">
              <div class="flex text-yellow-400">
                <span v-for="i in 5" :key="i" class="text-xs">
                  {{ i <= comment.rating ? '★' : '☆' }}
                </span>
              </div>
              <span class="ml-2 text-gray-400 text-xs">{{ comment.rating }}/5</span>
            </div>

            <!-- 评论内容 -->
            <p class="text-gray-300 text-sm leading-relaxed mb-3 line-clamp-3">
              "{{ comment.content }}"
            </p>

            <!-- 标签 -->
            <div class="flex flex-wrap gap-1 mb-3">
              <span 
                v-for="tag in comment.tags.slice(0, 2)" 
                :key="tag"
                class="px-2 py-1 bg-[#ec2657]/20 text-[#ec2657] rounded-full text-xs"
              >
                {{ tag }}
              </span>
            </div>

            <!-- 时间和地点 -->
            <div class="flex justify-between items-center text-xs text-gray-500">
              <span>{{ formatDate(comment.createdAt) }}</span>
              <span>{{ comment.user.location }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 添加评论区域 -->
      <!-- <div class="mt-16">
        <div class="text-center mb-8">
          <h3 class="text-2xl font-bold text-white mb-2">Share Your Experience</h3>
          <p class="text-gray-300">Your feedback matters to us</p>
        </div>
        <AddCommentForm />
      </div> -->

      <!-- 查看更多按钮 -->

    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCommentsStore } from '~/stores/comments'
import AddCommentForm from './AddCommentForm.vue'

const commentsStore = useCommentsStore()

// 格式化日期 - 显示为今天
const formatDate = (dateString) => {
  return 'Today'
}

// 直接使用stores中的默认评论数据，不调用API
// onMounted(async () => {
//   try {
//     await commentsStore.getComments(6) // 只显示前6条评论
//   } catch (error) {
//     console.error('获取评论失败:', error)
//   }
// })
</script>

<style scoped>
/* 滚动动画 */
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scroll 30s linear infinite;
}

.animate-scroll:hover {
  animation-play-state: paused;
}

/* 文本截断 */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 自定义滚动条 */
.comment-section::-webkit-scrollbar {
  width: 6px;
}

.comment-section::-webkit-scrollbar-track {
  background: #374151;
}

.comment-section::-webkit-scrollbar-thumb {
  background: #ec2657;
  border-radius: 3px;
}

.comment-section::-webkit-scrollbar-thumb:hover {
  background: #f3a943;
}
</style>
