import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'genres', href: '/#genres' },
    { key: 'performers', href: '/#performers' },
    { key: 'contact', href: '/#contact' },
    { key: 'register', href: '/performer-request' }
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
      padding: scrolled ? '1rem 2rem' : '2rem',
      backgroundColor: scrolled ? 'rgba(10, 14, 23, 0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--color-glass-border)' : 'none',
      transition: 'all 0.4s ease',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div className="logo" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <div style={{
          fontFamily: "var(--font-heading-en)",
          fontSize: '1.5rem',
          fontWeight: '700',
          color: 'var(--color-text-main)',
          letterSpacing: '0.1em'
        }}>
          RYUKYU <span style={{ color: "var(--color-accent-gold)" }}>MICE ATTRACTION</span>
        </div>
        <div style={{
          fontFamily: "var(--font-body)",
          fontSize: '0.9rem',
          color: 'var(--color-text-main)',
          letterSpacing: '0.15em',
          marginTop: '2px',
          fontWeight: '500'
        }}>
          {t.navbar.logoSub}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <div className="links" style={{ display: 'flex', gap: '2rem' }}>
          {navItems.map((item) => (
            <a key={item.key} href={item.href} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              opacity: 0.9
            }}>
              <span style={{
                fontFamily: "var(--font-heading-en)",
                fontSize: '0.9rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                {/* For simplicity while maintaining the layout, using the translated text as the main label */}
                {/* The design previously had EN top, JP bottom. Let's keep that structure but use the current language for the "Main" label. 
                    However, the request implies switching the whole UI. 
                    So I will just show one line per item in the selected language, OR keep the 'EN top / Lang bottom' style if appropriate.
                    Given "Change display to English, Chinese", it implies full switch. I will perform full switch.
                    To keep the premium feel, I will just render the localized text in a nice font.
                */}
                {t.navbar[item.key]}
              </span>
            </a>
          ))}
        </div>

        {/* Language Switcher */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['ja', 'en', 'zh'].map(lang => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              style={{
                background: language === lang ? 'var(--color-accent-gold)' : 'transparent',
                color: language === lang ? '#000' : 'var(--color-text-main)',
                border: '1px solid var(--color-accent-gold)',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-heading-en)',
                fontWeight: 'bold'
              }}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
