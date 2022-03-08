import React from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';

const Recipe = (props) => {
  const recipe = props.recipe;
  const destroy = props.destroy;
  return (
    <li>{ recipe.name } <button onClick={ ()=> destroy(recipe)}>Delete Recipe</button></li>
  )
}

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      recipe: []
    }
    this.create = this.create.bind(this)
    this.destroy = this.destroy.bind(this)
  }

  async componentDidMount () {
    const response = await axios.get('/api/recipes')
    this.setState({
      recipe: response.data
    })
    console.log('hi')
  }

  async create () {
    const response = await axios.post('/api/recipes')
    const recipe = response.data
    // const responseRecipes = [...this.state.recipes, recipe]
    this.setState({ recipe: [...this.state.recipe, recipe] })
  }

  async destroy (recipeDelete) {
    await axios.delete(`/api/recipes/${recipeDelete.id}`)
    const recipe = this.state.recipe.filter(recipe => recipe.id !== recipeDelete.id)
    this.setState({ recipe })
  }

  

  render () {
    return (
      <div>
        <h1> The Recipe Randomizer! </h1>
        <button onClick={ this.create }> Add New Recipe </button>
        <ul>
            {this.state.recipe.map((recipe) => {
              return (
                <Recipe recipe={recipe} key={recipe.id} destroy={this.destroy}/>
              )
            })}
        </ul>
     </div>
    )
  }
}


ReactDOM.render(<App />, document.querySelector('#root'));