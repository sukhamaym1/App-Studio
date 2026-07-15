import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using AppStudio applications and services.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16 sm:py-24">
      <h1 className="text-4xl font-space font-bold tracking-tight mb-4">Terms & Conditions</h1>
      <p className="text-muted-foreground mb-12">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h2>1. Agreement to Terms</h2>
        <p>
          By accessing our website and using our applications, you agree to be bound by these Terms and Conditions 
          and agree that you are responsible for the agreement with any applicable local laws. 
          If you disagree with any of these terms, you are prohibited from accessing this site or using our software.
        </p>

        <h2>2. Use License</h2>
        <p>
          Permission is granted to temporarily download one copy of the materials (information or software) 
          on AppStudio&apos;s website for personal, non-commercial transitory viewing only.
        </p>
        <p>Under this license you may not:</p>
        <ul>
          <li>Modify or copy the materials;</li>
          <li>Use the materials for any commercial purpose, or for any public display;</li>
          <li>Attempt to reverse engineer any software contained on AppStudio&apos;s website;</li>
          <li>Remove any copyright or other proprietary notations from the materials; or</li>
          <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server.</li>
        </ul>

        <h2>3. Disclaimer</h2>
        <p>
          The materials on AppStudio&apos;s website and within its applications are provided on an &apos;as is&apos; basis. 
          AppStudio makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties 
          including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, 
          or non-infringement of intellectual property or other violation of rights.
        </p>

        <h2>4. Limitations</h2>
        <p>
          In no event shall AppStudio or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on AppStudio&apos;s website, even if AppStudio or an authorized representative has been notified orally or in writing of the possibility of such damage.
        </p>

        <h2>5. Revisions and Errata</h2>
        <p>
          The materials appearing on AppStudio&apos;s website could include technical, typographical, or photographic errors. 
          AppStudio does not warrant that any of the materials on its website are accurate, complete, or current. 
          AppStudio may make changes to the materials contained on its website at any time without notice.
        </p>

        <h2>6. Links</h2>
        <p>
          AppStudio has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by AppStudio of the site. Use of any such linked website is at the user&apos;s own risk.
        </p>

        <h2>7. Governing Law</h2>
        <p>
          Any claim relating to AppStudio&apos;s website shall be governed by the laws of the jurisdiction without regard to its conflict of law provisions.
        </p>
      </div>
    </div>
  );
}
