const { createApp, ref } = Vue

const app = createApp({
  data() {
    return {
      i18n,
      selectedCheckboxes: [],
      allSelected: false,
    }
  },
  methods: {
    setLanguage(lang) {
      this.i18n.setLocale(lang)
    },
    isActive(lang) {
      return this.i18n.locale === lang
    },
    toggleSelectAll() {
      if (!this.allSelected) {
        this.selectedCheckboxes = Array.from({length: 30}, (_, i) => i + 1)
      } else {
        this.selectedCheckboxes = []
      }
      this.allSelected = !this.allSelected
    }
  },
  computed: {
    selectAllText() {
      return this.allSelected ? this.i18n.t('unselectAllText') : this.i18n.t('selectAllText')
    }
  },
})

app.mount('#app')

