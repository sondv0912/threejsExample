import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);
camera.position.z = 5;
const axesHelper = new THREE.AxesHelper(5);
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5, 20, 20),
  new THREE.MeshBasicMaterial({
    color: 0x00fff4,
    wireframe: true,
    side: THREE.DoubleSide,
  })
);
scene.add(axesHelper);
scene.add(plane);
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
const controls = new OrbitControls(camera, renderer.domElement);
scene.add(controls);
renderer.setSize(innerWidth, innerHeight);
controls.update();
renderer.render(scene, camera);

document.body.appendChild(renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
