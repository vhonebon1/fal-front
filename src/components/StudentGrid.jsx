import React from 'react'
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazyload'
import { CSSTransitionGroup } from 'react-transition-group'


class StudentGrid extends React.Component {

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
                    <LazyLoad throttle={200} offset={100}>
                      <CSSTransitionGroup key="1"
                        transitionName="fade"
                        transitionAppear
                        transitionAppearTimeout={100}
                        transitionEnter={false}
                        transitionLeave={false}>
                        <img className="students__image" src={student.artworks[0].image_file_name} alt="" />
                      </CSSTransitionGroup>
                    </LazyLoad>
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