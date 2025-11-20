"use client";
import React, { useEffect, useState, useRef } from "react";

type Project = {
  id: number | string;
  name: string;
  description?: string | null;
  defaultModel?: string | null;
  createdAt?: string;
};

function SkeletonCard() {
  return (
    <div className="rounded-2xl p-4 bg-linear-to-b from-gray-50 to-white border border-gray-100 animate-pulse h-32" />
  );
}

// ProjectCard removed in favor of inline card for simplified layout and lint compliance.

export default function ProjectsClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [creating, setCreating] = useState(false);

  // form
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [defaultModel, setDefaultModel] = useState("gpt-3.5-turbo");
  const nameRef = useRef<HTMLInputElement | null>(null);
  const createButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (!mounted) return;
        if (data?.projects) setProjects(data.projects);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false };
  }, []);

  useEffect(() => {
    if (showModal) {
      // autofocus name input
      lastActiveElement.current = document.activeElement as HTMLElement | null;
      setTimeout(() => nameRef.current?.focus(), 50);
    }
  }, [showModal]);

  // return focus to last active element when modal closes
  useEffect(() => {
    if (!showModal && lastActiveElement.current) {
      const toFocus = lastActiveElement.current;
      // small timeout to allow modal to unmount
      setTimeout(() => {
        try {
          toFocus.focus();
        } catch (e) {
          // ignore
        }
        lastActiveElement.current = null;
      }, 50);
    }
  }, [showModal]);

  async function handleCreate(e?: React.FormEvent) {
    e?.preventDefault();
    if (!name.trim()) return;
    setCreating(true);
    setShowModal(false);

    // optimistic placeholder
    const tempId = `temp-${Date.now()}`;
    const placeholder: Project = { id: tempId, name, description, defaultModel, createdAt: new Date().toISOString() };
    setProjects((p) => [placeholder, ...p]);

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, defaultModel }),
      });

  let data: unknown = null;
  const text = await res.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch (_e) {
    // swallow JSON parse error (_e) if any
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ignore = _e;
    data = { _raw: text };
  }

  const isObj = data && typeof data === 'object' && !Array.isArray(data);
  const bodyObj = isObj ? data as Record<string, unknown> : null;
  const bodyStr = bodyObj ? JSON.stringify(bodyObj) : String(data);

  if (res.ok && bodyObj && bodyObj['project']) {
    // replace placeholder with real project
    // safe cast since we checked
    const project = bodyObj['project'] as unknown as Project;
    setProjects((p) => p.map(item => item.id === tempId ? project : item));
  } else {
    // remove placeholder and show error
    setProjects((p) => p.filter(item => item.id !== tempId));
    console.error('Create failed', { status: res.status, body: bodyStr });
    // prefer explicit error message, fallback to raw body or status
    const serverError = bodyObj && typeof bodyObj['error'] === 'string' ? (bodyObj['error'] as string) : null;
    const raw = bodyObj && typeof bodyObj['_raw'] === 'string' ? (bodyObj['_raw'] as string) : null;
    alert(serverError || raw || bodyStr || `Failed to create project (status ${res.status})`);
  }
    } catch (err) {
      console.error(err);
      setProjects((p) => p.filter(item => item.id !== tempId));
      alert('Network error');
    } finally {
      setCreating(false);
      setName('');
      setDescription('');
      setDefaultModel('gpt-3.5-turbo');
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') setShowModal(false);
  }

  // focus trap implementation for modal
  useEffect(() => {
    if (!showModal) return;
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;
      const modal = document.querySelector('[role="dialog"]') as HTMLElement | null;
      if (!modal) return;
      const focusable = Array.from(modal.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])')).filter(el => !el.hasAttribute('disabled'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [showModal]);

  return (
    <div className="min-h-screen bg-[#f9fafb] py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Projects</h1>
            <p className="mt-1 text-sm text-gray-500">Create and manage your workspaces.</p>
          </div>

            <div>
            <button ref={createButtonRef} onClick={() => setShowModal(true)} className="btn-primary bg-primary-gradient" aria-haspopup="dialog">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create project
            </button>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`}>
            {projects.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-[#e5e7eb] bg-white py-20">
                <svg width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="8" y="20" width="144" height="88" rx="12" fill="#f3f4f6" />
                  <rect x="24" y="36" width="112" height="12" rx="6" fill="#ffffff" />
                  <rect x="24" y="58" width="80" height="8" rx="4" fill="#e5e7eb" />
                  <rect x="24" y="72" width="60" height="8" rx="4" fill="#e5e7eb" />
                </svg>
                <div className="mt-6 text-lg font-medium text-gray-900">No projects yet</div>
                <div className="mt-2 text-sm text-gray-500">Create your first AI workspace to get started.</div>
                <div className="mt-6">
                  <button ref={createButtonRef} onClick={() => setShowModal(true)} className="btn-primary bg-primary-gradient inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white shadow" aria-haspopup="dialog">Create Project</button>
                </div>
              </div>
            ) : (
              projects.map((proj) => (
                <div key={proj.id} onClick={() => { 
                    // soft highlight
                    const el = document.getElementById(String(proj.id));
                    if (el) {
                      el.classList.add('ring-2','ring-indigo-100');
                      setTimeout(()=>el.classList.remove('ring-2','ring-indigo-100'), 250);
                    }
                    // navigate to project page placeholder
                    window.location.href = `/dashboard/project/${proj.id}`;
                  }} id={String(proj.id)} className="rounded-2xl bg-white border border-[#e5e7eb] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] transition-shadow transform hover:-translate-y-1 cursor-pointer" role="button" tabIndex={0} onKeyDown={(e)=>{ if(e.key==='Enter') (e.currentTarget as HTMLElement).click(); }}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-base font-semibold text-gray-900">{proj.name}</div>
                      {proj.description && <div className="mt-2 text-sm text-gray-500">{proj.description}</div>}
                    </div>
                    <div className="flex flex-col items-end text-right">
                      <div className="text-xs text-gray-400">{proj.defaultModel ?? '—'}</div>
                      <div className="mt-2 text-xs text-gray-300">{proj.createdAt ? new Date(proj.createdAt).toLocaleDateString() : ''}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Modal */}
        {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center" onKeyDown={handleKeyDown} tabIndex={-1}>
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)} />
            <form onSubmit={handleCreate} className="relative z-10 w-full max-w-2xl rounded-2xl p-8 bg-white border border-[#e5e7eb] shadow-2xl" aria-modal="true" role="dialog">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Create project</h3>
                  <p className="mt-1 text-sm text-gray-500">Set up a workspace for your prompts and outputs.</p>
                </div>
                <button type="button" onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600" aria-label="Close create project dialog">
                  <span className="sr-only">Close</span>
                  ✕
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4">
                <label className="block">
                  <div className="text-sm font-medium text-gray-700">Name</div>
                  <input ref={nameRef} required value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-lg border border-[#e5e7eb] px-4 py-3 text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100" placeholder="My new project" />
                </label>

                <label className="block">
                  <div className="text-sm font-medium text-gray-700">Description <span className="text-xs text-gray-400">(optional)</span></div>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-2 w-full rounded-lg border border-[#e5e7eb] px-4 py-3 text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-50" rows={3} placeholder="What is this project about?" />
                </label>

                <label className="block">
                  <div className="text-sm font-medium text-gray-700">Default model</div>
                  <input value={defaultModel} onChange={(e) => setDefaultModel(e.target.value)} className="mt-2 w-full rounded-lg border border-[#e5e7eb] px-4 py-3 text-gray-900 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-50" />
                  <div className="mt-1 text-xs text-gray-400">A sensible default is <strong>gpt-3.5-turbo</strong>.</div>
                </label>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-full text-sm text-gray-600">Cancel</button>
                <button type="submit" disabled={creating} className="btn-primary bg-primary-gradient" aria-label="Create project">
                  {creating ? (
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                  ) : null}
                  {creating ? 'Creating...' : 'Create project'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
