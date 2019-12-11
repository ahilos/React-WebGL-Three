import React, { Component } from 'react'
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'

class ObjectLoaderExample extends Component {
    
    initCamera()
    {
        let width = this.mount.clientWidth
        let height = this.mount.clientHeight
        
        let camera = new THREE.PerspectiveCamera(90, width / height, 1, 2000)
        
        camera.position.z = 4

        this.camera = camera
    }
    initScene()
    {
        let scene = new THREE.Scene()
        scene.background = new THREE.Color( 0x8FBCD4 );

        this.scene = scene
    }
    initMeshes()
    {
        let train = new THREE.Group();
        this.scene.add( train );

        //Create Material
        let bodyMaterial = new THREE.MeshStandardMaterial( {
            color: 0xff3333, // red
            flatShading: true,
          } );
        
        let detailMaterial = new THREE.MeshStandardMaterial( {
            color: 0x333333, // darkgrey
            flatShading: true,
        } );

        const noseGeometry = new THREE.CylinderBufferGeometry( 0.75, 0.75, 3, 32 );
        const nose = new THREE.Mesh( noseGeometry, bodyMaterial );

        nose.rotation.z = Math.PI / 2;
        nose.position.x = -1;
        

        const cabinGeometry = new THREE.BoxBufferGeometry( 2, 2.25, 1.5 );
        const cabin = new THREE.Mesh( cabinGeometry, bodyMaterial );
        cabin.position.set( 1.5, 0.4, 0 );

        train.add( nose, cabin );

        const wheelGeo = new THREE.CylinderBufferGeometry( 0.4, 0.4, 1.75, 16 );
        wheelGeo.rotateX( Math.PI / 2 );


        const smallWheelRear = new THREE.Mesh( wheelGeo, detailMaterial );
        smallWheelRear.position.set( 0, -0.5, 0 );

        const smallWheelCenter = smallWheelRear.clone();
        smallWheelCenter.position.x = -1;

        const smallWheelFront = smallWheelRear.clone();
        smallWheelFront.position.x = -2;

        const bigWheel = smallWheelRear.clone();
        bigWheel.scale.set( 2, 2, 1.25 );
        bigWheel.position.set( 1.5, -0.1, 0 );

        train.add( smallWheelRear, smallWheelCenter, smallWheelFront, bigWheel );

        const chimneyGeometry = new THREE.CylinderBufferGeometry( 0.3, 0.1, 0.5 );
        const chimney = new THREE.Mesh( chimneyGeometry, detailMaterial );
        chimney.position.set( -2, 0.9, 0 );
      
        train.add( chimney );
    }
    initLight()
    {
        let ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 );
        this.scene.add( ambientLight );

        let frontLight = new THREE.DirectionalLight( 0xffffff, 1 );
        frontLight.position.set( 10, 10, 10 );

        let backLight = new THREE.DirectionalLight( 0xffffff, 1 );
        backLight.position.set( -10, 10, -10 );

        this.scene.add( frontLight, backLight );
    }
    initRenderer()
    {
        let width = this.mount.clientWidth
        let height = this.mount.clientHeight

        let renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(width, height)
        renderer.setPixelRatio( window.devicePixelRatio );

        this.renderer = renderer
    }

    initController()
    {
        //add orbit
        let orbit = new OrbitControls( this.camera, this.renderer.domElement );
        this.scene.add(orbit);
    }
    componentDidMount() {

        this.initCamera()
        this.initScene()
        this.initMeshes()
        this.initLight()
        this.initRenderer()
        this.initController()

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

export default ObjectLoaderExample
