import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import earthImage from "/earth.jpg";
import jupiterImage from "/jupiter.jpg";
import marsImage from "/mars.jpg";
import mercuryImage from "/mercury.jpg";
import neptuneImage from "/neptune.jpg";
import plutoImage from "/pluto.jpg";
import saturnRingImage from "/saturn_ring.png";
import saturnImage from "/saturn.jpg";
import starsImage from "/stars.jpg";
import sunImage from "/sun.jpg";
import uranusRingImage from "/uranus_ring.png";
import uranusImage from "/uranus.jpg";
import venusImage from "/venus.jpg";

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(innerWidth, innerHeight);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);
camera.position.set(-90, 140, 140);
const light = new THREE.AmbientLight(0x333333);
scene.add(light);
const cubeTexture = new THREE.CubeTextureLoader();
scene.background = cubeTexture.load([
  starsImage,
  starsImage,
  starsImage,
  starsImage,
  starsImage,
  starsImage,
]);
const textureLoader = new THREE.TextureLoader();
// Sun
const sunMesh = new THREE.Mesh(
  new THREE.SphereGeometry(16, 30, 30),
  new THREE.MeshBasicMaterial({ map: textureLoader.load(sunImage) })
);
scene.add(sunMesh);
const createPlanete = (size, texture, position, ring) => {
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(size, 30, 30),
    new THREE.MeshStandardMaterial({ map: textureLoader.load(texture) })
  );
  const meshObj = new THREE.Object3D();
  mesh.position.x = position;
  meshObj.add(mesh);
  if (ring) {
    const ringMesh = new THREE.Mesh(
      new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32),
      new THREE.MeshBasicMaterial({
        map: textureLoader.load(ring.texture),
        side: THREE.DoubleSide,
      })
    );
    meshObj.add(ringMesh);
    ringMesh.position.x = position;
    ringMesh.rotateX(Math.PI / 2);
  }
  scene.add(meshObj);
  return { mesh, meshObj };
};
// Mercury
const mercury = createPlanete(3, mercuryImage, 30);
const venus = createPlanete(5.8, venusImage, 44);
const earth = createPlanete(6, earthImage, 62);
const mars = createPlanete(4, marsImage, 78);
const jupiter = createPlanete(12, jupiterImage, 100);
const saturn = createPlanete(10, saturnImage, 138, {
  innerRadius: 10,
  outerRadius: 20,
  texture: saturnRingImage,
});
const uranus = createPlanete(7, uranusImage, 176, {
  innerRadius: 7,
  outerRadius: 12,
  texture: uranusRingImage,
});
const neptune = createPlanete(7, neptuneImage, 200);
const pluto = createPlanete(2.8, plutoImage, 216);

const pointLight = new THREE.PointLight(0xffffff, 2, 300);
scene.add(pointLight);

document.body.appendChild(renderer.domElement);
const orBit = new OrbitControls(camera, renderer.domElement);
orBit.update();
function animate() {
  requestAnimationFrame(animate);
  // self rotation
  sunMesh.rotateY(0.004);
  mercury.mesh.rotateY(0.004);
  venus.mesh.rotateY(0.002);
  earth.mesh.rotateY(0.02);
  mars.mesh.rotateY(0.018);
  jupiter.mesh.rotateY(0.04);
  saturn.mesh.rotateY(0.038);
  uranus.mesh.rotateY(0.03);
  neptune.mesh.rotateY(0.032);
  pluto.mesh.rotateY(0.008);

  // around sun rotation
  mercury.meshObj.rotateY(0.04);
  venus.meshObj.rotateY(0.015);
  earth.meshObj.rotateY(0.01);
  mars.meshObj.rotateY(0.008);
  jupiter.meshObj.rotateY(0.002);
  saturn.meshObj.rotateY(0.0009);
  uranus.meshObj.rotateY(0.0004);
  neptune.meshObj.rotateY(0.0001);
  pluto.meshObj.rotateY(0.00007);

  renderer.render(scene, camera);
}

animate();
