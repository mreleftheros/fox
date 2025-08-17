import { CARDS, type Card, getShuffledCards, LEVELS } from "./data";
// const initState: GameState = {
// 	value: "waiting",
// 	level: 2,
// 	cards: [],
// 	flipped: [],
// 	found: [],
// };

export type GameState = {
	allCards: Card[];
	flippedCards: Card[];
	foundCards: Card[];
	isConfigOpen: boolean;
	isPause: boolean;
};

export default (() => {
	let config: GameConfig = $state({
		status: "idle",
		level: 1,
	});
	let value: GameState = $state({
		allCards: [],
		flippedCards: [],
		foundCards: [],
		isConfigOpen: true,
		isPause: false,
	});

	let timeOut = NaN;

	const level = $derived(LEVELS[config.level]);
	const gridColsClass = $derived(
		level.gridCols === 4
			? "grid-cols-4"
			: level.gridCols === 5
				? "grid-cols-5"
				: "grid-cols-6",
	);
	const isMatch = $derived(
		value.flippedCards.length === 2 &&
			value.flippedCards[0].value === value?.flippedCards[1].value,
	);

	const start = () => {
		config.status = "play";
		value.allCards = getShuffledCards(CARDS, level.pairs);
		value.isConfigOpen = false;
	};

	const end = () => {
		config.status = "idle";
		value.isConfigOpen = true;
	};

	return {
		get config() {
			return config;
		},
		get value() {
			return value;
		},
		get level() {
			return level;
		},
		get gridColsClass() {
			return gridColsClass;
		},
		get isMatch() {
			return isMatch;
		},
		timeOut,
		start,
		end,
	};
})();
