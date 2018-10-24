//Geometries.
const cubeGeometry = new THREE.BoxGeometry(5, 5, 1);

//Materials.
const cubeMaterial = new THREE.MeshPhongMaterial( {color: colours.WHITE} );

//Meshes.
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);