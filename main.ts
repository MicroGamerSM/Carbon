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
		var y = point.y > this.y && this.y + this.h > point.y
		return x && y
	}
	
	deconstruct () {
		return this.x, this.y, this.w, this.h
	}
	deconstructAsVectors () {
		return new vector2(this.x, this.y), new vector2(this.w, this.h)
	}
	
	constructor (x:number, y:number, w:number, h:number) {
		this.x = x
		this.y = y;
		this.w = w;
		this.h = h;
	}
}

export namespace Canvas {
	var drawTick:(tick:number) => void
	export var canvas:HTMLCanvasElement
	export var ctx:CanvasRenderingContext2D | null
	export var tick:number = 0
	
	export function overrideCanvasElement (newCanvas:HTMLCanvasElement) {
		canvas = newCanvas
		ctx = newCanvas.getContext("2d")
	}

	export function onTick (funct:(tick:number) => void, DisableAutoStart:boolean | null) {
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
		if (ctx === null) {
			ctx = canvas.getContext("2d")
		}
		var delay:number = 1000/fps
		setInterval(function() {
			tick ++
			drawTick(tick)
		}, delay)
	}
}

export function fill (color:string) {
	if (Canvas.ctx === null) {console.error("Canvas/CTX element not provided."); return}
	Canvas.ctx.fillStyle = color
}
export function rectXYWH (x:number, y:number, w:number, h:number) {
	if (Canvas.ctx === null) {console.error("Canvas/CTX element not provided."); return}
	Canvas.ctx.beginPath()
	Canvas.ctx.rect(x, y, w, h)
	Canvas.ctx.closePath()
	Canvas.ctx.fill()
}
export function rectVectorVector (pos:vector2, size:vector2) {
	rectXYWH(pos.x, pos.y, size.x, size.y)
}
export function rect (area:zone2) {
	rectXYWH(area.x, area.y, area.w, area.h)
}
export function ellipseXYR (x:number, y:number, r:number) {
	if (Canvas.ctx === null) {console.error("Canvas/CTX element not provided."); return}
	Canvas.ctx.beginPath()
	Canvas.ctx.ellipse(x, y, r, r, 0, 0, 360)
	Canvas.ctx.closePath()
	Canvas.ctx.fill()
}
export function ellipseVectorR (pos:vector2, r:number) {
	ellipseXYR(pos.x, pos.y, r)
}
export function ellipseXYRR (x:number, y:number, r1:number, r2:number) {
	if (Canvas.ctx === null) {console.error("Canvas/CTX element not provided."); return}
	Canvas.ctx.beginPath()
	Canvas.ctx.ellipse(x, y, r1, r2, 0, 0, 360)
	Canvas.ctx.closePath()
	Canvas.ctx.fill()
}
export function ellipseVectorVector (pos:vector2, size:vector2) {
	ellipseXYRR(pos.x, pos.y, size.x, size.y)
}
export function ellipse (area:zone2) {
	ellipseXYRR(area.x, area.y, area.w, area.h)
}