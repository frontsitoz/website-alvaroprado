<script setup lang="ts">
import Navbar from "@/components/layout/Navbar.vue";
import HeroSection from "@/components/sections/HeroSection.vue";
import WorkExperienceSection from "@/components/sections/WorkExperienceSection.vue";
import ProjectsSection from "@/components/sections/ProjectsSection.vue";
import TechSection from "@/components/sections/TechSection.vue";
import ContactSection from "@/components/sections/ContactSection.vue";
import Footer from "@/components/layout/Footer.vue";
</script>

<template>
  <div class="bg-bg-main min-h-screen text-white">
    <Navbar />

    <main
      class="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pb-24 space-y-32 md:space-y-40"
    >
      <HeroSection />
      <WorkExperienceSection />
      <ProjectsSection />
      <TechSection />
      <ContactSection />
    </main>

    <Footer />
  </div>
</template>
