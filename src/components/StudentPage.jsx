import React from 'react'
import Slideshow from './Slideshow.jsx'

class StudentPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      student: null,
      hasData: false,
      visibleItem: 0  
    }
  }

  componentDidMount() {
    const paramsName = this.props.match.params.studentName
    const student = this.props.students.find(student => student.name.replace(/\s+/g, '-').toLowerCase() === paramsName)
    this.setState({student, hasData: true})
  }

  nextItem = () => {
    const { student, visibleItem } = this.state
    const { artworks } = student
    const lastItem = (artworks.length) - 1 === visibleItem
    const newIndex = lastItem ? 0 : visibleItem + 1
    this.setState({ visibleItem: newIndex })
  }

  previousItem = () => {
    const { student, visibleItem } = this.state
    const { artworks } = student    
    const firstItem = visibleItem === 0
    const newIndex = firstItem ? artworks.length - 1 : visibleItem - 1
    this.setState({ visibleItem: newIndex })
  }

  renderNav () {
    return(
      <div className="student__nav">
        <div className="nav__left" onClick={() => this.nextItem()}></div>
        <div className="nav__right" onClick={() => this.previousItem()}></div>
      </div>
    )
  }

  renderSlideshow = () => {
    const { student, visibleItem } = this.state
    return(
      <>
        <Slideshow item={student.artworks[visibleItem]} name={student.name} statement={student.statement} />
        { student.artworks.length > 1 && this.renderNav() }
      </>
    )
  }

  renderGrid = () => {
    const { artworks } = this.state.student
    return(
      <div>
        { artworks.map((artwork, index) =>
          <>
            <img className="students__image margin-top-40" src={artwork.image_file_name} alt="" />
            <div className="students__name margin-top-20">{this.state.student.name}</div>
            <div>
              <span className="students__artworks-title">{artwork.title}</span>
              <span>{artwork.date ? `, ${artwork.date}` : ''}</span>
            </div>
          </>
        )}
      </div>
    )
  }

  render() {
    const { student, hasData, visibleItem } = this.state
    return (
      <>
        { hasData && 
          <>
            { window.innerWidth > 768 ? this.renderSlideshow() : this.renderGrid() }
          </>
        }
      </>
    )
  }
}

export default StudentPage