const { reactive } = Vue

const translations = {
  en: {
    settingTitle: 'Setting',
    memberTextAreaLabel: 'Write members name separate with comma',
    selectAllText: 'Select All',
    unselectAllText: 'Unselect All',
    submitText: 'Submit',
    reportTitleText: 'Distribution',
  },
  id: {
    settingTitle: 'Pengaturan',
    memberTextAreaLabel: 'Tuliskan nama anggota pisahkan dengan koma',
    selectAllText: 'Pilih Semua',
    unselectAllText: 'Batal Pilih Semua',
    submitText: 'Kirim',
    reportTitleText: 'Pembagian',
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
