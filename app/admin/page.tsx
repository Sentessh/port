"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Project = {
  id: number;
  type: string;
  description: string;
  image_url: string;
  link: string;
  order: number;
};

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "form">("list");
  const [projects, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState<Project | null>(null);

  const [form, setForm] = useState({
    type: "",
    description: "",
    image_url: "",
    link: "",
    order: 0,
  });

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/admin/login");
      } else {
        setLoading(false);
        fetchProjects();
      }
    }
    checkSession();
  }, []);

  async function fetchProjects() {
    const { data } = await supabase.from("projects").select("*").order("order");
    if (data) setProjects(data);
  }

  async function handleSave() {
    if (selected) {
      await supabase.from("projects").update(form).eq("id", selected.id);
    } else {
      await supabase.from("projects").insert(form);
    }
    setForm({ type: "", description: "", image_url: "", link: "", order: 0 });
    setSelected(null);
    setView("list");
    fetchProjects();
  }

  async function handleDelete(id: number) {
    await supabase.from("projects").delete().eq("id", id);
    fetchProjects();
  }

  function handleEdit(project: Project) {
    setSelected(project);
    setForm({
      type: project.type,
      description: project.description,
      image_url: project.image_url,
      link: project.link,
      order: project.order,
    });
    setView("form");
  }

  function handleNew() {
    setSelected(null);
    setForm({ type: "", description: "", image_url: "", link: "", order: 0 });
    setView("form");
  }

  if (loading) return <p className="text-white p-10">Loading...</p>;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="w-full bg-[#111111] px-10 py-5 border-b border-white/10 flex justify-between items-center">
        <p className="text-white/50 text-sm font-bold uppercase tracking-widest">Portfolio Admin Panel</p>
        <a href="/" className="text-white/50 text-sm hover:text-white transition-colors">← Home</a>
      </header>
      <div className="p-10">

      {view === "list" && (
        <div>
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <button
              onClick={handleNew}
              className="bg-purple-500 px-6 py-3 rounded-lg font-bold hover:bg-purple-600 transition-colors"
            >
              + New Project
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-[#111111] rounded-xl p-6 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-bold">{project.type}</h2>
                  <p className="text-white/50 text-sm mt-1">{project.description}</p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleEdit(project)}
                    className="bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/40 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {projects.length === 0 && (
              <p className="text-white/30 text-center mt-20">No projects yet. Create one!</p>
            )}
          </div>
        </div>
      )}

      {view === "form" && (
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-bold">{selected ? "Edit Project" : "New Project"}</h1>
            <button
              onClick={() => setView("list")}
              className="text-white/50 hover:text-white transition-colors"
            >
              ← Back
            </button>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <label className="text-white/50 text-sm mb-2 block">Title</label>
              <input
                type="text"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full bg-[#111111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="text-white/50 text-sm mb-2 block">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4}
                className="w-full bg-[#111111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500 outline-none transition-colors resize-none"
              />
            </div>

            <div>
              <label className="text-white/50 text-sm mb-2 block">Image URL</label>
              <input
                type="text"
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                className="w-full bg-[#111111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="text-white/50 text-sm mb-2 block">Link</label>
              <input
                type="text"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                className="w-full bg-[#111111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="text-white/50 text-sm mb-2 block">Order</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                className="w-full bg-[#111111] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500 outline-none transition-colors"
              />
            </div>

            <button
              onClick={handleSave}
              className="bg-purple-500 px-6 py-3 rounded-lg font-bold hover:bg-purple-600 transition-colors mt-4"
            >
              {selected ? "Save Changes" : "Create Project"}
            </button>
          </div>
        </div>
      )}
      </div>
    </main>
  );
}
