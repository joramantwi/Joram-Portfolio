"use client";

import { useState, useCallback } from "react";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import CommandBar from "./CommandBar";
import OverviewView from "./views/OverviewView";
import ExperienceView from "./views/ExperienceView";
import SkillsView from "./views/SkillsView";
import ProjectsView from "./views/ProjectsView";
import CertificationsView from "./views/CertificationsView";
import ProfileView from "./views/ProfileView";
import ContactView from "./views/ContactView";
import { RequestCvProvider } from "./cv/RequestCvProvider";
import type { ViewKey } from "./nav";

export default function AppShell() {
  const [view, setView] = useState<ViewKey>("overview");
  const [history, setHistory] = useState<ViewKey[]>([]);
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useCallback(
    (next: ViewKey) => {
      setView((current) => {
        if (current !== next) setHistory((h) => [...h, current]);
        return next;
      });
    },
    []
  );

  const goBack = useCallback(() => {
    setHistory((h) => {
      if (h.length === 0) return h;
      const prev = h[h.length - 1];
      setView(prev);
      return h.slice(0, -1);
    });
  }, []);

  return (
    <RequestCvProvider>
      <div className="flex h-screen flex-col overflow-hidden">
        <TopBar />
        <div className="flex min-h-0 flex-1">
          <Sidebar
            active={view}
            onSelect={navigate}
            collapsed={collapsed}
            onToggle={() => setCollapsed((c) => !c)}
          />
          <main className="flex min-w-0 flex-1 flex-col">
            <CommandBar view={view} onBack={goBack} canGoBack={history.length > 0} />
            <div className="flex-1 overflow-y-auto p-4 lg:p-5">
              <div key={view} className="view-enter mx-auto max-w-6xl">
                {view === "overview" && <OverviewView onNavigate={navigate} />}
                {view === "experience" && <ExperienceView />}
                {view === "skills" && <SkillsView />}
                {view === "projects" && <ProjectsView />}
                {view === "certifications" && <CertificationsView />}
                {view === "profile" && <ProfileView />}
                {view === "contact" && <ContactView />}
              </div>
            </div>
          </main>
        </div>
      </div>
    </RequestCvProvider>
  );
}
