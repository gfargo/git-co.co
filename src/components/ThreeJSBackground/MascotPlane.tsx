"use client"

import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Sparkles, Float, Billboard } from "@react-three/drei"
import { Mesh, Texture, TextureLoader, Vector3 } from "three"

type MascotPlaneProps = {
  mouse: React.MutableRefObject<Vector3>
  mascotRefs: React.RefObject<any>[]
}

export const MascotPlane = forwardRef<Mesh, MascotPlaneProps>(
  ({ mouse, mascotRefs }, ref) => {
    const localRef = useRef<Mesh>(null!)
    useImperativeHandle(ref, () => localRef.current)

    const { viewport } = useThree()
    const [texture, setTexture] = useState<Texture | null>(null)
    const time = useRef(0)

    const [homePosition, setHomePosition] = useState<Vector3 | null>(null)
    const [floatProps] = useState({
      speed: Math.random() * 0.5 + 0.2,
      floatIntensity: Math.random() * 2 + 1,
      rotationIntensity: Math.random() * 0.5 + 0.2,
      scale: Math.random() * 0.5 + 0.8,
    })
    const drift = useRef(
      new Vector3(
        (Math.random() - 0.5) * 0.0001,
        (Math.random() - 0.5) * 0.0001,
        0
      )
    )

    useEffect(() => {
      if (viewport.width > 0 && homePosition === null) {
        const vw = viewport.width
        const vh = viewport.height
        const x = (Math.random() - 0.5) * vw * 0.5
        const y = (Math.random() - 0.5) * vh * 0.5
        const z = (Math.random() - 0.5) * 2
        setHomePosition(new Vector3(x, y, z))
      }
    }, [viewport, homePosition])

    useEffect(() => {
      const randomLetter = ["a", "b", "c", "d"].sort(
        () => Math.random() - 0.5
      )[0]
      new TextureLoader().load(
        `/mascott/mascott_${randomLetter}.png`,
        (loadedTexture) => {
          setTexture(loadedTexture)
        }
      )
    }, [])

    useFrame((state, delta) => {
      if (!localRef.current || !homePosition) return

      if (localRef.current.position.length() === 0) {
        localRef.current.position.copy(homePosition)
      }

      time.current += delta
      homePosition.add(drift.current)

      const targetPosition = new Vector3().copy(homePosition)
      const mouseRepelRadius = 2.0
      const mouseRepelStrength = 1.5
      const mascotRepelRadius = 1.5
      const mascotRepelStrength = 1.0

      // Mouse repulsion
      const mouseDistance = localRef.current.position.distanceTo(mouse.current)
      if (mouseDistance < mouseRepelRadius) {
        const repelDirection = new Vector3()
          .subVectors(localRef.current.position, mouse.current)
          .normalize()
        const pushFactor = (mouseRepelRadius - mouseDistance) / mouseRepelRadius
        targetPosition.add(
          repelDirection.multiplyScalar(mouseRepelStrength * pushFactor)
        )
      }

      // Mascot collision avoidance
      mascotRefs.forEach((otherRef) => {
        if (otherRef.current && otherRef.current !== localRef.current) {
          const otherPosition = otherRef.current.position
          const distance = localRef.current.position.distanceTo(otherPosition)
          if (distance < mascotRepelRadius) {
            const repelDirection = new Vector3()
              .subVectors(localRef.current.position, otherPosition)
              .normalize()
            const pushFactor = (mascotRepelRadius - distance) / mascotRepelRadius
            targetPosition.add(
              repelDirection.multiplyScalar(mascotRepelStrength * pushFactor)
            )
          }
        }
      })

      localRef.current.position.lerp(targetPosition, 0.02)
    })

    if (!homePosition) return null

    return (
      <Billboard>
        <Float {...floatProps}>
          <mesh ref={localRef} scale={floatProps.scale}>
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
)

MascotPlane.displayName = "MascotPlane"
