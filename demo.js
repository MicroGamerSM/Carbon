import "./main"
import { vector2, zone2, Canvas, fill, rectXYWH, rectVectorVector, rect, ellipseXYR, ellipseVectorR, ellipseXYRR, ellipseVectorVector, ellipse } from "./main"
Canvas.overrideCanvasElement(document.getElementById("demo"))

fill("#ff0000")
rectXYWH(0, 0, 100, 100)
fill("#00ff00")
var vect1 = new vector2(100, 0)
var vect2 = new vector2(100, 100)
rectVectorVector(vect1, vect2)
fill("#0000ff")
var area = new zone2(200, 0, 100, 100)
rect(area)
console.info("That was done using the CARBON library!")