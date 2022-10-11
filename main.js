///Game of clue version The office and Rick and morty

//Variables of games

let containerCharacters,
	cardsTotalMistery = 0;

const suspectsArray2 = [
	{ id: 0, name: "Michael Scott", name_image: "michael" },
	{ id: 1, name: "Jim Halpert", name_image: "jim" },
	{ id: 2, name: "Dwight Schrute", name_image: "dwight" },
	{ id: 3, name: "Pam Beesly", name_image: "pam" },
	{ id: 4, name: "Ryan Howard", name_image: "ryan" },
	{ id: 5, name: "Oscar Martinez", name_image: "oscar" },
	{ id: 6, name: "Angela Martin", name_image: "angela" },
	{ id: 7, name: "Andy Bernard", name_image: "andy" },
	{ id: 8, name: "Kevin Malone", name_image: "kevin" },
];

const roomsArray = [
	{ id: 0, name: "Recepción", name_image: "recepcion" },
	{ id: 1, name: "Oficina Michael", name_image: "ofi_michael" },
	{ id: 2, name: "Zona de Parking", name_image: "estacionamiento" },
	{ id: 3, name: "Bodega", name_image: "bodega" },
	{ id: 4, name: "Sala de Juntas", name_image: "juntas" },
];

const weaponsArray = [
	{ id: 0, name: "Olla", name_image: "olla" },
	{ id: 1, name: "Limonada Mexicana", name_image: "limonada" },
	{ id: 2, name: "Pistola", name_image: "pistola" },
	{ id: 3, name: "Pistola de soldar", name_image: "soplete" },
	{ id: 4, name: "Engrapadora en gelatina", name_image: "engrapadora" },
];

//Function generate number random depending of size of array
let doRandom = (arrSearch) =>
	Math.round(Math.random() * (arrSearch.length - 1));

//Generate array without person die because he dont cant be the murder
let listWithoutMurder = (nameDiedPerson, suspectsArray) => {
	newList = suspectsArray.filter((item) => item.name !== nameDiedPerson);
	return newList;
};

//Generate array only with assasin and person died

let genereAssesinMurder = (suspectsArray) => {
	let arrayAssesinDied = [],
		numDiedPerson = parseInt(doRandom(suspectsArray)),
		listNoMurdered = listWithoutMurder(
			suspectsArray[numDiedPerson].name,
			suspectsArray
		);

	[arrayAssesinDied[0], arrayAssesinDied[1]] = [
		listNoMurdered,
		suspectsArray[numDiedPerson].id,
	];

	// console.log("arrayAssesinDied[0]", arrayAssesinDied[0]);
	// console.log("arrayAssesinDied[1]", arrayAssesinDied[1]);

	return arrayAssesinDied;
};

let oportunities = [false, false, false];

//generate numer randoms
let getNumberRandom = (num) => Math.round(Math.random() * num);

//generate list of character to ask

let getArrayCharacters = () => {
	let arrCharacter = getNumberRandom(826);

	for (let i = 0; i < 10; i++) {
		arrCharacter = arrCharacter + "," + getNumberRandom(826);
	}

	return arrCharacter;
};

//get characters api of rick and morthy

let getCharacters = (arrayCharacters) => {
	fetch(`https://rickandmortyapi.com/api/character/${arrayCharacters}`)
		.then((response) => response.json())
		// .then((data) => console.log(data));
		.then((data) => (obj = data))
		// .then((data) => console.log(obj));
		.then((obj) => localStorage.setItem("suspectsArray", JSON.stringify(obj)))
		.then(() => main());
};

//initialize all variables

let initElements = () => {
	containerCharacters = document.getElementById("containerCharacters");
	containerListSuspects = document.getElementById("containerListSuspects");
	containerListWeapons = document.getElementById("containerListWeapons");
	containerWeapons = document.getElementById("containerWeapons");
	containerListRooms = document.getElementById("containerListRooms");
	containerRooms = document.getElementById("containerRooms");
	containerMurder = document.getElementById("containerMurder");
	points = document.getElementById("points");
	name_suspect = document.getElementById("name_suspect");
	name_weapon = document.getElementById("name_weapon");
	name_rooms = document.getElementById("name_rooms");
	person_murder = document.getElementById("person_murder");
	container_hearts = document.getElementById("hearts");
	containerScore = document.getElementById("container-score");
	localStorage.setItem("num_hearts", 6);
	localStorage.setItem("score", 1200);

	// console.log("num_hearts init", localStorage.getItem("num_hearts"));
};

