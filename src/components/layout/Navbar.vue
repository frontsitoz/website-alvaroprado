<script setup lang="ts">
import logo from "@/assets/images/logo.svg";

const links = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
</script>

<template>
  <header
    class="w-full bg-nav-bg/90 backdrop-blur-md py-4 px-6 flex items-center justify-between"
  >
    <!-- Logo -->
    <div class="flex items-center gap-2">
      <img
        :src="logo"
        alt="Logo Alvaro Prado"
        class="h-10 w-auto md:h-12 flex-shrink-0"
      />
    </div>

    <!-- Nav links -->
    <nav class="flex gap-8 text-sm font-medium">
      <a
        v-for="link in links"
        :key="link.href"
        :href="link.href"
        class="text-white/70 hover:text-white transition-colors"
      >
        {{ link.label }}
      </a>
    </nav>
  </header>
</template>
