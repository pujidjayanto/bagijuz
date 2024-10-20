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
        alert(this.i18n.t('alertInvalidSettingText'));
        return;
      }
      this.distribution = distributeSelectedJuzCheckboxes(memberList, this.selectedJuzCheckboxes);
    },
    copyAssignments(juzDistribution) {
      let assignmentsText = `Juz ${juzDistribution.juz}\n`;

      juzDistribution.distribution.forEach((personDistribution, index) => {
        assignmentsText += `${index + 1}. ${personDistribution.person}\n`;
        personDistribution.assignment.forEach(assignment => {
          assignmentsText += `\t- ${this.i18n.t('readSurahText')} ${assignment.surahName} ${this.i18n.t('fromVerseText')} ${assignment.fromVerse} ${this.i18n.t('toVerseText')} ${assignment.toVerse}\n`;
        });
      });

      navigator.clipboard.writeText(assignmentsText).then(() => {
        alert(this.i18n.t('copySuccessMessage'));
      }).catch(err => {
        console.error('Failed to copy: ', err);
        alert(this.i18n.t('copyErrorMessage'));
      });
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
