export const profile = {
  name: "Joram Antwi",
  title: "Dynamics 365 & Power Platform Specialist",
  headline: "Microsoft Dynamics 365 CE · Power Platform · CRM Solutions",
  // Profile / avatar image. Independent of the browser favicon (set in app/layout.tsx),
  // so changing this later won't affect the tab icon.
  avatar: "/ja-logo.png",
  location: "London, UK",
  linkedin: "https://www.linkedin.com/in/joram-antwi/",
  linkedinLabel: "linkedin.com/in/joram-antwi",
  github: "https://github.com/joramantwi",
  githubLabel: "github.com/joramantwi",
  learnProfile: "https://learn.microsoft.com/en-us/users/joramantwi-5080/",
  learnCredentials: "https://learn.microsoft.com/en-us/users/joramantwi-5080/credentials/",
  learnProfileLabel: "learn.microsoft.com/users/joramantwi-5080",
  summary: [
    "I help organisations design and improve Dynamics 365 and Power Platform solutions to solve real operational problems. With a strong software engineering background, I focus on joining up people, data, and processes to deliver measurable business outcomes.",
    "I've led CRM migrations, redesigned systems end-to-end, and delivered automation with tools like Power Automate, custom plug-ins, and third-party integrations such as Zapier. My current direction is AI-enabled solution architecture, applying prompt engineering and practical AI use cases to strengthen CRM and business process delivery.",
  ],
};

export type Kpi = {
  label: string;
  value: string;
  caption: string;
  accent: string;
};

export const kpis: Kpi[] = [
  { label: "Years in tech", value: "9+", caption: "Since 2017", accent: "#0f6cbd" },
  { label: "Roles delivered", value: "5", caption: "Dev · CRM · Cloud", accent: "#107c41" },
  { label: "Certifications", value: "1", caption: "D365 Fundamentals", accent: "#8764b8" },
  { label: "Core platforms", value: "6", caption: "D365 · Power Platform", accent: "#c33d2e" },
];

export type Experience = {
  role: string;
  company: string;
  website?: string;
  location: string;
  period: string;
  current?: boolean;
  paragraphs: string[];
};

export const experiences: Experience[] = [
  {
    role: "D365 Functional Consultant",
    company: "Sciensus",
    website: "https://www.sciensus.com/",
    location: "London",
    period: "Sep 2026 – Present",
    current: true,
    paragraphs: [
      "Joining Sciensus in September 2026 as a Dynamics 365 Functional Consultant, with a focus on Dynamics 365 Customer Service and Contact Center. The role will extend my CRM delivery experience into customer engagement across live chat, voice, SMS and in-session collaboration.",
    ],
  },
  {
    role: "D365 CRM Manager",
    company: "Simplexity Travel Management",
    website: "https://www.simplexitytravel.com/",
    location: "London",
    period: "2023 – 2026",
    paragraphs: [
      "Simplexity Travel is a UK-based travel management company delivering bespoke corporate and leisure travel services, with a strong emphasis on personal service and attention to detail. As CRM Manager, I took full ownership of the company’s Dynamics 365 model-driven application and led a ground-up redesign to build a more scalable, well-structured platform across Sales, Commercial and Operations.",
      "I streamlined core business processes through Power Automate, improved the reliability of CRM data through structured cleansing and validation programmes, and introduced Power BI dashboards that gave stakeholders clearer visibility of pipeline performance, case volumes and customer segments. I also developed a secure Power Pages portal for independent contractors, integrated the company website directly with Dynamics 365 to improve lead data capture, and strengthened governance around access controls, data retention and business continuity.",
      "Beyond the technical delivery, a significant part of my impact came from improving adoption across the business — through practical training, tailored documentation and ongoing support that helped each team build confidence and get more value from the platform.",
    ],
  },
  {
    role: "IT Analyst – D365 CRM",
    company: "Refugees at Home",
    website: "https://refugeesathome.org/",
    location: "London",
    period: "Jun 2020 – Apr 2023",
    paragraphs: [
      "Refugees at Home is a UK charity that connects refugees and people seeking asylum with volunteer hosts who have a spare room. I joined the organisation during a major period of digital transformation and helped replace fragmented Google Sheets and Zoho CRM processes with a purpose-built Dynamics 365 solution. My work spanned the full delivery lifecycle — requirements gathering, Dataverse design, forms, views, business process configuration, data migration and user onboarding — alongside introducing a structured, ITIL-aligned approach to managing ongoing system changes.",
      "I automated manual case and volunteer-management workflows using Power Automate, and built live Power BI dashboards that gave leadership and external stakeholders greater visibility of placements, operational performance and charitable impact. I also connected CRM data to the public website through REST APIs, and led the organisation’s full migration from G Suite to Microsoft 365, including Exchange Online mailbox migration, DNS cutover and user training, completed without service disruption.",
      "Working as the sole IT professional across a growing organisation sharpened my ability to prioritise independently, communicate with varied stakeholders and deliver practical solutions within a resource-constrained environment.",
    ],
  },
  {
    role: "AR Developer",
    company: "1UP Studios",
    website: "https://www.1upstudios.tech/",
    location: "London",
    period: "Aug 2019",
    paragraphs: [],
  },
  {
    role: "Digital Development",
    company: "npower",
    website: "https://npowerbusinesssolutions.com/",
    location: "Birmingham / Solihull",
    period: "Aug 2017 – Aug 2018",
    paragraphs: [],
  },
];

