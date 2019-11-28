import React, { Component } from 'react'
import * as THREE from 'three'
import GLTFLoader from 'three-gltf-loader';
import OrbitControls from 'three-orbitcontrols'

import {MTLLoader, OBJLoader} from 'three-obj-mtl-loader'

                
class GLTFLoaderExample extends Component {
    
    initCamera()
    {
        let width = this.mount.clientWidth
        let height = this.mount.clientHeight

        let camera = new THREE.PerspectiveCamera(40, width / height, 1, 2000)
        camera.position.set( -10, 10, 30 );

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

        // A reusable function to set up the models. We're passing in a position parameter
        // so that they can be individually placed around the scene
        new MTLLoader().load('models/bench.mtl', (materials) => {
            materials.preload()
            let objLoader = new OBJLoader();
            objLoader.setMaterials(materials)
            objLoader.load('models/bench.obj', (object) => {
                object.scale.set(10, 10, 10)
                object.position.copy(new THREE.Vector3( 0, -0, 0 ))
            this.scene.add(object)
            })
        })

        let loader = new GLTFLoader();

        loader.load(
            'models/action-girl/scene.gltf',
            ( gltf ) => {
                // called when the resource is loaded
                const model = gltf.scene.children[ 0 ];
                
                console.log(model);
                model.scale.set(0.05, 0.05, 0.05)
                model.position.copy(new THREE.Vector3( -5, 0, 0 ))
                

                const animation = gltf.animations[ 0 ];

                const mixer = new THREE.AnimationMixer( model );
                this.mixers.push( mixer );

                const action = mixer.clipAction( animation );
                action.play();

                this.scene.add( model );
            },
            ( xhr ) => {
                // called while loading is progressing
                console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
            },
            ( error ) => {
                // called when loading has errors
                console.error( 'An error happened', error );
            },
        );
    }
    initLight()
    {
        let ambientLight = new THREE.AmbientLight( 0xffffff, 1 );
        this.scene.add( ambientLight );

        let frontLight = new THREE.DirectionalLight( 0xffffff, 1 );
        frontLight.position.set( 20, 20, 150 );
        var helperf = new THREE.DirectionalLightHelper( frontLight, 5 );
        this.scene.add( helperf );

        let backLight = new THREE.DirectionalLight( 0xff0000, 1 );
        backLight.position.set( -20, 20, -150 );
        var helperb = new THREE.DirectionalLightHelper( backLight, 5 );
        this.scene.add( helperb );

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
        //let orbit = new OrbitControls( this.camera, this.renderer.domElement );
        //this.scene.add(orbit);
    }
    componentDidMount() {
        this.mixers = [];
        this.initCamera()
        this.initScene()
        this.initLight()
        this.initRenderer()
        this.initController()
        this.loadModels()

        this.clock = new THREE.Clock();
        //response for changing window size
        window.addEventListener('resize', this.handleResize)

        this.mount.appendChild(this.renderer.domElement)
        
        this.renderer.setAnimationLoop( () => {
            this.update();
            this.renderScene();
          } );
        
    }

    componentWillUnmount() {
        window.removeEventListener('resize',  this.handleResize)
        
        this.mount.removeChild(this.renderer.domElement)
    }

    handleResize = () => {
        
        let width = this.mount.clientWidth
        let height = this.mount.clientHeight
        
        this.renderer.setSize(width, height)
        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()
    }

    update() {
        const delta = this.clock.getDelta();
        this.mixers.forEach( ( mixer ) => { mixer.update( delta ); } );
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

export default GLTFLoaderExample
