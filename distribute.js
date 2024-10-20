const distributeSelectedJuzCheckboxes = (memberList, selectedJuzCheckboxes) => {
  const numberOfPeople = memberList.length;
  const distributionList = [];

  for (let index = 0; index < selectedJuzCheckboxes.length; index++) {
    const juzData = MasterData[selectedJuzCheckboxes[index]-1];

    const totalVerses = totalVersesByJuz(juzData);

    const distribution = distributeJuz(juzData, totalVerses, numberOfPeople);
    distributionList.push({
      juz: juzData.juz,
      distribution: distribution,
    })
  }

  alert(JSON.stringify(distributionList, null, 2));
  return distributionList;
}

function totalVersesByJuz(juz) {
  let totalVerses = 0;

  for (let surah of juz.surah) {
    let versesInSurah = surah.lastVerse - surah.firstVerse + 1;
    totalVerses += versesInSurah;
  }

  return totalVerses;
}

const distributeJuz = (juzData, totalVerses, numberOfPeople) => {
  const distribution = [];

  const baseShare = Math.floor(totalVerses / numberOfPeople);
  const extraShare = totalVerses % numberOfPeople;

  let currentVerse = 1;

  for (let i = 0; i < numberOfPeople; i++) {
    const share = baseShare + (i < extraShare ? 1 : 0);
    const startInfo = distributeSurahAndVerse(juzData, currentVerse);
    const endInfo = distributeSurahAndVerse(juzData, currentVerse + share - 1);

    distribution.push({
      person: i + 1,
      start: startInfo,
      end: endInfo,
      total: share,
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

