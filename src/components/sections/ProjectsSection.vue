<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref, onMounted, computed } from "vue";

import BaseContainer from "@/components/layout/BaseContainer.vue";
import andeswarmiFull from "../../assets/projects/page-andeswarmi.png";

type ProjectItem = {
  slug: string;
  title: string;
  role: string;
  subtitle: string;
  description: string;
  level: string;
  tags: string[];
  link: string;
};
const { t, tm } = useI18n();

//  Trae el array como objeto (no string) y tipado
const project = computed(() => {
  const items = tm("projects.items") as ProjectItem[];
  return items[0];
});

// detecta cuando aparece en viewport 👇
const visible = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        visible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.15 }
  );

  const section = document.getElementById("projects");
  if (section) observer.observe(section);
});
</script>

<template>
  <section
    id="projects"
    :class="[
      'scroll-mt-40 py-24 transition-all duration-700',
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12',
    ]"
  >
    <BaseContainer>
      <h2 class="text-3xl md:text-4xl font-semibold mb-10">
        {{ t("projects.title") }}
      </h2>

      <div class="grid md:grid-cols-2 gap-12 items-center">
        <!-- IMAGEN CON EFECTO -->
        <div
          class="project-img group relative rounded-3xl overflow-hidden shadow-lg"
        >
          <div
            class="h-[460px] overflow-y-auto overflow-x-hidden rounded-2xl border border-white/10 scrollbar-hide"
          >
            <img
              :src="andeswarmiFull"
              class="w-full transition-transform duration-700 group-hover:scale-105"
              alt="AndesWarmi website preview"
            />
          </div>

          <div
            class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-70"
          ></div>
        </div>

        <!-- TEXTO -->
        <div class="text-left space-y-4 transition-all duration-500">
          <p class="text-[11px] uppercase tracking-[0.25em] text-white/50">
            {{ t("projects.label") }}
          </p>
          <h3 class="text-3xl font-semibold text-accent">
            {{ project?.title }}
          </h3>
          <p class="text-base text-white/70 leading-relaxed">
            {{ project?.description }}
          </p>

          <p class="text-sm text-white/60 tracking-wide">
            {{ project?.role }}
          </p>

          <a
            :href="project?.link"
            target="_blank"
            rel="noopener noreferrer"
            class="project-btn inline-block px-5 py-2.5 rounded-full text-sm font-medium transition"
          >
            {{ t("projects.cta") }}
          </a>
        </div>
      </div>
    </BaseContainer>
  </section>
</template>

<style scoped>
/* efecto hover pro */
.project-img {
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.35s ease;
}
.project-img:hover {
  border-color: rgba(100, 160, 255, 0.35);
  box-shadow: 0 0 35px rgba(100, 160, 255, 0.25);
}

/* CTa */
.project-btn {
  background: rgba(80, 120, 255, 0.15);
  border: 1px solid rgba(120, 150, 255, 0.35);
  backdrop-filter: blur(6px);
}
.project-btn:hover {
  background: rgba(120, 160, 255, 0.25);
  border-color: rgba(160, 200, 255, 0.9);
  color: white;
  transform: translateY(-1px);
}

/* ocultar scrollbar */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
