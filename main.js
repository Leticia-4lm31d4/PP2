// Config Cena
const scene = new THREE.Scene();
// Config das cameras
const camera_superior = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 ); // (graus, proporção img, plano de recorte prox, plano de recorte dist)
const camera_diagonal_3eixos = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Config Renderizador
const renderer = new THREE.WebGLRenderer();
// Tamanho da tela
renderer.setSize( window.innerWidth, window.innerHeight );
// Linkando renderizador com o html
document.body.appendChild( renderer.domElement ); 


// Posição das câmeras
camera_superior.position.set(0, 15, 0); // Posiciona a câmera acima da cena
camera_superior.lookAt(new THREE.Vector3(0, 0, 0)); // Aponta a câmera para o centro da cena
camera_superior.up.set(0, 0, -1); // Define o vetor "up" da câmera para apontar para baixo
camera_superior.updateMatrixWorld();

camera_diagonal_3eixos.position.set(5, 6, 10);
camera_diagonal_3eixos.lookAt(scene.position);
camera_diagonal_3eixos.updateMatrixWorld();

// Iluminação
/*
var directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight.position.set(100,0,0);
scene.add(directionalLight);

var ambientLight = new THREE.AmbientLight(0x111111, 1.0);
scene.add(ambientLight);
*/

// Construindo Objetos / Modelos
const coordenadas = new THREE.AxesHelper(5);
scene.add(coordenadas);

// Sol
const solGeometry = new THREE.SphereGeometry(2, 32, 32); 
/*var sunTexture = new THREE.TextureLoader().load("sunTexture.jpeg");
var sunMaterial = new THREE.MeshBasicMaterial();

sunMaterial.map = sunTexture;*/

const solMaterial = new THREE.MeshBasicMaterial({color: 0xF8F8FF });
const sol = new THREE.Mesh(solGeometry, solMaterial);
sol.position.set(0,0,0);
scene.add(sol);

// Terra
const terraGeometry = new THREE.SphereGeometry(0.75, 32, 32); 
const terraMaterial = new THREE.MeshBasicMaterial({color: 0x1E90FF });
const terra = new THREE.Mesh(terraGeometry, terraMaterial);
terra.position.set(7,0,0);
scene.add(terra);

// Mercúrio
const mercurioGeometry = new THREE.SphereGeometry(0.25, 32, 32); 
const mercurioMaterial = new THREE.MeshBasicMaterial({color: 0xD2B48C });
const mercurio = new THREE.Mesh(mercurioGeometry, mercurioMaterial);
mercurio.position.set(3,0,0);
scene.add(mercurio);

// Venus
const venusGeometry = new THREE.SphereGeometry(0.7, 32, 32); 
const venusMaterial = new THREE.MeshBasicMaterial({color: 0xB8860B });
const venus = new THREE.Mesh(venusGeometry, venusMaterial);
venus.position.set(5,0,0);
scene.add(venus);

// Marte
const marteGeometry = new THREE.SphereGeometry(0.375, 32, 32); 
const marteMaterial = new THREE.MeshBasicMaterial({color: 0xB22222 });
const marte = new THREE.Mesh(marteGeometry, marteMaterial);
marte.position.set(9,0,0);
scene.add(marte);


// Loop de renderização => Animar a cena
function animate() {
	requestAnimationFrame( animate );

	// Translação dos planetas
	const time = Date.now() * 0.001; // Tempo em segundos
	const terraOrbitSpeed = 0.2; // 365 dias
  
	terra.position.x = Math.cos(time * terraOrbitSpeed) * 8;
	terra.position.z = Math.sin(time * terraOrbitSpeed) * 8;

	mercurio.position.x = Math.cos(time * terraOrbitSpeed * 4.14) * 3; // 88 dias
	mercurio.position.z = Math.sin(time * terraOrbitSpeed * 4.14) * 3;

	venus.position.x = Math.cos(time * terraOrbitSpeed * 1.62) * 5; // 224,7 dias
	venus.position.z = Math.sin(time * terraOrbitSpeed * 1.62) * 5;

	marte.position.x = Math.cos(time * terraOrbitSpeed * 1.88) * 9; // 687 dias
	marte.position.z = Math.sin(time * terraOrbitSpeed * 1.88) * 9;

	// Rotação dos planetas e do SOl em seus eixos
	sol.rotation.x += 0.037; //27 dias para o sol girar em seu eixo (1/27)
	terra.rotation.x += 0.1; // terra gira em 1 dia em seu eixo (1/1)
	mercurio.rotation.x += 0.017 // mercurio demora 59 dias (1/59)
	venus.rotation.x += 0.0041 //venus demora 243,0226 dias (1/243,0226)
	marte.rotation.x += 0.099999 // marte demora 24h e 37 min

	renderer.render( scene, camera_diagonal_3eixos);
}
// Chamando a func de renderizador
animate();