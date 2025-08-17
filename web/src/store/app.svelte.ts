import { Games } from "../games";

export default (() => {
	let allGames = $state(
		Object.keys(Games.value).map((n) => ({
			name: n,
			ui: null,
		})) as Game[],
	);
	const activeGames = $derived(
		allGames.filter((g) => g.ui === "room" || g.ui === "lobby"),
	);

	const setGame = (name: Game["name"], ui: Game["ui"]) => {
		allGames = allGames.map((g) => {
			if (g.name === name) {
				if (ui === "room" && g.ui === "lobby") {
					return g;
				} else if (ui === "lobby" && g.ui === "room") {
					return g;
				} else {
					return { ...g, ui };
				}
			} else {
				return g;
			}
		});
	};

	return {
		get allGames() {
			return allGames;
		},
		get activeGames() {
			return activeGames;
		},
		setGame,
	};
})();
