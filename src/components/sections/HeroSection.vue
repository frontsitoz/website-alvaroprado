<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import BaseContainer from "@/components/layout/BaseContainer.vue";
import SocialLinks from "@/components/ui/SocialLinks.vue";
import meAvatar from "@/assets/images/avatar.png";

// Mejor manejo de tipos TS
const { t, tm } = useI18n({ useScope: "local" });

// Estado typing
const typedText = ref("");
const typingState = ref({
  phraseIndex: 0,
  charIndex: 0,
  deleting: false,
});
let typingTimer: number | undefined;
let scrollHandler: ((ev: Event) => void) | null = null;

// Tipar correctamente
const typedPhrases = computed<string[]>(() => {
  const result = tm("hero.typedPhrases");
  return Array.isArray(result) ? result : [];
});

// typing engine
const TYPE_SPEED = 55;
const DELETE_SPEED = 35;
const PAUSE_AT_END = 1400;

const typeStep = () => {
  const phrases = typedPhrases.value;
  if (!phrases.length) return;

  const state = typingState.value;
  const current = phrases[state.phraseIndex];

  if (!state.deleting) {
    state.charIndex++;
    typedText.value = current.slice(0, state.charIndex);

    if (state.charIndex >= current.length) {
      state.deleting = true;
      typingTimer = window.setTimeout(typeStep, PAUSE_AT_END);
      return;
    }
  } else {
    state.charIndex--;
    typedText.value = current.slice(0, state.charIndex);

    if (state.charIndex <= 0) {
      state.deleting = false;
      state.phraseIndex = (state.phraseIndex + 1) % phrases.length;
    }
  }

  typingTimer = window.setTimeout(
    typeStep,
    state.deleting ? DELETE_SPEED : TYPE_SPEED
  );
};

onMounted(() => {
  typingTimer = window.setTimeout(typeStep, TYPE_SPEED);

  scrollHandler = (ev: Event) => {
    const arrow = document.querySelector(".arrow") as HTMLElement | null;
    const heroEl = document.getElementById("hero");
    if (!arrow || !heroEl) return;

    const heroHeight = heroEl.offsetHeight;
    if (window.scrollY > heroHeight * 0.6) {
      arrow.classList.add("hide-arrow");
    } else {
      arrow.classList.remove("hide-arrow");
    }
  };

  window.addEventListener("scroll", scrollHandler);
  scrollHandler(new Event("scroll"));
});

onUnmounted(() => {
  if (typingTimer) clearTimeout(typingTimer);
  if (scrollHandler) window.removeEventListener("scroll", scrollHandler);
});

// scroll suave
const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;

  const offset = 90;
  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: y, behavior: "smooth" });
};
</script>

<template>
  <section id="hero" class="hero h-screen flex items-center justify-center">
    <BaseContainer>
      <div class="hero-layout">
        <!-- AVATAR -->
        <div class="hero-avatar-wrapper">
          <img
            :src="meAvatar"
            class="hero-avatar"
            alt="Ilustración de Álvaro Prado trabajando en una laptop"
            loading="lazy"
          />
        </div>

        <!-- TEXTOS -->
        <div class="hero-text-wrapper">
          <p class="intro">{{ t("hero.hello") }}</p>
          <h1 class="name">{{ t("hero.name") }}</h1>
          <p class="role">{{ t("hero.role") }}</p>

          <div class="typing-box">
            <span class="typing-text">{{ typedText }}</span>
            <span v-if="typedText.length" class="cursor"></span>
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
    </BaseContainer>

    <!-- FLECHA FLOTANTE SOLO EN EL HERO -->
    <button @click="scrollToSection('experience')" class="arrow">
      <i class="fa-solid fa-arrow-down"></i>
    </button>
  </section>
</template>

<style scoped>
/**********************************************
 * HERO BASE
 **********************************************/
.hero {
  padding-top: 80px;
  position: relative;

  --hero-name-size: 3.1rem;
  --hero-role-size: 2.4rem;
  --hero-typing-size: 1.45rem;
}

/**********************************************
 * 🔵 BOTONES
 **********************************************/
.btn-primary {
  @apply px-6 py-2.5 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent-soft transition;
}

.btn-outline {
  @apply px-6 py-2.5 rounded-full border transition font-medium text-sm;
  border-color: rgba(107, 163, 255, 0.85);
  color: rgba(107, 163, 255, 0.85);
  background: transparent;
}
.btn-outline:hover {
  box-shadow: 0 0 10px rgba(107, 163, 255, 0.35);
  transform: translateY(-2px);
  border-width: 2px;
  border-color: rgba(107, 163, 255, 1);
  color: rgba(107, 163, 255, 1);
}

