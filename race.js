const breedteMatrix = 8
let matrix = new Matrix(breedteMatrix, 8);
let rijAuto = 4 // de x coördinaat van het begin van de auto
let colWereld = HEIGHT - 2; // de y coördinaat van het begin van de auto
let anker = 0 // linkerbovenhoek van het kijkvenster
let score = 0
Wereld = [
    [0, 7],
    [0, 7],
    [0, 7],
    [0, 7],
    [0, 1, 2, 7],
    [0, 1, 6, 7],
    [0, 5, 6, 7],
    [0, 4, 5, 6, 7],
    [0, 5, 6, 7],
    [0, 6, 7],
    [0, 6, 7],
    [0, 5, 6, 7],
    [0, 5, 6, 7],
    [0, 4, 5, 6, 7],
    [0, 4, 5, 6, 7],
    [0, 3, 4, 5, 6, 7],
    [0, 3, 4, 5, 6, 7],
    [0, 7],
    [0, 7],
    [0, 7],
    [0, 7],
    [0, 1, 2, 3, 4, 7],
    [0, 1, 2, 3, 7],
    [0, 1, 2, 7],
    [0, 6, 7],
    [0, 5, 6, 7],
    [0, 4, 5, 6, 7],
    [0, 3, 4, 5, 6, 7],
    [0, 3, 4, 5, 6, 7],
    [0, 3, 4, 5, 6, 7],
    [0, 3, 4, 5, 6, 7],
    [0, 3, 4, 5, 6, 7],
    [0, 3, 4, 5, 6, 7],
    [0, 4, 5, 6, 7],
    [0, 5, 6, 7],
    [0, 6, 7],
    [0, 6, 7],
    [0, 1, 7],
    [0, 1, 2, 3, 7],
    [0, 1, 2, 3, 7],
    [0, 1, 2, 3, 7],
    [0, 1, 2, 3, 4, 7],
    [0, 1, 2, 3, 4, 7],
    [0, 1, 2, 3, 4, 7],
    [0, 1, 2, 3, 4, 7],
    [0, 7],
    [0, 7],
    [0, 7],
    [0, 7],
    [0, 3, 4, 5, 6, 7],
    [0, 3, 4, 5, 6, 7],
    [0, 4, 5, 6, 7],
    [0, 5, 6, 7],
    [0, 7],
    [0, 7],
    [0, 7],
    [0, 7],
    [0, 7],
    [0, 3, 4, 7],
    [0, 3, 4, 7],
    [0, 3, 4, 7],
    [0, 3, 4, 7],
    [0, 1, 3, 4, 5, 7],
    [0, 1, 3, 4, 5, 7],
    [0, 1, 3, 4, 5, 7],
    [0, 1, 3, 4, 5, 7],
    [0, 3, 4, 7],
    [0, 3, 4, 7],
    [0, 3, 4, 7],
    [0, 3, 4, 7],
    [0, 2, 3, 4, 7],
    [0, 2, 3, 4, 7],
    [0, 2, 3, 4, 7],
    [0, 2, 3, 4, 5, 7],
    [0, 2, 3, 4, 5, 7],
    [0, 4, 5, 7],
    [0, 4, 5, 7],
    [0, 4, 5, 7],
    [0, 4, 7],
    [0, 4, 7],
    [0, 4, 7],
    [0, 7],
    [0, 7],
    [0, 7],
    [0, 1, 6, 7],
    [0, 1, 2, 5, 6, 7],
    [0, 1, 6, 7],
    [0, 1, 6, 7],
    [0, 7],
    [0, 7],
    [0, 7],
    [0, 7],
    [0, 7],
    [0, 7],
    [0, 7],
    [0, 7],
    []
]


const breedteWereld = Wereld.length // breerdte van de wereld = de lengte van de array wereld




function setup() {
    matrix.init();
    frameRate(2);
}
/**
 * spreekt de andere fucnties aan 
 */
function draw() {
    matrix.clear();
    toonScore()
    toonAuto()
    beweegAuto()
    toonWereld()
    beweegWereld()
    matrix.show();
}


/**
 * toont de auto en hoe lang hij is
 */
function toonAuto() {
    for (let i = 0; i < 1; i++) {
        matrix.setLed(rijAuto, i, true, color('yellow'));
    }

}
/**
 * zorgt ervoor dat de auto omhoog en omlaag kan gaan
 */
function beweegAuto() {
    let y = readJoystickY()
    if (rijAuto > 0 && y > 900) {
        rijAuto -= 1
    }
    if (y < 100 && rijAuto < HEIGHT) {
        rijAuto += 1
    }
}
/**
 * zorgt ervoor dat de wereld verschuift wanneer de joystick naar links beweegt 
 */
function beweegWereld() {
    let x = readJoystickX()

    if (anker < breedteWereld - 1 - breedteMatrix && x > 900) {
        anker += 1
        console.log('anker:', anker);
        loopWereld() // wereld lussen indien nodig.
    }
    if (x < 100 && anker > 0) {
        anker -= 1
    }
    checkBotsing() // door updaten van anker staat auto al dan niet in de wereld
}


/**
 * toont de wereld
 */
function showColWereld(colWereld, colMatrix) {

    for (const rij of Wereld[colWereld]) {
        matrix.setLed(rij, colMatrix, true, 'green');
    }

}
/**
 *toont de 8 kolom van de wereld
 */
function toonWereld() {
    for (let kolom = 0; kolom < breedteMatrix; kolom++) {
        const colWereld = anker + kolom
        showColWereld(colWereld, kolom)
    }
}
/**
 * kijkt of de auto botst tegen de wereld
*/
function checkBotsing() {  
    
    if (Wereld[anker].includes(rijAuto)) {
        redScreen();
    
    }
}

/**
 * zorgt ervoor dat dat de matrix rood wordt
 */
function redScreen(){
    for (let r = 0; r < HEIGHT; r++) {
         for (let c = 0; c < WIDTH; c++) {
             matrix.setLed(r, c, true, color('red'));   
        }
    }
    
    frameRate(0) // TODO: op een andere manier
    setTimeout(() => {
     reset()   
    }, 1000);
}

/**
 * zorgt wanneer je botst dat het spel terug opnieuw begint
 */
function reset(){
    frameRate(2)
    rijAuto = 4
    anker = 0
    score = 0
    
}


/**
 * zorgt ervoor dat wereld steeds herhaalt wordt
 */
function loopWereld() {
    
    console.log(Wereld.length);
    if (anker >= Wereld.length-9) {
        anker = 0
        telScore()

        console.log('anker reset');
    }
}
/**
 * 
 */
function telScore(){
    score+=1
}

function toonScore(){
    document.getElementById("score").innerHTML= str(score)
}

function snelheid (){
   frameRate +=2
   console.log(framerate);
}
