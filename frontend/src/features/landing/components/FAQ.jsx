import * as Accordion from "@radix-ui/react-accordion";
import { HiChevronDown } from "react-icons/hi2";

const FAQS = [
  {
    question: "Is this actually free to use?",
    answer:
      "Yes. Question generation and feedback run on Gemini's free API tier, so there's no cost to practice.",
  },
  {
    question: "How does the AI generate questions?",
    answer:
      "You pick a role, experience level, and interview type, and each session generates a fresh set of questions tailored to that combination — not a fixed static bank.",
  },
  {
    question: "What kind of feedback do I get?",
    answer:
      "Each answer is scored out of 10 with a correctness assessment, a confidence rating, specific improvement suggestions, and a model ideal answer to compare against.",
  },
  {
    question: "Can I revisit questions later?",
    answer:
      "Yes — bookmark any question during a session and find it later in your Bookmarks page, searchable by topic or keyword.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="max-w-3xl mx-auto px-6 py-24">
      <div className="text-center mb-14">
        <h2 className="text-3xl font-semibold text-text">Frequently asked questions</h2>
      </div>

      <Accordion.Root type="single" collapsible className="flex flex-col gap-3">
        {FAQS.map((faq, index) => (
          <Accordion.Item
            key={faq.question}
            value={`item-${index}`}
            className="bg-surface border border-border rounded-xl overflow-hidden"
          >
            <Accordion.Header>
              <Accordion.Trigger
                className="group flex w-full items-center justify-between px-5 py-4 text-left text-text
                           text-sm font-medium hover:bg-surface-hover transition-colors"
              >
                {faq.question}
                <HiChevronDown
                  className="text-text-secondary transition-transform duration-200 group-data-[state=open]:rotate-180"
                  size={18}
                />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content
              className="px-5 pb-4 text-sm text-text-secondary leading-relaxed
                         data-[state=open]:animate-[accordion-down_0.2s_ease-out]
                         data-[state=closed]:animate-[accordion-up_0.2s_ease-out]"
            >
              {faq.answer}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}