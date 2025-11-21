<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const phrases = [
  "I build delightful user interfaces.",
  "I work with Vue & TypeScript.",
  "I create beautiful digital experiences.",
];

const typedText = ref("");
let phraseIndex = 0;
let charIndex = 0;
let timeoutId: number | undefined;

const getCurrentPhrase = () => {
  return phrases[phraseIndex % phrases.length] ?? "";
};

const type = () => {
  const phrase = getCurrentPhrase();

  if (charIndex < phrase.length) {
    typedText.value += phrase.charAt(charIndex);
    charIndex++;
    timeoutId = window.setTimeout(type, 70);
  } else {
    timeoutId = window.setTimeout(() => erase(), 1500);
  }
};

const erase = () => {
  if (charIndex > 0) {
    typedText.value = typedText.value.slice(0, -1);
    charIndex--;
    timeoutId = window.setTimeout(erase, 40);
  } else {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    timeoutId = window.setTimeout(type, 300);
  }
};

onMounted(() => {
  type();
});

onUnmounted(() => {
  if (timeoutId !== undefined) {
    clearTimeout(timeoutId);
  }
});
</script>

<template>
  <section
    id="home"
    class="w-full min-h-[80vh] flex items-center pt-28 md:pt-32 pb-20 px-6 md:px-10"
  >
    <div
      class="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
    >
      <!-- Columna izquierda: avatar + saludo -->
      <div class="flex flex-col items-center md:items-start gap-6">
        <!-- Avatar con box-shadow blanco -->
        <div
          class="rounded-full p-[6px] bg-[#12051f] shadow-[0_0_60px_rgba(255,255,255,0.6)]"
        >
          <img
            src="@/assets/images/avatar.png"
            alt="Alvaro Prado"
            class="w-52 h-52 md:w-60 md:h-60 rounded-full object-cover"
          />
        </div>

        <!-- Texto de presentación -->
        <div class="text-center md:text-left">
          <p class="text-white/70 text-lg">Hello! I am</p>
          <h1 class="text-4xl md:text-5xl font-bold text-purple-300 mt-1">
            Alvaro Prado
          </h1>
          <p class="text-white/60 mt-1 text-lg">A Frontend Developer who</p>
        </div>
      </div>

      <!-- Columna derecha: about + texto animado -->
      <div id="about" class="flex flex-col gap-6">
        <!-- Texto con efecto máquina de escribir -->
        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight min-h-[3.5rem] md:min-h-[4.5rem]"
        >
          {{ typedText }}<span class="cursor">|</span>
        </h2>

        <!-- Descripción -->
        <p class="text-white/70 leading-relaxed max-w-lg">
          I design and build modern web interfaces using Vue.js, TypeScript and
          Tailwind CSS, focusing on clean code and smooth user experiences.
        </p>

        <p class="text-white/70 leading-relaxed max-w-lg">
          I enjoy creating delightful digital products that balance business
          goals and user needs.
        </p>

        <!-- Botones CTA -->
        <div class="flex flex-wrap gap-4 pt-4">
          <a
            href="/AlvaroPrado-CV.pdf"
            target="_blank"
            class="px-6 py-3 rounded-full bg-purple-600 text-white font-medium text-sm md:text-base hover:bg-purple-500 transition"
          >
            Download CV
          </a>

          <a
            href="https://www.linkedin.com/in/alvaropradotenorio"
            target="_blank"
            class="px-6 py-3 rounded-full border border-white/25 text-white/80 text-sm md:text-base hover:bg-white/10 hover:text-white transition"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cursor {
  display: inline-block;
  margin-left: 2px;
  animation: blink 0.9s steps(1, start) infinite;
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  50.01%,
  100% {
    opacity: 0;
  }
}
</style>
