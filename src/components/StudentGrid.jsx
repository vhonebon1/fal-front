import React from 'react'
import { Link } from 'react-router-dom'
import FadeIn from "react-lazyload-fadein";


class StudentGrid extends React.Component {
 
  functionAsChildren = (image) => (
    <div>
      <FadeIn height={200} offset={250} >
        {onload => (
          <img
            alt=""
            src={image}
            onLoad={onload}
            style={{ maxHeight: window.screen.width > 1500 ? 250 : 200, maxWidth: window.screen.width > 1170 ? 250 : 200 }}
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
                    { this.functionAsChildren(student.artworks[0].image_file_name) }
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