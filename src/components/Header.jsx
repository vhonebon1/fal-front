import React from 'react'
import { Link } from 'react-router-dom'

const Header = () =>
  <div className="header">
    <h1>Falmouth show</h1>
    <Link to='/about'>About</Link>
    <Link to='/students'>Students</Link>
    <div>past cohorts</div>
  </div>

export default Header