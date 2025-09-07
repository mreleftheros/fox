import wasm from "./password-hashing.wasm";

export namespace Password {
	export const hash = async (password: string, salt: string) => {
		const instance = await WebAssembly.instantiate(wasm, {});
		const exports = instance.exports as wasm.Exports;
		const memView = new Uint8Array(exports.memory.buffer);
		const enc = new TextEncoder();
		const passwordBytes = enc.encode(password);
		const passwordLen = passwordBytes.byteLength;
		const saltBytes = enc.encode(salt);
		const saltLen = saltBytes.byteLength;

		// write bytes
		for (let i = 0; i < passwordLen; i += 1) {
			memView[i] = passwordBytes[i];
		}
		for (let i = 0; i < saltLen; i += 1) {
			memView[passwordLen + i] = saltBytes[i];
		}

		const hashLen = exports.hash(0, passwordLen, saltLen);
		return new Uint8Array(
			exports.memory.buffer,
			passwordLen + saltLen,
			hashLen,
		);
	};

	export const verify = async (
		password: string,
		salt: string,
		stored: Uint8Array,
	) => {
		const instance = await WebAssembly.instantiate(wasm, {});
		const exports = instance.exports as wasm.Exports;
		const memView = new Uint8Array(exports.memory.buffer);
		const enc = new TextEncoder();
		const passwordBytes = enc.encode(password);
		const passwordLen = passwordBytes.byteLength;
		const saltBytes = enc.encode(salt);
		const saltLen = saltBytes.byteLength;
		const hashLen = stored.byteLength;

		// write bytes
		for (let i = 0; i < passwordLen; i += 1) {
			memView[i] = passwordBytes[i];
		}
		for (let i = 0; i < saltLen; i += 1) {
			memView[passwordLen + i] = saltBytes[i];
		}
		for (let i = 0; i < hashLen; i += 1) {
			memView[passwordLen + saltLen + i] = stored[i];
		}

		return !!exports.verify(0, passwordLen, saltLen, hashLen);
	};
}