let crossListSuspect = (idSuspect) => {
	// console.log("id____Suspect--------->", idSuspect);
	id_suspect = idSuspect;
	// console.log("id____Suspect--------->", id_suspect);
	suspect_list = document.getElementById(`list-suspect-${id_suspect}`);
	// console.log("suspect_list", suspect_list);
	suspect_list.classList = "cross-text";
};

let crossListWeapon = (idWeapon) => {
	// console.log("idWeapon--------->", idWeapon);
	id_weapon = idWeapon;
	suspect_list = document.getElementById(`list-weapons-${id_weapon}`);
	// console.log("weapon_list", suspect_list);
	suspect_list.classList = "cross-text";
};

let crossListRoom = (idRoom) => {
	// console.log("idRoom--------->", idRoom);
	id_room = idRoom;
	suspect_list = document.getElementById(`list-rooms-${id_room}`);
	suspect_list.classList = "cross-text";
};

let generateListSuspects = (arrSuspects) => {
	// console.log("suspectsArray casi todo", arrSuspects);

	containerListSuspects.innerHTML = "";

	arrSuspects.forEach((character) => {
		list = document.createElement("li");
		list.innerHTML = `<p class="" id="list-suspect-${character.id}">  ${character.name} \n </p> `;
		containerListSuspects.appendChild(list);
	});
};

let generateListWeapons = (arrWeapons) => {
	containerListWeapons.innerHTML = "";
	arrWeapons.forEach((weapons) => {
		let list = document.createElement("li");
		list.innerHTML = `<p class="list-weapons" id="list-weapons-${weapons.id}">  ${weapons.name} \n </p> `;
		containerListWeapons.appendChild(list);
	});
};

let generateListRooms = (arrRooms) => {
	containerListRooms.innerHTML = "";
	arrRooms.forEach((rooms) => {
		// console.log("rooms", rooms);
		let list = document.createElement("li");
		list.innerHTML = `<p class="list-rooms" id="list-rooms-${rooms.id}" >  ${rooms.name} \n </p> `;

		containerListRooms.appendChild(list);
	});
};

let showSolutionMistery = () => {
	console.log("entro");

	let suspectsArray = JSON.parse(localStorage.getItem("suspectsArray"));

	id_assasin = localStorage.getItem("id_assasin");
	id_person_died = localStorage.getItem("id_died");
	id_weapon = localStorage.getItem("id_weapon");
	id_room = localStorage.getItem("id_room");

	console.log("id_assasin", id_assasin);
	console.log("id_person_died", id_person_died);

	name_assasin = suspectsArray.find((suspect) => suspect.id == id_assasin);
	name_murdered = suspectsArray.find((suspect) => suspect.id == id_person_died);

	console.log("name_assasin", name_assasin);
	console.log("name_murdered", name_murdered);

	Swal.fire({
		imageUrl: ` ${name_assasin.image}`,
		html: `<p class="txt-winner"> Felicidades, el asesino es <span> ${name_assasin.name} </span>,
			mato a ${name_murdered.name} con la ${weaponsArray[id_weapon].name} en ${roomsArray[id_room].name}  </p>`,
		position: "center",
		showCancelButton: true,
		confirmButtonText: "Jugar nuevamente",
	}).then((result) => {
		if (result.isConfirmed) {
			rebootGame();
		} else if (result.isDenied) {
			Swal.fire("Adios", "", "error");
		}
	});
};

let rebootGame = () => {
	getCharacters(getArrayCharacters());
	localStorage.clear();
};

let showLoseAssasin = (real_assasin) => {
	score = localStorage.getItem("score");

	console.log("real_assasin", real_assasin);

	Swal.fire({
		imageUrl: `${real_assasin.image}`,
		html: `<p class="swa-text">Perdiste el asesino era <span> ${real_assasin.name} </span> <br> tu puntajes es de <span> ${score} </span> </p>`,
		position: "center",
		showCancelButton: true,
		confirmButtonText: "Jugar nuevamente",
	}).then((result) => {
		if (result.isConfirmed) {
			rebootGame();
		} else if (result.isDenied) {
			Swal.fire("Adios", "", "error");
		}
	});
};

