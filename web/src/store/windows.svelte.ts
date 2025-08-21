import { Games } from "../games";

export default (() => {
	let allGames = $state(
		Object.keys(Games.value).map((n) => ({
			name: n,
			ui: { value: "lobby", current: "lobby" },
		})) as Game[],
	);
	const openedGames = $derived(allGames.filter((g) => g.ui != null));

	const setGame = (name: Game["name"], ui: GameUi["value"]) => {
		allGames = allGames.map((g) => {
			if (g.name === name) {
				if (ui === "room" && g.ui?.value === "lobby") {
					return g;
				} else if (ui === "lobby" && g.ui?.value === "room") {
					return g;
				} else {
					return { ...g, ui: { value: ui, current: ui } };
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
		get openedGames() {
			return openedGames;
		},
		setGame,
	};
})();
