<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import BaseContainer from "@/components/layout/BaseContainer.vue";
import SocialLinks from "@/components/ui/SocialLinks.vue";
import meAvatar from "@/assets/images/avatar.png";

const { t, tm } = useI18n();

/* efecto typing */
const typedText = ref("");
const phraseIndex = ref(0);
const charIndex = ref(0);
const isDeleting = ref(false);
let typingTimer: number | undefined;

const typedPhrases = computed(() => {
  return tm("hero.typedPhrases") as string[];
});

const TYPE_SPEED = 60;
const DELETE_SPEED = 35;
const PAUSE_AT_END = 1800;

const typeStep = () => {
  const current = typedPhrases.value[phraseIndex.value];

  if (!isDeleting.value) {
    charIndex.value++;
    typedText.value = current.slice(0, charIndex.value);

    if (charIndex.value >= current.length) {
      isDeleting.value = true;
      typingTimer = window.setTimeout(typeStep, PAUSE_AT_END);
      return;
    }
  } else {
    charIndex.value--;
    typedText.value = current.slice(0, charIndex.value);

    if (charIndex.value <= 0) {
      isDeleting.value = false;
      phraseIndex.value = (phraseIndex.value + 1) % typedPhrases.value.length;
    }
  }

  typingTimer = window.setTimeout(
    typeStep,
    isDeleting.value ? DELETE_SPEED : TYPE_SPEED
  );
};

onMounted(() => {
  typingTimer = window.setTimeout(typeStep, TYPE_SPEED);
});

onUnmounted(() => {
  if (typingTimer) clearTimeout(typingTimer);
});

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
  <section id="hero" class="min-h-[90vh] flex items-center pt-24 md:pt-32">
    <BaseContainer>
      <div
        class="flex flex-col items-center text-center md:text-left md:items-start md:flex-row gap-12 md:gap-16 lg:gap-20"
      >
        <!-- AVATAR -->
        <div class="hero-avatar-wrapper">
          <img
            :src="meAvatar"
            class="hero-avatar animate-fade"
            alt="Alvaro avatar"
          />
        </div>

        <!-- TEXTOS -->
        <div class="flex-1 max-w-xl">
          <p class="text-lg md:text-xl mb-2 text-white/70 animate-fade">
            {{ t("hero.hello") }}
          </p>

          <h1
            class="text-4xl md:text-5xl lg:text-5xl font-semibold mb-1 animate-fade"
          >
            {{ t("hero.name") }}
          </h1>

          <p
            class="text-2xl md:text-4xl font-semibold text-accent mb-5 leading-tight animate-fade"
          >
            {{ t("hero.role") }}
          </p>

          <!-- typing -->
          <div class="typing-container text-lg md:text-2xl font-medium mb-6">
            <span class="typing-text">{{ typedText }}</span>
            <span class="cursor">|</span>
          </div>

          <SocialLinks />

          <div
            class="mt-6 flex flex-wrap gap-4 justify-center md:justify-start"
          >
            <button class="btn-primary" @click="scrollToSection('experience')">
              {{ t("hero.scroll") }}
            </button>

            <a href="/cv-alvaro.pdf" download class="btn-outline">
              {{ t("hero.downloadCv") }}
            </a>
          </div>
        </div>
      </div>

      <div class="mt-10 md:mt-16 flex justify-center">
        <button
          @click="scrollToSection('experience')"
          class="arrow-bounce w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white/70 hover:text-accent hover:border-accent transition"
        >
          ▼
        </button>
      </div>
    </BaseContainer>
  </section>
</template>

<style scoped>
.cursor {
  animation: blink 1s steps(1) infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}

/* Avatar halo */
.hero-avatar-wrapper {
  width: 260px;
  height: 260px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.animate-fade {
  opacity: 0;
  animation: fadeIn 1s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-avatar {
  width: 220px;
  height: 220px;
  border-radius: 999px;
  object-fit: contain;
  box-shadow: 0 0 18px rgba(110, 130, 255, 0.5),
    0 0 45px rgba(80, 90, 230, 0.25), 0 0 90px rgba(50, 60, 180, 0.1);
}

.typing-container {
  min-height: 50px;
  max-height: 50px;
  overflow: hidden;
  white-space: normal;
  word-break: break-word;
}

.typing-text {
  display: inline;
  color: rgba(255, 255, 255, 0.85);
}

/* botones */
.btn-primary {
  @apply px-5 py-2.5 rounded-full bg-accent text-sm font-medium hover:bg-accent-soft transition;
}
.btn-outline {
  @apply px-5 py-2.5 rounded-full border border-white/20 text-sm font-medium text-white/80 hover:border-accent hover:text-accent transition;
}

/* bounce ↓ */
.arrow-bounce {
  animation: bounce 1.6s infinite;
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(7px);
  }
}
</style>
