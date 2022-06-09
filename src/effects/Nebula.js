import { useTexture } from "@react-three/drei";
import { between, plusMinus } from "randomish";
import { useMemo } from "react";
import { AdditiveBlending, MeshStandardMaterial, TextureLoader } from "three";
import { Emitter, MeshParticles, ParticlesMaterial } from "vfx";

export const Nebula = ({
  size = 100,
  count = 500,
  color = "#fff",
  ...props
}) => {
  /* Can't get this to work with Suspense without breaking VFX right now :( */
  // const texture = useTexture("/textures/smoke.png");

  const texture = useMemo(
    () => new TextureLoader().load("/textures/smoke.png"),
    []
  );

  return (
    <MeshParticles {...props} renderOrder={100}>
      <planeGeometry />

      <ParticlesMaterial
        baseMaterial={MeshStandardMaterial}
        color={color}
        map={texture}
        blending={AdditiveBlending}
        depthTest={true}
        depthWrite={false}
        billboard
      />

      <Emitter
        initialParticles={count}
        setup={(c) => {
          c.position.set(plusMinus(size), plusMinus(size), plusMinus(size));
          c.velocity.randomDirection().multiplyScalar(between(0, 3));
          c.lifetime = Infinity;
          c.scaleStart.setScalar(between(1, 50));
          c.scaleEnd.setScalar(0);
          c.alphaStart = between(0.05, 0.1);
          c.alphaEnd = c.alphaStart;
        }}
      />
    </MeshParticles>
  );
};
