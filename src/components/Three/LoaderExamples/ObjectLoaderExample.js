import React, { Component } from 'react'
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import {MTLLoader, OBJLoader} from 'three-obj-mtl-loader'

                
class ObjectLoaderExample extends Component {
    
    initCamera()
    {
        let width = this.mount.clientWidth
        let height = this.mount.clientHeight

        let camera = new THREE.PerspectiveCamera(2, width / height, 0.1, 2000)
        camera.position.set( -50, 50, 150 );

        this.camera = camera
    }
    initScene()
    {
        let scene = new THREE.Scene()
        scene.background = new THREE.Color( 0x8FBCD4 );

        this.scene = scene
    }
    loadModels()
    {
        //Load model
        new MTLLoader().load('models/bench.mtl', (materials) => {
            materials.preload()
            let objLoader = new OBJLoader();
            objLoader.setMaterials(materials)
            objLoader.load('models/bench.obj', (object) => {
            this.scene.add(object)
            })
        })
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
        this.initLight()
        this.initRenderer()
        this.initController()
        this.loadModels()

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
