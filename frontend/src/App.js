import { useRef, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav'

export function useIsVisible(ref) {

  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting)
    })

    observer.observe(ref.current)
    return () => {
      observer.disconnect()
    }

  }, [ref])

  return isIntersecting

}

function App() {

  const [education, setEducation] = useState([])
  const [work, setWork] = useState([])
  const [portfolio, setPortfolio] = useState([])

  useEffect( () => {
    getData()
  }, [])
  const homeRef = useRef(null)
  const educationRef = useRef(null)
  const workRef = useRef(null)
  const portfolioRef = useRef(null)

  const isVisible0 = useIsVisible(homeRef)
  const isVisible1 = useIsVisible(educationRef)
  const isVisible2 = useIsVisible(workRef)
  const isVisible3 = useIsVisible(portfolioRef)

  const getData = async () => {
    const educationResponse = await fetch('https://api.yardleygutierrez.com/education')
    const educationData = await educationResponse.json()
    setEducation(educationData)

    const workResponse = await fetch('https://api.yardleygutierrez.com/work')
    const workData = await workResponse.json()
    setWork(workData)

    const portfolioResponse = await fetch('https://api.yardleygutierrez.com/portfolio')
    const portfolioData = await portfolioResponse.json()
    setPortfolio(portfolioData)
  }

  return (
    <>
      <Nav homeRef={homeRef} educationRef={educationRef} workRef={workRef} portfolioRef={portfolioRef} />
      <div className={`md:h-screen pt-10 transition-opacity ease-in duration-700 ${isVisible0 ? "opacity-100" : "opacity-0"}`} ref={homeRef}>
        <div className='md:w-2/4 w-10/12 mx-auto mt-10 mb-3'>
          <h1 className='text-5xl mb-3'>Yardley Gutierrez</h1>
          <p className='text-2xl text-cyan-800 ml-2'>Software Engineer II</p>
        </div>

        <div className='flex md:flex-row flex-col space-between md:w-2/4 m-auto py-5 border rounded-sm px-3 shadow'>
          <img alt='profile' className='rounded-full w-64 h-72 mx-8' src='./Yardley-Gutierrez-web.jpg'></img>
          <div>
            <h5 className='text-2xl text-cyan-900 border-b-2 border-slate-300'>About me</h5>
            <p className='pt-3'>I am currently a Software Engineer with Walmart Global Tech with a focus on SDET (Software Development Engineering in Test). I am also currently my team's Dev Support lead, so I do L3 support for our product. I have a background in computer science and mathematics. During my time at Field Agent, I fulfilled a dual-role as both an IT Technician and Support Developer where I usually handled projects for both their IT operation and development/deployment of internal tools. I also handled a support helpdesk for both all things IT and any bugs or issues that came up with their webapp. This included live debugging and writing up bug cards for the development team to take a look at. Having attended both Texas A&M University and the University of Nevada Las Vegas, I have a strong background in computer science. I have worked with a variety of languages and frameworks, including C++, Java, Python, Django, and Angular. Outside of required classes, I worked with Texas Aggie Game Developers during my time at Texas A&M University where we worked together on a passion project to create a 2D Role-Playing Game. I am a graduate from Eastfield College in Mesquite, Texas with an Associates in Science. Prior to working with Field Agent, I worked as a health professional with CVS Pharmacy and then with Northwest Health Systems. I am a graduate of LaunchCode's Full Stack Web Development in Java/Javascript bootcamp as of April 2021. I have also been working on a Discord bot using their Python API and a Discord.js library to create a bot that can be used to play games with friends and manage server permissions. I have many other passions, for example, I am very passionate and interested in learning about moral phiolosophy. Recently I have been reading the Metaphysics of Morals by Emmanuel Kant.</p>
          </div>
        </div>
      </div>

      <div className={`md:h-screen pt-16 transition-opacity ease-in duration-700 ${isVisible1 ? "opacity-100" : "opacity-0"}`} ref={educationRef}>
        <div className='mb-5 mx-5'>
          <h1 className='text-5xl mb-3'>My Education</h1>
          <p className='text-lg text-cyan-900'>Here is the education I have received</p>
        </div>

        <div className='grid md:grid-cols-2 grid-cols-1 gap-4 mx-5'>
        {education && education.map(e => (
          <div key={e.id} className='border rounded-sm p-3 shadow'>
            <h3 className='text-lg border-b-2 border-slate-300 text-slate-800'>{e.school}, {e.degree}</h3>
            <h5 className='py-2'>{e.year}</h5>
            <p>{e.description}</p>
          </div>
        ))}
        </div>
      </div>

      <div className={`md:h-screen pt-16 transition-opacity ease-in duration-700 ${isVisible2 ? "opacity-100" : "opacity-0"}`} ref={workRef}>
        <div className='mb-5 mx-5'>
          <h1 className='text-5xl mb-3'>My Work Experience</h1>
          <p className='text-lg text-cyan-900'>Here is my most recent relevant work experience</p>
        </div>

        <div className='grid md:grid-cols-3 grid-cols-1 gap-4 mx-5'>
        {work && work.map(w => (
          <div key={w.id} className='border rounded-sm p-3 shadow'>
          <h3 className='text-lg border-b-2 border-slate-300 text-slate-800'>{w.company}, {w.job_title}</h3>
          <h5 className='py-2'>{w.years}</h5>
          <p>{w.description}</p>
          </div>
        ))}
        </div>
      </div>

      <div className={`md:h-screen pt-16 transition-opacity ease-in duration-700 ${isVisible3 ? "opacity-100" : "opacity-0"}`} ref={portfolioRef}>
        <div className='mb-5 mx-5'>
          <h1 className='text-5xl mb-3'>My Portfolio</h1>
          <p className='text-lg text-cyan-900'>Here are some of my own projects I have been working on/built with a link to the code on GitHub</p>
        </div>

        <div className='grid md:grid-cols-3 grid-cols-1 gap-4 mx-5'>
          {portfolio && portfolio.map(p => (
            <div key={p.id} className='border rounded-sm p-3 shadow'>
            <h3 className='text-lg border-b-2 border-slate-300 text-slate-800'>{p.title}</h3>
            <a className='py-2 text-blue-500 hover:text-blue-700 transition cursor-pointer' href={p.url}>View Code</a>
            <p>{p.description}</p>
            <img alt='portfolio' src={p.image}></img>
            </div>
          ))}
        </div>
      </div>

    </>
  );
}

export default App;
