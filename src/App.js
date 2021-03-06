import React from 'react'
import axios from 'axios'
import './App.scss'
import { Route, Switch, Link } from 'react-router-dom'
import StudentGrid from './components/StudentGrid.jsx'
import StudentPage from './components/StudentPage.jsx'
import AboutPage from './components/AboutPage.jsx'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      students: [],
      cohort: null,
      pastCohorts: [],
      hasData: false,
      showDropdown: false
    }
  }

  componentDidMount() {
    this.getData()
  }

  applyFont () {
    const docHead = document.getElementsByTagName("head")[0]
    var link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = `https://fonts.googleapis.com/css?family=${this.state.settings.font}`
    docHead.appendChild(link)
    document.getElementsByTagName("body")[0].style = `font-family: ${this.state.settings.font}`  
  }

  getData = () => {
    axios.get(process.env.REACT_APP_BACK).then((response) => {
      const { students, cohort, past_cohorts, settings } = response.data
      this.setState({ students, cohort, pastCohorts: past_cohorts, settings, hasData: true})
    })
  }

  toggleShowDropdown = () => {
    this.setState({ showDropdown: true})
  }

  toggleHideDropdown = () => {
    this.setState({ showDropdown: false})
  }

  renderHeader() {
    const { pastCohorts, showDropdown, cohort, settings } = this.state
    const showPastCohorts = pastCohorts.length > 0 && showDropdown
    return (
      <div className="header">
        <div className="header__title">
          <Link to='/'>{settings.title}</Link>
        </div>
        <div className="header__links">
          <div className="header__links-inner">
            <Link className="header-link" to='/'>Home</Link>
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
        </div>
      </div>)
  }

  render() {
    const { students, cohort, settings } = this.state
    return (
      <div className="App">
        { this.state.hasData &&
          <>
            { this.applyFont() }
            { this.renderHeader() }
            <Switch>
              <Route exact path="/" render={props => 
                (<StudentGrid {...props} 
                  students={students} 
                  cohortName={cohort.name}
                  columns={settings.columns}
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
            </Switch>
          </>
        }
      </div>
    )
  }
}

export default App
