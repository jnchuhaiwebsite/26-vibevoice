<template>
  <div class="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 border border-gray-700">
    <div class="text-center mb-8">
      <h3 class="text-2xl font-bold text-white mb-2">用户反馈</h3>
      <p class="text-gray-300">真实用户评价</p>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      <div class="text-center">
        <div class="text-3xl font-bold text-[#ec2657] mb-1">{{ commentsStore.averageRating }}</div>
        <div class="text-sm text-gray-300">平均评分</div>
        <div class="flex justify-center mt-1">
          <span class="text-yellow-400 text-sm">★★★★★</span>
        </div>
      </div>
      <div class="text-center">
        <div class="text-3xl font-bold text-[#ec2657] mb-1">{{ commentsStore.totalComments }}</div>
        <div class="text-sm text-gray-300">总评论</div>
      </div>
      <div class="text-center">
        <div class="text-3xl font-bold text-[#ec2657] mb-1">{{ commentsStore.satisfactionRate }}%</div>
        <div class="text-sm text-gray-300">满意度</div>
      </div>
      <div class="text-center">
        <div class="text-3xl font-bold text-[#ec2657] mb-1">{{ commentsStore.verifiedComments.length }}</div>
        <div class="text-sm text-gray-300">已验证</div>
      </div>
    </div>

    <!-- 评分分布 -->
    <div class="mb-6">
      <h4 class="text-lg font-semibold text-white mb-4">评分分布</h4>
      <div class="space-y-2">
        <div v-for="rating in [5, 4, 3, 2, 1]" :key="rating" class="flex items-center">
          <span class="text-sm text-gray-300 w-8">{{ rating }}★</span>
          <div class="flex-1 mx-3">
            <div class="bg-gray-700 rounded-full h-2">
              <div 
                class="bg-gradient-to-r from-[#ec2657] to-[#f3a943] h-2 rounded-full transition-all duration-500"
                :style="{ width: `${getRatingPercentage(rating)}%` }"
              ></div>
            </div>
          </div>
          <span class="text-sm text-gray-400 w-8">{{ getRatingCount(rating) }}</span>
        </div>
      </div>
    </div>

    <!-- 热门标签 -->
    <div class="mb-6">
      <h4 class="text-lg font-semibold text-white mb-4">热门标签</h4>
      <div class="flex flex-wrap gap-2">
        <span 
          v-for="tag in popularTags" 
          :key="tag.name"
          class="px-3 py-1 bg-[#ec2657]/20 text-[#ec2657] rounded-full text-sm"
        >
          {{ tag.name }} ({{ tag.count }})
        </span>
      </div>
    </div>

    <!-- 最新评论预览 -->
    <div>
      <h4 class="text-lg font-semibold text-white mb-4">最新评论</h4>
      <div class="space-y-3">
        <div 
          v-for="comment in latestComments" 
          :key="comment.id"
          class="bg-gray-700 rounded-lg p-4"
        >
          <div class="flex items-center mb-2">
            <div class="w-8 h-8 rounded-full bg-gradient-to-r from-[#ec2657] to-[#f3a943] flex items-center justify-center text-white font-bold text-sm">
              {{ comment.user.name.charAt(0).toUpperCase() }}
            </div>
            <div class="ml-3">
              <div class="text-white font-medium text-sm">{{ comment.user.name }}</div>
              <div class="flex items-center">
                <div class="flex text-yellow-400 text-xs">
                  <span v-for="i in 5" :key="i">
                    {{ i <= comment.rating ? '★' : '☆' }}
                  </span>
                </div>
                <span class="ml-1 text-gray-400 text-xs">{{ comment.rating }}/5</span>
              </div>
            </div>
          </div>
          <p class="text-gray-300 text-sm line-clamp-2">
            "{{ comment.content }}"
          </p>
        </div>
      </div>
    </div>

    <!-- 查看全部按钮 -->
    <div class="text-center mt-6">
      <NuxtLink 
        to="/comments"
        class="inline-block bg-gradient-to-r from-[#ec2657] to-[#f3a943] text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
      >
        查看全部评价
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useCommentsStore } from '~/stores/comments'

const commentsStore = useCommentsStore()

// 获取评分百分比
const getRatingPercentage = (rating) => {
  if (commentsStore.comments.length === 0) return 0
  const count = commentsStore.comments.filter(comment => comment.rating === rating).length
  return Math.round((count / commentsStore.comments.length) * 100)
}

// 获取评分数量
const getRatingCount = (rating) => {
  return commentsStore.comments.filter(comment => comment.rating === rating).length
}

// 热门标签
const popularTags = computed(() => {
  const tagCounts = {}
  
  commentsStore.comments.forEach(comment => {
    comment.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })
  
  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)
})

// 最新评论
const latestComments = computed(() => {
  return commentsStore.comments
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3)
})

// 组件挂载时获取数据
onMounted(async () => {
  try {
    await commentsStore.getComments(10) // 获取前10条评论用于统计
  } catch (error) {
    console.error('获取评论统计失败:', error)
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