let showLoseWeapon = (idWeapon) => {
	id_weapon_mistery = parseInt(localStorage.getItem("id_weapon"));

	// console.log("idWeapon en showlose", idWeapon);
	// console.log("id_weapon_mistery en showlose ", id_weapon_mistery);

	Swal.fire({
		imageUrl: `./weapons/${weaponsArray[idWeapon].name_image}.png`,
		html: `<p class="swa-text"> Perdiste el arma era la <span> ${weaponsArray[idWeapon].name} </span> <br> tu puntajes es de <span>  ${score} </span>  </p>`,
		position: "center",
		showCancelButton: true,
		confirmButtonText: "Jugar nuevamente",
	}).then((result) => {
		if (result.isConfirmed) {
			rebootGame();
		} else if (result.isDenied) {
			Swal.fire("Adios", "", "error");
		}
	});
};

let showLoseRoom = (idRoom) => {
	id_room_mistery = parseInt(localStorage.getItem("id_room"));

	// console.log("idRoom en showlose", idRoom);
	// console.log("id_weapon_mistery en showlose ", id_room_mistery);

	Swal.fire({
		imageUrl: `./weapons/${roomsArray[idRoom].name_image}.png`,
		html: `<p class="swa-text">  Perdiste el lugar era la <span>  ${roomsArray[idRoom].name} </span> <br> tu puntajes es de  <span>  ${score}  </span>  </p>`,
		position: "center",
		showCancelButton: true,
		confirmButtonText: "Jugar nuevamente",
	}).then((result) => {
		if (result.isConfirmed) {
			rebootGame();
		} else if (result.isDenied) {
			Swal.fire("Adios", "", "error");
		}
	});
};

//Verify who is the killer
let checkAssasin = (asseMurder, id_suspect) => {
	let arrWitMurd = [...asseMurder];
	let suspectsArray = JSON.parse(localStorage.getItem("suspectsArray"));

	//get data possible assasin choose by user
	posible_assasin = suspectsArray.find(({ id }) => id === id_suspect);

	num_hearts = parseInt(localStorage.getItem("num_hearts"));
	id_assasin_mistery = parseInt(localStorage.getItem("id_assasin"));

	real_assasin = suspectsArray.find(({ id }) => id === id_assasin_mistery);

	// console.log("id_assasin real", id_assasin_mistery);
	console.log("real_assasin real", real_assasin);
	// console.log("id_assasin", idSuspect);
	// console.log("num_hearts checkAssasin", num_hearts);

	if (num_hearts != 0) {
		if (id_assasin_mistery !== posible_assasin.id) {
			// console.log("idSuspect elemento", idSuspect);

			arrWitMurd = arrWitMurd.filter((item) => item.id !== posible_assasin.id);

			num_hearts--;
			localStorage.setItem("num_hearts", num_hearts);

			paintHearts(num_hearts);
			paintingCharacters(arrWitMurd);
			crossListSuspect(posible_assasin.id);

			playSound("lose");

			swatSuspectFail(posible_assasin, real_assasin);
		} else if (id_assasin_mistery === posible_assasin.id) {
			playSound("win");

			showAssasin(real_assasin, suspectsArray);
		}
	} else if (num_hearts == 0) {
		showLoseAssasin(posible_assasin, real_assasin);
	}
};

let checkWeapons = (arrayWeapons, idWeapon) => {
	// console.log("array llega ", arrayWeapons, "id de arma", idWeapon);
	// console.log("---arma tecleada id", weaponsArray[idWeapon].name);
	let copyArrWeapons = [...arrayWeapons];
	num_hearts = parseInt(localStorage.getItem("num_hearts"));
	id_weapon_mistery = parseInt(localStorage.getItem("id_weapon"));

	if (num_hearts != 0) {
		if (id_weapon_mistery !== idWeapon) {
			copyArrWeapons = copyArrWeapons.filter((item) => item.id !== idWeapon);

			num_hearts--;
			localStorage.setItem("num_hearts", num_hearts);

			paintHearts(num_hearts);
			paintingWeapons(copyArrWeapons);
			crossListWeapon(idWeapon);

			playSound("lose");
			swatWeaponsFail(weaponsArray[idWeapon], "error");
		} else if (id_weapon_mistery == idWeapon) {
			playSound("win");
			showWeapon();
		}
	} else if (num_hearts == 0) {
		showLoseWeapon(id_weapon_mistery);
	}

	// console.log(" num_hearts en check es", num_hearts);
};

