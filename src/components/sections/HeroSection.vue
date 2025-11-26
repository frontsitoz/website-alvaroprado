<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import BaseContainer from "@/components/layout/BaseContainer.vue";
import SocialLinks from "@/components/ui/SocialLinks.vue";
import meAvatar from "@/assets/images/avatar.png";

const { t, tm } = useI18n();

/* typing effect */
const typedText = ref("");
const phraseIndex = ref(0);
const charIndex = ref(0);
const isDeleting = ref(false);
let typingTimer: number | undefined;

const typedPhrases = computed(() => {
  return tm("hero.typedPhrases") as string[];
});

const TYPE_SPEED = 55;
const DELETE_SPEED = 35;
const PAUSE_AT_END = 1400;

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
  <section id="hero" class="hero h-screen flex items-center justify-center">
    <BaseContainer>
      <div class="hero-layout">
        <div class="hero-avatar-wrapper">
          <img :src="meAvatar" class="hero-avatar" alt="Alvaro avatar" />
        </div>

        <div class="hero-text-wrapper">
          <p class="intro">{{ t("hero.hello") }}</p>
          <h1 class="name">{{ t("hero.name") }}</h1>
          <p class="role">{{ t("hero.role") }}</p>

          <div class="typing-container">
            <span class="typing-text">{{ typedText }}</span>
            <span class="cursor"></span>
          </div>

          <div class="social-links-wrapper">
            <SocialLinks />
          </div>

          <div class="actions">
            <a href="/cv-alvaro.pdf" download class="btn-outline">
              {{ t("hero.downloadCv") }}
            </a>
          </div>
        </div>
      </div>

      <div class="hero-bottom">
        <button @click="scrollToSection('experience')" class="arrow">▼</button>
      </div>
    </BaseContainer>
  </section>
</template>

<style scoped>
.hero {
  padding-top: 110px;
}
/******** BOTONES — CORRECTO ********/
.btn-primary {
  @apply px-6 py-2.5 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent-soft transition;
}
.btn-outline {
  @apply px-6 py-2.5 rounded-full border transition font-medium text-sm;
  border-color: rgba(107, 163, 255, 0.85);
  color: rgba(107, 163, 255, 0.85);
  background: transparent;
  transition: all 0.25s ease;
}

.btn-outline:hover {
  box-shadow: 0 0 10px rgba(107, 163, 255, 0.35);
  transform: translateY(-2px);
  border-width: 2px;
  border-color: rgba(107, 163, 255, 1);
  color: rgba(107, 163, 255, 1);
}
.hero-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 38px;
}

@media (min-width: 768px) {
  .hero-layout {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 75px;
  }
}

/* FIX — el texto ya no empuja el avatar */
.hero-text-wrapper {
  flex: 1;
  min-width: 350px;
  max-width: 660px;
  text-align: center;
}

@media (min-width: 768px) {
  .hero-text-wrapper {
    text-align: left;
  }
}

/******** AVATAR *********/
.hero-avatar-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-avatar {
  width: 240px;
  height: 240px;
  object-fit: contain;
  border-radius: 999px;
  filter: drop-shadow(0px 0px 30px rgba(110, 130, 255, 0.55))
    drop-shadow(0px 0px 85px rgba(90, 110, 255, 0.35));
  transition: transform 0.3s ease;
}

@media (min-width: 1024px) {
  .hero-avatar {
    width: 330px;
    height: 330px;
  }
}

/******** TEXT *********/
.intro {
  font-size: 1.15rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 5px;
}

.name {
  font-size: 3.1rem;
  font-weight: 600;
  margin-bottom: -6px;
  color: white;
  font-family: "Preahvihear", sans-serif;
}

.role {
  font-size: 2.4rem;
  font-weight: 600;
  color: #6ba4ff;
  margin-bottom: 14px;
  font-family: "Preahvihear", sans-serif;
}

/******** TYPING *********/
.typing-container {
  display: inline-flex;
  align-items: baseline;
  flex-wrap: wrap;
  font-size: 1.45rem;
  min-height: 52px;
  max-width: 660px;
  word-break: break-word;
}

.typing-text {
  display: inline;
  color: rgba(255, 255, 255, 0.92);
  font-family: "Preahvihear", sans-serif;
}

/* Cursor siempre alineado correcto */
.cursor {
  display: inline-block;
  width: 8px;
  height: 1.1em;
  margin-left: 4px;
  background: rgba(255, 255, 255, 0.85);
  animation: blink 0.8s ease infinite;
  vertical-align: baseline;
  position: relative;
  top: -1px;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

/******** SOCIAL *********/
.social-links-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 12px;
  margin-bottom: 18px;
}

@media (min-width: 768px) {
  .social-links-wrapper {
    justify-content: flex-start;
  }
}

/******** BUTTONS *********/
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;
}

@media (min-width: 768px) {
  .actions {
    justify-content: flex-start;
  }
}

/******** ARROW *********/
.hero-bottom {
  display: flex;
  justify-content: center;
  margin-top: 70px;
}

@media (min-width: 1024px) {
  .hero-bottom {
    margin-top: 100px;
  }
}

.arrow {
  animation: bounce 1.6s infinite;
  font-size: 1.4rem;
  opacity: 0.85;
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
