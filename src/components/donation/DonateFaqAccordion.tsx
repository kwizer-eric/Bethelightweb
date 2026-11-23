import { useState } from 'react'
import { DONATE_FAQS } from '../../data/donatePage'

export function DonateFaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="site-container max-w-4xl py-20 md:py-24">
      <h2 className="text-center text-3xl font-bold tracking-tight text-ink md:text-4xl">
        Frequently asked questions
      </h2>
      <div className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
        {DONATE_FAQS.map((item, index) => {
          const open = openIndex === index
          return (
            <div key={item.question}>
              <button
                type="button"
                className="flex w-full items-start justify-between gap-4 py-5 text-left"
                aria-expanded={open}
                onClick={() => setOpenIndex(open ? null : index)}
              >
                <span className="text-base font-semibold text-ink">{item.question}</span>
                <span
                  className={`mt-0.5 shrink-0 text-2xl font-light text-primary transition-transform duration-300 ${
                    open ? 'rotate-45' : ''
                  }`}
                  aria-hidden
                >
                  +
                </span>
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pb-5 text-sm leading-relaxed text-body">{item.answer}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}