import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { performers, genres } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

const SearchSection = () => {
    const [activeGenre, setActiveGenre] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const { t } = useLanguage();

    const filteredPerformers = performers.filter(p => {
        const matchesGenre = activeGenre === "All" || p.genre === activeGenre;
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.jpName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesGenre && matchesSearch;
    });

    return (
        <section id="performers" className="section" style={{ minHeight: '100vh' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
                    <h2 className="text-gold" style={{
                        fontFamily: 'var(--font-heading-en)',
                        letterSpacing: '0.1em',
                        marginBottom: '1rem'
                    }}>
                        {t.search.titleEn}
                    </h2>
                    <h3 style={{ fontSize: '2rem' }}>{t.search.titleJp}</h3>
                </div>

                {/* Filters */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    marginBottom: 'var(--spacing-lg)'
                }}>
                    {genres.map(genre => (
                        <button
                            key={genre}
                            onClick={() => setActiveGenre(genre)}
                            style={{
                                padding: '8px 24px',
                                borderRadius: '50px',
                                background: activeGenre === genre ? 'var(--color-accent-gold)' : 'rgba(255,255,255,0.05)',
                                color: activeGenre === genre ? '#000' : 'var(--color-text-main)',
                                border: '1px solid',
                                borderColor: activeGenre === genre ? 'var(--color-accent-gold)' : 'rgba(255,255,255,0.1)',
                                transition: 'all 0.3s ease',
                                fontWeight: '500',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                minWidth: '120px'
                            }}
                        >
                            <span style={{ fontSize: '0.9rem', fontWeight: '700' }}>{genre}</span>
                            <span style={{ fontSize: '0.7rem', opacity: activeGenre === genre ? 0.8 : 0.6 }}>{t.genres[genre]}</span>
                        </button>
                    ))}
                </div>

                {/* Genre Description Link */}
                {activeGenre !== "All" && (
                    <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
                        <Link to={`/genre/${activeGenre}`} style={{ color: 'var(--color-accent-gold)', textDecoration: 'underline' }}>
                            {t.search.genreLink.replace('{genre}', t.genres[activeGenre])} &rarr;
                        </Link>
                    </div>
                )}

                {/* Search Input */}
                <div style={{ maxWidth: '500px', margin: '0 auto var(--spacing-xl)' }}>
                    <input
                        type="text"
                        placeholder={t.search.placeholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input-field"
                        style={{ borderRadius: '4px', textAlign: 'center' }}
                    />
                </div>

                {/* Results Grid */}
                <motion.div
                    layout
                    className="grid-cols-3"
                >
                    <AnimatePresence>
                        {filteredPerformers.map(item => (
                            <motion.div
                                layout
                                key={item.id}
                                id={`performer-${item.id}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="glass-card"
                                style={{ overflow: 'hidden', padding: 0, display: 'flex', flexDirection: 'column' }}
                            >
                                <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.5s ease'
                                        }}
                                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        top: '10px',
                                        left: '10px',
                                        background: 'rgba(0,0,0,0.7)',
                                        padding: '4px 12px',
                                        borderRadius: '4px',
                                        fontSize: '0.8rem',
                                        color: 'var(--color-accent-gold)',
                                        border: '1px solid var(--color-accent-gold)'
                                    }}>
                                        {/* Ideally translate genre here too */}
                                        {item.genre}
                                    </div>
                                </div>

                                <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{item.jpName}</h4>
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{item.name}</p>
                                    <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', color: '#ddd' }}>{item.description}</p>

                                    <div style={{ marginTop: 'auto' }}>
                                        <Link to={`/performer/${item.id}`} className="btn-primary" style={{ width: '100%', fontSize: '0.9rem', display: 'block', textAlign: 'center' }}>
                                            {t.search.details}
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredPerformers.length === 0 && (
                    <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginTop: '2rem' }}>
                        {t.search.noResults}
                    </div>
                )}
            </div>
        </section>
    );
};

export default SearchSection;
