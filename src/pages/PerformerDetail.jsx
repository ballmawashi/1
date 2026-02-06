import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { performers } from '../data/mockData';

const PerformerDetail = () => {
    const { id } = useParams();
    const performer = performers.find(p => p.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!performer) {
        return <div className="section text-center">Performer not found</div>;
    }

    return (
        <div className="section" style={{ paddingTop: '100px', minHeight: '100vh' }}>
            <div className="container">
                <div style={{ marginBottom: '1rem' }}>
                    <Link to={`/#performer-${performer.id}`} style={{ color: 'var(--color-accent-gold)' }}>&larr; Back to Home</Link>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '2rem' }}>
                    {/* Image Side */}
                    <div>
                        <div style={{
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                            border: '1px solid var(--color-glass-border)'
                        }}>
                            <img src={performer.image} alt={performer.jpName} style={{ width: '100%', display: 'block' }} />
                        </div>
                    </div>

                    {/* Info Side */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{performer.jpName}</h2>
                        <h3 style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-heading-en)', marginBottom: '2rem' }}>{performer.name}</h3>

                        <div className="glass-card" style={{ marginBottom: '2rem' }}>
                            <h4 style={{ color: 'var(--color-accent-gold)', marginBottom: '1rem' }}>PROFILE</h4>
                            <p style={{ lineHeight: '1.8', color: '#e0e0e0', whiteSpace: 'pre-line' }}>
                                {performer.profile || performer.description}
                            </p>

                            <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                                <div>
                                    <h5 style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>演技時間</h5>
                                    <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{performer.duration}</p>
                                </div>
                                <div>
                                    <h5 style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>予算目安</h5>
                                    <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>¥{performer.budget} ～</p>
                                </div>
                            </div>
                        </div>



                        <Link to={`/?performer=${encodeURIComponent(performer.jpName)}#contact`} className="btn-primary" style={{ textAlign: 'center', display: 'block' }}>
                            問い合わせる
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default PerformerDetail;
