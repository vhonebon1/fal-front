import React from 'react'
import Vimeo from '@u-wave/react-vimeo';

const Slideshow = ({ item, name, statement }) =>
  <>
    <div className="slideshow__wrapper">
        { item.isVideo ?  
          <div className="slideshow__inner">
            <Vimeo
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
      <div className="students__name">{name}</div>
      <div className="students__artworks-info">
        <span className="students__artworks-title">{item.title}</span>
        <span>{item.date ? `, ${item.date}` : ''}</span>
      </div>
      <div className="students__artworks-statement">{statement}</div>
    </div>
  </>

export default Slideshow