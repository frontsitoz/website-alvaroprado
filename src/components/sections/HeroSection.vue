<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import BaseContainer from "@/components/layout/BaseContainer.vue";
import SocialLinks from "@/components/ui/SocialLinks.vue";
import avatar320 from "@/assets/images/avatar-320.webp";
import avatar512 from "@/assets/images/avatar-512.webp";
import avatar768 from "@/assets/images/avatar-768.webp";

const { t, tm } = useI18n();

// URL pública del CV (soporta base path en build/deploy)
const pdfUrl = import.meta.env.BASE_URL + "plantillaCV-alvaro.pdf";

// typing — estado
const typedText = ref("");
const typingState = ref({
  phraseIndex: 0,
  charIndex: 0,
  deleting: false,
});
let typingTimer: number | undefined;

// scroll / arrow
let scrollHandler: (() => void) | null = null;
const arrowVisible = ref(true);

// frases typing desde i18n
const typedPhrases = computed((): string[] => {
  return tm("hero.typedPhrases") as unknown as string[];
});

const TYPE_SPEED = 55;
const DELETE_SPEED = 35;
const PAUSE_AT_END = 1400;

// ----------- REAL VH FIX PARA MÓVIL -----------
const updateVH = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

// typing engine
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
    state.deleting ? DELETE_SPEED : TYPE_SPEED,
  );
};

onMounted(() => {
  updateVH();
  window.addEventListener("resize", updateVH);

  typingTimer = window.setTimeout(typeStep, TYPE_SPEED);

  scrollHandler = () => {
    const heroEl = document.getElementById("hero");
    if (!heroEl) return;

    const heroHeight = heroEl.offsetHeight;

    arrowVisible.value = window.scrollY < heroHeight * 0.25;

    const arrow = document.querySelector(".arrow") as HTMLElement | null;
    if (arrow) {
      if (window.scrollY > heroHeight * 0.6) {
        arrow.classList.add("hide-arrow");
      } else {
        arrow.classList.remove("hide-arrow");
      }
    }
  };

  window.addEventListener("scroll", scrollHandler);
  scrollHandler();
});

onUnmounted(() => {
  if (typingTimer) clearTimeout(typingTimer);
  if (scrollHandler) window.removeEventListener("scroll", scrollHandler);
  window.removeEventListener("resize", updateVH);
});

// scroll hacia sección experiencia
const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;

  const offset = 90;
  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: y, behavior: "smooth" });
};
</script>

<template>
  <section
    id="hero"
    class="relative hero-viewport flex items-center justify-center pt-20 md:pt-24 lg:pt-28 overflow-visible"
  >
    <BaseContainer>
      <div
        class="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 mt-[-40px]"
      >
        <!-- AVATAR -->
        <div class="flex justify-center md:order-1">
          <img
            :src="avatar512"
            :srcset="`${avatar320} 320w, ${avatar512} 512w, ${avatar768} 768w`"
            sizes="(min-width: 1024px) 320px, (min-width: 768px) 280px, 240px"
            alt="Avatar de Álvaro Prado"
            width="320"
            height="320"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            class="w-72 h-72 md:w-80 md:h-80 object-contain rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.45)] z-10 ring-2 ring-black/20"
          />
        </div>

        <!-- TEXTOS -->
        <div
          class="flex-1 min-w-[350px] max-w-[660px] text-center md:text-left md:order-2 pb-2"
        >
          <p class="text-[1.15rem] text-white/70 mb-1.5">
            {{ t("hero.hello") }}
          </p>

          <h1
            class="font-preah font-semibold text-white text-[2.4rem] md:text-[3.1rem] leading-snug mb-[-4px]"
          >
            {{ t("hero.name") }}
          </h1>

          <p
            class="font-preah font-semibold text-[1.8rem] md:text-[2.4rem] text-[#6ba4ff] mb-4"
          >
            {{ t("hero.role") }}
          </p>

          <!-- TEXTO TYPING -->
          <div
            class="font-preah text-white/90 text-[1.28rem] md:text-[1.45rem] leading-tight whitespace-normal min-h-[75px] md:min-h-[95px]"
          >
            <span>{{ typedText }}</span>
            <span
              v-if="typedText.length"
              class="inline-block w-[9px] h-[1.1em] bg-white/90 ml-[2px] animate-pulse"
            ></span>
          </div>

          <!-- REDES + CV -->
          <div
            class="flex flex-col md:flex-row md:items-end md:justify-start items-center gap-4"
          >
            <SocialLinks />
            <a
              :href="pdfUrl"
              download
              class="px-6 py-2.5 rounded-full border text-[0.9rem] border-blue-300/85 text-blue-300/85 hover:text-blue-300 hover:border-blue-300 hover:shadow-[0px_0px_10px_rgba(107,163,255,0.35)] transition font-medium"
            >
              {{ t("hero.downloadCv") }}
            </a>
          </div>
        </div>
      </div>
    </BaseContainer>

    <!-- FLECHA -->
    <button
      @click="scrollToSection('experience')"
      v-show="arrowVisible"
      class="arrow"
    >
      <i class="fa-solid fa-angle-down"></i>
    </button>
  </section>
</template>

<style scoped>
@keyframes floatArrow {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(7px);
  }
}

.hero-viewport {
  height: calc(var(--vh) * 100); /* 👈 ahora es ALTURA REAL */
}

/* flecha */
.hide-arrow {
  opacity: 0;
  pointer-events: none;
}

.arrow {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid rgba(107, 163, 255, 0.55);
  background: rgba(12, 20, 35, 0.55);
  color: #7cadff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  animation: floatArrow 2s ease-in-out infinite;
  z-index: 10;
  transition: 0.25s ease;
}

/* móvil */
@media (max-width: 540px) {
  .arrow {
    bottom: 60px; /* ← ajustado para barra inferior Android */
  }
}

/* tablet */
@media (min-width: 541px) {
  .arrow {
    bottom: 40px;
  }
}

/* desktop */
@media (min-width: 1024px) {
  .arrow {
    bottom: 90px;
  }
}
</style>
