

// Get grid object
let grid = document.getElementById("grid");

// Get the button object
let btn_generate = document.getElementById("btn_generate");

// Get the size input objects
let gridWidthInput = document.getElementById("gridWidth");
let gridHeightInput = document.getElementById("gridHeight");

// Get rainbow mode checkbox object
let rainbow = document.getElementById("rainbow");

// Event listener for generate grid button
btn_generate.addEventListener("click", creatGrid);

// Event listener for input change
gridWidthInput.addEventListener("change", inputChange)
gridHeightInput.addEventListener("change", inputChange)

// Creat grid on loading
creatGrid(numCol, numRows);


// Declare global size variables
var numCol, numRows, box_width, box_height, padd;

// Compute the sizes variables needed
function computeSizes() {

    // Get the size variables
    numCol = gridWidthInput.value
    numRows = gridHeightInput.value

    // Obtain the padding of the grid
    padd = parseInt(window.getComputedStyle(grid).getPropertyValue("padding"));

    // Compute the box sizes
    box_width = (grid.offsetWidth - 2 * padd) / numCol;
    box_height = (grid.offsetHeight - 2 * padd) / numRows;

    // Show results
    console.group()
    console.log("Ancho de caja: " + box_width);
    console.log("Alto de caja: " + box_height);
    console.log("Padding del grid: " + padd);
    console.log("Columnas: " + numCol);
    console.log("Filas: " + numRows);
    console.groupEnd();
}

// Creates the grid 
function creatGrid() {

    // Reset button color
    btn_generate.style.backgroundColor = "lightgray";
    btn_generate.style.borderColor = "grey";

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
            tag.setAttribute("id", "box" + x + "-" + y)

            // Event listener for mouse over in the grid
            tag.addEventListener("pointerover", changeBoxColor);

            // Append the new element
            grid.appendChild(tag)



        }
    }

    // Set the grid properties of te grid container
    grid.style.gridTemplateColumns = `repeat(${numCol}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${numRows}, 1fr)`

}
function changeBoxColor(){
    if (rainbow.checked===true)
    {
        this.style.backgroundColor="red"

    }
    else{

        this.style.backgroundColor="black"
    }

}

// Changes the generate grid button color when the input size changes
function inputChange() {
    btn_generate.style.backgroundColor = "indianred";
    btn_generate.style.borderColor = "darkred"
}