<template>
  <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
    <h3 class="text-xl font-semibold text-white mb-4">Share Your Experience</h3>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- 用户信息 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Name</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#ec2657] focus:border-transparent"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Role</label>
          <input
            v-model="form.role"
            type="text"
            required
            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#ec2657] focus:border-transparent"
            placeholder="Enter your role"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">Location</label>
        <input
          v-model="form.location"
          type="text"
          required
          class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#ec2657] focus:border-transparent"
          placeholder="Enter your city"
        />
      </div>

      <!-- 评分 -->
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">Rating</label>
        <div class="flex items-center space-x-2">
          <button
            v-for="star in 5"
            :key="star"
            type="button"
            @click="form.rating = star"
            class="text-2xl transition-colors"
            :class="star <= form.rating ? 'text-yellow-400' : 'text-gray-500 hover:text-yellow-300'"
          >
            ★
          </button>
          <span class="ml-2 text-gray-400">{{ form.rating }}/5</span>
        </div>
      </div>

      <!-- 评论内容 -->
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">Review Content</label>
        <textarea
          v-model="form.content"
          required
          rows="4"
          class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#ec2657] focus:border-transparent resize-none"
          placeholder="Share your experience with VibeVoice..."
        ></textarea>
      </div>

      <!-- 标签 -->
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">Related Tags</label>
        <div class="flex flex-wrap gap-2 mb-2">
          <span
            v-for="tag in availableTags"
            :key="tag"
            @click="toggleTag(tag)"
            class="px-3 py-1 rounded-full text-sm cursor-pointer transition-colors"
            :class="form.tags.includes(tag) 
              ? 'bg-[#ec2657] text-white' 
              : 'bg-gray-600 text-gray-300 hover:bg-gray-500'"
          >
            {{ tag }}
          </span>
        </div>
        <input
          v-model="newTag"
          type="text"
          @keyup.enter="addCustomTag"
          class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-[#ec2657] focus:border-transparent"
          placeholder="Type custom tag and press Enter to add"
        />
      </div>

      <!-- 提交按钮 -->
      <div class="flex justify-end space-x-4">
        <button
          type="button"
          @click="resetForm"
          class="px-6 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Reset
        </button>
        <button
          type="submit"
          :disabled="submitting"
          class="px-6 py-2 bg-gradient-to-r from-[#ec2657] to-[#f3a943] text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="submitting" class="flex items-center">
            <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Submitting...
          </span>
          <span v-else>Submit Review</span>
        </button>
      </div>
    </form>

    <!-- 成功提示 -->
    <div v-if="showSuccess" class="mt-4 p-4 bg-green-900/20 border border-green-500 rounded-lg">
      <p class="text-green-400">Review submitted successfully! Thank you for your feedback.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useCommentsStore } from '~/stores/comments'

const commentsStore = useCommentsStore()
const { $toast } = useNuxtApp()

// 表单数据
const form = reactive({
  name: '',
  role: '',
  location: '',
  rating: 5,
  content: '',
  tags: []
})

// 可用标签
const availableTags = [
  'Voice Quality', 'Multilingual', 'Naturalness', 'Podcast', 'Long-form', 'Efficiency',
  'Education', 'Online Courses', 'Teaching', 'Advertising', 'Voiceover', 'Professional',
  'Gaming', 'NPC', 'Characters', 'Content Creation', 'Video', 'High Performance',
  'Product Demos', 'API', 'Integration', 'Audiobooks', 'Emotional Expression', 'Cost-effective',
  'Voice Acting', 'Character Work', 'Accessibility', 'Inclusive Technology', 'Clear Pronunciation',
  'Mobile Development', 'Cross-platform', 'Language Learning', 'Pronunciation', 'Conversational Flow'
]

// 状态
const submitting = ref(false)
const showSuccess = ref(false)
const newTag = ref('')

// 切换标签
const toggleTag = (tag) => {
  const index = form.tags.indexOf(tag)
  if (index > -1) {
    form.tags.splice(index, 1)
  } else {
    form.tags.push(tag)
  }
}

// 添加自定义标签
const addCustomTag = () => {
  if (newTag.value.trim() && !form.tags.includes(newTag.value.trim())) {
    form.tags.push(newTag.value.trim())
    newTag.value = ''
  }
}

// 重置表单
const resetForm = () => {
  Object.assign(form, {
    name: '',
    role: '',
    location: '',
    rating: 5,
    content: '',
    tags: []
  })
  newTag.value = ''
  showSuccess.value = false
}

// 提交表单
const handleSubmit = async () => {
  if (!form.name || !form.role || !form.location || !form.content) {
    $toast?.error('Please fill in all required fields')
    return
  }

  submitting.value = true

  try {
    const newComment = {
      user: {
        name: form.name,
        role: form.role,
        location: form.location
      },
      rating: form.rating,
      content: form.content,
      tags: form.tags
    }

    await commentsStore.addComment(newComment)
    
    showSuccess.value = true
    $toast?.success('Review submitted successfully!')
    
    // 3秒后重置表单
    setTimeout(() => {
      resetForm()
    }, 3000)

  } catch (error) {
    console.error('Failed to submit review:', error)
    $toast?.error('Submission failed, please try again')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
/* 自定义滚动条 */
textarea::-webkit-scrollbar {
  width: 6px;
}

textarea::-webkit-scrollbar-track {
  background: #374151;
}

textarea::-webkit-scrollbar-thumb {
  background: #ec2657;
  border-radius: 3px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #f3a943;
}
</style>
