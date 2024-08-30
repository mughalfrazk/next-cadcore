/* eslint-disable react/no-unknown-property */
import React, { Suspense, useLayoutEffect, useRef } from "react";
import { Canvas as ThreeCanvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";

const Canvas = ({
  scene,
  shadows,
  contactShadow,
  autoRotate,
  environment,
  preset,
  intensity,
}: any) => {
  const ref: any = useRef();

  useLayoutEffect(() => {
    scene.traverse((obj: any) => {
      if (obj.isMesh) {
        obj.castShadow = obj.receiveShadow = shadows;
        obj.material.envMapIntensity = 0.8;
      }
    });
  }, [scene, shadows]);

  return (
    <ThreeCanvas
      gl={{ preserveDrawingBuffer: true }}
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 150], fov: 50 }}
    >
      <ambientLight intensity={0.25} />
      <Suspense fallback={null}>
        <Stage
          // controls={ref as any}
          preset={preset}
          intensity={intensity}
          // contactShadow={contactShadow}
          shadows
          adjustCamera
          environment={environment}
        >
          <primitive object={scene} />
        </Stage>
      </Suspense>
      <OrbitControls ref={ref} autoRotate={autoRotate} />
    </ThreeCanvas>
  );
};

export default Canvas;
