import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, FileQuestion, Bug } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support Center",
  description: "Get help with our applications, read FAQs, or contact our support team.",
};

export default function SupportPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16 sm:py-24">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl sm:text-5xl font-space font-bold tracking-tight mb-6">How can we help?</h1>
        <p className="text-xl text-muted-foreground">
          Find answers in our documentation or reach out to our team for dedicated assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
        {[
          { icon: FileQuestion, title: "Knowledge Base", desc: "Browse guides, FAQs, and setup instructions." },
          { icon: Bug, title: "Report an Issue", desc: "Found a bug? Let us know so we can fix it." },
          { icon: MessageSquare, title: "Feature Request", desc: "Have an idea to make an app better? We're listening." },
          { icon: Mail, title: "Contact Sales", desc: "Questions about licensing or bulk purchases." }
        ].map((item, i) => (
          <div key={i} className="flex flex-col p-8 rounded-3xl border border-border/50 bg-card hover:border-primary/50 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p className="text-muted-foreground flex-1 mb-6">{item.desc}</p>
            <div className="font-medium text-sm text-primary flex items-center">
              Learn more <span className="ml-2">→</span>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto bg-muted/30 rounded-3xl p-8 sm:p-12 border border-border/50">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Send us a message</h2>
          <p className="text-muted-foreground">We typically respond within 24-48 hours.</p>
        </div>
        
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <input type="text" id="name" className="w-full flex h-10 rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input type="email" id="email" className="w-full flex h-10 rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="john@example.com" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="app" className="text-sm font-medium">Application (Optional)</label>
            <select id="app" className="w-full flex h-10 rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <option value="">General Inquiry</option>
              <option value="money-counter">Money Counter</option>
              <option value="pdf-tools">PDF Tools</option>
              <option value="emi-calculator">EMI Calculator</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">Message</label>
            <textarea id="message" rows={5} className="w-full flex rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="How can we help you?"></textarea>
          </div>
          
          <Button type="button" size="lg" className="w-full rounded-xl">Send Message</Button>
        </form>
      </div>
    </div>
  );
}
