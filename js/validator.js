'use strict';

define('validator', function() {
    var checksum = 362880;
    
    function checkSubGrid(solution, row, col) {
        let gridsum = 1;
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                gridsum *= solution[row + i][col + j];
            }
        }
        return gridsum == checksum;
    };
    
    function checkConflicts(grid, row, col, val) {
        var inRow = 0, inCol = 0, inSubGrid = 0; 
        var subGrid = [parseInt(row / 3) * 3, parseInt(col / 3) * 3];
        for(let i = 0; i < 9; i++) {
            if(grid[row][i] == val) inRow++;
            if(grid[i][col] == val) inCol++;
        }
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(grid[subGrid[0] + i][subGrid[1] + j] == val) {
                    inSubGrid++;
                }
            }
        }
        return (inRow > 1 || inCol > 1 || inSubGrid > 1);  
    };
    
    function checkGrid(grid) {
        var val = 0;
        for(let i = 0; i < 9; i++) {
            for(let j = 0; j < 9; j++) {
                val = grid[i][j];
                if(val && this.checkConflicts(grid, i, j , val))
                    return false;
            }
        }
        return true;  
    };
    
    function checkSolution(solution) {
        var rowsum = 1, colsum = 1;
        for(let i = 0; i < 9; i++) {
            rowsum = colsum = 1;
            for(let j = 0; j < 9; j++) {
                rowsum *= solution[i][j];
                colsum *= solution[j][i];
                if(i % 3 == 0 && j % 3 == 0 && !checkSubGrid(solution, i, j)) {
                    return false;
                }
            }
            if(rowsum != checksum || colsum != checksum) {
                return false;
            }
        }
        return true;  
    };
    
    return {
        checkGrid : checkGrid,
        checkConflicts : checkConflicts,
        checkSolution : checkSolution
    }; 
});