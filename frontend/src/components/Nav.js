import {useState} from 'react'

const Nav = ({ homeRef, educationRef, workRef, portfolioRef, theme, onToggleTheme }) => {
    const [toggleMenu, setToggleMenu] = useState(false)
    const navIconHandler = e => {
        e.preventDefault()
        setToggleMenu(!toggleMenu)
    }

    const executeScroll = ref => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    return (
        <>
            <header className='fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6 lg:px-10'>
                <div className={`nav-shell mx-auto max-w-7xl px-4 py-3 ${toggleMenu ? 'nav-shell-open' : 'rounded-full'}`}>
                    <div className='hidden items-center justify-between md:flex'>
                        <button className='text-left text-xl font-semibold tracking-tight text-[var(--text-strong)] transition hover:text-[var(--accent-strong)]' onClick={() => executeScroll(homeRef)}>Yardley Gutierrez</button>
                        <div className='flex items-center gap-3'>
                            <nav>
                            <ul className='flex items-center gap-2'>
                                <li><button className='nav-link' onClick={() => executeScroll(educationRef)}>Education</button></li>
                                <li><button className='nav-link' onClick={() => executeScroll(workRef)}>Experience</button></li>
                                <li><button className='nav-link' onClick={() => executeScroll(portfolioRef)}>Portfolio</button></li>
                            </ul>
                            </nav>
                            <button className='theme-toggle' onClick={onToggleTheme}>
                                <span className='theme-toggle-icon'>{theme === 'dark' ? '🌙' : '☀️'}</span>
                                <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
                            </button>
                        </div>
                    </div>

                    <div className='flex items-center justify-between gap-3 md:hidden'>
                        <button className='text-left text-lg font-semibold tracking-tight text-[var(--text-strong)]' onClick={() => {executeScroll(homeRef); setToggleMenu(false)}}>Yardley Gutierrez</button>
                        <div className='flex items-center gap-2'>
                            <button className='theme-toggle theme-toggle-mobile' onClick={onToggleTheme}>
                                <span className='theme-toggle-icon'>{theme === 'dark' ? '🌙' : '☀️'}</span>
                            </button>
                            <svg
                                onClick={navIconHandler}
                                className='menu-toggle'
                                x-show='!showMenu'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path d='M4 6h16M4 12h16M4 18h16'></path>
                            </svg>
                        </div>
                    </div>

                    <div className={toggleMenu ? 'menu-panel mt-3 grid gap-2 pt-3' : 'hidden'}>
                        <button className='mobile-nav-link' onClick={() => {executeScroll(educationRef); setToggleMenu(false)}}>Education</button>
                        <button className='mobile-nav-link' onClick={() => {executeScroll(workRef); setToggleMenu(false)}}>Experience</button>
                        <button className='mobile-nav-link' onClick={() => {executeScroll(portfolioRef); setToggleMenu(false)}}>Portfolio</button>
                    </div>
                </div>
            </header>
        </>
    );
}
 
export default Nav;
