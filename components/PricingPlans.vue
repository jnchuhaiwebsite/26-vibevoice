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
        MuseSteamer AI Video Pricing
      </h2>
      <p class="text-center max-w-2xl mx-auto mb-12" style="color: var(--text-muted-color);">
        Discover MuseSteamer AI pricing for Turbo, Pro, Lite and Audio editions. Flexible plans for cinematic AI video creation with sound from MuseSteamer. Get your MuseSteamer AI Video plan today.
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
            borderColor: plan.is_popular ? '#DC8AF6' : 'var(--border-color)' 
          }"
        >
          <div
            v-if="plan.is_popular"
            class="absolute -top-3 right-6 px-3 py-1 text-sm rounded-full"
            style="background: var(--primary-gradient); color: white;"
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
                <span v-if="plan.price === 10" class="text-xl text-[#DC8AF6]/50 line-through">$12</span>
                <span v-if="plan.price === 30" class="text-xl text-[#DC8AF6]/50 line-through">$33</span>
                <span v-if="plan.price === 99" class="text-xl text-[#DC8AF6]/50 line-through">$129</span>
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
              :class="['btn w-full py-3', getButtonClass(plan)]"
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
import { ref } from "vue";
import { getSubPlans, payOrder } from "~/api/index";
import { useClerkAuth } from '~/utils/authHelper';

import { useAsyncData } from 'nuxt/app';
// 引入auth认证
const {
  isSignedIn
} = useClerkAuth();

// 用户状态
const upgradingPlanId = ref<string | null>(null);

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
    return "btn-primary";
  } else {
    return "btn-secondary";
  }
};

// Handle plan upgrade
const handleUpgradePlan = async (plan: any) => {
  // 如果没有登录，则提示登录并触发登录
  if (!isSignedIn.value) {
    try {
      const loginBtn = document.querySelector('#bindLogin') as HTMLElement;
      if (loginBtn) {
        loginBtn.click();
      }
    } catch (error) {
      console.error("Failed to find login:", error);
    }
    return;
  }

  upgradingPlanId.value = plan.code;
  try {
    const response = (await payOrder({ price_id: plan.code })) as any;
    if (response.code === 200 && response.data?.url) {
      window.location.href = response.data.url;
    } else {
      throw new Error(response.msg || "Failed to create payment order");
    }
  } catch (error) {
    console.error("Payment failed:", error);
  } finally {
    upgradingPlanId.value = null;
  }
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