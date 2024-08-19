import {useState} from 'react'

const Nav = ({ homeRef, educationRef, workRef, portfolioRef }) => {
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
            <div className='hidden md:block sticky top-0 dark:bg-slate-800'>
                <ul className='flex bg-stone-100 cursor-pointer dark:bg-slate-800'>
                    <li className='mx-3 my-4 text-2xl text-slate-900 hover:text-slate-600 transition dark:text-white dark:hover:text-slate-400' onClick={() => executeScroll(homeRef)}>Yardley Gutierrez</li>
                    <li className='mx-3 my-5 text-slate-900 hover:text-slate-600 transition dark:text-white dark:hover:text-slate-400' onClick={() => executeScroll(educationRef)}>Education</li>
                    <li className='mx-3 my-5 text-slate-900 hover:text-slate-600 transition dark:text-white dark:hover:text-slate-400' onClick={() => executeScroll(workRef)}>Work Experience</li>
                    <li className='mx-3 my-5 text-slate-900 hover:text-slate-600 transition dark:text-white dark:hover:text-slate-400' onClick={() => executeScroll(portfolioRef)}>Portfolio</li>
                </ul>
            </div>
            
            <div className='md:hidden block sticky top-0 dark:bg-slate-800'>
                <div className='flex justify-between w-100 bg-stone-100 cursor-pointer dark:bg-slate-800'>
                    <div className='mx-3 my-4 text-2xl text-slate-900 hover:text-slate-600 transition dark:text-white dark:hover:text-slate-400' onClick={() => {executeScroll(homeRef); setToggleMenu(false)}}>Yardley Gutierrez</div>
                    <svg
                        onClick={navIconHandler}
                        className='w-8 h-8 text-slate-900 my-4 mr-5 dark:bg-slate-400'
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

                <div className={toggleMenu ? '' : 'hidden'}>
                    <div className='grid grid-cols-1 bg-stone-100 cursor-pointer dark:bg-slate-800'>
                        <div className='mx-3 my-5  text-slate-900 hover:text-slate-600 transition dark:text-white dark:hover:text-slate-400' onClick={() => {executeScroll(educationRef); setToggleMenu(!toggleMenu)}}>Education</div>
                        <div className='mx-3 my-5  text-slate-900 hover:text-slate-600 transition dark:text-white dark:hover:text-slate-400' onClick={() => {executeScroll(workRef); setToggleMenu(!toggleMenu)}}>Work Experience</div>
                        <div className='mx-3 my-5  text-slate-900 hover:text-slate-600 transition dark:text-white dark:hover:text-slate-400' onClick={() => {executeScroll(portfolioRef); setToggleMenu(!toggleMenu)}}>Portfolio</div>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default Nav;