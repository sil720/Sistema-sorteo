const { Builder } = require('selenium-webdriver');

const plantillas = {
  flyer: 'https://www.canva.com/design/DAFvYg1ZJ9g/view',
  triptico: 'https://www.canva.com/design/DAFvYg1ZJ9g/view',
  diptico: 'https://www.canva.com/design/DAFvYg1ZJ9g/view'
};

async function abrirCanva(tipo) {
  const url = plantillas[tipo] || plantillas.flyer;
  let driver = await new Builder().forBrowser('chrome').build();
  await driver.get('https://www.canva.com/login');
  console.log('?? Esperando login manual en Canva...');
  await driver.sleep(15000);
  await driver.get(url);
  console.log(`?? Plantilla abierta: ${tipo}`);
}

module.exports = abrirCanva;
