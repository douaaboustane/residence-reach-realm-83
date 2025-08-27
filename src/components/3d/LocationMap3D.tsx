import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Text, Environment } from '@react-three/drei';
import { Mesh } from 'three';

interface LocationMap3DProps {
  properties: Array<{
    id: string;
    title: string;
    price: number;
    location: string;
    coordinates?: { x: number; z: number };
  }>;
}

function PropertyMarker({ 
  property, 
  position 
}: { 
  property: LocationMap3DProps['properties'][0]; 
  position: [number, number, number];
}) {
  const meshRef = useRef<Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      if (hovered) {
        meshRef.current.rotation.y += delta * 2;
      }
    }
  });

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[0.2, 16, 16]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={hovered ? "#f59e0b" : "#ef4444"}
          emissive={hovered ? "#f59e0b" : "#dc2626"}
          emissiveIntensity={0.3}
        />
      </Sphere>
      
      {hovered && (
        <>
          <Text
            position={[0, 0.8, 0]}
            fontSize={0.15}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {property.title}
          </Text>
          <Text
            position={[0, 0.5, 0]}
            fontSize={0.12}
            color="#e5e7eb"
            anchorX="center"
            anchorY="middle"
          >
            ${property.price.toLocaleString()}
          </Text>
        </>
      )}
    </group>
  );
}

function CityBase() {
  return (
    <>
      {/* Ground plane */}
      <Box args={[20, 0.2, 20]} position={[0, -0.1, 0]}>
        <meshStandardMaterial color="#374151" />
      </Box>
      
      {/* Streets */}
      <Box args={[20, 0.21, 0.5]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1f2937" />
      </Box>
      <Box args={[0.5, 0.21, 20]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1f2937" />
      </Box>
      
      {/* City blocks */}
      {Array.from({ length: 8 }, (_, i) => (
        <Box
          key={i}
          args={[1.5, Math.random() * 2 + 0.5, 1.5]}
          position={[
            (Math.random() - 0.5) * 16,
            (Math.random() * 2 + 0.5) / 2,
            (Math.random() - 0.5) * 16
          ]}
        >
          <meshStandardMaterial color="#4b5563" />
        </Box>
      ))}
    </>
  );
}

export default function LocationMap3D({ properties }: LocationMap3DProps) {
  return (
    <div className="w-full h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [15, 15, 15], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[0, 10, 0]} intensity={0.5} color="#6366f1" />
        
        <CityBase />
        
        {properties.map((property, index) => (
          <PropertyMarker
            key={property.id}
            property={property}
            position={[
              property.coordinates?.x ?? (index - properties.length / 2) * 3,
              1,
              property.coordinates?.z ?? Math.sin(index) * 5
            ]}
          />
        ))}
        
        <OrbitControls 
          enablePan={true} 
          enableZoom={true}
          minDistance={8}
          maxDistance={25}
          maxPolarAngle={Math.PI / 2.2}
        />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}