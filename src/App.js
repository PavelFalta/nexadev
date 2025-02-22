import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
import './App.css';

/**
 * projekty data
 */
const projectsData = [
  {
    title: 'Městský bytový komplex',
    summary: 'Luxusní dvacetipodlažní komplex s ekologickým designem.',
    details:
      'Pokročilá architektura, zelené střechy a špičkové vybavení v centru města.',
    link: 'https://example.com',
    images: [
      'https://images.squarespace-cdn.com/content/v1/5b008764710699f45ff1e509/ac65a929-cdd0-4ace-a3be-bd4ef20efd0a/Green+Roof+2.jpg',
      'https://parametric-architecture.com/wp-content/uploads/2023/04/ICB-Green-Building-1.png',
      'https://parametric-architecture.com/wp-content/uploads/2023/07/Booking-com-9.jpg',
    ],
  },
  {
    title: 'Moderní příměstské vily',
    summary: 'Pohodlné vily v klidné čtvrti.',
    details:
      'Prostorné dispozice, energeticky úsporné materiály a velká okna pro maximální denní světlo.',
    link: 'https://example.com',
    images: [
      'https://wallpapercave.com/wp/wp7111669.jpg',
      'https://villa10greece.com/wp-content/uploads/2021/11/DJI_0701-min-scaled.jpg',
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400/822526110778619.5ff567f24bef6.jpg',
    ],
  },
  {
    title: 'Komerční kancelářský park',
    summary: 'Kancelářské budovy navržené pro podporu spolupráce.',
    details:
      'Nachází se v přední obchodní čtvrti, s moderní architekturou a coworkingovými prostory pro inovativní týmy.',
    link: 'https://example.com',
    images: [
      'https://static.vecteezy.com/system/resources/previews/036/747/720/non_2x/ai-generated-the-office-is-modern-and-green-with-colorful-efx-free-photo.jpg',
      'https://images.pexels.com/photos/245240/pexels-photo-245240.jpeg?cs=srgb&dl=pexels-atbo-66986-245240.jpg',
      'https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?cs=srgb&dl=pexels-seven11nash-380768.jpg',
    ],
  },
];

const ongoingProjectsData = [
  {
    title: 'Moderní parkovací dům',
    summary: 'Demolice a novostavba na místě historického skautského centra.',
    details:
      'Nový parkovací dům bude nabízet 158 parkovacích míst a 7 elektrických dobíjecích stanic. Dům bude disponovat chytrými technologiemi a solárními panely pro úsporu energií.',
    link: 'https://example.com',
    images: [
      'https://4d84d555ca.clvaw-cdnwnd.com/c97cb913e2630abc8714aaf6db1098b7/200000180-2542e263ce/16145572_1451835188161408_1575554624_o.jpg',
      'https://thumbs.dreamstime.com/b/modern-parking-building-piece-ground-d-illustration-191291307.jpg',
      'https://mgmotor.scene7.com/is/image/mgmotor/evpedia-bn-0060?$mg-rgb-4k-image-responsive$'
    ],
  },
];

/**
 * cards
 */
function ProjectCard({ project }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // hover
  useEffect(() => {
    let intervalId;
    if (isHovering) {
      intervalId = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % project.images.length);
      }, 2000);
    }
    return () => clearInterval(intervalId);
  }, [isHovering, project.images.length]);

  // prvni snimek je actually druhy snimekk
  const handleMouseEnter = () => {
    if (project.images.length > 1) {
      setCurrentSlide(1);
    }
    setIsHovering(true);
    setIsExpanded(true);
  };

  // reset
  const handleMouseLeave = () => {
    setIsHovering(false);
    setCurrentSlide(0);
    setIsExpanded(false);
  };

  const trackStyle = {
    width: `${project.images.length * 100}%`,
    display: 'flex',
    transform: `translateX(-${(currentSlide / project.images.length) * 100}%)`,
    transition: 'transform 0.5s ease',
  };

  return (
    <div
      className="project-card"
      data-aos="fade-up"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovering ? 'scale(1.2)' : 'scale(1)',
        transition: 'transform 0.3s ease',
      }}
    >
      {/* slideshow */}
      <div className="slideshow-container">
        <div className="slideshow-track" style={trackStyle}>
          {project.images.map((imageUrl, idx) => (
            <div className="slide" key={idx}>
              <img src={imageUrl} alt={`Snímek ${idx}`} />
            </div>
          ))}
        </div>
        <div className="slideshow-dots">
          {project.images.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${idx === currentSlide ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* karty */}
      <div className="card-content" style={{ transition: 'transform 0.3s ease' }}>
        {!isExpanded && <h3>{project.title}</h3>}

        <p
          className={`text ${isExpanded ? 'expanded' : ''}`}
          style={{ transition: 'all 0.3s ease' }}
        >
          {isExpanded ? project.details : project.summary}
        </p>
      </div>
    </div>
  );
}

