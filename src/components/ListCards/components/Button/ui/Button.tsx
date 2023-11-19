import React from 'react'
import StyledButton from './StyledButton'

export const Button = ({ children, classNameBtn }) => {

  return (
    <StyledButton className={classNameBtn}>
        { children }
    </StyledButton>
  )
}
