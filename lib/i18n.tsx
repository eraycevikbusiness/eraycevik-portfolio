"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "de" | "en" | "tr";

const translations = {
  de: {
    nav: {
      about: "Über mich",
      stack: "Skills",
      projects: "Projekte",
      experience: "Erfahrung",
      contact: "Kontakt",
      cta: "Schreib mir",
    },
    hero: {
      role: "Lernender Informatiker EFZ · Digitec",
      status: "Verfügbar · 2026",
      eyebrow1: "Developer",
      eyebrow2: "Full Stack",
      eyebrow3: ".NET & Web",
      sub: "19 Jahre alt, aus der Schweiz — mit 14 als Autodidakt angefangen, heute Lernender bei Digitec und immer am Bauen.",
      cta1: "Projekte ansehen",
      cta2: "Kontakt aufnehmen",
      scroll: "scroll",
      meta: ["Zürich · CH", "since 2020", "v2026"],
    },
    about: {
      eyebrow: "01 — Über mich",
      title1: "Wer bin",
      title2: "ich?",
      p1_pre: "Hey — ich bin ",
      p1_name: "Eray Kaan Cevik",
      p1_mid: ", 19 Jahre alt aus der Schweiz. Ich absolviere aktuell meine Ausbildung zum Informatiker EFZ bei ",
      p1_org: "Digitec Galaxus",
      p1_post: " — einem der grössten E-Commerce-Unternehmen der Schweiz.",
      p2_pre: "Mit ",
      p2_age: "14 Jahren",
      p2_mid: " habe ich autodidaktisch angefangen zu programmieren — zuerst Python, dann der Wechsel auf C# und .NET. Heute lerne ich bei Digitec weiter und arbeite parallel an eigenen Projekten. Mein bisher bekanntestes ist ",
      p2_proj: "MudForge",
      p2_post: " — eine MIT-lizenzierte NuGet-Library, die das Theming in Blazor-Apps mit MudBlazor vereinfacht.",
      p3: "Ich liebe es, Probleme zu lösen, die anderen Entwicklern das Leben einfacher machen. Egal ob .NET, Blazor oder Web — sauberer Code und gute Developer Experience sind mir wichtiger als schnelle Lösungen.",
      stats: [
        ["19", "Jahre alt", "born 2007"],
        ["EFZ", "Informatiker", "Schweiz · 2023→"],
        ["MIT", "Open Source", "NuGet published"],
        ["∞", "Energy", "pro Tag"],
      ],
    },
    stack: {
      eyebrow: "02 — Tech Stack",
      title1: "Womit ich",
      title2: "baue",
      sub: "Mein Werkzeugkasten — von der Datenbank bis zum Deployment.",
      cards: [
        [".NET Ökosystem", "C#, Blazor, Razor, Avalonia UI und WPF — von Web-Apps bis zu nativen Desktop-Applikationen mit dem .NET-Stack."],
        ["Rust & Web", "Rust lerne ich gerade — ein Bereich, in den ich mich Schritt für Schritt einarbeite. Parallel arbeite ich produktiv mit TypeScript und React an modernen Webfrontends."],
        ["KI-Integration", "Claude API für KI-Features in eigenen Side-Projects — Prompt-Engineering, Tool-Calls, Streaming."],
        ["Open Source & Tooling", "Git, GitHub Actions, Docker und NuGet-Publishing. Ich lerne täglich Neues — in der Ausbildung und durch eigene Projekte."],
      ],
      kickers: ["// .NET", "// Web", "// AI", "// OSS"],
    },
    projects: {
      eyebrow: "03 — Projekte",
      title1: "Was ich",
      title2: "gebaut habe",
      featured: "// featured",
      all: "Alle Projekte →",
      items: [
        {
          tag: "Open Source · Featured",
          title: "MudForge",
          desc: "MIT-lizenzierte NuGet-Library, die das Theming in Blazor-Apps mit MudBlazor vereinfacht. Unterstützt Dark/Light Mode, automatische System-Theme-Erkennung und persistente Speicherung im localStorage.",
          metrics: [["MIT", "Lizenz"], ["✓", "NuGet Package"]],
        },
        {
          tag: "Ausbildung · Digitec",
          title: "Interne Tools",
          desc: "Im Rahmen meiner Ausbildung bei Digitec Galaxus arbeite ich an internen Werkzeugen und lerne, wie Software in einem der grössten Schweizer E-Commerce-Unternehmen entwickelt, getestet und deployed wird.",
          metrics: [["2023", "Seit"], ["EFZ", "Abschluss"]],
        },
        {
          tag: "Web · Persönlich",
          title: "Portfolio",
          desc: "Dieses Portfolio wurde mithilfe von Claude AI gebaut. Pure black, vollständig animiert, dreisprachig.",
          metrics: [["3", "Sprachen"], ["100%", "Dark Mode"]],
        },
      ],
    },
    experience: {
      eyebrow: "04 — Erfahrung",
      title1: "Mein",
      title2: "Werdegang",
      items: [
        {
          range: "2023 — heute",
          where: "Zürich, Schweiz",
          role: "Lernender Informatiker EFZ",
          org: "Digitec Galaxus AG",
          bullets: [
            "Ausbildung zum Informatiker EFZ (Applikationsentwicklung) bei einem der grössten Schweizer E-Commerce-Unternehmen",
            "Mitarbeit an internen Tools und Applikationen mit .NET und C#",
            "Agile Entwicklungsprozesse, Code Reviews und Teamarbeit in einem professionellen Umfeld",
            "Täglicher Einsatz von Git, SQL und modernen Entwicklungswerkzeugen",
          ],
        },
        {
          range: "2023 — heute",
          where: "Remote · GitHub",
          role: "Eigenprojekte & Open Source",
          org: "MudForge (Eigenprojekt)",
          bullets: [
            "Entwicklung von MudForge — einer MIT-lizenzierten NuGet-Library für Blazor-Theming",
            "Design der öffentlichen API und NuGet-Package-Publishing",
            "Unterstützung von Dark/Light Mode, System-Theme-Erkennung und localStorage-Persistenz",
            "Nebenprojekte als Lernfeld für neue Technologien und eigene Ideen",
          ],
        },
        {
          range: "2020 — 2023",
          where: "Schweiz",
          role: "Selbstständiges Lernen & Projekte",
          org: "Eigeninitiative",
          bullets: [
            "Programmieren ab 14 Jahren autodidaktisch erlernt — zuerst Python, dann Wechsel auf C# und .NET",
            "Eigene Web- und Desktop-Projekte als Lerngrundlage",
            "Aufbau von Grundlagen in Git, Datenbankdesign und objektorientierter Programmierung",
          ],
        },
      ],
    },
    contact: {
      eyebrow: "05 — Kontakt",
      title1: "Lass uns was",
      title2: "bauen",
      sub: "Offen für neue Projekte, Freelance-Anfragen und spannende Vollzeitstellen. Schreib mir — ich antworte innerhalb von 24h.",
      f_name: "Name",
      f_email: "E-Mail",
      f_subject: "Betreff",
      f_message: "Nachricht",
      ph_name: "Max Mustermann",
      ph_email: "max@mail.de",
      ph_subject: "Projektanfrage · Job · Sonstiges",
      ph_message: "Hey Eray, ich habe ein cooles Projekt…",
      hint_optional: "optional",
      err_name: "Name fehlt",
      err_email: "gültige E-Mail",
      err_message: "min. 10 Zeichen",
      reply: "<antwort innerhalb von 24h />",
      send: "Nachricht senden",
      sending: "sende…",
      sent: "gesendet — danke!",
      avail: ["Aktuell verfügbar für", "Side-Projects", "&", "Open-Source-Mitarbeit"],
      labels: { github: "GitHub", linkedin: "LinkedIn", twitter: "Twitter / X" },
    },
    footer: { top: "↑ Top", proj: "Projekte", cont: "Kontakt" },
  },

  en: {
    nav: {
      about: "About",
      stack: "Skills",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
      cta: "Get in touch",
    },
    hero: {
      role: "IT Apprentice EFZ · Digitec",
      status: "Available · 2026",
      eyebrow1: "Developer",
      eyebrow2: "Full Stack",
      eyebrow3: ".NET & Web",
      sub: "19 years old, from Switzerland — started coding at 14 as a self-taught dev, now training at Digitec and always building.",
      cta1: "See projects",
      cta2: "Get in touch",
      scroll: "scroll",
      meta: ["Zürich · CH", "since 2020", "v2026"],
    },
    about: {
      eyebrow: "01 — About",
      title1: "Who am",
      title2: "I?",
      p1_pre: "Hey — I'm ",
      p1_name: "Eray Kaan Cevik",
      p1_mid: ", 19, from Switzerland. I'm currently doing my IT apprenticeship (EFZ) at ",
      p1_org: "Digitec Galaxus",
      p1_post: " — one of Switzerland's largest e-commerce companies.",
      p2_pre: "I started teaching myself to code at ",
      p2_age: "14",
      p2_mid: " — first Python, then I switched to C# and .NET. Today I keep learning at Digitec while building my own projects on the side. The best-known so far is ",
      p2_proj: "MudForge",
      p2_post: " — an MIT-licensed NuGet library that simplifies theming in Blazor apps with MudBlazor.",
      p3: "I love solving problems that make other developers' lives easier. .NET, Blazor or web — clean code and good developer experience matter more to me than quick fixes.",
      stats: [
        ["19", "years old", "born 2007"],
        ["EFZ", "IT Apprentice", "Switzerland · 2023→"],
        ["MIT", "Open Source", "NuGet published"],
        ["∞", "Energy", "per day"],
      ],
    },
    stack: {
      eyebrow: "02 — Tech Stack",
      title1: "What I",
      title2: "build with",
      sub: "My toolbox — from database to deployment.",
      cards: [
        [".NET ecosystem", "C#, Blazor, Razor, Avalonia UI and WPF — from web apps to native desktop apps with the .NET stack."],
        ["Rust & Web", "Currently learning Rust — an area I'm working into step by step. In parallel I build modern web frontends with TypeScript and React in production."],
        ["AI integration", "Claude API for AI features in my own side projects — prompt engineering, tool calls, streaming."],
        ["Open Source & Tooling", "Git, GitHub Actions, Docker and NuGet publishing. Always learning — both at work and through my own projects."],
      ],
      kickers: ["// .NET", "// Web", "// AI", "// OSS"],
    },
    projects: {
      eyebrow: "03 — Projects",
      title1: "What I",
      title2: "have built",
      featured: "// featured",
      all: "All projects →",
      items: [
        {
          tag: "Open Source · Featured",
          title: "MudForge",
          desc: "MIT-licensed NuGet library that simplifies theming in Blazor apps with MudBlazor. Supports dark/light mode, automatic system-theme detection and persistent storage via localStorage.",
          metrics: [["MIT", "License"], ["✓", "NuGet Package"]],
        },
        {
          tag: "Apprenticeship · Digitec",
          title: "Internal Tools",
          desc: "As part of my apprenticeship at Digitec Galaxus I work on internal tools and learn how software is developed, tested and deployed at one of Switzerland's largest e-commerce companies.",
          metrics: [["2023", "Since"], ["EFZ", "Diploma"]],
        },
        {
          tag: "Web · Personal",
          title: "Portfolio",
          desc: "This portfolio was built with the help of Claude AI. Pure black, fully animated, trilingual.",
          metrics: [["3", "Languages"], ["100%", "Dark Mode"]],
        },
      ],
    },
    experience: {
      eyebrow: "04 — Experience",
      title1: "My",
      title2: "journey",
      items: [
        {
          range: "2023 — now",
          where: "Zürich, Switzerland",
          role: "IT Apprentice EFZ",
          org: "Digitec Galaxus AG",
          bullets: [
            "Apprenticeship in IT (application development) at one of Switzerland's largest e-commerce companies",
            "Working on internal tools and applications with .NET and C#",
            "Agile development, code reviews and teamwork in a professional environment",
            "Daily use of Git, SQL and modern dev tooling",
          ],
        },
        {
          range: "2023 — now",
          where: "Remote · GitHub",
          role: "Side Projects & Open Source",
          org: "MudForge (own project)",
          bullets: [
            "Built MudForge — an MIT-licensed NuGet library for Blazor theming",
            "Designed the public API and handled NuGet package publishing",
            "Dark/light mode support, system-theme detection and localStorage persistence",
            "Side projects as a sandbox for new tech and my own ideas",
          ],
        },
        {
          range: "2020 — 2023",
          where: "Switzerland",
          role: "Self-taught learning & projects",
          org: "Self-driven",
          bullets: [
            "Self-taught coding starting at 14 — first Python, then switched to C# and .NET",
            "Web and desktop side projects as a learning ground",
            "Foundations in Git, database design and object-oriented programming",
          ],
        },
      ],
    },
    contact: {
      eyebrow: "05 — Contact",
      title1: "Let's build",
      title2: "something",
      sub: "Open to new projects, freelance work and exciting full-time roles. Drop me a message — I reply within 24h.",
      f_name: "Name",
      f_email: "Email",
      f_subject: "Subject",
      f_message: "Message",
      ph_name: "Jane Doe",
      ph_email: "jane@mail.com",
      ph_subject: "Project · Job · Other",
      ph_message: "Hey Eray, I have a cool project…",
      hint_optional: "optional",
      err_name: "name missing",
      err_email: "valid email",
      err_message: "min. 10 chars",
      reply: "<reply within 24h />",
      send: "Send message",
      sending: "sending…",
      sent: "sent — thanks!",
      avail: ["Currently available for", "side projects", "&", "open-source contributions"],
      labels: { github: "GitHub", linkedin: "LinkedIn", twitter: "Twitter / X" },
    },
    footer: { top: "↑ Top", proj: "Projects", cont: "Contact" },
  },

  tr: {
    nav: {
      about: "Hakkımda",
      stack: "Yetenekler",
      projects: "Projeler",
      experience: "Deneyim",
      contact: "İletişim",
      cta: "Yaz bana",
    },
    hero: {
      role: "Bilişim Çırağı EFZ · Digitec",
      status: "Müsait · 2026",
      eyebrow1: "Geliştirici",
      eyebrow2: "Full Stack",
      eyebrow3: ".NET & Web",
      sub: "19 yaşında, İsviçre'den — 14 yaşında otodidakt olarak başladım, şimdi Digitec'te eğitim alıyorum ve sürekli üretiyorum.",
      cta1: "Projeleri gör",
      cta2: "İletişime geç",
      scroll: "kaydır",
      meta: ["Zürih · CH", "2020'den beri", "v2026"],
    },
    about: {
      eyebrow: "01 — Hakkımda",
      title1: "Ben",
      title2: "kimim?",
      p1_pre: "Selam — ben ",
      p1_name: "Eray Kaan Cevik",
      p1_mid: ", 19 yaşında, İsviçre'den. Şu anda ",
      p1_org: "Digitec Galaxus",
      p1_post: "'ta bilişim çıraklığımı (EFZ) yapıyorum — İsviçre'nin en büyük e-ticaret şirketlerinden biri.",
      p2_pre: "",
      p2_age: "14 yaşında",
      p2_mid: " kendi kendime kod yazmaya başladım — önce Python, sonra C# ve .NET'e geçtim. Bugün Digitec'te öğrenmeye devam ediyor, bir yandan da kendi projelerime çalışıyorum. Şimdiye kadar en bilinen projem ",
      p2_proj: "MudForge",
      p2_post: " — Blazor uygulamalarında MudBlazor ile temalamayı kolaylaştıran MIT lisanslı bir NuGet kütüphanesi.",
      p3: "Diğer geliştiricilerin hayatını kolaylaştıran sorunları çözmeyi seviyorum. .NET, Blazor ya da web — temiz kod ve iyi developer experience benim için hızlı çözümlerden daha önemli.",
      stats: [
        ["19", "yaşında", "doğum 2007"],
        ["EFZ", "Bilişim Çırağı", "İsviçre · 2023→"],
        ["MIT", "Open Source", "NuGet yayında"],
        ["∞", "Energy", "günde"],
      ],
    },
    stack: {
      eyebrow: "02 — Tech Stack",
      title1: "Hangi araçlarla",
      title2: "üretiyorum",
      sub: "Alet çantam — veritabanından deployment'a.",
      cards: [
        [".NET ekosistemi", "C#, Blazor, Razor, Avalonia UI ve WPF — web uygulamalarından native masaüstüne kadar .NET ile."],
        ["Rust & Web", "Rust'ı şu anda adım adım öğreniyorum. Paralelinde TypeScript ve React ile modern web frontend'leri üretiyorum."],
        ["AI entegrasyonu", "Kendi yan projelerimde Claude API ile yapay zeka özellikleri — prompt engineering, tool calls, streaming."],
        ["Open Source & Araçlar", "Git, GitHub Actions, Docker ve NuGet publishing. Her gün yeni bir şey öğreniyorum — hem işte hem kendi projelerimle."],
      ],
      kickers: ["// .NET", "// Web", "// AI", "// OSS"],
    },
    projects: {
      eyebrow: "03 — Projeler",
      title1: "Neler",
      title2: "yaptım",
      featured: "// öne çıkan",
      all: "Tüm projeler →",
      items: [
        {
          tag: "Open Source · Öne çıkan",
          title: "MudForge",
          desc: "Blazor uygulamalarında MudBlazor ile temalamayı kolaylaştıran MIT lisanslı NuGet kütüphanesi. Dark/Light Mode, otomatik sistem teması algılama ve localStorage ile kalıcı saklama.",
          metrics: [["MIT", "Lisans"], ["✓", "NuGet Paketi"]],
        },
        {
          tag: "Çıraklık · Digitec",
          title: "Dahili Araçlar",
          desc: "Digitec Galaxus'taki çıraklığım kapsamında dahili araçlar üzerinde çalışıyorum ve İsviçre'nin en büyük e-ticaret şirketlerinden birinde yazılımın nasıl geliştirildiğini öğreniyorum.",
          metrics: [["2023", "Beri"], ["EFZ", "Diploma"]],
        },
        {
          tag: "Web · Kişisel",
          title: "Portfolio",
          desc: "Bu portfolyo Claude AI yardımıyla yapıldı. Tamamen siyah, animasyonlu, üç dilli.",
          metrics: [["3", "Dil"], ["100%", "Dark Mode"]],
        },
      ],
    },
    experience: {
      eyebrow: "04 — Deneyim",
      title1: "Yolculuğum",
      title2: "",
      items: [
        {
          range: "2023 — şimdi",
          where: "Zürih, İsviçre",
          role: "Bilişim Çırağı EFZ",
          org: "Digitec Galaxus AG",
          bullets: [
            "İsviçre'nin en büyük e-ticaret şirketlerinden birinde Bilişim çıraklığı (uygulama geliştirme)",
            ".NET ve C# ile dahili araçlar ve uygulamalar üzerinde çalışma",
            "Profesyonel ortamda agile süreçler, code review ve takım çalışması",
            "Git, SQL ve modern geliştirme araçlarının günlük kullanımı",
          ],
        },
        {
          range: "2023 — şimdi",
          where: "Remote · GitHub",
          role: "Yan Projeler & Open Source",
          org: "MudForge (kendi projem)",
          bullets: [
            "Blazor temalama için MIT lisanslı NuGet kütüphanesi MudForge'u geliştirdim",
            "Public API tasarımı ve NuGet paket yayınlama",
            "Dark/Light Mode, sistem teması algılama ve localStorage kalıcılığı",
            "Yan projeler — yeni teknolojiler ve fikirler için oyun alanı",
          ],
        },
        {
          range: "2020 — 2023",
          where: "İsviçre",
          role: "Otodidakt öğrenme & projeler",
          org: "Kendi inisiyatifim",
          bullets: [
            "14 yaşımda kendi kendime kod yazmayı öğrendim — önce Python, sonra C# ve .NET'e geçtim",
            "Kendi web ve masaüstü projelerim öğrenme zemini olarak",
            "Git, veritabanı tasarımı ve nesne yönelimli programlama temellerinin oluşturulması",
          ],
        },
      ],
    },
    contact: {
      eyebrow: "05 — İletişim",
      title1: "Birlikte bir şey",
      title2: "yapalım",
      sub: "Yeni projelere, freelance çalışmaya ve heyecan verici tam zamanlı pozisyonlara açığım. Yaz bana — 24 saat içinde dönüş yapıyorum.",
      f_name: "İsim",
      f_email: "E-posta",
      f_subject: "Konu",
      f_message: "Mesaj",
      ph_name: "Ahmet Yılmaz",
      ph_email: "ahmet@mail.com",
      ph_subject: "Proje · İş · Diğer",
      ph_message: "Selam Eray, harika bir projem var…",
      hint_optional: "opsiyonel",
      err_name: "isim eksik",
      err_email: "geçerli e-posta",
      err_message: "min. 10 karakter",
      reply: "<24 saat içinde yanıt />",
      send: "Mesajı gönder",
      sending: "gönderiliyor…",
      sent: "gönderildi — teşekkürler!",
      avail: ["Şu anda", "yan projeler", "&", "open-source katkı için müsait"],
      labels: { github: "GitHub", linkedin: "LinkedIn", twitter: "Twitter / X" },
    },
    footer: { top: "↑ Yukarı", proj: "Projeler", cont: "İletişim" },
  },
};

export type Translations = typeof translations.de;

interface LangCtxType {
  lang: Language;
  setLang: (l: Language) => void;
  t: Translations;
}

const LangCtx = createContext<LangCtxType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangRaw] = useState<Language>("de");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio_lang") as Language | null;
      if (saved && ["de", "en", "tr"].includes(saved)) setLangRaw(saved);
    } catch {}
  }, []);

  const setLang = (l: Language) => {
    setLangRaw(l);
    try { localStorage.setItem("portfolio_lang", l); } catch {}
    document.documentElement.lang = l;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LangCtx.Provider value={{ lang, setLang, t: translations[lang] as Translations }}>
      {children}
    </LangCtx.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

export function useT() {
  return useLang().t;
}
