<template>
  <div class="container mx-auto px-4 " style="background-color: var(--bg-color);">
    <div class="mt-20">
      <Breadcrumbs :items="breadcrumbItems" />
    </div>
    <PageHero title="MuseSteamer AI Blog"
      subtitle="Tips, tutorials, and inspiration to create professional videos with MuseSteamer AI." />

    <!-- Categories filter -->
    <div class="mx-auto w-11/12 max-w-4xl mb-8">
      <div class="flex flex-wrap justify-center gap-2 md:gap-3">
        <div v-for="category in allCategories" :key="category.id"
          class="px-4 py-2 rounded-lg transition-all cursor-pointer text-sm md:text-base font-medium" :class="currentCategory === category.id.toString()
            ? 'bg-gradient-to-r from-[#6209F6]/50 to-[#83D0FB]/50 text-white shadow-md'
            : 'bg-gray-800/80 text-slate-300 hover:bg-gray-700/70 border border-white/10'"
          @click="handleCategoryChange(category.id.toString())">
          {{ category.name }}
        </div>
      </div>
    </div>

    <!-- Blog list -->
    <div class="mx-auto w-11/12 max-w-4xl">
      <div class="mb-16">
        <!-- Loading state -->
        <div v-if="loading" class="flex justify-center items-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6209F6]"></div>
        </div>

        <!-- Blog posts and empty state -->
        <div v-else>
          <div class="space-y-4 md:space-y-6">
            <div v-for="post in blogData?.blogList || []" :key="post.id"
              class="block bg-gray-800/80 rounded-xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all border border-white/10 hover:border-[#6209F6] hover:-translate-y-1 cursor-pointer group backdrop-blur-xl"
              @click="navigateToBlog(post)">
              <div class="flex flex-col md:flex-row md:justify-between md:items-start gap-2 md:gap-4 mb-3 md:mb-4">
                <div class="flex-1 min-w-0">
                  <h2
                    class="text-lg md:text-xl font-bold mb-1 md:mb-2 text-slate-100 group-hover:text-[#83D0FB] transition-colors truncate">
                    {{ post.title }}</h2>
                  <p class="text-sm md:text-base text-slate-400 line-clamp-2">{{ post.abstract }}</p>
                </div>
                <span
                  class="px-3 py-1 bg-gradient-to-r from-[#6209F6]/80 to-[#83D0FB]/80 text-white text-xs md:text-sm rounded-full whitespace-nowrap inline-block w-fit font-medium">
                  {{ getCategoryLabel(post.class_id) }}
                </span>
              </div>
              <div class="text-slate-500 text-xs md:text-sm">
                {{ formatDate(post.created_time) }}
              </div>
            </div>
          </div>

          <!-- Empty state -->
          <div v-if="(blogData?.blogList || []).length === 0" class="text-center py-20">
            <h2 class="text-2xl font-bold text-slate-100 mb-4">No Blog Posts Found</h2>
            <p class="text-slate-400">No blog posts found in the current category.</p>
          </div>

          <!-- Pagination -->
          <div v-if="(blogData?.blogList || []).length > 0 && (blogData?.total || 0) > 20"
            class="mt-8 flex justify-center">
            <div class="flex items-center space-x-2">
              <!-- Previous page button -->
              <button @click="goToPage(currentPage - 1)" :disabled="currentPage <= 1"
                class="px-3 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                :class="currentPage <= 1 ? 'bg-gray-800 text-slate-600' : 'bg-gray-800/80 border border-white/10 text-slate-300 hover:bg-gray-700/70 hover:border-[#6209F6]'">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>

              <!-- Page numbers -->
              <div class="flex items-center space-x-1">
                <template v-for="page in visiblePages" :key="page">
                  <button v-if="page !== '...'" @click="goToPage(page)"
                    class="px-3 py-2 rounded-lg transition-all text-sm font-medium"
                    :class="page === currentPage ? 'bg-gradient-to-r from-[#6209F6]/50 to-[#83D0FB]/50 text-white shadow-md' : 'bg-gray-800/80 border border-white/10 text-slate-300 hover:bg-gray-700/70 hover:border-[#6209F6]'">
                    {{ page }}
                  </button>
                  <span v-else class="px-2 text-slate-500">...</span>
                </template>
              </div>

              <!-- Next page button -->
              <button @click="goToPage(currentPage + 1)" :disabled="currentPage >= computedTotalPages"
                class="px-3 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                :class="currentPage >= computedTotalPages ? 'bg-gray-800 text-slate-600' : 'bg-gray-800/80 border border-white/10 text-slate-300 hover:bg-gray-700/70 hover:border-[#6209F6]'">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Page info -->
          <div v-if="(blogData?.blogList || []).length > 0 && (blogData?.total || 0) > 20"
            class="mt-4 text-center text-sm text-slate-500">
            Showing {{ (currentPage - 1) * pageSize + 1 }} to {{ Math.min(currentPage * pageSize, blogData?.total || 0)
            }} of {{
              blogData?.total || 0 }} posts
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, type Ref, ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSeo } from '~/composables/useSeo'
import { getBlogCategoryList, getBlogList } from '~/api'
import PageHero from '~/components/PageHero.vue';
import Breadcrumbs from '~/components/Breadcrumbs.vue';

