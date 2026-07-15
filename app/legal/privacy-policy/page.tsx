import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for AppStudio applications and services.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-16 sm:py-24">
      <h1 className="text-4xl font-space font-bold tracking-tight mb-4">Privacy Policy</h1>
      <p className="text-muted-foreground mb-12">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h2>1. Introduction</h2>
        <p>
          Welcome to AppStudio. We respect your privacy and are committed to protecting your personal data. 
          This privacy policy will inform you about how we look after your personal data when you visit our website 
          or use our applications, and tell you about your privacy rights and how the law protects you.
        </p>

        <h2>2. Data We Collect</h2>
        <p>
          Most of our applications are designed to work completely offline and store data locally on your device. 
          We do not collect personal data from these offline applications unless you explicitly choose to use a cloud-sync feature (where applicable).
        </p>
        <p>When you visit our website or contact support, we may collect:</p>
        <ul>
          <li><strong>Identity Data:</strong> Name, username, or similar identifier.</li>
          <li><strong>Contact Data:</strong> Email address.</li>
          <li><strong>Technical Data:</strong> IP address, browser type and version, time zone setting, operating system.</li>
          <li><strong>Usage Data:</strong> Information about how you use our website, products, and services.</li>
        </ul>

        <h2>3. How We Use Your Data</h2>
        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
        <ul>
          <li>To provide customer support and respond to your inquiries.</li>
          <li>To improve our website, applications, products, and services.</li>
          <li>To notify you about changes to our terms or privacy policy.</li>
        </ul>

        <h2>4. Data Security</h2>
        <p>
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost, 
          used, or accessed in an unauthorized way, altered, or disclosed.
        </p>

        <h2>5. Your Legal Rights</h2>
        <p>
          Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data, and (where the lawful ground of processing is consent) to withdraw consent.
        </p>

        <h2>6. Contact Us</h2>
        <p>
          If you have any questions about this privacy policy or our privacy practices, please contact us via our Support Center.
        </p>
      </div>
    </div>
  );
}
