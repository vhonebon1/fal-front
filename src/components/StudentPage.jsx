import React from 'react'
import Slideshow from './Slideshow.jsx'

class StudentPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      student: null,
      hasData: false
    }
  }

  componentDidMount() {
    const paramsName = this.props.match.params.studentName
    const student = this.props.students.find(student => student.name.replace(/\s+/g, '-').toLowerCase() === paramsName)
    this.setState({student, hasData: true})
  }

  render() {
    const { student, hasData } = this.state
    return (
      <div>
        { hasData && 
          <div>
            <h2>{student.name}</h2>
            <Slideshow items={student.artworks} /> 
          </div>
        }
      </div>
    )
  }
}

export default StudentPage