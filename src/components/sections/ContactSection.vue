<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import BaseContainer from "@/components/layout/BaseContainer.vue";

const { t, tm } = useI18n();

const visible = ref(false);

type Contact = {
  title: string;
  intro: string;
  cta: string;
  url: string;
  email: string;
};

const contact = computed(() => tm("contact") as Contact);

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

        <!-- Botón principal (WhatsApp) -->
        <a
          :href="contact.url"
          target="_blank"
          rel="noopener noreferrer"
          class="contact-btn border border-accent text-accent hover:text-dark transition px-6 py-3 rounded-md font-medium"
        >
          {{ t("contact.cta") }}
        </a>

        <!-- Link secundario (Email) -->
        <div class="mt-9">
          <a
            :href="`https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}`"
            target="_blank"
            rel="noopener noreferrer"
            class="text-white/60 hover:text-accent transition text-sm border-b border-white/20 hover:border-accent"
          >
            o escríbeme por correo
          </a>
        </div>
      </div>
    </BaseContainer>
  </section>
</template>
