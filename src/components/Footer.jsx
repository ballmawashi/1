import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer style={{
            background: '#000',
            padding: '4rem 0 2rem',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            color: 'var(--color-text-muted)',
            textAlign: 'center'
        }}>
            <div className="container">
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h2 style={{ fontFamily: 'var(--font-heading-en)', color: 'white', letterSpacing: '0.1em', margin: 0 }}>RYUKYU MICE ATTRACTION</h2>
                        <span style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.9rem',
                            color: 'rgba(255,255,255,0.7)',
                            letterSpacing: '0.15em',
                            marginTop: '8px',
                            fontWeight: '500'
                        }}>
                            {/* Keep static Japanese or use logoSub? Usually logo is brand. Let's keep it static or use translation if we want.
                    Request was "English, Chinese". The brand might stay consistent. 
                    However, earlier I mapped logoSub. Let's use logoSub from translation.
                */}
                            {t.navbar.logoSub}
                        </span>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem', fontSize: '0.9rem' }}>
                    <a href="#home">{t.navbar.home}</a>
                    <a href="#genres">{t.navbar.genres}</a>
                    <a href="#performers">{t.navbar.performers}</a>
                    <a href="#contact">{t.navbar.contact}</a>
                </div>

                <div style={{ marginTop: '3rem', marginBottom: '2rem' }}>
                    <p style={{
                        fontFamily: 'var(--font-heading-en)',
                        fontSize: '0.8rem',
                        color: 'var(--color-accent-gold)',
                        letterSpacing: '0.1em',
                        marginBottom: '0.5rem'
                    }}>
                        {t.footer.producedBy}
                    </p>
                    <a
                        href="https://rp-connection.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            fontSize: '1.1rem',
                            fontWeight: '500',
                            letterSpacing: '0.05em',
                            color: 'white',
                            textDecoration: 'none',
                            display: 'inline-block',
                            transition: 'opacity 0.3s'
                        }}
                        onMouseOver={(e) => e.target.style.opacity = '0.7'}
                        onMouseOut={(e) => e.target.style.opacity = '1'}
                    >
                        {t.footer.companyName}
                    </a>
                </div>

                <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>
                    &copy; {new Date().getFullYear()} {t.footer.rights}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
