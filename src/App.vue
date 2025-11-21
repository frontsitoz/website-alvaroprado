<script setup lang="ts">
import Navbar from "./components/layout/Navbar.vue";
import HeroSection from "./components/sections/HeroSection.vue";
import BaseContainer from "./components/layout/BaseContainer.vue";
import WorkExperienceSection from "./components/sections/WorkExperienceSection.vue";
import TechSection from "./components/sections/TechSection.vue";
import ProjectsSection from "./components/sections/ProjectsSection.vue";
import ContactSection from "./components/sections/ContactSection.vue";
import Footer from "./components/layout/Footer.vue";
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-b from-[#050016] via-[#050016] to-[#12002b] text-white"
  >
    <Navbar />

    <BaseContainer>
      <main class="pt-16 space-y-32">
        <HeroSection />
        <WorkExperienceSection />
        <TechSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </BaseContainer>
  </div>
</template>
