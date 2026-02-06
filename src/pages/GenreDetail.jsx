import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { genreDetails, performers } from '../data/mockData';

const GenreDetail = () => {
    const { genreId } = useParams();
    // Decode assuming simpler URL friendly mapping might be needed, 
    // but for now let's assume direct genre name match or mapping
    // Let's standardise capitalisation.

    // Find key in genreDetails that matches freely
    const genreKey = Object.keys(genreDetails).find(k => k.toLowerCase() === genreId.toLowerCase());
    const details = genreDetails[genreKey];

    const genrePerformers = performers.filter(p => p.genre === genreKey);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [genreId]);

    if (!details) {
        return <div className="section text-center">Genre not found</div>;
    }

    return (
        <div className="section" style={{ paddingTop: '100px', minHeight: '100vh' }}>
            <div className="container">
                <Link to="/#genres" style={{ color: 'var(--color-accent-gold)', marginBottom: '1rem', display: 'inline-block' }}>
                    &larr; Back to Home
                </Link>

                <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
                    <h1 className="text-gold" style={{ fontSize: '3rem', fontFamily: 'var(--font-heading-en)' }}>
                        {genreKey}
                    </h1>
                    <div style={{ width: '60px', height: '2px', background: 'var(--color-accent-red)', margin: '1rem auto' }}></div>
                </header>

                <section className="glass-card" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>概要</h2>
                    <p style={{ fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.8' }}>
                        {details.description}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
                        <div>
                            <h3 className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>パフォーマンス時間</h3>
                            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{details.duration}</p>
                        </div>
                        <div>
                            <h3 className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>概算予算</h3>
                            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>¥{details.budget} ～</p>
                        </div>
                    </div>
                </section>

                <h2 style={{ marginBottom: '2rem', textAlign: 'center' }}>{genreKey}の演者一覧</h2>
                <div className="grid-cols-3">
                    {genrePerformers.map(item => (
                        <Link to={`/performer/${item.id}`} key={item.id} style={{ display: 'block' }}>
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="glass-card"
                                style={{ padding: 0, overflow: 'hidden', height: '100%' }}
                            >
                                <div style={{ height: '200px', overflow: 'hidden' }}>
                                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '1.5rem' }}>
                                    <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{item.jpName}</h4>
                                    <p style={{ color: 'var(--color-text-muted)' }}>{item.name}</p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GenreDetail;
