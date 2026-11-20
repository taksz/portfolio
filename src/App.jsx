import { useEffect, useState } from 'react'
import { USER, LINKS, status, about, snapshot, facts, projects, tools, marquee } from './data.js'

const NAV = [
  ['inicio', 'Início'],
  ['sobre', 'Sobre'],
  ['projetos', 'Projetos'],
  ['ferramentas', 'Ferramentas'],
  ['github', 'GitHub'],
  ['contato', 'Contato'],
]

const POWERBI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><rect x='3' y='12' width='4' height='9' rx='1' fill='#4FA3E0'/><rect x='10' y='7' width='4' height='14' rx='1' fill='#4FA3E0'/><rect x='17' y='3' width='4' height='18' rx='1' fill='#4FA3E0'/></svg>"
  )
const iconUrl = (slug) => (slug === 'powerbi' ? POWERBI : `https://cdn.simpleicons.org/${slug}/4FA3E0`)

function Tech({ slug, name }) {
  const [ok, setOk] = useState(true)
  return ok ? (
    <img src={iconUrl(slug)} alt="" loading="lazy" onError={() => setOk(false)} />
  ) : (
    <span className="fallback">{name[0]}</span>
  )
}

function useGithubStats() {
  const [s, setS] = useState(null)
  useEffect(() => {
    const ctrl = new AbortController()
    Promise.all([
      fetch(`https://api.github.com/users/${USER}`, { signal: ctrl.signal }).then((r) => r.json()),
      fetch(`https://api.github.com/users/${USER}/repos?per_page=100`, { signal: ctrl.signal }).then((r) => r.json()),
    ])
      .then(([u, repos]) => {
        if (!u.login || !Array.isArray(repos)) return
        const langs = {}
        repos.filter((r) => !r.fork && r.language).forEach((r) => (langs[r.language] = (langs[r.language] || 0) + 1))
        setS({ repos: u.public_repos, followers: u.followers, since: new Date(u.created_at).getFullYear(), langs })
      })
      .catch(() => {})
    return () => ctrl.abort()
  }, [])
  return s
}

function useActive(ids) {
  const [a, setA] = useState(ids[0])
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setA(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ids.forEach((id) => document.getElementById(id) && io.observe(document.getElementById(id)))
    return () => io.disconnect()
  }, [ids])
  return a
}

// revela elementos e faz o brilho seguir o mouse nos cards
function useEffects() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    const move = (e) => {
      const c = e.target.closest && e.target.closest('.spot')
      if (!c) return
      const r = c.getBoundingClientRect()
      c.style.setProperty('--mx', `${e.clientX - r.left}px`)
      c.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    document.addEventListener('mousemove', move, { passive: true })
    return () => { io.disconnect(); document.removeEventListener('mousemove', move) }
  })
}

const WAVE = 'M0 100 C240 20 480 180 720 100 C960 20 1200 180 1440 100 C1680 20 1920 180 2160 100 C2400 20 2640 180 2880 100 V300 H0 Z'

function Nav({ active }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="nav-shell">
      <nav className="nav glass">
        <a href="#inicio" className="logo"><span className="logo-mark">AG</span><span>Arthur<em>.</em></span></a>
        <ul className={`nav-links ${open ? 'open' : ''}`}>
          {NAV.map(([id, label]) => (
            <li key={id}><a href={`#${id}`} className={active === id ? 'on' : ''} onClick={() => setOpen(false)}>{label}</a></li>
          ))}
        </ul>
        <a className="nav-cta" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        <button className="burger" aria-label="Abrir menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}><span /><span /></button>
      </nav>
    </header>
  )
}

