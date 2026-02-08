import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './PerformerRequest.css';

const PerformerRequest = () => {
    const { language } = useLanguage();
    const [formData, setFormData] = useState({
        performerName: '',
        email: '',
        phone: '',
        genre: '',
        profile: '',
        durationMin: '',
        durationMax: '',
        budgetMin: '',
        youtubeUrl: '',
        photo: null
    });
    const [photoPreview, setPhotoPreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [charCount, setCharCount] = useState(0);

    const genres = ['Traditional', 'Eisa', 'Martial Arts', 'Music', 'Modern'];

    const texts = {
        ja: {
            title: '演者登録リクエスト',
            subtitle: 'あなたのパフォーマンスを沖縄MICEに',
            description: '沖縄MICEアトラクションに演者として登録をご希望の方は、以下のフォームにご記入ください。管理者が内容を確認し、承認後にサイトに掲載されます。',
            performerName: '演者名・グループ名',
            performerNamePlaceholder: '例: 琉球舞踊団 花風',
            email: 'メールアドレス',
            emailPlaceholder: 'example@email.com',
            phone: '電話番号',
            phonePlaceholder: '090-1234-5678',
            genre: 'ジャンル',
            genreSelect: 'ジャンルを選択',
            genreOptions: {
                'Traditional': '伝統芸能',
                'Eisa': 'エイサー',
                'Martial Arts': '武道',
                'Music': '音楽',
                'Modern': 'モダン'
            },
            photo: 'プロフィール写真',
            photoDescription: 'JPG, PNG形式 (最大5MB)',
            photoButton: '写真を選択',
            profile: 'プロフィール・自己紹介',
            profilePlaceholder: 'あなたの活動内容、経歴、アピールポイントなどをご記入ください。',
            charCount: '文字',
            charCountTarget: '(200〜300文字推奨)',
            duration: 'パフォーマンスの尺',
            durationMin: '最短',
            durationMax: '最長',
            durationUnit: '分',
            budget: '出演料（税別）',
            budgetMin: '最低価格',
            budgetUnit: '円〜',
            youtubeUrl: 'パフォーマンス動画 (YouTube)',
            youtubeUrlPlaceholder: 'https://www.youtube.com/watch?v=...',
            youtubeDescription: 'あなたのパフォーマンスを確認できるYouTubeのURLを入力してください',
            submit: '登録リクエストを送信',
            submitting: '送信中...',
            successTitle: '送信完了',
            successMessage: 'リクエストを受け付けました。管理者が確認後、メールにてご連絡いたします。',
            errorTitle: 'エラー',
            errorMessage: '送信に失敗しました。時間をおいて再度お試しください。',
            required: '必須',
            backToHome: 'トップに戻る'
        },
        en: {
            title: 'Performer Registration Request',
            subtitle: 'Showcase Your Performance at Okinawa MICE',
            description: 'If you would like to register as a performer on Okinawa MICE Attraction, please fill out the form below. After admin review and approval, your profile will be published on the site.',
            performerName: 'Performer / Group Name',
            performerNamePlaceholder: 'e.g., Ryukyu Dance Troupe Hanakaze',
            email: 'Email Address',
            emailPlaceholder: 'example@email.com',
            phone: 'Phone Number',
            phonePlaceholder: '+81-90-1234-5678',
            genre: 'Genre',
            genreSelect: 'Select a genre',
            genreOptions: {
                'Traditional': 'Traditional',
                'Eisa': 'Eisa',
                'Martial Arts': 'Martial Arts',
                'Music': 'Music',
                'Modern': 'Modern'
            },
            photo: 'Profile Photo',
            photoDescription: 'JPG, PNG format (max 5MB)',
            photoButton: 'Choose Photo',
            profile: 'Profile / Self Introduction',
            profilePlaceholder: 'Please describe your activities, background, and appeal points.',
            charCount: 'characters',
            charCountTarget: '(200-300 characters recommended)',
            duration: 'Performance Duration',
            durationMin: 'Min',
            durationMax: 'Max',
            durationUnit: 'min',
            budget: 'Performance Fee (excl. tax)',
            budgetMin: 'Starting from',
            budgetUnit: 'JPY~',
            youtubeUrl: 'Performance Video (YouTube)',
            youtubeUrlPlaceholder: 'https://www.youtube.com/watch?v=...',
            youtubeDescription: 'Please enter a YouTube URL showcasing your performance',
            submit: 'Submit Request',
            submitting: 'Submitting...',
            successTitle: 'Submitted',
            successMessage: 'Your request has been received. We will contact you via email after admin review.',
            errorTitle: 'Error',
            errorMessage: 'Submission failed. Please try again later.',
            required: 'Required',
            backToHome: 'Back to Home'
        }
    };

    const t = texts[language] || texts.ja;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'profile') {
            setCharCount(value.length);
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert(language === 'ja' ? 'ファイルサイズは5MB以下にしてください' : 'File size must be under 5MB');
                return;
            }
            setFormData(prev => ({ ...prev, photo: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // 新しい演者ID（現在の最大ID + 1として100以上のランダムなIDを生成）
            const newId = Math.floor(Math.random() * 900) + 100;

            // mockData.jsにコピペ用のJSONコード
            const performerJson = `{
    id: ${newId},
    name: "${formData.performerName}",
    jpName: "${formData.performerName}",
    genre: "${formData.genre}",
    image: "/performer.png",
    description: "${formData.profile.substring(0, 50)}...",
    profile: "${formData.profile.replace(/"/g, '\\"').replace(/\n/g, '\\n')}",
    duration: "${formData.durationMin}分 ～ ${formData.durationMax}分",
    budget: "${formData.budgetMin}",
    youtubeUrl: "${formData.youtubeUrl}",
    tags: ["${formData.genre}"]
}`;

            // Web3Forms API を使用（無料）
            const data = {
                access_key: 'ca516c61-871e-4bee-86fc-a53e9f20a419',
                subject: `【演者登録リクエスト】${formData.performerName}`,
                from_name: formData.performerName,
                email: formData.email,
                message: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
　　　　演者登録リクエスト
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

■ 演者名: ${formData.performerName}
■ メール: ${formData.email}
■ 電話番号: ${formData.phone || '未入力'}
■ ジャンル: ${formData.genre}
■ パフォーマンス時間: ${formData.durationMin}分 〜 ${formData.durationMax}分
■ 出演料: ${formData.budgetMin}円〜
■ YouTube: ${formData.youtubeUrl}

■ プロフィール:
${formData.profile}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
　　　承認する場合
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

以下のコードを src/data/mockData.js の performers 配列に追加してください：

${performerJson}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
　　　拒否する場合
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${formData.email} 宛にメールで理由をお知らせください。
                `
            };

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log('Web3Forms response:', result);

            if (result.success) {
                setSubmitStatus('success');
                setFormData({
                    performerName: '',
                    email: '',
                    phone: '',
                    genre: '',
                    profile: '',
                    durationMin: '',
                    durationMax: '',
                    budgetMin: '',
                    youtubeUrl: '',
                    photo: null
                });
                setPhotoPreview(null);
                setCharCount(0);
            } else {
                console.error('Web3Forms error:', result);
                alert(`送信エラー: ${result.message || 'Unknown error'}`);
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Submit error:', error);
            alert(`ネットワークエラー: ${error.message}`);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="performer-request-page">
            <div className="request-hero">
                <div className="request-hero-overlay"></div>
                <div className="request-hero-content">
                    <h1 className="request-title">{t.title}</h1>
                    <p className="request-subtitle">{t.subtitle}</p>
                </div>
            </div>

            <div className="container request-container">
                <div className="request-description">
                    <p>{t.description}</p>
                </div>

                {submitStatus === 'success' ? (
                    <div className="submit-result success">
                        <div className="result-icon">✓</div>
                        <h2>{t.successTitle}</h2>
                        <p>{t.successMessage}</p>
                        <a href="/" className="btn-primary">{t.backToHome}</a>
                    </div>
                ) : (
                    <form className="request-form glass-card" onSubmit={handleSubmit}>
                        {submitStatus === 'error' && (
                            <div className="submit-result error inline">
                                <strong>{t.errorTitle}:</strong> {t.errorMessage}
                            </div>
                        )}

                        <div className="form-section">
                            <h3>基本情報</h3>

                            <div className="form-group">
                                <label>
                                    {t.performerName}
                                    <span className="required">{t.required}</span>
                                </label>
                                <input
                                    type="text"
                                    name="performerName"
                                    className="input-field"
                                    placeholder={t.performerNamePlaceholder}
                                    value={formData.performerName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>
                                        {t.email}
                                        <span className="required">{t.required}</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="input-field"
                                        placeholder={t.emailPlaceholder}
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>{t.phone}</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="input-field"
                                        placeholder={t.phonePlaceholder}
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>
                                    {t.genre}
                                    <span className="required">{t.required}</span>
                                </label>
                                <select
                                    name="genre"
                                    className="input-field select-field"
                                    value={formData.genre}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">{t.genreSelect}</option>
                                    {genres.map(genre => (
                                        <option key={genre} value={genre}>
                                            {t.genreOptions[genre]}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>{t.photo}</h3>
                            <p className="section-description">{t.photoDescription}</p>

                            <div className="photo-upload-area">
                                {photoPreview ? (
                                    <div className="photo-preview">
                                        <img src={photoPreview} alt="Preview" />
                                        <button
                                            type="button"
                                            className="remove-photo"
                                            onClick={() => {
                                                setPhotoPreview(null);
                                                setFormData(prev => ({ ...prev, photo: null }));
                                            }}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ) : (
                                    <label className="photo-upload-label">
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/png"
                                            onChange={handlePhotoChange}
                                            hidden
                                        />
                                        <div className="upload-placeholder">
                                            <span className="upload-icon">📷</span>
                                            <span>{t.photoButton}</span>
                                        </div>
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>{t.profile}</h3>

                            <div className="form-group">
                                <label>
                                    <span className="required">{t.required}</span>
                                </label>
                                <textarea
                                    name="profile"
                                    className="input-field textarea-field"
                                    placeholder={t.profilePlaceholder}
                                    value={formData.profile}
                                    onChange={handleChange}
                                    rows={6}
                                    required
                                    minLength={100}
                                    maxLength={500}
                                />
                                <div className={`char-counter ${charCount >= 200 && charCount <= 300 ? 'optimal' : charCount > 300 ? 'over' : ''}`}>
                                    {charCount} {t.charCount} {t.charCountTarget}
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>{t.youtubeUrl}<span className="required">{t.required}</span></h3>
                            <p className="section-description">{t.youtubeDescription}</p>

                            <div className="form-group">
                                <input
                                    type="url"
                                    name="youtubeUrl"
                                    className="input-field"
                                    placeholder={t.youtubeUrlPlaceholder}
                                    value={formData.youtubeUrl}
                                    onChange={handleChange}
                                    required
                                    pattern="https?://(www\.)?(youtube\.com|youtu\.be)/.*"
                                />
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>{t.duration}</h3>

                            <div className="form-row duration-row">
                                <div className="form-group">
                                    <label>{t.durationMin}</label>
                                    <div className="input-with-unit">
                                        <input
                                            type="number"
                                            name="durationMin"
                                            className="input-field"
                                            placeholder="5"
                                            value={formData.durationMin}
                                            onChange={handleChange}
                                            min={1}
                                            required
                                        />
                                        <span className="unit">{t.durationUnit}</span>
                                    </div>
                                </div>
                                <span className="duration-separator">〜</span>
                                <div className="form-group">
                                    <label>{t.durationMax}</label>
                                    <div className="input-with-unit">
                                        <input
                                            type="number"
                                            name="durationMax"
                                            className="input-field"
                                            placeholder="30"
                                            value={formData.durationMax}
                                            onChange={handleChange}
                                            min={1}
                                            required
                                        />
                                        <span className="unit">{t.durationUnit}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <h3>{t.budget}</h3>

                            <div className="form-group">
                                <label>{t.budgetMin}</label>
                                <div className="input-with-unit budget-input">
                                    <input
                                        type="number"
                                        name="budgetMin"
                                        className="input-field"
                                        placeholder="50000"
                                        value={formData.budgetMin}
                                        onChange={handleChange}
                                        min={0}
                                        step={1000}
                                        required
                                    />
                                    <span className="unit">{t.budgetUnit}</span>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn-primary submit-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? t.submitting : t.submit}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default PerformerRequest;
