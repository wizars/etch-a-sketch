
// DONE Mensaje para el usuario q pide el tamaño al menos la primera vez q se abre
// DONE  teñir de negro solo 10 % cada vez q se para por un box
// DONE añadir otro checkbox para el gradual este de 10 
// TODO colocar los controles en un lateral o algo asi
// TODO hacer q todo el html se genere desde java



// ======== GET ALL THE OBJECTS ======== //

// Get grid object
let grid = document.getElementById("grid");

// Get the size input objects
let gridWidthInput = document.getElementById("gridWidth");
let gridHeightInput = document.getElementById("gridHeight");

// Get  checkboxs
let checkBoxRainbow = document.getElementById("rainbow");
let checkBoxGradual = document.getElementById("gradual");
let checkBoxErase = document.getElementById("erase");

// Get buttons objects
let btn_clear = document.getElementById("btn_clear");
let btn_generate = document.getElementById("btn_generate");
let btn_load = document.getElementById("btn_load")

// ======== EVENT LISTENERS ======== //

// Event listener for  buttons
btn_generate.addEventListener("click", creatGrid);
btn_clear.addEventListener("click", clearGrid);
btn_load.addEventListener("click", loadPic);


// Event listener for input change
gridWidthInput.addEventListener("change", inputChange);
gridHeightInput.addEventListener("change", inputChange);
gridWidthInput.addEventListener("keydown", inputKeyHandle);
gridHeightInput.addEventListener("keydown", inputKeyHandle);

// ======== START  ======== //


// Declare global size variables
var numCol, numRows, box_width, box_height, padd, pixelImg;

// preload the cat picture
var context = document.getElementById("mycanvas").getContext("2d")
const img = new Image;
img.src = "cat.bmp"
img.addEventListener("load", e => { context.drawImage(img, 0, 0, 24, 24); });



// Creat grid on loading
creatGrid();



// ======== FUNCTIONS  ======== //

// Compute the sizes variables needed
function computeSizes() {


    // If the grid size is not yet defined
    if (numCol === undefined || numCol === "") {
        if (numRows === undefined || numRows === "") {

            // Ask the use about the grid size
            let gridSize = window.prompt("Set the size of the square grid (max 64):");

            // Shows the Cat button only for 24x24 grid sizes
            if (gridSize === "24") { btn_load.hidden = false }

            // fill the input fields with the value
            gridWidthInput.value = gridSize;
            gridHeightInput.value = gridSize;

            // Asign the size to nc and nr
            numCol = gridSize;
            numRows = gridSize;
        }
    }

    // Obtain the padding of the grid
    padd = parseInt(window.getComputedStyle(grid).getPropertyValue("padding"));

    // Compute the box sizes
    box_width = (grid.offsetWidth - 2 * padd) / numCol;
    box_height = (grid.offsetHeight - 2 * padd) / numRows;
}

// Creates the grid 
function creatGrid() {

    // Reset button color
    btn_generate.style.backgroundColor = "lightgray";
    btn_generate.style.borderColor = "grey";
    btn_generate.disabled = true;

    // Clear the grid
    grid.innerHTML = "";

    // Compute the sizes needed
    computeSizes();

    // Temp variables
    let tag, text


    // Create the boxes
    for (let x = 1; x <= numCol; x++) {
        for (let y = 1; y <= numRows; y++) {

            // Create the new element
            tag = document.createElement("div");
            tag.setAttribute("class", "box")
            tag.setAttribute("width", box_width);
            tag.setAttribute("height", box_height);
            tag.setAttribute("id", "box" + x + "-" + y);
            tag.setAttribute("style", "background-color:rgba(255,255,255,1)")

            // Event listener for mouse over in the grid
            tag.addEventListener("pointerover", changeBoxColor);

            // Append the new element
            grid.appendChild(tag)

        }
    }
    // Reset the pixelImg array
    if (pixelImg !== undefined)
        pixelImg = undefined;

    // Set the grid properties of te grid container
    grid.style.gridTemplateColumns = `repeat(${numCol}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${numRows}, 1fr)`

}

