canvas = document.getElementById('canvas');
context = canvas.getContext("2d");

// OPTIONS
const letterColor = "#222222";
const partOfWord = "#FF0000"
const gridColor = '#BB8'; // #STARWARS :)
const drawGrid = false;
const drawBorder = false;
const font = "Consolas"; // Arial, Consolas, Tahoma
const letterCase = "lower";

document.getElementById("gen").addEventListener('click', generateWordSearch);
canvas.addEventListener('mousemove', hoverTile);

// Parses the word box for the input words
function getWords() {
	var words = [];
	var wordBox = document.getElementById('word-box').childNodes;
	
	for(var i = 1; i < wordBox.length; i++) {
		var word = wordBox[i].textContent;
		if(word !== "") {
			words.push(word)
		}
		
	}
	return words;
}

function setColor(color) {
	context.strokeStyle = color;
	context.fillStyle = color;
}

function drawBorderLines(color) {
	setColor(color)
	context.strokeRect(0,0, canvas.width, canvas.height);
}

function drawGridLines(color) {
	setColor(color)
	
	// Draw vertical gridlines
	for(x = 1; x < cols; x++) {
		context.fillRect((x * cellSize), 0, 1, canvas.width)
	}
	
	// Draw horizontal gridlines
	for(y = 1; y < rows; y++) {
		context.fillRect(0, (y * cellSize), canvas.width, 1)
	}

}

function drawLetter(letter, x, y, color) {
	letterHeight = 20
	
	if(letter.length > 1) {
		letter = letter[0];
	}
	context.font = letterHeight + "px " + font;
	context.textAlign = 'center';
	context.textBaseline = 'middle';
	setColor(color)
	context.fillText(letter, x, y);
}

function drawLetters() {
	numberX = 1;
	numberY = 1;
	
	for(y = 0; y < rows; y++) {
		for(x = 0; x < cols; x++) {
			letter = grid[x][y]
			
			if(letter.isPartOfWord) {
				color = partOfWord;
			}
			else {
				color = letterColor;
			}
			if(letterCase == "upper") {
				l = letter.str.toUpperCase()
			}
			else {
				l = letter.str.toLowerCase()
			}
			
			drawLetter(l, (x * cellSize) + cellSize / 2, y * cellSize + cellSize / 2, color)
		}
	}
}

function hoverTile(event) {
	rect = canvas.getBoundingClientRect()
    x = Math.floor((event.clientX - rect.left) / cellSize)
    y = Math.floor((event.clientY - rect.top) / cellSize)
	
	draw(x, y);
}

// Draws everything
function draw(x, y) {
	// Clear the canvas
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	// Draw grid lines if necessary
	if(drawGrid) { drawGridLines(gridColor) }
	if(drawBorder) { drawBorderLines(gridColor) }
	
	drawLetters();
	context.fillStyle = 'rgba(10, 10, 10, 0.1)';
	context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
}

function generateWordSearch() {
	console.log("Generating Word Search")
	
	// Get the word search
	grid = genSearch(getWords())
	
	width = document.getElementById('width').value

	rows = width;
	cols = width;
	
	cellSize = canvas.width / rows;
	
	draw();
}

generateWordSearch()