import express from 'express';
import "reflect-metadata";
import { Game } from '../entity/game';
import { Message } from '../entity/message';

import { BoardService } from '../service/board.service';
import { GameService } from '../service/game.service';
import { File, Rank } from '../shared/types';
import { PieceService } from '../service/piece.service';

// Server consts
const app = express();
app.use(express.json()); // for parsing application/json
const port = 3000;

const pieceService = new PieceService();
const boardService = new BoardService(pieceService);
const gameService = new GameService(boardService);

// Endpoints

// Create new game
app.post('/new', (request, response) => {
    response.status(201).json(gameService.createNewGame());
});

// Get current game
app.get('/game', (request, response) => {
    if (gameService.getCurrentGame()) {
        response.status(200).json(gameService.getCurrentGame());
    } else {
        response.status(204).json(new Message('No game has been created. Create a new game.'));
    }

});

app.get('/rook/err', (req, res) => {
    gameService.movePiece('H', 2, 'H', 4);
    gameService.movePiece('H', 7, 'H', 6);
    gameService.movePiece('G', 2, 'G', 3);
    gameService.movePiece('B', 7, 'B', 6);
    gameService.movePiece('H', 1, 'H', 3);
    gameService.movePiece('C', 7, 'C', 6);
    res.status(400).json(gameService.movePiece('H', 3, 'D', 3));
})

app.get('/pawn/err1', (req, res) => {
    gameService.movePiece('E', 2, 'E', 3);
    gameService.movePiece('E', 7, 'D', 6);
    gameService.movePiece('A', 2, 'A', 3);
    res.status(400).json(gameService.movePiece('D', 7, 'D', 5));
})

app.get('/pawn/err2', (req, res) => {
    gameService.movePiece('E', 2, 'E', 3);
    gameService.movePiece('E', 7, 'D', 6);
    gameService.movePiece('A', 2, 'A', 3);
    res.status(400).json(gameService.movePiece('C', 7, 'D', 6));
})


// Restart game
app.post('/game/restart', (request, response) => {
    response.status(201).json(gameService.restartGame());
})

// Make a move
app.post('/game/move', (request, response) => {
    // Make sure only one move is made.
    if (Array.isArray(request.body.currentSquare) ||
        Array.isArray(request.body.targetSquare)) {
        response.status(400).json(new Message('You can only make one move per turn. Try again with only one Current square and only one Target square.'));
    } else {
        let initialFile: File = request.body.currentSquare.file;
        let initialRank: Rank = request.body.currentSquare.rank;
        let targetFile: File = request.body.targetSquare.file;
        let targetRank: Rank = request.body.targetSquare.rank;

        // Store result from calling movePiece
        let responseMovePiece: Game | Message = gameService.movePiece(initialFile, initialRank, targetFile, targetRank);
        
        // If result is some kind of error, return right status and message. Else, return Game.
        if (typeof responseMovePiece === 'string') {
            response.status(400).json(responseMovePiece);
        } else {  
            response.status(201).json(responseMovePiece);
        }
    }
})

app.listen(port, () =>{
    console.log(`server listening on port ${port}`);
});
