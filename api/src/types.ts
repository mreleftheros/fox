interface ExecutionContext {
	user?: User;
}

type UserDao = {
	id: number;
	username: string;
	email: string;
	gender: 0 | 1;
	hash: Uint8Array;
	accessLevel: 0 | 1 | 100;
	isVerified: 1 | 0;
	createdOn: number;
};

type User = Omit<UserDao, "hash">;

type UserSignup = {
	username: string;
	email: string;
	password: string;
	gender: 0 | 1;
};

type UserLogin = Pick<UserSignup, "username" | "password">;

type UserErrors = {
	username?: string;
	email?: string;
	password?: string;
};

type UserValidation = {
	error?: string;
	data?: UserSignup;
	errors?: UserErrors;
};

type Resources = {
	users?: User[];
};
