/**
 * Local content — replaces the Hygraph GraphQL CMS.
 *
 * The shape mirrors the original GraphQL response exactly so that every
 * component and page works unchanged:
 *   - project.image        → array (the detail page reads image[0] and
 *                            image[len-3], [len-2], [len-1], so 5+ entries)
 *   - project.description  → array of 4 strings
 *                            [0] Challenge, [1] Perspective, [2] & [3] body
 *   - project.video        → array (empty = no Mux video, renders images)
 *   - project.coverImage   → single object (used on listing pages)
 *
 * Replace the placeholder SVGs in /public/projects with real screenshots when
 * you have them — just keep the same array length.
 */

/** Build the 5-image array the detail page expects from one source file. */
const imgSet = (slug: string) =>
  [1, 2, 3, 4, 5].map((n) => ({
    id: `${slug}-${n}`,
    handle: `/projects/${slug}.svg`,
    fileName: `${slug}-${n}.svg`,
  }))

export const folioContent = {
  about: {
    name: 'Diksha Kumari',
    bioTitle: 'Full-stack developer who ships AI products.',
    bio: 'I am a 2026 Computer Science (AI/ML) graduate who learns by building and shipping. Over the past year I have worked across three roles and shipped products that real people use — a live SaaS platform for content creators, a legal-tech product, and my own AI-powered visual editor. My stack is React, Next.js, TypeScript, Node and Python, and I spend most of my energy where the frontend meets AI: taking non-deterministic model output and engineering it into something reliable enough to put in front of users.',
    aboutHeroTitle: 'I build things that ship.',
    aboutHeroDesc:
      'Full-stack developer working across React, Next.js, Node, Python and LLM-powered systems. I care about products that reach real users, not demos.',
    aboutTitle: 'About',
    aboutDesc:
      'I like the part of engineering where an unreliable input has to become a dependable product. Most of my recent work sits there — parsing messy AI output into editable structures, wrapping LLM calls in validation so they fail safely, and porting a macOS app to Windows by chasing four platform-specific defects to root cause.',
    jobTitle: 'Currently',
    job: 'Open to full-stack and AI engineering roles',
    /* Rendered by ViewTimelineAbout — each item needs heading, company, period, description */
    timelineItem: [
      {
        id: 'nb-media',
        heading: 'Full Stack Developer Intern',
        company: 'NB Media',
        period: 'Jan 2026 – Jun 2026',
        description:
          'Built a Chrome extension for Instagram, LinkedIn and Meta that scrapes engagement data to surface viral Reels, storing results in Supabase so creators could bulk-save content into GetDusky, an AI workspace. Also built n8n and Apify workflows to scrape YouTube metadata into the AI pipeline.',
      },
      {
        id: 'lawethic',
        heading: 'Software Engineer',
        company: 'LawEthic',
        period: 'Oct 2025 – Dec 2025',
        description:
          'Shipped a legal-tech SaaS platform end to end with Next.js and a full REST API layer. Built a reusable component library and implemented authentication and database management in production.',
      },
      {
        id: 'outlier',
        heading: 'Model Trainer',
        company: 'Outlier AI',
        period: 'Jun 2025 – Oct 2025',
        description:
          'Designed and refined prompts for large language models to improve output quality and consistency, and tested model responses against accuracy benchmarks.',
      },
      {
        id: 'cu',
        heading: 'BE Computer Science (AI/ML)',
        company: 'Chandigarh University',
        period: '2022 – 2026',
        description:
          'Bachelor of Engineering in Computer Science with a specialisation in AI and Machine Learning.',
      },
    ],
    codeTitle: 'How I work',
    codeOneTitle: 'Treat the model as an unreliable input',
    codeOneDesc:
      'LLM output is not deterministic. Every AI step I ship has validation and a fallback, because the interesting failure is the one that breaks quietly.',
    codeTwoTitle: 'Ship, then sharpen',
    codeTwoDesc:
      'I would rather have something in front of a real user this week than a perfect plan next month. Feedback beats guessing.',
    codeThreeTitle: 'Own the whole thing',
    codeThreeDesc:
      'Frontend, backend, database, deploy. I like holding a feature from idea to production and living with my own decisions.',
    picture: { id: 'profile' },
  },

  intro: {
    heroIntroTitle: 'Diksha Kumari',
    heroIntroDesc:
      'Full-stack developer. React, Next.js, Node, Python — and AI that actually works in production.',
    aboutIntroTitle: 'About',
    aboutIntroDesc:
      'A 2026 CS (AI/ML) graduate who builds and ships. Three roles, four shipped products, one live AI editor.',
    projIntroTitle: 'Selected work',
    projIntroDesc:
      'Four projects that are real products, not tutorials. Every one has source code you can read.',
    knowIntroTitle: 'What I bring',
    knowIntroDesc: 'Full-stack engineering with a genuine specialism in applied AI.',
    knowOneTitle: 'Frontend',
    knowOneDesc:
      'React, Next.js, TypeScript, Tailwind CSS, Zustand. Responsive, mobile-first interfaces with careful loading, error and empty states.',
    knowTwoTitle: 'Backend',
    knowTwoDesc:
      'Node.js, Express, Python, REST APIs, WebSockets. PostgreSQL, MongoDB, Supabase, Appwrite. Authentication, integrations and data modelling.',
    knowThreeTitle: 'Applied AI',
    knowThreeDesc:
      'LLM APIs (Gemini, OpenAI, Anthropic, Groq), prompt engineering, embeddings, semantic search, agentic workflows with n8n, and guardrails around non-deterministic output.',
    metaIntroTitle: 'Toolkit',
    metaIntroDesc: 'What I reach for.',
    metaTechTitle: 'Core stack',
    metaTechDesc: 'TypeScript, React, Next.js, Node.js, Python, PostgreSQL, MongoDB',
    metaCreativeTitle: 'AI',
    metaCreativeDesc:
      'Gemini / Vertex AI, OpenAI, Anthropic, Groq, n8n, embeddings, RAG concepts',
    metaIdeTitle: 'Tools',
    metaIdeDesc: 'Cursor, GitHub Copilot, Git, Docker, Postman, Figma',
    metaPublishTitle: 'Deploy',
    metaPublishDesc: 'Vercel, Cloudflare Workers, AWS, CI/CD with GitHub Actions',
    metaRepoTitle: 'GitHub',
    metaRepoUrl: 'https://github.com/DIKSHAKUMA',
    blogTitle: 'Writing',
    blogDesc: 'Notes on building with AI.',
    blogExcerptsTitle: 'Publication',
    blogExcerptsDesc:
      'Published research on a Bing-GPT voice assistant, covering NLP, generative AI concepts and LLM architectures.',
    /**
     * ViewBlogExcerpts splits this on an em dash: [0] is the quote, [1] is the
     * attribution. Keep the ' — ' separator or the attribution renders empty.
     */
    blogExcerptsQuote:
      'The hard part of AI engineering is not the model. It is everything you build around it so the model can be trusted. — Diksha Kumari',
  },

  projects: [
    {
      id: 'scytle',
      slug: 'scytle',
      name: 'Scytle',
      client: 'Own product',
      endclient: 'Live with real users',
      date: 'Jan 2026',
      duration: 'Ongoing',
      type: 'AI product · Full-stack',
      demo: 'https://scytle.com',
      sourceCode: 'https://github.com/DIKSHAKUMA/scytle',
      labUrl: '',
      video: [],
      selectedproj: true,
      projlab: false,
      clientHistory: [],
      tags: [
        'Next.js 16',
        'React 19',
        'TypeScript',
        'Zustand',
        'Tailwind CSS 4',
        'Appwrite',
        'Google Vertex AI',
        'Gemini 2.5',
        'Cloudflare Durable Objects',
        'WebSockets',
      ],
      synop: [
        'An AI product studio that turns an AI draft into a shippable page inside one editable workspace.',
      ],
      description: [
        'AI can generate a page in seconds, but it hands you a wall of code. If you are not comfortable editing HTML, that output is a dead end — you cannot nudge the spacing, swap a button, or fix what the model got slightly wrong. Scytle closes that gap: the AI drafts, and you refine it visually.',
        'I built the parsing pipeline that turns Gemini-generated HTML and Tailwind into a tree of typed canvas nodes, so the output becomes draggable, restyleable blocks rather than raw markup. I also own the backend and the real-time collaboration layer.',
        'The hard part was that the model is not dependable. Gemini would return markup that was not always clean or well formed, and early on that broke the canvas outright. I rebuilt the pipeline to treat the AI as an unreliable input — validating and normalising every generation before it reaches the renderer, so malformed output is handled instead of crashing the editor.',
        'Real-time sync runs on a single Cloudflare Durable Object per project. Because every change flows through one coordinator, operations are naturally serialised, which avoids most edit conflicts without CRDTs or operational transforms: last-write-wins at the field level, then broadcast to every other connected client. Scytle is a two-person build with Dilip Kumar — we split work across the stack and pair-programmed, so some commits sit under his account. My focus was the AI pipeline, the canvas and sync.',
      ],
      testimonialName: '',
      testimonialAgency: '',
      testimonialText: '',
      image: imgSet('scytle'),
      coverImage: {
        id: 'scytle-cover',
        handle: '/projects/scytle.svg',
        fileName: 'scytle-cover.svg',
      },
    },
    {
      id: 'thanku',
      slug: 'thanku',
      name: 'ThankU',
      client: 'Own product',
      endclient: 'Cross-platform desktop app',
      date: 'Jun 2026',
      duration: 'Ongoing',
      type: 'AI desktop app · Windows port',
      demo: '',
      sourceCode: 'https://github.com/DIKSHAKUMA/thanku',
      labUrl: '',
      video: [],
      selectedproj: true,
      projlab: false,
      clientHistory: [],
      tags: [
        'Electron 32',
        'TypeScript 5.6',
        'React 18',
        'Deepgram Nova-3',
        'Google Gemini',
        'AWS Bedrock',
        'SQLite',
        'Zod',
        'Tailwind CSS',
      ],
      synop: [
        'A real-time AI meeting assistant that captures mic and system audio, transcribes both, and answers in an overlay invisible to screen sharing.',
      ],
      description: [
        'ThankU listens to a call on two audio streams at once — microphone and system output — transcribes them through Deepgram with speakers separated by role, and generates answers through Gemini in a floating panel that is excluded from screen capture at the OS level. The problem was that it only existed on macOS, and Windows has no equivalent of the system-audio tool it relied on.',
        'The original macOS application was built by Dilip Kumar. I built the Windows port: system-audio capture through an Electron getDisplayMedia loopback in a hidden renderer, converted to the same canonical PCM format the macOS path produced so the transcription layer stayed platform-agnostic.',
        'Four platform defects surfaced, and three of them failed silently. System audio captured nothing while the mic worked fine — the loopback stream reported zero bytes. It was not failing, it was late: the main process allowed two seconds to confirm, but the cold path has to enumerate screen sources, run getDisplayMedia, build a 16 kHz AudioContext and load an AudioWorklet first. I raised the budget and dropped thumbnail rendering, which was the dominant cost.',
        'Undetectable mode still showed the app in the taskbar, because the companion hide behaviour sat in a macOS-only branch. PDF upload crashed because a worker path resolved to a bare Windows absolute path and Node ESM rejects a drive letter as a protocol — fixed with pathToFileURL. And native modules were never built at all: the install reported success but silently skipped every build script, because the package manager had stopped reading the legacy config field.',
      ],
      testimonialName: '',
      testimonialAgency: '',
      testimonialText: '',
      image: imgSet('thanku'),
      coverImage: {
        id: 'thanku-cover',
        handle: '/projects/thanku.svg',
        fileName: 'thanku-cover.svg',
      },
    },
    {
      id: 'sniket',
      slug: 'sniket',
      name: 'Sniket',
      client: 'Own product',
      endclient: 'Device repair marketplace',
      date: 'May 2024',
      duration: '—',
      type: 'Full-stack platform',
      demo: '',
      sourceCode: 'https://github.com/DIKSHAKUMA/Sniket',
      labUrl: '',
      video: [],
      selectedproj: true,
      projlab: false,
      clientHistory: [],
      tags: [
        'Next.js 14',
        'TypeScript',
        'Appwrite',
        'Tailwind CSS',
        'shadcn/ui',
        'PWA',
        'PhoneDB API',
      ],
      synop: [
        'A booking platform for phone and laptop repairs, with a market-price-driven tier pricing engine.',
      ],
      description: [
        'Repair pricing does not scale model by model. A provider would have to price hundreds of devices by hand, and a customer still could not tell whether the quote reflected how hard their specific device actually is to repair.',
        'I built the full booking lifecycle — device selection, time slots, provider matching, messaging — plus separate customer, provider and admin areas, on Next.js 14 with Appwrite for auth, database and storage.',
        'The interesting part was pricing. The platform classifies devices into three complexity tiers (basic, standard, premium) automatically, derived from market price data pulled from the PhoneDB API. A provider then sets three prices per issue type instead of hundreds, and a customer still sees a price that reflects their device.',
        'Both models coexist: a provider can stay on traditional series-based pricing or move to tiers. Role separation across customer, provider and admin is enforced with JWT-based access control, and the app is PWA-ready with a mobile-first layout.',
      ],
      testimonialName: '',
      testimonialAgency: '',
      testimonialText: '',
      image: imgSet('sniket'),
      coverImage: {
        id: 'sniket-cover',
        handle: '/projects/sniket.svg',
        fileName: 'sniket-cover.svg',
      },
    },
    {
      id: 'brainstorm-ai',
      slug: 'brainstorm-ai',
      name: 'BrainStorm AI',
      client: 'Own product',
      endclient: 'AI brainstorming board',
      date: 'Mar 2026',
      duration: '—',
      type: 'AI product · Full-stack',
      demo: '',
      sourceCode: 'https://github.com/DIKSHAKUMA/brainstorm-ai',
      labUrl: '',
      video: [],
      selectedproj: true,
      projlab: false,
      clientHistory: [],
      tags: [
        'React 18',
        'TypeScript',
        'Vite',
        'Node.js',
        'Express',
        'MongoDB Atlas',
        'Groq (Llama 3.1)',
        'Tailwind CSS',
        'dnd-kit',
      ],
      synop: [
        'A drag-and-drop idea board where AI clusters related thoughts, summarises the board, and makes it searchable by meaning.',
      ],
      description: [
        'A brainstorming board fills up fast and then stops being useful — you cannot see the themes, and keyword search misses ideas that are related but worded differently.',
        'BrainStorm AI adds an AI layer that does the organising: it suggests related ideas, groups similar cards, reads the mood of each card, summarises the board into themes and next steps, and lets you search by meaning rather than keywords.',
        'The semantic layer is built from scratch rather than pulled off a shelf. Each card gets a 384-dimension hash-based embedding with TF-IDF weighting, word stemming so deforestation matches forest, and n-gram support for context. Clustering is hierarchical agglomerative with a similarity threshold exposed to the user as a slider, and search compares cards by cosine similarity.',
        'Board summarisation is deliberately hybrid: keyword and mood analysis run programmatically, and only the insight and next-steps layer goes to the model — cheaper, faster and more predictable than asking an LLM to do all of it. Groq runs the language model because inference speed matters when a suggestion should feel instant.',
      ],
      testimonialName: '',
      testimonialAgency: '',
      testimonialText: '',
      image: imgSet('brainstorm'),
      coverImage: {
        id: 'brainstorm-cover',
        handle: '/projects/brainstorm.svg',
        fileName: 'brainstorm-cover.svg',
      },
    },
  ],

  contact: {
    id: 'contact',
    viewHeroTitle: 'Let us build something.',
    viewHeroCta: 'Open to full-stack and AI engineering roles.',
    emailTitle: 'Email',
    email: 'sdiksha.work@gmail.com',
    address: 'India · open to relocation and remote',
    addressTitle: 'Based in',
  },

  /**
   * ViewAwardsHome reads `awards[0]` — one object holding a marquee of logos.
   * `awardSvg` is the list of images; `awardLinks.logos[i].url` is the link for
   * the logo at the same index (a logo only renders if it has a matching link).
   */
  awards: [
    {
      awardTitle: 'Recognition & credentials',
      awardDesc:
        'Published research on a Bing-GPT voice assistant covering NLP, generative AI and LLM architectures, plus certifications from Coursera and HackerRank.',
      awardLinks: {
        logos: [
          { url: 'https://github.com/DIKSHAKUMA' },
          { url: 'https://www.coursera.org/' },
          { url: 'https://www.hackerrank.com/' },
        ],
      },
      awardSvg: [
        {
          id: 'pub',
          handle: '/badges/publication.svg',
          fileName: 'Published research — Bing-GPT Voice Assistant',
          url: '/badges/publication.svg',
        },
        {
          id: 'coursera',
          handle: '/badges/coursera.svg',
          fileName: 'Intro to Data Science — Coursera',
          url: '/badges/coursera.svg',
        },
        {
          id: 'hackerrank',
          handle: '/badges/hackerrank.svg',
          fileName: 'Software Engineer Virtual Internship — HackerRank',
          url: '/badges/hackerrank.svg',
        },
      ],
    },
  ],
}

export default folioContent
