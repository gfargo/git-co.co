"use client"

import { useEffect, useRef } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import { MascotGroup } from "./MascotGroup"
import { lerp } from "three/src/math/MathUtils"

export const Scene = () => {
  const { camera } = useThree()
  const scrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useFrame(() => {
    const targetZ = -scrollY.current * 0.0005
    camera.position.z = lerp(camera.position.z, targetZ, 0.05)
    camera.lookAt(0, 0, 0)
  })

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <MascotGroup count={8} />
      <Stars speed={0.5} depth={500} fade />
    </>
  )
}