export type SkillGroup = {
  category: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Dynamics 365 & Dataverse",
    skills: [
      "Dynamics 365 Sales",
      "Dynamics 365 Customer Service",
      "Dataverse data modelling",
      "Forms, views & business rules",
      "Business Process Flows",
      "Command bar customisation",
    ],
  },
  {
    category: "Power Platform",
    skills: [
      "Power Apps (model-driven & canvas)",
      "Power Automate cloud flows",
      "Power Pages",
      "Power BI",
      "Copilot Studio",
    ],
  },
  {
    category: "Pro-code extensibility",
    skills: [
      "C# Dataverse plug-ins",
      "Plugin Registration Tool",
      "JavaScript form scripting",
      "Web API & REST integrations",
    ],
  },
  {
    category: "ALM, security and governance",
    skills: [
      "Managed / unmanaged solutions",
      "Power Platform Pipelines",
      "Dataverse security model",
      "Data retention & compliance controls",
    ],
  },
  {
    category: "Integration and data",
    skills: [
      "Data migration & mapping",
      "Duplicate detection and data quality",
      "Excel / CSV imports",
      "API integration design",
    ],
  },
  {
    category: "Business analysis and delivery",
    skills: [
      "Requirements discovery & fit-gap analysis",
      "Process mapping",
      "User stories & backlog shaping",
      "UAT facilitation",
      "End-user training & documentation",
      "CRM process optimisation",
    ],
  },
  {
    category: "Software engineering",
    skills: [
      "JavaScript / TypeScript",
      "C# / .NET",
      "Node.js",
    ],
  },
  {
    category: "AI and emerging technology",
    skills: [
      "Microsoft Copilot",
      "Prompt engineering",
      "AI use case design for CRM",
    ],
  },
];

export type Project = {
  name: string;
  org: string;
  industry: string;
  type: string;
  module: string;
  role: string;
  year: string;
  stage: string;
  tags: string[];
  summary: string;
  highlights: string[];
};

