import { Square } from '../entity/square';
import { Pawn } from '../entity/pawn';
import { Bishop } from '../entity/bishop';
import { BoardService } from '../service/board.service';
import { PieceService } from '../service/piece.service';
import { GameService } from '../service/game.service';
import { Game } from '../entity/game';
import { Message } from '../entity/message';

const bishop: Bishop = new Bishop('Bishop', 'Black', 'D', 4);
const pieceService: PieceService = new PieceService();
const boardService: BoardService = new BoardService(pieceService);
const gameService: GameService = new GameService(boardService);
const message: Message = new Message('Invalid move. Try again with another Target square.');

describe('Test Bishop moves', () =>{

    // it('Should move right diagonal up', () => {
    //     let square = new Square('H', 8);
    //     expect(bishop.canMoveTo(square)).toBe(true);
    // });

    // it('Should move right diagonal down', () => {
    //     let square = new Square('G', 1);
    //     expect(bishop.canMoveTo(square)).toBe(true);
    // });

    // it('Should move left diagonal up', () => {
    //     let square = new Square('A', 7);
    //     expect(bishop.canMoveTo(square)).toBe(true);
    // });

    // it('Should move left diagonal down', () => {
    //     let square = new Square('A', 1);
    //     expect(bishop.canMoveTo(square)).toBe(true);
    // });

    // it('Should not move vertically up', () => {
    //     let square = new Square('D', 8);
    //     expect(bishop.canMoveTo(square)).toBe(false);
    // });

    // it('Should not move vertically down', () => {
    //     let square = new Square('D', 1);
    //     expect(bishop.canMoveTo(square)).toBe(false);
    // });

    // it('Should not move horizontally right', () => {
    //     let square = new Square('H', 4);
    //     expect(bishop.canMoveTo(square)).toBe(false);
    // });

    // it('Should not move horizontally left', () => {
    //     let square = new Square('A', 4);
    //     expect(bishop.canMoveTo(square)).toBe(false);
    // });

    // it('Should not move other than diagonally', () => {
    //     let square = new Square('E', 7);
    //     expect(bishop.canMoveTo(square)).toBe(false);
    // });

    // it('Should not move other than diagonally', () => {
    //     let square = new Square('A', 3);
    //     expect(bishop.canMoveTo(square)).toBe(false);
    // });

    // it('Should not move to its current position', () => {
    //     let square = new Square('D', 4);
    //     expect(bishop.canMoveTo(square)).toBe(false);
    // });

    // it('Should not move to an occupied square', () => {
    //     let square = new Square('E', 5, new Pawn('Pawn', 'White', 'E', 5));
    //     expect(bishop.canMoveTo(square)).toBe(false);
    // });

    it('Should not move if there is any piece blocking its way', () => {
        gameService.createNewGame();
        expect(gameService.movePiece('C', 1, 'F', 4)).toStrictEqual(message);
    });

    it('Should not move if there is any piece blocking its way', () => {
        gameService.createNewGame();
        expect(gameService.movePiece('F', 1, 'A', 6)).toStrictEqual(message);
    });

    it('Should not move if there is any piece blocking its way', () => {
        gameService.createNewGame();
        gameService.movePiece('E', 2, 'E', 3);
        expect(gameService.movePiece('C', 8, 'H', 3)).toStrictEqual(message);
    });

    it('Should not move if there is any piece blocking its way', () => {
        gameService.createNewGame();
        gameService.movePiece('E', 2, 'E', 3);
        expect(gameService.movePiece('F', 8, 'A', 3)).toStrictEqual(message);
    });
});