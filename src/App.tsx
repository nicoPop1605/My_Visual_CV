// https://cydstumpel.nl/
import { projects, type Project } from "./data/projects";
import { ProjectDetail } from "./components/ProjectDetail";
import * as THREE from "three";
import { memo, useRef, useState } from "react";
import {
  Canvas,
  useFrame,
  type ThreeElements,
  type ThreeEvent,
} from "@react-three/fiber";
import {
  Image,
  Environment,
  ScrollControls,
  useScroll,
  useTexture,
} from "@react-three/drei";
import { easing } from "maath";
import "./util";
import type { MeshSineMaterial } from "./util";

// The 3D scene. memo() means it only re-renders if its props change,
// so opening or closing the panel no longer touches the canvas.
const Scene = memo(function Scene({
    onSelect,
}: {
    onSelect: (p: Project) => void;
}) {
    return (
        <Canvas camera={{ position: [0, 0, 100], fov: 15 }}>
            <fog attach="fog" args={["#a79", 8.5, 12]} />
            <ScrollControls pages={4} infinite>
                <Rig rotation={[0, 0, 0.15]}>
                    <Carousel onSelect={onSelect} />
                </Rig>
                <Banner position={[0, -0.15, 0]} />
            </ScrollControls>
            <Environment preset="dawn" background blur={0.5} />
        </Canvas>
    );
});

export const App = () => {
    // Which project is open (null = panel closed)
    const [selected, setSelected] = useState<Project | null>(null);
    return (
        <>
            <Scene onSelect={setSelected} />
            <ProjectDetail project={selected} onClose={() => setSelected(null)} />
        </>
    );
};

function Rig(props: ThreeElements["group"]) {
  const ref = useRef<THREE.Group>(null!);
  const scroll = useScroll();
    useFrame((state, delta) => {
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2); // Rotate contents
    state.events.update?.(); // Raycasts every frame rather than on pointer-move
    easing.damp3(
      state.camera.position,
      [-state.pointer.x * 2, state.pointer.y + 1.5, 10],
      0.3,
      delta,
    ); // Move camera
    state.camera.lookAt(0, 0, 0); // Look at center
  });
  return <group ref={ref} {...props} />;
}

function Carousel({
    radius = 1.4,
    onSelect,
}: {
    radius?: number;
    onSelect: (p: Project) => void;
}) {
    const count = projects.length;
    return (
        <>
            {projects.map((p, i) => (
                <Card
                    key={p.id}
                    url={p.cover}
                    onClick={() => onSelect(p)}
                    position={[
                        Math.sin((i / count) * Math.PI * 2) * radius,
                        0,
                        Math.cos((i / count) * Math.PI * 2) * radius,
                    ]}
                    rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
                />
            ))}
        </>
    );
}

function Card({
    url,
    onClick,

  ...props
}: { url: string; onClick: () => void } & Pick<
    ThreeElements["mesh"],
    "position" | "rotation"
    >) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const pointerOver = (e: ThreeEvent<PointerEvent>) => (
    e.stopPropagation(),
    hover(true)
  );
  const pointerOut = () => hover(false);
  useFrame((state, delta) => {
    easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta);
    easing.damp(
      ref.current.material,
      "radius",
      hovered ? 0.25 : 0.1,
      0.2,
      delta,
    );
    easing.damp(ref.current.material, "zoom", hovered ? 1 : 1.5, 0.2, delta);
  });
  return (
    <Image
      ref={ref}
      url={`${import.meta.env.BASE_URL}${url.replace(/^\//, "")}`}
      transparent
      side={THREE.DoubleSide}
      onPointerOver={pointerOver}
      onClick={(e: ThreeEvent<MouseEvent>) => {
           e.stopPropagation();
           onClick();
      }}
      onPointerOut={pointerOut}
      {...props}
    >
      <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
    </Image>
  );
}

function Banner(props: ThreeElements["mesh"]) {
  const ref = useRef<THREE.Mesh<THREE.BufferGeometry, MeshSineMaterial>>(null!);
  const texture = useTexture(
      `${import.meta.env.BASE_URL}logo.jpg`,
  );
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  const scroll = useScroll();
  useFrame((state, delta) => {
    ref.current.material.time.value += Math.abs(scroll.delta) * 4;
    ref.current.material.map!.offset.x += delta / 2;
  });
  return (
    <mesh ref={ref} {...props}>
      <cylinderGeometry args={[1.6, 1.6, 0.14, 128, 16, true]} />
      <meshSineMaterial
        map={texture}
        map-anisotropy={16}
        map-repeat={[30, 1]}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}
