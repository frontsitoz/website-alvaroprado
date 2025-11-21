<script setup lang="ts">
const projects = [
  {
    title: "Example Project",
    description:
      "A web app for visualising personalized data, with clean UI and smooth interactions.",
    role: "Frontend Development · UI Design",
    image: "@/assets/images/project-1.png", // cambia luego por tus capturas
  },
  {
    title: "Another Project",
    description:
      "A dashboard focused on accessibility, performance and modern frontend patterns.",
    role: "Vue 3 · TypeScript · Tailwind CSS",
    image: "@/assets/images/project-2.png",
  },
];
</script>

<template>
  <section class="mt-24 space-y-10" id="projects">
    <h2 class="text-3xl font-semibold" data-aos="fade-up">Featured Projects</h2>

    <div class="space-y-12">
      <article
        v-for="(project, index) in projects"
        :key="project.title"
        class="grid md:grid-cols-2 gap-8 items-center"
        :data-aos="index % 2 === 0 ? 'fade-right' : 'fade-left'"
      >
        <!-- Texto -->
        <div class="space-y-3 order-2 md:order-1">
          <p class="text-xs uppercase tracking-[0.2em] text-white/60">
            Featured Project
          </p>
          <h3 class="text-xl font-semibold">
            {{ project.title }}
          </h3>
          <p class="text-sm text-white/70">
            {{ project.description }}
          </p>
          <p class="text-xs text-white/50">
            {{ project.role }}
          </p>
        </div>

        <!-- Imagen / mockup -->
        <div class="relative order-1 md:order-2">
          <div
            class="rounded-3xl bg-bg-card/90 border border-white/10 overflow-hidden shadow-glow hover:scale-[1.02] transition-transform duration-300"
          >
            <!-- placeholder, luego cambias por tus screenshots reales -->
            <div
              class="aspect-video bg-gradient-to-br from-accent-soft/40 to-bg-main/80 flex items-center justify-center text-xs text-white/50"
            >
              Project screenshot
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
