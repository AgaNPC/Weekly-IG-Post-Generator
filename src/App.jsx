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
  Newspaper,
  Flame,
  Bookmark,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  Hash
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
    }, 250);
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
      category: "Custom News Feed",
      source: "User Input",
      date: "Hari Ini",
      summary: customSummary,
      url: "#",
      keyPoints: [
        customSummary.slice(0, 60) + "...",
        "Analisis kustom untuk target Gen Z & Young Millennials.",
        "Rekomendasi taktis sebelum mengambil keputusan KPR."
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
        particleCount: 70,
        spread: 50,
        origin: { y: 0.8 }
      });
    } catch (err) {
      console.error('Failed to download image:', err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '16px' }}>
      
      {/* Header - AuthKit Cathedral Midnight style */}
      <header className="glass-panel" style={{ padding: '16px 24px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ 
            width: '42px', 
            height: '42px', 
            borderRadius: '9999px', 
            background: 'var(--color-luminous-fill)', 
            border: '1px solid var(--color-glass-edge)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Building2 size={22} color="#d8ecf8" />
          </div>
          <div>
            <h1 className="wordmark-gradient" style={{ fontSize: '1.35rem', fontWeight: 600, letterSpacing: '-0.01em' }}>
              Weekly IG Post Generator
            </h1>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-moon-mist)' }}>
              Auto-generate Instagram posts & carousels from Property News (Gen Z & KPR Anxiety Edition)
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ 
            fontSize: '0.72rem', 
            fontFamily: 'var(--font-dotdigital)', 
            padding: '4px 10px', 
            borderRadius: '6px', 
            background: 'var(--color-luminous-fill)',
            border: '1px solid var(--color-glass-edge)',
            color: 'var(--color-moon-mist)',
            textTransform: 'uppercase'
          }}>
            Theme: Midnight Cathedral
          </span>
          <a 
            href="https://github.com/AgaNPC/Weekly-IG-Post-Generator" 
            target="_blank" 
            rel="noreferrer" 
            className="btn-ghost-pill"
            style={{ textDecoration: 'none', fontSize: '0.85rem' }}
          >
            <Code2 size={16} /> GitHub Repo
          </a>
        </div>
      </header>

      {/* Main Grid Layout */}
      <main style={{ flex: 1, display: 'grid', gridTemplateColumns: '400px 1fr 420px', gap: '20px' }}>
        
        {/* Left Column: Expanded Property News Feed (8+ Articles) */}
        <section className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-ice-highlight)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Newspaper size={18} color="#b6d9fc" /> Trending Property News Feed
            </h2>
            <span style={{ 
              fontSize: '0.7rem', 
              fontFamily: 'var(--font-dotdigital)',
              background: 'var(--color-luminous-fill)', 
              color: 'var(--color-blueprint-blue)', 
              padding: '3px 8px', 
              borderRadius: '6px',
              border: '1px solid var(--color-glass-edge)'
            }}>
              {newsList.length} FEEDS
            </span>
          </div>

          {/* News List Container with Smooth Scrollbar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', maxHeight: '460px', paddingRight: '4px' }}>
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
                    borderColor: isSelected ? 'var(--color-void-violet)' : 'var(--color-glass-edge)',
                    background: isSelected ? 'rgba(102, 58, 243, 0.15)' : 'var(--color-luminous-fill)',
                    boxShadow: isSelected ? '0 0 12px rgba(102, 58, 243, 0.3)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ 
                      fontSize: '0.68rem', 
                      fontFamily: 'var(--font-dotdigital)', 
                      color: isSelected ? '#b6d9fc' : 'var(--color-moon-mist)', 
                      fontWeight: 500 
                    }}>
                      {news.category}
                    </span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--color-fog-veil)' }}>{news.date}</span>
                  </div>
                  <h3 style={{ fontSize: '0.86rem', fontWeight: 600, lineHeight: 1.35, color: isSelected ? '#ffffff' : 'var(--color-frost-glow)' }}>
                    {news.title}
                  </h3>
                  <p style={{ fontSize: '0.74rem', color: 'var(--color-fog-veil)', marginTop: '6px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {news.summary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Add Custom News Form */}
          <div style={{ borderTop: '1px solid var(--color-glass-edge)', paddingTop: '14px' }}>
            <h3 style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: '8px', color: 'var(--color-moon-mist)' }}>
              + Input Berita Properti Kustom
            </h3>
            <form onSubmit={handleAddCustomNews} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input 
                type="text" 
                placeholder="Judul berita / isu KPR..."
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                style={{ 
                  background: 'rgba(5, 6, 15, 0.9)', 
                  border: '1px solid var(--color-glass-edge)', 
                  padding: '8px 12px', 
                  borderRadius: '6px', 
                  color: '#fff', 
                  fontSize: '0.78rem',
                  outline: 'none'
                }}
              />
              <textarea 
                placeholder="Rangkuman/Isi ringkas berita..."
                value={customSummary}
                onChange={(e) => setCustomSummary(e.target.value)}
                rows={2}
                style={{ 
                  background: 'rgba(5, 6, 15, 0.9)', 
                  border: '1px solid var(--color-glass-edge)', 
                  padding: '8px 12px', 
                  borderRadius: '6px', 
                  color: '#fff', 
                  fontSize: '0.78rem', 
                  resize: 'none',
                  outline: 'none'
                }}
              />
              <button type="submit" className="btn-ghost-pill" style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem' }}>
                <Sparkles size={14} color="#b6d9fc" /> Generate dari Input
              </button>
            </form>
          </div>
        </section>

        {/* Middle Column: Visual IG Post Preview Canvas */}
        <section className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Controls Bar */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Palette size={16} color="#b6d9fc" />
              <span style={{ fontSize: '0.82rem', color: 'var(--color-moon-mist)' }}>Theme Style:</span>
              <select 
                value={selectedTheme.id} 
                onChange={(e) => setSelectedTheme(THEME_PRESETS.find(t => t.id === e.target.value))}
                style={{ 
                  background: 'rgba(5, 6, 15, 0.9)', 
                  border: '1px solid var(--color-glass-edge)', 
                  padding: '4px 10px', 
                  borderRadius: '6px', 
                  color: '#fff', 
                  fontSize: '0.8rem',
                  outline: 'none'
                }}
              >
                {THEME_PRESETS.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            <button onClick={handleDownloadSlide} className="btn-violet" style={{ fontSize: '0.82rem', padding: '8px 16px' }}>
              <Download size={15} /> Download Slide PNG
            </button>
          </div>

          {/* IG Canvas Card (1:1 Aspect ratio square container) */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, width: '100%', padding: '10px 0' }}>
            {isGenerating ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <RefreshCw size={32} color="#663af3" style={{ animation: 'spin 1s linear infinite' }} />
                <p style={{ fontSize: '0.85rem', color: 'var(--color-moon-mist)' }}>Generating AuthKit Glass Slide...</p>
              </div>
            ) : (
              <div 
                ref={slideRef}
                style={{
                  width: '390px',
                  height: '390px',
                  background: selectedTheme.bg,
                  borderRadius: '16px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  border: selectedTheme.borderEdge,
                  boxShadow: 'var(--shadow-modal)',
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
                    fontFamily: 'var(--font-dotdigital)', 
                    letterSpacing: '0.1em', 
                    color: selectedTheme.accentColor, 
                    background: 'rgba(186, 215, 247, 0.08)', 
                    border: '1px solid var(--color-glass-edge)',
                    padding: '4px 10px', 
                    borderRadius: '6px'
                  }}>
                    {generatedPost.slides[activeSlideIndex]?.tagline}
                  </span>
                  <span style={{ fontSize: '0.7rem', opacity: 0.75, fontFamily: 'var(--font-dotdigital)' }}>
                    KPR ANXIETY GUIDE
                  </span>
                </div>

                {/* Main Content Body */}
                <div style={{ margin: '16px 0' }}>
                  <h2 style={{ 
                    fontSize: activeSlideIndex === 0 ? '1.25rem' : '1.15rem', 
                    fontWeight: 600, 
                    lineHeight: 1.35, 
                    marginBottom: '10px',
                    color: selectedTheme.textColor 
                  }}>
                    {generatedPost.slides[activeSlideIndex]?.title}
                  </h2>
                  <p style={{ 
                    fontSize: '0.8rem', 
                    lineHeight: 1.4, 
                    color: selectedTheme.bodyTextColor || 'var(--color-frost-glow)'
                  }}>
                    {generatedPost.slides[activeSlideIndex]?.subtitle}
                  </p>
                </div>

                {/* Bottom Footer */}
                <div style={{ borderTop: '1px solid rgba(186, 215, 247, 0.15)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.7rem', color: selectedTheme.mutedTextColor || 'var(--color-moon-mist)', fontWeight: 500 }}>
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
                          background: idx === activeSlideIndex ? selectedTheme.accentColor : 'rgba(255,255,255,0.2)',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-moon-mist)', marginRight: '4px' }}>Slide Selection:</span>
            {generatedPost.slides.map((slide, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlideIndex(idx)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: idx === activeSlideIndex ? '1px solid var(--color-void-violet)' : '1px solid var(--color-glass-edge)',
                  background: idx === activeSlideIndex ? 'rgba(102, 58, 243, 0.25)' : 'var(--color-luminous-fill)',
                  color: idx === activeSlideIndex ? '#ffffff' : 'var(--color-moon-mist)',
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                Slide {idx + 1}
              </button>
            ))}
          </div>

        </section>

        {/* Right Column: Varied AI Caption & Hashtags */}
        <section className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-ice-highlight)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Wand2 size={18} color="#663af3" /> AI Caption & Hashtags Generator
            </h2>
            <button onClick={handleCopyCaption} className="btn-ghost-pill" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
              {copiedCaption ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
              {copiedCaption ? 'Copied!' : 'Copy Text'}
            </button>
          </div>

          {/* Tone Selector (5 Varied Options) */}
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--color-moon-mist)', display: 'block', marginBottom: '6px' }}>
              Pilih Gaya Penulisan / Tone Caption:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              {[
                { id: 'professional', label: '📊 Professional' },
                { id: 'casual', label: '🔥 Casual Gen Z' },
                { id: 'storytelling', label: '💡 Storytelling' },
                { id: 'educational', label: '📚 Educational 101' },
                { id: 'urgent', label: '🚨 Warning Alert' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => handleToneChange(t.id)}
                  style={{
                    padding: '6px 10px',
                    fontSize: '0.75rem',
                    borderRadius: '6px',
                    border: tone === t.id ? '1px solid var(--color-void-violet)' : '1px solid var(--color-glass-edge)',
                    background: tone === t.id ? 'rgba(102, 58, 243, 0.25)' : 'var(--color-luminous-fill)',
                    color: tone === t.id ? '#ffffff' : 'var(--color-moon-mist)',
                    cursor: 'pointer',
                    fontWeight: tone === t.id ? 500 : 400,
                    textAlign: 'left'
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hashtag Preview Chips */}
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--color-moon-mist)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Hash size={13} color="#b6d9fc" /> Hashtag Variations ({generatedPost.hashtags.length}):
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', maxHeight: '60px', overflowY: 'auto' }}>
              {generatedPost.hashtags.map((ht, idx) => (
                <span 
                  key={idx}
                  style={{
                    fontSize: '0.7rem',
                    background: 'var(--color-luminous-fill)',
                    border: '1px solid var(--color-glass-edge)',
                    color: 'var(--color-blueprint-blue)',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}
                >
                  {ht}
                </span>
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
                minHeight: '230px',
                background: 'rgba(5, 6, 15, 0.9)',
                border: '1px solid var(--color-glass-edge)',
                borderRadius: '8px',
                padding: '12px',
                color: 'var(--color-frost-glow)',
                fontSize: '0.78rem',
                lineHeight: 1.45,
                resize: 'none',
                fontFamily: 'inherit',
                outline: 'none'
              }}
            />
          </div>

        </section>

      </main>
    </div>
  );
}
