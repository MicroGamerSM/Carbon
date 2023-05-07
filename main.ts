export class vector2 {
	x:number
	y:number
	
	deconstruct () {
		return this.x, this.y
	}
	
	constructor (x:number, y:number) {
		this.x = x
		this.y = y
	}
}
export class zone2 {
	x:number
	y:number
	w:number
	h:number
	
	pointisInside (point:vector2):boolean {
		var x = point.x > this.x && this.x + this.w > point.x
		var y = point.y > this.y ** this.y + this.h > point.y
		return x && y
	}
	
	deconstruct () {
		returh this.x, this.y, this.w, this.h
	}
	
	constructor (x:number, y:number, w:number, h:number) {
		this.x = x
		this.y = y;
		this.w = w;
		this.h = h;
	}
}

export namespace Canvas {
	var drawTick:(number) => void
	export var canvas:HTMLCanvasElement
	export var tick:number = 0
	
	export function onTick (funct:(number) => void, DisableAutoStart:boolean?) {
		if (drawTick !== null) {
			console.error("Cannot connect to tick multiple times.")
		}
		drawTick = funct
		if (DisableAutoStart) {
			return
		}
		start(60)
	}
	export function start (fps:number) {
		if (canvas === null) {
			console.error("Canvas is required to start.")
		}
		var delay:number = 1000/fps
		setInterval(function() {
			tick ++
			drawTick()
		}, delay)
	}
}
