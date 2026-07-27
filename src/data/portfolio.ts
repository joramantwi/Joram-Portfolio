export const profile = {
  name: "Joram Antwi",
  title: "Dynamics 365 Functional Consultant",
  headline: "Microsoft Dynamics 365 CE · Power Platform · CRM Solutions",
  location: "London, UK",
  linkedin: "https://linkedin.com/in/joramantwi",
  linkedinLabel: "linkedin.com/in/joramantwi",
  learnProfile: "https://learn.microsoft.com/en-us/users/joramantwi-5080/",
  learnCredentials: "https://learn.microsoft.com/en-us/users/joramantwi-5080/credentials/",
  learnProfileLabel: "learn.microsoft.com/users/joramantwi-5080",
  summary:
    "CRM professional focused on building and improving Microsoft D365 CE solutions that actually work for the people using them. Started out as a software engineer, which means I can read and write code as well as configure — useful when working with developers or scoping technical solutions. Have led CRM migrations, redesigned systems end-to-end, built automation with Power Automate, and supported teams across Sales, Customer Service, and Operations. Comfortable working with stakeholders directly, understanding what they need, and translating that into platform decisions. Outside of work, actively exploring AI tools and prompt engineering — including how they fit into CRM workflows and business use cases.",
};

export type Kpi = {
  label: string;
  value: string;
  caption: string;
  accent: string;
};

export const kpis: Kpi[] = [
  { label: "Years in tech", value: "8+", caption: "Since 2017", accent: "#0f6cbd" },
  { label: "Roles delivered", value: "5", caption: "CRM · Web · AR", accent: "#107c41" },
  { label: "Certifications", value: "1", caption: "D365 Fundamentals", accent: "#8764b8" },
  { label: "Core platforms", value: "6", caption: "D365 · Power Platform", accent: "#c33d2e" },
];

export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  points: string[];
};

export const experiences: Experience[] = [
  {
    role: "CRM Manager",
    company: "Simplexity Travel Management",
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
    location: "London",
    period: "Aug 2019",
    points: [
      "Delivered a production-ready AR prototype in Unity (AR Foundation) for Android/iOS within a 4-week sprint — integrating real-world object tracking and custom shaders, and recognised for high-impact delivery ahead of schedule.",
    ],
  },
  {
    role: "Digital Development Placement",
    company: "npower",
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
  stage: string;
  tags: string[];
  summary: string;
};

export const projects: Project[] = [
  {
    name: "D365 CE End-to-End Redesign",
    org: "Simplexity Travel Management",
    stage: "Delivered",
    tags: ["D365 Sales", "Customer Service", "Ribbon Workbench", "BPF"],
    summary:
      "Rebuilt the sitemap, entity model, forms, views, field mappings and Business Process Flows into a scalable solution used across Sales, Commercial and Operations, with command bar customisations built in Ribbon Workbench.",
  },
  {
    name: "Power Automate Automation Suite",
    org: "Simplexity Travel Management",
    stage: "Delivered",
    tags: ["Power Automate", "Lead processing", "Case routing"],
    summary:
      "A suite of cloud flows automating lead processing, case routing and internal notifications — significantly reducing manual administrative overhead on the CRM team.",
  },
  {
    name: "Power Pages External Portal",
    org: "Simplexity Travel Management",
    stage: "Delivered",
    tags: ["Power Pages", "Azure AD", "App Registrations", "API"],
    summary:
      "Architected and deployed a Power Pages portal with role-based access and Azure AD App Registrations, enabling secure external access to CRM data via configured API connections.",
  },
  {
    name: "CRM Migration: Zoho & Sheets → D365",
    org: "Refugees at Home",
    stage: "Delivered",
    tags: ["Migration", "D365 CE", "ITIL", "Data mapping"],
    summary:
      "Led a full CRM migration from Google Sheets & Zoho CRM to Microsoft D365 CE under an ITIL-aligned change process — from requirements and data migration through to full team adoption.",
  },
  {
    name: "Dataverse Impact Dashboards",
    org: "Refugees at Home",
    stage: "Delivered",
    tags: ["Power BI", "Dataverse", "KPIs"],
    summary:
      "Real-time Power BI dashboards connected to Dataverse, surfacing charity impact KPIs and operational metrics for leadership and external stakeholders.",
  },
  {
    name: "CRM ↔ Website REST Integration",
    org: "Refugees at Home",
    stage: "Delivered",
    tags: ["REST API", "JSON", "Web"],
    summary:
      "Connected CRM data to the public website via REST API, surfacing live volunteer placement and case statistics to improve transparency and trust with donors.",
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
