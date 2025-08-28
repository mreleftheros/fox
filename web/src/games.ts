export namespace Games {
	export const value: Record<Game["name"], GameData> = {
		drawit: {
			players: Array(10)
				.fill(null)
				.map((_, i) => i + 1),
			title: "Ζωγραφική",
		},
		memory: { players: [1, 2], title: "Παιχνίδι Μνήμης" },
	};

	export const get = (name: Game["name"]): GameData => value[name];

	export const isSolo = (name: Game["name"]): boolean =>
		value[name].players.length === 1 && value[name].players[0] === 1;

	export const isMultiplayer = (name: Game["name"]): boolean =>
		value[name].players.length > 1 && !value[name].players.includes(1);

	export const isSoloAndMultiPlayer = (name: Game["name"]): boolean =>
		value[name].players.length > 1 && value[name].players.includes(1);
}
