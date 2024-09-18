import { useEffect, useRef } from 'react'

import * as THREE from 'three'

const ThreeSample = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    const w = window.innerWidth
    const h = window.innerHeight

    const renderer = new THREE.WebGLRenderer()

    const elm = mountRef.current

    elm?.appendChild(renderer.domElement)

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(w, h)

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(45, w / h, 1, 10000)
    camera.position.set(0, 0, +1000)

    const geometry = new THREE.SphereGeometry(30, 30, 30)

    // const loader = new THREE.TextureLoader()
    // const texture = loader.load('/earthMap1k.jpg')
    // texture.colorSpace = THREE.SRGBColorSpace;
    // const material = new THREE.MeshStandardMaterial({
    //   map: texture,
    // })

    const material = new THREE.MeshStandardMaterial({color: 0x6699FF, roughness:0.3});

    const mesh = new THREE.Mesh(geometry, material)

    scene.add(mesh)

    const directionalLight = new THREE.DirectionalLight(0xffffff)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    // const directionalLight2 = new THREE.DirectionalLight(0xaaffff)
    // directionalLight2.position.set(-1, 1, 1)
    // scene.add(directionalLight2)

    const tick = () => {
      mesh.rotation.y += 0.01
      renderer.render(scene, camera)

      requestAnimationFrame(tick)
    }

    tick()

    return () => {
      elm?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div ref={mountRef} />
  )
}

export default ThreeSample
