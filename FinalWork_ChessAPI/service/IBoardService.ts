import { Board } from '../entity/board';
import { Piece } from '../entity/piece';
import { File, Rank } from '../shared/types';

export interface IBoardService {
    
    initBoard(): Board;
    movePiece(initialFile: File, initialRank: Rank, goalFile: File, goalRank: Rank): Board | string;
    getPiece(file: File, rank: Rank): Piece | undefined;

}