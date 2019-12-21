const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Starting server at port ${port}!`));
app.use(express.static('public'));
const fs = require('fs')

let allPhonemes = [];
fs.readFile('allPhonemes.txt', 'utf-8', (err, data) => {

    if (err) throw err;
    allPhonemes = data.split('\n');
    for(let i = allPhonemes.length - 1; i >= 0; i--) {
      allPhonemes[i] = allPhonemes[i].replace(/\t/g, ' ')
      allPhonemes[i] = allPhonemes[i].replace(/\r/g, '');
      allPhonemes[i] = allPhonemes[i].split(' ');
      let badPro = allPhonemes[i][0].includes('(');
      if(badPro) allPhonemes.splice(i, 1);

    }
    console.log('Done collecting phonemes');

});

app.get('/phonemes/:word', (request, response) => {

  let data = request.params;
  let word = data.word;

  let phonemeInd = -1;
  for(let i = 0; i < allPhonemes.length; i++) {
    if(word.toUpperCase() == allPhonemes[i][0]) {
      phonemeInd = i;
      response.json({success: true, main: allPhonemes[phonemeInd]});
    }
  }
  response.json({success: false});

});