// Changes color mode, black or rainbow
function changeBoxColor() {

    //Erase mode
    if (checkBoxErase.checked === true) {
        this.style.backgroundColor = "rgba(255,255,255,1)"
    }
    else {

        // Rainbow mode
        if (checkBoxRainbow.checked === true) {
            this.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
        }
        else {
            // Gradual mode
            if (checkBoxGradual.checked === true) {
                let currentColor = this.style.backgroundColor;
                this.style.backgroundColor = makeDarker(currentColor);
            }
            // Normal mode
            else {
                this.style.backgroundColor = "rgba(0,0,0,1)";
            }
        }
    }

}

// Increases the alpha chanel a 10%
function makeDarker(currentColor) {

    let alpha;
    // Separete each component
    currentColor = currentColor.split(",")

    // Get the current color values
    let r = Number(currentColor[0].match(/\d+$/)[0]);
    let g = Number(currentColor[1].match(/\d+/)[0]);
    let b = Number(currentColor[2].match(/\d+/)[0])

    // If there's already an alpha chanel
    if (currentColor.length === 4) {
        alpha = Math.round(currentColor[3].slice(0, -1).match(/(\d*\.*\d*)$/)[0] * 100) / 100
        alpha = alpha <= 0.9 ? Math.round((alpha + 0.1) * 100) / 100 : 1;
    }
    // It's a rgb color, default alpha =1
    else if (currentColor.length === 3) {

        // We change alpha to 0.1 and the rest of colors to  0 
        if (r !== 0 && g !== 0 && b !== 0) {
            alpha = 0.1;
            r = 0; g = 0; b = 0;
        }

    }

    // return the new color
    console.log(`rgba(${r}, ${g},${b},${alpha})`)
    return `rgba(${r}, ${g},${b},${alpha})`;



}

// Changes the generate grid button color when the input size changes
function inputChange() {

    // Change button styles and refresh variables
    btn_generate.style.backgroundColor = "indianred";
    btn_generate.style.borderColor = "darkred"
    btn_generate.disabled = false;
    numCol = gridWidthInput.value;
    numRows = gridHeightInput.value;

    // Shows the Cat button only for 24x24 grid sizes
    if (gridWidthInput.value === "24" && gridHeightInput.value === "24") {
        btn_load.hidden = false
    }
    else { 
        btn_load.hidden = true 
    }
}

// Detects enter key in the inputs
function inputKeyHandle(event) {
    if (event.key === "Enter") {
        creatGrid()
    }
}

// Clears the grid
function clearGrid() {
    // Goes over all the box elements changin the background color to white
    document.querySelectorAll(".box").forEach(box => box.style.backgroundColor = "rgba(255,255,255,1")
}

// Loads cat picture
function loadPic() {

    // Get the image data
    var imgData = document.getElementById("mycanvas").getContext("2d").getImageData(0, 0, 24, 24);

    // Extract the pixel data to the pixel 3D array
    pixelImg = new Array();
    for (i = 0; i < 24; i++) {
        pixelImg[i] = new Array();
        for (j = 0; j < 24; j++) {
            pixelImg[i][j] = new Array();
            let ind = i * 24 * 4 + j * 4;
            pixelImg[i][j][0] = imgData.data[ind]
            pixelImg[i][j][1] = imgData.data[ind + 1]
            pixelImg[i][j][2] = imgData.data[ind + 2]
            pixelImg[i][j][3] = parseInt(imgData.data[ind + 3]) / 255
            let box = document.getElementById(`box${i + 1}-${j + 1}`);
            box.setAttribute("style", `background-color:rgba(
                ${pixelImg[i][j][0]}, 
                ${pixelImg[i][j][1]}, 
                ${pixelImg[i][j][2]}, 
                ${pixelImg[i][j][3]} )`)

        }
    }

}