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
      pastCohorts: [],
      hasData: false,
      showDropdown: false,
      lastScrollPosition: null
    }
  }

  componentDidMount() {
    require('dotenv').config()
    this.getData()
  }

  getData = () => {
    axios.get(process.env.REACT_APP_BACK).then((response) => {
      const { students, cohort, past_cohorts } = response.data
      this.setState({students, cohort, pastCohorts: past_cohorts, hasData: true})
    })
  }

  toggleShowDropdown = () => {
    this.setState({ showDropdown: true})
  }

  toggleHideDropdown = () => {
    this.setState({ showDropdown: false})
  }

  saveScrollPosition = (e) => {
    this.setState({ lastScrollPosition: e.target.offsetTop })
  }

  renderHeader() {
    const { pastCohorts, showDropdown } = this.state
    const showPastCohorts = pastCohorts.length > 0 && showDropdown
    return (
      <div className="header__links">
        <div className="header__title">
          <Link to='/'>Falmouth fashion photography</Link>
        </div>
        <div className="flex">
          <Link className="header-link" to='/about'>About</Link>
          { pastCohorts.length > 0 &&
            <div className="header-link" onMouseEnter={() => this.toggleShowDropdown()} onMouseLeave={() => this.toggleHideDropdown()}>
              Past cohorts
              { showPastCohorts && 
                <div className="cohort-links">
                  { this.state.pastCohorts.map(cohort => 
                    <Link to='/about' class="cohort-link">{cohort}</Link>
                  )}
                </div>
              }
            </div>
          }
        </div>
      </div>)
  }

  render() {
    const { students, cohort, lastScrollPosition } = this.state
    return (
      <div className="App">
        { this.state.hasData &&
          <>
          { this.renderHeader() }
          <Switch>
            <Route exact path="/" render={props => 
              (<StudentGrid {...props} 
                students={students} 
                cohortName={cohort.name}
                saveScrollPosition={this.saveScrollPosition}
                lastScrollPosition={lastScrollPosition}
              />)
            } />
            <Route 
              exact path={`/${cohort.name}/:studentName`} 
              render={props => (<StudentPage {...props} students={students} />)} 
            />
            <Route 
              exact path="/about" 
              render={props => (<AboutPage {...props} cohort={cohort} />)} 
            />
            <Route 
              exact path="/students" 
              render={props => (<StudentIndex {...props} students={students} />)} 
            />
          </Switch>
          </>
        }
      </div>
    )
  }
}

export default App
