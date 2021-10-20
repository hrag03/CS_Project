// Calculating shape areas.

let heightRectangle = 1;
let widthRectangle = 3;
let heightTriangle = 2;
let baseTriangle = 5;

const areaRectangle = heightRectangle * widthRectangle;
const areaTriangle = (baseTriangle * heightTriangle) / 2;

if (areaRectangle <= 0 || areaTriangle <= 0) {
    console.log("Lenghts should be postivie integers!");
} else if (areaRectangle > areaTriangle) {
    console.log("The rectangle has a larger area");
} else if (areaRectangle < areaTriangle) {
    console.log("The triangle area is larger");
} else {
    console.log("The areas of both shapes are equal");
}