let checkRooms = (arrayRooms, idRoomPlayer) => {
	let copyArrRooms = [...arrayRooms];
	num_hearts = parseInt(localStorage.getItem("num_hearts"));
	id_room_real = localStorage.getItem("id_room");

	if (num_hearts != 0) {
		if (roomsArray[id_room_real].id !== idRoomPlayer) {
			copyArrRooms = copyArrRooms.filter((item) => item.id !== idRoomPlayer);

			num_hearts--;
			localStorage.setItem("num_hearts", num_hearts);

			paintHearts(num_hearts);
			paintingRooms(copyArrRooms);

			crossListRoom(idRoomPlayer);
			playSound("lose");
			swatRoomFail(roomsArray[idRoomPlayer], "error");
		} else if (roomsArray[id_room_real].id == idRoomPlayer) {
			showRooms(id_room_real);
		}
	}
};

let showAssasin = (real_assasin, suspectsArray) => {
	console.log("cardsTotalMistery", cardsTotalMistery);
	cardsTotalMistery++;

	if (cardsTotalMistery !== 3) {
		let column = document.createElement("div");
		containerCharacters.innerHTML = "";

		column.className = "col-6  col-md-3  mt-3";
		column.id = `character-${real_assasin.id}`;
		column.innerHTML = `
	<div class="card card-special bg-success text-white"  >
  	<img src="${real_assasin.image}" id="imgId-${real_assasin.id}" class="card-img-top " alt="...">
  	<div class="card-body">
    	<pclass="cardz-title">${real_assasin.name}</p>
    	<a href="#" id="btn-possAssesin-${real_assasin.id}" class="btn btn-danger text-white">Asesino Encontrado</a>
  	</div>
	</div>`;

		containerCharacters.append(column);
		containerListSuspects.innerHTML = "";
		let list = document.createElement("li");
		list.innerHTML = `<p > ${real_assasin.id}.- ${real_assasin.name} \n </p> `;
		containerListSuspects.appendChild(list);
	} else {
		showSolutionMistery();
	}
};

let showWeapon = () => {
	cardsTotalMistery++;
	console.log("cardsTotalMistery", cardsTotalMistery);

	if (cardsTotalMistery !== 3) {
		let column = document.createElement("div");

		id_weapon = localStorage.getItem("id_weapon");
		containerWeapons.innerHTML = "";

		column.className = "col-md-3 mt-3";
		column.id = `weapon-${weaponsArray[id_weapon].id}`;
		column.innerHTML = `
	<div class="card card-special bg-success text-white">
		<img src="./weapons/${weaponsArray[id_weapon].name_image}.png" id="imgId-${weaponsArray[id_weapon].id}" class="card-img-top " alt="...">
		<div class="card-body">
			<p class="card-title">${weaponsArray[id_weapon].name}</p>
			<a href="#" id="btn-poss-weapon-${weaponsArray[id_weapon].id}" class="btn btn-primary">Arma encontrada</a>
		</div>
	</div>`;

		containerWeapons.append(column);
		containerListWeapons.innerHTML = "";
		let list = document.createElement("li");
		list.innerHTML = `<p class="list-weapons" > ${id_weapon}.- ${weaponsArray[id_weapon].name} \n </p> `;
		containerListWeapons.appendChild(list);
	} else {
		showSolutionMistery();
	}
};

let showRooms = () => {
	cardsTotalMistery++;
	console.log("cardsTotalMistery", cardsTotalMistery);

	if (cardsTotalMistery !== 3) {
		let column = document.createElement("div");

		id_room = localStorage.getItem("id_room");
		containerRooms.innerHTML = "";

		column.className = "col-md-3 mt-3";
		column.id = `weapon-${roomsArray[id_room].id}`;
		column.innerHTML = `
	<div class="card bg-success">
  	<img src="./rooms/${roomsArray[id_room].name_image}.png" id="imgId-${roomsArray[id_room].id}" class="card-img-top " alt="...">
	 	<div class="container">
    	<p class="card-title text-white">${roomsArray[id_room].name}</p>  
			<a href="#" id="btn-poss-weapon-${roomsArray[id_room].id}" class="btn btn-primary">Lugar  encontrada</a> 
  	</div>
	</div>`;

		containerRooms.append(column);
		containerListRooms.innerHTML = "";
		list = document.createElement("li");
		list.innerHTML = `<p class="list-rooms" > ${id_room}.- ${roomsArray[id_room].name} \n </p> `;
		containerListRooms.appendChild(list);
	} else {
		showSolutionMistery();
	}
};

