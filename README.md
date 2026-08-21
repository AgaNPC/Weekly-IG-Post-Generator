# 🏢 Weekly IG Post Generator - Property News AI Automation

> **Auto-generate Instagram Posts & Carousels from the latest Property News & Market Trends.**  
> Built for Real Estate Marketers, Property Agents, and Content Creators.

![Weekly IG Post Generator Preview](https://raw.githubusercontent.com/AgaNPC/Weekly-IG-Post-Generator/main/public/preview.png)

---

## 📌 Executive Summary & Submission Overview

Proyek ini dibuat untuk menyelesaikan **Option A: Weekly IG Post Generator**. Aplikasi ini mengambil berita properti terkini (misal: kebijakan KPR, tren suku bunga BI, PPN DTP 100%, tren hunian TOD) dan secara otomatis mengubahnya menjadi:
1. **Instagram Carousel Slides (1080x1080 visual PNG exportable)**.
2. **Engaging Caption & Relevant Hashtags** (dengan pilihan tone: Professional, Casual, Storytelling).
3. **Template Stylist Engine** (pilihan preset visual seperti Dark Luxury Glass, Emerald Property, Warm Terracotta, Minimalist).
4. **n8n / Flowise Automation Workflow JSON Export** (disediakan di `workflows/n8n_ig_post_generator.json`).

---

## 🎯 Target Audience & Core Topic

- **Target Audience**: Gen Z & Young Millennials (First-time property buyers who feel overwhelmed by housing prices).
- **Core Topic**: First-Home Reality Check / KPR Anxiety.

---

## 🤖 Prompts Used for AI Content Generation

Berikut adalah **Prompt Teks Utama** yang digunakan oleh sistem AI dalam melakukan ekstraksi berita properti menjadi konten Instagram Carousel & Caption:

```text
SYSTEM PROMPT:
You are an expert Social Media Specialist & Real Estate Content Strategist targeting Gen Z & Young Millennials.
Your goal is to digest raw property news articles, address "KPR Anxiety" and "First-Home Reality Check", and structure them into a high-converting 4-slide Instagram Carousel with relatable, engaging captions.

INPUT FORMAT:
- News Title: {NEWS_TITLE}
- News Summary: {NEWS_SUMMARY}
- Target Audience: Gen Z & Young Millennials (First-home buyers)
- Desired Tone: {professional | casual | storytelling}

OUTPUT SPECIFICATION (JSON / Structured Output):
1. Slide 1 (Cover): Relatable headline addressing KPR Anxiety + Subtitle + "REALITY CHECK 🎯" Tagline.
2. Slide 2 (Point 1): Core news fact / market change impact explained in plain language.
3. Slide 3 (Point 2): Key takeaway / financial tip for first-home buyers.
4. Slide 4 (Call To Action): Actionable CTA prompt (e.g. "Simpan post ini & tag bestie kamu!").
5. Caption Text: Relatable hook + News summary + Bullet points + Open-ended discussion question + Gen Z property hashtags (#GenZProperty #FirstHomeBuyer #KPRAnxiety #RumahPertama).
```

---

## 📝 Critical Self-Reflection & Evaluation (Requirement Mandatory)

### ❓ What Went Wrong During Development?
1. **Dynamic Text Overflow on Carousel Canvas**: Ketika judul berita berita properti terlalu panjang, teks pada slide visual sempat meluap (*overflow*) keluar dari batas 1080x1080.
   - *Solusi/Fix*: Menambahkan penyesuaian `fontSize` dinamis dan `lineHeight` ketat di CSS serta memotong judul yang terlalu panjang menjadi sub-headline yang proporsional.
2. **Export Quality with Canvas Capture**: Penggunaan library ekspor canvas kadang menghasilkan font yang sedikit blur atau warna gradien yang tidak ter-render sempurna di beberapa browser.
   - *Solusi/Fix*: Menggunakan `html-to-image` dengan konfigurasi `quality: 0.95` dan `cacheBust: true`.

### 💡 What Would I Change / Future Enhancements?
1. **Direct Instagram Graph API Publishing**: Mengintegrasikan OAuth langsung dengan Facebook/Instagram Graph API agar postingan yang sudah di-generate bisa langsung di-schedule/publish otomatis tanpa download manual.
2. **DALL-E / Midjourney Image Generation Integration**: Menambahkan background foto rumah/properti AI-generated asli yang relevan dengan topik berita di setiap slide.
3. **Live RSS Feed Crawler Backend**: Menambahkan Microservice Node.js/Python serverless crawler yang berjalan 24/7 di Vercel/Render untuk memantau Google News Properti secara real-time.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18+)
- npm / yarn

### Installation Steps
```bash
# 1. Clone repository
git clone https://github.com/AgaNPC/Weekly-IG-Post-Generator.git

# 2. Masuk ke direktori
cd Weekly-IG-Post-Generator

# 3. Install dependencies
npm install

# 4. Jalankan dev server
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`.

---

## ⚙️ Backend Automation (n8n Workflow Export)

File ekspor workflow n8n lengkap dapat ditemukan di direktori `workflows/n8n_ig_post_generator.json`. Workflow ini mencakup:
- **Cron Trigger**: Otomatis mengeksekusi setiap hari Senin jam 08.00 pagi.
- **HTTP Request**: Mengambil feed berita properti terbaru.
- **OpenAI Node**: Mengeksekusi prompt AI IG Post Generator.
- **Webhook Output**: Mengirim hasil caption dan slide data ke Dashboard / Instagram Auto-Publisher.
