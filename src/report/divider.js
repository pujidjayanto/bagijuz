import juzConfigs from '../const';

const Divider = (selectedJuz, members) => {
  selectedJuz.forEach(sj => {
    const juzConfig = juzConfigs[Number(sj) - 1];
    const memberArr = members.split(",");
    const versesByJuz = generateVersesByJuz(juzConfig);
    const verseList = divideVerseEqually(versesByJuz, memberArr.length)
    console.log(verseList)
  });
}

const generateVersesByJuz = (selectedJuz) => {
  const verses = [];
  const surahArr = selectedJuz.surah;

  surahArr.forEach(surah => {
    for (let index = surah.firstVerse; index <= surah.lastVerse; index++) {
      verses.push([surah.name, index]);
    }
  });

  return verses;
};

const divideVerseEqually = (verseArr, totalMember) => {
  let result = [];
  for (let i = totalMember; i > 0; i--) {
      result.push(verseArr.splice(0, Math.ceil(verseArr.length / i)));
  }

  return result;
};

export default Divider;