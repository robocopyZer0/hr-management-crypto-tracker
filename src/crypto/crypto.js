require('./crypto.css');

let previousData;
let exchangeRate;

const getUSDExchangeRate = async () => {
  const response = await fetch('https://stormy-spire-77504.herokuapp.com/https://api.hnb.hr/tecajn/v1?valuta=USD&format=json', { mode: 'cors' });
  const data = await response.json();
  return data[0]['Srednji za devize'];
};
const fetchAPIData = async () => {
  const response = await fetch('https://api.coincap.io/v2/assets?limit=10');
  const data = await response.json();

  return data.data;
};
const populateCryptoTable = (data) => {
  const cryptoTable = document.querySelector('.crypto-table');

  for (let i = 1; i < cryptoTable.rows.length;) {
    cryptoTable.deleteRow(i);
  }
  const addCell = (tr, text) => {
    const td = tr.insertCell();
    td.textContent = text;
    return td;
  };

  const changeRowStyle = (id, style) => {
    const row = document.querySelector(id);
    row.classList.add(style);
    setTimeout(() => {
      row.classList.remove(style);
    }, 1500);
  };

  const updateRow = () => {
    if (previousData) {
      for (let i = 0; i < previousData.length; i += 1) {
        if (previousData[i].priceUsd < data[i].priceUsd) {
          changeRowStyle(`.${previousData[i].id}`, 'positive');
        } else {
          changeRowStyle(`.${previousData[i].id}`, 'negative');
        }
      }
    }
  };
  data.forEach((item) => {
    const row = cryptoTable.insertRow();
    row.classList.add(item.id);
    addCell(row, item.rank);
    addCell(row, item.id);
    addCell(row, item.priceUsd);
    addCell(row, item.priceUsd * exchangeRate);
  });
  updateRow();
};

const init = async () => Promise.all([getUSDExchangeRate(), fetchAPIData()]).then((values) => {
  exchangeRate = values[0].replace(/,/g, '.');
  document.querySelector('.exchange').textContent = `1 USD = ${exchangeRate} HRK`;
  populateCryptoTable(values[1]);
  [exchangeRate, previousData] = values;
});
init();
setInterval(init, 20000);
