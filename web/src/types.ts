type PartiallyOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type PartiallyNullable<T, K extends keyof T> = Omit<T, K> & {
	[P in K]: T[P] | null;
};

type ApiResponse<T, Y = void> = {
	error?: string;
	data?: T;
	errors?: Y;
};

type UserContext = {
	value: User | null;
	isLoading: boolean;
	signup(us: UserSignup): Promise<ApiResponse<User, UserErrors>>;
	login(ul: UserLogin): Promise<ApiResponse<User>>;
	getCurrent(): Promise<void>;
	logout(): Promise<void>;
};

type ResourceContext = {
	value: Resources | null;
	isLoading: boolean;
	error: string;
	getAll(): Promise<void>;
	reset(): void;
};

type Toast = {
	id: number;
	kind: "success" | "info" | "warning" | "error";
	message: string;
};

type User = {
	id: number;
	username: string;
	email: string;
	gender: 0 | 1;
	accessLevel: 0 | 1 | 100;
	isVerified: 1 | 0;
	createdOn: number;
};

type UserSignup = {
	username: string;
	email: string;
	password: string;
	gender: 0 | 1;
};

type UserLogin = Pick<UserSignup, "username" | "password">;

type UserErrors = {
	username?: string;
	email: string;
	password?: string;
};

type Resources = {
	users?: User[];
};

type GameData = {
	players: number[];
	title: string;
};

type Game = {
	name: "drawit" | "memory";
	ui: GameUi | null;
};

type GameUi = {
	value: "room" | "lobby";
	current: "room" | "lobby";
};

type GameConfig = {
	status: "idle" | "ready" | "play";
	level: number;
};
