import React from 'react'
import axios from 'axios'
import './App.scss'
import { Route, Switch } from 'react-router-dom'
import StudentGrid from './components/StudentGrid.jsx'
import StudentPage from './components/StudentPage.jsx'
import AboutPage from './components/AboutPage.jsx'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      students: [],
      cohort: null,
      hasData: false
    }
  }

  componentDidMount() {
    require('dotenv').config()
    this.getData()
  }

  getData = () => {
    axios.get(process.env.REACT_APP_BACK).then((response) => {
      const { students, cohort } = response.data
      this.setState({students, cohort, hasData: true})
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Falmouth show</h1>
        { this.state.hasData &&
          <Switch>
            <Route exact path="/" render={props => (<StudentGrid {...props} students={this.state.students} />)} />
            <Route exact path="/student/:studentName" render={props => (<StudentPage {...props} students={this.state.students} />)} />
            <Route exact path="/about" render={props => (<AboutPage {...props} info={this.state.cohort.info} />)} />
          </Switch>
        }
      </div>
    )
  }
}

export default App
