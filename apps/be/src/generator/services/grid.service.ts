export class GridService {
    private gridSize = 10;

    private isValidBiasChar(biasChar: string): boolean {
        return /^[a-z]$/.test(biasChar);
    }

    private reduceToSingleDigit(num: number): number {
        while (num > 9) {
            num = Math.floor(num / 2);
        }
        return num;
    }

    private countOccurrences(grid: string[][], char: string) {
        return grid.flat().reduce((count, cell) => (cell === char ? count + 1 : count), 0);
    }

    generateGrid(biasChar?: string): string[][] {
        const grid = Array.from({ length: this.gridSize }, () =>
            Array.from({ length: this.gridSize }, () =>
                // generate a random lowercase alphabetic character ('a' to 'z')
                // ASCII code for 'a' is 97, and there are 26 letters in the alphabet.
                // Math.random() generates a number between 0 and 1, which is scaled to 0-25 using Math.floor(Math.random() * 26).
                // Adding 97 gives the ASCII code for a letter in the range 'a' (97) to 'z' (122).
                String.fromCharCode(97 + Math.floor(Math.random() * 26))
            )
        );

        if (biasChar && this.isValidBiasChar(biasChar)) {
            const totalCells = this.gridSize * this.gridSize;
            const biasCells = Math.floor(totalCells * 0.2);
            let placedCells = 0;

            // Randomly place the biasChar in the grid
            while (placedCells < biasCells) {
                const row = Math.floor(Math.random() * this.gridSize);
                const col = Math.floor(Math.random() * this.gridSize);

                // Only place if the cell is not already the biasChar
                if (grid[row][col] !== biasChar) {
                    grid[row][col] = biasChar;
                    placedCells++;
                }
            }
        }

        return grid;
    }

    computeCode(grid: string[][]): string {
        const now = new Date();
        const seconds = now.getSeconds();

        // Get the tens digit 
        const first = Math.floor(seconds / 10);
        // Get the ones digit 
        const second = seconds % 10;

        const char1 = grid[first][second];
        const char2 = grid[second][first];

        let count1 = this.countOccurrences(grid, char1);
        let count2 = this.countOccurrences(grid, char2);

        count1 = this.reduceToSingleDigit(count1);
        count2 = this.reduceToSingleDigit(count2);

        return `${count1}${count2}`;
    }

}
