"use client"

import React, { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Sparkles, Stars, Float, Billboard } from "@react-three/drei"
import { Mesh, Texture, TextureLoader, Vector3 } from "three"

const MascottPlane = () => {
  const mesh = useRef<Mesh>(null!)
  const { camera } = useThree()
  const [texture, setTexture] = useState<Texture | null>(null)
  const initialPosition = useRef(
    new Vector3(
      Math.random() * -1 - 1,
      Math.random() * 1 - 1,
      Math.random() * 1 - 1
    )
  )
  const time = useRef(0)

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
    if (mesh.current) {
      time.current += delta

      // Apply floating effect
      // mesh.current.position.x =
      //   initialPosition.current.x + Math.sin(time.current) * 0.1
      // mesh.current.position.y =
      //   initialPosition.current.y + Math.sin(time.current * 0.1) * 0.1
      // mesh.current.position.z =
      //   initialPosition.current.z + Math.sin(time.current * 0.2) * 0.05

      // Rotate
      // mesh.current.rotation.x += 0.01
      // mesh.current.rotation.y += 0.01

      // Ensure the plane is always facing the camera
      // mesh.current.lookAt(camera.position)
    }
  })

  return (
    <Billboard>
      <Float speed={0.5} floatIntensity={5} rotationIntensity={1.2} >
        <mesh ref={mesh} position={initialPosition.current}>
          <planeGeometry args={[1, 1]} />
          {texture && <meshStandardMaterial map={texture} transparent />}
          <Sparkles
            speed={0.2}
            castShadow
            noise={Math.cos(-time.current) * 0.1}
            scale={1.25}
            count={50}
            color={"#709e8a"}
          />
          <Sparkles
            speed={0.2}
            castShadow
            noise={0.2}
            scale={1.5}
            count={50}
            color={"#709e8a"}
          />
        </mesh>
      </Float>
    </Billboard>
  )
}

const ScrolledCammera = () => {
  const { camera } = useThree()
  const [scrollY, setScrollY] = useState(window.scrollY)

  useEffect(() => {
    camera.position.z = -scrollY * 0.0005
    camera.lookAt(0, 0, 0)
  })

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrollY(scrollY)
      camera.position.z = -scrollY * 0.0005
      camera.lookAt(0, 0, 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [camera])

  return null
}

const ThreeJSBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 h-[960px] t-0">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        <MascottPlane />

        <ScrolledCammera />
        <Stars speed={0.5} depth={500} fade />
      </Canvas>
    </div>
  )
}

export default ThreeJSBackground
