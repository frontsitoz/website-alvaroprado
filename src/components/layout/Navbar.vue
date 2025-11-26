<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import logo from "/logo.svg";

const { locale, t } = useI18n();

const isOpen = ref(false);

const changeLang = () => {
  locale.value = locale.value === "es" ? "en" : "es";
};

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const closeMenu = () => {
  isOpen.value = false;
};

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
  closeMenu();
};
</script>

<template>
  <header
    class="fixed top-0 left-0 w-full bg-nav-bg/90 backdrop-blur-xl z-50 border-b border-white/10 shadow-[0_0_15px_rgba(80,120,255,0.12)]"
  >
    <nav
      class="max-w-6xl mx-auto flex items-center justify-between px-8 py-4 md:px-10 md:py-5"
    >
      <!-- Logo -->
      <button class="flex items-center group" @click="scrollToSection('hero')">
        <img :src="logo" alt="Logo Álvaro" class="w-16 h-auto object-contain" />
      </button>

      <!-- Desktop menu -->
      <div class="hidden md:flex items-center gap-10 text-[17px]">
        <button class="nav-item" @click="scrollToSection('hero')">
          {{ t("navbar.home") }}
        </button>
        <button class="nav-item" @click="scrollToSection('experience')">
          {{ t("navbar.experience") }}
        </button>
        <button class="nav-item" @click="scrollToSection('projects')">
          {{ t("navbar.projects") }}
        </button>
        <button class="nav-item" @click="scrollToSection('tech')">
          {{ t("navbar.tech") }}
        </button>
        <button class="nav-item" @click="scrollToSection('contact')">
          {{ t("navbar.contact") }}
        </button>

        <button
          @click="changeLang"
          class="px-4 py-1.5 border border-white/30 rounded-md text-xs tracking-wide hover:bg-white/10 transition"
        >
          {{ locale === "es" ? t("navbar.langEn") : t("navbar.langEs") }}
        </button>
      </div>

      <!-- Hamburguesa -->
      <button
        class="md:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
        @click="toggleMenu"
      >
        <span
          class="block w-5 h-0.5 bg-white rounded-sm transition"
          :class="{ 'rotate-45 translate-y-1.5': isOpen }"
        />
        <span
          class="block w-5 h-0.5 bg-white rounded-sm my-1 transition"
          :class="{ 'opacity-0': isOpen }"
        />
        <span
          class="block w-5 h-0.5 bg-white rounded-sm transition"
          :class="{ '-rotate-45 -translate-y-1.5': isOpen }"
        />
      </button>
    </nav>

    <!-- MOBILE MENU -->
    <transition name="menu-slide">
      <div
        v-if="isOpen"
        class="md:hidden bg-nav-bg/98 border-t border-white/10"
      >
        <div
          class="max-w-6xl mx-auto px-6 py-6 space-y-4 text-center text-base"
        >
          <button class="mobile-link" @click="scrollToSection('hero')">
            {{ t("navbar.home") }}
          </button>
          <button class="mobile-link" @click="scrollToSection('experience')">
            {{ t("navbar.experience") }}
          </button>
          <button class="mobile-link" @click="scrollToSection('projects')">
            {{ t("navbar.projects") }}
          </button>
          <button class="mobile-link" @click="scrollToSection('tech')">
            {{ t("navbar.tech") }}
          </button>
          <button class="mobile-link" @click="scrollToSection('contact')">
            {{ t("navbar.contact") }}
          </button>

          <button
            @click="changeLang"
            class="mt-4 px-4 py-1 border border-white/30 rounded-md text-xs tracking-wide hover:bg-white/10 transition"
          >
            {{ locale === "es" ? t("navbar.langEn") : t("navbar.langEs") }}
          </button>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.nav-item {
  @apply text-white/80 hover:text-white transition cursor-pointer;
  position: relative;
  padding-bottom: 3px;
}

.nav-item::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0%;
  height: 2px;
  background: #6ba4ff;
  transition: width 0.25s ease-out;
  border-radius: 2px;
}

.nav-item:hover::after {
  width: 100%;
}

.mobile-link {
  @apply block text-white/80 hover:text-white transition;
}

/* MENU SLIDE ANIMATION */
.menu-slide-enter-active {
  animation: fadeDown 0.22s ease-out;
}
.menu-slide-leave-active {
  animation: fadeUp 0.16s ease-out forwards;
}
@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeUp {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-6px);
  }
}
</style>
