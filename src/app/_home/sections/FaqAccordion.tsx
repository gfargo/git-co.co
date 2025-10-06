"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { track } from "@vercel/analytics/react"

type Question = {
  question: string
  answer: React.ReactNode
}

type FaqAccordionProps = {
  questions: Question[]
}

export const FaqAccordion = ({ questions }: FaqAccordionProps) => {
  const handleValueChange = (value: string) => {
    if (value) {
      const question = questions.find(
        q =>
          q.question
            .replace(/\s/g, "-")
            .replace(/[^a-zA-Z0-9-_]/g, "")
            .toLowerCase() === value
      )
      track("FAQ Interaction", {
        questionId: value,
        questionText: question?.question || value,
        section: "faq"
      })
    }
  }

  return (
    <Accordion
      className="w-full"
      collapsible
      type="single"
      onValueChange={handleValueChange}
    >
      {questions.map(question => {
        const id = question.question
          .replace(/\s/g, "-")
          .replace(/[^a-zA-Z0-9-_]/g, "")
          .toLowerCase()

        return (
          <AccordionItem key={id} value={id}>
            <AccordionTrigger
              id={id}
              className="flex items-center justify-between py-4"
            >
              <span>{question.question}</span>
            </AccordionTrigger>
            <AccordionContent className="py-4">
              {question.answer}
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
