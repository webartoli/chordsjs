export class UnexpectedInputError extends Error {

    constructor(public message?: string) {
        super(message)
        this.name = 'UnexpectedInput'
    }
}