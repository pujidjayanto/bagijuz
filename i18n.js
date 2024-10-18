const { reactive } = Vue

const translations = {
  en: {
    title: 'Bagijuz',
    description: 'Helping to divide the chapters in group study',
    getStarted: 'Get started',
    learnMore: 'Learn more'
  },
  id: {
    title: 'Bagijuz',
    description: 'Membantu pembagian juz dalam pengajian berkelompok',
    getStarted: 'Mulai',
    learnMore: 'Pelajari lebih lanjut'
  }
}

const i18n = reactive({
  locale: 'id',
  t(key) {
    return translations[this.locale][key]
  },
  setLocale(locale) {
    this.locale = locale
  }
})
