import React from 'react'
import { Link } from 'react-router-dom'
import FadeIn from "react-lazyload-fadein";


class StudentGrid extends React.Component {
 
  functionAsChildren = (image, size) => (
    <div>
      <FadeIn height={size} offset={250} >
        {onload => (
          <img
            alt=""
            src={image}
            onLoad={onload}
            style={{ maxHeight: size, maxWidth: size }}
          />
        )}
      </FadeIn>
    </div>
  )

  render() {
    const { students, cohortName } = this.props
    const isMobile = window.screen.width < 768
    const isLarge = window.screen.width > 1500
    const size = isMobile ? "100%" : isLarge ? 250 : 200
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
                    { window.screen < 768 ? 
                      <img alt="" src={student.artworks[0].image_file_name} />
                      : this.functionAsChildren(student.artworks[0].image_file_name, size) }
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