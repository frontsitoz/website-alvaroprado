<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import BaseContainer from "@/components/layout/BaseContainer.vue";

import vueLogo from "@/assets/images/logos-tech/vue.svg";
import tsLogo from "@/assets/images/logos-tech/ts.svg";
import jsLogo from "@/assets/images/logos-tech/js.svg";
import tailwindLogo from "@/assets/images/logos-tech/tailwind.svg";
import htmlLogo from "@/assets/images/logos-tech/html.svg";
import cssLogo from "@/assets/images/logos-tech/css.svg";
import gitLogo from "@/assets/images/logos-tech/git.svg";
import sassLogo from "@/assets/images/logos-tech/sass.svg";
import figmaLogo from "@/assets/images/logos-tech/figma.svg";

const { t } = useI18n();

type Tech = {
  name: string;
  logo: string;
};

const stack: Tech[] = [
  { name: "Vue.js", logo: vueLogo },
  { name: "TypeScript", logo: tsLogo },
  { name: "JavaScript", logo: jsLogo },
  { name: "Tailwind CSS", logo: tailwindLogo },
  { name: "HTML", logo: htmlLogo },
  { name: "CSS", logo: cssLogo },
  { name: "Sass (SCSS)", logo: sassLogo },
  { name: "Git", logo: gitLogo },
  { name: "Figma", logo: figmaLogo },
];

// visibilidad con transition fade-slide
const visible = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        visible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.1 }
  );
  const section = document.getElementById("tech");
  if (section) observer.observe(section);
});
</script>

<template>
  <section
    id="tech"
    :class="[
      'scroll-mt-40 py-24 transition-all duration-700',
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12',
    ]"
  >
    <BaseContainer>
      <h2 class="text-3xl md:text-4xl font-semibold mb-6">
        {{ t("tech.title") }}
      </h2>

      <p class="text-white/70 max-w-2xl mb-10 leading-relaxed">
        {{ t("tech.description") }}
      </p>

      <div class="flex flex-wrap gap-4">
        <div
          v-for="tech in stack"
          :key="tech.name"
          class="tech-chip transform transition-all duration-300 hover:-translate-y-1 hover:scale-105"
        >
          <img :src="tech.logo" :alt="tech.name" class="w-7 h-7" />
          <span class="text-[15px] font-medium tracking-wide">{{
            tech.name
          }}</span>
        </div>
      </div>
    </BaseContainer>
  </section>
</template>

<style scoped>
.tech-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 14px;
  background: rgba(120, 160, 255, 0.12);
  border: 1px solid rgba(120, 160, 255, 0.28);
  backdrop-filter: blur(6px);
  cursor: default;
  box-shadow: 0 0 12px rgba(120, 160, 255, 0.15);
  transition: 0.25s ease;
}
.tech-chip:hover {
  background: rgba(140, 180, 255, 0.25);
  border-color: rgba(180, 220, 255, 0.9);
  box-shadow: 0 0 18px rgba(120, 160, 255, 0.35);
}
</style>
