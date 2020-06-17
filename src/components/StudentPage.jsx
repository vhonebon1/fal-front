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
      <>
        { hasData && 
          <><Slideshow items={student.artworks} name={student.name} statement={student.statement} /></>
        }
      </>
    )
  }
}

export default StudentPage