export const projects: Project[] = [
  {
    name: "D365 CE End-to-End Redesign",
    org: "Simplexity Travel Management",
    industry: "Travel",
    type: "Implementation",
    module: "Model-Driven App",
    role: "D365 CRM Manager",
    year: "2023",
    stage: "Delivered",
    tags: ["D365 Sales", "Customer Service", "Ribbon Workbench", "BPF"],
    summary:
      "Rebuilt the sitemap, entity model, forms, views, field mappings and Business Process Flows into a scalable solution used across Sales, Commercial and Operations, with command bar customisations built in Ribbon Workbench.",
    highlights: [
      "Rebuilt the sitemap, entity model, forms, views and field mappings into a scalable, well-structured solution.",
      "Designed Business Process Flows spanning Sales, Commercial and Operations.",
      "Added command bar customisations in Ribbon Workbench to streamline everyday workflows.",
    ],
  },
  {
    name: "Power Automate Automation Suite",
    org: "Simplexity Travel Management",
    industry: "Travel",
    type: "Automation",
    module: "Power Automate",
    role: "D365 CRM Manager",
    year: "2023",
    stage: "Delivered",
    tags: ["Power Automate", "Lead processing", "Case routing"],
    summary:
      "A suite of cloud flows automating lead processing, case routing and internal notifications — significantly reducing manual administrative overhead on the CRM team.",
    highlights: [
      "Automated lead processing, case routing and internal notifications with cloud flows.",
      "Removed repetitive manual tasks, cutting administrative overhead on the CRM team.",
      "Standardised notifications to keep Sales and Operations aligned in real time.",
    ],
  },
  {
    name: "Power Pages External Portal",
    org: "Simplexity Travel Management",
    industry: "Travel",
    type: "Portal",
    module: "Power Pages",
    role: "D365 CRM Manager",
    year: "2024",
    stage: "Delivered",
    tags: ["Power Pages", "Azure AD", "App Registrations", "API"],
    summary:
      "Architected and deployed a Power Pages portal with role-based access and Azure AD App Registrations, enabling secure external access to CRM data via configured API connections.",
    highlights: [
      "Architected a Power Pages portal with role-based access to CRM data.",
      "Secured external access using Azure AD App Registrations and configured API connections.",
      "Enabled partners to self-serve without direct access to the core CRM.",
    ],
  },
  {
    name: "CRM Migration: Zoho & Sheets → D365",
    org: "Refugees at Home",
    industry: "Non-profit",
    type: "Migration",
    module: "D365: CE",
    role: "IT Analyst",
    year: "2021",
    stage: "Delivered",
    tags: ["Migration", "D365 CE", "ITIL", "Data mapping"],
    summary:
      "Led a full CRM migration from Google Sheets & Zoho CRM to Microsoft D365 CE under an ITIL-aligned change process — from requirements and data migration through to full team adoption.",
    highlights: [
      "Migrated from Google Sheets and Zoho CRM to Microsoft D365 CE under an ITIL-aligned change process.",
      "Owned requirements, data mapping and cleansing through to full team adoption.",
      "Onboarded staff and volunteers with tailored training and documentation.",
    ],
  },
  {
    name: "Dataverse Impact Dashboards",
    org: "Refugees at Home",
    industry: "Non-profit",
    type: "Analytics",
    module: "Power BI",
    role: "IT Analyst",
    year: "2021",
    stage: "Delivered",
    tags: ["Power BI", "Dataverse", "KPIs"],
    summary:
      "Real-time Power BI dashboards connected to Dataverse, surfacing charity impact KPIs and operational metrics for leadership and external stakeholders.",
    highlights: [
      "Built real-time Power BI dashboards connected directly to Dataverse.",
      "Surfaced charity impact KPIs and operational metrics for leadership.",
      "Gave external stakeholders clear, self-serve visibility of outcomes.",
    ],
  },
  {
    name: "CRM ↔ Website REST Integration",
    org: "Refugees at Home",
    industry: "Non-profit",
    type: "Integration",
    module: "Web API",
    role: "IT Analyst",
    year: "2022",
    stage: "Delivered",
    tags: ["REST API", "JSON", "Web"],
    summary:
      "Connected CRM data to the public website via REST API, surfacing live volunteer placement and case statistics to improve transparency and trust with donors.",
    highlights: [
      "Connected CRM data to the public website through a REST API.",
      "Surfaced live volunteer placement and case statistics to the public.",
      "Improved transparency and trust with donors and supporters.",
    ],
  },
];

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  exam?: string;
  badge?: string;
  credentialUrl?: string;
};

// Certification journey order (exam codes) — earned certs slot into the Overview carousel in this sequence.
export const certRoadmap: string[] = [
  "MB-910", // D365 Fundamentals (CRM) — earned
  "MB-230", // Dynamics 365 Customer Service Functional Consultant
  "PL-400", // Power Platform Developer
  "AB-620", // AI Agent Builder
  "AB-100", // Agentic AI Business Solutions Architect
];

export const certifications: Certification[] = [
  {
    name: "Microsoft Certified: Dynamics 365 Fundamentals (CRM)",
    issuer: "Microsoft",
    date: "Dec 2023",
    exam: "MB-910",
    badge: "/badges/d365-fundamentals.svg",
    credentialUrl:
      "https://learn.microsoft.com/api/credentials/share/en-us/JoramAntwi-5080/105DEDD0B17725D2?sharingId=2D2315E42F8E805",
  },
];

