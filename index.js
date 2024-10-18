const { createApp, ref } = Vue

const app = createApp({
  data() {
    return {
      i18n
    }
  },
  methods: {
    setLanguage(lang) {
      this.i18n.setLocale(lang)
    },
    isActive(lang) {
      return this.i18n.locale === lang
    }
  }
})

app.mount('#app')

