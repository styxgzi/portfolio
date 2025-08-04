import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';

// Placeholder skill icons (replace with your actual icons/images)
const skills = [
  { name: 'React', color: '#61dafb' },
  { name: 'JS', color: '#f7df1e' },
  { name: 'TS', color: '#3178c6' },
  { name: 'AWS', color: '#ff9900' },
  { name: 'GitHub', color: '#333' },
  { name: 'CSS3', color: '#264de4' },
  { name: 'Firebase', color: '#ffa000' },
  { name: 'GraphQL', color: '#e535ab' },
  { name: 'Next.js', color: '#000' },
  { name: 'Node.js', color: '#3c873a' },
];

// Helper to distribute points on a sphere
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

const SkillsSphere: React.FC = () => {
  const positions = getSphereCoords(skills.length, 2.2);
  return (
    <div style={{ width: 400, height: 400 }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} />
        {skills.map((skill, i) => (
          <Html
            key={skill.name}
            position={positions[i] as [number, number, number]}
            center
            style={{ pointerEvents: 'none', userSelect: 'none' }}
          >
            <div
              style={{
                background: 'rgba(20,30,50,0.85)',
                color: skill.color,
                borderRadius: 12,
                padding: '10px 18px',
                fontWeight: 700,
                fontSize: 18,
                boxShadow: '0 2px 12px #0006',
                border: '2px solid #fff2',
                textShadow: '0 1px 4px #000a',
                minWidth: 60,
                textAlign: 'center',
              }}
            >
              {skill.name}
            </div>
          </Html>
        ))}
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default SkillsSphere; 