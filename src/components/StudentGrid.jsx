import React from 'react'
import { Link } from 'react-router-dom'

const StudentGrid = ({ students }) =>
  <div className="students__grid">
    { students.map(student =>
      <Link to={`/student/${student.name.replace(/\s+/g, '-').toLowerCase()}`} >
        <div className="students__block" >
          <div className="students__inner">
            <div className="students__image-wrapper">
              <img className="students__image" src={student.main_image.image_file_name} alt="" />
            </div>
          </div>
          <div className="students__info">
            <div className="students__name">{student.name.toUpperCase()}</div>
            <div className="students__artworks-info">
              <span className="students__artworks-title">{student.main_image.title}</span>
              <span>, {student.main_image.date}</span>
            </div>
          </div>
        </div>
      </Link>)
    }
  </div>

export default StudentGrid