<template>
  <section class="min-h-screen bg-[#0B0B12] text-white relative overflow-hidden pt-48">
    <div class="aurora-background"></div>
    <div class="container mx-auto px-6 relative z-10 pt-48">
      <h1 class="text-5xl md:text-5xl leading-tight tracking-tighter text-white text-center">
        VibeVoice Pricing
      </h1>
      <p class="mt-6 text-xl text-[#D1D5DB] max-w-3xl mx-auto text-center mb-12">
        Plans designed to fuel your creativity, from your first word to your global broadcast. Find the perfect fit and start creating today.
      </p>


      <!-- Loading State -->
      <div v-if="pending" class="flex justify-center items-center py-20 w-full" aria-live="polite">
        <div
          class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
          style="border-color: #6209F6;"
          aria-label="Loading pricing plans"
        ></div>
      </div>

      <!-- Pricing Plans -->
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto place-items-stretch"
        aria-label="Pricing plans"
      >
        <!-- Loop over plan cards -->
        <article
          v-for="(plan, index) in planData"
          :key="index"
          :class="[
            'relative rounded-xl p-6 flex flex-col h-full card-glow',
            plan.is_popular
              ? 'border-2 shadow-2xl scale-105 z-10'
              : 'border shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300',
            plan.price === 0 ? 'hidden md:flex' : 'flex'
          ]"
          :style="{
            backgroundColor: '#1F2937',
            borderColor: plan.is_popular ? '#2563EB' : '#1F2937'
          }"
          :aria-labelledby="`plan-${index}-title`"
        >
          <!-- Popular Tag -->
          <div
            v-if="plan.is_popular"
            class="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 text-sm font-semibold rounded-full z-20 shadow-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
            aria-label="Most popular plan"
          >
            ⭐ Most Popular
          </div>

          <!-- Plan Title -->
          <div class="text-center mb-6">
            <h3 
              :id="`plan-${index}-title`"
              class="text-2xl font-bold mb-3 text-white"
            >
              {{ plan.name }}
            </h3>
            <p class="text-sm leading-relaxed text-[#D1D5DB]" v-html="plan.description"></p>
          </div>

          <!-- Price Info -->
          <div class="mb-6 text-center">
            <div class="rounded-xl p-6 border shadow-sm bg-gradient-to-br from-gray-800 to-gray-900 border-white/10">
              <div class="inline-flex items-baseline gap-2">
                <span class="text-4xl font-bold text-white">${{ plan.price }}</span>
                <span v-if="plan.price === 9.9" class="text-xl line-through text-[#2563EB]/50">$12</span>
                <span v-if="plan.price === 29.9" class="text-xl line-through text-[#2563EB]/50">$33</span>
                <span v-if="plan.price === 79.9" class="text-xl line-through text-[#2563EB]/50">$86</span>
                <span class="text-sm font-medium px-3 py-1 rounded-full shadow-sm bg-gray-800/80 text-white/50">one-time</span>
              </div>
            </div>
          </div>

          <!-- Action Button -->
          <div class="mb-8">
            <button
              @click="plan.code ? handleUpgradePlan(plan) : null"
              :disabled="upgradingPlanId === plan.code"
              :class="[
                'btn w-full py-4 px-6 text-base',
                getButtonClass(plan),
              ]"
              :aria-describedby="`plan-${index}-title`"
            >
              <div v-if="upgradingPlanId === plan.code" class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-current mr-2" aria-hidden="true"></div>
              {{ plan.button_text }}
            </button>
          </div>

          <!-- Features List -->
          <div class="flex-grow" :aria-label="`${plan.name} plan features`">
            <ul class="space-y-4">
              <li
                v-for="(feature, fIndex) in getPlanFeatures(plan)"
                :key="fIndex"
                class="flex items-start text-[#D1D5DB]"
              >
                <span class="mr-3 font-bold text-lg flex-shrink-0 mt-0.5 text-[#2563EB]" aria-hidden="true">✓</span>
                <span class="text-sm leading-relaxed" v-html="feature"></span>
              </li>
            </ul>
          </div>
        </article>
      </div>

      <!-- How Credits Work -->
      <!-- <div class="mt-20 py-12 rounded-xl border shadow-lg bg-[#1F2937] border-[#1F2937]">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold sm:text-4xl text-white">How Do Credits Work?</h2>
            <p class="mt-4 text-lg text-[#D1D5DB]">
              Credits are the universal currency for creating with VibeVoice. Use them for various actions like generating podcasts or accessing advanced features. Your credit balance is deducted based on your usage.
            </p>
            <div class="mt-6 inline-block px-4 py-2 rounded-lg border bg-[#0B0B12] border-[#1F2937]">
              <p class="text-base font-medium text-white">Example: 1 Standard Podcast Generation = 1 Credit.</p>
            </div>
          </div>
        </div>
      </div> -->

      <!-- FAQ -->
      <div class="mt-16 py-12">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold sm:text-4xl text-white">Frequently Asked Questions</h2>
            <p class="mt-6 text-xl text-[#D1D5DB] max-w-6xl mx-auto">
              Clear answers to your questions about VibeVoice plans, credits, and billing. Need more help? Email us at <a href="mailto:support@vibeVoices.net" class="text-[#2563EB] hover:underline">support@vibeVoices.net</a>.
            </p>
          </div>
          <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
            <div v-for="(faq, index) in faqs" :key="index" class="rounded-lg p-6 border transition-all duration-300 bg-[#1F2937] border-[#1F2937] card-glow">
              <h3 class="font-semibold text-lg flex items-start text-white">
                <span class="font-bold mr-3 text-[#2563EB]">{{ String(index + 1).padStart(2, '0') }}</span>
                <span>{{ faq.question }}</span>
              </h3>
              <p class="mt-4 pl-8 text-[#D1D5DB]">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { getSubPlans, payOrder } from "~/api/index";
