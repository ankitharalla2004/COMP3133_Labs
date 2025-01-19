const fs = require('fs');
const csv = require('csv-parser');

const inputFile = 'input_countries.csv';
const canadaFile = 'canada.txt';
const usaFile = 'usa.txt';

if (fs.existsSync(canadaFile)) {
  fs.unlinkSync(canadaFile);
  console.log(`${canadaFile} deleted.`);
}

if (fs.existsSync(usaFile)) {
  fs.unlinkSync(usaFile);
  console.log(`${usaFile} deleted.`);
}

fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    const { country } = row;

    if (country.toLowerCase() === 'canada') {
      fs.appendFileSync(canadaFile, `${Object.values(row).join(',')}\n`);
    }

    if (country.toLowerCase() === 'united states') {
      fs.appendFileSync(usaFile, `${Object.values(row).join(',')}\n`);
    }
  })
  .on('end', () => {
    console.log('Data successfully processed and written to files.');
  });
