<template>
  <div class="min-h-screen bg-[#0B0B12] text-[#D1D5DB]">
    <!-- 页面头部 -->
    <div class="bg-gradient-to-r from-gray-900 to-gray-800 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
            User Reviews
          </h1>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover what our users say about VibeVoice and how they're using our AI voice technology to create amazing content
          </p>
        </div>
      </div>
    </div>

    <!-- 统计信息 -->
    <div class="py-16 bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-4xl font-bold text-[#ec2657] mb-2">{{ commentsStore.averageRating }}</div>
            <div class="text-gray-300">Average Rating</div>
            <div class="flex justify-center mt-2">
              <span class="text-yellow-400 text-xl">★★★★★</span>
            </div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-[#ec2657] mb-2">{{ commentsStore.totalComments }}</div>
            <div class="text-gray-300">Total Reviews</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-[#ec2657] mb-2">{{ commentsStore.satisfactionRate }}%</div>
            <div class="text-gray-300">Satisfaction Rate</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-[#ec2657] mb-2">{{ commentsStore.verifiedComments.length }}</div>
            <div class="text-gray-300">Verified Reviews</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 筛选和排序 -->
    <div class="py-8 bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <!-- 评分筛选 -->
          <div class="flex items-center space-x-4">
            <span class="text-gray-300">Filter by Rating:</span>
            <div class="flex space-x-2">
              <button
                v-for="rating in [5, 4, 3, 2, 1]"
                :key="rating"
                @click="filterByRating = filterByRating === rating ? null : rating"
                class="px-3 py-1 rounded-full text-sm transition-colors"
                :class="filterByRating === rating 
                  ? 'bg-[#ec2657] text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'"
              >
                {{ rating }}★
              </button>
            </div>
          </div>

          <!-- 排序 -->
          <div class="flex items-center space-x-4">
            <span class="text-gray-300">Sort by:</span>
            <select
              v-model="sortBy"
              class="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#ec2657] focus:border-transparent"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- 评论列表 -->
    <div class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 加载状态 -->
        <div v-if="commentsStore.loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#ec2657]"></div>
          <p class="mt-4 text-gray-300">Loading reviews...</p>
        </div>

        <!-- 错误状态 -->
        <div v-else-if="commentsStore.error" class="text-center py-12">
          <p class="text-red-400">{{ commentsStore.error }}</p>
          <button 
            @click="loadComments"
            class="mt-4 bg-[#ec2657] text-white px-6 py-2 rounded-lg hover:bg-[#f3a943] transition-colors"
          >
            Retry
          </button>
        </div>

        <!-- 评论网格 -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="comment in filteredComments" 
            :key="comment.id"
            class="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700"
          >
            <!-- 用户信息 -->
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 rounded-full bg-gradient-to-r from-[#ec2657] to-[#f3a943] flex items-center justify-center text-white font-bold text-lg">
                {{ comment.user.name.charAt(0).toUpperCase() }}
              </div>
              <div class="ml-4 flex-1">
                                 <div class="flex items-center">
                   <h4 class="text-white font-semibold">{{ comment.user.name }}</h4>
                   <span v-if="comment.isVerified" class="ml-2 text-blue-400 text-sm">✓ Verified</span>
                 </div>
                <p class="text-gray-400 text-sm">{{ comment.user.role }}</p>
              </div>
            </div>

            <!-- 评分 -->
            <div class="flex items-center mb-4">
              <div class="flex text-yellow-400">
                <span v-for="i in 5" :key="i" class="text-sm">
                  {{ i <= comment.rating ? '★' : '☆' }}
                </span>
              </div>
              <span class="ml-2 text-gray-400 text-sm">{{ comment.rating }}/5</span>
            </div>

            <!-- 评论内容 -->
            <p class="text-gray-300 mb-4 leading-relaxed">
              "{{ comment.content }}"
            </p>

            <!-- 标签 -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span 
                v-for="tag in comment.tags" 
                :key="tag"
                class="px-3 py-1 bg-[#ec2657]/20 text-[#ec2657] rounded-full text-xs"
              >
                {{ tag }}
              </span>
            </div>

            <!-- 时间和地点 -->
            <div class="flex justify-between items-center text-sm text-gray-500">
              <span>{{ formatDate(comment.createdAt) }}</span>
              <span>{{ comment.user.location }}</span>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-if="!commentsStore.loading && filteredComments.length === 0" class="text-center py-12">
          <p class="text-gray-400 text-lg">没有找到符合条件的评论</p>
        </div>
      </div>
    </div>

    <!-- 添加评论区域 -->
    <div class="py-16 bg-gray-900">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-white mb-2">分享您的体验</h2>
          <p class="text-gray-300">您的反馈对我们很重要</p>
        </div>
        <AddCommentForm />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCommentsStore } from '~/stores/comments'
import AddCommentForm from '~/components/Comments/AddCommentForm.vue'

const commentsStore = useCommentsStore()

// 筛选和排序状态
const filterByRating = ref(null)
const sortBy = ref('newest')

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 过滤后的评论
const filteredComments = computed(() => {
  let comments = [...commentsStore.comments]

  // 按评分筛选
  if (filterByRating.value) {
    comments = comments.filter(comment => comment.rating === filterByRating.value)
  }

  // 排序
  switch (sortBy.value) {
    case 'newest':
      comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      break
    case 'oldest':
      comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      break
    case 'highest':
      comments.sort((a, b) => b.rating - a.rating)
      break
    case 'lowest':
      comments.sort((a, b) => a.rating - b.rating)
      break
  }

  return comments
})

// 加载评论
const loadComments = async () => {
  try {
    await commentsStore.getComments()
  } catch (error) {
    console.error('加载评论失败:', error)
  }
}

// 页面元数据
useHead({
  title: '用户评价 - VibeVoice',
  meta: [
    { name: 'description', content: '查看 VibeVoice 用户的真实评价和反馈，了解我们的AI语音技术如何帮助用户创造精彩内容。' }
  ]
})

// 组件挂载时加载数据
onMounted(() => {
  loadComments()
})
</script>

<style scoped>
/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #374151;
}

::-webkit-scrollbar-thumb {
  background: #ec2657;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #f3a943;
}
</style>
