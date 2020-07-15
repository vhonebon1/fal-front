import React from 'react'
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazyload'
import { CSSTransitionGroup } from 'react-transition-group'


class StudentGrid extends React.Component {

  componentDidMount = () => window.scrollTo(0, (this.props.lastScrollPosition - 80))

  render() {
    const { students, cohortName, saveScrollPosition } = this.props
    return (
      <div className="students__grid">
        { students.map((student, index) =>
          <React.Fragment key={index}>
            { student.artworks.length > 0 &&
              <Link 
                to={`/${cohortName}/${student.name.replace(/\s+/g, '-').toLowerCase()}`} 
                id={index} 
                onClick={(e) => saveScrollPosition(e)} 
              >

                <div className="students__image-wrapper">
                  <LazyLoad throttle={50} offset={200}>
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
              </Link>
            }
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default StudentGrid