function App() {
  //mobill
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [fadeOutForm, setFadeOutForm] = useState(false);
  const form = useRef();

  // email js
  const sendEmail = (e) => {
    e.preventDefault();
    setFadeOutForm(true);
    setTimeout(() => setFormSubmitted(true), 500);

    emailjs
      .sendForm('hehe', 'you', form.current, 'thought')
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const heroImages = [
    'https://vital-consulting.co.uk/wp-content/uploads/2023/08/sustainble-green-building-eco-friendly-building-in-modern-city-sustainable-glass-office-building.jpg',
    'https://wallpapercave.com/wp/wp5046180.jpg',
    'https://www.roof-crafters.com/hubfs/chuttersnap-8GF7WUEn_uo-unsplash.jpg',
  ];
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const heroTrackStyle = {
    width: `${heroImages.length * 100}%`,
    display: 'flex',
    transform: `translateX(-${heroIndex * 100}%)`,
    transition: 'transform 0.7s ease',
    height: '100%',
    width: '100%',
  };

  return (
    <div>
        <nav className="navbar">
          <a className="nav-logo" href="#home" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="https://www.nexadev.cz/logo.png" alt="Logo" className="nav-logo-img" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
            Nexa Developments
          </a>
          <div className="burger" onClick={toggleMenu}>
            <div />
            <div />
            <div />
          </div>
          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <li>
              <a href="#home" onClick={() => setMenuOpen(false)}>
          Domů
              </a>
            </li>
            <li>
              <a href="#about" onClick={() => setMenuOpen(false)}>
          O mně
              </a>
            </li>
            <li>
              <a href="#projects" onClick={() => setMenuOpen(false)}>
          Projekty
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => setMenuOpen(false)}>
          Kontakt
              </a>
            </li>
          </ul>
        </nav>

      <section id="home" className="hero-section">
        <div className="hero-slider-container">
          <div className="hero-slider-track" style={heroTrackStyle}>
            {heroImages.map((imgUrl, idx) => (
              <div className="hero-slide" key={idx}>
                <img src={imgUrl} alt={`Snímek Hero ${idx}`} />
              </div>
            ))}
          </div>
          <div className="hero-dots">
            {heroImages.map((_, i) => (
              <span key={i} className={`dot ${i === heroIndex ? 'active' : ''}`} />
            ))}
          </div>
        </div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Budujeme vaši budoucnost</h1>
          <p>Vyvíjíme prémiové nemovitosti pro klienty, kteří vyžadují to nejlepší.</p>
          <a href="#contact">
            <button className="hero-btn">Kontaktujte nás</button>
          </a>
        </div>
      </section>

      <section id="about" className="about-section" data-aos="fade-up">
        <h2>O mně</h2>
        <div className="about-content-wrapper">
          <div className="portrait-container">
            <img
              src="https://www.urban-developers.com/assets/img/UDI-management-radek-mensik.jpg"
              alt="Portrét"
              className="portrait-img"
            />
          </div>
          <div className="about-content">
            <p>
              Vítejte u Nexa Developments, které založil a vede{' '}
              <strong>Samuel Ullmann</strong>, vášnivý developer s více než
              deseti lety zkušeností v oboru.
            </p>
            <p>
              Od luxusních městských bytových komplexů až po moderní
              příměstské projekty – náš závazek ke kvalitě, inovacím a
              spokojenosti zákazníků je bezkonkurenční.
            </p>
          </div>
        </div>
      </section>

      {/* projekty */}
      <section id="projects" className="projects-section" data-aos="fade-up">
        <h2>Předchozí projekty</h2>
        <div className="project-cards">
          {projectsData.map((proj, idx) => (
            <ProjectCard key={idx} project={proj} />
          ))}
        </div>
      </section>

      <section className="projects-section" data-aos="fade-up">
        <h2>Probíhající projekty</h2>
        <div className="project-cards">
          {ongoingProjectsData.map((proj, idx) => (
            <ProjectCard key={idx} project={proj} />
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section" data-aos="fade-up">
        {!formSubmitted ? (
          <div className={`form-container ${fadeOutForm ? 'fade-out' : ''}`}>
            <h2>Kontaktujte nás</h2>
            <p>Máte dotaz nebo chcete probrat budoucí projekt? Dejte nám vědět!</p>
            <form ref={form} onSubmit={sendEmail}>
              <div className="form-group">
                <label htmlFor="name">Jméno:</label>
                <input
                  id="name"
                  type="text"
                  name="to_name"
                  placeholder="Zadejte své jméno"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail:</label>
                <input
                  id="email"
                  type="email"
                  name="to_email"
                  placeholder="Zadejte svůj e-mail"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Zpráva:</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Vaše zpráva..."
                  required
                />
              </div>
              <button type="submit" className="form-submit-btn">
                Odeslat
              </button>
            </form>
          </div>
        ) : (
          <div className="thank-you-message">
            <svg viewBox="0 0 512 512">
              <path d="M256 0C114.39 0 0 114.39 0 256s114.39 256 256 256 256-114.39 256-256S397.61 0 256 0zm134.63 206.63-128 128a16 16 0 0 1-22.62 0l-64-64a16 16 0 0 1 22.62-22.62L240 297.37l116.69-116.68a16 16 0 0 1 22.62 22.62z" />
            </svg>
            <h3>Děkujeme za vaši zprávu!</h3>
            <p>Brzy se vám ozveme zpět.</p>
          </div>
        )}
      </section>

      <footer className="footer fade-in-footer">
        <p>© {new Date().getFullYear()} Nexa Developments. Všechna práva vyhrazena.</p>
      </footer>
    </div>
  );
}

export default App;
