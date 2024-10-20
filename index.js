const { createApp, ref } = Vue

const app = createApp({
  data() {
    return {
      i18n,
      selectedJuzCheckboxes: [],
      allSelected: false,
      memberTextAreaValue: '',
      distribution: [],
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
      const memberList = this.memberList;
      if (memberList.length === 0 || this.selectedJuzCheckboxes.length === 0) {
        alert('Please enter members and select at least one juz.');
        return;
      }
      this.distribution = distributeSelectedJuzCheckboxes(memberList, this.selectedJuzCheckboxes);
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

