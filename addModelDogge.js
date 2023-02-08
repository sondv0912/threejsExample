import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/orbitcontrols.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const doggoURL = new URL("/glb/doggo2.glb", import.meta.url);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);
camera.position.set(10, 10, 10);
const scene = new THREE.Scene();
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0xa3a3a3);
const grid = new THREE.GridHelper(30);
const assetLoader = new GLTFLoader();
let mixer;
assetLoader.load(
  doggoURL.href,
  function (glft) {
    const model = glft.scene;
    scene.add(model);
    mixer = new THREE.AnimationMixer(model);
    const clips = glft.animations;
    // const clip = THREE.AnimationClip.findByName(clips, "HeadAction");
    // const action = mixer.clipAction(clip);
    // action.play();
    clips.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play();
    });
  },
  undefined,
  (error) => {
    console.log(error);
  }
);
scene.add(grid);
document.body.appendChild(renderer.domElement);
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();
const clock = new THREE.Clock();
function animate() {
  if (mixer) {
    mixer.update(clock.getDelta());
  }
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
