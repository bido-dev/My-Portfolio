import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "reqify",
    title: "Reqify",
    description:
      "A Notion-inspired traceability platform enabling engineering teams to dynamically manage and visualize complex software artifact lifecycles.",
    image: "/images/projects/Requify.png",
    tags: ["Laravel", "React", "Inertia.js", "PostgreSQL", "Cytoscape.js"],
    repoUrl: "https://github.com/bido-dev/Reqify",
    liveUrl: "https://requify.laravel.cloud/",
    featured: true,
    role: "Technical Product Manager & Full Stack Developer",
    period: "2024",
    overview:
      "Traditional traceability tools are often too rigid for agile teams. I led the product strategy and technical execution for a dynamic, web-based infrastructure that allows users to define custom software artifacts and relationships on the fly. Designed with a Notion-like user experience, the system centralizes requirements, test cases, and bugs into a single collaborative workspace.",
    features: [
      "Dynamic Architecture: Architected a highly flexible database schema utilizing PostgreSQL JSONB to allow users to create custom artifact types and properties at runtime without altering core code.",
      "End-to-End Product Management: Owned the entire product lifecycle from authoring the PRD, defining user personas, and mapping user stories, to mitigating technical risks and defining the UI/UX architecture.",
      "Interactive Data Visualization: Integrated Cytoscape.js to render complex artifact relationships and impact analyses visually, optimizing performance through localized graph rendering.",
    ],
    challenges:
      "Maintaining Graph Integrity: The most critical architectural challenge was preventing circular dependencies within the traceability links. I engineered a solution using Depth-First Search (DFS) algorithms to validate and block logic cycles before any link is committed to the database.\n\nPreventing Cascading Data Loss: Deleting software artifacts in a hierarchical tree often leads to accidental data loss. To mitigate this, I designed strict \"Orphan\" logic—if a parent artifact is removed, its child requirements safely lose their parent reference rather than being deleted, preserving the project's structural integrity.\n\nDynamic Data at Scale: Allowing users to define custom properties on the fly without altering the database schema required leveraging PostgreSQL's JSONB. I implemented GIN indexing to ensure that even complex, property-based search queries remained highly performant.\n\nVisual Performance: Rendering complex artifact relationships posed a risk of browser performance degradation. I optimized the graph visualization by limiting the initial render to a local neighborhood (depth 2) and implementing lazy-loading for further exploration.",
  },
  {
    slug: "classbond",
    title: "ClassBond",
    description:
      "A multi-tenant educational engagement platform blending real-time Firebase interactivity with a robust Laravel SQL architecture.",
    image: "/images/projects/ClassBond.png",
    tags: ["Laravel 12", "PostgreSQL", "React", "Firebase", "Groq/Gemini AI"],
    repoUrl: "https://github.com/Yazeed-AK/ClassBond",
    liveUrl: "https://class-bond.web.app/",
    featured: true,
    role: "Technical Product Manager & Full Stack Developer",
    period: "2024",
    overview:
      "I led the architectural refactoring of ClassBond, transitioning it from a Firebase-only prototype to a production-grade enterprise application. By implementing a hybrid architecture, I leveraged Laravel and PostgreSQL for persistent, multi-tenant data management while retaining Firebase Realtime Database strictly for lightweight, live lecture interactions. The resulting platform empowers educational institutions with real-time student engagement, gamified forums, and comprehensive organizational oversight.",
    features: [
      "Hybrid Real-Time Architecture: Designed a highly optimized data flow where the React frontend subscribes directly to Firebase RTB for live chat and slide reactions. This bypasses the Laravel backend entirely during live sessions, guaranteeing <100ms latency and reducing server load.",
      "Enterprise Multi-Tenancy: Architected a multi-tenant database schema to support distinct organizational workspaces. This includes robust Role-Based Access Control (RBAC) ensuring strict data isolation between Super Admins, Organization Admins, Instructors, and Students.",
      "Stateless Security & Auth: Engineered a complex, stateless authentication flow that seamlessly combines Laravel Sanctum API tokens with dynamically generated Firebase Custom Tokens, bolstered by a custom TOTP 2FA integration.",
      "AI Integrations (BYOK): Integrated Groq and Gemini AI for automated quiz generation and lecture summarization, implementing a \"Bring Your Own Key\" (BYOK) model for enterprise organizations.",
    ],
    challenges:
      "State Archival & Data Synchronization: Storing live lecture data in Firebase indefinitely is expensive and inefficient for historical reporting. I engineered automated Laravel queue jobs that trigger the moment a lecture or forum closes, efficiently batch-flushing all live RTB data (chats, reactions, upvotes) into PostgreSQL before destroying the temporary Firebase nodes.\n\nOptimizing Cloud File Transfers: Routing large PDF/PPTX uploads through the Laravel backend would create severe performance bottlenecks. I resolved this by utilizing signed URLs and the Firebase SDK, allowing clients to securely upload and download course materials directly via Google Cloud Storage while only syncing the file metadata to PostgreSQL.\n\nReal-Time Gamification: Balancing database integrity with immediate user feedback in the forums posed a unique challenge. I designed a workflow where gamification points are securely awarded via atomic PostgreSQL transactions, while instant visual feedback (like upvotes) is broadcast instantly through Firebase RTB.",
  },
  {
    slug: "frenchify",
    title: "Frenchify",
    description:
      "A scalable, freemium EdTech platform designed to streamline French language acquisition through interactive courses and global subscriptions.",
    image: "/images/projects/frenchify.jpg",
    tags: ["React", "Vite", "Firebase", "Express.js", "Stripe"],
    repoUrl: "https://github.com/bido-dev/Frenchify",
    liveUrl: "https://frechify.web.app/",
    role: "Technical Product Manager & Full Stack Developer",
    period: "2025",
    overview:
      "I led the product strategy and full-stack development of Frenchify, a dedicated Learning Management System (LMS) built for language educators and students. Operating on a strict freemium model, the platform empowers teachers to create and monetize structured courses, while offering students a Netflix-style global subscription that unlocks premium grammar modules, conversation audio, offline downloads, and direct Q&A access.",
    features: [
      "Optimized Content Architecture: To mitigate the high cloud storage costs associated with video hosting, I engineered a hybrid media delivery system. The platform handles direct Firebase Storage uploads for lightweight conversational audio, while utilizing a custom YouTube URL parser and embed system to serve heavy grammar video lessons cost-free.",
      "Enterprise Freemium Logic: Architected a secure, tier-based access system. By leveraging Firebase Custom Auth Claims (request.auth.token.tier), the application instantly gates premium features across the frontend without requiring expensive, redundant database lookups.",
      "End-to-End Role Management: Designed the platform to support three distinct user personas (Students, Teachers, Admins) with strict Role-Based Access Control (RBAC). I built a dedicated admin dashboard to handle user management, subscription overrides, and a gatekeeping workflow for pending teacher approvals.",
    ],
    challenges:
      "Strict Database-Level Security: Relying on UI-level locks for premium content is a major vulnerability. I engineered robust Firestore Security Rules that validate custom JWT claims at the database level. This ensures that even if a free-tier user attempts to bypass the UI or manipulate the client, the database actively rejects unauthorized reads for paid materials.\n\nManaging Complex User States: Balancing the workflows of multiple user types (e.g., ensuring a \"Pending\" teacher can draft a course but cannot publish it to the student catalog) required rigorous state management. I utilized Express.js Cloud Functions to securely manage these state transitions and enforce business logic outside of the client.",
  },
  {
    slug: "say",
    title: "SAY (Start All Yourself)",
    description:
      "A comprehensive developer enablement platform featuring an advanced, dynamic AI prompt engine to accelerate software architecture and coding.",
    image: "/images/projects/SAY.png",
    tags: ["React 19", "TypeScript", "Tailwind CSS v4", "Node.js", "Firebase", "Gemini AI"],
    repoUrl: "https://github.com/Yazeed-AK/SAY",
    liveUrl: "https://say-toolkit.web.app/",
    role: "Technical Product Manager & Full Stack Developer",
    period: "2025",
    overview:
      "SAY was built to demystify the modern development stack and bridge the gap between ideation and deployment. More than just a curated guide for modern frameworks, I engineered a highly complex, dynamic Prompt Engine capable of generating thousands of context-aware AI instructions. The platform allows developers and product managers to instantly generate granular coding solutions, comprehensive PRDs, and architectural roadmaps tailored to specific industries and tech stacks.",
    features: [
      "Algorithmic Prompt Engine: Architected a robust TypeScript generation engine that dynamically combines project domains (e.g., Fintech, Healthcare), tech stacks, and \"Vibe Personas\" (e.g., DevSecOps Expert, Senior Mentor) to programmatically generate highly specific AI prompts.",
      "Strict Constraint Mapping: To ensure the AI generates technically sound outputs, I implemented a custom mapping layer (TECH_TO_LANGUAGE_MAP) that enforces logical constraints—preventing the engine from requesting nonsensical combinations like building a React component in Java.",
      "Automated Agile & Product Workflows: Expanded the engine beyond just writing code to generate high-level product artifacts. The system automatically drafts full Product Requirements Documents (PRDs), MVP Roadmaps, and Agile User Stories based on the selected project scale.",
      "Modern & Localized UX: Built with cutting-edge frontend tools (React 19, Tailwind v4, Framer Motion) and integrated i18next to support seamless internationalization across the platform.",
    ],
    challenges:
      "Managing Combinatorial Complexity: Generating thousands of prompts dynamically required careful architectural planning. I had to design a highly flexible templating system using string interpolation while maintaining strict relationship rules to prevent the engine from generating invalid outputs as the matrix of domains and technologies scaled.\n\nAI Integration & API Architecture: Connecting the dynamic prompt engine to Google's Generative AI model required designing a secure, reliable backend layer using Node.js and Express to handle completions, ensuring the data passed from the frontend resulted in actionable, high-quality architectural advice.",
  },
  {
    slug: "portfolio-website",
    title: "Personal Portfolio & Digital Identity",
    description:
      "A high-performance digital identity built with Next.js 16 and Tailwind CSS v4, balancing immersive 3D interactions with strict technical efficiency.",
    image: "/images/projects/portfolio.jpg",
    tags: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "tsParticles"],
    repoUrl: "https://github.com/bido-dev/My-Portfolio",
    liveUrl: "https://abdalla-ammar-portfolio.vercel.app/",
    featured: true,
    role: "Product Designer & Full Stack Engineer",
    period: "2026",
    overview:
      "The platform you are currently exploring. Architected with Next.js 16 and Tailwind CSS v4, this portfolio was designed to serve as a high-performance digital identity. I prioritized a balance between highly engaging visual polish and strict technical efficiency, ensuring smooth animations and interactive 3D elements do not compromise load times or responsive behavior.",
    features: [
      "Immersive UI Architecture: Engineered a dynamic particle background and an interactive 3D skills globe to drive visual engagement.",
      "Optimized Micro-Interactions: Integrated vanilla-tilt cards and typewriter effects to provide immediate, satisfying visual feedback without heavy browser repaints.",
      "Seamless Navigation: Built with a strict mobile-first approach, utilizing smooth scroll-reveal animations and optimized anchor routing across all breakpoints.",
    ],
    challenges:
      "The most complex challenge was engineering the interactive skills globe to feel natural on both desktop and mobile without relying on heavy WebGL libraries like Three.js. I optimized the platform's footprint by implementing a custom Fibonacci sphere distribution algorithm and applying a per-frame rotation matrix using pure CSS transforms, resulting in a highly performant, lightweight 3D interaction.",
  },
];
