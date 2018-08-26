const fs = require('fs');

const MAX_X = 100;
const SERIES_NUM = 5;

const csv = [
  ['X', ...[...Array(SERIES_NUM)].map((v, i) => `Y_${i + 1}`)],
  ...[...Array(MAX_X)].map((v1, i) => [
    i + 1,
    ...[...Array(SERIES_NUM)].map(() => Math.random() * 100),
  ]),
]
  .map(row => row.join(','))
  .join('\n');

const steps = [...Array(10)].map((v, i) => ({
  value: (i + 1) * Math.floor(MAX_X / 12),
  label: `S_${i + 1}`,
}));

const data = {
  data: csv,
  steps,
};

// eslint-disable-next-line no-console
fs.writeFile('sample.js', `export default ${JSON.stringify(data)}`, 'utf-8', e => console.log(e || 'Complete'));
