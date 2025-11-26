<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref, onMounted, computed } from "vue";
import BaseContainer from "@/components/layout/BaseContainer.vue";
import umatecLogo from "../../assets/logos/umatec.png";
import avatarLogo from "../../assets/images/avatar.png";

const { t, tm } = useI18n();

const visible = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        visible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.18 }
  );

  const section = document.getElementById("experience");
  if (section) observer.observe(section);
});

/**
 * FIX ✔
 * jobs ahora se vuelve a traducir cuando cambia el idioma
 */
const jobs = computed(() => tm("experience.jobs") as any[]);

const getLogo = (key: string) => {
  if (key === "umatec") return umatecLogo;
  return avatarLogo;
};
</script>

<template>
  <section
    id="experience"
    :class="[
      'py-20 transition-all duration-700',
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
    ]"
  >
    <BaseContainer>
      <h2
        class="text-3xl md:text-4xl font-semibold mb-10 transition-all duration-700"
      >
        {{ t("experience.title") }}
      </h2>

      <!-- render dinámico de experiencia -->
      <div v-for="job in jobs" :key="job.key" class="exp-card mb-7 group">
        <div class="flex items-start gap-4">
          <img
            :src="getLogo(job.key)"
            class="w-12 h-12 object-cover rounded-md border border-white/10 transition-transform duration-300 group-hover:scale-[1.06]"
          />

          <div class="flex-1 group-hover:translate-x-[4px] transition-all">
            <h3 class="text-xl font-semibold text-accent leading-tight">
              {{ job.company }}
            </h3>

            <p
              class="text-white/60 text-sm mb-3 flex items-center flex-wrap gap-3"
            >
              <span>{{ job.role }}</span>
              <span
                class="inline-block h-1 w-1 rounded-full bg-white/30"
              ></span>
              <span>{{ job.period }}</span>
            </p>

            <ul class="space-y-2">
              <li
                v-for="(highlight, index) in job.highlights"
                :key="index"
                class="exp-li"
              >
                {{ highlight }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </BaseContainer>
  </section>
</template>

<style scoped>
.exp-card {
  @apply border border-white/10 rounded-xl p-5 bg-white/[0.03]
         transition-all duration-300 ease-out shadow-md;
}
.exp-card:hover {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.05);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.12);
}

/* bullets */
.exp-li {
  position: relative;
  padding-left: 16px;
  color: rgba(255, 255, 255, 0.78);
  transition: color 0.25s ease-out;
}
.exp-li:hover {
  color: #fff;
}
.exp-li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 9px;
  width: 7px;
  height: 7px;
  border-radius: 9999px;
  background: rgba(80, 120, 255, 0.7);
  transition: transform 0.25s ease-out;
}
.exp-li:hover::before {
  transform: scale(1.25);
}
</style>
