<script setup lang="ts">
import { useI18n } from "vue-i18n";
import BaseContainer from "@/components/layout/BaseContainer.vue";

const { t } = useI18n();
</script>

<template>
  <footer
    class="border-t border-white/10 bg-nav-bg/40 backdrop-blur-md mt-24 py-10"
  >
    <BaseContainer>
      <div class="flex flex-col items-center gap-3 text-center">
        <p class="text-white/70 text-sm md:text-base">
          © {{ new Date().getFullYear() }} Álvaro Prado –
          {{ t("footer.rights") }}
        </p>

        <p class="text-white/40 text-xs md:text-sm">
          {{ t("footer.builtWith") }}
        </p>
      </div>
    </BaseContainer>
  </footer>
</template>

<style scoped>
footer {
  transition: all 0.4s ease;
}

footer:hover {
  background: rgba(20, 28, 48, 0.55);
}
</style>