// 声明 Nuxt 3 内置函数类型
declare const useAsyncData: <T>(key: string, handler: () => Promise<T>) => Promise<{
  data: Ref<T | null>;
  error: Ref<any>;
  pending: Ref<boolean>;
  refresh: () => Promise<void>;
}>;

const router = useRouter()

const breadcrumbItems = ref([
  { text: 'MuseSteamer AI Blog' },
  // { text: 'Seedance AI Blog' } // 最后一项没有 'to' 属性
]);
useSeo({
  title: "MuseSteamer AI Blog: Latest News",
  description: "MuseSteamer AI Blog shares insights on AI video creation, audio features, and creative workflows. Stay updated with guides, news and tutorials.",
});

// 使用 useAsyncData 获取数据
const { data: initialData, refresh } = await useAsyncData(
  'blog-list',
  async () => {
    try {
      const [categoryResponse, listResponse] = await Promise.all([
        getBlogCategoryList(),
        getBlogList({
          page: 1,
          page_size: 20
        })
      ]);

      return {
        categoryList: categoryResponse.code === 200 ? categoryResponse.data : [],
        blogList: listResponse.code === 200 ? listResponse.data.list : [],
        total: listResponse.code === 200 ? listResponse.data.total : 0
      };
    } catch (err) {
      console.error('Failed to fetch initial blog data:', err);
      return {
        categoryList: [],
        blogList: [],
        total: 0
      };
    }
  }
);

// 响应式变量
const currentCategory = ref('')
const loading = ref(false)
const error = ref('')
const currentPage = ref(1)
const pageSize = ref(20)
const blogData = ref(initialData.value)

// 获取博客数据的函数
const fetchBlogData = async () => {
  loading.value = true
  error.value = ''

  try {
    // Build API parameters, supporting category filtering
    const apiParams: any = {
      page: currentPage.value,
      page_size: pageSize.value
    }

    // Add category parameter
    if (currentCategory.value) {
      apiParams.class_id = currentCategory.value
    }

    // Get blog list
    const getList = await getBlogList(apiParams) as any;
    if (getList.code === 200) {
      const newBlogData = {
        categoryList: blogData.value?.categoryList || [],
        blogList: getList.data.list || [],
        total: getList.data.total || 0
      }
      blogData.value = newBlogData
    }
  } catch (err: any) {
    error.value = err.message || 'Failed to load blog data'
    console.error('获取博客数据失败:', err)
  } finally {
    loading.value = false
  }
}

// 监听分页和分类变化，重新获取数据
watch([currentPage, currentCategory], async () => {
  if (process.client) {
    await fetchBlogData()
  }
})

// 计算属性
const allCategories = computed(() => {
  if (!blogData.value?.categoryList) return []
  return blogData.value.categoryList
})

// 计算总页数
const computedTotalPages = computed(() => {
  if (!blogData.value?.total) return 0
  return Math.ceil(blogData.value.total / pageSize.value)
})

// 计算可见的页码
const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const maxVisible = 5
  const current = currentPage.value
  const total = computedTotalPages.value

  if (total <= maxVisible) {
    // 如果总页数小于等于最大可见页数，显示所有页码
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // 否则显示部分页码
    if (current <= 3) {
      // 当前页在前3页
      for (let i = 1; i <= 4; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 2) {
      // 当前页在后3页
      pages.push(1)
      pages.push('...')
      for (let i = total - 3; i <= total; i++) {
        pages.push(i)
      }
    } else {
      // 当前页在中间
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }

  return pages
})

// 获取分类标签显示文本
const getCategoryLabel = (classId: number) => {
  if (!blogData.value?.categoryList) return 'Uncategorized'

  const category = blogData.value.categoryList.find((cat: any) => cat.id === classId)
  return category ? category.name : 'Uncategorized'
}

// 格式化日期
const formatDate = (timestamp: number) => {
  if (!timestamp) return ''
  const date = new Date(timestamp * 1000)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 处理分类变化
const handleCategoryChange = (categoryId: string) => {
  currentCategory.value = categoryId
  currentPage.value = 1 // 重置到第一页
}

// 跳转到指定页面
const goToPage = (page: number | string) => {
  const pageNum = typeof page === 'string' ? parseInt(page) : page
  if (pageNum >= 1 && pageNum <= computedTotalPages.value) {
    currentPage.value = pageNum
  }
}

// Navigate to blog detail page
const navigateToBlog = (post: any) => {
  const url = post.url.split('/')
  router.push(`/blog/${url[url.length - 1]}`)
}

// Set canonical URL when mounted
onMounted(() => {
  // Set default category to first available category
  if (allCategories.value.length > 0 && !currentCategory.value) {
    currentCategory.value = allCategories.value[0].id.toString()
  }

  // Add structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Midjourney Video Generator Blog",
    description: "Professional AI image generation and animation technology tutorials and insights",
    url: "https://www.omniHuman-15.com/blog",
    publisher: {
      "@type": "Organization",
      name: "Midjourney Video Generator",
      logo: {
        "@type": "ImageObject",
        url: "/logo.png"
      }
    }
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
});
</script>

<style></style>