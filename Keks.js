class Keks {
	constructor(x, y, farbe1, farbe2) {
		this.x = x;
		this.y = y;
		this.farbe1 = farbe1;
		this.farbe2 = farbe2;
		this.farbe_markiert = color('lightblue');
		this.farbe_erreichbar = color('lightyellow');
		this.rand = color('black');
		this.radius = 20;
		this.zustand = 0; // 0: unmarkiert, 1: markiert, 2: erreichbar 
		this.kruemel = [];
	}

	//---------------------------------------------------------------------------------
	// Zeichnet den Keks
	draw() {
		stroke(color(this.rand));
		if (this.zustand == 0) { // unmarkiert
			fill(this.farbe());
			ellipse(this.x, this.y, this.radius * 2, this.radius * 2);

			// Text
			fill(color('white'));
			text(this.anzahl(), this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
		}
		if (this.zustand == 1) { // markiert
			fill(color(this.farbe_markiert));
			ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
			//Text
			fill(color('darkgray'));
			text(this.anzahl(), this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
		}

		if (this.zustand == 2) { // erreichbar
			fill(color(this.farbe_erreichbar));
			ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
			//Text
			fill(color('darkgray'));
			text(this.anzahl(), this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);

		}
	}



	// ------------------------------------------------------------
	//  Kruemel erzeugen
	kruemelErzeugen() {
		if ((this.kruemel[1] == 0) && (this.kruemel[0] > 5)) {
			this.kruemel[0]++;
		}
		if ((this.kruemel[0] == 0) && (this.kruemel[1] > 5)) {
			this.kruemel[1]++;
		}
	}

	// -------------------------------------------------------------
	// kampf
	kampf() {
		if (this.kruemel[0] > 0 && this.kruemel[1] > 0) {
			this.kruemel[0]--;
			this.kruemel[1]--;
		}
	}

	//-------------------------------------------------------------
	// sendet Kruemel an einen anderen Keks
	sendeKruemel(keks) {
		// Für beide Spieler s Reisekruemel erzeugt
		for (let s = 0; s < 2; s++) {
			let anzahl = floor(this.kruemel[s] / 2);
			this.kruemel[s] -= anzahl;

			for (let i = 0; i < anzahl; i++) {
				reisekruemel.push(new Kruemel(this, keks, s));
			}
		}
	}

	//------------------------------------------------------------
	// Hilfsfunktionen
	farbe() {
		if (this.kruemel[0] > this.kruemel[1]) {
			return this.farbe1;
		} else if (this.kruemel[1] > this.kruemel[0]) {
			return this.farbe2;
		} else {
			return 'white';
		}
	}

	anzahl() {
		return abs(this.kruemel[0] - this.kruemel[1]);
	}

	// prueft, ob (x,y) innerhalb des Keks ist
	imKreis(x, y) {
		let r = (this.x - x) * (this.x - x) + (this.y - y) * (this.y - y);
		if (r < this.radius * this.radius) {
			return true;
		}
		return false;
	}

	// gibt den Abstand zweier Kekse zurück
	abstand(keks) {
		let abstand = sqrt((this.x - keks.x) * (this.x - keks.x) +
			(this.y - keks.y) * (this.y - keks.y));

		return abstand - keks.radius - this.radius;
	}
}
