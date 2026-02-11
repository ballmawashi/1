import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'genres', href: '/#genres' },
    { key: 'performers', href: '/#performers' },
    { key: 'contact', href: '/#contact' },
    { key: 'register', href: '/performer-request' }
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-logo">
        <div className="navbar-logo-main">
          RYUKYU <span style={{ color: "var(--color-accent-gold)" }}>MICE ATTRACTION</span>
        </div>
        <div className="navbar-logo-sub">
          {t.navbar.logoSub}
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-desktop-menu">
        <div className="navbar-links">
          {navItems.map((item) => (
            <a key={item.key} href={item.href} className="nav-link">
              <span>{t.navbar[item.key]}</span>
            </a>
          ))}
        </div>

        {/* Language Switcher */}
        <div className="lang-switch">
          {['ja', 'en', 'zh'].map(lang => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`lang-btn ${language === lang ? 'active' : ''}`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <div className="hamburger-icon">
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="mobile-nav-link"
              onClick={handleLinkClick}
            >
              {t.navbar[item.key]}
            </a>
          ))}

          <div className="lang-switch mobile-lang-switch">
            {['ja', 'en', 'zh'].map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`lang-btn mobile-lang-btn ${language === lang ? 'active' : ''}`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
