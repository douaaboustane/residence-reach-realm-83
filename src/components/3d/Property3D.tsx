import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Text, Environment } from '@react-three/drei';
import { Mesh } from 'three';

interface Property3DProps {
  property: {
    id: string;
    title: string;
    price: number;
    location: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    type: string;
  };
}

function PropertyModel({ property }: { property: Property3DProps['property'] }) {
  const meshRef = useRef<Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current && hovered) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  // Create building based on property type
  const getModelDimensions = () => {
    switch (property.type) {
      case 'house':
        return { width: 2, height: 1.5, depth: 2 };
      case 'apartment':
        return { width: 1.5, height: 3, depth: 1.5 };
      case 'villa':
        return { width: 3, height: 2, depth: 2.5 };
      default:
        return { width: 2, height: 2, depth: 2 };
    }
  };

  const dimensions = getModelDimensions();

  return (
    <group>
      {/* Main building */}
      <Box
        ref={meshRef}
        args={[dimensions.width, dimensions.height, dimensions.depth]}
        position={[0, dimensions.height / 2, 0]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={hovered ? "#8b5cf6" : "#6366f1"}
          metalness={0.1}
          roughness={0.8}
        />
      </Box>

      {/* Roof */}
      <Box
        args={[dimensions.width + 0.2, 0.3, dimensions.depth + 0.2]}
        position={[0, dimensions.height + 0.15, 0]}
      >
        <meshStandardMaterial color="#dc2626" />
      </Box>

      {/* Ground */}
      <Box
        args={[dimensions.width + 1, 0.1, dimensions.depth + 1]}
        position={[0, -0.05, 0]}
      >
        <meshStandardMaterial color="#22c55e" />
      </Box>

      {/* Property info text */}
      <Text
        position={[0, dimensions.height + 1, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {property.title}
      </Text>

      <Text
        position={[0, dimensions.height + 0.6, 0]}
        fontSize={0.2}
        color="#e5e7eb"
        anchorX="center"
        anchorY="middle"
      >
        ${property.price.toLocaleString()}
      </Text>
    </group>
  );
}

export default function Property3D({ property }: Property3DProps) {
  return (
    <div className="w-full h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        
        <PropertyModel property={property} />
        
        <OrbitControls 
          enablePan={false} 
          enableZoom={true}
          minDistance={3}
          maxDistance={10}
          maxPolarAngle={Math.PI / 2}
        />
        
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}