<template>
  <div class="min-h-screen bg-banana-dark-bg text-banana-text-light font-['Inter']">
    <div class="max-w-4xl mx-auto px-4 py-12">
      <div class="mb-6">
        <NuxtLink to="/"
          class="flex items-center text-banana-text-muted hover:text-banana-primary-yellow transition-colors duration-200">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </NuxtLink>
      </div>


      <div class="space-y-6 text-banana-text-muted leading-normal">
        <section>
          <h1 class="text-4xl lg:text-5xl font-extrabold leading-tight mb-8 text-banana-text-light">Privacy Policy</h1>
          <p class="text-banana-text-muted mb-8 text-lg">Effective Date: August 29,2025</p>


          <h2 class="text-2xl font-bold mb-4 text-banana-primary-yellow">1. Introduction</h2>
          <p>Welcome to MuseSteamer AI. This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you use our AI-powered video generation and editing service ("Service").</p>


          <h2 class="text-2xl font-bold mt-8 mb-4 text-banana-primary-yellow">2. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul class="list-disc pl-6 mt-4 space-y-2">
            <li><strong class="text-banana-text-light">Account Information:</strong> Your email address, password, and
              profile details when you register an account.</li>
            <li><strong class="text-banana-text-light">User Content:</strong> Text prompts you provide for video
              generation, images you upload, and audio files you may provide for synchronization.</li>
            <li><strong class="text-banana-text-light">Usage Data:</strong> Information about how you interact with our
              Service, such as generation parameters, features used, device information, and IP address.</li>
            <li><strong class="text-banana-text-light">Payment Information:</strong> Credit card details and billing
              information, processed securely by our third-party payment processors if you subscribe to a paid plan.
            </li>
          </ul>

          <h2 class="text-2xl font-bold mt-8 mb-4 text-banana-primary-yellow">3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul class="list-disc pl-6 mt-4 space-y-2">
            <li>Provide, maintain, and improve our video generation and editing services.</li>
            <li>Process your requests, generations, and transactions.</li>
            <li>Train, enhance, and fine-tune our AI models to provide better and more accurate video and audio outputs.
            </li>
            <li>Communicate with you, including sending service notifications, updates, and marketing materials (you can
              opt-out).</li>
            <li>Respond to your comments, questions, and support requests.</li>
            <li>Enforce our terms of service and prevent fraudulent or prohibited use of the Service.</li>
          </ul>

          <h2 class="text-2xl font-bold mt-8 mb-4 text-banana-primary-yellow">4. Data Retention and Deletion</h2>
          <p>We retain your account information as long as your account is active. Generated and edited videos are
            stored in your personal gallery. You have the right to delete your content or your entire account. Text
            prompts and audio data may be retained for service improvement purposes and will be anonymized where
            possible.</p>

          <h2 class="text-2xl font-bold mt-8 mb-4 text-banana-primary-yellow">5. Information Sharing</h2>
          <p>We do not sell your personal information. We may share information with:</p>
          <ul class="list-disc pl-6 mt-4 space-y-2">
            <li>Third-party service providers who assist us in operating our platform (e.g., cloud hosting, payment
              processing).</li>
            <li>Legal authorities if required by law or to protect the rights and safety of MuseSteamer AI and our
              users.</li>
            <li>Other parties in connection with a corporate transaction, such as a merger, acquisition, or sale of
              assets.</li>
          </ul>

          <h2 class="text-2xl font-bold mt-8 mb-4 text-banana-primary-yellow">6. Your Rights and Choices</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including the
            right to:</p>
          <ul class="list-disc pl-6 mt-4 space-y-2">
            <li>Access the personal information we hold about you.</li>
            <li>Request corrections to inaccurate information.</li>
            <li>Request the deletion of your personal information.</li>
            <li>Export your data in a machine-readable format.</li>
            <li>Opt out of certain data processing activities.</li>
          </ul>
          <p class="mt-4">To exercise these rights, please contact our support team at <a
              href="mailto:support@musesteamer2.com"
              class="text-banana-secondary-blue hover:underline">support@musesteamer2.com</a>.</p>

          <h2 class="text-2xl font-bold mt-8 mb-4 text-banana-primary-yellow">7. Security</h2>
          <p>We implement industry-standard technical and organizational measures to protect your information from
            unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic
            storage is 100% secure.</p>

          <h2 class="text-2xl font-bold mt-8 mb-4 text-banana-primary-yellow">8. Children's Privacy</h2>
          <p>Our Service is not intended for individuals under the age of 13. We do not knowingly collect personal
            information from children under 13.</p>

          <h2 class="text-2xl font-bold mt-8 mb-4 text-banana-primary-yellow">9. Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any significant changes by
            posting the new policy on this page and, where appropriate, through other channels like email.</p>

          <h2 class="text-2xl font-bold mt-8 mb-4 text-banana-primary-yellow">10. Contact Us</h2>
          <p>If you have any questions or concerns about this Privacy Policy, please do not hesitate to contact us at:
            <a href="mailto:support@musesteamer2.com"
              class="text-banana-secondary-blue hover:underline">support@musesteamer2.com</a></p>

              <p class="text-sm mt-8">Last updated: August 29,2025</p>
        </section>


      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSeo } from '~/composables/useSeo';

// @ts-ignore: Nuxt宏函数
definePageMeta({
  name: 'privacy-policy'
})

useSeo({
  title: 'MuseSteamer AI | Privacy Policy',
  description: 'Read our privacy policy for using MuseSteamer AI - the premier platform for image-to-video generation and AI-powered video editing.'
})
</script>

<style>
/* 移除不必要的全局样式，使用tailwind类名代替 */
</style>