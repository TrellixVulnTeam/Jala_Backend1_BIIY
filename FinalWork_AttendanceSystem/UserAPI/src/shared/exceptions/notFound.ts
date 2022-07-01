import { BaseError } from './baseError';

export class NotFound extends BaseError {
    constructor(public description: string) {
        super(404, 'User not found', description);
    }
}