"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { appsData as initialAppsData, AppData, AppLink } from "@/lib/data/apps";
import { blogPosts as initialBlogPosts, BlogPost } from "@/lib/data/blog";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, AppWindow, FileText, Settings, 
  Plus, Trash2, Edit, Save, X, CheckCircle2, AlertCircle, Copy, Search, LogOut
} from "lucide-react";

const newAppTemplate: AppData = {
  id: "", slug: "", name: "", tagline: "", description: "", category: "Productivity",
  version: "1.0.0", releaseDate: new Date().toISOString().split("T")[0],
  platforms: ["Android"], logo: "", screenshots: [""], features: [""], whatsNew: "Initial release",
  links: [], systemRequirements: { os: "Android 8.0+", storage: "10 MB", ram: "" },
  isFeatured: false, isPopular: false
};

const newBlogTemplate: BlogPost = {
  id: "", slug: "", title: "", excerpt: "", content: "",
  date: new Date().toISOString().split("T")[0], author: "Admin", category: "News", image: ""
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'apps' | 'blog'>('dashboard');
  
  const [apps, setApps] = useState<AppData[]>(initialAppsData);
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogPosts);
  const [editingApp, setEditingApp] = useState<AppData | null>(null);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  
  const [isSaving, setIsSaving] = useState(false);
  const [fallbackData, setFallbackData] = useState<{type: string, content: string} | null>(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        if (data.appsData && data.appsData.length > 0) setApps(data.appsData);
        if (data.blogPosts && data.blogPosts.length > 0) setBlogs(data.blogPosts);
      })
      .catch(console.error);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
        <div className="bg-card border border-border/50 p-8 rounded-3xl shadow-xl w-full max-w-md text-center">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Settings className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-space font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground text-sm mb-8">Enter the master password to access the control center.</p>
          <form onSubmit={(e) => { e.preventDefault(); if (password === 'admin123' || password === 'admin') setIsAuthenticated(true); else alert('Incorrect password. Try "admin" or "admin123"'); }}>
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full h-12 rounded-xl border border-input bg-background px-4 mb-4 text-center text-lg tracking-widest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="w-full h-12 rounded-xl text-md">Authenticate</Button>
          </form>
        </div>
      </div>
    );
  }

  // Save Handlers
  const saveToServer = async (type: 'apps' | 'blog', data: any) => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/save-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, data })
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to save');
      alert(`Changes to ${type} saved successfully to the filesystem!`);
    } catch (err: any) {
      console.error(err);
      // Fallback
      let content = "";
      if (type === 'apps') content = `export const appsData: AppData[] = ${JSON.stringify(data, null, 2)};`;
      if (type === 'blog') content = `export const blogPosts: BlogPost[] = ${JSON.stringify(data, null, 2)};`;
      setFallbackData({ type, content });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveApp = () => {
    if (!editingApp) return;
    const slug = editingApp.slug || editingApp.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    const newApp = { ...editingApp, id: editingApp.id || slug, slug };
    
    let newApps = [...apps];
    const index = newApps.findIndex(a => a.id === editingApp.id);
    if (index >= 0) newApps[index] = newApp;
    else newApps.push(newApp);
    
    setApps(newApps);
    setEditingApp(null);
    saveToServer('apps', newApps);
  };

  const handleDeleteApp = (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    const newApps = apps.filter(a => a.id !== id);
    setApps(newApps);
    saveToServer('apps', newApps);
  };

  const handleSaveBlog = () => {
    if (!editingBlog) return;
    const slug = editingBlog.slug || editingBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    const newBlog = { ...editingBlog, id: editingBlog.id || slug, slug };
    
    let newBlogs = [...blogs];
    const index = newBlogs.findIndex(b => b.id === editingBlog.id);
    if (index >= 0) newBlogs[index] = newBlog;
    else newBlogs.push(newBlog);
    
    setBlogs(newBlogs);
    setEditingBlog(null);
    saveToServer('blog', newBlogs);
  };

  const handleDeleteBlog = (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    const newBlogs = blogs.filter(b => b.id !== id);
    setBlogs(newBlogs);
    saveToServer('blog', newBlogs);
  };

  // Renderers
  const renderDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-space font-bold mb-8">Platform Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card border border-border/50 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
            <AppWindow className="w-8 h-8" />
          </div>
          <h3 className="text-4xl font-bold mb-2">{apps.length}</h3>
          <p className="text-muted-foreground font-medium">Total Applications</p>
        </div>
        <div className="bg-card border border-border/50 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-4xl font-bold mb-2">{blogs.length}</h3>
          <p className="text-muted-foreground font-medium">Blog Posts</p>
        </div>
      </div>
    </div>
  );

  const renderAppEditor = () => {
    if (!editingApp) return null;
    return (
      <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm space-y-8">
        <div className="flex items-center justify-between border-b border-border/50 pb-4">
          <h2 className="text-2xl font-bold">{editingApp.id ? 'Edit Application' : 'Add New Application'}</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setEditingApp(null)}>Cancel</Button>
            <Button onClick={handleSaveApp} disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" /> Save App
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">App Name</label>
            <input type="text" className="w-full h-10 rounded-xl border border-input bg-background px-3" value={editingApp.name} onChange={e => setEditingApp({...editingApp, name: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <input type="text" className="w-full h-10 rounded-xl border border-input bg-background px-3" value={editingApp.category} onChange={e => setEditingApp({...editingApp, category: e.target.value})} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Tagline</label>
            <input type="text" className="w-full h-10 rounded-xl border border-input bg-background px-3" value={editingApp.tagline} onChange={e => setEditingApp({...editingApp, tagline: e.target.value})} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Description</label>
            <textarea className="w-full rounded-xl border border-input bg-background px-3 py-2 min-h-[100px]" value={editingApp.description} onChange={e => setEditingApp({...editingApp, description: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Version</label>
            <input type="text" className="w-full h-10 rounded-xl border border-input bg-background px-3" value={editingApp.version} onChange={e => setEditingApp({...editingApp, version: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Release Date</label>
            <input type="date" className="w-full h-10 rounded-xl border border-input bg-background px-3" value={editingApp.releaseDate} onChange={e => setEditingApp({...editingApp, releaseDate: e.target.value})} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Logo URL</label>
            <input type="text" className="w-full h-10 rounded-xl border border-input bg-background px-3" value={editingApp.logo} onChange={e => setEditingApp({...editingApp, logo: e.target.value})} />
          </div>
        </div>

        <div className="border-t border-border/50 pt-6 space-y-4">
           <h3 className="text-lg font-bold">Features & Screenshots</h3>
           <div className="space-y-2">
             <div className="flex justify-between"><label className="text-sm font-medium">Features</label><Button size="sm" variant="ghost" onClick={() => setEditingApp({...editingApp, features: [...editingApp.features, ""]})}><Plus className="w-4 h-4 mr-1"/> Add</Button></div>
             {editingApp.features.map((feat, i) => (
                <div key={i} className="flex gap-2">
                  <input type="text" className="flex-1 h-10 rounded-xl border border-input bg-background px-3" value={feat} onChange={e => { const newF = [...editingApp.features]; newF[i] = e.target.value; setEditingApp({...editingApp, features: newF}); }} />
                  <Button variant="ghost" size="icon" onClick={() => { const newF = [...editingApp.features]; newF.splice(i, 1); setEditingApp({...editingApp, features: newF}); }}><Trash2 className="w-4 h-4 text-destructive"/></Button>
                </div>
             ))}
           </div>
        </div>

        <div className="border-t border-border/50 pt-6 flex gap-6">
          <label className="flex items-center gap-2"><input type="checkbox" checked={editingApp.isFeatured} onChange={e => setEditingApp({...editingApp, isFeatured: e.target.checked})} className="rounded text-primary w-4 h-4"/> Featured App</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={editingApp.isPopular} onChange={e => setEditingApp({...editingApp, isPopular: e.target.checked})} className="rounded text-primary w-4 h-4"/> Popular App</label>
        </div>
      </div>
    );
  };

  const renderBlogEditor = () => {
    if (!editingBlog) return null;
    return (
      <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm space-y-8">
        <div className="flex items-center justify-between border-b border-border/50 pb-4">
          <h2 className="text-2xl font-bold">{editingBlog.id ? 'Edit Blog Post' : 'New Blog Post'}</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setEditingBlog(null)}>Cancel</Button>
            <Button onClick={handleSaveBlog} disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" /> Save Post
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Title</label>
            <input type="text" className="w-full h-10 rounded-xl border border-input bg-background px-3" value={editingBlog.title} onChange={e => setEditingBlog({...editingBlog, title: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <input type="text" className="w-full h-10 rounded-xl border border-input bg-background px-3" value={editingBlog.category} onChange={e => setEditingBlog({...editingBlog, category: e.target.value as any})} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Author</label>
            <input type="text" className="w-full h-10 rounded-xl border border-input bg-background px-3" value={editingBlog.author} onChange={e => setEditingBlog({...editingBlog, author: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Date</label>
            <input type="date" className="w-full h-10 rounded-xl border border-input bg-background px-3" value={editingBlog.date} onChange={e => setEditingBlog({...editingBlog, date: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Image URL</label>
            <input type="text" className="w-full h-10 rounded-xl border border-input bg-background px-3" value={editingBlog.image || ""} onChange={e => setEditingBlog({...editingBlog, image: e.target.value})} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Excerpt</label>
            <textarea className="w-full rounded-xl border border-input bg-background px-3 py-2 min-h-[80px]" value={editingBlog.excerpt} onChange={e => setEditingBlog({...editingBlog, excerpt: e.target.value})} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Content (Markdown/HTML)</label>
            <textarea className="w-full rounded-xl border border-input bg-background px-3 py-2 min-h-[300px] font-mono text-sm" value={editingBlog.content} onChange={e => setEditingBlog({...editingBlog, content: e.target.value})} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-r border-border/50 flex flex-col min-h-[100px] md:min-h-screen">
        <div className="p-6 border-b border-border/50 flex items-center gap-3">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-xl"><Settings className="w-5 h-5"/></div>
          <span className="font-space font-bold text-xl">Admin</span>
        </div>
        <nav className="flex-1 p-4 space-y-2 flex flex-row md:flex-col overflow-x-auto">
          <button onClick={() => { setActiveTab('dashboard'); setEditingApp(null); setEditingBlog(null); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors whitespace-nowrap ${activeTab === 'dashboard' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted text-muted-foreground'}`}>
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          <button onClick={() => { setActiveTab('apps'); setEditingBlog(null); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors whitespace-nowrap ${activeTab === 'apps' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted text-muted-foreground'}`}>
            <AppWindow className="w-5 h-5" /> Applications
          </button>
          <button onClick={() => { setActiveTab('blog'); setEditingApp(null); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors whitespace-nowrap ${activeTab === 'blog' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted text-muted-foreground'}`}>
            <FileText className="w-5 h-5" /> Blog Posts
          </button>
        </nav>
        <div className="p-4 border-t border-border/50 hidden md:block">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground" onClick={() => setIsAuthenticated(false)}>
            <LogOut className="w-4 h-4 mr-2" /> Lock Panel
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen">
        <div className="max-w-6xl mx-auto">
          
          {activeTab === 'dashboard' && renderDashboard()}

          {activeTab === 'apps' && !editingApp && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-space font-bold">Applications</h2>
                <Button onClick={() => setEditingApp({ ...newAppTemplate })}><Plus className="w-4 h-4 mr-2" /> Add App</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {apps.map(app => (
                  <div key={app.id} className="bg-card border border-border/50 rounded-2xl p-6 flex flex-col shadow-sm">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl bg-muted overflow-hidden shrink-0">
                         {app.logo && <Image src={app.logo} alt="" width={64} height={64} className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <h3 className="font-bold text-lg truncate">{app.name}</h3>
                        <p className="text-sm text-muted-foreground truncate">{app.category}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-auto pt-4 border-t border-border/50">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => setEditingApp(app)}><Edit className="w-4 h-4 mr-2"/> Edit</Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => handleDeleteApp(app.id)}><Trash2 className="w-4 h-4"/></Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'apps' && editingApp && renderAppEditor()}

          {activeTab === 'blog' && !editingBlog && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-space font-bold">Blog Posts</h2>
                <Button onClick={() => setEditingBlog({ ...newBlogTemplate })}><Plus className="w-4 h-4 mr-2" /> Add Post</Button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {blogs.map(post => (
                  <div key={post.id} className="bg-card border border-border/50 rounded-2xl p-6 flex flex-col shadow-sm">
                    <h3 className="font-bold text-lg mb-2 line-clamp-1">{post.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setEditingBlog(post)}><Edit className="w-4 h-4"/></Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => handleDeleteBlog(post.id)}><Trash2 className="w-4 h-4"/></Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'blog' && editingBlog && renderBlogEditor()}

        </div>
      </main>

      {/* Fallback Modal */}
      {fallbackData && (
        <div className="fixed inset-0 z-[200] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border/50 rounded-3xl w-full max-w-3xl shadow-2xl p-8 flex flex-col max-h-[90vh]">
            <div className="flex items-center text-amber-500 mb-4">
              <AlertCircle className="w-6 h-6 mr-3" />
              <h2 className="text-2xl font-bold text-foreground">Manual Update Required</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Saving directly to the filesystem is disabled in your current environment (production or GitHub Pages).
              To apply your changes, please copy the code below and paste it into <code className="text-foreground bg-muted px-1.5 py-0.5 rounded">lib/data/{fallbackData.type}.ts</code>.
            </p>
            <div className="relative flex-1 min-h-[300px] mb-6">
              <textarea 
                readOnly 
                className="absolute inset-0 w-full h-full bg-muted/50 font-mono text-xs p-4 rounded-xl border border-border/50 focus:outline-none resize-none" 
                value={fallbackData.content} 
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setFallbackData(null)}>Close</Button>
              <Button onClick={() => { navigator.clipboard.writeText(fallbackData.content); alert('Copied to clipboard!'); }}>
                <Copy className="w-4 h-4 mr-2" /> Copy Code
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