export type CertificationGoal = {
  name: string;
  issuer: string;
  exam?: string;
  level?: string;
  focus: string;
  url: string;
};

export const certificationGoals: CertificationGoal[] = [
  {
    name: "Microsoft Certified: Agentic AI Business Solutions Architect",
    issuer: "Microsoft",
    exam: "AB-100",
    level: "Advanced",
    focus:
      "Designing agentic, AI-powered business solutions across Dynamics 365, Copilot Studio and the Power Platform.",
    url: "https://learn.microsoft.com/en-us/credentials/certifications/agentic-ai-business-solutions-architect/",
  },
];

export type RoadmapStep = {
  exam: string;
  name: string;
  level: "Fundamentals" | "Associate" | "Expert" | "Advanced";
  focus: string;
  url: string;
  optional?: boolean;
};

// Role-aligned progression from Customer Service delivery to AI-enabled solution architecture.
export const certificationRoadmap: RoadmapStep[] = [
  {
    exam: "MB-230",
    name: "Dynamics 365 Customer Service Functional Consultant",
    level: "Associate",
    focus: "Role-aligned credential for configuring cases, knowledge, SLAs, omnichannel engagement, unified routing and service operations.",
    url: "https://learn.microsoft.com/en-us/credentials/certifications/d365-functional-consultant-customer-service-v3/",
  },
  {
    exam: "PL-400",
    name: "Power Platform Developer",
    level: "Associate",
    focus: "Technical differentiator for extending Dataverse and Power Platform solutions through custom development, integrations, testing and governed ALM.",
    url: "https://learn.microsoft.com/en-us/credentials/certifications/power-platform-developer-associate/",
  },
  {
    exam: "AB-620",
    name: "AI Agent Builder",
    level: "Associate",
    focus: "Build and integrate enterprise-ready AI agents with Copilot Studio, Power Platform and connected business data.",
    url: "https://learn.microsoft.com/en-us/credentials/certifications/ai-agent-builder-associate/",
  },
  {
    exam: "AB-100",
    name: "Agentic AI Business Solutions Architect",
    level: "Advanced",
    focus: "Architect AI-enabled business solutions across Dynamics 365, Copilot Studio, Power Platform and Azure—with a focus on security, governance and measurable outcomes.",
    url: "https://learn.microsoft.com/en-us/credentials/certifications/agentic-ai-business-solutions-architect/",
  },
];

export type Education = {
  qualification: string;
  institution: string;
  date: string;
};

export const education: Education[] = [
  {
    qualification: "BSc (Hons) Computer Science with Year in Industry",
    institution: "University of Kent, Canterbury",
    date: "2015 – 2019",
  },
];

export type Hobby = {
  name: string;
  description: string;
  accent: string;
  icon: "hiking" | "anime" | "boxing" | "bass" | "travel" | "investing" | "gaming";
};

export const hobbies: Hobby[] = [
  {
    name: "Hiking",
    description: "Long trails, open views and a proper reset away from screens.",
    accent: "#107c41",
    icon: "hiking",
  },
  {
    name: "Anime & Manhwa",
    description: "Big worlds, smart character arcs and stories that reward curiosity.",
    accent: "#8764b8",
    icon: "anime",
  },
  {
    name: "Boxing",
    description: "Discipline, sharp fundamentals and the satisfaction of steady progress.",
    accent: "#c33d2e",
    icon: "boxing",
  },
  {
    name: "Playing Bass Guitar",
    description: "Finding the groove and learning how the right foundation holds everything together.",
    accent: "#c19c00",
    icon: "bass",
  },
  {
    name: "Travel",
    description: "New places, local food and seeing how differently people live and work.",
    accent: "#038387",
    icon: "travel",
  },
  {
    name: "Investing",
    description: "Studying businesses, thinking long term and making informed decisions.",
    accent: "#0f6cbd",
    icon: "investing",
  },
  {
    name: "Gaming",
    description: "Strategy, competition and getting immersed in worlds built around great ideas.",
    accent: "#d83b82",
    icon: "gaming",
  },
];
