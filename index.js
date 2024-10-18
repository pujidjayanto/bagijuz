const { createApp, ref } = Vue

const app = createApp({
  data() {
    return {
      i18n,
      selectedCheckboxes: []
    }
  },
  methods: {
    setLanguage(lang) {
      this.i18n.setLocale(lang)
    },
    isActive(lang) {
      return this.i18n.locale === lang
    },
    submitForm(){
      console.log(this.selectedCheckboxes);
      alert('Selected checkboxes: ' + this.selectedCheckboxes.join(', '));
    },
  },
})

app.mount('#app')

