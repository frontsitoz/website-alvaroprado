<script setup lang="ts">
const tech = [
  "Vue 3",
  "TypeScript",
  "Tailwind CSS",
  "JavaScript",
  "Vite",
  "Git / GitHub",
];
</script>

<template>
  <section class="mt-20 space-y-6 text-center" data-aos="fade-up" id="tech">
    <p class="text-sm text-white/70">
      I'm currently looking to join a
      <span class="text-accent-soft font-semibold">cross-functional team</span>
      that values improving people's lives through accessible design.
    </p>

    <!-- Glow + tech pills -->
    <div class="relative mt-8 flex justify-center">
      <div
        class="absolute inset-x-0 -top-10 mx-auto h-40 w-72 rounded-full bg-accent-soft/40 blur-3xl opacity-70"
        aria-hidden="true"
      ></div>

      <div
        class="relative flex flex-wrap justify-center gap-3 max-w-xl mx-auto"
      >
        <span
          v-for="item in tech"
          :key="item"
          class="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white/80 backdrop-blur-sm"
          data-aos="zoom-in"
          data-aos-delay="120"
        >
          {{ item }}
        </span>
      </div>
    </div>
  </section>
</template>