/**********************************************
 * 🔵 LAYOUT GENERAL
 **********************************************/
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

/**********************************************
 * 🔵 TEXTOS
 **********************************************/
.hero-text-wrapper {
  flex: 1;
  min-width: 350px;
  max-width: 660px;
  text-align: center;
  padding-bottom: 10px;
}
@media (min-width: 768px) {
  .hero-text-wrapper {
    text-align: left;
  }
}

.intro {
  font-size: 1.15rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 5px;
}
.name {
  font-size: var(--hero-name-size);
  font-weight: 600;
  margin-bottom: -6px;
  color: white;
  font-family: "Preahvihear", sans-serif;
}
.role {
  font-size: var(--hero-role-size);
  font-weight: 600;
  color: #6ba4ff;
  margin-bottom: 14px;
  font-family: "Preahvihear", sans-serif;
}

/**********************************************
 * 🔵 AVATAR
 **********************************************/
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
.hero-avatar-wrapper:hover .hero-avatar {
  transform: scale(1.03);
}
@media (min-width: 1024px) {
  .hero-avatar {
    width: 330px;
    height: 330px;
  }
}

/**********************************************
 * 🔵 TYPING TEXT
 **********************************************/
.typing-box {
  font-size: var(--hero-typing-size);
  max-width: 660px;
  display: inline-block;
  word-wrap: break-word;
  line-height: 1.4;
  white-space: normal;

  /* ALTURA CONSTANTE — NO EMPUJA ELEMENTOS */
  min-height: calc(var(--hero-typing-size) * 2.4);
}
.typing-text {
  display: inline;
  color: rgba(255, 255, 255, 0.92);
  font-family: "Preahvihear", sans-serif;
}
.cursor {
  display: inline-block;
  position: relative;

  /* alineación real al texto */
  vertical-align: bottom;

  width: 9px;
  height: 1.1em;
  margin-left: 2px;
  background: rgba(255, 255, 255, 0.92);
  animation: blink 0.8s ease infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}

/**********************************************
 * 🔵 REDES SOCIALES
 **********************************************/
.social-links-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 18px;
  margin-top: 18px;
}
@media (min-width: 768px) {
  .social-links-wrapper {
    justify-content: flex-start;
  }
}

/**********************************************
 * 🔵 BOTONES WRAPPER
 **********************************************/
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

/**********************************************
 * 🔵 FLECHA — ANIMACIÓN & POSICIONADO
 **********************************************/
.arrow {
  position: absolute;
  bottom: 72px; /* distancia perfecta del bottom */
  left: 50%;
  transform: translateX(-50%);

  width: 38px;
  height: 38px;
  border-radius: 50%;

  border: 1px solid rgba(107, 163, 255, 0.55);
  background: rgba(12, 20, 35, 0.55);
  backdrop-filter: blur(6px);

  color: #7cadff;
  font-size: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  transition: box-shadow 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  box-shadow: 0 0 12px rgba(107, 163, 255, 0.08);

  animation: floatArrow 2s ease-in-out infinite;
  z-index: 10;
}
.arrow:hover {
  animation-play-state: paused;
  transform: translateX(-50%) translateY(2px);
  border-color: rgba(107, 163, 255, 0.9);
  color: rgba(107, 163, 255, 1);
}
.hide-arrow {
  opacity: 0;
  pointer-events: none;
}

@keyframes floatArrow {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(7px);
  }
}

/**********************************************
 * 📱 RESPONSIVE
 **********************************************/

/* tablet / orden lógico */
@media (max-width: 980px) {
  .hero-layout {
    flex-direction: column;
    text-align: center;
    gap: 22px;
  }

  .hero-avatar-wrapper {
    order: 1;
  }
  .hero-text-wrapper {
    order: 2;
  }
  .social-links-wrapper {
    order: 3;
  }
  .actions {
    order: 4;
  }
}

/* ajustar tipografía general */
@media (max-width: 920px) {
  .hero {
    --hero-name-size: 2.1rem;
    --hero-role-size: 1.6rem;
    --hero-typing-size: 1.45rem;
  }
}

/* mobile pequeño */
@media (max-width: 480px) {
  .hero {
    --hero-name-size: 1.95rem;
    --hero-role-size: 1.45rem;
    --hero-typing-size: 1.22rem;
  }
  .typing-box {
    max-width: 90%;
  }
}

/* flecha en mobile */
@media (max-width: 600px) {
  .arrow {
    width: 34px;
    height: 34px;
    font-size: 0.9rem;
    bottom: 58px;
  }
  .hero {
    padding-top: 65px;
  }
}
</style>
