<script setup lang="ts">
const experiences = [
  {
    title: "CIB on the Mobile",
    description:
      "A product designed to streamline banking processes through modern mobile interfaces.",
    icon: "🚀",
  },
  {
    title: "CIB on the Mobile",
    description:
      "Enhancing the digital transformation journey through accessible and usable design.",
    icon: "💡",
  },
  {
    title: "CIB on the Mobile",
    description:
      "Creating digital experiences that bridge user needs with business goals.",
    icon: "🪐",
  },
  {
    title: "CIB on the Mobile",
    description:
      "Focusing on simplicity and delight for a wide range of users.",
    icon: "🔮",
  },
];
</script>

<template>
  <section
    id="experience"
    class="mt-16 sm:mt-24 space-y-8 sm:space-y-10"
    data-aos="fade-up"
  >
    <!-- Title -->
    <h2 class="text-3xl font-semibold">Work Experience</h2>

    <!-- Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      <div
        v-for="(item, index) in experiences"
        :key="index"
        data-aos="fade-up"
        :data-aos-delay="index * 120"
        class="bg-bg-card/80 border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-glow transition-all backdrop-blur-sm"
      >
        <div class="text-4xl">{{ item.icon }}</div>

        <h3 class="text-lg font-semibold mt-4">
          {{ item.title }}
        </h3>

        <p class="text-sm text-white/70 mt-2">
          {{ item.description }}
        </p>

        <button
          class="mt-4 px-4 py-2 text-xs bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        >
          Learn more
        </button>
      </div>
    </div>
  </section>
</template>
