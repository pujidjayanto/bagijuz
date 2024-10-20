const distributeSelectedJuzCheckboxes = (memberList, selectedJuzCheckboxes) => {
  const distributionList = [];

  for (let index = 0; index < selectedJuzCheckboxes.length; index++) {
    const juzData = MasterData[selectedJuzCheckboxes[index]-1];

    const totalVerses = totalVersesByJuz(juzData);

    const distribution = distributeJuz(juzData, totalVerses, memberList);
    distributionList.push({
      juz: juzData.juz,
      distribution: distribution,
    })
  }

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

const distributeJuz = (juzData, totalVerses, memberList) => {
  const distribution = [];

  const numberOfPeople = memberList.length;
  const baseShare = Math.floor(totalVerses / numberOfPeople);
  const extraShare = totalVerses % numberOfPeople;

  let surahIndex = 0;
  let versePointer = juzData.surah[surahIndex].firstVerse;

  for (let i = 0; i < numberOfPeople; i++) {
    let personAssignment = [];

    let personShare = baseShare + (i < extraShare ? 1 : 0);
    while (personShare > 0 && surahIndex < juzData.surah.length) {
      let currentSurah = juzData.surah[surahIndex];
      let availableVerses = currentSurah.lastVerse - versePointer + 1;
      if (personShare >= availableVerses) {
        personAssignment.push({
          surahName: currentSurah.name,
          fromVerse: versePointer,
          toVerse: currentSurah.lastVerse
        });

        personShare -= availableVerses;
        surahIndex++;
        if (surahIndex < juzData.surah.length) {
          versePointer = juzData.surah[surahIndex].firstVerse;
        }
      } else {
        personAssignment.push({
          surahName: currentSurah.name,
          fromVerse: versePointer,
          toVerse: versePointer + personShare - 1
        });
        versePointer += personShare;
        personShare = 0;
      }
    }

    distribution.push({
      person: memberList[i],
      assignment: personAssignment,
    })
  }

  return distribution;
}
