import React from 'react'
import Linkify from 'react-linkify'
import logo from '../logo.png'

const AboutPage = ({ cohort }) =>
  <div className="cohort__info-block">
    <div className="header-italic">About the course</div>
    <Linkify>
      <div>{cohort.info.split('\n').map( (it, i) => <p key={'x'+i}>{it}</p> )}</div>
    </Linkify>
    <img class="logo" src={logo} />
  </div>

export default AboutPage