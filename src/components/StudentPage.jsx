import React from 'react'
import Slideshow from './Slideshow.jsx'
import VideoPlayer from './VideoPlayer.jsx'

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
    document.querySelector('.header__title').style.display = 'none'
  }

  componentWillUnmount() {
    document.querySelector('.header__title').style.display = 'block'
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
        <div className="nav__left" onClick={() => this.previousItem()}></div>
        <div className="nav__right" onClick={() => this.nextItem()}></div>
      </div>
    )
  }

  renderSlideshow = () => {
    const { student, visibleItem } = this.state
    return(
      <>
        <Slideshow 
          item={student.artworks[visibleItem]} 
          student={student}
        />
        { student.artworks.length > 1 && this.renderNav() }
      </>
    )
  }

  renderGrid = () => {
    const { student } = this.state
    const showInfo = student.email || student.instagram
    return(
      <div className="student__info">
        <div className="students__page-name">{student.name}</div>
        <div className="students__artworks-statement">{student.statement}</div>
        { showInfo &&
          <div className="students__contact"> 
            { student.instagram &&
              <span>Instagram: <a target="_blank"  href={`https://www.instagram.com/${student.instagram}`}>{`@${student.instagram}`}</a></span>
            }
            { student.email &&
              <span>Website: <a target="_blank" href={`https://${student.email}`}>{student.email}</a></span>
            }
          </div>
        }
        { student.artworks.map((artwork, index) =>
          <>
            { artwork.isVideo ? <VideoPlayer url={artwork.video_url} />
                : <img className="students__image margin-bottom-20" src={artwork.image_file_name} alt="" />
            }
          </>
        )}
      </div>
    )
  }

  render() {
    return (
      <>
        { this.state.hasData && 
          <div className="student__page">
            { window.innerWidth > 768 ? this.renderSlideshow() : this.renderGrid() }
          </div>
        }
      </>
    )
  }
}

export default StudentPage