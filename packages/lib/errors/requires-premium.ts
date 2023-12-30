/**
 * Throw an error if the user is not a premium subscriber.
 */
export class RequiresPremiumError extends Error {
    constructor(message = "You must be a premium subscriber to use this functionality.") {
        super(message);
    }
}
