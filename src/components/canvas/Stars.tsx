"use client";

import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

function StarParticles(props: any) {
  const ref = useRef<any>();
  
  // Ginawang 6000 para divisible sa 3 (x, y, z)
  const [sphere] = useState(() => {
    const s = random.inSphere(new Float32Array(6000), { radius: 1.2 }) as Float32Array;
    
    // Safety check: Siguraduhing walang NaN values
    for (let i = 0; i < s.length; i++) {
      if (isNaN(s[i])) s[i] = 0;
    }
    return s;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#d946ef"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

const StarsCanvas = () => {
  return (
    <div className="w-full h-auto fixed inset-0 z-[-1] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <StarParticles />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;