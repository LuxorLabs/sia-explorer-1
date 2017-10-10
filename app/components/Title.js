import React from 'react'
import PropTypes from 'prop-types'

Title.propTypes = {
  children: PropTypes.string
}

const Title = ({ children }) => <h1 className='title'>{children}</h1>

export default Title
