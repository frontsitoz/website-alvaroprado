<script setup lang="ts">
const links = [
  { icon: "fa-brands fa-github", url: "https://github.com/frontsitoz" },
  {
    icon: "fa-brands fa-linkedin",
    url: "https://www.linkedin.com/in/alvaro-prado-tenorio/",
  },
  {
    icon: "fa-solid fa-envelope",
    url: "https://mail.google.com/mail/?view=cm&fs=1&to=alvarojpt04.ws@gmail.com",
  },
];

const isExternal = (url: string) => url.startsWith("http");
</script>

<template>
  <div class="flex gap-4 text-2xl mt-4">
    <a
      v-for="item in links"
      :key="item.url"
      :href="item.url"
      :target="isExternal(item.url) ? '_blank' : undefined"
      :rel="isExternal(item.url) ? 'noopener noreferrer' : undefined"
      class="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:text-accent hover:border-accent transition"
    >
      <i :class="item.icon"></i>
    </a>
  </div>
</template>
