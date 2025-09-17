const express = require('express');
const axios = require('axios');
const path = require('path');
const abrirCanva = require('./canvaBot');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

const versiculosPorTema = {
  fe: ['hebreus 11:1', 'mateus 17:20'],
  esperanza: ['romanos 15:13', 'jeremias 29:11'],
  amor: ['1corintios 13:13', 'joao 3:16']
};

async function obtenerVersiculo(ref) {
  const [livro, capVers] = ref.split(' ');
  const [cap, vers] = capVers.split(':');
  try {
    const res = await axios.get(`https://www.abibliadigital.com.br/api/verses/acf/${livro}/${cap}/${vers}`);
    return `${ref} — ${res.data.text}`;
  } catch {
    return `${ref} — Versículo no disponible.`;
  }
}

app.get('/', (req, res) => {
  res.render('index', { versiculos: [], generado: false });
});

app.post('/generar', async (req, res) => {
  const { tema, tipo, versiculo, reflexion, direccion, horarios, telefono, reunion } = req.body;
  const sugerencias = await Promise.all(
    versiculosPorTema[tema].map(ref => obtenerVersiculo(ref))
  );
  try {
    abrirCanva(tipo);
  } catch (err) {
    console.log('?? Error al abrir Canva:', err.message);
  }
  res.render('index', {
    versiculos: sugerencias,
    generado: true,
    tema,
    tipo,
    versiculo,
    reflexion,
    direccion,
    horarios,
    telefono,
    reunion
  });
});

app.listen(3000, () => console.log('? App corriendo en http://localhost:3000'));
