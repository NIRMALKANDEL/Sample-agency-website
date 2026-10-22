"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, PerformanceMonitor, RoundedBox } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { BufferGeometry, DoubleSide, ExtrudeGeometry, Float32BufferAttribute, MathUtils, Shape } from "three";
import type { Group } from "three";

/**
 * Hero 3D sculpture: glossy social "reactions" (a heart, a paper plane, a play button, a speech bubble,
 * a bookmark and a few orbs) floating in a loose cluster. The cluster leans toward the pointer and
 * drifts apart as the page scrolls.
 *
 * - Lit with drei Lightformers inside <Environment> (no HDR downloads).
 * - Rendering pauses off-screen and is static under reduced motion.
 * - Smaller cluster on narrow containers.
 */

const TOMATO = "#ff4f2b";
const CHARTREUSE = "#d8ff3c";
const LAVENDER = "#b8a2ff";
const UV = "#3a1f9e";
const WHITE = "#f5f0ff";

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function Kick() {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    const timers = [0, 150, 500].map((ms) => window.setTimeout(() => invalidate(), ms));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [invalidate]);
  return null;
}

function Glossy({ color, rough = 0.18 }: { color: string; rough?: number }) {
  return <meshPhysicalMaterial color={color} roughness={rough} metalness={0.1} clearcoat={1} clearcoatRoughness={0.08} side={DoubleSide} />;
}

function useHeart() {
  return useMemo(() => {
    const s = new Shape();
    s.moveTo(0, -0.55);
    s.bezierCurveTo(-0.15, -0.4, -0.75, -0.05, -0.75, 0.3);
    s.bezierCurveTo(-0.75, 0.62, -0.42, 0.8, -0.2, 0.7);
    s.bezierCurveTo(-0.08, 0.64, 0, 0.52, 0, 0.45);
    s.bezierCurveTo(0, 0.52, 0.08, 0.64, 0.2, 0.7);
    s.bezierCurveTo(0.42, 0.8, 0.75, 0.62, 0.75, 0.3);
    s.bezierCurveTo(0.75, -0.05, 0.15, -0.4, 0, -0.55);
    const g = new ExtrudeGeometry(s, { depth: 0.28, bevelEnabled: true, bevelSize: 0.08, bevelThickness: 0.1, bevelSegments: 6, curveSegments: 24 });
    g.center();
    return g;
  }, []);
}

function useBookmark() {
  return useMemo(() => {
    const s = new Shape();
    s.moveTo(-0.32, 0.5);
    s.lineTo(0.32, 0.5);
    s.lineTo(0.32, -0.5);
    s.lineTo(0, -0.26);
    s.lineTo(-0.32, -0.5);
    s.lineTo(-0.32, 0.5);
    const g = new ExtrudeGeometry(s, { depth: 0.14, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05, bevelSegments: 4 });
    g.center();
    return g;
  }, []);
}

function usePlayTriangle() {
  return useMemo(() => {
    const s = new Shape();
    s.moveTo(-0.16, 0.22);
    s.lineTo(0.24, 0);
    s.lineTo(-0.16, -0.22);
    s.lineTo(-0.16, 0.22);
    const g = new ExtrudeGeometry(s, { depth: 0.08, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 3 });
    g.center();
    return g;
  }, []);
}

/** A folded paper plane: two wings and a keel. */
function usePlane() {
  return useMemo(() => {
    const nose = [1, 0, 0];
    const tailL = [-0.7, 0.05, 0.62];
    const tailR = [-0.7, 0.05, -0.62];
    const tailC = [-0.7, 0, 0];
    const keel = [-0.7, -0.32, 0];
    const tris = [nose, tailL, tailC, nose, tailC, tailR, nose, keel, tailC];
    const g = new BufferGeometry();
    g.setAttribute("position", new Float32BufferAttribute(tris.flat(), 3));
    g.computeVertexNormals();
    return g;
  }, []);
}

