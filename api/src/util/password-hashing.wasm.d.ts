export type Exports = {
	memory: WebAssembly.Memory;
	hash(ptr: number, passwordLen: number, saltLen: number): number;
	verify(
		ptr: number,
		passwordLen: number,
		saltLen: number,
		storedLen: number,
	): number;
};
