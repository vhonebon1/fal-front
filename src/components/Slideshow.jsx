import React from 'react'
import ReactPlayer from 'react-player/lazy'

const Slideshow = ({ item, name, statement, url }) =>

  <>
    <div className="slideshow__wrapper">
      <div className="slideshow__inner">
        { item.isVideo ? 
          <ReactPlayer
            url={url}
            controls={false}
            playing
          />
          : <img src={item.image_file_name} alt="" /> 
        }
      </div>            
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