function Reactions({ reduce }: { reduce: boolean }) {
  const group = useRef<Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  // Fit the cluster to the canvas: it spans roughly 5.6 × 4.6 world units at scale 1.
  const view = useThree((s) => s.viewport);
  const base = Math.min(1, view.width / 5.6, view.height / 4.6);
  const spread = useRef(1);

  const heart = useHeart();
  const bookmark = useBookmark();
  const play = usePlayTriangle();
  const plane = usePlane();

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
    const scroll = Math.min(window.scrollY / 700, 1.4);
    g.rotation.y = MathUtils.damp(g.rotation.y, pointer.current.x * 0.5 + state.clock.elapsedTime * 0.06, 2.5, delta);
    g.rotation.x = MathUtils.damp(g.rotation.x, pointer.current.y * 0.3 + scroll * 0.4, 2.5, delta);
    spread.current = MathUtils.damp(spread.current, 1 + scroll * 0.55, 3, delta);
    g.children.forEach((child) => {
      const home = child.userData.home as [number, number, number] | undefined;
      if (home) child.position.set(home[0] * spread.current, home[1] * spread.current, home[2]);
    });
  });

  const speed = reduce ? 0 : 1.6;
  const items: { home: [number, number, number]; node: ReactNode; rot?: [number, number, number]; s?: number }[] = [
    { home: [0.15, 0.25, 0.3], rot: [0.1, -0.35, -0.12], s: 1.25, node: <mesh geometry={heart}><Glossy color={TOMATO} /></mesh> },
    { home: [-1.35, 0.95, -0.4], rot: [0.5, 0.6, 0.25], s: 0.95, node: <mesh geometry={plane}><Glossy color={WHITE} rough={0.3} /></mesh> },
    {
      home: [1.45, -0.75, 0],
      rot: [0.2, -0.5, 0.15],
      s: 0.95,
      node: (
        <group>
          <RoundedBox args={[1.05, 0.8, 0.3]} radius={0.16} smoothness={5}>
            <Glossy color={CHARTREUSE} />
          </RoundedBox>
          <mesh geometry={play} position={[0.03, 0, 0.2]}>
            <Glossy color={UV} />
          </mesh>
        </group>
      ),
    },
    {
      home: [-1.25, -0.95, 0.2],
      rot: [-0.2, 0.55, -0.15],
      s: 0.9,
      node: (
        <group>
          <RoundedBox args={[1.05, 0.72, 0.26]} radius={0.24} smoothness={5}>
            <Glossy color={LAVENDER} />
          </RoundedBox>
          <mesh position={[-0.3, -0.42, 0]} rotation={[0, 0, 0.6]}>
            <coneGeometry args={[0.12, 0.3, 24]} />
            <Glossy color={LAVENDER} />
          </mesh>
          {[-0.24, 0, 0.24].map((x) => (
            <mesh key={x} position={[x, 0, 0.15]}>
              <sphereGeometry args={[0.07, 20, 20]} />
              <Glossy color={UV} />
            </mesh>
          ))}
        </group>
      ),
    },
    { home: [1.3, 1.05, -0.6], rot: [0.3, -0.4, 0.3], s: 0.85, node: <mesh geometry={bookmark}><Glossy color={UV} rough={0.25} /></mesh> },
    { home: [0.1, -1.45, -0.5], node: <mesh><sphereGeometry args={[0.26, 48, 48]} /><Glossy color={CHARTREUSE} /></mesh> },
    { home: [-0.35, 1.5, -1], node: <mesh><torusGeometry args={[0.24, 0.1, 24, 64]} /><Glossy color={TOMATO} /></mesh> },
    { home: [2.1, 0.2, -1.2], node: <mesh><sphereGeometry args={[0.16, 32, 32]} /><Glossy color={LAVENDER} /></mesh> },
    { home: [-2.05, 0.05, -1], node: <mesh><icosahedronGeometry args={[0.2, 0]} /><Glossy color={TOMATO} rough={0.3} /></mesh> },
  ];

  return (
    <group ref={group} scale={base}>
      {items.map((it, i) => (
        <group key={i} position={it.home} userData={{ home: it.home }}>
          <Float speed={speed} rotationIntensity={reduce ? 0 : 0.9} floatIntensity={reduce ? 0 : 0.9} floatingRange={[-0.08, 0.08]}>
            <group rotation={it.rot ?? [0, 0, 0]} scale={it.s ?? 1}>
              {it.node}
            </group>
          </Float>
        </group>
      ))}
    </group>
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />
      <Environment resolution={256} frames={1}>
        <color attach="background" args={["#1a0b40"]} />
        <Lightformer form="rect" intensity={4} color="#ffffff" position={[0, 5, 2]} rotation={[Math.PI / 2, 0, 0]} scale={[10, 3, 1]} />
        <Lightformer form="rect" intensity={3.5} color="#b8a2ff" position={[-5, 1, 1]} rotation={[0, Math.PI / 2.4, 0]} scale={[5, 5, 1]} />
        <Lightformer form="rect" intensity={3} color="#ff8a6b" position={[5, 0, 1]} rotation={[0, -Math.PI / 2.4, 0]} scale={[5, 4, 1]} />
        <Lightformer form="ring" intensity={2.5} color="#ffffff" position={[0, -2, 5]} scale={4} />
      </Environment>
    </>
  );
}

export default function HeroScene({ onReady }: { onReady: () => void }) {
  const reduce = Boolean(useReducedMotion());
  const wrap = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [lowDpr, setLowDpr] = useState(false);

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
          camera={{ position: [0, 0, 7], fov: 35 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          onCreated={() => onReady()}
        >
          <Lighting />
          <Reactions reduce={reduce} />
          <Kick />
          <PerformanceMonitor onDecline={() => setLowDpr(true)} />
        </Canvas>
      </SceneBoundary>
    </div>
  );
}
