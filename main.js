// Config Cena
const scene = new THREE.Scene();
// Config das cameras
const camera_superior = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 ); // (graus, proporção img, plano de recorte prox, plano de recorte dist)
const camera_diagonal = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
const camera_frontal = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Config Renderizador
const renderer = new THREE.WebGLRenderer();
// Tamanho da tela
renderer.setSize( window.innerWidth, window.innerHeight );
// Linkando renderizador com o html
document.body.appendChild( renderer.domElement ); 


// Definição das cameras e suas posições
camera_superior.position.set(0, 25, 0); // Posiciona a câmera acima da cena
camera_superior.lookAt(new THREE.Vector3(0, 0, 0)); // Aponta a câmera para o centro da cena
camera_superior.up.set(0, 0, -1); // Define o vetor "up" da câmera para apontar para baixo
camera_superior.updateMatrixWorld();

camera_diagonal.position.set(5, 6, 10);
camera_diagonal.lookAt(scene.position);
camera_diagonal.updateMatrixWorld();

camera_frontal.position.set(0, 0, 15);
camera_frontal.lookAt(scene.position);
camera_frontal.updateMatrixWorld();


// Construindo Objetos / Modelos
const coordenadas = new THREE.AxesHelper(5);
scene.add(coordenadas);
// Para aplicar texturas
const textureLoader = new THREE.TextureLoader();

// Sol
const solGeometry = new THREE.SphereGeometry(2, 32, 32); 
var solTexture = new THREE.TextureLoader().load("/texturas/sunTexture.jpeg");
var solMaterial = new THREE.MeshBasicMaterial();

solMaterial.map = solTexture;

//const solMaterial = new THREE.MeshBasicMaterial({color: 0xF8F8FF });
const sol = new THREE.Mesh(solGeometry, solMaterial);
sol.position.set(0,0,0);
scene.add(sol);

// Terra
const terraGeometry = new THREE.SphereGeometry(0.55, 32, 32);

const terraNormalMap = textureLoader.load('/texturas/terra/terraNormal.jpeg');
const terraBumpMap = textureLoader.load('/texturas/terra/terraBump.jpeg');

const terraMaterial = new THREE.MeshStandardMaterial({
	map: terraNormalMap,
	bumpMap: terraBumpMap,
  }
);

const terra = new THREE.Mesh(terraGeometry, terraMaterial);
terra.position.set(7,0,0);
scene.add(terra);

// Mercúrio
const mercurioGeometry = new THREE.SphereGeometry(0.2, 32, 32); 
const mercurioNormalMap = textureLoader.load('/texturas/mercurio/mercuryNormal.jpeg');
const mercurioBumpMap = textureLoader.load('/texturas/mercurio/mercuryBump.png');

const mercurioMaterial = new THREE.MeshStandardMaterial({
	map: mercurioNormalMap,
	bumpMap: mercurioBumpMap,
  }
);

const mercurio = new THREE.Mesh(mercurioGeometry, mercurioMaterial);
mercurio.position.set(3,0,0);
scene.add(mercurio);

// Venus
const venusGeometry = new THREE.SphereGeometry(0.5, 32, 32); 
var venusTexture = new THREE.TextureLoader().load("/texturas/venusTexture.jpeg");
var venusMaterial = new THREE.MeshBasicMaterial();

venusMaterial.map = venusTexture;

//const venusMaterial = new THREE.MeshBasicMaterial({color: 0xB8860B });
const venus = new THREE.Mesh(venusGeometry, venusMaterial);
venus.position.set(5,0,0);
scene.add(venus);

// Marte
const marteGeometry = new THREE.SphereGeometry(0.4, 32, 32); 
var marteTexture = new THREE.TextureLoader().load("/texturas/marsTexture.jpeg");
var marteMaterial = new THREE.MeshBasicMaterial();

marteMaterial.map = marteTexture;

//const marteMaterial = new THREE.MeshBasicMaterial({color: 0xB22222 });
const marte = new THREE.Mesh(marteGeometry, marteMaterial);
marte.position.set(9,0,0);
scene.add(marte);

// Iluminação - Shader (Sombremento)
var luz = new THREE.DirectionalLight(0xffffff, 10.0);
luz.position.set(0,0,0);
scene.add(luz);

var ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambientLight);


// Alternando entre as cameras de modo automatico
const cameras = [camera_superior, camera_diagonal, camera_frontal];

let index_camera = 0;
const mudarCamera = () => {
	index_camera = (index_camera + 1) % cameras.length;
  };

document.addEventListener('keydown', (event) => {
	if (event.key === 'ArrowLeft') 
	{
		mudarCamera();
	} else if (event.key === 'ArrowRight') 
	{
		mudarCamera();
	}
  }
);


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
	sol.rotation.y += 0.0037; //27 dias para o sol girar em seu eixo (1/27)
	terra.rotation.y += 0.01; // terra gira em 1 dia em seu eixo (1/1)
	mercurio.rotation.y += 0.0017 // mercurio demora 59 dias (1/59)
	venus.rotation.y += 0.00041 //venus demora 243,0226 dias (1/243,0226)
	marte.rotation.y += 0.009 // marte demora 24h e 37 min

	// Atualizar a câmera ativa
	const camera_atual = cameras[index_camera];

	renderer.render( scene, camera_atual);
}
// Chamando a func de renderizador
animate();