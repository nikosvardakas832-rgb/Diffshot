import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import {
  FileText,
  Calendar,
  Globe,
  UserPlus,
  ShieldCheck,
  Layers,
  CreditCard,
  Sparkles,
  GitBranch,
  Copyright,
  Scale,
  UserX,
  AlertTriangle,
  Gavel,
  Puzzle,
  Mail,
  Lock,
} from "lucide-react";

export const metadata = {
  title: "Terms & Conditions — Diffshot",
  description:
    "Terms and conditions governing your use of the Diffshot service.",
};

export default function TermsPage() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -bottom-[200px] -left-[150px] h-[700px] w-[700px] rounded-full bg-[#B95126]/[0.07] blur-[200px]" />
        <div className="absolute -bottom-[100px] -left-[50px] h-[400px] w-[400px] rounded-full bg-[#B95126]/[0.05] blur-[150px]" />
        <div className="absolute -bottom-[200px] -right-[150px] h-[600px] w-[600px] rounded-full bg-[#B95126]/[0.05] blur-[200px]" />
      </div>

      <Navbar />

      <div className="relative z-10">
        <main className="mx-auto max-w-[768px] px-6 pt-8 pb-20">
          {/* Back link */}
          <Link
            href="/"
            className="mb-6 inline-block font-sans text-sm text-[#57C5B6] transition-colors hover:text-[#57C5B6]/80"
          >
            ← Back to Home
          </Link>

          {/* Header area */}
          <div className="relative mb-10">
            {/* Radial glow behind header */}
            <div className="pointer-events-none absolute -top-[100px] left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(185,81,38,0.08)_0%,transparent_70%)]" />

            <div className="relative">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[rgba(185,81,38,0.15)]">
                  <FileText className="h-10 w-10 text-[#B95126]" />
                </div>
                <h1 className="font-heading text-[42px] font-semibold leading-tight text-[#FAFAFA]">
                  Terms &amp; Conditions
                </h1>
              </div>
              <p className="mt-2 font-sans text-base font-normal text-[#A0A0A8]">
                What you agree to when using our service
              </p>
              <div className="mt-3 flex items-center gap-2">
                <Calendar className="h-3 w-3 text-[#A0A0A8]" />
                <span className="font-mono text-xs text-[#A0A0A8]">
                  Last updated: February 21, 2026
                </span>
              </div>
            </div>
          </div>

          {/* Intro text */}
          <div className="mb-6 rounded-xl border border-[#2A2A30] bg-[#1E1E24] p-8">
            <p className="font-sans text-sm leading-[1.7] text-[#A0A0A8]">
              These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your use
              of the Diffshot application and website at diffshot.app
              (&ldquo;Service&rdquo;), operated by [Business Name — to be
              updated upon registration] (&ldquo;we,&rdquo; &ldquo;us,&rdquo;
              or &ldquo;our&rdquo;), based in Thessaloniki, Greece.
            </p>
            <p className="mt-4 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
              By creating an account or using Diffshot, you agree to these
              Terms. If you do not agree, do not use the Service.
            </p>
          </div>

          {/* Section 1: Service Description */}
          <section
            id="service-description"
            className="mb-6 scroll-mt-32 rounded-xl border border-[#2A2A30] bg-[#1E1E24] p-8"
          >
            <h2 className="flex items-center gap-2.5 font-heading text-2xl font-semibold text-[#FAFAFA]">
              <Globe className="h-5 w-5 shrink-0 text-[#B95126]" />
              1. Service Description
            </h2>
            <p className="mt-4 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
              Diffshot is a developer tool that connects to your GitHub
              repositories, analyzes commit metadata (messages, file paths, line
              change statistics), generates visual changelog content using AI,
              and allows you to publish that content to X (Twitter). Diffshot
              does not access or store your actual source code.
            </p>
          </section>

          {/* Section 2: Account Registration */}
          <section
            id="account-registration"
            className="mb-6 scroll-mt-32 rounded-xl border border-[#2A2A30] bg-[#1E1E24] p-8"
          >
            <h2 className="flex items-center gap-2.5 font-heading text-2xl font-semibold text-[#FAFAFA]">
              <UserPlus className="h-5 w-5 shrink-0 text-[#B95126]" />
              2. Account Registration
            </h2>
            <ul className="mt-4 space-y-2.5 pl-5">
              {[
                "You must provide accurate information when creating an account",
                "You are responsible for maintaining the security of your account credentials",
                "You must be at least 16 years old to use the Service",
                "One person may not maintain more than one free account",
                "You are responsible for all activity that occurs under your account",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]"
                >
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3: Acceptable Use */}
          <section
            id="acceptable-use"
            className="mb-6 scroll-mt-32 rounded-xl border border-[#2A2A30] bg-[#1E1E24] p-8"
          >
            <h2 className="flex items-center gap-2.5 font-heading text-2xl font-semibold text-[#FAFAFA]">
              <ShieldCheck className="h-5 w-5 shrink-0 text-[#B95126]" />
              3. Acceptable Use
            </h2>
            <p className="mt-4 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
              You agree NOT to use Diffshot to:
            </p>
            <ul className="mt-3 space-y-2.5 pl-5">
              {[
                "Post misleading, false, or deceptive content to X",
                "Spam, harass, or abuse other users on any platform",
                "Impersonate another person or entity",
                "Violate any applicable law or regulation",
                "Violate X (Twitter) or GitHub\u2019s terms of service",
                "Attempt to reverse-engineer, modify, or exploit the Service",
                "Use automated scripts to access the Service beyond normal usage",
                "Resell or redistribute the Service without permission",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]"
                >
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
              We reserve the right to suspend or terminate accounts that violate
              these terms.
            </p>
          </section>

          {/* Section 4: Free and Pro Plans */}
          <section
            id="free-and-pro-plans"
            className="mb-6 scroll-mt-32 rounded-xl border border-[#2A2A30] bg-[#1E1E24] p-8"
          >
            <h2 className="flex items-center gap-2.5 font-heading text-2xl font-semibold text-[#FAFAFA]">
              <Layers className="h-5 w-5 shrink-0 text-[#B95126]" />
              4. Free and Pro Plans
            </h2>

            <h3 className="mt-6 mb-3 font-heading text-lg font-medium text-[#FAFAFA]">
              Free Plan
            </h3>
            <ul className="space-y-2.5 pl-5">
              {[
                "3 visual changelog generations per month",
                "Unlimited repository connections",
                "All 3 visual card types",
                "\u201CMade with Diffshot\u201D watermark on generated visual cards",
                "Full publish-to-X functionality",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]"
                >
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-6 mb-3 font-heading text-lg font-medium text-[#FAFAFA]">
              Pro Plan ($9/month)
            </h3>
            <ul className="space-y-2.5 pl-5">
              {[
                "50 visual changelog generations per month",
                "Unlimited repository connections",
                "All 3 visual card types",
                "No watermark on generated visual cards",
                "Priority support",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]"
                >
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
              We reserve the right to modify plan features and pricing with 30
              days notice to existing subscribers.
            </p>
          </section>

          {/* Section 5: Payments and Billing */}
          <section
            id="payments-and-billing"
            className="mb-6 scroll-mt-32 rounded-xl border border-[#2A2A30] bg-[#1E1E24] p-8"
          >
            <h2 className="flex items-center gap-2.5 font-heading text-2xl font-semibold text-[#FAFAFA]">
              <CreditCard className="h-5 w-5 shrink-0 text-[#B95126]" />
              5. Payments and Billing
            </h2>
            <ul className="mt-4 space-y-2.5 pl-5">
              {[
                "Pro subscriptions are billed monthly via Polar.sh, who acts as our Merchant of Record",
                "Polar handles all payment processing, VAT, tax compliance, and invoicing",
                "Payments are non-refundable except where required by law",
                "You may cancel your subscription at any time; access continues until the end of the current billing period",
                "If payment fails, we may downgrade your account to the Free plan after a 7-day grace period",
                "Prices are in USD and exclude any applicable taxes",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]"
                >
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Section 6: Generated Content */}
          <section
            id="generated-content"
            className="mb-6 scroll-mt-32 rounded-xl border border-[#2A2A30] bg-[#1E1E24] p-8"
          >
            <h2 className="flex items-center gap-2.5 font-heading text-2xl font-semibold text-[#FAFAFA]">
              <Sparkles className="h-5 w-5 shrink-0 text-[#B95126]" />
              6. Generated Content
            </h2>

            <h3 className="mt-6 mb-3 font-heading text-lg font-medium text-[#FAFAFA]">
              Ownership
            </h3>
            <ul className="space-y-2.5 pl-5">
              {[
                "You own the content generated by Diffshot for your account (tweet text and visual changelog cards)",
                "You are responsible for reviewing and approving all content before publishing to X",
                "Diffshot does not claim ownership of your generated content",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]"
                >
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-6 mb-3 font-heading text-lg font-medium text-[#FAFAFA]">
              Accuracy
            </h3>
            <ul className="space-y-2.5 pl-5">
              {[
                "Generated content is produced by AI based on your commit metadata",
                "We do not guarantee the accuracy, completeness, or appropriateness of generated content",
                "You are solely responsible for content you choose to publish to X",
                "We recommend reviewing all drafts before publishing",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]"
                >
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-6 mb-3 font-heading text-lg font-medium text-[#FAFAFA]">
              Visual Cards
            </h3>
            <ul className="space-y-2.5 pl-5">
              {[
                "\u201CMade with Diffshot\u201D watermark is included on Free plan visual cards",
                "Pro plan visual cards do not include a watermark",
                "You may use published visual cards for any lawful purpose",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]"
                >
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Section 7: GitHub and X Integration */}
          <section
            id="github-and-x-integration"
            className="mb-6 scroll-mt-32 rounded-xl border border-[#2A2A30] bg-[#1E1E24] p-8"
          >
            <h2 className="flex items-center gap-2.5 font-heading text-2xl font-semibold text-[#FAFAFA]">
              <GitBranch className="h-5 w-5 shrink-0 text-[#B95126]" />
              7. GitHub and X Integration
            </h2>

            <h3 className="mt-6 mb-3 font-heading text-lg font-medium text-[#FAFAFA]">
              GitHub
            </h3>
            <ul className="space-y-2.5 pl-5">
              <li className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                <span>
                  Diffshot accesses your GitHub data via OAuth with the{" "}
                  <code className="rounded bg-[#2A2A30] px-1.5 py-0.5 font-mono text-xs text-[#FAFAFA]">
                    repo
                  </code>{" "}
                  and{" "}
                  <code className="rounded bg-[#2A2A30] px-1.5 py-0.5 font-mono text-xs text-[#FAFAFA]">
                    read:user
                  </code>{" "}
                  scopes
                </span>
              </li>
              {[
                "We only read commit metadata (messages, file paths, line statistics) \u2014 not source code",
                "You can revoke access at any time via GitHub Settings",
                "We are not responsible for changes to the GitHub API that may affect the Service",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]"
                >
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-6 mb-3 font-heading text-lg font-medium text-[#FAFAFA]">
              X (Twitter)
            </h3>
            <ul className="space-y-2.5 pl-5">
              {[
                "Diffshot posts to X on your behalf using OAuth 2.0 with write-only access",
                "We do not read your timeline, DMs, followers, or existing tweets",
                "You can revoke access at any time via X Settings",
                "You are responsible for ensuring published content complies with X\u2019s terms of service",
                "We are not responsible for X suspending or restricting your account due to content you publish",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]"
                >
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Section 8: Intellectual Property */}
          <section
            id="intellectual-property"
            className="mb-6 scroll-mt-32 rounded-xl border border-[#2A2A30] bg-[#1E1E24] p-8"
          >
            <h2 className="flex items-center gap-2.5 font-heading text-2xl font-semibold text-[#FAFAFA]">
              <Copyright className="h-5 w-5 shrink-0 text-[#B95126]" />
              8. Intellectual Property
            </h2>
            <ul className="mt-4 space-y-2.5 pl-5">
              {[
                "The Diffshot name, logo, visual card designs, and website are our intellectual property",
                "The underlying card templates and design system are proprietary",
                "You may not copy, reproduce, or create derivative works of the Diffshot card templates for use outside the Service",
                "Open-source libraries used in the Service retain their respective licenses",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]"
                >
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Section 9: Privacy */}
          <section className="mb-6 scroll-mt-32 rounded-xl border border-[#2A2A30] bg-[#1E1E24] p-8">
            <h2 className="flex items-center gap-2.5 font-heading text-2xl font-semibold text-[#FAFAFA]">
              <Lock className="h-5 w-5 shrink-0 text-[#B95126]" />
              9. Privacy
            </h2>
            <p className="mt-4 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
              Your use of Diffshot is also governed by our{" "}
              <Link
                href="/privacy"
                className="text-[#57C5B6] hover:underline"
              >
                Privacy Policy
              </Link>
              . Please review it for details on how we collect, use, and protect
              your data.
            </p>
          </section>

          {/* Section 10: Limitation of Liability */}
          <section
            id="limitation-of-liability"
            className="mb-6 scroll-mt-32 rounded-xl border border-[#2A2A30] bg-[#1E1E24] p-8"
          >
            <h2 className="flex items-center gap-2.5 font-heading text-2xl font-semibold text-[#FAFAFA]">
              <Scale className="h-5 w-5 shrink-0 text-[#B95126]" />
              10. Limitation of Liability
            </h2>
            <p className="mt-4 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
              To the maximum extent permitted by law:
            </p>
            <ul className="mt-3 space-y-2.5 pl-5">
              {[
                "Diffshot is provided \u201Cas is\u201D without warranties of any kind, express or implied",
                "We do not warrant that the Service will be uninterrupted, error-free, or secure",
                "We are not liable for any indirect, incidental, special, consequential, or punitive damages",
                "Our total liability for any claim related to the Service shall not exceed the amount you paid us in the 12 months preceding the claim",
                "We are not responsible for any consequences of content you publish to X using the Service",
                "We are not responsible for any changes to third-party APIs (GitHub, X, Anthropic) that affect the Service",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]"
                >
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Section 11: Account Termination */}
          <section
            id="account-termination"
            className="mb-6 scroll-mt-32 rounded-xl border border-[#2A2A30] bg-[#1E1E24] p-8"
          >
            <h2 className="flex items-center gap-2.5 font-heading text-2xl font-semibold text-[#FAFAFA]">
              <UserX className="h-5 w-5 shrink-0 text-[#B95126]" />
              11. Account Termination
            </h2>

            <h3 className="mt-6 mb-3 font-heading text-lg font-medium text-[#FAFAFA]">
              By You
            </h3>
            <ul className="space-y-2.5 pl-5">
              <li className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                <span>
                  You may delete your account at any time via account settings or
                  by contacting{" "}
                  <a
                    href="mailto:legal@diffshot.app"
                    className="text-[#57C5B6] hover:underline"
                  >
                    legal@diffshot.app
                  </a>
                </span>
              </li>
              {[
                "Upon deletion, your data will be removed within 30 days",
                "Active Pro subscriptions will be cancelled with no refund for the remaining billing period",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]"
                >
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-6 mb-3 font-heading text-lg font-medium text-[#FAFAFA]">
              By Us
            </h3>
            <ul className="space-y-2.5 pl-5">
              {[
                "We may suspend or terminate your account for violation of these Terms",
                "We may terminate the Service entirely with 30 days notice to all users",
                "In case of Service termination, Pro users will receive a prorated refund for unused time",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]"
                >
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Section 12: Changes to These Terms */}
          <section className="mb-6 scroll-mt-32 rounded-xl border border-[#2A2A30] bg-[#1E1E24] p-8">
            <h2 className="flex items-center gap-2.5 font-heading text-2xl font-semibold text-[#FAFAFA]">
              <AlertTriangle className="h-5 w-5 shrink-0 text-[#B95126]" />
              12. Changes to These Terms
            </h2>
            <p className="mt-4 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
              We may update these Terms from time to time. We will notify you of
              significant changes by posting a notice on our website or sending
              an email. Your continued use of Diffshot after changes constitutes
              acceptance of the updated Terms. If you disagree with changes, you
              may delete your account.
            </p>
          </section>

          {/* Section 13: Governing Law */}
          <section className="mb-6 scroll-mt-32 rounded-xl border border-[#2A2A30] bg-[#1E1E24] p-8">
            <h2 className="flex items-center gap-2.5 font-heading text-2xl font-semibold text-[#FAFAFA]">
              <Gavel className="h-5 w-5 shrink-0 text-[#B95126]" />
              13. Governing Law
            </h2>
            <p className="mt-4 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
              These Terms are governed by the laws of Greece and the European
              Union. Any disputes will be resolved in the courts of
              Thessaloniki, Greece. Nothing in these Terms limits your rights
              under mandatory consumer protection laws in your jurisdiction.
            </p>
          </section>

          {/* Section 14: Severability */}
          <section className="mb-6 scroll-mt-32 rounded-xl border border-[#2A2A30] bg-[#1E1E24] p-8">
            <h2 className="flex items-center gap-2.5 font-heading text-2xl font-semibold text-[#FAFAFA]">
              <Puzzle className="h-5 w-5 shrink-0 text-[#B95126]" />
              14. Severability
            </h2>
            <p className="mt-4 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
              If any provision of these Terms is found unenforceable, the
              remaining provisions will continue in effect.
            </p>
          </section>

          {/* Section 15: Contact */}
          <section
            id="contact"
            className="mb-6 scroll-mt-32 rounded-xl border border-[#2A2A30] bg-[#1E1E24] p-8"
          >
            <h2 className="flex items-center gap-2.5 font-heading text-2xl font-semibold text-[#FAFAFA]">
              <Mail className="h-5 w-5 shrink-0 text-[#B95126]" />
              15. Contact
            </h2>
            <p className="mt-4 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
              If you have questions about these Terms, contact us at:
            </p>
            <div className="mt-4 space-y-1 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
              <p>
                <span className="font-medium text-[#FAFAFA]">Email:</span>{" "}
                <a
                  href="mailto:legal@diffshot.app"
                  className="text-[#57C5B6] hover:underline"
                >
                  legal@diffshot.app
                </a>
              </p>
              <p>
                <span className="font-medium text-[#FAFAFA]">Operator:</span>{" "}
                Nick Vardakas (Sole Proprietor)
              </p>
              <p>
                <span className="font-medium text-[#FAFAFA]">Location:</span>{" "}
                Thessaloniki, Greece
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
