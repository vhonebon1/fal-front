import React from 'react'
import Vimeo from '@u-wave/react-vimeo';

const Slideshow = ({ item, student }) =>
  <>
    <div className="slideshow__wrapper">
        { item.isVideo ?  
          <div className="slideshow__inner">
            <Vimeo
              className="video"
              video={item.video_url}
              controls={false}
              loop={true}
              responsive={true}
              autoplay
            />
          </div>
          : 
          <div className="image__inner">
            <img src={item.image_file_name} alt="" /> 
          </div>
        }
      </div>            
    <div className="student-page__info">
      <div className="students__name">{student.name}</div>
      <div className="students__artworks-info">
        <span className="students__artworks-title">{item.title}</span>
        <span>{item.date ? `, ${item.date}` : ''}</span>
      </div>
      <div className="students__artworks-statement">{student.statement}</div>
      { (student.email || student.instagram) &&
        <div className="students__contact"> 
          { student.instagram &&
            <span>Instagram:<a target="_blank" href={student.instagram}>{student.instagram}</a></span>
          }
          { student.email &&
            <span>Email: {student.email}</span>
          }
        </div>
      }
    </div>
  </>

export default Slideshow