import React from 'react'
import { Link } from 'react-router-dom'
import LazyLoad from 'react-lazyload'
import { CSSTransitionGroup } from 'react-transition-group'


const StudentGrid = ({ students, cohortName }) =>
  <div className="students__grid">
    { students.map(student =>
      <React.Fragment>
        { student.artworks.length > 0 &&
          <Link to={`/${cohortName}/${student.name.replace(/\s+/g, '-').toLowerCase()}`} >
            <div className="students__block" >
              <div className="students__inner">
                <div className="students__image-wrapper">
                  <LazyLoad throttle={200} offset={100}>
                    <CSSTransitionGroup key="1"
                      transitionName="fade"
                      transitionAppear
                      transitionAppearTimeout={500}
                      transitionEnter={false}
                      transitionLeave={false}>
                      <img className="students__image" src={student.artworks[0].image_file_name} alt="" />
                    </CSSTransitionGroup>
                  </LazyLoad>
                </div>
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

export default StudentGrid