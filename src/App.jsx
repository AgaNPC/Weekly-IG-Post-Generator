import React, { useState, useRef } from 'react';
import { 
  Building2, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  RefreshCw, 
  Share2, 
  Layers, 
  FileText, 
  Wand2, 
  ChevronRight, 
  Palette, 
  ExternalLink,
  Code2,
  Newspaper
} from 'lucide-react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';

import { INITIAL_PROPERTY_NEWS, THEME_PRESETS, generateAIGeneratedPost } from './services/propertyService';

export default function App() {
  const [newsList, setNewsList] = useState(INITIAL_PROPERTY_NEWS);
  const [selectedNews, setSelectedNews] = useState(INITIAL_PROPERTY_NEWS[0]);
  const [tone, setTone] = useState('professional');
  const [selectedTheme, setSelectedTheme] = useState(THEME_PRESETS[0]);
  
  // Custom RSS / News input
  const [customTitle, setCustomTitle] = useState('');
  const [customSummary, setCustomSummary] = useState('');

  // Generated post state
  const [generatedPost, setGeneratedPost] = useState(() => 
    generateAIGeneratedPost(INITIAL_PROPERTY_NEWS[0], 'professional')
  );

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const slideRef = useRef(null);

  // Handle News Selection & Generation
  const handleSelectNews = (news) => {
    setSelectedNews(news);
    setIsGenerating(true);
    setTimeout(() => {
      const post = generateAIGeneratedPost(news, tone);
      setGeneratedPost(post);
      setIsGenerating(false);
      setActiveSlideIndex(0);
    }, 300);
  };

  const handleToneChange = (newTone) => {
    setTone(newTone);
    setIsGenerating(true);
    setTimeout(() => {
      const post = generateAIGeneratedPost(selectedNews, newTone);
      setGeneratedPost(post);
      setIsGenerating(false);
    }, 200);
  };

  const handleAddCustomNews = (e) => {
    e.preventDefault();
    if (!customTitle || !customSummary) return;

    const newNews = {
      id: `custom-${Date.now()}`,
      title: customTitle,
      category: "Custom News",
      source: "User Input Feed",
      date: "Hari Ini",
      summary: customSummary,
      url: "#",
      keyPoints: [
        customSummary.slice(0, 50) + "...",
        "Poin penting dari berita properti terbaru.",
        "Rekomendasi tindakan bagi pembeli & investor."
      ]
    };

    setNewsList([newNews, ...newsList]);
    setSelectedNews(newNews);
    setGeneratedPost(generateAIGeneratedPost(newNews, tone));
    setCustomTitle('');
    setCustomSummary('');
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(generatedPost.caption);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  const handleDownloadSlide = async () => {
    if (!slideRef.current) return;
    try {
      const dataUrl = await toPng(slideRef.current, { cacheBust: true, quality: 0.95 });
      const link = document.createElement('a');
      link.download = `IG-Post-Slide-${activeSlideIndex + 1}.png`;
      link.href = dataUrl;
      link.click();
      
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch (err) {
      console.error('Failed to download image:', err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header className="glass-panel" style={{ margin: '16px 24px', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'linear-gradient(135deg, #0284c7, #3b82f6)', padding: '10px', borderRadius: '12px', display: 'flex' }}>
            <Building2 size={24} color="#fff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', background: 'linear-gradient(to right, #ffffff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Weekly IG Post Generator
            </h1>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Auto-generate Instagram posts from latest Property news</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a 
            href="https://github.com/AgaNPC/Weekly-IG-Post-Generator" 
            target="_blank" 
            rel="noreferrer" 
            className="btn-secondary"
            style={{ textDecoration: 'none', fontSize: '0.85rem' }}
          >
            <Code2 size={16} /> GitHub Repo
          </a>
        </div>
      </header>

      {/* Main Workspace */}
      <main style={{ flex: 1, padding: '0 24px 32px 24px', display: 'grid', gridTemplateColumns: '360px 1fr 380px', gap: '20px' }}>
        
        {/* Left Column: News Feed Selector */}
        <section className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Newspaper size={18} color="#38bdf8" /> Trending Property News
            </h2>
            <span style={{ fontSize: '0.75rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '4px 8px', borderRadius: '20px' }}>
              {newsList.length} Feed
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', maxHeight: '420px', paddingRight: '4px' }}>
            {newsList.map((news) => {
              const isSelected = selectedNews.id === news.id;
              return (
                <div 
                  key={news.id} 
                  onClick={() => handleSelectNews(news)}
                  className="glass-card"
                  style={{ 
                    padding: '14px', 
                    cursor: 'pointer',
                    borderColor: isSelected ? '#38bdf8' : 'rgba(255, 255, 255, 0.08)',
                    background: isSelected ? 'rgba(56, 189, 248, 0.12)' : 'rgba(30, 41, 59, 0.4)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 600, textTransform: 'uppercase' }}>
                      {news.category}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{news.date}</span>
                  </div>
                  <h3 style={{ fontSize: '0.88rem', fontWeight: 600, lineHeight: 1.35, color: isSelected ? '#ffffff' : '#cbd5e1' }}>
                    {news.title}
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '6px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {news.summary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Add Custom News Form */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '10px', color: '#e2e8f0' }}>
              + Input Berita Properti Sendiri
            </h3>
            <form onSubmit={handleAddCustomNews} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input 
                type="text" 
                placeholder="Judul berita properti..."
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.15)', padding: '8px 12px', borderRadius: '8px', color: '#fff', fontSize: '0.8rem' }}
              />
              <textarea 
                placeholder="Rangkuman/Isi ringkas berita..."
                value={customSummary}
                onChange={(e) => setCustomSummary(e.target.value)}
                rows={2}
                style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.15)', padding: '8px 12px', borderRadius: '8px', color: '#fff', fontSize: '0.8rem', resize: 'none' }}
              />
              <button type="submit" className="btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem' }}>
                <Sparkles size={14} /> Generate dari Input
              </button>
            </form>
          </div>
        </section>

        {/* Middle Column: Visual IG Post Previewer */}
        <section className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Controls bar */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Palette size={16} color="#38bdf8" />
              <span style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 500 }}>Theme Style:</span>
              <select 
                value={selectedTheme.id} 
                onChange={(e) => setSelectedTheme(THEME_PRESETS.find(t => t.id === e.target.value))}
                style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.15)', padding: '4px 10px', borderRadius: '6px', color: '#fff', fontSize: '0.8rem' }}
              >
                {THEME_PRESETS.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            <button onClick={handleDownloadSlide} className="btn-primary" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
              <Download size={15} /> Download Slide PNG
            </button>
          </div>

          {/* IG Canvas Card (1:1 Aspect ratio square container) */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, width: '100%', padding: '10px 0' }}>
            {isGenerating ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <RefreshCw size={32} color="#38bdf8" className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Generating Instagram Slide AI...</p>
              </div>
            ) : (
              <div 
                ref={slideRef}
                style={{
                  width: '380px',
                  height: '380px',
                  background: selectedTheme.bg,
                  borderRadius: '16px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)',
                  position: 'relative',
                  overflow: 'hidden',
                  fontFamily: selectedTheme.fontFamily,
                  color: selectedTheme.textColor
                }}
              >
                {/* Top Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ 
                    fontSize: '0.65rem', 
                    fontWeight: 700, 
                    letterSpacing: '0.1em', 
                    color: selectedTheme.accentColor, 
                    background: 'rgba(255,255,255,0.1)', 
                    padding: '4px 10px', 
                    borderRadius: '20px',
                    backdropFilter: 'blur(4px)'
                  }}>
                    {generatedPost.slides[activeSlideIndex]?.tagline}
                  </span>
                  <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>
                    PROPERTY INSIGHTS
                  </span>
                </div>

                {/* Main Content Body */}
                <div style={{ margin: '16px 0' }}>
                  <h2 style={{ 
                    fontSize: activeSlideIndex === 0 ? '1.25rem' : '1.15rem', 
                    fontWeight: 700, 
                    lineHeight: 1.35, 
                    marginBottom: '10px',
                    color: selectedTheme.textColor 
                  }}>
                    {generatedPost.slides[activeSlideIndex]?.title}
                  </h2>
                  <p style={{ 
                    fontSize: '0.8rem', 
                    lineHeight: 1.4, 
                    opacity: 0.85,
                    color: selectedTheme.textColor
                  }}>
                    {generatedPost.slides[activeSlideIndex]?.subtitle}
                  </p>
                </div>

                {/* Bottom Footer */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.7rem', opacity: 0.8, fontWeight: 500 }}>
                    {generatedPost.slides[activeSlideIndex]?.footer}
                  </span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {generatedPost.slides.map((_, idx) => (
                      <div 
                        key={idx}
                        style={{
                          width: idx === activeSlideIndex ? '16px' : '6px',
                          height: '6px',
                          borderRadius: '3px',
                          background: idx === activeSlideIndex ? selectedTheme.accentColor : 'rgba(255,255,255,0.3)',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Slide Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', marginRight: '4px' }}>Slides:</span>
            {generatedPost.slides.map((slide, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlideIndex(idx)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: idx === activeSlideIndex ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)',
                  background: idx === activeSlideIndex ? 'rgba(56, 189, 248, 0.2)' : 'rgba(30, 41, 59, 0.5)',
                  color: idx === activeSlideIndex ? '#38bdf8' : '#94a3b8',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Slide {idx + 1}
              </button>
            ))}
          </div>

        </section>

        {/* Right Column: AI Caption Generator & Hashtags */}
        <section className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Wand2 size={18} color="#f43f5e" /> AI Caption & Hashtags
            </h2>
            <button onClick={handleCopyCaption} className="btn-secondary" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
              {copiedCaption ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
              {copiedCaption ? 'Copied!' : 'Copy Text'}
            </button>
          </div>

          {/* Tone Selector */}
          <div>
            <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>
              Gaya Penulisan / Tone:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
              {[
                { id: 'professional', label: '📊 Formal' },
                { id: 'casual', label: '🔥 Casual' },
                { id: 'storytelling', label: '💡 Story' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => handleToneChange(t.id)}
                  style={{
                    padding: '6px',
                    fontSize: '0.75rem',
                    borderRadius: '6px',
                    border: tone === t.id ? '1px solid #f43f5e' : '1px solid rgba(255,255,255,0.1)',
                    background: tone === t.id ? 'rgba(244, 63, 94, 0.15)' : 'rgba(15, 23, 42, 0.4)',
                    color: tone === t.id ? '#f43f5e' : '#cbd5e1',
                    cursor: 'pointer',
                    fontWeight: tone === t.id ? 600 : 400
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Caption Box */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <textarea 
              readOnly 
              value={generatedPost.caption}
              style={{
                width: '100%',
                flex: 1,
                minHeight: '260px',
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                padding: '12px',
                color: '#e2e8f0',
                fontSize: '0.8rem',
                lineHeight: 1.45,
                resize: 'none',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Workflow export hint */}
          <div style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px border-dashed rgba(255,255,255,0.1)', fontSize: '0.75rem', color: '#94a3b8' }}>
            💡 <strong>Pro Tip:</strong> File <code style={{ color: '#38bdf8' }}>n8n_workflow.json</code> disertakan di repo untuk otomatisasi postingan via webhook n8n / Flowise.
          </div>

        </section>

      </main>
    </div>
  );
}
