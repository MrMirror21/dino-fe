import React from 'react'
import MenuIcon from '@/assets/icon/Menu.svg'

interface HeaderProps {
  onClick: () => void;
}
const Header = ({onClick}: HeaderProps) => {
  return (
    <>
      <div className='absolute top-0 left-0 flex items-center justify-between w-full h-[52px] mx-5'>
        <div>DayDream</div>
        <button
        onClick={onClick}
        className="absolute top-4 right-4"
        aria-label="Toggle menu"
      >
        <MenuIcon className="w-6 h-6 mr-5" />
      </button>
      </div>
    </>
  )
}

export default Header