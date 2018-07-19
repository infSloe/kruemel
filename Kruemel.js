class Kruemel {
	constructor(start, ziel, spieler) {
		this.start = start;
		this.ziel = ziel;
		this.zaehler = 0;
		this.spieler = spieler;
		this.fertig = false;
		this.abstand = floor(start.abstand(ziel) / 2);
	}

	routeZeichnen() {
		stroke(color('gray'));
		line(this.start.x, this.start.y, this.ziel.x, this.ziel.y);
	}

	update() {
		if (this.zaehler == this.abstand ) {
			this.ziel.kruemel[this.spieler]++;
			this.fertig = true;
		} else {
			this.zaehler++;
		}
	}
	
	draw()
	{
		let x = this.zaehler / this.abstand * (this.ziel.x - this.start.x) + this.start.x;
		let y = this.zaehler / this.abstand * (this.ziel.y - this.start.y) + this.start.y;
		fill(color(farben[this.spieler]));
		ellipse(x,y,5);
	}

}
