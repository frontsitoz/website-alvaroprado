<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref, onMounted } from "vue";
import BaseContainer from "@/components/layout/BaseContainer.vue";
import umatecLogo from "../../assets/logos-companies/logo-umatec.png";

const { t } = useI18n();

/**
 * ACTIVACIÓN DE ANIMACIÓN
 * — se activa cuando la sección entra a pantalla
 */
const visible = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        visible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.2 }
  );

  const section = document.getElementById("experience");
  if (section) observer.observe(section);
});
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

      <!-- CARD animado -->
      <div
        class="exp-card group transition-all duration-500 ease-out hover:scale-[1.01]"
      >
        <div class="flex items-start gap-4">
          <img
            :src="umatecLogo"
            class="w-12 h-12 rounded-md border border-white/10 object-cover transition-transform duration-300 group-hover:scale-[1.05]"
          />

          <div
            class="flex-1 transition-all duration-300 group-hover:translate-x-[4px]"
          >
            <h3 class="text-xl font-semibold text-accent">
              UMATEC · Client: Netzun
            </h3>

            <div
              class="flex flex-wrap items-center gap-2 text-white/60 text-sm mb-3"
            >
              <span>Web Developer / Email Builder</span>
              <span class="h-1 w-1 rounded-full bg-white/30"></span>
              <span>Jun 2023 – Jul 2024</span>
            </div>

            <ul class="space-y-2">
              <li class="exp-li">Responsive email coding</li>
              <li class="exp-li">Reusable templates</li>
              <li class="exp-li">Integration with AWS services</li>
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

.exp-li {
  position: relative;
  padding-left: 16px;
  color: rgba(255, 255, 255, 0.75);
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
  transform: scale(1.3);
}
</style>
