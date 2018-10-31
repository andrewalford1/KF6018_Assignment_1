function getPlanetMaterial(planetColour)
{
    return new THREE.MeshStandardMaterial( {color: planetColour, flatShading: THREE.FlatShading, metalness: 0, roughness: 1} );
}