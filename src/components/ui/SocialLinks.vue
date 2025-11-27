<script setup lang="ts">
const links = [
  { icon: "fa-brands fa-github", url: "https://github.com/frontsitoz" },
  {
    icon: "fa-brands fa-linkedin",
    url: "https://linkedin.com/in/alvaro-prado",
  },
  { icon: "fa-solid fa-envelope", url: "mailto:alvarojpt04.ws@gmail.com" },
];
</script>

<template>
  <div class="flex gap-4 text-2xl mt-4">
    <a
      v-for="item in links"
      :key="item.url"
      :href="item.url"
      target="_blank"
      class="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-accent hover:border-accent transition"
    >
      <i :class="item.icon"></i>
    </a>
  </div>
</template>
