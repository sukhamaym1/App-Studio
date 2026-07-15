"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AppData, AppLink } from "@/lib/data/apps";
import { Copy, Plus, Trash2, CheckCircle2 } from "lucide-react";

export default function AdminPage() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState<Partial<AppData>>({
    name: "",
    tagline: "",
    description: "",
    category: "Productivity",
    version: "1.0.0",
    releaseDate: new Date().toISOString().split("T")[0],
    platforms: ["Android"],
    logo: "",
    screenshots: [""],
    features: [""],
    whatsNew: "Initial release",
    links: [],
    systemRequirements: {
      os: "Android 8.0+",
      storage: "10 MB",
      ram: "",
    },
    isFeatured: false,
    isPopular: false,
  });

  const handleCopy = () => {
    // Generate id and slug
    const slug = formData.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") || "new-app";
    
    const finalData: AppData = {
      id: slug,
      slug: slug,
      name: formData.name || "",
      tagline: formData.tagline || "",
      description: formData.description || "",
      category: formData.category || "",
      version: formData.version || "",
      releaseDate: formData.releaseDate || "",
      platforms: formData.platforms || [],
      logo: formData.logo || "",
      screenshots: formData.screenshots?.filter(s => s.trim() !== "") || [],
      features: formData.features?.filter(f => f.trim() !== "") || [],
      whatsNew: formData.whatsNew || "",
      links: formData.links || [],
      systemRequirements: {
        os: formData.systemRequirements?.os || "",
        storage: formData.systemRequirements?.storage || "",
        ram: formData.systemRequirements?.ram || "",
      },
      isFeatured: formData.isFeatured || false,
      isPopular: formData.isPopular || false,
    };

    // Format as TS string to match apps.ts
    const outputString = JSON.stringify(finalData, null, 2);
    
    navigator.clipboard.writeText(outputString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateField = (field: keyof AppData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateSysReq = (field: keyof AppData["systemRequirements"], value: string) => {
    setFormData(prev => ({
      ...prev,
      systemRequirements: { ...prev.systemRequirements, [field]: value } as any
    }));
  };

  const togglePlatform = (platform: string) => {
    setFormData(prev => {
      const current = prev.platforms || [];
      if (current.includes(platform)) {
        return { ...prev, platforms: current.filter(p => p !== platform) };
      }
      return { ...prev, platforms: [...current, platform] };
    });
  };

  const updateArrayField = (field: "screenshots" | "features", index: number, value: string) => {
    setFormData(prev => {
      const current = [...(prev[field] || [])];
      current[index] = value;
      return { ...prev, [field]: current };
    });
  };

  const addArrayItem = (field: "screenshots" | "features") => {
    setFormData(prev => ({ ...prev, [field]: [...(prev[field] || []), ""] }));
  };

  const removeArrayItem = (field: "screenshots" | "features", index: number) => {
    setFormData(prev => {
      const current = [...(prev[field] || [])];
      current.splice(index, 1);
      return { ...prev, [field]: current };
    });
  };

  const updateLink = (index: number, type: AppLink["type"], url: string) => {
    setFormData(prev => {
      const current = [...(prev.links || [])];
      current[index] = { type, url };
      return { ...prev, links: current };
    });
  };

  const addLink = () => {
    setFormData(prev => ({ ...prev, links: [...(prev.links || []), { type: "playstore", url: "" }] }));
  };

  const removeLink = (index: number) => {
    setFormData(prev => {
      const current = [...(prev.links || [])];
      current.splice(index, 1);
      return { ...prev, links: current };
    });
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-space font-bold mb-2">App Config Generator</h1>
        <p className="text-muted-foreground">
          Fill out this form to generate the configuration object for a new application. 
          Copy the output and paste it into <code className="bg-muted px-1 py-0.5 rounded text-sm">lib/data/apps.ts</code>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Info */}
          <section className="bg-card border border-border/50 rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold border-b border-border/50 pb-2 mb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">App Name</label>
                <input 
                  type="text" 
                  className="w-full h-10 rounded-xl border border-input bg-background px-3"
                  value={formData.name}
                  onChange={e => updateField("name", e.target.value)}
                  placeholder="e.g. PDF Tools Pro"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <input 
                  type="text" 
                  className="w-full h-10 rounded-xl border border-input bg-background px-3"
                  value={formData.category}
                  onChange={e => updateField("category", e.target.value)}
                  placeholder="e.g. Productivity"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tagline</label>
              <input 
                type="text" 
                className="w-full h-10 rounded-xl border border-input bg-background px-3"
                value={formData.tagline}
                onChange={e => updateField("tagline", e.target.value)}
                placeholder="Short catchy phrase"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea 
                className="w-full rounded-xl border border-input bg-background px-3 py-2 min-h-[100px]"
                value={formData.description}
                onChange={e => updateField("description", e.target.value)}
                placeholder="Detailed description..."
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Version</label>
                <input 
                  type="text" 
                  className="w-full h-10 rounded-xl border border-input bg-background px-3"
                  value={formData.version}
                  onChange={e => updateField("version", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Release Date</label>
                <input 
                  type="date" 
                  className="w-full h-10 rounded-xl border border-input bg-background px-3"
                  value={formData.releaseDate}
                  onChange={e => updateField("releaseDate", e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Media & Features */}
          <section className="bg-card border border-border/50 rounded-2xl p-6 space-y-6">
            <h2 className="text-xl font-bold border-b border-border/50 pb-2 mb-4">Media & Features</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Logo URL</label>
              <input 
                type="text" 
                className="w-full h-10 rounded-xl border border-input bg-background px-3"
                value={formData.logo}
                onChange={e => updateField("logo", e.target.value)}
                placeholder="/images/apps/my-app/logo.png or https://..."
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Screenshots (URLs)</label>
                <Button type="button" variant="ghost" size="sm" onClick={() => addArrayItem("screenshots")}>
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
              {formData.screenshots?.map((url, i) => (
                <div key={`screen-${i}`} className="flex gap-2">
                  <input 
                    type="text" 
                    className="flex-1 h-10 rounded-xl border border-input bg-background px-3"
                    value={url}
                    onChange={e => updateArrayField("screenshots", i, e.target.value)}
                    placeholder="Screenshot URL"
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem("screenshots", i)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Key Features</label>
                <Button type="button" variant="ghost" size="sm" onClick={() => addArrayItem("features")}>
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
              {formData.features?.map((feat, i) => (
                <div key={`feat-${i}`} className="flex gap-2">
                  <input 
                    type="text" 
                    className="flex-1 h-10 rounded-xl border border-input bg-background px-3"
                    value={feat}
                    onChange={e => updateArrayField("features", i, e.target.value)}
                    placeholder="E.g. Fast and reliable"
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem("features", i)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">What's New in this version</label>
              <textarea 
                className="w-full rounded-xl border border-input bg-background px-3 py-2 min-h-[80px]"
                value={formData.whatsNew}
                onChange={e => updateField("whatsNew", e.target.value)}
              />
            </div>
          </section>

          {/* Links & Technical */}
          <section className="bg-card border border-border/50 rounded-2xl p-6 space-y-6">
            <h2 className="text-xl font-bold border-b border-border/50 pb-2 mb-4">Links & Technical Details</h2>
            
            <div className="space-y-3">
              <label className="text-sm font-medium">Platforms</label>
              <div className="flex flex-wrap gap-2">
                {['Android', 'Windows', 'Web', 'iOS', 'Mac', 'Linux'].map(platform => (
                  <label key={platform} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/50 cursor-pointer hover:bg-muted/50">
                    <input 
                      type="checkbox" 
                      checked={formData.platforms?.includes(platform)}
                      onChange={() => togglePlatform(platform)}
                      className="rounded text-primary focus:ring-primary"
                    />
                    <span className="text-sm">{platform}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Download Links</label>
                <Button type="button" variant="ghost" size="sm" onClick={addLink}>
                  <Plus className="w-4 h-4 mr-1" /> Add Link
                </Button>
              </div>
              {formData.links?.map((link, i) => (
                <div key={`link-${i}`} className="flex gap-2">
                  <select 
                    className="h-10 rounded-xl border border-input bg-background px-3 w-32"
                    value={link.type}
                    onChange={e => updateLink(i, e.target.value as any, link.url)}
                  >
                    <option value="playstore">Play Store</option>
                    <option value="apk">Direct APK</option>
                    <option value="web">Web App</option>
                    <option value="github">GitHub</option>
                  </select>
                  <input 
                    type="text" 
                    className="flex-1 h-10 rounded-xl border border-input bg-background px-3"
                    value={link.url}
                    onChange={e => updateLink(i, link.type, e.target.value)}
                    placeholder="https://"
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeLink(i)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">OS Requirement</label>
                <input 
                  type="text" 
                  className="w-full h-10 rounded-xl border border-input bg-background px-3"
                  value={formData.systemRequirements?.os}
                  onChange={e => updateSysReq("os", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Storage Req.</label>
                <input 
                  type="text" 
                  className="w-full h-10 rounded-xl border border-input bg-background px-3"
                  value={formData.systemRequirements?.storage}
                  onChange={e => updateSysReq("storage", e.target.value)}
                  placeholder="e.g. 15 MB"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">RAM Req. (Optional)</label>
                <input 
                  type="text" 
                  className="w-full h-10 rounded-xl border border-input bg-background px-3"
                  value={formData.systemRequirements?.ram}
                  onChange={e => updateSysReq("ram", e.target.value)}
                  placeholder="e.g. 1 GB"
                />
              </div>
            </div>

            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.isFeatured}
                  onChange={e => updateField("isFeatured", e.target.checked)}
                  className="rounded text-primary w-4 h-4"
                />
                <span className="text-sm font-medium">Featured App (Shows on Hero)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.isPopular}
                  onChange={e => updateField("isPopular", e.target.checked)}
                  className="rounded text-primary w-4 h-4"
                />
                <span className="text-sm font-medium">Popular App</span>
              </label>
            </div>
          </section>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-card border border-border/50 rounded-2xl p-6 flex flex-col h-[calc(100vh-120px)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Generated JSON</h2>
              <Button onClick={handleCopy} size="sm" variant={copied ? "default" : "outline"} className="shrink-0 gap-2">
                {copied ? <><CheckCircle2 className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy object</>}
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mb-4">
              Copy this configuration object and paste it into the <code>appsData</code> array inside <code>lib/data/apps.ts</code> to instantly add this app to the platform.
            </p>

            <div className="flex-1 bg-muted/50 rounded-xl overflow-auto border border-border/50 p-4">
              <pre className="text-xs font-mono text-foreground/80 whitespace-pre-wrap break-all">
{JSON.stringify({
  id: formData.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") || "new-app",
  slug: formData.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") || "new-app",
  name: formData.name,
  tagline: formData.tagline,
  description: formData.description,
  category: formData.category,
  version: formData.version,
  releaseDate: formData.releaseDate,
  platforms: formData.platforms,
  logo: formData.logo,
  screenshots: formData.screenshots?.filter(s => s.trim() !== ""),
  features: formData.features?.filter(f => f.trim() !== ""),
  whatsNew: formData.whatsNew,
  links: formData.links,
  systemRequirements: {
    os: formData.systemRequirements?.os,
    storage: formData.systemRequirements?.storage,
    ...(formData.systemRequirements?.ram ? { ram: formData.systemRequirements.ram } : {})
  },
  isFeatured: formData.isFeatured,
  isPopular: formData.isPopular
}, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
