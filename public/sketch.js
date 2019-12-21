let numFiles = {
  'AA': 33,
  'AE': 41,
  'AH': 121,
  'AO': 18,
  'AW': 13,
  'AY': 82,
  'B': 27,
  'CH': 4,
  'D': 73,
  'DH': 83,
  'EH': 33,
  'ER': 17,
  'EY': 20,
  'F': 21,
  'G': 14,
  'HH': 15,
  'IH': 105,
  'IY': 52,
  'JH': 5,
  'K': 45,
  'L': 60,
  'M': 39,
  'N': 126,
  'NG': 17,
  'OW': 52,
  'OY': 1,
  'P': 29,
  'R': 64,
  'S': 79,
  'SH': 5,
  'T': 136,
  'TH': 5,
  'UH': 6,
  'UW': 48,
  'V': 21,
  'W': 42,
  'Y': 29,
  'Z': 20,
  'ZH': 1
};

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function clickedButton() {

  let txt = document.getElementById('mainIn').value;
  while(txt.includes('.')) {
    txt = txt.replace('.', '');
  }
  let txtArr = txt.split(' ');

  let phonemesArr = []
  let doIterations = async _ => {
    for(let i = 0; i < txtArr.length; i++) {
      let phonemes = await getPhonemes(txtArr[i]);
      phonemesArr.push(phonemes);
    }
    console.log(phonemesArr);
  };

  doIterations().then(async _ => {
    for(let i = 0; i < phonemesArr.length; i++) {
      if(phonemesArr[i] !== 'ERROR!') {
        for(let j = 1; j < phonemesArr[i].length; j++) {

          let phoneme = phonemesArr[i][j];
          let num = Math.floor(Math.random() * numFiles[phoneme]) + 1;
          let src = `AllAudioData/${phoneme}/${phoneme}${num}.mp3`;
          let audioElement = new Audio(src);
          await sleep(audioElement.duration);
          audioElement.play();

        }
        await sleep(200);
      }
    }
  });

}

async function getPhonemes(word) {
  const response = await fetch(`/phonemes/${word}`);
  const json = await response.json();
  return ((json.success) ? json.main : 'ERROR!');
}
