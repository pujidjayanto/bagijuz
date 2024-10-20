const distributeSelectedJuzCheckboxes = (memberList, selectedJuzCheckboxes) => {
  const distributionList = [];

  for (let index = 0; index < selectedJuzCheckboxes.length; index++) {
    const juzData = MasterData[selectedJuzCheckboxes[index]-1];

    let distribution = [];
    if (juzData.juz === 30) {
      distribution = distributeJuz30th(juzData, memberList);
    } else {
      distribution = distributeJuz(juzData, memberList);
    }

    distributionList.push({
      juz: juzData.juz,
      distribution: distribution,
    })
  }

  return  distributionList.sort((a, b) => a.juz - b.juz);
}

const distributeJuz30th = (juz30th, memberList) => {
  const { surah } = juz30th;
  const numberOfPeople = memberList.length;
  const baseShare = Math.floor(surah.length / numberOfPeople);
  const extraShare = surah.length % numberOfPeople;

  const distribution = [];
  let lsi = 0;
  for (let i = 0; i < numberOfPeople; i++) {
    const personShare = baseShare + (i < extraShare ? 1 : 0);

    let si = 0;
    let personAssignment = [];
    while (si < personShare) {
      let currentSurah = surah[lsi];
      personAssignment.push({
        surahName: currentSurah.name,
        fromVerse: currentSurah.firstVerse,
        toVerse: currentSurah.lastVerse
      });

      si++;
      lsi++;
    }

    distribution.push({
      person: memberList[i],
      assignment: personAssignment,
    });
  }

  return distribution;
}

const distributeJuz = (juzData, memberList) => {
  const totalVerses = totalVersesByJuz(juzData);
  const numberOfPeople = memberList.length;
  const baseShare = Math.floor(totalVerses / numberOfPeople);
  const extraShare = totalVerses % numberOfPeople;

  const distribution = [];
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

function totalVersesByJuz(juz) {
  let totalVerses = 0;

  for (let surah of juz.surah) {
    let versesInSurah = surah.lastVerse - surah.firstVerse + 1;
    totalVerses += versesInSurah;
  }

  return totalVerses;
}