import { useClerkAuth } from '~/utils/authHelper';
import { useSeo } from '~/composables/useSeo';
import { useAsyncData } from 'nuxt/app';
import PageHero from '~/components/PageHero.vue';

// FAQ data
const faqs = ref([
  {
    question: 'Is this a one-time payment? Are there any other fees?',
    answer: 'Absolutely. This is a one-time payment for the credits themselves. There are no subscription fees, monthly charges, or any hidden costs involved.'
  },
  {
    question: 'Do the purchased credits expire?',
    answer: 'No, they don\'t. All credits you purchase are valid forever. You can use them whenever you like, with no time restrictions.'
  },
  {
    question: 'How are credits consumed?',
    answer: 'Every credit puts our powerful voice engine to work for you, with costs calculated simply by the number of characters in your text.'
  },
  {
    question: 'What if I run out of credits?',
    answer: 'You can always return to this page to purchase more credit packages. You can buy any package as many times as you need, and the credits will be added to your existing balance.'
  },
  {
    question: 'Where can I check my remaining credits?',
    answer: 'Once you\'re logged in, your remaining credit balance will always be prominently displayed on your personal account dashboard or within the creation interface.'
  },
  {
    question: 'What payment methods are supported?',
    answer: 'We use Stripe as our payment processing partner. Through Stripe, we securely accept all major credit cards, such as Visa, MasterCard, and American Express. Your payment information is handled directly by Stripe, and we do not store any sensitive card details.'
  }
]);

// 定义套餐数据类型
interface PricingPlan {
  name: string;
  description: string;
  price: number;
  code: string;
  button_text: string;
  is_popular: boolean;
  features: string | string[];
}

// 设置SEO
useSeo({
  title: 'Pricing Plan - VibeVoice',
  description: 'Try VibeVoice model for multi-speaker, long-form, high-quality conversational TTS.',
});

// 引入auth认证
const {
  isSignedIn
} = useClerkAuth();

// 用户状态
const upgradingPlanId = ref<string | null>(null);

// 使用useAsyncData获取套餐数据
const { data, pending, error } = await useAsyncData('pricingPlans', async () => {
  try {
    const response = await getSubPlans();
    return response.data as PricingPlan[];
  } catch (err) {
    console.error('Error fetching pricing plans:', err);
    throw err;
  }
}, {
  // immediate: true
});

// 监听数据变化
watch(data, (newData) => {
  console.log('Pricing data updated:', newData);
});

// 计算属性：确保data有值时才返回
const planData = computed(() => {
  return data.value || [];
});

// 获取套餐特性列表
const getPlanFeatures = (plan: PricingPlan): string[] => {
  if (!plan.features) return [];
  // 如果特性是字符串，按逗号分割
  if (typeof plan.features === 'string') {
    return plan.features.split(',').map((feature: string) => feature.trim());
  }
  // 如果已经是数组，直接返回
  return Array.isArray(plan.features) ? plan.features : [];
};

  // Get button class
const getButtonClass = (plan: PricingPlan): string => {
  if (plan.is_popular) {
    return "bg-[#2563EB] hover:bg-[#1D4ED8] text-white";
  } else {
    return "btn-secondary bg-[#2563EB]/50";
  }
};

// Handle plan upgrade
const handleUpgradePlan = async (plan: PricingPlan) => {
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
<style>
.btn-secondary {
  /* background-color: #1F2937; */
  color: white;
  border: 1px solid #1F2937;
}
.btn-secondary:hover {
  border-color: #2563EB;
  background-color: #2563EB;
}
</style> 