import React from 'react'

const AboutPage = ({ cohort }) =>
  <div className="cohort__info-block">
    <div className="header-italic">About the course</div>
    <div>{cohort.info.split('\n').map( (it, i) => <p key={'x'+i}>{it}</p> )}</div>
  </div>

export default AboutPage