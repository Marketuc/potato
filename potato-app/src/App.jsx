import heroLeaves from './assets/hero-leaves.svg';
import potatoPlant from './assets/potato-plant.svg';
import ClassifierPage from './ClassifierPage';
const navItems = ['Home', 'About', 'How It Works', 'Features', 'Preview', 'Developer'];

const steps = [
  {
    title: 'Input',
    description: 'Upload a potato leaf image in JPG or PNG format.',
    icon: 'cloud'
  },
  {
    title: 'Processing',
    description: 'CNN model extracts visual features and disease patterns.',
    icon: 'brain'
  },
  {
    title: 'Prediction',
    description: 'Classifies the leaf as Healthy, Early Blight, or Late Blight.',
    icon: 'target'
  }
];

const features = [
  {
    title: 'Three-Class Detection',
    description: 'Accurately categorizes potato leaves into Healthy, Early Blight, and Late Blight.',
    icon: 'search'
  },
  {
    title: 'CNN-Based Model',
    description: 'Uses convolutional neural networks for visual pattern recognition in leaf images.',
    icon: 'network'
  },
  {
    title: 'Farmer-Friendly Insight',
    description: 'Presents disease classification in a simple, understandable format.',
    icon: 'farmer'
  }
];

const recentPredictions = [
  { label: 'Healthy', score: '92%', type: 'healthy' },
  { label: 'Early Blight', score: '86%', type: 'early' },
  { label: 'Late Blight', score: '89%', type: 'late' },
  { label: 'Healthy', score: '94%', type: 'healthy' },
  { label: 'Early Blight', score: '82%', type: 'early' }
];

function Icon({ name }) {
  const icons = {
    leaf: (
      <path d="M7.5 18.5c8.8-.9 14.6-7.3 15.1-16.1C13.8 2.9 7.4 8.7 6.5 17.5m0 0L16 8" />
    ),
    cloud: (
      <>
        <path d="M18 17.5h1.1a4.4 4.4 0 0 0 0-8.8 6.7 6.7 0 0 0-12.8-2A5.3 5.3 0 0 0 7.3 17.5H9" />
        <path d="M12 21V11.8m0 0 3.4 3.4M12 11.8l-3.4 3.4" />
      </>
    ),
    brain: (
      <>
        <path d="M9.5 5.2A3.2 3.2 0 0 1 15.2 4a3.7 3.7 0 0 1 4.4 4.7 3.7 3.7 0 0 1-.4 7.1A3.7 3.7 0 0 1 15 20a3.4 3.4 0 0 1-6 0 3.7 3.7 0 0 1-4.2-4.2 3.7 3.7 0 0 1-.4-7.1 3.7 3.7 0 0 1 5.1-3.5Z" />
        <path d="M12 4.2v15.6M8.8 9.1H12m0 5.7H8.7m6.6-7.4H12m0 9h3.6" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 12 21 3m-2.4.3H21V6" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m15.3 15.3 5.2 5.2" />
        <path d="M8.2 12.8c3-.3 5-2.4 5.2-5.4-3 .2-5.1 2.2-5.2 5.4Z" />
      </>
    ),
    network: (
      <>
        <circle cx="6" cy="7" r="2" />
        <circle cx="18" cy="7" r="2" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
        <path d="M8 8 10.4 10.4m5.6-2.4-2.4 2.4M10.3 13.6 8.5 16m5.2-2.3 1.8 2.3" />
      </>
    ),
    farmer: (
      <>
        <path d="M6.5 9.5c1.2-3.8 9.8-3.8 11 0" />
        <path d="M4 10h16" />
        <path d="M8.2 12.2a3.8 3.8 0 0 0 7.6 0" />
        <path d="M5 21a7 7 0 0 1 14 0" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 20 6v6.2c0 5-3.4 8.2-8 9.8-4.6-1.6-8-4.8-8-9.8V6l8-3Z" />
        <path d="M9 13.1c3.9-.4 6.3-3.2 6.6-7.1-4 .2-6.8 2.8-7.1 6.8m0 0 4.1-4.1" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
      </>
    ),
    cap: (
      <>
        <path d="m3 9 9-5 9 5-9 5-9-5Z" />
        <path d="M7 11.5V16c2.5 2.2 7.5 2.2 10 0v-4.5" />
        <path d="M21 9v6" />
      </>
    ),
    home: <path d="M4 11.2 12 4l8 7.2V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-8.8Z" />,
    upload: (
      <>
        <path d="M12 16V4m0 0 4 4m-4-4-4 4" />
        <path d="M5 15v4h14v-4" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7v5l3.5 2" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 11v5m0-8h.01" />
      </>
    )
  };

  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {icons[name]}
      </g>
    </svg>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Potato Leaf Classifier Home">
        <span className="brand-mark"><Icon name="leaf" /></span>
        <span>Potato Leaf Classifier</span>
      </a>

      <nav className="nav-links" aria-label="Main navigation">
        {navItems.map((item) => {
          const id = item.toLowerCase().replaceAll(' ', '-');
          return (
            <a href={`#${id === 'preview' ? 'visual-preview' : id}`} key={item}>
              {item}
            </a>
          );
        })}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-noise" />
      <Header />

      <div className="hero-content section-container">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Machine Learning Project</p>
          <h1>
            Potato Leaf
            <span>Classifier</span>
          </h1>
          <p className="hero-tagline">
            AI-powered detection of Healthy, Early Blight, and Late Blight potato leaves.
          </p>
            <a className="primary-button" href="/classifier">
            Explore Project
            <span>→</span>
          </a>
        </div>

        <div className="hero-visual" aria-label="Healthy, early blight, and late blight potato leaves illustration">
          <img src={heroLeaves} alt="Three potato leaves showing healthy, early blight, and late blight classes" />
          <div className="class-pill healthy"><Icon name="leaf" /> Healthy</div>
          <div className="class-pill early">✦ Early Blight</div>
          <div className="class-pill late"><Icon name="leaf" /> Late Blight</div>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ label, kicker }) {
  return (
    <div className="section-title">
      {kicker && <p>{kicker}</p>}
      <h2><Icon name="leaf" /> {label}</h2>
    </div>
  );
}

