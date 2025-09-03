import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface CommentUser {
  name: string
  role: string
  location: string
  avatar?: string
}

export interface Comment {
  id: number
  user: CommentUser
  rating: number
  content: string
  tags: string[]
  createdAt: string
  replies?: Comment[]
  isVerified?: boolean
}

export const useCommentsStore = defineStore('comments', () => {
  // 状态
  const comments = ref<Comment[]>([
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        role: "Content Creator",
        location: "New York, NY"
      },
      rating: 5,
      content: "VibeVoice's voice quality exceeded my expectations! The multilingual support allows me to easily create international content, and the AI-generated voices sound incredibly natural - almost indistinguishable from human speech.",
      tags: ["Voice Quality", "Multilingual", "Naturalness"],
      createdAt: new Date().toISOString().split('T')[0],
      isVerified: true
    },
    {
      id: 2,
      user: {
        name: "Michael Chen",
        role: "Podcast Host",
        location: "Los Angeles, CA"
      },
      rating: 5,
      content: "As a podcast host, I need high-quality voice synthesis tools. VibeVoice not only delivers excellent audio quality but also handles long-form content, significantly improving my production efficiency. Highly recommended!",
      tags: ["Podcast", "Long-form", "Efficiency"],
      createdAt: new Date().toISOString().split('T')[0],
      isVerified: true
    },
    {
      id: 3,
      user: {
        name: "Emily Rodriguez",
        role: "Educational Designer",
        location: "Austin, TX"
      },
      rating: 4,
      content: "I use VibeVoice to create online courses, and the student feedback has been excellent. The voice is clear, the pace is perfect, and it's ideal for educational content. I'd love to see more educational voice styles added.",
      tags: ["Education", "Online Courses", "Teaching"],
      createdAt: new Date().toISOString().split('T')[0],
      isVerified: true
    },
    {
      id: 4,
      user: {
        name: "David Thompson",
        role: "Creative Director",
        location: "Chicago, IL"
      },
      rating: 5,
      content: "In advertising, time is money. VibeVoice helps me quickly generate various styles of commercial voiceovers with professional quality. Our clients are extremely satisfied. This tool is absolutely game-changing!",
      tags: ["Advertising", "Voiceover", "Professional"],
      createdAt: new Date().toISOString().split('T')[0],
      isVerified: true
    },
    {
      id: 5,
      user: {
        name: "Alex Kim",
        role: "Game Developer",
        location: "Seattle, WA"
      },
      rating: 5,
      content: "Games require massive amounts of NPC voice content. VibeVoice has dramatically reduced my development costs while delivering distinct character voices that enhance the player experience significantly.",
      tags: ["Gaming", "NPC", "Characters"],
      createdAt: new Date().toISOString().split('T')[0],
      isVerified: true
    },
    {
      id: 6,
      user: {
        name: "Jessica Martinez",
        role: "Content Creator",
        location: "Miami, FL"
      },
      rating: 4,
      content: "As a content creator, I frequently produce video content. VibeVoice's voice synthesis feature has made my video production much more efficient, and the audio quality is fantastic. My audience loves it!",
      tags: ["Content Creation", "Video", "Efficiency"],
      createdAt: new Date().toISOString().split('T')[0],
      isVerified: true
    },
    {
      id: 7,
      user: {
        name: "Robert Wilson",
        role: "Product Manager",
        location: "San Francisco, CA"
      },
      rating: 5,
      content: "Our team uses VibeVoice for product demos, and the results are incredibly professional. The API is stable and integrates seamlessly into our systems without any issues. It's been a game-changer for our presentations.",
      tags: ["Product Demos", "API", "Integration"],
      createdAt: new Date().toISOString().split('T')[0],
      isVerified: true
    },
    {
      id: 8,
      user: {
        name: "Amanda Foster",
        role: "Audiobook Producer",
        location: "Boston, MA"
      },
      rating: 5,
      content: "Producing audiobooks requires extensive voice content. VibeVoice has saved me tremendous time and costs while delivering rich emotional expression that resonates well with listeners. The feedback has been outstanding.",
      tags: ["Audiobooks", "Emotional Expression", "Cost-effective"],
      createdAt: new Date().toISOString().split('T')[0],
      isVerified: true
    },
    {
      id: 9,
      user: {
        name: "James Anderson",
        role: "Marketing Specialist",
        location: "Denver, CO"
      },
      rating: 5,
      content: "VibeVoice has revolutionized our marketing campaigns. The ability to generate multiple voice styles for different demographics has increased our engagement rates by 40%. The quality is consistently excellent.",
      tags: ["Marketing", "Campaigns", "Engagement"],
      createdAt: new Date().toISOString().split('T')[0],
      isVerified: true
    },
    {
      id: 10,
      user: {
        name: "Lisa Taylor",
        role: "E-learning Developer",
        location: "Portland, OR"
      },
      rating: 4,
      content: "Creating engaging e-learning content is challenging, but VibeVoice makes it so much easier. The natural-sounding voices keep students engaged, and the multilingual capabilities help us reach global audiences.",
      tags: ["E-learning", "Engagement", "Global Reach"],
      createdAt: new Date().toISOString().split('T')[0],
      isVerified: true
    },
    {
      id: 11,
      user: {
        name: "Marcus Johnson",
        role: "Voice Actor",
        location: "Nashville, TN"
      },
      rating: 5,
      content: "As a professional voice actor, I'm amazed by VibeVoice's quality. It captures emotional nuances that most TTS systems miss. The voice cloning capabilities are particularly impressive for character work.",
      tags: ["Voice Acting", "Emotional Expression", "Character Work"],
      createdAt: new Date().toISOString().split('T')[0],
      isVerified: true
    },
    {
      id: 12,
      user: {
        name: "Rachel Green",
        role: "Accessibility Specialist",
        location: "Phoenix, AZ"
      },
      rating: 5,
      content: "VibeVoice has been a game-changer for accessibility. The clear pronunciation and natural pacing make content much more accessible for users with reading difficulties. It's truly inclusive technology.",
      tags: ["Accessibility", "Inclusive Technology", "Clear Pronunciation"],
      createdAt: new Date().toISOString().split('T')[0],
      isVerified: true
    },
    {
      id: 13,
      user: {
        name: "Kevin Park",
        role: "Mobile App Developer",
        location: "San Diego, CA"
      },
      rating: 4,
      content: "Integrating VibeVoice into our mobile app was seamless. The API is well-documented and the voice quality is consistent across different devices. Our users love the natural-sounding voices.",
      tags: ["Mobile Development", "API Integration", "Cross-platform"],
      createdAt: new Date().toISOString().split('T')[0],
      isVerified: true
    },
    {
      id: 14,
      user: {
        name: "Sophie Williams",
        role: "Language Teacher",
        location: "Orlando, FL"
      },
      rating: 5,
      content: "Teaching languages with VibeVoice has transformed my classroom. Students can hear perfect pronunciation in multiple languages, and the conversational flow helps them understand natural speech patterns.",
      tags: ["Language Learning", "Pronunciation", "Multilingual"],
      createdAt: new Date().toISOString().split('T')[0],
      isVerified: true
    }
  ])

  const loading = ref(false)
  const error = ref<string | null>(null)

  // 计算属性
  const averageRating = computed(() => {
    if (comments.value.length === 0) return 0
    const total = comments.value.reduce((sum, comment) => sum + comment.rating, 0)
    return Math.round((total / comments.value.length) * 10) / 10
  })

  const totalComments = computed(() => comments.value.length)

  const verifiedComments = computed(() => 
    comments.value.filter(comment => comment.isVerified)
  )

  const highRatingComments = computed(() => 
    comments.value.filter(comment => comment.rating >= 4)
  )

  const satisfactionRate = computed(() => {
    if (comments.value.length === 0) return 0
    const satisfied = comments.value.filter(comment => comment.rating >= 4).length
    return Math.round((satisfied / comments.value.length) * 100)
  })

  // 方法
  const getComments = async (limit?: number) => {
    loading.value = true
    error.value = null
    
    try {
      // 直接使用默认数据，不调用API
      const result = limit ? comments.value.slice(0, limit) : comments.value
      return result
    } catch (err) {
      error.value = '获取评论失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  const getCommentsByRating = (minRating: number) => {
    return comments.value.filter(comment => comment.rating >= minRating)
  }

  const getCommentsByTag = (tag: string) => {
    return comments.value.filter(comment => 
      comment.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
    )
  }

  const addComment = async (newComment: Omit<Comment, 'id' | 'createdAt'>) => {
    loading.value = true
    error.value = null
    
    try {
      // 直接添加到本地数据，不调用API
      const comment: Comment = {
        ...newComment,
        id: Date.now(),
        createdAt: new Date().toISOString().split('T')[0],
        isVerified: false
      }
      
      comments.value.unshift(comment)
      return comment
    } catch (err) {
      error.value = '添加评论失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteComment = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      // 直接从本地数据删除，不调用API
      const index = comments.value.findIndex(comment => comment.id === id)
      if (index > -1) {
        comments.value.splice(index, 1)
        return true
      }
      return false
    } catch (err) {
      error.value = '删除评论失败'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    // 状态
    comments,
    loading,
    error,
    
    // 计算属性
    averageRating,
    totalComments,
    verifiedComments,
    highRatingComments,
    satisfactionRate,
    
    // 方法
    getComments,
    getCommentsByRating,
    getCommentsByTag,
    addComment,
    deleteComment
  }
})