let paintingCharacters = (arrSuspects) => {
	containerCharacters.innerHTML = "";
	num_hearts = parseInt(localStorage.getItem("num_hearts"));

	arrSuspects.forEach((character) => {
		let column = document.createElement("div");

		column.className = "col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mt-3 ";
		column.id = `character-${character.id}`;
		column.innerHTML = `
			<a href="#" id="btn-possAssesin-${character.id}" " > 
				<div class="cardz">		
					<img src=" ${character.image}" id="imgId-${character.id}" class="rounded"  style="width:100%" >
					<div class="container">			
						<p class="cardz-title ">${character.name}</p>
					</div>
				</div>		
			</a>
		`;

		containerCharacters.append(column);
		let btnAccuse = document.getElementById(`btn-possAssesin-${character.id}`);
		btnAccuse.onclick = () => checkAssasin(arrSuspects, character.id);
	});
};

let paintingWeapons = (arrWeapons) => {
	containerWeapons.innerHTML = "";

	arrWeapons.forEach((weapon) => {
		let column = document.createElement("div");

		column.className = "col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mt-3";
		column.id = `weapon-${weapon.id}`;
		column.innerHTML = `
 
		<a href="#" id="btn-possWeapon-${weapon.id}"  >
			<div class="cardz-weapons"  >
				<img src="./weapons/${weapon.name_image}.png" id="imgId-${weapon.id}" class="rounded"  style="width:100%" >
				<div class="container">
					<p class="cardz-title">${weapon.name}</p>
				</div>
			</div>
		</a> 
		`;

		containerWeapons.append(column);
		let btnWeapons = document.getElementById(`btn-possWeapon-${weapon.id}`);
		btnWeapons.onclick = () => checkWeapons(arrWeapons, weapon.id);
	});
};

let paintingRooms = (arrRooms) => {
	containerRooms.innerHTML = "";
	let id_rooms = 0;

	arrRooms.forEach((rooms) => {
		let column = document.createElement("div");

		column.className = "col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 mt-3";
		column.id = `rooms-${rooms.id}`;
		column.innerHTML = `
		 
		<a href="#" id="btn-poss-rooms-${rooms.id}"  >
			<div class="cardz-rooms"  >
				<img src="./rooms/${rooms.name_image}.png" id="imgId-${rooms.id}" class="rounded"  style="width:100%" >
				<div class="container">
					<p class="cardz-title">${rooms.name}</p>
				</div>
			</div>
		</a> `;

		containerRooms.append(column);
		let btnRooms = document.getElementById(`btn-poss-rooms-${rooms.id}`);

		btnRooms.onclick = () => checkRooms(arrRooms, rooms.id);
	});
};

//Generete Murder, weapon and room where the person died
let genereMistery = (arrayWithoutMurdered, numPersonMurdered) => {
	//generate arrays of ids without the murdered
	let arrayIdsWithoutMurdered = arrayWithoutMurdered.map(
		(element) => element.id
	);

	console.log("arrayIdsWithoutMurdered", arrayIdsWithoutMurdered);

	numAssesin = parseInt(doRandom(arrayIdsWithoutMurdered));
	numWeapon = parseInt(doRandom(weaponsArray));
	numRoom = parseInt(doRandom(roomsArray));

	console.log("numAssesin", arrayWithoutMurdered[numAssesin].name);
	console.log("numWeapon", weaponsArray[numWeapon].name);
	console.log("numRoom", roomsArray[numRoom].name);

	localStorage.setItem("id_assasin", arrayIdsWithoutMurdered[numAssesin]);
	localStorage.setItem("id_died", numPersonMurdered);
	localStorage.setItem("id_weapon", numWeapon);
	localStorage.setItem("id_room", numRoom);
};

