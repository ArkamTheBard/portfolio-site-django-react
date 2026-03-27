import { useRef, useEffect, useState } from 'react';
import './App.css';
import Nav from './components/Nav'

const API_BASE_URL = (
  process.env.REACT_APP_API_BASE_URL ||
  (process.env.NODE_ENV === 'production' ? 'https://api.yardleygutierrez.com' : '')
).replace(/\/$/, '')

const buildApiUrl = path => `${API_BASE_URL}/${path}`
const THEME_STORAGE_KEY = 'rp-portfolio-theme'

const getPreferredTheme = () => {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function App() {

  const [education, setEducation] = useState([])
  const [work, setWork] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [bio, setBio] = useState([])
  const [theme, setTheme] = useState(getPreferredTheme)

  useEffect( () => {
    getData()
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const homeRef = useRef(null)
  const educationRef = useRef(null)
  const workRef = useRef(null)
  const portfolioRef = useRef(null)

  const toggleTheme = () => {
    setTheme(currentTheme => currentTheme === 'dark' ? 'light' : 'dark')
  }

  const getData = async () => {
    const [educationResponse, workResponse, portfolioResponse, bioResponse] = await Promise.all([
      fetch(buildApiUrl('education')),
      fetch(buildApiUrl('work')),
      fetch(buildApiUrl('portfolio')),
      fetch(buildApiUrl('bio')),
    ])

    const [educationData, workData, portfolioData, bioData] = await Promise.all([
      educationResponse.json(),
      workResponse.json(),
      portfolioResponse.json(),
      bioResponse.json(),
    ])

    setEducation(educationData)
    setWork(workData)
    setPortfolio(portfolioData)
    setBio(bioData)
  }

  return (
    <div className='app-shell'>
      <Nav
        homeRef={homeRef}
        educationRef={educationRef}
        workRef={workRef}
        portfolioRef={portfolioRef}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main className='px-4 pb-16 pt-24 sm:px-6 lg:px-10'>
        <section className='mx-auto grid min-h-[calc(100vh-8rem)] w-full max-w-7xl items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]' ref={homeRef}>
          <div className='space-y-8'>
            <div className='space-y-6'>
              <p className='eyebrow'>Portfolio</p>
              <div className='space-y-4'>
                <h1 className='max-w-4xl text-5xl font-semibold tracking-tight text-[var(--text-strong)] sm:text-6xl lg:text-7xl'>
                  Yardley Gutierrez
                </h1>
                <p className='max-w-2xl text-xl text-[var(--muted)] sm:text-2xl'>
                  Software Engineer building resilient data pipelines, scalable APIs, and intuitive web applications that perform reliably at scale.
                </p>
              </div>
            </div>

            <div className='flex flex-wrap gap-3 text-sm'>
              <span className='pill'>Django + DRF</span>
              <span className='pill'>React</span>
              <span className='pill'>REST APIs</span>
              <span className='pill'>Responsive UI</span>
            </div>

            <div className='hero-grid'>
              <div className='feature-card'>
                <p className='feature-label'>Focus</p>
                <p className='feature-value'>Data platforms & reliable backend systems</p>
              </div>
              <div className='feature-card'>
                <p className='feature-label'>Approach</p>
                <p className='feature-value'>Pragmatic, maintainable engineering</p>
              </div>
            </div>
          </div>

          <div className='panel overflow-hidden p-5 sm:p-7'>
            <div className='flex flex-col gap-6 lg:gap-8'>
              <img alt='profile' className='profile-image mx-auto aspect-[4/5] w-full max-w-sm rounded-[2rem] object-cover' src='./Yardley-Gutierrez-web.jpg'></img>
              <div className='space-y-4'>
                <div className='section-divider flex items-center justify-between gap-4 pb-3'>
                  <h2 className='text-2xl font-semibold tracking-tight text-[var(--text-strong)]'>About me</h2>
                  <span className='status-badge'>Currently active</span>
                </div>
                <div className='max-h-80 space-y-4 overflow-y-auto pr-2'>
            {bio && bio.map(b => (
                    <p key={b.id} className='text-base leading-8 text-[var(--muted)]'>{b.description}</p>
            ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='section-shell mx-auto mt-10 max-w-7xl' ref={educationRef}>
          <div className='section-heading'>
            <p className='eyebrow'>Education</p>
            <h2 className='section-title'>Academic foundation</h2>
            <p className='section-copy'>A concise view of formal training and the groundwork behind the engineering work.</p>
          </div>

          <div className='grid gap-5 md:grid-cols-2'>
        {education && education.map(e => (
            <article key={e.id} className='panel p-6 sm:p-7'>
              <div className='section-divider mb-5 flex items-start justify-between gap-4 pb-4'>
                <div>
                  <h3 className='text-xl font-semibold tracking-tight text-[var(--text-strong)]'>{e.school}</h3>
                  <p className='mt-1 text-sm font-medium uppercase tracking-[0.18em] text-[var(--muted-strong)]'>{e.degree}</p>
                </div>
                <span className='pill shrink-0'>{e.year}</span>
              </div>
              <p className='text-base leading-7 text-[var(--muted)]'>{e.description}</p>
            </article>
        ))}
          </div>
        </section>

        <section className='section-shell mx-auto mt-10 max-w-7xl' ref={workRef}>
          <div className='section-heading'>
            <p className='eyebrow'>Experience</p>
            <h2 className='section-title'>Recent work</h2>
            <p className='section-copy'>Relevant experience with an emphasis on product delivery, implementation details, and technical breadth.</p>
          </div>

          <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
        {work && work.map(w => (
            <article key={w.id} className='panel flex h-full flex-col p-6 sm:p-7'>
              <div className='section-divider mb-5 pb-4'>
                <h3 className='text-xl font-semibold tracking-tight text-[var(--text-strong)]'>{w.company}</h3>
                <p className='mt-1 text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent-strong)]'>{w.job_title}</p>
                <p className='mt-3 text-sm text-[var(--muted-strong)]'>{w.years}</p>
              </div>
              <p className='text-base leading-7 text-[var(--muted)]'>{w.description}</p>
            </article>
        ))}
          </div>
        </section>

        <section className='section-shell mx-auto mt-10 max-w-7xl' ref={portfolioRef}>
          <div className='section-heading'>
            <p className='eyebrow'>Portfolio</p>
            <h2 className='section-title'>Selected projects</h2>
            <p className='section-copy'>A set of shipped or in-progress projects with screenshots and direct links to the code.</p>
          </div>

          <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
          {portfolio && portfolio.map(p => (
            <article key={p.id} className='panel overflow-hidden p-0'>
              <div className='portfolio-media aspect-[16/10] overflow-hidden'>
                <img className='h-full w-full object-cover transition duration-500 hover:scale-[1.03]' alt='portfolio' src={p.image}></img>
              </div>
              <div className='space-y-4 p-6 sm:p-7'>
                <div className='space-y-2'>
                  <h3 className='text-xl font-semibold tracking-tight text-[var(--text-strong)]'>{p.title}</h3>
                  <p className='text-base leading-7 text-[var(--muted)]'>{p.description}</p>
                </div>
                <a className='cta-link inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5' href={p.url}>View code</a>
              </div>
            </article>
          ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
