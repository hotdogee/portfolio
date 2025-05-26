import React from 'react'
import { Button } from './button'

export interface LinkProps extends React.ComponentProps<typeof Button> {
  href: string
  target?: string
  children: React.ReactNode
}

const Link: React.FC<LinkProps> = ({ href, children, ...props }) => {
  return (
    <Button {...props} asChild>
      <a href={href}>{children}</a>
    </Button>
  )
}

export { Link }
