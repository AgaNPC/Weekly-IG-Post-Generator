// Property News & RSS Feed Fetcher Service targeted for Gen Z & Young Millennials

export const INITIAL_PROPERTY_NEWS = [
  {
    id: "news-1",
    title: "Suku Bunga BI Turun: Angin Segar atau Tetap Bikin Gen Z Anxious Soal Cicilan KPR?",
    category: "KPR Anxiety & Reality Check",
    source: "PropertyInsight ID",
    date: "21 Agu 2026",
    summary: "BI rate resmi turun 25 bps! Tapi dengan gaji UMR atau mid-level di Jabodetabek, apakah cicilan rumah 3-5 jutaan per bulan masih realistis tanpa 'puasa' ngopi & holiday?",
    url: "https://example.com/news/bi-rate-genz-kpr",
    keyPoints: [
      "BI Rate turun = Peluang cicilan KPR sedikit lebih ringan.",
      "Reality Check: DP & Biaya Akad sering jadi 'silent killer' pembeli rumah pertama.",
      "Tips atasi KPR Anxiety: Hitung Rule 30% Gaji sebelum tanda tangan kesepakatan."
    ]
  },
  {
    id: "news-2",
    title: "Rumah Bebas PPN 100% Diperpanjang: Solusi Hemat Puluhan Juta Buat First-Home Buyer!",
    category: "Gen Z Tax Relief",
    source: "RumahKita News",
    date: "20 Agu 2026",
    summary: "Insentif PPN DTP 100% untuk rumah ready-stock dibawah Rp 2 Miliar sah diperpanjang. Buat Milenial muda yang lagi nahan dana akad KPR, ini momen emas hemat cash awal.",
    url: "https://example.com/news/ppn-dtp-genz",
    keyPoints: [
      "Bebas PPN 100% = Tabungan dana darurat kamu nggak langsung ludes.",
      "Khusus rumah ready stock: Bebas stres nunggu pembangunan developer telat.",
      "Kombinasikan dengan promo developer bebas biaya KPR/BPHTB."
    ]
  },
  {
    id: "news-3",
    title: "Rumah Pinggir Kota vs Apartemen TOD Transit: Mana Yang Nggak Bikin Mental Health Fomo?",
    category: "Gen Z Lifestyle",
    source: "Urban Living Times",
    date: "19 Agu 2026",
    summary: "Pilih hunian tapak 2 jam naik KRL dari kantor atau apartemen TOD nempel stasiun LRT? Perbandingan jujur ongkos transportasi vs kualitas hidup milenial muda.",
    url: "https://example.com/news/tod-vs-suburb-genz",
    keyPoints: [
      "Apartemen TOD: Hemat ongkos bensin & waktu commute sampai 50%.",
      "Rumah Tapak Suburb: Menang luas tanah, tapi capek di jalan.",
      "Cek kriteria pekerjaan kamu: WFH/Hybrid vs WFO 5 hari seminggu."
    ]
  },
  {
    id: "news-4",
    title: "First-Home Reality Check: Gaji 7-10 Juta Bisakah Beli Rumah Sendiri Tanpa Bantuan Orang Tua?",
    category: "Financial Freedom",
    source: "IndoProperty Index",
    date: "18 Agu 2026",
    summary: "Studi kasus riil milenial muda di Tangerang & Bogor. Strategi alokasi dana, gabung KPR bersama pasangan (Joint Income), dan memilih tenor 20-25 tahun tanpa terjebak kredit macet.",
    url: "https://example.com/news/gaji-7jt-beli-rumah",
    keyPoints: [
      "Gaji 7-10 Juta aman ambil KPR cicilan max Rp 2.5M - 3M/bulan.",
      "Fitur Joint Income KPR bisa melipatgandakan plafon pinjaman.",
      "Hindari pinjol & cicilan konsumtif 6 bulan sebelum pengajuan KPR."
    ]
  }
];

export const THEME_PRESETS = [
  {
    id: "modern-dark",
    name: "Gen Z Neon Glass",
    bg: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #090d16 100%)",
    cardBg: "rgba(30, 41, 59, 0.7)",
    textColor: "#ffffff",
    accentColor: "#38bdf8",
    secondaryAccent: "#f43f5e",
    fontFamily: "Inter, sans-serif"
  },
  {
    id: "emerald-wealth",
    name: "Money & Wealth",
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
    professional: "📊 FIRST-HOME REALITY CHECK | INFO KPR GEN Z",
    casual: "🔥 SPOILER: Panik Lihat Harga Rumah? Cek Fakta KPR Ini!",
    storytelling: "💡 Curhat Milenial: 'Gue Bisa Nggak Ya Punya Rumah Sendiri?'"
  }[styleTone] || "📢 KPR ANXIETY & PROPERTY NEWS";

  const slide1Title = newsItem.title.split(":")[0] || newsItem.title;
  const slide1Sub = newsItem.source + " • Target: Gen Z & Young Millennials";

  const slides = [
    {
      slideIndex: 1,
      type: "cover",
      tagline: "REALITY CHECK 🎯",
      title: slide1Title,
      subtitle: slide1Sub,
      footer: "Swipe biar gak panik lagi 👉"
    },
    ...newsItem.keyPoints.map((pt, idx) => ({
      slideIndex: idx + 2,
      type: "point",
      tagline: `FACT #${idx + 1}`,
      title: pt,
      subtitle: "Perspektif realistis buat kamu yang mau ambil KPR pertama tanpa mikir terlalu berat.",
      footer: `KPR Anxiety Guide • ${idx + 2}/4`
    })),
    {
      slideIndex: 4,
      type: "cta",
      tagline: "SURVIVAL KIT 🚀",
      title: "Punya KPR Anxiety Atau Masih Bingung Hitung DP?",
      subtitle: "Simpan post ini & share ke pasangan/bestie kamu yang lagi pejuang rumah pertama!",
      footer: "Follow @FirstHomeGenZ for Honest Property Tips 💡"
    }
  ];

  const caption = `${tonePrefix}

${newsItem.title}

${newsItem.summary}

🔑 Reality Check Poin Penting:
${newsItem.keyPoints.map(p => `• ${p}`).join("\n")}

💬 Pertanyaan buat kamu pejuang rumah pertama:
Apa hal terbesar yang paling bikin kamu takut/panik waktu mikirin KPR rumah pertama? (DP / Cicilan / Suku Bunga / Biaya Akad)? Tulis curhatanmu di kolom komentar yuk! 👇

---
📌 Simpan postingan ini biar nggak hilang pas butuh!
👥 Tag pasangan / bestie kamu yang lagi pusing nyari rumah pertama!

#GenZProperty #FirstHomeBuyer #KPRAnxiety #RumahPertama #TipsKPR #FinancialFreedomGenZ #PropertiMilenial #InfoKPR`;

  return {
    newsId: newsItem.id,
    tone: styleTone,
    slides,
    caption,
    hashtags: ["#GenZProperty", "#FirstHomeBuyer", "#KPRAnxiety", "#RumahPertama", "#TipsKPR"]
  };
}

