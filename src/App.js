import React from 'react'
import axios from 'axios'
import './App.scss'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      students: [],
      selectedStudent: null
    }
  }

  componentWillMount() {
    require('dotenv').config()
    this.getData()
  }

  getData = () => {
    axios.get(process.env.REACT_APP_BACK).then((response) => {
      const { students, cohort } = response.data
      this.setState({students, cohort})
    })
  }

  filterByStudent = (id) => {
    const selected = this.state.students.filter((student) => student.id == id)
    this.setState({selectedStudent: selected})
  }

  clearSelectedStudent = () => {
    this.setState({selectedStudent: null})
  }

  renderGrid() {
    return(
      <div className="students__grid">
        { this.state.students.map(student =>
          <div className="students__block">
            <div className="student__image-wrapper">
              <img className="students__image" src={student.main_image.image_file_name} />
            </div>
            <div className="students__info">
              <div className="students__name">{student.name.toUpperCase()}</div>
              <div>
                <span className="students__artworks-title">{student.main_image.title}</span>
                <span>, {student.main_image.date}</span>
              </div>
            </div>
          </div>)
        }
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <h1>Falmouth show</h1>
        { this.state.students.length > 0 && this.renderGrid() }
      </div>
    )
  }
}

export default App
