<script setup lang="ts">
import { useParentElement } from '@vueuse/core'
import * as THREE from 'three'
import Stats from 'three/addons/libs/stats.module.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';

const mycanvas = useTemplateRef('canvas')
const parentEl = useParentElement()

let WIDTH
let HEIGHT

let renderer, scene, camera, stats
let sphere, length1

const vertexShader = `
attribute float size;
			attribute vec3 ca;
			varying vec3 vColor;

			void main() {
				vColor = ca;
				vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
				gl_PointSize = size * ( 300.0 / -mvPosition.z );
				gl_Position = projectionMatrix * mvPosition;
			}
`;

const fragmentShader = `
uniform vec3 color;
			uniform sampler2D pointTexture;
			varying vec3 vColor;

			void main() {
				vec4 color = vec4( color * vColor, 1.0 ) * texture2D( pointTexture, gl_PointCoord );
				gl_FragColor = color;
			}
`;

onMounted(() => {
    WIDTH = parentEl.value!.clientWidth
    HEIGHT = parentEl.value!.clientWidth
    camera = new THREE.PerspectiveCamera(55, WIDTH / HEIGHT, 1, 10000)
    camera.position.z = 280
    camera.position.y = -18

    scene = new THREE.Scene()

    const radius = 100, segments = 68, rings = 38

    let sphereGeometry = new THREE.SphereGeometry(radius, segments, rings) as THREE.BufferGeometry

    // if normal and uv attributes are not removed, mergeVertices() can't consolidate identical vertices with different normal/uv data
    sphereGeometry.deleteAttribute('normal')
    sphereGeometry.deleteAttribute('uv')

    sphereGeometry = BufferGeometryUtils.mergeVertices(sphereGeometry)

    const positionAttribute = sphereGeometry.getAttribute('position')

    const colors = []
    const sizes = []

    const color = new THREE.Color()
    const vertex = new THREE.Vector3()

    length1 = sphereGeometry.getAttribute('position').count

    for (let i = 0, l = positionAttribute.count; i < l; i++) {
        vertex.fromBufferAttribute(positionAttribute, i)
        color.toArray(colors, i * 3)
        sizes[i] = i < length1 ? 10 : 40
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', positionAttribute)
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))
    geometry.setAttribute('ca', new THREE.Float32BufferAttribute(colors, 3))

    const texture = new THREE.TextureLoader().load('img/triangle.png')
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping

    const material = new THREE.ShaderMaterial({
        uniforms: {
            color: { value: new THREE.Color(0x82b2ca) },
            pointTexture: { value: texture }
        },
        vertexShader,
        fragmentShader,
        transparent: true,
    })

    sphere = new THREE.Points(geometry, material)
    scene.add(sphere)

    camera.aspect = parentEl.value!.clientWidth/parentEl.value!.clientHeight
    camera.updateProjectionMatrix()
  

    renderer = new THREE.WebGLRenderer({ canvas: mycanvas.value as HTMLCanvasElement, alpha:true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(WIDTH, HEIGHT)
  
    renderer.setAnimationLoop(animate)

    stats = new Stats()

    window.addEventListener('resize', onWindowResize)
    window.addEventListener("deviceorientation", onWindowResize)
})

const onWindowResize = () => {
    let objHeight = parentEl.value!.clientHeight
    let objWidth = parentEl.value!.clientWidth
    camera.aspect = objWidth / objHeight
    camera.updateProjectionMatrix()
    renderer.setSize(objWidth, objHeight)
}

const sortPoints = () => {
    const vector = new THREE.Vector3()
    // Model View Projection matrix
    const matrix = new THREE.Matrix4()
    matrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
    matrix.multiply(sphere.matrixWorld)

    const geometry = sphere.geometry

    let index = geometry.getIndex()
    const positions = geometry.getAttribute('position').array
    const length = positions.length / 3

    if (index === null) {
        const array = new Uint16Array(length)
        for (let i = 0; i < length; i++) {
            array[i] = i
        }
        index = new THREE.BufferAttribute(array, 1)
        geometry.setIndex(index)
    }

    const sortArray = []

    for (let i = 0; i < length; i++) {
        vector.fromArray(positions, i * 3)
        vector.applyMatrix4(matrix)
        sortArray.push([vector.z, i])
    }

    function numericalSort(a, b) {
        return b[0] - a[0]
    }

    sortArray.sort(numericalSort)
    const indices = index.array

    for (let i = 0; i < length; i++) {
        indices[i] = sortArray[i][1]
    }
    geometry.index.needsUpdate = true
}

const animate = () => {
    const time = Date.now() * 0.005

    sphere.rotation.y = 0.02 * time
    sphere.rotation.z = 0.02 * time

    const geometry = sphere.geometry
    const attributes = geometry.attributes

    for (let i = 0; i < attributes.size.array.length; i++) {
        if (i < length1) {
            attributes.size.array[i] = 5 + 20 * Math.sin(0.1 * i + time)
        }
    }

    attributes.size.needsUpdate = true
    sortPoints()
    renderer.render(scene, camera)
}
</script>


<template>
    <canvas class="canvas" ref="canvas" />
</template>

<style scoped lang="scss">
.canvas {
    height: 100% !important;
    border: none;
}
</style>