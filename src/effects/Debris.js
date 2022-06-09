import { between, plusMinus, power } from "randomish";
import { MeshStandardMaterial } from "three";
import { Emitter, MeshParticles, ParticlesMaterial } from "vfx";

export const Debris = ({ size = 100, count = 500, ...props }) => {
  return (
    <MeshParticles {...props} renderOrder={1}>
      <boxGeometry args={[0.2, 0.2, 0.1]} />

      <ParticlesMaterial
        baseMaterial={MeshStandardMaterial}
        color="#fff"
        depthTest={true}
        depthWrite={false}
        billboard
      />

      <Emitter
        initialParticles={count}
        setup={(c) => {
          c.position.set(plusMinus(size), plusMinus(size), plusMinus(size));
          c.velocity.randomDirection().multiplyScalar(between(0, 1));
          c.colorStart.setScalar(0.2 + power(3) * 2);
          c.lifetime = Infinity;
          c.alphaStart = 0.5;
        }}
      />
    </MeshParticles>
  );
};
