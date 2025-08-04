'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const MoleculeBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const moleculesRef = useRef<THREE.Group[]>([]);
  const frameId = useRef<number | null>(null);

  // Configuration for 3D molecules
  const config = {
    moleculeCount: 15,
    atomSize: 1.2,
    bondRadius: 0.2,
    atomColor: 0x3b82f6, // blue-500
    bondColor: 0x60a5fa, // blue-400
    maxDistance: 120,
    depth: 150,
    rotationSpeed: 0.001
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

    // Create molecules
    createMolecules();

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    // Start animation
    animate();

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (frameId.current !== null) {
        cancelAnimationFrame(frameId.current);
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose geometries and materials
      moleculesRef.current.forEach(molecule => {
        molecule.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach(material => material.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      });
      
      rendererRef.current?.dispose();
    };
  }, []);

  // Create molecule structures
  const createMolecules = () => {
    if (!sceneRef.current) return;
    
    // Clear any existing molecules
    moleculesRef.current.forEach(molecule => {
      sceneRef.current?.remove(molecule);
    });
    moleculesRef.current = [];
    
    // Create new molecules
    for (let i = 0; i < config.moleculeCount; i++) {
      const molecule = createMolecule();
      
      // Position molecules randomly in the scene
      molecule.position.x = (Math.random() - 0.5) * window.innerWidth * 0.8;
      molecule.position.y = (Math.random() - 0.5) * window.innerHeight * 0.8;
      molecule.position.z = (Math.random() - 0.5) * config.depth;
      
      // Random initial rotation
      molecule.rotation.x = Math.random() * Math.PI * 2;
      molecule.rotation.y = Math.random() * Math.PI * 2;
      molecule.rotation.z = Math.random() * Math.PI * 2;
      
      sceneRef.current.add(molecule);
      moleculesRef.current.push(molecule);
    }
  };

  // Create a single molecule structure
  const createMolecule = () => {
    const group = new THREE.Group();
    
    // Different molecule types
    const moleculeTypes = [
      createWaterMolecule,
      createMethane,
      createSimpleRing,
      createLinearMolecule
    ];
    
    // Randomly select a molecule type
    const createRandomMolecule = moleculeTypes[Math.floor(Math.random() * moleculeTypes.length)];
    createRandomMolecule(group);
    
    return group;
  };

  // Create a water molecule (H2O)
  const createWaterMolecule = (group: THREE.Group) => {
    const atomGeometry = new THREE.SphereGeometry(config.atomSize, 16, 16);
    const oxygenMaterial = new THREE.MeshBasicMaterial({ color: 0x3b82f6 }); // blue for oxygen
    const hydrogenMaterial = new THREE.MeshBasicMaterial({ color: 0x93c5fd }); // lighter blue for hydrogen
    
    // Oxygen atom
    const oxygen = new THREE.Mesh(atomGeometry, oxygenMaterial);
    group.add(oxygen);
    
    // Hydrogen atoms
    const hydrogen1 = new THREE.Mesh(atomGeometry, hydrogenMaterial);
    hydrogen1.position.set(-1.5, 1.2, 0);
    hydrogen1.scale.set(0.6, 0.6, 0.6);
    group.add(hydrogen1);
    
    const hydrogen2 = new THREE.Mesh(atomGeometry, hydrogenMaterial);
    hydrogen2.position.set(1.5, 1.2, 0);
    hydrogen2.scale.set(0.6, 0.6, 0.6);
    group.add(hydrogen2);
    
    // Bonds
    createBond(group, new THREE.Vector3(0, 0, 0), hydrogen1.position);
    createBond(group, new THREE.Vector3(0, 0, 0), hydrogen2.position);
  };

  // Create a methane molecule (CH4)
  const createMethane = (group: THREE.Group) => {
    const atomGeometry = new THREE.SphereGeometry(config.atomSize, 16, 16);
    const carbonMaterial = new THREE.MeshBasicMaterial({ color: 0x1e40af }); // darker blue for carbon
    const hydrogenMaterial = new THREE.MeshBasicMaterial({ color: 0x93c5fd }); // lighter blue for hydrogen
    
    // Carbon atom
    const carbon = new THREE.Mesh(atomGeometry, carbonMaterial);
    group.add(carbon);
    
    // Hydrogen atoms in tetrahedral arrangement
    const tetrahedralPositions = [
      new THREE.Vector3(1, 1, 1),
      new THREE.Vector3(-1, -1, 1),
      new THREE.Vector3(1, -1, -1),
      new THREE.Vector3(-1, 1, -1)
    ];
    
    tetrahedralPositions.forEach(position => {
      position.normalize().multiplyScalar(2);
      const hydrogen = new THREE.Mesh(atomGeometry, hydrogenMaterial);
      hydrogen.position.copy(position);
      hydrogen.scale.set(0.6, 0.6, 0.6);
      group.add(hydrogen);
      
      // Bond
      createBond(group, new THREE.Vector3(0, 0, 0), position);
    });
  };

  // Create a simple ring structure (like benzene but simplified)
  const createSimpleRing = (group: THREE.Group) => {
    const atomGeometry = new THREE.SphereGeometry(config.atomSize, 16, 16);
    const atomMaterial = new THREE.MeshBasicMaterial({ color: 0x3b82f6 });
    
    const atomCount = 6; // hexagonal ring
    const radius = 2;
    const atoms: THREE.Mesh[] = [];
    
    // Create atoms in a ring
    for (let i = 0; i < atomCount; i++) {
      const angle = (i / atomCount) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      const atom = new THREE.Mesh(atomGeometry, atomMaterial);
      atom.position.set(x, y, 0);
      atom.scale.set(0.8, 0.8, 0.8);
      group.add(atom);
      atoms.push(atom);
    }
    
    // Create bonds between adjacent atoms
    for (let i = 0; i < atomCount; i++) {
      const nextIndex = (i + 1) % atomCount;
      createBond(group, atoms[i].position, atoms[nextIndex].position);
    }
  };

  // Create a linear molecule
  const createLinearMolecule = (group: THREE.Group) => {
    const atomGeometry = new THREE.SphereGeometry(config.atomSize, 16, 16);
    const atomMaterial = new THREE.MeshBasicMaterial({ color: 0x3b82f6 });
    
    const atomCount = 3 + Math.floor(Math.random() * 3); // 3-5 atoms
    const atoms: THREE.Mesh[] = [];
    
    // Create atoms in a line
    for (let i = 0; i < atomCount; i++) {
      const atom = new THREE.Mesh(atomGeometry, atomMaterial);
      atom.position.set(i * 2 - (atomCount - 1), 0, 0);
      atom.scale.set(0.8, 0.8, 0.8);
      group.add(atom);
      atoms.push(atom);
    }
    
    // Create bonds between adjacent atoms
    for (let i = 0; i < atomCount - 1; i++) {
      createBond(group, atoms[i].position, atoms[i + 1].position);
    }
  };

  // Create a bond between two positions
  const createBond = (group: THREE.Group, start: THREE.Vector3, end: THREE.Vector3) => {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    
    // Create a cylinder for the bond
    const bondGeometry = new THREE.CylinderGeometry(config.bondRadius, config.bondRadius, length, 8);
    const bondMaterial = new THREE.MeshBasicMaterial({ color: config.bondColor });
    const bond = new THREE.Mesh(bondGeometry, bondMaterial);
    
    // Position and orient the bond
    bond.position.copy(start);
    bond.position.add(direction.multiplyScalar(0.5));
    bond.lookAt(end);
    bond.rotateX(Math.PI / 2);
    
    group.add(bond);
  };

  // Animation loop
  const animate = () => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
    
    // Rotate each molecule
    moleculesRef.current.forEach(molecule => {
      molecule.rotation.x += config.rotationSpeed * (Math.random() * 0.5 + 0.5);
      molecule.rotation.y += config.rotationSpeed * (Math.random() * 0.5 + 0.5);
    });
    
    // Render the scene
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    
    // Continue animation
    frameId.current = requestAnimationFrame(animate);
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
    />
  );
};

export default MoleculeBackground;