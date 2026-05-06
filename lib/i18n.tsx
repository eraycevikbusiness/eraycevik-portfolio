"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

function detectLanguage(): Language {
  if (typeof navigator === "undefined") return "de";
  const preferred = [...(navigator.languages ?? [navigator.language])];
  return preferred.some((l) => l.toLowerCase().startsWith("de")) ? "de" : "en";
}

export type Language = "de" | "en";

const translations = {
  de: {
    nav: {
      about: "Über mich",
      skills: "Skills",
      projects: "Projekte",
      experience: "Erfahrung",
      contact: "Kontakt",
      hireMe: "Schreib mir",
    },
    hero: {
      badge: "Lernender Informatiker EFZ · Digitec",
      subtitle:
        "19 Jahre alt, aus der Schweiz — ich baue Open-Source-Libraries, lerne jeden Tag Neues und bringe Ideen vom Code in die Realität.",
      viewProjects: "Projekte ansehen",
      getInTouch: "Kontakt aufnehmen",
    },
    about: {
      label: "01 — Über mich",
      title1: "Wer bin",
      title2: "ich?",
      p1: {
        pre: "Hey — ich bin ",
        mid1: ", 19 Jahre alt aus der Schweiz. Ich absolviere aktuell meine Ausbildung zum ",
        role: "Informatiker EFZ",
        mid2: " bei ",
        post: " — einem der grössten E-Commerce-Unternehmen der Schweiz.",
      },
      p2: {
        pre: "Neben der Ausbildung arbeite ich an eigenen Projekten. Mein bisher bekanntestes ist ",
        post: " — eine MIT-lizenzierte NuGet-Library, die das Theming in Blazor-Apps mit MudBlazor vereinfacht.",
      },
      p3: "Ich liebe es, Probleme zu lösen, die anderen Entwicklern das Leben einfacher machen. Egal ob .NET, Blazor oder Web — sauberer Code und gute Developer Experience sind mir wichtiger als schnelle Lösungen.",
      stats: ["Jahre alt", "Informatiker Schweiz", "Open Source", "Kaffee"],
    },
    skills: {
      label: "02 — Tech Stack",
      title1: "Womit ich",
      title2: "baue",
      subtitle: "Mein Werkzeugkasten — von der Datenbank bis zum Deployment.",
      bento: [
        {
          title: ".NET Ökosystem",
          description:
            "C#, Blazor, Razor, Avalonia UI und WPF — von Web-Apps bis zu nativen Desktop-Applikationen mit dem .NET-Stack.",
        },
        {
          title: "Rust & Web",
          description:
            "Rust für Performance-kritischen Code, TypeScript und React für moderne Webfrontends.",
        },
        {
          title: "KI & Scrum",
          description:
            "Claude API für KI-Integration in eigene Projekte. Scrum und agile Prozesse täglich im Einsatz bei Digitec.",
        },
        {
          title: "Open Source & Tooling",
          description:
            "Git, GitHub Actions, Docker und NuGet-Publishing. Ich lerne täglich Neues — in der Ausbildung und durch eigene Projekte.",
        },
      ],
      alwaysLearning: "Always learning",
    },
    projects: {
      label: "03 — Projekte",
      title1: "Was ich",
      title2: "gebaut habe",
      viewAll: "Alle Projekte",
      items: [
        {
          tag: "Open Source · Featured",
          description:
            "MIT-lizenzierte NuGet-Library, die das Theming in Blazor-Apps mit MudBlazor vereinfacht. Unterstützt Dark/Light Mode, automatische System-Theme-Erkennung und persistente Speicherung im localStorage.",
          metrics: [
            { label: "Lizenz", value: "MIT" },
            { label: "NuGet Package", value: "✓" },
          ],
        },
        {
          tag: "Ausbildung · Digitec",
          description:
            "Im Rahmen meiner Ausbildung bei Digitec Galaxus arbeite ich an internen Werkzeugen und lerne, wie Software in einem der grössten Schweizer E-Commerce-Unternehmen entwickelt, getestet und deployed wird.",
          metrics: [
            { label: "Seit", value: "2023" },
            { label: "Abschluss", value: "EFZ" },
          ],
        },
        {
          tag: "Web · Persönlich",
          description:
            "Dieses Portfolio — entwickelt in Zusammenarbeit mit Claude AI. Next.js, Framer Motion und selbst implementierte Aceternity-UI-Komponenten. Pure black, vollständig animiert.",
          metrics: [
            { label: "Mit Claude", value: "gebaut" },
            { label: "Dark Mode", value: "100%" },
          ],
        },
      ],
    },
    experience: {
      label: "04 — Erfahrung",
      title1: "Mein",
      title2: "Werdegang",
      items: [
        {
          period: "2023 — heute",
          role: "Lernender Informatiker EFZ",
          location: "Zürich, Schweiz",
          highlights: [
            "Ausbildung zum Informatiker EFZ (Applikationsentwicklung) bei einem der grössten Schweizer E-Commerce-Unternehmen",
            "Mitarbeit an internen Tools und Applikationen mit .NET und C#",
            "Agile Entwicklungsprozesse, Code Reviews und Teamarbeit in einem professionellen Umfeld",
            "Täglicher Einsatz von Git, SQL und modernen Entwicklungswerkzeugen",
          ],
        },
        {
          period: "2023 — heute",
          role: "Eigenprojekte & Open Source",
          location: "Remote · GitHub",
          highlights: [
            "Entwicklung von MudForge — einer MIT-lizenzierten NuGet-Library für Blazor-Theming",
            "Design der öffentlichen API und NuGet-Package-Publishing",
            "Unterstützung von Dark/Light Mode, System-Theme-Erkennung und localStorage-Persistenz",
            "Nebenprojekte als Lernfeld für neue Technologien und eigene Ideen",
          ],
        },
        {
          period: "2020 — 2023",
          role: "Selbstständiges Lernen & Projekte",
          location: "Schweiz",
          highlights: [
            "Programmieren ab 16 Jahren autodidaktisch erlernt — zuerst JavaScript, dann C# und .NET",
            "Eigene Web- und Desktop-Projekte als Lerngrundlage",
            "Aufbau von Grundlagen in Git, Datenbankdesign und objektorientierter Programmierung",
          ],
        },
      ],
    },
    contact: {
      label: "05 — Kontakt",
      title1: "Lass uns was",
      title2: "bauen",
      subtitle:
        "Offen für neue Projekte, Freelance-Anfragen und spannende Vollzeitstellen. Schreib mir — ich antworte innerhalb von 24h.",
      name: "Name",
      email: "E-Mail",
      subject: "Betreff",
      message: "Nachricht",
      namePlaceholder: "Max Mustermann",
      emailPlaceholder: "max@mail.de",
      subjectPlaceholder: "Projektanfrage · Job · Sonstiges",
      messagePlaceholder: "Hey Eray, ich habe ein cooles Projekt…",
      send: "Nachricht senden",
      sent: "Nachricht gesendet ✓",
    },
    footer: "© 2024 Eray Kaan Cevik  ·  Built with Next.js, Framer Motion & Aceternity UI",
  },

  en: {
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
      hireMe: "Hire me",
    },
    hero: {
      badge: "IT Apprentice EFZ · Digitec",
      subtitle:
        "19 years old, from Switzerland — I build open-source libraries, learn something new every day, and bring ideas from code to reality.",
      viewProjects: "View Projects",
      getInTouch: "Get in touch",
    },
    about: {
      label: "01 — About me",
      title1: "Who am",
      title2: "I?",
      p1: {
        pre: "Hey — I'm ",
        mid1: ", 19 years old from Switzerland. I'm currently completing my apprenticeship as an ",
        role: "IT specialist EFZ",
        mid2: " at ",
        post: " — one of Switzerland's largest e-commerce companies.",
      },
      p2: {
        pre: "Alongside my apprenticeship, I work on personal projects. My best-known so far is ",
        post: " — an MIT-licensed NuGet library that simplifies theming in Blazor apps with MudBlazor.",
      },
      p3: "I love solving problems that make other developers' lives easier. Whether .NET, Blazor, or Web — clean code and a great developer experience matter more to me than quick fixes.",
      stats: ["years old", "IT Apprentice CH", "Open Source", "Coffee"],
    },
    skills: {
      label: "02 — Tech Stack",
      title1: "What I",
      title2: "build with",
      subtitle: "My toolbox — from database to deployment.",
      bento: [
        {
          title: ".NET Ecosystem",
          description:
            "C#, Blazor, Razor, Avalonia UI, and WPF — from web apps to native desktop applications with the .NET stack.",
        },
        {
          title: "Rust & Web",
          description:
            "Rust for performance-critical code, TypeScript and React for modern web frontends.",
        },
        {
          title: "AI & Scrum",
          description:
            "Claude API for AI integration in own projects. Scrum and agile processes in daily use at Digitec.",
        },
        {
          title: "Open Source & Tooling",
          description:
            "Git, GitHub Actions, Docker, and NuGet publishing. Always learning — in the apprenticeship and through own projects.",
        },
      ],
      alwaysLearning: "Always learning",
    },
    projects: {
      label: "03 — Projects",
      title1: "What I've",
      title2: "built",
      viewAll: "All projects",
      items: [
        {
          tag: "Open Source · Featured",
          description:
            "MIT-licensed NuGet library that simplifies theming in Blazor apps with MudBlazor. Supports Dark/Light Mode, automatic system theme detection, and persistent localStorage storage.",
          metrics: [
            { label: "License", value: "MIT" },
            { label: "NuGet Package", value: "✓" },
          ],
        },
        {
          tag: "Apprenticeship · Digitec",
          description:
            "As part of my apprenticeship at Digitec Galaxus, I work on internal tools and learn how software is developed, tested, and deployed at one of Switzerland's largest e-commerce companies.",
          metrics: [
            { label: "Since", value: "2023" },
            { label: "Graduation", value: "EFZ" },
          ],
        },
        {
          tag: "Web · Personal",
          description:
            "This portfolio — developed in collaboration with Claude AI. Next.js, Framer Motion, and custom-implemented Aceternity UI components. Pure black, fully animated.",
          metrics: [
            { label: "Built with", value: "Claude" },
            { label: "Dark Mode", value: "100%" },
          ],
        },
      ],
    },
    experience: {
      label: "04 — Experience",
      title1: "My",
      title2: "Journey",
      items: [
        {
          period: "2023 — present",
          role: "IT Apprentice EFZ",
          location: "Zurich, Switzerland",
          highlights: [
            "Apprenticeship as IT specialist EFZ (application development) at one of Switzerland's largest e-commerce companies",
            "Contributing to internal tools and applications with .NET and C#",
            "Agile development processes, code reviews, and teamwork in a professional environment",
            "Daily use of Git, SQL, and modern development tools",
          ],
        },
        {
          period: "2023 — present",
          role: "Personal Projects & Open Source",
          location: "Remote · GitHub",
          highlights: [
            "Developed MudForge — an MIT-licensed NuGet library for Blazor theming",
            "Designed the public API and NuGet package publishing",
            "Support for Dark/Light Mode, system theme detection, and localStorage persistence",
            "Side projects as a learning ground for new technologies and personal ideas",
          ],
        },
        {
          period: "2020 — 2023",
          role: "Self-taught Learning & Projects",
          location: "Switzerland",
          highlights: [
            "Self-taught programming from age 16 — starting with JavaScript, then C# and .NET",
            "Personal web and desktop projects as a learning foundation",
            "Built fundamentals in Git, database design, and object-oriented programming",
          ],
        },
      ],
    },
    contact: {
      label: "05 — Contact",
      title1: "Let's build",
      title2: "something",
      subtitle:
        "Open to new projects, freelance requests, and exciting full-time positions. Write to me — I respond within 24h.",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      namePlaceholder: "John Doe",
      emailPlaceholder: "john@mail.com",
      subjectPlaceholder: "Project inquiry · Job · Other",
      messagePlaceholder: "Hey Eray, I have an exciting project…",
      send: "Send message",
      sent: "Message sent ✓",
    },
    footer: "© 2024 Eray Kaan Cevik  ·  Built with Next.js, Framer Motion & Aceternity UI",
  },
};

export type Translations = typeof translations.de;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("de");

  useEffect(() => {
    setLanguage(detectLanguage());
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
