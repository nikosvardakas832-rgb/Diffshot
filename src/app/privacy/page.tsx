import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import {
  Shield,
  Calendar,
  Eye,
  Target,
  Share2,
  Brain,
  Lock,
  Clock,
  UserCheck,
  Cookie,
  KeyRound,
  Mail,
  AlertTriangle,
} from "lucide-react";

export const metadata = {
  title: "Privacy Policy — Diffshot",
  description: "How Diffshot collects, uses, and protects your information.",
};

export default function PrivacyPage() {
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
                  <Shield className="h-10 w-10 text-[#B95126]" />
                </div>
                <h1 className="font-heading text-[42px] font-semibold leading-tight text-[#FAFAFA]">
                  Privacy Policy
                </h1>
              </div>
              <p className="mt-2 font-sans text-base font-normal text-[#A0A0A8]">
                How we protect and handle your data
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
              <span className="font-medium text-[#FAFAFA]">Diffshot</span>{" "}
              (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
              operates the Diffshot application and website at diffshot.app.
              This Privacy Policy explains how we collect, use, and protect your
              information when you use our service.
            </p>
            <p className="mt-4 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
              By using Diffshot, you agree to the collection and use of
              information as described in this policy.
            </p>
          </div>

          {/* Section 1: Information We Collect */}
          <section
            id="information-we-collect"
            className="mb-6 scroll-mt-32 rounded-xl border border-[#2A2A30] bg-[#1E1E24] p-8"
          >
            <h2 className="flex items-center gap-2.5 font-heading text-2xl font-semibold text-[#FAFAFA]">
              <Eye className="h-5 w-5 shrink-0 text-[#B95126]" />
              1. Information We Collect
            </h2>

            <h3 className="mt-6 mb-3 font-heading text-lg font-medium text-[#FAFAFA]">
              Account Information
            </h3>
            <p className="font-sans text-sm leading-[1.7] text-[#A0A0A8]">
              When you create an account, we collect:
            </p>
            <ul className="mt-3 space-y-2.5 pl-5">
              <li className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                Email address (via Clerk authentication)
              </li>
              <li className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                GitHub username and profile information (via GitHub OAuth)
              </li>
              <li className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                X (Twitter) handle (via X OAuth, when you choose to connect)
              </li>
            </ul>

            <h3 className="mt-6 mb-3 font-heading text-lg font-medium text-[#FAFAFA]">
              GitHub Data
            </h3>
            <p className="font-sans text-sm leading-[1.7] text-[#A0A0A8]">
              When you connect a GitHub repository, we access:
            </p>
            <ul className="mt-3 space-y-2.5 pl-5">
              <li className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                Repository names and metadata
              </li>
              <li className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                Commit messages
              </li>
              <li className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                File paths changed per commit
              </li>
              <li className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                Line addition/deletion counts per commit
              </li>
            </ul>

            {/* Important callout */}
            <div className="mt-4 rounded-r-lg border-l-[3px] border-[#E5484D] bg-[rgba(229,72,77,0.08)] p-4">
              <p className="font-sans text-sm font-medium leading-[1.7] text-[#FAFAFA]">
                We do NOT access or store your actual source code, file
                contents, environment variables, secrets, issues, pull requests,
                or collaborator information.
              </p>
            </div>

            <h3 className="mt-6 mb-3 font-heading text-lg font-medium text-[#FAFAFA]">
              X (Twitter) Data
            </h3>
            <p className="font-sans text-sm leading-[1.7] text-[#A0A0A8]">
              When you connect your X account, we access:
            </p>
            <ul className="mt-3 space-y-2.5 pl-5">
              <li className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                Write-only permission to post tweets on your behalf
              </li>
            </ul>

            <div className="mt-4 rounded-r-lg border-l-[3px] border-[#E5484D] bg-[rgba(229,72,77,0.08)] p-4">
              <p className="font-sans text-sm font-medium leading-[1.7] text-[#FAFAFA]">
                We do NOT read your timeline, direct messages, followers,
                following lists, or existing tweets.
              </p>
            </div>

            <h3 className="mt-6 mb-3 font-heading text-lg font-medium text-[#FAFAFA]">
              Usage Data
            </h3>
            <p className="font-sans text-sm leading-[1.7] text-[#A0A0A8]">
              We collect basic usage information:
            </p>
            <ul className="mt-3 space-y-2.5 pl-5">
              <li className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                Number of generations used per month
              </li>
              <li className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                Draft creation and publishing timestamps
              </li>
              <li className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                Account plan type (free or pro)
              </li>
            </ul>

            <h3 className="mt-6 mb-3 font-heading text-lg font-medium text-[#FAFAFA]">
              Payment Information
            </h3>
            <p className="font-sans text-sm leading-[1.7] text-[#A0A0A8]">
              If you upgrade to Pro, payment is processed by Polar.sh, who acts
              as our Merchant of Record. Polar handles all payment processing,
              VAT collection, tax compliance, and invoicing under their own
              privacy policy. We do not store your credit card number, bank
              account details, or other sensitive financial information.
            </p>
          </section>

          {/* Section 2: How We Use Your Information */}
          <section
            id="how-we-use"
            className="mb-6 scroll-mt-32 rounded-xl border border-[#2A2A30] bg-[#1E1E24] p-8"
          >
            <h2 className="flex items-center gap-2.5 font-heading text-2xl font-semibold text-[#FAFAFA]">
              <Target className="h-5 w-5 shrink-0 text-[#B95126]" />
              2. How We Use Your Information
            </h2>
            <p className="mt-4 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
              We use the collected information to:
            </p>
            <ul className="mt-3 space-y-2.5 pl-5">
              {[
                "Authenticate your account and manage your session",
                "Fetch commit data from your selected GitHub repositories",
                "Generate visual changelog drafts using AI (Anthropic Claude API)",
                "Publish tweets to X on your behalf when you choose to",
                "Track your generation usage for plan limits",
                "Process payments for Pro subscriptions",
                "Send essential service communications (account issues, critical updates)",
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
              We do <span className="font-medium text-[#FAFAFA]">not</span> use
              your information to:
            </p>
            <ul className="mt-3 space-y-2.5 pl-5">
              {[
                "Sell or rent your data to third parties",
                "Send marketing emails (unless you explicitly opt in)",
                "Train AI models on your data",
                "Track you across other websites",
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

          {/* Section 3: Third-Party Services */}
          <section
            id="third-party"
            className="mb-6 scroll-mt-32 rounded-xl border border-[#2A2A30] bg-[#1E1E24] p-8"
          >
            <h2 className="flex items-center gap-2.5 font-heading text-2xl font-semibold text-[#FAFAFA]">
              <Share2 className="h-5 w-5 shrink-0 text-[#B95126]" />
              3. Third-Party Services
            </h2>
            <p className="mt-4 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
              Diffshot uses the following third-party services that may process
              your data:
            </p>

            <div className="mt-6 overflow-hidden rounded-lg border border-[#2A2A30]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#2A2A30]">
                    <th className="px-4 py-3 text-left font-sans text-[13px] font-medium text-[#FAFAFA]">
                      Service
                    </th>
                    <th className="px-4 py-3 text-left font-sans text-[13px] font-medium text-[#FAFAFA]">
                      Purpose
                    </th>
                    <th className="px-4 py-3 text-left font-sans text-[13px] font-medium text-[#FAFAFA]">
                      Data Shared
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Clerk", "Authentication", "Email, GitHub profile"],
                    [
                      "Convex",
                      "Database and backend",
                      "Account data, drafts, commit metadata",
                    ],
                    [
                      "GitHub API",
                      "Fetching commit data",
                      "OAuth token (to read your repos)",
                    ],
                    [
                      "X (Twitter) API",
                      "Publishing tweets",
                      "OAuth token (to post on your behalf)",
                    ],
                    [
                      "Anthropic Claude API",
                      "AI content generation",
                      "Commit messages, file paths, line stats",
                    ],
                    [
                      "Polar.sh",
                      "Payment processing (MoR)",
                      "Payment method, billing info",
                    ],
                    ["Vercel", "Hosting", "Standard server logs"],
                  ].map(([service, purpose, data]) => (
                    <tr
                      key={service}
                      className="border-t border-[#2A2A30] transition-colors hover:bg-[#2A2A30]/30"
                    >
                      <td className="px-4 py-3 font-mono text-xs text-[#A0A0A8]">
                        {service}
                      </td>
                      <td className="px-4 py-3 font-sans text-[13px] text-[#A0A0A8]">
                        {purpose}
                      </td>
                      <td className="px-4 py-3 font-sans text-[13px] text-[#A0A0A8]">
                        {data}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
              Each third-party service operates under its own privacy policy. We
              encourage you to review their policies.
            </p>
          </section>

          {/* Section 4: Data Sent to AI */}
          <section
            id="data-sent-to-ai"
            className="mb-6 scroll-mt-32 rounded-xl border border-[#2A2A30] bg-[#1E1E24] p-8"
          >
            <h2 className="flex items-center gap-2.5 font-heading text-2xl font-semibold text-[#FAFAFA]">
              <Brain className="h-5 w-5 shrink-0 text-[#B95126]" />
              4. Data Sent to AI
            </h2>
            <p className="mt-4 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
              When generating visual changelog drafts, we send the following
              data to the Anthropic Claude API:
            </p>
            <ul className="mt-3 space-y-2.5 pl-5">
              {[
                "Commit messages from your selected repository",
                "File paths changed in each commit",
                "Line addition/deletion statistics",
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
            <div className="mt-4 rounded-r-lg border-l-[3px] border-[#E5484D] bg-[rgba(229,72,77,0.08)] p-4">
              <p className="font-sans text-sm font-medium leading-[1.7] text-[#FAFAFA]">
                We do NOT send your actual source code to the AI. The AI
                generates tweet text and visual card descriptions based on
                commit metadata only.
              </p>
            </div>
          </section>

          {/* Section 5: Data Storage and Security */}
          <section
            id="data-storage"
            className="mb-6 scroll-mt-32 rounded-xl border border-[#2A2A30] bg-[#1E1E24] p-8"
          >
            <h2 className="flex items-center gap-2.5 font-heading text-2xl font-semibold text-[#FAFAFA]">
              <Lock className="h-5 w-5 shrink-0 text-[#B95126]" />
              5. Data Storage and Security
            </h2>
            <ul className="mt-4 space-y-2.5 pl-5">
              {[
                "Your data is stored on Convex\u2019s secure cloud infrastructure",
                "OAuth tokens are stored in our database (encryption will be implemented before public launch)",
                "We use HTTPS for all data transmission",
                "We do not store your GitHub or X passwords \u2014 authentication is handled via OAuth tokens",
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

          {/* Section 6: Data Retention */}
          <section
            id="data-retention"
            className="mb-6 scroll-mt-32 rounded-xl border border-[#2A2A30] bg-[#1E1E24] p-8"
          >
            <h2 className="flex items-center gap-2.5 font-heading text-2xl font-semibold text-[#FAFAFA]">
              <Clock className="h-5 w-5 shrink-0 text-[#B95126]" />
              6. Data Retention
            </h2>
            <ul className="mt-4 space-y-2.5 pl-5">
              {[
                "Your account data is retained as long as your account is active",
                "Generated drafts and published tweet records are retained as long as your account exists",
                "Commit metadata is retained for the purpose of generating drafts",
                "If you delete your account, we will delete your data within 30 days",
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

          {/* Section 7: Your Rights */}
          <section
            id="your-rights"
            className="mb-6 scroll-mt-32 rounded-xl border border-[#2A2A30] bg-[#1E1E24] p-8"
          >
            <h2 className="flex items-center gap-2.5 font-heading text-2xl font-semibold text-[#FAFAFA]">
              <UserCheck className="h-5 w-5 shrink-0 text-[#B95126]" />
              7. Your Rights
            </h2>
            <p className="mt-4 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
              Under GDPR (as we operate from the European Union), you have the
              right to:
            </p>
            <ul className="mt-3 space-y-2.5 pl-5">
              {[
                { bold: "Access", rest: "your personal data" },
                { bold: "Correct", rest: "inaccurate data" },
                {
                  bold: "Delete",
                  rest: "your account and associated data",
                },
                {
                  bold: "Export",
                  rest: "your data in a portable format",
                },
                { bold: "Withdraw consent", rest: "at any time" },
                { bold: "Object", rest: "to data processing" },
              ].map((item) => (
                <li
                  key={item.bold}
                  className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]"
                >
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                  <span>
                    <span className="font-medium text-[#FAFAFA]">
                      {item.bold}
                    </span>{" "}
                    {item.rest}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
              To exercise any of these rights, contact us at{" "}
              <a
                href="mailto:legal@diffshot.app"
                className="text-[#57C5B6] hover:underline"
              >
                legal@diffshot.app
              </a>
              .
            </p>
          </section>

          {/* Section 8: Cookies */}
          <section
            id="cookies"
            className="mb-6 scroll-mt-32 rounded-xl border border-[#2A2A30] bg-[#1E1E24] p-8"
          >
            <h2 className="flex items-center gap-2.5 font-heading text-2xl font-semibold text-[#FAFAFA]">
              <Cookie className="h-5 w-5 shrink-0 text-[#B95126]" />
              8. Cookies
            </h2>
            <p className="mt-4 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
              Diffshot uses only essential cookies required for authentication
              and session management. We do not use advertising cookies, tracking
              cookies, or analytics cookies.
            </p>
          </section>

          {/* Section 9: Children's Privacy */}
          <section className="mb-6 scroll-mt-32 rounded-xl border border-[#2A2A30] bg-[#1E1E24] p-8">
            <h2 className="flex items-center gap-2.5 font-heading text-2xl font-semibold text-[#FAFAFA]">
              <AlertTriangle className="h-5 w-5 shrink-0 text-[#B95126]" />
              9. Children&apos;s Privacy
            </h2>
            <p className="mt-4 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
              Diffshot is not intended for use by anyone under the age of 16. We
              do not knowingly collect personal information from children.
            </p>
          </section>

          {/* Section 10: Revoking Access */}
          <section
            id="revoking-access"
            className="mb-6 scroll-mt-32 rounded-xl border border-[#2A2A30] bg-[#1E1E24] p-8"
          >
            <h2 className="flex items-center gap-2.5 font-heading text-2xl font-semibold text-[#FAFAFA]">
              <KeyRound className="h-5 w-5 shrink-0 text-[#B95126]" />
              10. Revoking Access
            </h2>
            <p className="mt-4 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
              You can revoke Diffshot&apos;s access at any time:
            </p>
            <ul className="mt-3 space-y-2.5 pl-5">
              <li className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                <span>
                  <span className="font-medium text-[#FAFAFA]">GitHub:</span> Go
                  to GitHub Settings → Applications → Authorized OAuth Apps →
                  Revoke Diffshot
                </span>
              </li>
              <li className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                <span>
                  <span className="font-medium text-[#FAFAFA]">
                    X (Twitter):
                  </span>{" "}
                  Go to X Settings → Security and account access → Apps and
                  sessions → Revoke Diffshot
                </span>
              </li>
              <li className="flex items-start gap-2.5 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#B95126]" />
                <span>
                  <span className="font-medium text-[#FAFAFA]">
                    Account deletion:
                  </span>{" "}
                  Contact us at{" "}
                  <a
                    href="mailto:legal@diffshot.app"
                    className="text-[#57C5B6] hover:underline"
                  >
                    legal@diffshot.app
                  </a>{" "}
                  or use the account settings page
                </span>
              </li>
            </ul>
          </section>

          {/* Section 11: Changes to This Policy */}
          <section className="mb-6 scroll-mt-32 rounded-xl border border-[#2A2A30] bg-[#1E1E24] p-8">
            <h2 className="flex items-center gap-2.5 font-heading text-2xl font-semibold text-[#FAFAFA]">
              <AlertTriangle className="h-5 w-5 shrink-0 text-[#B95126]" />
              11. Changes to This Policy
            </h2>
            <p className="mt-4 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
              We may update this Privacy Policy from time to time. We will
              notify you of significant changes by posting a notice on our
              website. Your continued use of Diffshot after changes constitutes
              acceptance of the updated policy.
            </p>
          </section>

          {/* Section 12: Contact */}
          <section
            id="contact"
            className="mb-6 scroll-mt-32 rounded-xl border border-[#2A2A30] bg-[#1E1E24] p-8"
          >
            <h2 className="flex items-center gap-2.5 font-heading text-2xl font-semibold text-[#FAFAFA]">
              <Mail className="h-5 w-5 shrink-0 text-[#B95126]" />
              12. Contact
            </h2>
            <p className="mt-4 font-sans text-sm leading-[1.7] text-[#A0A0A8]">
              If you have questions about this Privacy Policy, contact us at:
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
