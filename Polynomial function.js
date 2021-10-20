// Solving ax^2 + bx + c = 0

let a = 6;
let b = 11;
let c = -35;

const d = (b ** 2) - (4 * a * c);
const x1 = (-b + d ** 0.5) / (2 * a);
const x2 = (-b - d ** 0.5) / (2 * a);

if (a == 0) {
    console.log("The equation is not quadratic!");
} else if (d > 0) {
    console.log("X1 = " + x1 + ", and X2 = " + x2);
} else if (d == 0) {
    console.log("X = " + x1);
} else {
    console.log("Unsolvable");
}