import React from 'react';
import './App.css';
import CerealsContainer from './Components/CerealsContainer'
import Form from './Components/Form'
import Search from './Components/Search'

class App extends React.Component{

  state = {
    cereals: [],
    searchTerm: ""
  }

  componentDidMount(){
    fetch("http://localhost:4000/cereals")
      .then(r => r.json())
      .then((arrOfCereals) => {
        this.setState({
          cereals: arrOfCereals
        })
      })
  }

  changeSearchTerm = (text) => {
    // console.log("TEXT", text);
    this.setState({
      searchTerm: text
    })
  }

  decideTheArrayBeingSentDown = () => {
    let {cereals, searchTerm} = this.state

    let filteredArray = cereals.filter(cereal => {
      return cereal.cerealName.toLowerCase().includes(searchTerm.toLowerCase())
        ||
      cereal.personName.toLowerCase().includes(searchTerm.toLowerCase())
    })

    return filteredArray
  }



  deleteOneCereal = (idFromChild) => {
    let filteredArray = this.state.cereals.filter(cereal => cereal.id !== idFromChild)
    this.setState({
      cereals: filteredArray
    })
  }

  updateOneCereal = (idFromChild, numberFromChild) => {
    let updatedArray = this.state.cereals.map(oneElementInsideTheArray => {
      if (oneElementInsideTheArray.id === idFromChild) {
        return {...oneElementInsideTheArray, likes: oneElementInsideTheArray.likes + numberFromChild}
      } else {
        return oneElementInsideTheArray
      }
    })
    this.setState({
      cereals: updatedArray
    })
  }

  addOneCereal = (infoComingFromChild) => {
    let newCerealWithId = {
      ...infoComingFromChild,
      id: Math.floor(Math.random() * 1000),
      likes: Math.floor(Math.random() * 25)
    }
    this.setState({
      cereals: [ newCerealWithId, ...this.state.cereals]
    })
  }

  render(){
    return (
      <div className="App">
        <h1>Cereals Application</h1>
        <Search
          searchTerm={this.state.searchTerm}
          changeSearchTerm={this.changeSearchTerm}
        />
        <CerealsContainer
          title="Cereals Container"
          cereals={this.decideTheArrayBeingSentDown()}
          deleteOneCereal={this.deleteOneCereal}
          updateOneCereal={this.updateOneCereal}
        />
        <Form addOneCereal={this.addOneCereal} />
      </div>
    );
  }
}
















export default App;
