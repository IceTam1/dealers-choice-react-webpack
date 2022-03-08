const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/recipes_db')

const Recipe = sequelize.define('recipe', {
  name: {
    type: Sequelize.STRING,

  }
})

Recipe.generateRandom = function () {
  return this.create({ name: `Recipe ${Math.ceil(Math.random() * 5000)}` });
}

const syncAndSeed = async () => {
  try {
    await sequelize.sync({ force: true })
    await Recipe.create({ name: 'Chocolate Brownies' })
    await Recipe.create({ name: 'Honey Garlic Chicken Thighs' })
    await Recipe.create({ name: 'Ketchup Shrimp' })
  }
  catch (ex) {
    console.log(ex)
  }
}

module.exports = {
  Recipe,
  syncAndSeed
};