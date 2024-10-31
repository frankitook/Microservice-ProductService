require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;
const base = require('./configuration/db');
const cors= require('cors');


const categoriasRoutes = require('./routes/categoriaRoutes');
const subcategoriasRoutes = require('./routes/subcategoriaRoutes');
const productRoutes = require('./routes/productRoutes');

app.use(cors());
app.use(express.json());

app.use('/categorias', categoriasRoutes);
app.use('/subcategorias', subcategoriasRoutes);
app.use('/products', productRoutes);




const iniciar = async () => {
  try {
      await base.sync();
      app.listen(port, () => {
          console.log(`Servidor escuchando en http://localhost:${port}`);
      });
  } catch (error) {
      console.error('Error al iniciar el servidor:', error); 
  }
};

  
  iniciar();
