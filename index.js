let grid = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

let score = 0;

let bg_colors = {
    0: "#d3cac1",
    2: "#eee4da",
    4: "#ede0c8",
    8: "#f2b179",
    16: "#f59563",
    32: "#f67c5f",
    64: "#f65e3b",
    128: "#edcf72",
    256: "#edcc61",
    512: "#edc850",
    1024: "#edc53f",
    2048: "#edc22e"
}

let text_colors = {
    0: "white",
    2: "#776e65",
    4: "#776e65",
    8: "#f9f6f2",
    16: "#f9f6f2",
    32: "#f9f6f2",
    64: "#f9f6f2",
    128: "#f9f6f2",
    256: "#f9f6f2",
    512: "#f9f6f2",
    1024: "#f9f6f2",
    2048: "#f9f6f2"
}

let updateScore = () => {
    document.getElementById("score-box").innerText = "Score: " + score;
}

let render = () => {
    updateScore();
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            let current_element = document.getElementsByClassName("cell")[i * 4 + j];
            current_element.style.backgroundColor = bg_colors[grid[i][j]];
            current_element.style.color = text_colors[grid[i][j]];
            if(grid[i][j] !== 0){
                current_element.innerHTML = grid[i][j];
            } else {
                current_element.innerHTML = null;
            }
        }
    }
}

function openPopup() {
    var popupContainer = document.getElementById('popupContainer');
    popupContainer.style.display = 'flex';
}

// Close the popup
function closePopup() {
    var popupContainer = document.getElementById('popupContainer');
    popupContainer.style.display = 'none';
    startNewGame();
}

let clickUp = () => {
    for(let col = 0; col < 4; col++){
        let prev_val = 0;
        let curr_ind = 0;
        for(let row = 0; row < 4; row++){
            if(grid[row][col] === 0){
                continue;
            } else {
                if(prev_val === 0){
                    prev_val = grid[row][col];
                    grid[row][col] = 0;
                } else if(grid[row][col] === prev_val){
                    grid[curr_ind][col] = prev_val * 2;
                    let n = Math.log2(2 * prev_val);
                    score = score + ((n-1) * Math.pow(2,n));
                    updateScore();
                    if(prev_val * 2 === 2048){
                        openPopup();
                    }
                    grid[row][col] = 0;
                    prev_val = 0;
                    curr_ind++;
                } else {
                    grid[curr_ind][col] = prev_val;
                    prev_val = grid[row][col];
                    grid[row][col] = 0;
                    curr_ind++;
                }
            }
        }
        if(prev_val !== 0) grid[curr_ind][col] = prev_val;
    }
}

let clickDown = () => {
    for(let col = 0; col < 4; col++){
        let prev_val = 0;
        let curr_ind = 3;
        for(let row = 3; row >= 0; row--){
            if(grid[row][col] === 0){
                continue;
            } else {
                if(prev_val === 0){
                    prev_val = grid[row][col];
                    grid[row][col] = 0;
                } else if(prev_val === grid[row][col]){
                    grid[curr_ind][col] = prev_val * 2;
                    let n = Math.log2(2 * prev_val);
                    score = score + ((n-1) * Math.pow(2,n));
                    updateScore();
                    if(prev_val * 2 === 2048){
                        openPopup();
                    }
                    grid[row][col] = 0;
                    prev_val = 0;
                    curr_ind--;
                } else {
                    grid[curr_ind][col] = prev_val;
                    curr_ind--;
                    prev_val = grid[row][col];
                    grid[row][col] = 0;
                }
            }
        }
        if(prev_val !== 0) grid[curr_ind][col] = prev_val;
    }
}

let clickLeft = () => {
    for(let row = 0; row < 4; row++){
        let prev_val = 0;
        let curr_ind = 0;
        for(let col = 0; col < 4; col++){
            if(grid[row][col] === 0){
                continue;
            } else {
                if(prev_val === 0){
                    prev_val = grid[row][col];
                    grid[row][col] = 0;
                } else if(prev_val === grid[row][col]){
                    grid[row][curr_ind] = prev_val * 2;
                    let n = Math.log2(2 * prev_val);
                    score = score + ((n-1) * Math.pow(2,n));
                    updateScore();
                    if(prev_val * 2 === 2048){
                        openPopup();
                    }
                    grid[row][col] = 0;
                    prev_val = 0;
                    curr_ind++;
                } else {
                    grid[row][curr_ind] = prev_val;
                    curr_ind++;
                    prev_val = grid[row][col];
                    grid[row][col] = 0;
                }
            }
        }
        if(prev_val !== 0) grid[row][curr_ind] = prev_val;
    }
}