//Put te mistery and said who died
let paintCase = (id_murder, suspectsArray) => {
	// console.log("id_murder, suspectsArray", id_murder);

	person_died = suspectsArray.find(({ id }) => id === id_murder);
	person_murder.innerHTML = `Mataron a <span> ${person_died.name} </span> tienes que adivinar quién fue, con qué lo mataron y donde lo mató`;
};
//painting hearts

let paintHearts = (num_hearts) => {
	num_hearts = parseInt(localStorage.getItem("num_hearts"));

	container_hearts.innerHTML = "";
	for (i = 1; i <= num_hearts; i++) {
		heart_ele = document.createElement("span");

		heart_ele.innerHTML = `<i class="fa-solid fa-heart"></i>`;
		container_hearts.append(heart_ele);
	}
};

// Play sound win o lose
let playSound = (win_lose) => {
	let sound = new Audio();

	win_lose == "lose"
		? (sound.src = "./sounds/risa.mp3")
		: (sound.src = "./sounds/aplauso.mp3");

	// sound.play();
};

let swatSuspectFail = (posible_assasin, real_assasin) => {
	Swal.fire({
		toast: true,
		imageUrl: ` ${posible_assasin.image}`,
		html: `<p class="txt-fail"> Fallaste, el asesino no es <span> ${posible_assasin.name} </span> </p>`,
		position: "center",
		showConfirmButton: false,
		timer: 1500,
		timerProgressBar: true,
	});

	checkScore();

	num_hearts == 0
		? showLoseAssasin(real_assasin)
		: console.log(" no es 0--------------");
};

let swatWeaponsFail = (weaponsArray) => {
	let { id, name, name_image } = weaponsArray;
	id_weapon_mistery = parseInt(localStorage.getItem("id_weapon"));

	Swal.fire({
		toast: true,
		imageUrl: `./weapons/${name_image}_cross.png`,
		html: `<p class="txt-fail"> Fallaste, el arma no es la <span> ${name} </span> </p>`,
		position: "center",
		showConfirmButton: false,
		timer: 1500,
		timerProgressBar: true,
	});

	checkScore();

	num_hearts == 0
		? showLoseWeapon(id_weapon_mistery)
		: console.log(" aun tiene corazones");
};

let swatRoomFail = (roomsArray) => {
	let { id, name, name_image } = roomsArray;
	id_rooms_mistery = parseInt(localStorage.getItem("id_room"));

	Swal.fire({
		toast: true,
		imageUrl: `./rooms/${name_image}_cross.png`,
		html: `<p class="txt-fail"> Fallaste, el lugar no es la <span> ${name} </span> </p>`,
		position: "center",
		showConfirmButton: false,
		timer: 1500,
		timerProgressBar: true,
	});

	checkScore();

	num_hearts == 0
		? showLoseRoom(id_rooms_mistery)
		: console.log(" aun tiene corazones");
};

let checkScore = () => {
	newPoints = parseInt(localStorage.getItem("score"));
	score = newPoints - 100;
	localStorage.setItem("score", score);
	paintingScore(score);
};

let paintingScore = () => {
	newPoints = parseInt(localStorage.getItem("score"));

	containerScore.innerHTML = `${newPoints}`;
};

let score = 12000;

let main = () => {
	// console.log(localStorage.getItem("suspectsArray"));

	const suspectsArray = JSON.parse(localStorage.getItem("suspectsArray"));

	// console.log("suspectsArray-->", suspectsArray);

	//Stores elements in variables
	initElements();

	//Generate name person murder and array without person murdered
	[arrayWithoutMurdered, numPersonMurdered] =
		genereAssesinMurder(suspectsArray);

	//Generete suspects, weapons and rooms
	generateListSuspects(arrayWithoutMurdered);
	generateListWeapons(weaponsArray);
	generateListRooms(roomsArray);

	//paints suspects, weapons and rooms in the dom
	paintCase(numPersonMurdered, suspectsArray);
	paintingCharacters(arrayWithoutMurdered);
	paintingWeapons(weaponsArray);
	paintingRooms(roomsArray);
	paintingScore(score);

	paintHearts();

	//generates  assasin, person murder, where die and what weapon was use
	genereMistery(arrayWithoutMurdered, numPersonMurdered);
};

localStorage.clear();

getCharacters(getArrayCharacters());
