const distributeSelectedJuzCheckboxes = (memberList, selectedJuzCheckboxes) => {
  const numberOfPeople = memberList.length;
  const distributionList = [];

  for (let index = 0; index < selectedJuzCheckboxes.length; index++) {
    const juzData = MasterData[selectedJuzCheckboxes[index]-1];

    const totalVerses = totalVersesByJuz(juzData);

    const baseShare = Math.floor(totalVerses / numberOfPeople);
    const extraShare = totalVerses % numberOfPeople;

    const distribution = distributeJuz(juzData, baseShare, extraShare, numberOfPeople);
    distributionList.push({
      juz: juzData.juz,
      distribution: distribution,
    })
  }

  alert(JSON.stringify(distributionList, null, 2));
}

const totalVersesByJuz = (juzData) => {
  const surahList = juzData.surah;
  const firstSurah = surahList[0];
  const lastSurah = surahList[surahList.length - 1];

  return (lastSurah.lastVerse - firstSurah.firstVerse + 1);
}

const distributeJuz = (juzData, baseShare, extraShare, numberOfPeople) => {
  const distribution = [];
  let currentVerse = 1;

  for (let i = 0; i < numberOfPeople; i++) {
    const share = baseShare + (i < extraShare ? 1 : 0);
    const startInfo = distributeSurahAndVerse(juzData, currentVerse);
    const endInfo = distributeSurahAndVerse(juzData, currentVerse + share - 1);

    distribution.push({
      person: i + 1,
      start: startInfo,
      end: endInfo
    });

    currentVerse += share;
  }

  return distribution;
}

const distributeSurahAndVerse = (juz, verseNumber) => {
  let accumulatedVerses = 0;

  for (const surah of juz.surah) {
    const surahVerses = surah.lastVerse - surah.firstVerse + 1;
    if (accumulatedVerses + surahVerses >= verseNumber) {
      return {
        surahName: surah.name,
        verse: surah.firstVerse + verseNumber - accumulatedVerses - 1
      };
    }
    accumulatedVerses += surahVerses;
  }
}

