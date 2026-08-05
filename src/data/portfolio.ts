export const profile = {
  name: "Joram Antwi",
  title: "Dynamics 365 Specialist · Developer · AI",
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
    "I'm a solution architect at heart, using technology to solve real problems — a Dynamics 365 professional with a deep software engineering background, focused on bringing people, data and processes together to drive better business outcomes. Microsoft's business applications stack is home base: Dynamics 365 CE today, with a growing focus across the wider platform — CE, ERP and the Azure cloud.",
    "I've led CRM migrations, redesigned systems end-to-end, and delivered automation with tools like Power Automate, custom plugins and third-party integrations such as Zapier. Coming from a development background means I can read and write code as well as configure — so I'm just as comfortable scoping a technical solution as I am sitting with stakeholders to turn what they need into something that genuinely works. Right now I'm going deep on AI and prompt engineering, exploring how they reshape CRM workflows and everyday business processes.",
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
  points: string[];
};

export const experiences: Experience[] = [
  {
    role: "CRM Manager",
    company: "Simplexity Travel Management",
    website: "https://www.simplexitytravel.com/",
    location: "London",
    period: "Apr 2023 – Present",
    current: true,
    points: [
      "Delivered end-to-end redesign of D365 CE (Sales & Customer Service) — rebuilding the sitemap, entity model, forms, views, field mappings, and Business Process Flows, with command bar customisations built in Ribbon Workbench — establishing a scalable, well-structured solution used across Sales, Commercial, and Operations.",
      "Designed and deployed a suite of Power Automate cloud flows to eliminate repetitive manual tasks, covering lead processing, case routing, and internal notifications — significantly reducing the administrative overhead on the CRM team.",
      "Resolved long-standing data quality issues through a structured clean-up programme: duplicate detection rules, bulk deduplication, field validation, and Excel/CSV-based data mapping — resulting in a noticeably cleaner, more reliable dataset.",
      "Architected and deployed a Power Pages portal with role-based access and Azure AD App Registrations, enabling secure external access to CRM data via configured API connections.",
      "Built custom Power BI dashboards and dynamic marketing lists, giving stakeholders self-serve visibility into pipeline, case volumes, and segmentation — reducing reliance on manual reporting.",
      "Led a CRM-integrated website redesign that embedded form capture directly into D365, improving lead data quality and creating a consistent, auditable intake process for the sales team.",
      "Drove CRM adoption across the business through structured training sessions, desk-side coaching, and written user documentation tailored to each team's workflows.",
      "Defined and enforced GDPR-compliant data retention policies and implemented BCDR-aligned backup procedures to meet organisational governance requirements.",
    ],
  },
  {
    role: "IT Analyst (D365 CRM)",
    company: "Refugees at Home",
    website: "https://refugeesathome.org/",
    location: "London",
    period: "Jun 2020 – Apr 2023",
    points: [
      "Established an ITIL-aligned change management process and led a full CRM migration from Google Sheets & Zoho CRM to Microsoft D365 CE — managing requirements, stakeholder communication, data migration, and team onboarding through to full adoption.",
      "Supported the full D365 CE solution build from scratch: requirements gathering, custom entity design, form and view configuration, Business Process Flows, and Dataverse field mappings to ensure clean, consistent data across the platform.",
      "Defined Power Platform governance in the Admin Centre — configuring GDPR-aligned retention rules, business rules, and field-level security to protect sensitive case and personal data.",
      "Built real-time Power BI dashboards connected to Dataverse, surfacing charity impact KPIs and operational metrics for leadership and external stakeholders.",
      "Automated key internal workflows using Power Automate, replacing manual email-based processes with structured, auditable flows across the volunteer and case management teams.",
      "Connected CRM data to the public website via REST API, surfacing live volunteer placement and case statistics to improve transparency and trust with donors.",
      "Led a full cloud migration from G Suite to Microsoft 365 — including Exchange Online mailbox migration, DNS cutover, and user training — completed with no service downtime.",
      "Operated as the sole IT professional across a growing organisation, owning CRM, reporting, web development (PHP/JS), and infrastructure — developing strong prioritisation and stakeholder management skills in a resource-constrained environment.",
    ],
  },
  {
    role: "Full Stack Web Developer",
    company: "Lavida Digital",
    location: "London",
    period: "Dec 2019 – Apr 2023",
    points: [
      "Built and launched bespoke web applications using Next.js, Angular, and Node.js — owning full project lifecycles from technical scoping and sprint planning through to deployment and client handover.",
      "Refactored and maintained legacy JavaScript/Angular codebases, improving performance through modularisation and bundle optimisation, and resolving critical bugs ahead of client deadlines.",
      "Maintained code quality across distributed and offshore teams through PR reviews, linting standards, and CI pipeline integration — developing a disciplined, collaborative approach to software delivery.",
      "Provided post-launch technical support and trained non-technical clients on CMS usage and frontend updates, building confidence in translating technical concepts for non-technical audiences.",
    ],
  },
  {
    role: "AR Developer (Internship)",
    company: "1UP Studios (formerly Arcade)",
    website: "https://www.1upstudios.tech/",
    location: "London",
    period: "Aug 2019",
    points: [
      "Delivered a production-ready AR prototype in Unity (AR Foundation) for Android/iOS within a 4-week sprint — integrating real-world object tracking and custom shaders, and recognised for high-impact delivery ahead of schedule.",
    ],
  },
  {
    role: "Digital Development Placement",
    company: "npower",
    website: "https://npowerbusinesssolutions.com/",
    location: "Birmingham / Solihull",
    period: "Aug 2017 – Aug 2018",
    points: [
      "Developed Node.js APIs powering Amazon Alexa and Google Assistant voice experiences, enabling real-time energy account lookups — building the REST API and JSON fundamentals that underpin current integration work.",
      "Worked alongside backend teams to improve microservice performance using profiling tools, and supported CI/CD pipeline integration for voice platform deployments.",
      "Delivered projects in a Scrum environment, contributing to sprint ceremonies, cross-functional planning, and test automation using Selenium.",
    ],
  },
];

