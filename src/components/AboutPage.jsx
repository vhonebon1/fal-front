import React from 'react'

const AboutPage = ({ cohort }) =>
  <div className="cohort__info-block">
    <div className="header-italic">Class of {cohort.name}</div>
    <div>{cohort.info.split('\n').map( (it, i) => <p key={'x'+i}>{it}</p> )}</div>
  </div>

export default AboutPage