import React from 'react'

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
    return (
      <>
        { this.state.hasData &&
          <p>{this.state.student.name}</p>
        }
      </>
    );
  }
}

export default StudentPage