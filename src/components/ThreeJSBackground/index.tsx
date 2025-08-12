"use client"

import React from "react"
import { Canvas } from "@react-three/fiber"
import { Scene } from "./Scene"

const ThreeJSBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 h-[960px] t-0">
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  )
}

export default ThreeJSBackground
