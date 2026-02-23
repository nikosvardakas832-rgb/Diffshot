"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is my code or private data ever exposed?",
    answer:
      "No. Diffshot reads your commit messages, file paths, and line change stats \u2014 not your actual source code. The visual cards show simplified, AI-generated representations of your changes, not raw code from your repo. Your private code never leaves GitHub.",
  },
  {
    question: "How is this different from just using ChatGPT to write tweets?",
    answer:
      "ChatGPT doesn\u2019t know what you shipped. You\u2019d have to explain your commits, paste diffs, describe the context, then copy the output, create an image manually, and post it yourself. Diffshot reads your commits directly, generates both the tweet text AND a branded visual card, and publishes to X in one click. It\u2019s the difference between a tool and a workflow.",
  },
  {
    question: "What if my commits are messy or have bad messages?",
    answer:
      "Diffshot filters out noise automatically \u2014 merge commits, dependency bumps, formatting changes, CI updates. It groups related commits by file paths and generates content based on commit messages, files changed, and line stats. Better commit messages do produce better output, but even short messages like \u2018fix auth\u2019 give the AI enough context when combined with the file paths and change data.",
  },
  {
    question: "Do I need a large audience for this to be useful?",
    answer:
      "No. Building in public works best when you start early. Visual changelog cards look professional regardless of your follower count. Early posts establish your shipping history so that when people do find you, they see consistent proof that you build and deliver.",
  },
  {
    question: "What does the free plan include?",
    answer:
      "3 generations per month (up to 9 draft tweets), unlimited repos, full publish-to-X functionality. Free cards include a small \u2018Made with Diffshot\u2019 watermark. No credit card required.",
  },
  {
    question: "Can I edit the drafts before posting?",
    answer:
      "Yes. Every draft is fully editable \u2014 you can change the tweet text, or change the category label. Diffshot gives you a starting point, not a final product. Most users tweak the hook line and publish.",
  },
  {
    question: "What happens to my X account permissions?",
    answer:
      "Diffshot requests write-only access to post tweets on your behalf. It never reads your timeline, your DMs, your followers, or your existing tweets. You can revoke access anytime from your X settings.",
  },
];

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const updateHeight = useCallback(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, []);

  useEffect(() => {
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [updateHeight]);

  return (
    <div className="border-b border-[#2A2A30]">
      <button
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between py-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-heading pr-4 text-lg font-semibold text-[#FAFAFA]">
          {question}
        </span>
        <ChevronDown
          className="h-5 w-5 shrink-0 text-[#B95126] transition-transform duration-300 ease-in-out"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen ? `${height}px` : "0px",
        }}
      >
        <div ref={contentRef} className="max-w-[680px] pb-6 pt-0">
          <p className="text-sm leading-[1.7] text-[#A0A0A8]">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faqs" className="border-t border-[#1a1a1f] px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="font-heading text-4xl font-semibold tracking-tight text-[#FAFAFA]">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-base text-[#A0A0A8]">
            Everything you need to know before connecting your repo.
          </p>
        </div>

        <div className="mt-16">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
