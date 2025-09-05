const SERVER_ERROR = "internal error";

export default class ApiError extends Error {
	status: number;

	constructor(message = SERVER_ERROR, status = 500) {
		super(message);
		this.status = status;
	}
}
