import React from 'react'
import VideoPlayer from './VideoPlayer.jsx'

const Slideshow = ({ item, student }) =>
  <>
    <div className="slideshow__wrapper">
        { item.isVideo ?  
          <div className="slideshow__inner">
            <VideoPlayer url={item.video_url} />
          </div>
          : 
          <div className="image__inner">
            <img src={item.image_file_name} alt="" /> 
          </div>
        }
      </div>            
    <div className="student-page__info">
      <div className="student-page__info-wrapper">
        <div className="students__page-name">{student.name}</div>
        <div className="students__artworks-info">
          <span className="students__artworks-title">{item.title}</span>
          <span>{item.date ? `, ${item.date}` : ''}</span>
        </div>
        <div className="students__artworks-statement">{student.statement}</div>
        { (student.email || student.instagram) &&
          <div className="students__contact">
            { student.instagram &&
              <span>Instagram: <a target="_blank"  href={`https://www.instagram.com/${student.instagram}`}>{`@${student.instagram}`}</a></span>
            }
            { student.email &&
              <span>Website: <a target="_blank" href={student.email}>{student.email}</a></span>
            }
          </div>
        }
      </div>
    </div>
  </>

export default Slideshow