export type SkillGroup = {
  category: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Dynamics 365 Apps",
    skills: [
      "Sales",
      "Customer Service",
      "Customer Voice",
      "Supply Chain Management",
    ],
  },
  {
    category: "Dataverse & Model-Driven Apps",
    skills: [
      "Model-driven app design",
      "Tables & relationships",
      "Columns & data types",
      "Forms, views & business rules",
      "Business Process Flows",
      "Command bar / Ribbon Workbench",
      "Dataverse security roles",
    ],
  },
  {
    category: "Power Platform",
    skills: [
      "Power Apps (canvas & model-driven)",
      "Power Automate cloud flows",
      "Power Pages",
      "Power BI",
      "Connectors",
      "Copilot Studio",
    ],
  },
  {
    category: "Pro-Dev & Extensibility",
    skills: [
      "C# plug-ins",
      "JavaScript form scripting",
      "Web API & REST",
      "Azure App Registrations",
      "XrmToolBox",
    ],
  },
  {
    category: "ALM & Governance",
    skills: [
      "Managed / unmanaged solutions",
      "Solution layering",
      "Environment strategy",
      "Power Platform Pipelines",
      "Azure DevOps",
      "Role-based security",
      "GDPR & data retention",
    ],
  },
  {
    category: "Data & Integration",
    skills: [
      "Data migration & mapping",
      "Duplicate detection & dedup",
      "Excel / CSV imports",
      "Integration design",
      "REST API & JSON",
    ],
  },
  {
    category: "Delivery & Consulting",
    skills: [
      "Requirements gathering",
      "Fit-gap analysis",
      "Process mapping",
      "User stories",
      "Agile / Scrum",
      "UAT support",
      "End-user training",
      "Technical documentation",
    ],
  },
  {
    category: "Engineering Foundations",
    skills: [
      "JavaScript",
      "C#",
      "PHP",
      "Python",
      "Node.js",
      "SQL & database design",
      "Full-stack web development",
    ],
  },
  {
    category: "AI & Emerging Tech",
    skills: [
      "Microsoft Copilot",
      "AI prompting",
      "CRM process optimisation",
      "AI use case design",
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
    module: "D365 Sales & Customer Service",
    role: "CRM Manager",
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
    role: "CRM Manager",
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
    role: "CRM Manager",
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
    module: "D365 Customer Engagement",
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
  badge?: string;
  credentialUrl?: string;
};

export const certifications: Certification[] = [
  {
    name: "Microsoft Certified: Dynamics 365 Fundamentals (CRM)",
    issuer: "Microsoft",
    date: "Dec 2023",
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