let clickRight = () => {
    for(let row = 0; row < 4; row++){
        let prev_val = 0;
        let curr_ind = 3;
        for(let col = 3; col >= 0; col--){
            if(grid[row][col] === 0){
                continue;
            } else {
                if(prev_val === 0){
                    prev_val = grid[row][col];
                    grid[row][col] = 0;
                } else if(prev_val === grid[row][col]){
                    grid[row][curr_ind] = prev_val * 2;
                    let n = Math.log2(2 * prev_val);
                    score = score + ((n-1) * Math.pow(2,n));
                    updateScore();
                    if(prev_val * 2 === 2048){
                        openPopup();
                    }
                    curr_ind--;
                    prev_val = 0;
                    grid[row][col] = 0;
                } else {
                    grid[row][curr_ind] = prev_val;
                    curr_ind--;
                    prev_val = grid[row][col];
                    grid[row][col] = 0;
                }
            }
        }
        if(prev_val !== 0) grid[row][curr_ind] = prev_val;
    }
}

let generateInitialValues = () => {
    // Set score to zero (0)
    score = 0;

    // Find two random values betw 0-15
    let x = Math.floor(Math.random() * 16);
    let y = Math.floor(Math.random() * 16);
    while (x === y) {
        y = Math.floor(Math.random() * 16);
    }

    // Put 2 in place at x and y in grid
    grid[Math.floor(x / 4)][x % 4] = 2;
    grid[Math.floor(y / 4)][y % 4] = 2;
    console.log(grid);

    render();
}

let generateRandomValue = () => {
    let empty_tiles = [];
    for(let row = 0; row < 4; row++){
        for(let col = 0; col < 4; col++){
            if(grid[row][col] === 0){
                empty_tiles.push([row, col]);
            }
        }
    }
    if(empty_tiles.length === 0) return false;
    let ran_ind = Math.floor(Math.random() * empty_tiles.length);
    grid[empty_tiles[ran_ind][0]][empty_tiles[ran_ind][1]] = 2;
    render();
    return true;
}

// let checkIfMoveisPossible = () => {
//     let flag = false;
//     for(let row = 0; row < 4; row++){
//         for(let col = 0; col < 3; col++){
//             if(grid[row][col] === grid[row][col+1]){
//                 flag = true;
//                 break;
//             }
//         }
//     }
//     for(let col = 0; col < 4; col++){
//         for(let row = 0; row < 3; row++){
//             if(grid[row][col] === grid[row+1][col]){
//                 flag = true;
//                 break;
//             }
//         }
//     }
//     return flag;
// }
let checkIfMoveisPossible = () => {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 3; col++) {
            if (grid[row][col] === 0 || grid[row][col] === grid[row][col + 1]) {
                return true;
            }
        }
    }
    for (let col = 0; col < 4; col++) {
        for (let row = 0; row < 3; row++) {
            if (grid[row][col] === 0 || grid[row][col] === grid[row + 1][col]) {
                return true;
            }
        }
    }
    return false;
};



let startNewGame = () => {
    grid = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    score = 0;
    generateInitialValues();
}

// Call the function to see the output
generateInitialValues();

// Add event listner to page for keyup
document.getElementsByTagName("body")[0].addEventListener("keydown", (e) => {
    let old_grid = JSON.stringify(grid);

    if(e.key === "ArrowUp"){
        clickUp();
    } else if(e.key === "ArrowDown"){
        clickDown();
    } else if(e.key === "ArrowLeft"){
        clickLeft();
    } else if(e.key === "ArrowRight"){
        clickRight();
    }

    if (old_grid === JSON.stringify(grid)){
        if(!checkIfMoveisPossible()){                                 //Check for generateRandomValue()
            alert("You Lose! Start New Game to Play again.");
        } else {
            return
        }
    };

    let new_val = generateRandomValue();

    if(!new_val) console.log("You Lose!");

    render();
})
