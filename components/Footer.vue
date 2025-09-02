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

      <!-- 分割线 -->
      <div class="w-full h-px  mb-8 border-t border-white/30" v-if="partnerSites && partnerSites.length > 0"></div>

      <!-- 主要内容区域 -->
      <div class="flex flex-col md:flex-row md:justify-center gap-8 md:gap-16 mobile-footer-links">
        <!-- Logo 和描述 -->
        <div class="flex-1">
          <div class="flex flex-col items-center text-center">
            <NuxtLink to="/" title="OmniHuman Home">
              <svg width="200" height="40" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="50%" x2="100%" y2="50%">
                      <stop offset="0%" stop-color="#FFFFFF" />
                      <stop offset="100%" stop-color="#E0E0E0" />
                    </linearGradient>
                  </defs>
                  <text x="10" y="30" font-family="Montserrat, sans-serif" font-size="24" fill="url(#logoGradient)">
                    <tspan font-weight="normal">Omni</tspan><tspan font-weight="bold" fill="#ff4081">Human</tspan>
                  </text>
              </svg>
            </NuxtLink>
            <p class="max-w-xl mx-auto mb-4 text-sm">
              Unleash your creativity with OmniHuman, the advanced AI video generator. Transform static images into
              stunning, cinematic videos with simple text prompts. Start creating for free!
            </p>
            <div class="text-sm">
              <p>© 2025 OmniHuman All rights reserved.</p>
              <p>
                <a href="mailto:support@omniHuman-15.com" class="footer-link" title="Email">support@omniHuman-15.com</a>
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