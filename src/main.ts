import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";

import AOS from "aos";
import "aos/dist/aos.css";

const app = createApp(App);
app.mount("#app");

AOS.init({
  duration: 800,
  easing: "ease-out-quart",
  offset: 80,
  once: false, // importante: para que se repita cuando vuelves a la sección
});
