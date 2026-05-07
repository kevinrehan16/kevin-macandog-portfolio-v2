"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Html, Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiThreedotjs } from "react-icons/si";

const Scene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Siguraduhin na ang path ay tama: /public/img/gates.jpg
  const texture = useLoader(THREE.TextureLoader, "/img/gates.jpg");

  useFrame((state) => {
    if (groupRef.current) {
      // Main rotation (Horizontal ikot)
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
      
      // --- SLANT EFFECT ---
      // Ang axis rotation na ito ang nagpapakiling sa orbit
      groupRef.current.rotation.x = 0.5; // Tilt forward/backward
      groupRef.current.rotation.z = 0.2; // Tilt side to side
    }
  });

  const techStack = [
    { Icon: SiNextdotjs, color: "#ffffff" },
    { Icon: FaReact, color: "#61DAFB" },
    { Icon: SiTypescript, color: "#3178C6" },
    { Icon: SiTailwindcss, color: "#38B2AC" },
    { Icon: FaNodeJs, color: "#339933" },
    { Icon: SiThreedotjs, color: "#ffffff" },
  ];

  return (
    <group>
      {/* --- CENTER PICTURE (Blocker for Occlusion) --- */}
      <mesh ref={meshRef}>
        <circleGeometry args={[2.2, 64]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} transparent />
      </mesh>

      {/* Subtle Glow Ring sa likod ng pic */}
      <mesh position={[0, 0, -0.01]}>
        <circleGeometry args={[2.25, 64]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.2} />
      </mesh>

      {/* --- SLANTED ROTATING TECH LOGOS --- */}
      <group ref={groupRef}>
        {techStack.map((tech, index) => {
          const angle = (index / techStack.length) * Math.PI * 2;
          const radius = 4.5; 
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;

          return (
            <group key={index} position={[x, 0, z]}>
              <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <Html 
                  transform 
                  sprite // Laging nakaharap sa user ang logo kahit slanted ang orbit
                  distanceFactor={10} 
                  occlude={[meshRef]} // Nawawala kapag dumaan sa likod ng pic
                  style={{
                    transition: 'all 0.5s',
                    opacity: 1
                  }}
                >
                  <div className="flex items-center justify-center p-3 rounded-full bg-black/60 backdrop-blur-md border border-violet-500/30 shadow-xl pointer-events-auto">
                    <tech.Icon size={25} color={tech.color} />
                  </div>
                </Html>
              </Float>
            </group>
          );
        })}
      </group>
    </group>
  );
};

export default function RelicsCanvas() {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none w-full h-full min-h-[600px]">
      <Canvas 
        camera={{ position: [0, 0, 12], fov: 40 }}
        // Mahalaga ang overflow: visible para hindi maputol ang logos sa gilid ng "box"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 12]} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}