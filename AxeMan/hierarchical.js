/* CMPSCI 373 Homework 5: Hierarchical Scene */

const width = 800, height = 600;
const fov = 60;
const cameraz = 5;
const aspect = width/height;
const smoothShading = true;
let   animation_speed = 1.0;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(fov, aspect, 1, 1000);
camera.position.set(20, 7, cameraz);

let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(width, height);
renderer.setClearColor(0xadd8e6);
window.onload = function(e) {
	document.getElementById('window').appendChild(renderer.domElement);
}
let orbit = new THREE.OrbitControls(camera, renderer.domElement);	// create mouse control

let light0 = new THREE.DirectionalLight(0xFFFFFF, 1.0);
light0.position.set(camera.position.x, camera.position.y, camera.position.z);	// this light is at the camera
scene.add(light0);

let light1 = new THREE.DirectionalLight(0x800D0D, 1.0); // red light
light1.position.set(-1, 1, 0);
scene.add(light1);

let light2 = new THREE.DirectionalLight(0x0D0D80, 1.0); // blue light
light2.position.set(1, 1, 0);
scene.add(light2);

let amblight = new THREE.AmbientLight(0x202020);	// ambient light
scene.add(amblight);

let models = []; // array that stores all models
let numModelsLoaded = 0;
let numModelsExpected = 0;

// load models
// ===YOUR CODE STARTS HERE===
let materialAxe = new THREE.MeshPhongMaterial({color:0xc0c0c0, specular:0x101010, shininess: 100, side:THREE.FrontSide});
let materialMale = new THREE.MeshPhongMaterial({color:0xff0000, specular:0x888888, shininess: 4, side:THREE.FrontSide});
let materialBunny = new THREE.MeshPhongMaterial({color:0xffffff, specular:0x101010, shininess: 20, side:THREE.FrontSide});
let materialTree = new THREE.MeshPhongMaterial({color:0x4b8b3b, specular:0x101010, shininess: 0, side:THREE.FrontSide});
let material = new THREE.MeshPhongMaterial({color:0x000000, specular:0x101010, shininess: 20, side:THREE.FrontSide});
//let material = new THREE.MeshPhongMaterial({color:0x808080, specular:0x101010, shininess: 20, side:THREE.FrontSide});
loadModel(male_model, materialMale, 'male');
loadModel(axe_model, materialAxe, 'axe');
loadModel(axe_model, materialAxe, 'axe2');
loadModel(bunny_model, materialBunny, 'bunny');
loadModel(tree_aspen_model, material, 'tree');
loadModel(tree_aspen_model, materialTree, 'tree2');
loadModel(tree_aspen_model, materialTree, 'tree3');
loadModel(ico_model, material, 'ico');
// ---YOUR CODE ENDS HERE---

//loadModel(bunny_model, material, 'earth');

// 'label' is a unique name for the model for accessing it later
function loadModel(objstring, material, label) {
	numModelsExpected++;
	loadOBJFromString(objstring, function(mesh) { // callback function for non-blocking load
		mesh.computeFaceNormals();
		if(smoothShading) mesh.computeVertexNormals();
		models[label] = new THREE.Mesh(mesh, material);
		numModelsLoaded++;
	}, function() {}, function() {});
}

let initialized = false;
function animate() {
	requestAnimationFrame( animate );
	if(numModelsLoaded == numModelsExpected) {	// all models have been loaded
		if(!initialized) {
			initialized = true;
			// construct the scene by adding models
// ===YOUR CODE STARTS HERE===
			//bunny
			scene.add(models['bunny']);
			models['bunny'].position.x=2.828;
			models['bunny'].position.y=-1;
			models['bunny'].scale.x = models['bunny'].scale.y = models['bunny'].scale.z = .3;
			//trees
			scene.add(models['tree']);
			models['tree'].position.y=1.7;
			models['tree'].scale.x = models['tree'].scale.y = models['tree'].scale.z = 3;
			scene.add(models['tree2']);
			models['tree2'].position.x=12;
			models['tree2'].scale.x = models['tree2'].scale.y = models['tree2'].scale.z = 4;
			scene.add(models['tree3']);
			models['tree3'].position.x=-17;
			models['tree3'].scale.x = models['tree3'].scale.y = models['tree3'].scale.z = 6;
			//boulder
			scene.add(models['ico']);
			models['ico'].position.y=1.7;
			models['ico'].scale.x = models['ico'].scale.y = models['ico'].scale.z = 5;
			models['ico'].visible = true;
			//axe
			models['axe'].position.x= -.35;
			models['axe'].rotation.set(1.57, 0, 0);
			models['axe'].scale.x = models['axe'].scale.y = models['axe'].scale.z = .5;
			//axe2
			models['axe2'].position.y= .7;
			models['axe2'].position.x= -.2;
			models['axe2'].rotation.set(0, 3.14, 0);
			models['axe2'].scale.x = models['axe2'].scale.y = models['axe2'].scale.z = .45;
			//man
			scene.add(models['male']);
			models['male'].position.x=2;
			models['male'].position.y=-.5;
			models['male'].position.z=2;
			//superAxe
			let superAxe = new THREE.Group();
			models['axe'].add(superAxe);
			superAxe.add(models['axe2']);
			
			//axeman
			let axeman = new THREE.Group();
			models['male'].add(axeman);
			axeman.add(models['axe']);
			//chase
			let chase = new THREE.Group();
			models['tree'].add(chase);
			chase.add(models['male']);
			chase.add(models['bunny']);
			


			
			
// ---YOUR CODE ENDS HERE---
			//scene.add(models['sun']);
			//models['earth'].position.x=3;
			//scene.add(models['earth']);
		}
		// animate the scene
// ===YOUR CODE STARTS HERE===
	models['axe2'].rotation.z -= .5 * animation_speed;
	models['axe'].rotation.x+=.01*animation_speed;
	models['male'].rotation.y+=.1*animation_speed;
	models['tree'].rotation.y+=.03*animation_speed;
	

// ---YOUR CODE ENDS HERE---
		//models['sun'].rotation.y+=0.01*animation_speed;
		//models['earth'].rotation.y+=0.05*animation_speed;
	}
	light0.position.set(camera.position.x, camera.position.y, camera.position.z); // light0 always follows camera position
	renderer.render(scene, camera);
}

animate();

function onKeyDown(event) {
	switch(event.key) {
		case 'w':
		case 'W':
			material.wireframe = !material.wireframe;
			break;
		case '=':
		case '+':
			animation_speed += 0.05;
			document.getElementById('msg').innerHTML = 'animation_speed = '+animation_speed.toFixed(2);
			break;
		case '-':
		case '_':
			if(animation_speed>0) animation_speed-=0.05;
			document.getElementById('msg').innerHTML = 'animation_speed = '+animation_speed.toFixed(2);
			break;
		case 'r':
		case 'R':
			orbit.reset();
			break;
	}
}

window.addEventListener('keydown', onKeyDown, false); // as key control if you need
