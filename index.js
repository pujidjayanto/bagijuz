const { createApp, ref } = Vue

const app = createApp({
  data() {
    return {
      i18n,
      selectedJuzCheckboxes: [],
      allSelected: false,
      memberTextAreaValue: '',
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
        this.selectedJuzCheckboxes = Array.from({length: 30}, (_, i) => i + 1)
      } else {
        this.selectedJuzCheckboxes = []
      }
      this.allSelected = !this.allSelected
    },
    submitSetting() {
      console.log('Members:', this.memberList)
      console.log('Selected numbers:', this.selectedJuzCheckboxes)
    }
  },
  computed: {
    selectAllText() {
      return this.allSelected ? this.i18n.t('unselectAllText') : this.i18n.t('selectAllText')
    },
    memberList() {
      return this.memberTextAreaValue.split(',').map(member => member.trim()).filter(member => member !== '')
    }
  },
})

app.mount('#app')

