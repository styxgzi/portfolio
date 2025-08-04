'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

interface SpreadingDotsBackgroundProps {
  dotCount?: number;
  dotSize?: number;
  dotColor?: string;
  lineColor?: string;
  lineOpacity?: number;
  maxDistance?: number;
  pulseFrequency?: number;
  pulseSize?: number;
  pulseColor?: string;
  mouseInfluence?: number;
}

const SpreadingDotsBackground: React.FC<SpreadingDotsBackgroundProps> = ({
  dotCount = 150,
  dotSize = 3,
  dotColor = '#ffffff',
  lineColor = '#ffffff',
  lineOpacity = 0.15,
  maxDistance = 100,
  pulseFrequency = 3, // seconds between pulses
  pulseSize = 100, // max size of pulse
  pulseColor = '#60a5fa',
  mouseInfluence = 0.1
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const dotsRef = useRef<THREE.Points | null>(null);
  const linesRef = useRef<THREE.LineSegments | null>(null);
  const pulsesRef = useRef<THREE.Group>(new THREE.Group());
  const frameId = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const velocitiesRef = useRef<Float32Array | null>(null);
  const lastPulseTimeRef = useRef<number>(0);
  
  // Track window dimensions for responsive behavior
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080
  });

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      75,
      windowDimensions.width / windowDimensions.height,
      0.1,
      2000
    );
    camera.position.z = 500;
    cameraRef.current = camera;

    // Initialize renderer with antialiasing for smoother edges
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true // Transparent background
    });
    renderer.setSize(windowDimensions.width, windowDimensions.height);
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Better quality on high DPI displays
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Add post-processing for glow effect
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(windowDimensions.width, windowDimensions.height),
      0.8, // strength
      0.3, // radius
      0.7  // threshold
    );
    composer.addPass(bloomPass);
    composerRef.current = composer;
    
    // Add pulses group to scene
    scene.add(pulsesRef.current);

    // Create dots
    createDots();
    
    // Create initial lines
    updateLines();

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current || !composerRef.current) return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setWindowDimensions({ width, height });
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
      composerRef.current.setSize(width, height);
    };

    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      // Convert mouse position to normalized device coordinates (-1 to +1)
      mouseRef.current.x = (event.clientX / windowDimensions.width) * 2 - 1;
      mouseRef.current.y = -(event.clientY / windowDimensions.height) * 2 + 1;
    };

    // Start animation
    animate();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (frameId.current !== null) {
        cancelAnimationFrame(frameId.current);
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose geometries and materials
      if (dotsRef.current) {
        dotsRef.current.geometry.dispose();
        (dotsRef.current.material as THREE.Material).dispose();
      }
      
      if (linesRef.current) {
        linesRef.current.geometry.dispose();
        (linesRef.current.material as THREE.Material).dispose();
      }
      
      // Dispose all pulse meshes
      pulsesRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach(material => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
      
      rendererRef.current?.dispose();
      composerRef.current?.dispose();
    };
  }, []);

  // Create animated dots
  const createDots = () => {
    if (!sceneRef.current) return;
    
    // Create particle geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(dotCount * 3);
    const sizes = new Float32Array(dotCount);
    const opacities = new Float32Array(dotCount);
    const velocities = new Float32Array(dotCount * 3);
    
    // Initialize particle positions, sizes, and velocities
    for (let i = 0; i < dotCount; i++) {
      const i3 = i * 3;
      
      // Position dots within 80% of window dimensions
      positions[i3] = (Math.random() - 0.5) * windowDimensions.width * 0.8;
      positions[i3 + 1] = (Math.random() - 0.5) * windowDimensions.height * 0.8;
      positions[i3 + 2] = (Math.random() - 0.5) * 200; // Add some depth
      
      // Random sizes with variation
      sizes[i] = Math.random() * dotSize + dotSize * 0.5;
      
      // Random opacity for visual interest
      opacities[i] = 0.3 + Math.random() * 0.7;
      
      // Random velocities for movement
      velocities[i3] = (Math.random() - 0.5) * 0.4;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.4;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.2;
    }
    
    // Store velocities for animation
    velocitiesRef.current = velocities;
    
    // Set geometry attributes
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));
    
    // Create shader material for dots
    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(dotColor) }
      },
      vertexShader: `
        attribute float size;
        attribute float opacity;
        
        varying float vOpacity;
        
        void main() {
          // Project position to clip space
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          // Calculate point size based on camera distance
          gl_PointSize = size * (300.0 / -mvPosition.z);
          
          // Pass opacity to fragment shader
          vOpacity = opacity;
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
    const dots = new THREE.Points(geometry, material);
    sceneRef.current.add(dots);
    dotsRef.current = dots;
  };

  // Update lines between dots
  const updateLines = () => {
    if (!sceneRef.current || !dotsRef.current) return;
    
    // Remove previous lines if they exist
    if (linesRef.current) {
      sceneRef.current.remove(linesRef.current);
      linesRef.current.geometry.dispose();
      (linesRef.current.material as THREE.Material).dispose();
    }
    
    // Get dot positions
    const dotGeometry = dotsRef.current.geometry as THREE.BufferGeometry;
    const positions = dotGeometry.attributes.position.array as Float32Array;
    const linePositions: number[] = [];
    
    // Create connections between nearby dots
    for (let i = 0; i < dotCount; i++) {
      const i3 = i * 3;
      const x1 = positions[i3];
      const y1 = positions[i3 + 1];
      const z1 = positions[i3 + 2];
      
      // Connect to nearby dots
      for (let j = i + 1; j < dotCount; j++) {
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
        if (distSquared < maxDistance * maxDistance) {
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
      color: lineColor,
      transparent: true,
      opacity: lineOpacity,
      blending: THREE.AdditiveBlending
    });
    
    // Create lines
    const lines = new THREE.LineSegments(geometry, material);
    sceneRef.current.add(lines);
    linesRef.current = lines;
  };

  // Create a pulse effect at a random dot position
  const createPulse = () => {
    if (!sceneRef.current || !dotsRef.current) return;
    
    // Get a random dot position
    const dotGeometry = dotsRef.current.geometry as THREE.BufferGeometry;
    const positions = dotGeometry.attributes.position.array as Float32Array;
    const randomDotIndex = Math.floor(Math.random() * dotCount);
    const i3 = randomDotIndex * 3;
    
    // Get position of the random dot
    const x = positions[i3];
    const y = positions[i3 + 1];
    const z = positions[i3 + 2];
    
    // Create ring geometry
    const geometry = new THREE.RingGeometry(0.1, 0.5, 32);
    
    // Create material with glow effect
    const material = new THREE.MeshBasicMaterial({
      color: pulseColor,
      transparent: true,
      opacity: 1.0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    
    // Create mesh
    const pulse = new THREE.Mesh(geometry, material);
    pulse.position.set(x, y, z);
    pulse.rotation.x = Math.PI / 2; // Rotate to face camera
    pulse.scale.set(1, 1, 1);
    
    // Add to pulses group
    pulsesRef.current.add(pulse);
    
    // Store animation data
    pulse.userData = {
      startTime: Date.now(),
      duration: 2000, // 2 seconds
      maxSize: pulseSize
    };
  };

  // Update pulse animations
  const updatePulses = () => {
    const now = Date.now();
    const pulsesToRemove: THREE.Mesh[] = [];
    
    // Update each pulse
    pulsesRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const userData = child.userData;
        const elapsed = now - userData.startTime;
        const progress = Math.min(elapsed / userData.duration, 1.0);
        
        // Scale up the pulse
        const size = userData.maxSize * progress;
        child.scale.set(size, size, size);
        
        // Fade out the pulse
        if (child.material instanceof THREE.MeshBasicMaterial) {
          child.material.opacity = 1.0 - progress;
        }
        
        // Mark for removal if animation is complete
        if (progress >= 1.0) {
          pulsesToRemove.push(child);
        }
      }
    });
    
    // Remove completed pulses
    pulsesToRemove.forEach(pulse => {
      pulsesRef.current.remove(pulse);
      pulse.geometry.dispose();
      if (pulse.material instanceof THREE.Material) {
        pulse.material.dispose();
      }
    });
    
    // Create new pulse periodically
    if (now - lastPulseTimeRef.current > pulseFrequency * 1000) {
      createPulse();
      lastPulseTimeRef.current = now;
    }
  };

  // Animation loop
  const animate = () => {
    frameId.current = requestAnimationFrame(animate);
    
    if (!dotsRef.current || !sceneRef.current || !cameraRef.current || !composerRef.current) return;
    
    // Update dot positions based on velocities and mouse influence
    const dotGeometry = dotsRef.current.geometry as THREE.BufferGeometry;
    const positions = dotGeometry.attributes.position.array as Float32Array;
    const velocities = velocitiesRef.current;
    
    if (velocities) {
      for (let i = 0; i < dotCount; i++) {
        const i3 = i * 3;
        
        // Apply velocity
        positions[i3] += velocities[i3];
        positions[i3 + 1] += velocities[i3 + 1];
        positions[i3 + 2] += velocities[i3 + 2];
        
        // Apply mouse influence
        if (mouseInfluence > 0) {
          const mouseX = mouseRef.current.x * windowDimensions.width / 2;
          const mouseY = mouseRef.current.y * windowDimensions.height / 2;
          
          const dx = mouseX - positions[i3];
          const dy = mouseY - positions[i3 + 1];
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 200) {
            const force = (1 - dist / 200) * mouseInfluence;
            positions[i3] += dx * force * 0.01;
            positions[i3 + 1] += dy * force * 0.01;
          }
        }
        
        // Boundary check - wrap around edges with some margin
        const margin = 50;
        const halfWidth = windowDimensions.width / 2 + margin;
        const halfHeight = windowDimensions.height / 2 + margin;
        
        if (positions[i3] < -halfWidth) positions[i3] = halfWidth;
        if (positions[i3] > halfWidth) positions[i3] = -halfWidth;
        if (positions[i3 + 1] < -halfHeight) positions[i3 + 1] = halfHeight;
        if (positions[i3 + 1] > halfHeight) positions[i3 + 1] = -halfHeight;
      }
      
      // Update geometry
      dotGeometry.attributes.position.needsUpdate = true;
    }
    
    // Update connections between dots
    updateLines();
    
    // Update pulse animations
    updatePulses();
    
    // Render with post-processing
    composerRef.current.render();
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    />
  );
};

export default SpreadingDotsBackground;