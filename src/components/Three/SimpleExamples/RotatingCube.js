import React, { Component } from 'react'
import * as THREE from 'three'

class RotatingCube extends Component {
  componentDidMount() {
    let width = this.mount.clientWidth
    let height = this.mount.clientHeight
    

    let scene = new THREE.Scene()
    let camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    let renderer = new THREE.WebGLRenderer({ antialias: true })
    let geometry = new THREE.BoxBufferGeometry(1, 1, 1)
    let material = new THREE.MeshBasicMaterial({ color: 0xff00ff })
    let cube = new THREE.Mesh(geometry, material)

    camera.position.z = 4

    scene.add(cube)

    renderer.setClearColor('#000000')
    renderer.setSize(width, height)

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.material = material
    this.cube = cube


    window.addEventListener('resize', this.handleResize)

    this.mount.appendChild(this.renderer.domElement)
    this.start()
  }

  componentWillUnmount() {
    window.removeEventListener('resize',  this.handleResize)
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  handleResize = () => {
    
    let width = this.mount.clientWidth
    let height = this.mount.clientHeight
    
    this.renderer.setSize(width, height)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop = () => {
    cancelAnimationFrame(this.frameId)
  }

  animate = () => {
    this.cube.rotation.x += 0.01
    this.cube.rotation.y += 0.01

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
      <div
        style={{ width: '100%', height: 'calc(100vh - 100px)' }}
        ref={mount => {
          this.mount = mount
        }}
      />
    )
  }
}

export default RotatingCube
