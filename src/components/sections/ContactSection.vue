<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import BaseContainer from "@/components/layout/BaseContainer.vue";

const { t } = useI18n();

const visible = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        visible.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.12 }
  );
  const section = document.getElementById("contact");
  if (section) observer.observe(section);
});
</script>

<template>
  <section
    id="contact"
    :class="[
      'scroll-mt-40 py-28 transition-all duration-700',
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12',
    ]"
  >
    <BaseContainer>
      <div class="text-center">
        <h2 class="text-3xl md:text-4xl font-semibold mb-6">
          {{ t("contact.title") }}
        </h2>

        <p
          class="text-white/70 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {{ t("contact.intro") }}
        </p>

        <a href="mailto:alvarojpt04.ws@gmail.com" class="contact-btn">
          {{ t("contact.cta") }}
        </a>
      </div>
    </BaseContainer>
  </section>
</template>

<style scoped>
.contact-btn {
  @apply px-6 py-3 rounded-full text-base font-medium transition;
  background: rgba(120, 160, 255, 0.22);
  border: 1px solid rgba(120, 160, 255, 0.35);
  color: white;
  box-shadow: 0 0 12px rgba(120, 160, 255, 0.18);
  backdrop-filter: blur(6px);
  cursor: pointer;
}
.contact-btn:hover {
  background: rgba(140, 200, 255, 0.32);
  border-color: rgba(200, 230, 255, 0.9);
  box-shadow: 0 0 20px rgba(120, 160, 255, 0.38);
  transform: translateY(-2px);
}
</style>