function About() {
  return (
    <section className="about section-container" id="about">
      <div className="about-icon-card">
        <span><Icon name="leaf" /></span>
      </div>

      <div className="about-copy">
        <SectionTitle label="About" />
        <p>
          This machine learning project analyzes potato leaf images to identify plant health
          conditions. The model is trained to classify leaves into three categories: Healthy,
          Early Blight, and Late Blight, helping support faster crop disease detection.
        </p>
        <div className="ml-tag">Type of ML: Image Classification / CNN</div>
      </div>

      <img className="about-plant" src={potatoPlant} alt="Potato plant illustration" />
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="section-container process-section" id="how-it-works">
      <SectionTitle label="How It Works" />
      <div className="process-grid">
        {steps.map((step, index) => (
          <article className="process-card" key={step.title}>
            <div className="step-number">0{index + 1}</div>
            <div className="process-icon"><Icon name={step.icon} /></div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="features-section section-container" id="features">
      <SectionTitle label="Features" />
      <div className="features-grid">
        {features.map((feature) => (
          <article className="feature-card" key={feature.title}>
            <div className="feature-icon"><Icon name={feature.icon} /></div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function MiniLeaf({ type }) {
  return (
    <div className={`mini-leaf ${type}`}>
      <span />
    </div>
  );
}

function VisualPreview() {
  return (
    <section className="visual-section section-container" id="visual-preview">
      <SectionTitle label="Visual Preview" />

      <figure className="workflow-preview-card">
        <img src="/assets/workflow-preview.svg" alt="Static model workflow visualization" />
        <figcaption>Model Workflow Visualization</figcaption>
      </figure>
    </section>
  );
}

function Developer() {
  return (
    <section className="developer-section section-container" id="developer">
      <SectionTitle label="Developer" />
      <div className="developer-card">
        <div>
          <span><Icon name="user" /></span>
          <div>
            <h3>Students</h3>
            <p>Mabutas, Mary Anne</p>
            <p>Bustamante, Carizza Jhayne</p>
            <p>Trinidad, Mark Andrei H.</p>
          </div>
        </div>
        <div>
          <span><Icon name="cap" /></span>
          <div>
            <h3>Lorma Colleges</h3>
            <p>BSIT - 3</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <Icon name="leaf" />
      <p>© 2026 ML Project</p>
    </footer>
  );
}

export default function App() {
  if (window.location.pathname === '/classifier') {
    return <ClassifierPage />;
  }

  return (
    <main className="page-shell">
      <Hero />
      <About />
      <HowItWorks />
      <Features />
      <VisualPreview />
      <Developer />
      <Footer />
    </main>
  );
}
