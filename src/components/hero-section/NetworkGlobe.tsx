import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Ring } from '@react-three/drei';
import { useRef } from 'react';

// Minimal, curated skill icons
const skills = [
  { name: 'React', src: '/skills/react.png' },
  { name: 'TypeScript', src: '/skills/ts.png' },
  { name: 'JavaScript', src: '/skills/js.png' },
  { name: 'AWS', src: '/skills/aws.png' },
  { name: 'GitHub', src: '/skills/gitwhite.png' },
  { name: 'CSS3', src: '/skills/css.png' },
  { name: 'HTML5', src: '/skills/html.png' },
  { name: 'Node.js', src: '/skills/node-js.png' },
  { name: 'Next.js', src: '/skills/next.png' },
  { name: 'Tailwind', src: '/skills/tailwind.png' },
  { name: 'Python', src: '/skills/python.png' },
  { name: 'Docker', src: '/skills/docker.png' },
];

function getSphereCoords(count: number, radius: number) {
  const points = [];
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(-1 + (2 * i) / count);
    const theta = Math.sqrt(count * Math.PI) * phi;
    points.push([
      radius * Math.cos(theta) * Math.sin(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(phi),
    ]);
  }
  return points;
}

// Animated rings component
const AnimatedRings = () => {
  const ring1Ref = useRef<any>();
  const ring2Ref = useRef<any>();
  const ring3Ref = useRef<any>();

  useFrame((state) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -state.clock.elapsedTime * 0.2;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group>
      {/* Ring 1 */}
      <mesh ref={ring1Ref} position={[0, 0, 0]}>
        <ringGeometry args={[3.2, 3.4, 64]} />
        <meshBasicMaterial 
          color="#4f46e5" 
          transparent 
          opacity={0.3} 
          side={2}
        />
      </mesh>
      
      {/* Ring 2 */}
      <mesh ref={ring2Ref} position={[0, 0, 0]} rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[3.6, 3.8, 64]} />
        <meshBasicMaterial 
          color="#06b6d4" 
          transparent 
          opacity={0.2} 
          side={2}
        />
      </mesh>
      
      {/* Ring 3 */}
      <mesh ref={ring3Ref} position={[0, 0, 0]} rotation={[-Math.PI / 3, 0, 0]}>
        <ringGeometry args={[4.0, 4.2, 64]} />
        <meshBasicMaterial 
          color="#8b5cf6" 
          transparent 
          opacity={0.15} 
          side={2}
        />
      </mesh>
    </group>
  );
};

const NetworkGlobe: React.FC = () => {
  const globeRadius = 2.6;
  const positions = getSphereCoords(skills.length, globeRadius);
  return (
    <div style={{ width: 420, height: 420 }}>
      <Canvas camera={{ position: [0, 0, 9], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} />
        
        {/* Animated rings around the sphere */}
        <AnimatedRings />
        
        <mesh>
          <sphereGeometry args={[globeRadius, 40, 40]} />
          <meshBasicMaterial color="#3a4a6a" wireframe opacity={0.3} transparent />
        </mesh>
        {skills.map((skill, i) => (
          <Html
            key={skill.name + i}
            position={positions[i] as [number, number, number]}
            center
            style={{ pointerEvents: 'none', userSelect: 'none' }}
          >
            <img
              src={skill.src}
              alt={skill.name}
              width={38}
              height={38}
              style={{
                background: 'rgba(20,30,50,0.85)',
                borderRadius: 12,
                padding: 7,
                boxShadow: '0 2px 12px #0006',
                border: '2px solid #fff2',
                minWidth: 38,
                minHeight: 38,
                objectFit: 'contain',
                filter: 'drop-shadow(0 2px 8px #0008)',
              }}
            />
          </Html>
        ))}
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default NetworkGlobe; 