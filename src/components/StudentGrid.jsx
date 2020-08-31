import React from 'react'
import { Link } from 'react-router-dom'
import FadeIn from "react-lazyload-fadein";


class StudentGrid extends React.Component {

   constructor(props) {
    super(props);
    const startSize = this.calculateSize()
    this.state = {
      size: startSize
    }
  }

  componentWillMount = () => {
    this.setState({ size: this.calculateSize() })
    const self = this;
    window.addEventListener('resize', function(event){
      self.setState({ size: self.calculateSize() })
    })
  }

  componentWillUnmount = () => {
    const self = this;
    window.removeEventListener('resize', function(event){
      self.setState({ size: self.calculateSize() })
    })
  }

  calculateSize = () => {
    const isMobile = window.innerWidth < 500
    const isLarge = window.innerWidth > 1500
    return isMobile ? (window.innerWidth) : isLarge ? 250 : 200
  }

  functionAsChildren = (image) => (
    <div>
      <FadeIn height={this.state.size} offset={250} >
        {onload => (
          <img
            alt=""
            src={image}
            onLoad={onload}
            style={{ maxHeight: this.state.size, maxWidth: this.state.size }}
          />
        )}
      </FadeIn>
    </div>
  )

  render() {
    const { students, cohortName } = this.props
    return (
      <div className="students__grid">
        { students.map((student, index) =>
          <React.Fragment key={index}>
            { student.artworks.length > 0 &&
              <Link 
                to={`/${cohortName}/${student.name.replace(/\s+/g, '-').toLowerCase()}`} 
                id={index} 
              >
                <div className="students__image-wrapper">
                  <div className="students__image-innerWrapper">
                    { window.innerWidth < 500 ?
                      <img alt="" src={student.artworks[0].image_file_name.small} />
                      : this.functionAsChildren(student.artworks[0].image_file_name.small) }
                  </div>
                  <div className="students__info">
                    <div className="students__name">{student.name.toUpperCase()}</div>
                    <div className="students__artworks-info">
                      <span className="students__artworks-title">{student.artworks[0].title}</span>
                      <span>{student.artworks[0].date ? `, ${student.artworks[0].date}` : ''}</span>
                    </div>
                  </div>
                </div>
              </Link>
            }
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default StudentGrid