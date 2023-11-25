"use client"

import React, { useEffect, useRef, useState } from "react"

type CursorImitatorProps = {
  content: string[]
  nextLetterTime?: number
  waitAtEnd?: number
  waitAtStart?: number
  blinkSpeed?: number
  letterWrapClass?: string
  className?: string
  onDone?: () => void
  style?: React.CSSProperties
}

const CursorImitator: React.FC<CursorImitatorProps> = ({
  content = [],
  nextLetterTime = 50,
  waitAtEnd = 500,
  waitAtStart = 200,
  blinkSpeed = 130,
  letterWrapClass = "",
  onDone,
  className,
  style
}) => {
  const [mounted, setMounted] = useState(false)
  const timeoutList = useRef<number[]>([])
  const lastReference = useRef<HTMLElement | null>(null)
  const interval = useRef<number | null>(null)
  let ttw = 0 // Time to Wait.

  const clearAllTimeoutsAndIntervals = () => {
    timeoutList.current.forEach(clearTimeout)
    if (interval.current) clearInterval(interval.current)
  }

  useEffect(() => {
    setMounted(true)
    return () => clearAllTimeoutsAndIntervals()
  }, [])

  const loadCursorBlink = (
    ref: React.RefObject<HTMLDivElement>,
    ttw: number,
    end: boolean,
    isLastSentence: boolean
  ) => {
    setTimeout(() => {
      if (interval.current) clearInterval(interval.current)
      if (
        lastReference.current &&
        lastReference.current.innerText.endsWith("|")
      ) {
        lastReference.current.innerText = lastReference.current.innerText.slice(
          0,
          -1
        )
      }

      if (!isLastSentence) {
        interval.current = window.setInterval(() => {
          lastReference.current = ref.current
          if (end) {
            if (ref.current?.innerText.endsWith("|")) {
              ref.current.innerText = ref.current.innerText.slice(0, -1)
            } else {
              if (ref.current) {
                ref.current.innerText += "|"
              }
            }
          } else {
            if (ref.current?.innerText === "|") {
              ref.current.innerText = ""
            } else if (ref.current?.innerText === "") {
              ref.current.innerText = "|"
            }
          }
        }, blinkSpeed)
      }
    }, ttw * nextLetterTime)
  }

  const loadLetter = (
    sentence: string,
    ref: React.RefObject<HTMLDivElement>,
    isLastSentence: boolean
  ) => {
    sentence.split("").forEach((letter, index) => {
      let nextLetter = letter
      let currTTW = ttw++
      if (index === 0) {
        loadCursorBlink(ref, ttw, false, isLastSentence)
        ttw += waitAtStart / nextLetterTime
        currTTW = ttw
      }
      setTimeout(() => {
        if (interval.current) clearInterval(interval.current)
        if (index === 0 && ref.current) {
          ref.current.innerText = "|"
        }
        if (nextLetter === " " && ref.current) {
          ref.current.innerHTML = ref.current.innerHTML.slice(0, -1) + " |"
        } else if (ref.current) {
          ref.current.innerText =
            ref.current.innerText.slice(0, -1) + nextLetter + "|"
        }
      }, currTTW * nextLetterTime)
      if (index === sentence.length - 1) {
        loadCursorBlink(ref, ttw, true, isLastSentence)
        ttw += waitAtEnd / nextLetterTime
      }
    })
  }

  const loadIntro = (content: string[], onDone?: () => void) => {
    return (
      <div>
        {content.map((sentence, index) => {
          const refName = `line_${index}`
          const ref = React.createRef<HTMLDivElement>()
          const isLast = index === content.length - 1
          if (mounted) loadLetter(sentence, ref, isLast)
          if (isLast) {
            setTimeout(() => {
              if (onDone) {
                onDone()
              }
            }, ttw * nextLetterTime)
          }
          return <div key={refName} ref={ref} className={letterWrapClass} />
        })}
      </div>
    )
  }

  return (
    <div className={className} style={style}>
      {loadIntro(content, onDone)}
    </div>
  )
}

export default CursorImitator
