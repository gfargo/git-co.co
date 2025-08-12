"use client"

import React, { useRef, useState, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Sparkles, Float, Billboard } from "@react-three/drei"
import { Mesh, Texture, TextureLoader, Vector3 } from "three"

type MascotPlaneProps = {
  mouse: React.MutableRefObject<Vector3>
}

export const MascotPlane = ({ mouse }: MascotPlaneProps) => {
  const mesh = useRef<Mesh>(null!)
  const { viewport } = useThree()
  const [texture, setTexture] = useState<Texture | null>(null)
  const time = useRef(0)

  const [homePosition, setHomePosition] = useState<Vector3 | null>(null)

  useEffect(() => {
    if (viewport.width > 0 && homePosition === null) {
      const vw = viewport.width
      const vh = viewport.height
      const x = (Math.random() - 0.5) * vw * 0.7
      const y = (Math.random() - 0.5) * vh * 0.7
      const z = (Math.random() - 0.5) * 2
      setHomePosition(new Vector3(x, y, z))
    }
  }, [viewport, homePosition])

  useEffect(() => {
    const randomLetter = ["a", "b", "c", "d"].sort(() => Math.random() - 0.5)[0]
    new TextureLoader().load(
      `/mascott/mascott_${randomLetter}.png`,
      (loadedTexture) => {
        setTexture(loadedTexture)
      }
    )
  }, [])

  useFrame((state, delta) => {
    if (!mesh.current || !homePosition) return

    if (mesh.current.position.length() === 0) {
      mesh.current.position.copy(homePosition)
    }

    time.current += delta

    const targetPosition = new Vector3().copy(homePosition)
    const repelRadius = 2.0
    const repelStrength = 1.5

    const distance = mesh.current.position.distanceTo(mouse.current)

    if (distance < repelRadius) {
      const repelDirection = new Vector3()
        .subVectors(mesh.current.position, mouse.current)
        .normalize()
      const pushFactor = (repelRadius - distance) / repelRadius
      targetPosition.add(
        repelDirection.multiplyScalar(repelStrength * pushFactor)
      )
    }

    mesh.current.position.lerp(targetPosition, 0.02)
  })

  if (!homePosition) return null

  return (
    <Billboard>
      <Float speed={0.5} floatIntensity={2} rotationIntensity={0.5}>
        <mesh ref={mesh}>
          <planeGeometry args={[1, 1]} />
          {texture && <meshStandardMaterial map={texture} transparent />}
          <Sparkles
            speed={0.1}
            noise={0.1}
            scale={1.2}
            count={30}
            color={"#709e8a"}
          />
        </mesh>
      </Float>
    </Billboard>
  )
}