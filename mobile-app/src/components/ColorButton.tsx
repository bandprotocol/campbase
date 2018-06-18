import * as React from 'react'
import { Button } from 'antd-mobile-rn'

const ColorButton = ({ color, style = {}, children, ...props }) => {
  return (
    <Button
      type="primary"
      style={{ ...style, backgroundColor: color, borderColor: color }}
      {...props}
    >
      {children}
    </Button>
  )
}

export default ColorButton
