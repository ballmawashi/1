import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useLocation } from 'react-router-dom';

const Contact = () => {
    const { t } = useLanguage();
    const location = useLocation();
    const [formData, setFormData] = useState({
        company: '',
        name: '',
        email: '',
        type: 'booking',
        details: ''
    });
    const [submitStatus, setSubmitStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const performerName = params.get('performer');
        if (performerName) {
            setFormData(prev => ({
                ...prev,
                details: `お問い合わせ演者: ${performerName}\n\n`
            }));
        }
    }, [location.search]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus('loading');
        setErrorMessage('');

        // Web3Forms API endpoint
        const endpoint = 'https://api.web3forms.com/submit';

        // 環境変数からアクセスキーを取得
        const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

        const payload = {
            access_key: accessKey,
            subject: `【お問い合わせ】${formData.company} - ${formData.name}様より`,
            from_name: formData.name,
            company: formData.company,
            email: formData.email,
            inquiry_type: t.contact.types[formData.type],
            message: formData.details,
            botcheck: "" // スパム対策（Honeypot）
        };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.success) {
                setSubmitStatus('success');
                setFormData({
                    company: '',
                    name: '',
                    email: '',
                    type: 'booking',
                    details: ''
                });
            } else {
                setSubmitStatus('error');
                setErrorMessage(result.message || 'エラーが発生しました。');
            }
        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage('送信に失敗しました。しばらくしてから再度お試しください。');
        }
    };

    return (
        <section id="contact" className="section" style={{ background: 'linear-gradient(to top, #000, var(--color-bg-main))' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
                    <h2 className="text-gold" style={{ fontFamily: 'var(--font-heading-en)', letterSpacing: '0.1em' }}>{t.contact.titleEn}</h2>
                    <h3 style={{ fontSize: '2rem' }}>{t.contact.titleJp}</h3>
                    <p style={{ marginTop: '1rem', color: 'var(--color-text-muted)', whiteSpace: 'pre-line' }}>
                        {t.contact.desc}
                    </p>
                </div>

                {submitStatus === 'success' ? (
                    <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
                        <h3 style={{ color: 'var(--color-accent-gold)', marginBottom: '1rem' }}>送信完了</h3>
                        <p>お問い合わせありがとうございます。</p>
                        <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>担当者より折り返しご連絡いたします。</p>
                        <button
                            onClick={() => setSubmitStatus('idle')}
                            className="btn-primary"
                            style={{ marginTop: '2rem' }}
                        >
                            新しいお問い合わせ
                        </button>
                    </div>
                ) : (
                    <form className="glass-card" onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{t.contact.company}</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="input-field"
                                    required
                                    disabled={submitStatus === 'loading'}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{t.contact.name}</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input-field"
                                    required
                                    disabled={submitStatus === 'loading'}
                                />
                            </div>
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{t.contact.email}</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input-field"
                                required
                                disabled={submitStatus === 'loading'}
                            />
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{t.contact.type}</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="input-field"
                                style={{ option: { background: '#000' } }}
                                disabled={submitStatus === 'loading'}
                            >
                                <option value="booking">{t.contact.types.booking}</option>
                                <option value="question">{t.contact.types.question}</option>
                                <option value="other">{t.contact.types.other}</option>
                            </select>
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{t.contact.details}</label>
                            <textarea
                                name="details"
                                value={formData.details}
                                onChange={handleChange}
                                className="input-field"
                                rows="5"
                                required
                                disabled={submitStatus === 'loading'}
                            ></textarea>
                        </div>

                        {submitStatus === 'error' && (
                            <div style={{
                                marginTop: '1rem',
                                padding: '1rem',
                                background: 'rgba(255, 100, 100, 0.2)',
                                borderRadius: '8px',
                                color: '#ff6b6b',
                                textAlign: 'center'
                            }}>
                                {errorMessage}
                            </div>
                        )}

                        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                            <button
                                type="submit"
                                className="btn-primary"
                                style={{ width: '100%', maxWidth: '300px' }}
                                disabled={submitStatus === 'loading'}
                            >
                                {submitStatus === 'loading' ? '送信中...' : t.contact.submit}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </section>
    );
};

export default Contact;

