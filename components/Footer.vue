<template>
  <footer
    class="relative bg-banana-dark-bg text-banana-text-muted py-8 md:py-12 pt-8 border-t border-banana-border-color/30 mobile-footer">
    <div class="max-w-6xl mx-auto px-4 mobile-padding">

      <!-- 友情链接区域 -->
      <div class="mb-8" v-if="partnerSites && partnerSites.length > 0">
        <div class="text-banana-text-light font-medium mb-4 text-left text-sm md:text-lg">Partner Sites</div>
        <div class="flex flex-wrap gap-x-6 gap-y-2">
          <a v-for="(item, index) in partnerSites" :key="index" :href="item.url" target="_blank"
            rel="noopener noreferrer"
            :title="item.url"
            class="text-banana-text-muted hover:text-banana-primary-yellow transition-colors text-sm">
            {{ item.name }}
          </a>
        </div>
      </div>
      <div class="w-full h-px  mb-8 border-t border-white/30" v-if="partnerSites && partnerSites.length > 0"></div>

      <!-- 主要内容区域 -->
      <div class="flex flex-col md:flex-row md:justify-center gap-8 md:gap-16 mobile-footer-links">
        <!-- Logo 和描述 -->
        <div class="flex-1">
          <div class="flex flex-col items-center text-center">
            <NuxtLink to="/" title="VibeVoice Home"  class="flex items-center">
              <img src="/favicon.ico" alt="VibeVoice Logo" class="h-8 w-8 mr-2">
              <svg width="160" height="40" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="logo-gradient-footer" x1="0" y1="20" x2="160" y2="20" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#6A11CB"/>
                    <stop offset="1" stop-color="#2575FC"/>
                  </linearGradient>
                </defs>
                <text x="0" y="30" font-family="Inter, sans-serif" font-size="28" font-weight="900" letter-spacing="-0.05em" fill="url(#logo-gradient-footer)">
                  VibeVoice
                </text>
              </svg>
            </NuxtLink>
            <p class="max-w-xl mx-auto mb-4 text-sm">
              The open-source future of voice. Use responsibly. Do not generate harmful or misleading content.
            </p>
            <div class="text-sm">
              <p>© 2025 VibeVoice Project. All rights reserved.</p>
              <p>
                <a href="mailto:support@vibeVoices.net" class="footer-link" title="Email">support@vibeVoices.net</a>
              </p>
            </div>
          </div>
        </div>

        <!-- 导航链接和法律条款 -->
        <!-- <div class="flex-1 flex flex-col sm:flex-row gap-6 md:gap-8 md:justify-end">

          <div class="flex-1 text-center md:text-right">
            <div class="text-banana-text-light font-medium mb-4 text-sm md:text-lg">Legal</div>
            <div class="flex flex-col gap-2 items-center md:items-end">
              <NuxtLink to="/subsidiary/privacy-policy"
                title="Privacy Policy"
                class="text-banana-text-muted hover:text-banana-primary-yellow transition-colors">Privacy Policy
              </NuxtLink>
              <NuxtLink to="/subsidiary/terms-of-service"
                title="Terms of Service"
                class="text-banana-text-muted hover:text-banana-primary-yellow transition-colors">Terms of Service
              </NuxtLink>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// 保留现有的脚本逻辑
import { ref } from 'vue'
import { useNavigation } from '~/utils/navigation'
import { getFriendLinkList } from '~/api'
import { useAsyncData } from 'nuxt/app'

interface PartnerSite {
  url: string
  name: string
}

const { activeSection, sections, handleNavClick, handleScroll, footerSections, productsSections } = useNavigation()

// 处理链接点击，支持新标签页打开
const handleLinkClick = (href: string, openInNewTab?: boolean) => {
  if (openInNewTab) {
    window.open(href, '_blank', 'noopener,noreferrer');
  }
};

// 服务端请求友情链接
const { data: partnerSites, error } = await useAsyncData('partnerSites', async () => {
  const res = await getFriendLinkList()
  if (res.code === 200) {
    return res.data as PartnerSite[]
  }
  return []
})
</script>


<style scoped>
.footer-link {
  color: var(--text-muted-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #83D0FB;
}
</style>