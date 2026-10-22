"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, MeshDistortMaterial, PerformanceMonitor } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { MathUtils } from "three";
import type { Group } from "three";

/**
 * Hero 3D object: an iridescent chrome torus knot that slowly morphs and rotates,
 * tilts toward the pointer and turns as the page scrolls.
 *
 * - Lit with drei Lightformers inside <Environment> (no HDR downloads).
 * - Rendering pauses off-screen (frameloop "never") and is static under reduced motion.
 * - Lower geometry detail and a smaller object on narrow containers.
 */

const physical = {
  metalness: 1,
  roughness: 0.14,
  iridescence: 1,
  iridescenceIOR: 1.7,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
};

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/** Demand-mode frames need a nudge after the environment map has been built. */
function Kick() {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    const timers = [0, 150, 500].map((ms) => window.setTimeout(() => invalidate(), ms));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [invalidate]);
  return null;
}

function Knot({ reduce }: { reduce: boolean }) {
  const group = useRef<Group>(null);
  const spin = useRef(0.5);
  const pointer = useRef({ x: 0, y: 0 });
  const width = useThree((s) => s.size.width);
  const small = width < 560;
  const baseScale = small ? 0.82 : 1;

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g || reduce) return;
    spin.current += delta * 0.16;
    const scroll = Math.min(window.scrollY / 800, 1.5);
    const targetX = 0.35 + pointer.current.y * 0.35 + scroll * 0.9;
    const targetY = spin.current + pointer.current.x * 0.55 + scroll * 1.2;
    g.rotation.x = MathUtils.damp(g.rotation.x, targetX, 3, delta);
    g.rotation.y = MathUtils.damp(g.rotation.y, targetY, 3, delta);
    g.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.07 - scroll * 0.22;
    const s = MathUtils.damp(g.scale.x, baseScale * (1 - scroll * 0.1), 3, delta);
    g.scale.set(s, s, s);
  });

  return (
    <group ref={group} rotation={[0.35, 0.5, 0]} scale={baseScale}>
      <mesh>
        <torusKnotGeometry args={small ? [0.85, 0.27, 120, 24, 2, 3] : [0.85, 0.27, 240, 48, 2, 3]} />
        <MeshDistortMaterial color="#c9baff" distort={0.42} speed={reduce ? 0 : 1.1} {...physical} />
      </mesh>
    </group>
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[3, 4, 5]} intensity={0.9} />
      <Environment resolution={256} frames={1}>
        <color attach="background" args={["#120d26"]} />
        {/* Soft boxes: a chartreuse key, a lavender fill and white strips for crisp chrome edges. */}
        <Lightformer form="rect" intensity={5} color="#d4ff3a" position={[3.5, 2, -1]} rotation={[0, -Math.PI / 3, 0]} scale={[5, 3, 1]} />
        <Lightformer form="rect" intensity={3.5} color="#b9a6ff" position={[-4, 0.5, 1]} rotation={[0, Math.PI / 2.4, 0]} scale={[5, 4, 1]} />
        <Lightformer form="rect" intensity={3} color="#ffffff" position={[0, 5, 1]} rotation={[Math.PI / 2, 0, 0]} scale={[8, 2, 1]} />
        <Lightformer form="ring" intensity={2.5} color="#ffffff" position={[0, -1.5, 4]} scale={4} />
        <Lightformer form="rect" intensity={2} color="#ffffff" position={[0, 0, -5]} scale={[10, 2, 1]} />
      </Environment>
    </>
  );
}

export default function HeroScene({ onReady }: { onReady: () => void }) {
  const reduce = Boolean(useReducedMotion());
  const wrap = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [lowDpr, setLowDpr] = useState(false);

  // Pause rendering while the hero is off-screen.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "80px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const frameloop: "always" | "demand" | "never" = reduce ? "demand" : inView ? "always" : "never";

  return (
    <div ref={wrap} className="pointer-events-none absolute inset-0">
      <SceneBoundary>
        <Canvas
          frameloop={frameloop}
          dpr={lowDpr ? 1 : [1, 1.75]}
          camera={{ position: [0, 0, 5.4], fov: 35 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          onCreated={() => onReady()}
        >
          <Lighting />
          <Knot reduce={reduce} />
          <Kick />
          <PerformanceMonitor onDecline={() => setLowDpr(true)} />
        </Canvas>
      </SceneBoundary>
    </div>
  );
}
