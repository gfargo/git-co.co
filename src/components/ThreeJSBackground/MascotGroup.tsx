"use client"

import React, { useRef, useEffect } from "react"
import { useThree } from "@react-three/fiber"
import { Vector3 } from "three"
import { MascotPlane } from "./MascotPlane"

export const MascotGroup = ({ count = 5 }: { count?: number }) => {
  const { viewport } = useThree()
  const mouse = useRef(new Vector3())

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      mouse.current.set(x * viewport.width / 2, y * viewport.height / 2, 0)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [viewport])

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <MascotPlane key={i} mouse={mouse} />
      ))}
    </>
  )
}
