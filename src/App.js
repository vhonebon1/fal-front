import React from 'react'
import axios from 'axios'
import './App.scss'
import { Route, Switch, Link } from 'react-router-dom'
import StudentGrid from './components/StudentGrid.jsx'
import StudentPage from './components/StudentPage.jsx'
import StudentIndex from './components/StudentIndex.jsx'
import AboutPage from './components/AboutPage.jsx'
import Header from './components/Header.jsx'

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

  renderHeader() {
    return (
      <div className="header__links">
        <div className="header__title">
          <Link to='/'>Falmouth photography display</Link>
        </div>
        <div class="flex">
          <Link to='/about'>About</Link>
          <a href="">Past cohorts</a>
        </div>
      </div>)
  }

  alphabet() {
    const thing = {}
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
    alphabet.forEach(letter => thing[letter] = [])
    return thing
  }

  studentsByName = () => {
    const groups = this.alphabet()
    this.state.students.forEach(student => {
      groups[student.name[0].toLowerCase()].push(student)
    })
    return groups
  }

  render() {
    return (
      <div className="App">
        { this.state.hasData &&
          <>
          { this.renderHeader() }
          <Switch>
            <Route exact path="/" render={props => (<StudentGrid {...props} students={this.state.students} />)} />
            <Route exact path="/student/:studentName" render={props => (<StudentPage {...props} students={this.state.students} />)} />
            <Route exact path="/about" render={props => (<AboutPage {...props} info={this.state.cohort.info} />)} />
            <Route exact path="/students" render={props => (<StudentIndex {...props} students={this.state.students} />)} />
          </Switch>
          </>
        }
      </div>
    )
  }
}

export default App
