<script setup lang="ts">
import BaseContainer from "@/components/layout/BaseContainer.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <section id="contact" class="py-24">
    <BaseContainer>
      <h2 class="text-3xl md:text-4xl font-semibold mb-6">
        {{ t("contact.title") }}
      </h2>

      <p class="opacity-80 mb-10">
        {{ t("contact.intro") }}
      </p>

      <a
        href="mailto:alvaritodev@outlook.es"
        class="bg-purple-500 hover:bg-purple-600 transition px-8 py-4 rounded-full font-medium inline-block"
      >
        {{ t("contact.cta") }}
      </a>
    </BaseContainer>
  </section>
</template>
