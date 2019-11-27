import React, { Component } from 'react'
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'

class OrbitControlExample extends Component {
  componentDidMount() {
    let width = this.mount.clientWidth
    let height = this.mount.clientHeight
    
    //scene
    let scene = new THREE.Scene()
    scene.background = new THREE.Color( 0x8FBCD4 );
    
    //camera
    let camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000)
    camera.position.set( -10, 10, -10 );

    //rendere
    let renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)

    //geometry
    var geometry = new THREE.SphereBufferGeometry( 2, 50, 50 );
    var material = new THREE.MeshStandardMaterial( {color: 0x000000} );
    var sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );

    //add Directlight
    let light = new THREE.DirectionalLight( 0xffffff, 5.0 );
    light.position.set( 0, 5, 5 );
    light.intensity *= 5;
    scene.add( light );
    var helper = new THREE.DirectionalLightHelper( light, 5 );

    scene.add( helper );

    //set this. valuable
    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.material = material
    this.sphere = sphere

    //add orbit controller
    let orbit = new OrbitControls( camera, renderer.domElement );
    scene.add(orbit);

    //response for changing window size
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
    this.sphere.rotation.x += 0.01
    this.sphere.rotation.y += 0.01
    this.sphere.rotation.z += 0.01

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

export default OrbitControlExample
