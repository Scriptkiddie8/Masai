"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
class Player {
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol;
    }
}
class Board {
    constructor() {
        this.size = 3;
        this.centerLock = null;
        this.grid = Array.from({ length: this.size }, () => Array.from({ length: this.size }, () => "_"));
    }
    print() {
        console.log("\n   1   2   3");
        for (let r = 0; r < this.size; r++) {
            const row = this.grid[r].map((c) => (c === "_" ? " " : c)).join(" | ");
            console.log(`${r + 1}  ${row}`);
            if (r < this.size - 1)
                console.log("  ---+---+---");
        }
        if (this.centerLock) {
            console.log(`\nCenter locked to: ${this.centerLock}`);
        }
        console.log();
    }
    isFull() {
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                if (this.grid[r][c] === "_")
                    return false;
            }
        }
        return true;
    }
    inBounds(r, c) {
        return r >= 0 && r < this.size && c >= 0 && c < this.size;
    }
    updateDiagonalLock(symbol) {
        if (this.centerLock)
            return;
        const a = this.grid[0][0] === symbol && this.grid[2][2] === symbol;
        const b = this.grid[0][2] === symbol && this.grid[2][0] === symbol;
        if ((a || b) && this.grid[1][1] === "_") {
            this.centerLock = symbol;
        }
    }
    placeOrThrow(r1, c1, symbol) {
        const r = r1 - 1, c = c1 - 1;
        if (!Number.isInteger(r) || !Number.isInteger(c)) {
            throw new Error("Row and column must be integers.");
        }
        if (!this.inBounds(r, c)) {
            throw new Error("Move out of bounds. Use 1..3 for row and column.");
        }
        if (this.grid[r][c] !== "_") {
            throw new Error("Cell is already occupied.");
        }
        if (r === 1 && c === 1 && this.centerLock && this.centerLock !== symbol) {
            throw new Error("Center is locked for you by the opponent.");
        }
        this.grid[r][c] = symbol;
        if (r === 1 && c === 1 && this.centerLock === symbol) {
            this.centerLock = null;
        }
        this.updateDiagonalLock(symbol);
    }
    hasWin(symbol) {
        for (let i = 0; i < 3; i++) {
            if (this.grid[i][0] === symbol &&
                this.grid[i][1] === symbol &&
                this.grid[i][2] === symbol)
                return true;
            if (this.grid[0][i] === symbol &&
                this.grid[1][i] === symbol &&
                this.grid[2][i] === symbol)
                return true;
        }
        if (this.grid[0][0] === symbol &&
            this.grid[1][1] === symbol &&
            this.grid[2][2] === symbol)
            return true;
        if (this.grid[0][2] === symbol &&
            this.grid[1][1] === symbol &&
            this.grid[2][0] === symbol)
            return true;
        return false;
    }
}
class Game {
    constructor() {
        this.board = new Board();
        this.players = [];
        this.turnIdx = 0;
        this.rl = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }
    ask(q) {
        return new Promise((res) => this.rl.question(q, res));
    }
    async registerPlayers() {
        const name1 = (await this.ask("Player 1 name: ")).trim();
        const name2 = (await this.ask("Player 2 name: ")).trim();
        if (!name1 || !name2)
            throw new Error("Names cannot be empty.");
        if (name1 === name2)
            throw new Error("Player names must be unique.");
        const sym1 = (await this.ask(`${name1} symbol (single char, not '_'): `)).trim();
        const sym2 = (await this.ask(`${name2} symbol (single char, not '_', not ${sym1}): `)).trim();
        const validSym = (s) => s.length === 1 && s !== "_" && !/\s/.test(s);
        if (!validSym(sym1) || !validSym(sym2))
            throw new Error("Invalid symbol(s).");
        if (sym1 === sym2)
            throw new Error("Symbols must be unique.");
        this.players = [new Player(name1, sym1), new Player(name2, sym2)];
        console.log(`\n${name1} = ${sym1}, ${name2} = ${sym2}\n`);
    }
    current() {
        return this.players[this.turnIdx];
    }
    nextTurn() {
        this.turnIdx = 1 - this.turnIdx;
    }
    async promptMove() {
        const p = this.current();
        const input = (await this.ask(`${p.name} (${p.symbol}) move [row col] or 'q' to quit: `)).trim();
        if (input.toLowerCase() === "q") {
            console.log("Goodbye.");
            return false;
        }
        const parts = input.split(/\s+/);
        if (parts.length !== 2) {
            console.log("Enter two numbers: row col (e.g., 2 3).");
            return true;
        }
        const r = Number(parts[0]);
        const c = Number(parts[1]);
        try {
            this.board.placeOrThrow(r, c, p.symbol);
        }
        catch (e) {
            console.log(`Invalid move: ${e.message}`);
            return true;
        }
        this.board.print();
        if (this.board.hasWin(p.symbol)) {
            console.log(`Winner: ${p.name} (${p.symbol})`);
            return false;
        }
        if (this.board.isFull()) {
            console.log("Draw. Board is full.");
            return false;
        }
        this.nextTurn();
        return true;
    }
    async start() {
        console.log("Tic‑Tac‑Toe (Diagonal‑Lock Variant)");
        try {
            await this.registerPlayers();
        }
        catch (e) {
            console.error(`Setup error: ${e.message}`);
            this.rl.close();
            return;
        }
        this.board.print();
        let cont = true;
        while (cont) {
            cont = await this.promptMove();
        }
        this.rl.close();
    }
}
new Game().start();
