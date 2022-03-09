const { syncAndSeed, Recipe } = require('./db');
const express = require('express')
const app = express();
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/recipes', async (req, res, next) => {
  try {
    res.send(await Recipe.findAll())
  }
  catch (ex) {
    next(ex)
  }
})

app.delete('/api/recipes/:id', async (req, res, next) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id)
    await recipe.destroy()
    res.sendStatus(204)
  }
  catch (ex) {
    next(ex)
  }
})

app.post('/api/recipes', async (req, res, next) => {
  try {
    res.status(201).send(await Recipe.generateRandom());
  }
  catch (ex) {
    next(ex)
  }
})



const start = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
  }
  catch (ex) {
    console.log(ex)
  }
}

start();