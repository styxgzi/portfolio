'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ParticleSystem: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const linesRef = useRef<THREE.LineSegments | null>(null);

  // Configuration for static white network
  const config = {
    particleCount: 120,
    particleSize: 2.0,
    particleColor: 0xffffff,
    lineColor: 0xffffff,
    lineOpacity: 0.2,
    maxDistance: 80,
    depth: 120,
    mouseInfluence: 0,
    rippleDuration: 0,
    particleSpeed: 0
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 300;
    cameraRef.current = camera;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true // Transparent background
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create static particles
    createParticles();
    
    // Create static connection lines
    createLines();

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      
      // Re-render the static scene after resize
      render();
    };

    // Render once for static display
    render();

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose geometries and materials
      if (particlesRef.current) {
        particlesRef.current.geometry.dispose();
        (particlesRef.current.material as THREE.Material).dispose();
      }
      
      if (linesRef.current) {
        linesRef.current.geometry.dispose();
        (linesRef.current.material as THREE.Material).dispose();
      }
      
      rendererRef.current?.dispose();
    };
  }, []);

  // Create static particles
  const createParticles = () => {
    if (!sceneRef.current) return;
    
    // Create particle geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(config.particleCount * 3);
    const sizes = new Float32Array(config.particleCount);
    
    // Initialize particle positions and sizes
    for (let i = 0; i < config.particleCount; i++) {
      const i3 = i * 3;
      
      // Position particles within 80% of window dimensions
      positions[i3] = (Math.random() - 0.5) * window.innerWidth * 0.8;
      positions[i3 + 1] = (Math.random() - 0.5) * window.innerHeight * 0.8;
      positions[i3 + 2] = (Math.random() - 0.5) * config.depth;
      
      // Set random sizes
      sizes[i] = Math.random() * config.particleSize;
    }
    
    // Set geometry attributes
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Create shader material for particles
    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(config.particleColor) }
      },
      vertexShader: `
        attribute float size;
        
        varying float vOpacity;
        
        void main() {
          // Static position
          vec3 pos = position;
          
          // Project position to clip space
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          // Calculate point size based on camera distance
          gl_PointSize = size * (300.0 / -mvPosition.z);
          
          // Pass opacity to fragment shader
          vOpacity = 0.7; // Consistent opacity
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying float vOpacity;
        
        void main() {
          // Calculate distance from center of point
          vec2 center = gl_PointCoord - 0.5;
          float dist = length(center);
          
          // Create a soft circular shape with glow
          float strength = 1.0 - (dist * 2.0);
          strength = pow(strength, 1.5);
          
          // Apply color and opacity
          gl_FragColor = vec4(color, vOpacity * strength);
          
          // Discard pixels outside the circle
          if (dist > 0.5) discard;
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    
    // Create points object and add to scene
    const particles = new THREE.Points(geometry, material);
    sceneRef.current.add(particles);
    particlesRef.current = particles;
  };

  // Create static lines between particles for network effect
  const createLines = () => {
    if (!sceneRef.current || !particlesRef.current) return;
    
    // Get particle positions
    const particleGeometry = particlesRef.current.geometry as THREE.BufferGeometry;
    const positions = particleGeometry.attributes.position.array as Float32Array;
    const linePositions: number[] = [];
    
    // Create connections between nearby particles
    for (let i = 0; i < config.particleCount; i++) {
      const i3 = i * 3;
      const x1 = positions[i3];
      const y1 = positions[i3 + 1];
      const z1 = positions[i3 + 2];
      
      // Connect to nearby particles
      for (let j = i + 1; j < config.particleCount; j++) {
        const j3 = j * 3;
        const x2 = positions[j3];
        const y2 = positions[j3 + 1];
        const z2 = positions[j3 + 2];
        
        // Calculate distance
        const dx = x2 - x1;
        const dy = y2 - y1;
        const dz = z2 - z1;
        const distSquared = dx * dx + dy * dy + dz * dz;
        
        // Connect if within max distance
        if (distSquared < config.maxDistance * config.maxDistance) {
          linePositions.push(x1, y1, z1);
          linePositions.push(x2, y2, z2);
        }
      }
    }
    
    // Create line geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    
    // Create line material
    const material = new THREE.LineBasicMaterial({
      color: config.particleColor,
      transparent: true,
      opacity: config.lineOpacity,
      blending: THREE.AdditiveBlending
    });
    
    // Create lines
    const lines = new THREE.LineSegments(geometry, material);
    sceneRef.current.add(lines);
    linesRef.current = lines;
  };

  // Render function - static, no animation
  const render = () => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
    
    // Just render the scene once for static display
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  };

  

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    />
  );
};

export default ParticleSystem;