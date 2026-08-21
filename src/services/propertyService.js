// Mock Property News & RSS Feed Fetcher Service

export const INITIAL_PROPERTY_NEWS = [
  {
    id: "news-1",
    title: "Suku Bunga BI Turun, Pasar Properti & KPR Diprediksi Melonjak di Kuartal III 2026",
    category: "Market Update",
    source: "PropertyInsight ID",
    date: "21 Agu 2026",
    summary: "Keputusan Bank Indonesia menurunkan suku bunga acuan membawa angin segar bagi calon pembeli rumah. Sektor KPR diperkirakan tumbuh hingga 14% seiring turunnya beban cicilan bulanan.",
    url: "https://example.com/news/bi-rate-property",
    keyPoints: [
      "Suku bunga acuan BI turun 25 bps.",
      "KPR perbankan diprediksi makin terjangkau.",
      "Momen emas untuk first-home buyer dan investor."
    ]
  },
  {
    id: "news-2",
    title: "Insentif PPN DTP 100% Rumah Diperpanjang: Rumah di Bawah Rp 2 Miliar Bebas Pajak",
    category: "Kebijakan & Pajak",
    source: "RumahKita News",
    date: "20 Agu 2026",
    summary: "Pemerintah resmi memperpanjang insentif PPN Ditanggung Pemerintah (PPN DTP) hingga akhir tahun. Pembelian hunian siap huni dengan harga sampai Rp 2 Miliar mendapat pembebasan pajak penuh.",
    url: "https://example.com/news/ppn-dtp-2026",
    keyPoints: [
      "Bebas PPN 100% untuk rumah ready stock < Rp 2 Miliar.",
      "Penghematan biaya awal hingga puluhan juta rupiah.",
      "Pengembang siapkan ribuan unit siap huni."
    ]
  },
  {
    id: "news-3",
    title: "Tren 'Transit-Oriented Development' (TOD) Jadi Favorit Milenial Jakarta & Suburb",
    category: "Lifestyle & Investment",
    source: "Urban Living Times",
    date: "19 Agu 2026",
    summary: "Hunian yang terintegrasi langsung dengan stasiun LRT, MRT, dan KRL mengalami lonjakan peminat hingga 35%. Kepraktisan mobilitas dan nilai investasi jangka panjang jadi alasan utama.",
    url: "https://example.com/news/tod-housing-trend",
    keyPoints: [
      "Apartemen & perumahan TOD catat kenaikan harga sewa.",
      "Hemat waktu tempuh hingga 60 menit sehari.",
      "Milenial prioritas akses transportasi publik."
    ]
  },
  {
    id: "news-4",
    title: "Harga Rumah Sekunder di Jabodetabek Naik 4.8%: Area BSD & Gading Serpong Memimpin",
    category: "Harga & Tren",
    source: "IndoProperty Index",
    date: "18 Agu 2026",
    summary: "Indeks harga rumah second menunjukkan tren positif. Kawasan Tangerang Selatan dan Kab. Tangerang mencatat pertumbuhan harga tertinggi karena kelengkapan infrastruktur dan fasilitas komersial.",
    url: "https://example.com/news/secondary-housing-index",
    keyPoints: [
      "Kenaikan rata-rata 4.8% (YoY) di Jabodetabek.",
      "Kawasan BSD & Gading Serpong paling diburu.",
      "Permintaan tinggi di kelas harga Rp 1.2M - Rp 2.5M."
    ]
  }
];

export const THEME_PRESETS = [
  {
    id: "modern-dark",
    name: "Dark Luxury Glass",
    bg: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #090d16 100%)",
    cardBg: "rgba(30, 41, 59, 0.7)",
    textColor: "#ffffff",
    accentColor: "#38bdf8",
    secondaryAccent: "#f43f5e",
    fontFamily: "Inter, sans-serif"
  },
  {
    id: "emerald-wealth",
    name: "Emerald Property",
    bg: "linear-gradient(135deg, #064e3b 0%, #022c22 100%)",
    cardBg: "rgba(6, 78, 59, 0.6)",
    textColor: "#f0fdf4",
    accentColor: "#34d399",
    secondaryAccent: "#fbbf24",
    fontFamily: "Inter, sans-serif"
  },
  {
    id: "sunset-vibes",
    name: "Warm Terracotta",
    bg: "linear-gradient(135deg, #7c2d12 0%, #451a03 100%)",
    cardBg: "rgba(124, 45, 18, 0.6)",
    textColor: "#fff7ed",
    accentColor: "#fb923c",
    secondaryAccent: "#facc15",
    fontFamily: "Inter, sans-serif"
  },
  {
    id: "minimal-clean",
    name: "Nordic Minimalist",
    bg: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    cardBg: "rgba(255, 255, 255, 0.9)",
    textColor: "#0f172a",
    accentColor: "#0284c7",
    secondaryAccent: "#e11d48",
    fontFamily: "Inter, sans-serif"
  }
];

export function generateAIGeneratedPost(newsItem, styleTone = "professional") {
  const tonePrefix = {
    professional: "📊 ANALISIS PASAR PROPERTI MINGGU INI",
    casual: "🔥 SPOILER: Momen Terbaik Beli Rumah Ada Sekarang?!",
    storytelling: "💡 Mengapa Anak Muda Banyak yang Mulai Beli Rumah di 2026?"
  }[styleTone] || "📢 PROPERTY NEWS WEEKLY UPDATE";

  const slide1Title = newsItem.title.split(":")[0] || newsItem.title;
  const slide1Sub = newsItem.source + " • " + newsItem.date;

  const slides = [
    {
      slideIndex: 1,
      type: "cover",
      tagline: newsItem.category.toUpperCase(),
      title: slide1Title,
      subtitle: slide1Sub,
      footer: "Swipe untuk rangkuman lengkap 👉"
    },
    ...newsItem.keyPoints.map((pt, idx) => ({
      slideIndex: idx + 2,
      type: "point",
      tagline: `POINT ${idx + 1}`,
      title: pt,
      subtitle: "Dampak signifikan untuk pembeli rumah & investor properti saat ini.",
      footer: `Weekly IG Post Generator • ${idx + 2}/4`
    })),
    {
      slideIndex: 4,
      type: "cta",
      tagline: "ACTION PLAN",
      title: "Mau Punya Rumah / Investasi Properti Tahun Ini?",
      subtitle: "Simpan post ini & share ke pasangan / keluarga kamu sekarang!",
      footer: "Follow @YourPropertyBrand for Weekly Market News 🚀"
    }
  ];

  const caption = `${tonePrefix}

${newsItem.title}

${newsItem.summary}

🔑 Poin Penting Minggu Ini:
${newsItem.keyPoints.map(p => `• ${p}`).join("\n")}

💬 Pertanyaan untuk kamu:
Apakah menurutmu ini momen yang tepat untuk ambil KPR atau investasi properti? Tulis pendapatmu di kolom komentar! 👇

---
📌 Simpan postingan ini agar tidak lupa!
👥 Tag teman/pasangan kamu yang lagi cari rumah!

#PropertyNews #InvestasiProperti #RumahImpian #InfoKPR #TipsProperti #PropertiIndonesia #RealEstateID #KPRMurah`;

  return {
    newsId: newsItem.id,
    tone: styleTone,
    slides,
    caption,
    hashtags: ["#PropertyNews", "#InvestasiProperti", "#RumahImpian", "#InfoKPR", "#TipsProperti"]
  };
}
