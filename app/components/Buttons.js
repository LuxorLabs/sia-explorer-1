import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ text, ...rest }) => {
  return <Link className='btn btn-lg btn-primary' {...rest}>{text}</Link>
}

export default Button
