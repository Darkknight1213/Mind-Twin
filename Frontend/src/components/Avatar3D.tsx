import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { currentUser } from '@/lib/dummyData';

// 3D Avatar mesh that changes based on mood/stats
function AvatarMesh({ celebrate = false }: { celebrate?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Get color based on mood
  const getMoodColor = () => {
    const { mood, mentalStats } = currentUser;
    
    if (mood === 'happy') return '#2ECC71'; // Green
    if (mood === 'calm') return '#4A90E2'; // Blue
    if (mood === 'anxious') return '#FF9500'; // Orange
    if (mood === 'sad') return '#9B9B9B'; // Gray
    
    // Based on overall wellness
    const wellness = (mentalStats.energy + mentalStats.mindfulness) / 2;
    if (wellness > 70) return '#2ECC71';
    if (wellness > 40) return '#4A90E2';
    return '#FF9500';
  };

  const getGlowIntensity = () => {
    const { mentalStats } = currentUser;
    return (mentalStats.mindfulness + mentalStats.energy) / 200; // 0 to 1
  };

  const color = getMoodColor();
  const glowIntensity = getGlowIntensity();

  // Gentle floating animation + breathing + celebration
  useFrame((state) => {
    if (groupRef.current) {
      if (celebrate) {
        // Celebration bounce
        groupRef.current.position.y = Math.abs(Math.sin(state.clock.elapsedTime * 3)) * 0.3;
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.3;
      } else {
        // Idle breathing motion
        const breathScale = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
        groupRef.current.scale.set(1 + breathScale, 1 + breathScale, 1 + breathScale);
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main body - sphere */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={glowIntensity * 0.3}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.3, 0.2, 0.9]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.3, 0.2, 0.9]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Pupils */}
      <mesh position={[-0.3, 0.2, 0.95]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.3, 0.2, 0.95]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Smile - torus */}
      <mesh position={[0, -0.1, 0.85]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.3, 0.03, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Glow sphere around avatar */}
      <mesh scale={1.3}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={color}
          transparent
          opacity={glowIntensity * 0.15}
          emissive={color}
          emissiveIntensity={glowIntensity * 0.5}
        />
      </mesh>
    </group>
  );
}

export default function Avatar3D({ celebrate = false }: { celebrate?: boolean }) {
  return (
    <div className="w-full h-full min-h-[300px] rounded-2xl overflow-hidden">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 4]} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4A90E2" />
        
        {/* Avatar */}
        <AvatarMesh celebrate={celebrate} />
      </Canvas>
    </div>
  );
}
