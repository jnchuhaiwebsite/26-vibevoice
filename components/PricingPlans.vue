<template>
  <div
    class="py-16"
    style="background-color: var(--bg-color);"
    aria-labelledby="pricing-heading"
    id="pricing"
  >
    <div class="max-w-7xl mx-auto px-4">

      <h2
        class="text-center text-4xl font-bold mb-4"
        style="color: var(--text-color);"
      >
      Pricing Plan - VibeVoice

      </h2>
      <p class="text-center max-w-2xl mx-auto mb-12" style="color: var(--text-muted-color);">
        Try VibeVoice model for multi-speaker, long-form, high-quality conversational TTS.
      </p>

      <!-- Loading State -->
      <div v-if="pending" class="flex justify-center items-center py-20">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
          style="border-color: #6209F6;"
          aria-label="Loading pricing plans"
        ></div>
      </div>

      <!-- Pricing Cards -->
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        <!-- Loop over plan cards -->
        <article
          v-for="(plan, index) in data"
          :key="index"
          :class="[
            'rounded-xl p-8 flex flex-col',
            plan.is_popular
              ? 'border-2 shadow-lg relative'
              : 'border shadow-sm hover:shadow-md transition-shadow',
            plan.price === 0 ? 'hidden md:flex' : 'flex'
          ]"
          :style="{ 
            backgroundColor: 'var(--card-color)', 
            borderColor: plan.is_popular ? '#2563EB' : 'var(--border-color)' 
          }"
        >
          <div
            v-if="plan.is_popular"
            class="absolute -top-3 right-6 px-3 py-1 text-sm rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
          >
            Most Popular
          </div>
          <h3 class="text-2xl font-bold mb-2" style="color: var(--text-color);">
            {{ plan.name }}
          </h3>
          <p class="mb-6" style="color: var(--text-muted-color);">{{ plan.description }}</p>
          <div class="mb-6 text-center">
            <div class="bg-gradient-to-br from-banana-dark-bg to-gray-900 rounded-xl p-6 border border-white/10 shadow-sm">
              <div class="inline-flex items-baseline gap-2">
                <span class="text-4xl font-bold text-banana-primary-yellow">${{ plan.price }}</span>
                <span v-if="plan.price === 10" class="text-xl text-[#2563EB]/50 line-through">$12</span>
                <span v-if="plan.price === 30" class="text-xl text-[#2563EB]/50 line-through">$33</span>
                <span v-if="plan.price === 99" class="text-xl text-[#2563EB]/50 line-through">$129</span>
                <span class="text-sm text-white/50 font-medium bg-gray-800/80 px-3 py-1 rounded-full shadow-sm">one-time</span>
              </div>
            </div>
          </div>
          <!-- <ul class="space-y-3 mb-8" :aria-label="`${plan.name} plan features`">
            <li
              v-for="(feature, fIndex) in getPlanFeatures(plan)"
              :key="fIndex"
              class="flex items-center"
              style="color: var(--text-muted-color);"
            >
              <span class="mr-2" style="color: #83D0FB;" aria-hidden="true">✓</span>
              {{ feature }}
            </li>
          </ul> -->
          <div class="mt-auto">
            <button
              @click="plan.code ? handleUpgradePlan(plan) : null"
              :disabled="upgradingPlanId === plan.code"
              :class="['btn w-full py-3 ', getButtonClass(plan)]"
            >
              <div v-if="upgradingPlanId === plan.code" class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-current mr-2"></div>
              {{ plan.button_text }}
            </button>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { getSubPlans, payOrder } from "~/api/index";
import { useClerkAuth } from '~/utils/authHelper';
import { useUserStore } from '~/stores/user';
import { useUiStore } from '~/stores/ui';
import { useRouter } from 'vue-router';
import { useNuxtApp } from 'nuxt/app';

import { useAsyncData } from 'nuxt/app';
// 引入auth认证
const {
  isSignedIn
} = useClerkAuth();

// 引入stores和工具
const userStore = useUserStore();
const uiStore = useUiStore();
const router = useRouter();
const { $toast } = useNuxtApp() as any;

// 用户状态
const upgradingPlanId = ref<string | null>(null);

// 获取用户信息
const userInfo = computed(() => userStore.userInfo);

// 使用useAsyncData获取套餐数据
const { data, pending } = await useAsyncData('pricingPlans'+Math.random(), async () => {
  try {
    const res = await getSubPlans() as any;
    if (res.code === 200 && res.data) {
      return res.data;
    }
    return [];
  } catch (error) {
    console.error("Failed to get plan information:", error);
    return [];
  }
});

// 获取套餐特性列表
const getPlanFeatures = (plan: any): string[] => {
  if (!plan.features) return [];
  // 如果特性是字符串，按逗号分割
  if (typeof plan.features === 'string') {
    return plan.features.split(',').map((feature: string) => feature.trim());
  }
  // 如果已经是数组，直接返回
  return Array.isArray(plan.features) ? plan.features : [];
};

  // Get button class
const getButtonClass = (plan: any): string => {
  if (plan.is_popular) {
    return "bg-[#2563EB] hover:bg-[#1D4ED8] text-white";
  } else {
    return "btn-secondary";
  }
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
    $toast.info('Please login to continue with your purchase.');
    return false;
  }
  return true;
};

// 检查用户积分状态 - 参考MuseSteamer Hero组件
const checkUserCredits = () => {
  const remainingCredits = (userInfo.value?.free_limit ?? 0) + (userInfo.value?.remaining_limit ?? 0);
  if (remainingCredits <= 0) {
    $toast.info('Your credits are running low. Consider upgrading your plan for more credits.');
    return false;
  }
  return true;
};

// 验证套餐选择 - 参考MuseSteamer Hero组件的输入验证
const validatePlanSelection = (plan: any) => {
  if (!plan || !plan.code) {
    $toast.error('Invalid plan selected. Please try again.');
    return false;
  }
  
  if (plan.price <= 0) {
    $toast.info('This is a free plan. You can use it without payment.');
    return true;
  }
  
  return true;
};

// Handle plan upgrade - 改进的验证机制
const handleUpgradePlan = async (plan: any) => {
  // 1. 验证套餐选择
  if (!validatePlanSelection(plan)) {
    return;
  }

  // 2. 登录检查
  await withLoginCheck(async () => {
    // 3. 检查用户积分状态（可选，用于提示）
    checkUserCredits();

    // 4. 开始支付流程
    upgradingPlanId.value = plan.code;
    try {
      const response = (await payOrder({ price_id: plan.code })) as any;
      if (response.code === 200 && response.data?.url) {
        $toast.success('Redirecting to payment...');
        window.location.href = response.data.url;
      } else {
        throw new Error(response.msg || "Failed to create payment order");
      }
    } catch (error: any) {
      console.error("Payment failed:", error);
      $toast.error(error.message || 'Payment failed. Please try again.');
    } finally {
      upgradingPlanId.value = null;
    }
  });
};
</script>

<style scoped>
.btn-secondary {
  background-color: var(--card-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}
.btn-secondary:hover {
  border-color: #83D0FB;
}
</style> 