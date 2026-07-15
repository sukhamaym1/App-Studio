import { appsData } from "@/lib/data/apps";
import { AppCard } from "@/components/ui/AppCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Applications",
  description: "Browse our complete catalog of mobile and web applications.",
};

export default function AppsPage() {
  const categories = Array.from(new Set(appsData.map(app => app.category)));

  return (
    <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-24">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl sm:text-5xl font-space font-bold tracking-tight mb-6">Our Applications</h1>
        <p className="text-xl text-muted-foreground">
          Explore our complete suite of tools built to enhance productivity, manage finances, and simplify everyday tasks.
        </p>
      </div>

      <div className="flex flex-col space-y-24">
        {categories.map(category => {
          const categoryApps = appsData.filter(app => app.category === category);
          
          return (
            <section key={category}>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold">{category}</h2>
                <div className="h-px bg-border flex-1"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {categoryApps.map(app => (
                  <AppCard key={app.id} app={app} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
