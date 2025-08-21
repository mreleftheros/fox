export namespace Games {
	export const value: Record<Game["name"], GameData> = {
		memory: { players: [1, 2], title: "Παιχνίδι Μνήμης" },
		wordle: { players: [1], title: "Wordle" },
	};

	export const get = (name: Game["name"]): GameData => value[name];

	export const isSolo = (name: Game["name"]): boolean =>
		value[name].players.length === 1 && value[name].players[0] === 1;

	export const isMultiplayer = (name: Game["name"]): boolean =>
		value[name].players.length > 1 && !value[name].players.includes(1);

	export const isSoloAndMultiPlayer = (name: Game["name"]): boolean =>
		value[name].players.length > 1 && value[name].players.includes(1);
}
