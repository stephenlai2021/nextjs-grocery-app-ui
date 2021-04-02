import React from 'react'
import BottomNav from './bottom-nav'

const Layout = ({ children }) => {
  return (
    <div>
      { children}
      <BottomNav />
    </div>
  )
}

export default Layout
