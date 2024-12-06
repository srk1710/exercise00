export const generateGrid = (): string[][] => {
    const grid: string[][] = [];
    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < 10; i++) {
        const row: string[] = [];
        for (let j = 0; j < 10; j++) {
            const randomChar = alphabet[Math.floor(Math.random() * alphabet.length)];
            row.push(randomChar);
        }
        grid.push(row);
    }

    return grid;
};