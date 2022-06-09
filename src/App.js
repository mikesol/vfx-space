import {
  Effects,
  OrbitControls,
  PerspectiveCamera,
  useGLTF
} from "@react-three/drei";
import { Canvas, extend } from "@react-three/fiber";
import { HalfFloatType, LinearEncoding, Vector2 } from "three";
import { AdaptiveToneMappingPass } from "three/examples/jsm/postprocessing/AdaptiveToneMappingPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { VignetteShader } from "three/examples/jsm/shaders/VignetteShader.js";
import { Skybox } from "./Skybox";
import { Nebula } from "./effects/Nebula";
import { Debris } from "./effects/Debris";
import { Suspense } from "react";
import { Perf } from "r3f-perf";

extend({ UnrealBloomPass, AdaptiveToneMappingPass, ShaderPass });

const Spaceship = () => {
  const gltf = useGLTF("/models/spaceship26_mod.gltf");

  /* GLTF caps emissivion values at 1, but we can boost it manually */
  gltf.materials["Imphenzia"].emissiveIntensity = 1.3;

  return <primitive object={gltf.scene} />;
};

const RenderPipeline = () => (
  <Effects disableGamma encoding={LinearEncoding} type={HalfFloatType}>
    <unrealBloomPass args={[new Vector2(256, 256), 1.5, 0.0, 1.0]} />
    <adaptiveToneMappingPass args={[true, 256]} />
    <shaderPass args={[VignetteShader]} />
  </Effects>
);

export const App = () => (
  <Canvas flat dpr={[1, 1]}>
    <Perf />
    <RenderPipeline />
    <Skybox />
    <fogExp2 args={["#000", 0.005]} attach="fog" />

    <ambientLight intensity={0.5} />
    <directionalLight intensity={0.5} position={[20, 0, -10]} />
    <pointLight intensity={1} position={[0, 20, 0]} color="hotpink" />

    <PerspectiveCamera position={[-30, 20, 50]} makeDefault />
    <OrbitControls autoRotate autoRotateSpeed={1} />

    <Nebula position={[10, 20, -50]} size={10} count={20} color="hotpink" />
    <Nebula position={[-40, 0, -80]} size={30} count={50} />
    <Nebula position={[20, 5, 20]} size={30} count={50} />
    <Nebula position={[5, 10, -20]} size={80} count={50} />

    <Debris />

    <Suspense>
      <Spaceship />
    </Suspense>
  </Canvas>
);
