export class GridService {
    private gridSize = 10;

    private reduceToSingleDigit(num: number) {
        return (num > 9 ? Math.floor(num / 2) : num);
    }

    private countOccurrences(grid: string[][], char: string) {
        return grid.flat().reduce((count, cell) => (cell === char ? count + 1 : count), 0)
    }

    generateGrid(): string[][] {
        return Array.from({ length: this.gridSize }, () =>
            Array.from({ length: this.gridSize }, () =>
                // generate a random lowercase alphabetic character ('a' to 'z')
                // ASCII code for 'a' is 97, and there are 26 letters in the alphabet.
                // Math.random() generates a number between 0 and 1, which is scaled to 0-25 using Math.floor(Math.random() * 26).
                // Adding 97 gives the ASCII code for a letter in the range 'a' (97) to 'z' (122).
                String.fromCharCode(97 + Math.floor(Math.random() * 26))
            )
        );
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
