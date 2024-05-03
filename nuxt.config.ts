// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/google-fonts",
    "@vee-validate/nuxt"
  ],
  shadcn: {
    componentDir: "./components/ui",
  },
  googleFonts: {
    families: {
      Inter: "100..900",
    },
    display: "swap",
    prefetch: true,
    preconnect: true,
    preload: true,
    download: true,
  },
});