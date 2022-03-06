import React from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';



const Recipe = (props) => {
  const recipe = props.recipe;
  return (
    <li>
      {recipe.name}
    </li>
  )
}

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      recipe: []
    }
  }

  async componentDidMount () {
    const response = await axios.get('/api/recipes')
    this.setState({
      recipe: response.data
    })
  }

  render () {
    return (
      <div>
        <h1> Ice's Favorite Recipes </h1>
        <ul>
            {this.state.recipe.map((recipe) => {
              return (
                <Recipe recipe={recipe} key={recipe.id} />
              )
            })}
        </ul>
     </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));