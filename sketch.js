// Globale Variablen
let size = 600;
let randabstand = 20;

let kekse = [];
let reisekruemel = [];

let anzahlKekse = 28;
let sichtGrenze = 100;
let farben = ['teal','blue'];

let zaehler = 0;

let ausgewaehlterKeks = null;

function setup() {
	// Erstellen der Spielflaeche
	createCanvas(size, size);

	// heimatkekse
	let keks1 = new Keks(80, size / 2, farben[0], farben[1]);
	let keks2 = new Keks(size - 80, size / 2, farben[0], farben[1]);
	keks1.kruemel[0] = 20;
	keks1.kruemel[1] = 0;
	keks2.kruemel[0] = 0;
	keks2.kruemel[1] = 20;
	kekse.push(keks1);
	kekse.push(keks2);

	// Alle anderen Kekse erzeugen
	kekseErstellen();

	// Texteigenschaften einstellen
	textAlign(CENTER, CENTER);
	textSize(12);
}


// Gameloop
// Diese Methode wird immer wieder, so schnell es geht aufgerufen
function draw() {
	zaehler++;

	// Neue Kruemel im Keks werden erzeugt	
	if (zaehler % 100 == 0) {
		kekse.forEach(function (item) {
			item.kruemelErzeugen();
		});

	}
	// Kruemel auf der Reise werden weitertransportiert
	if (zaehler % 5 == 0) {
		reisekruemel.forEach(function(item){
			item.update();
		});	
	}

	// Falls ein Kruemel am Ziel ist, wird er geloescht
	for (let i = reisekruemel.length - 1; i >= 0; i--) {
		if (reisekruemel[i].fertig) {
			reisekruemel.splice(i, 1);
		}
	}

	// Kaempfe um Kekse
	kekse.forEach(function (item) {
		item.kampf();
	});

	// Neu Zeichnen
	fill(color('white'));
	stroke(color('white'));
	rect(randabstand, randabstand, size - randabstand * 2, size - randabstand * 2);


	// Zeichnen der Wege
	reisekruemel.forEach(function (item) {
		item.routeZeichnen();
	});

	// Zeichnen der Kreise
	kekse.forEach(function (item) {
		item.draw();
	});

	// Zeichnen der Kruemel
	reisekruemel.forEach(function (item) {
		item.draw();
	});
}


// --------------------------------------------------
//       Eingabe
// --------------------------------------------------
function mousePressed() {
	let keks = false;
	// Überprüft, ob ein Keks geklickt wurde
	kekse.forEach(function (item, index, array) {
		if (item.imKreis(mouseX, mouseY)) {
			keks = true;
			keksGeklickt(item);
		}
	});

	// Wenn kein Keks geklickt wurde, werden alle Markierungen gelöscht
	if (keks == false) {
		kekse.forEach(function (item, index, array) {
			item.zustand = 0;
		});
		ausgewaehlterKeks = null;
	}
}

function keksGeklickt(keks) {
	// Falls noch kein Keks ausgewaehlt ist
	if (ausgewaehlterKeks == null) {
		if (keks.farbe() != 'white') {
			// Färbe alle benachbarten Kekse
			kekse.forEach(function (item, index, array) {
				if (item.abstand(keks) < sichtGrenze) {
					item.zustand = 2;
				}
			});
		}
		// Markiere den ausgewaehlten Keks
		keks.zustand = 1;
		ausgewaehlterKeks = keks;
	}
	//Falls schon ein Keks ausgewaehlt ist
	else if (ausgewaehlterKeks == keks) {
		// Alles Markierungen werden geloescht
		markierungenEntfernen();
	} else if (keks.abstand(ausgewaehlterKeks) < sichtGrenze) {
		ausgewaehlterKeks.sendeKruemel(keks);
		markierungenEntfernen();
	}
}

function markierungenEntfernen() {
	kekse.forEach(function (item, index, array) {
		item.zustand = 0;
	});
	ausgewaehlterKeks = null;
}


// -----------------------------------------------------

function kekseErstellen() {
	for (let i = 0; i < anzahlKekse; i++) {
		// neuen Keks erstellen
		let keks = new Keks(random(size - 80) + 40, random(size - 80) + 40, farben[0], farben[1]);
		keks.kruemel[0] = 0;
		keks.kruemel[1] = 0;
		let zunah = false;
		// überprüfen, ob er zu nah an einem anderen Keks ist
		kekse.forEach(function (item, index, array) {
			if (item.abstand(keks) <= 10) {
				console.log("Zu nah!");
				zunah = true;
			}
		});
		if (zunah == false) {
			kekse.push(keks);
		} else {
			anzahlKekse++;
		}
	}
}