function Hero({ stats }) {
  return (
    <section id="inicio" className="hero">
      <div className="hero-bg" aria-hidden="true">
        <span className="orb o1" /><span className="orb o2" /><span className="grid" />
        <svg className="waves" viewBox="0 0 1440 300" preserveAspectRatio="none">
          <g className="w1"><path d={WAVE} fill="rgba(79,163,224,0.20)" /></g>
          <g className="w2"><path d={WAVE} fill="rgba(79,163,224,0.13)" /></g>
          <g className="w3"><path d={WAVE} fill="#0d1117" /></g>
        </svg>
      </div>

      <div className="wrap hero-grid">
        <div>
          <p className="chip reveal"><span className="pulse" />{status.looking}</p>
          <h1 className="reveal" style={{ '--d': '80ms' }}>Arthur<br /><span className="grad">Gomes</span></h1>
          <p className="tagline mono reveal" style={{ '--d': '140ms' }}>Dados • Automação • Python</p>
          <p className="lead reveal" style={{ '--d': '200ms' }}>
            {status.role} na UDF, em Brasília. Transformo dado bagunçado em algo útil: um alerta, um painel, uma API.
          </p>
          <div className="actions reveal" style={{ '--d': '260ms' }}>
            <a href="#projetos" className="btn btn-primary">Ver projetos</a>
            <a href={LINKS.linkedin} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a href={LINKS.github} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          </div>
        </div>

        <div className="portrait reveal" style={{ '--d': '160ms' }}>
          <div className="ring-frame"><img src={`${import.meta.env.BASE_URL}foto.jpg`} alt="Foto de Arthur Gomes" width="360" height="360" /></div>

          <div className="win term float-a">
            <div className="win-bar"><i /><i /><i /><span className="mono">~/arthur</span></div>
            <div className="win-body mono">
              <div><b>$</b> whoami</div>
              <div className="out">arthur · dados, automação, python</div>
              <div><b>$</b> status</div>
              <div className="out">buscando 1º estágio<span className="caret" /></div>
            </div>
          </div>
          <div className="win chip-win float-b mono"><span className="dot-live" />{status.school}</div>
          <div className="win chip-win float-c mono">{stats ? stats.repos : '–'} repositórios</div>
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  // cada faixa mostra metade das ferramentas, repetida 4x para nunca ficar vazia
  const half = Math.ceil(marquee.length / 2)
  const row = (items, rev) => (
    <div className={`m-track ${rev ? 'rev' : ''}`}>
      {[0, 1, 2, 3].flatMap((c) =>
        items.map(([name, slug]) => (
          <span className="m-item" key={`${c}-${name}`}><Tech slug={slug} name={name} />{name}</span>
        ))
      )}
    </div>
  )
  return (
    <div className="marquee" aria-hidden="true">
      {row(marquee.slice(0, half), false)}
      {row(marquee.slice(half), true)}
    </div>
  )
}

const H = ({ n, label, children }) => (
  <header className="sec-head reveal">
    <span className="mono sec-index">{n} / {label}</span>
    <h2>{children}</h2>
  </header>
)

export default function App() {
  const stats = useGithubStats()
  const active = useActive(NAV.map(([id]) => id))
  useEffects()
  const total = stats ? Object.values(stats.langs).reduce((a, b) => a + b, 0) : 0

  return (
    <>
      <div className="bg-glow" aria-hidden="true" />
      <Nav active={active} />
      <main>
        <Hero stats={stats} />
        <Marquee />

        <section id="sobre" className="section">
          <div className="wrap">
            <H n="01" label="sobre">Quem está <em>por trás do código</em></H>
            <div className="about-grid">
              <div className="reveal">
                {about.map((t) => <p key={t} className="big">{t}</p>)}
                <div className="facts">
                  {facts.map(([a, b]) => (
                    <div className="fact spot" key={b}><strong>{a}</strong><span>{b}</span></div>
                  ))}
                </div>
              </div>
              <div className="win term big-term reveal" style={{ '--d': '120ms' }}>
                <div className="win-bar"><i /><i /><i /><span className="mono">snapshot.txt</span></div>
                <div className="win-body mono">
                  {snapshot.map(([k, v]) => (
                    <div key={k}><b>{k.padEnd(6, ' ')}</b>{v}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projetos" className="section">
          <div className="wrap">
            <H n="02" label="projetos">Projetos <em>que funcionam</em></H>
            <div className="proj-grid">
              {projects.map((p, i) => (
                <article className="proj spot reveal" key={p.name} style={{ '--d': `${(i % 3) * 70}ms` }}>
                  <div className="win-bar"><i /><i /><i /><span className="mono">{p.file}</span></div>
                  <div className="proj-art">
                    <Tech slug={p.icon} name={p.name} />
                    <span className="art-ring" />
                  </div>
                  <div className="proj-body">
                    <h3>{p.name}</h3>
                    <p>{p.text}</p>
                    <div className="chips">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
                    <div className="proj-links">
                      {p.demo && <a className="btn btn-primary" href={p.demo} target="_blank" rel="noopener noreferrer">Demo ao vivo ↗</a>}
                      <a className="btn btn-ghost" href={p.code} target="_blank" rel="noopener noreferrer">Código</a>
                    </div>
                  </div>
                </article>
              ))}
              <article className="proj more spot reveal">
                <h3>Tem mais no GitHub</h3>
                <p>Estudos, atividades da faculdade e os projetos de dados, todos abertos.</p>
                <a className="btn btn-primary" href={LINKS.github} target="_blank" rel="noopener noreferrer">Ver meu GitHub ↗</a>
              </article>
            </div>
          </div>
        </section>

        <section id="ferramentas" className="section">
          <div className="wrap">
            <H n="03" label="ferramentas">Ferramentas <em>que eu uso</em></H>
            <div className="tool-groups">
              {tools.map(([group, items], g) => (
                <div className="tool-group spot reveal" key={group} style={{ '--d': `${g * 80}ms` }}>
                  <h3 className="mono">{group}</h3>
                  <div className="tiles">
                    {items.map(([name, slug], i) => (
                      <div className="tile" key={name} style={{ '--f': `${(i * 0.5) % 3}s` }}>
                        <Tech slug={slug} name={name} />
                        <span>{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="github" className="section">
          <div className="wrap">
            <H n="04" label="no github">Meu <em>GitHub</em> em números</H>
            <div className="gh-grid">
              {[[stats && stats.repos, 'repositórios'], [stats && stats.followers, 'seguidores'], [stats && stats.since, 'no GitHub desde']].map(([v, l], i) => (
                <div className="win stat reveal" key={l} style={{ '--d': `${i * 80}ms` }}>
                  <div className="win-bar"><i /><i /><i /><span className="mono">{l}</span></div>
                  <strong>{v ?? '–'}</strong>
                </div>
              ))}
              <div className="win langs reveal" style={{ '--d': '240ms' }}>
                <div className="win-bar"><i /><i /><i /><span className="mono">linguagens.json</span></div>
                <div className="langs-body">
                  {stats ? Object.entries(stats.langs).sort((a, b) => b[1] - a[1]).map(([l, n]) => (
                    <div className="lang-row" key={l}>
                      <span>{l}</span>
                      <div className="bar"><i style={{ width: `${(n / total) * 100}%` }} /></div>
                      <span className="mono">{Math.round((n / total) * 100)}%</span>
                    </div>
                  )) : <span className="muted mono">carregando…</span>}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contato" className="section">
          <div className="wrap">
            <H n="05" label="contato">Vamos <em>conversar?</em></H>
            <div className="cta spot reveal">
              <p>Procuro meu primeiro estágio. Se tem uma vaga em dados, automação ou Python, me chama.</p>
              <div className="actions">
                <a className="btn btn-primary" href={`mailto:${LINKS.email}`}>Enviar e-mail</a>
                <a className="btn btn-ghost" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
                <a className="btn btn-ghost" href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <span>© {new Date().getFullYear()} Arthur Gomes</span>
        <span className="foot-links mono">
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={`mailto:${LINKS.email}`}>E-mail</a>
        </span>
      </footer>
    </>
  )
}
