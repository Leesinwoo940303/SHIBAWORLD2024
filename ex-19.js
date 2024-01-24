import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
    
  // 장면 추가
  const scene = new THREE.Scene();
  scene.add(new THREE.AxesHelper(5));

  // 카메라 추가
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 0.5);
  camera.lookAt(0, 0, 0);

  // 렌더러 추가
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const container = document.querySelector('.threejs-container');
  container.appendChild(renderer.domElement);

  // 빛
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // instantiate a loader
  const GLTFloader = new GLTFLoader();
  const GLTFObjGroup = new THREE.Object3D();


  // load a resource
  GLTFloader.load(
    '../static/ex-19/audir8.glb',
    function (gltf) {
      const GLTFObj = gltf.scene
      GLTFObj.scale.set(0.07, 0.07, 0.07)
      GLTFObj.position.set(0, -0.1, 0)
      GLTFObjGroup.add(GLTFObj)
      scene.add(GLTFObjGroup)
    },
    // 불러와지는 과정
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // 에러시
    function (error) {
      console.log('An error happened')
    }
  )


  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.defaults({
    immediateRender: false,
    scrub: true,
    ease: "power1.inOut"
  })

  let modelAni = gsap.timeline();
  
  modelAni.to(camera.position, {
    duration: 1,
    y: -0.05,
    z: 0.8
  })
  
  // section two
  modelAni.to(GLTFObjGroup.rotation, {
    x: 0,
    y: 1.5,
    z: 0,
    scrollTrigger: {
      trigger: '.section-two',
      start: 'top bottom',
      end: 'top bottom',
      markers: true
    }
  })

  modelAni.to(camera.position, {
    x:0,
    y: -0.1,
    z: 0.8,
    scrollTrigger: {
      trigger: '.section-two',
      start: 'top bottom',
      end: 'top bottom',
      markers: true
    }
  })



  // section two
  modelAni.to(GLTFObjGroup.rotation, {
    x: 0,
    y: 1.5,
    z: 0,
    scrollTrigger: {
      trigger: '.section-two',
      start: 'top bottom',
      end: 'top top',
      markers: true
    }
  })

  modelAni.to(camera.position, {
    x:0,
    y:0,
    z:0.5,
    scrollTrigger: {
      trigger: '.section-two',
      start: 'top bottom',
      end: 'top top',
      markers: true
    }
  })


  // section three
  modelAni.to(GLTFObjGroup.rotation, {
    x: 0,
    y: 2.5,
    z: 0.5,
    scrollTrigger: {
      trigger: '.section-three',
      start: 'top bottom',
      end: 'top top',
      markers: true
    }
  })

  modelAni.to(camera.position, {
    x:0.2,
    y:0.05,
    z:1,
    scrollTrigger: {
      trigger: '.section-three',
      start: 'top bottom',
      end: 'top top',
      markers: true
    }
  })


  // section four
  modelAni.to(GLTFObjGroup.rotation, {
    x: 0,
    y: 5,
    z: 0,
    scrollTrigger: {
      trigger: '.section-four',
      start: 'top center',
      end: 'bottom center',
      markers: true
    }
  })

  modelAni.to(camera.position, {
    x:-0.1,
    y:0,
    z:0.5,
    scrollTrigger: {
      trigger: '.section-four',
      start: 'top bottom',
      end: 'bottom center',
      markers: true
    }
  })
  



  // 애니메이션 함수
  function animate(currentTime) {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
  
  animate()


  // 반응형 처리
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  window.addEventListener('resize', onWindowResize)
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
