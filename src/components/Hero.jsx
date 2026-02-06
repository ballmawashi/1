import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <section id="home" style={{
            height: '100vh',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
        }}>
            {/* Background Image */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'url(/hero-bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 0
            }} />

            {/* Gradient Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, rgba(10,14,23,0.3) 0%, rgba(10,14,23,0.6) 50%, var(--color-bg-main) 100%)',
                zIndex: 1
            }} />

            {/* Content */}
            <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                <h2 className="animate-fade-in" style={{
                    fontFamily: 'var(--font-heading-en)',
                    fontSize: '1.2rem',
                    letterSpacing: '0.2em',
                    color: 'var(--color-accent-gold)',
                    marginBottom: '1rem',
                    textTransform: 'uppercase'
                }}>
                    {t.hero.sub}
                </h2>

                <h1 className="animate-fade-in" style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                    marginBottom: '2rem',
                    textShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    animationDelay: '0.2s',
                    whiteSpace: 'pre-line' // Allow newlines from translation if any
                }}>
                    {t.hero.title}
                </h1>

                <p className="animate-fade-in" style={{
                    fontSize: '1.1rem',
                    maxWidth: '600px',
                    margin: '0 auto 3rem',
                    color: 'var(--color-text-main)',
                    opacity: 0.9,
                    animationDelay: '0.4s',
                    whiteSpace: 'pre-line'
                }}>
                    {t.hero.desc}
                </p>

                <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                    <a href="#genres" className="btn-primary">
                        {t.hero.cta}
                    </a>
                </div>
            </div>

            {/* Scroll indicator */}
            <div style={{
                position: 'absolute',
                bottom: '30px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 2,
                animation: 'bounce 2s infinite'
            }}>
                <div style={{
                    width: '1px',
                    height: '60px',
                    background: 'linear-gradient(to bottom, var(--color-accent-gold), transparent)'
                }} />
            </div>

            <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {transform: translateY(0) translateX(-50%);}
          40% {transform: translateY(-10px) translateX(-50%);}
          60% {transform: translateY(-5px) translateX(-50%);}
        }
      `}</style>
        </section>
    );
};

export default Hero;
