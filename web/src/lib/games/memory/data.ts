export type Level = {
	name: "beginner" | "medium" | "hard";
	pairs: 8 | 10 | 12;
	gridCols: 4 | 5 | 6;
	duration: number;
};

export type Card = {
	id: number;
	value: string;
};

const DURATION = 60 * 1000;

export const LEVELS: Level[] = [
	{
		name: "beginner",
		pairs: 8,
		gridCols: 4,
		duration: DURATION,
	},
	{
		name: "medium",
		pairs: 10,
		gridCols: 5,
		duration: DURATION * 1.5,
	},
	{
		name: "hard",
		pairs: 12,
		gridCols: 6,
		duration: DURATION * 2,
	},
];

export const CARDS = [
	"&#127827;",
	"&#127826;",
	"&#127825;",
	"&#127819;",
	"&#127817;",
	"&#127821;",
	"&#127816;",
	"&#127822;",
	"&#127815;",
	"&#127813;",
	"&#127820;",
	"&#127824;",
	"&#129373;",
	"&#129381;",
	"&#129389;",
	"&#129744;",
	"&#127792;",
	"&#127814;",
	"&#127805;",
	"&#129476;",
	"&#129372;",
	"&#129361;",
	"&#129365;",
	"&#129477;",
	"&#129364;",
	"&#129362;",
	"&#129388;",
	"&#129382;",
	"&#129745;",
	"&#129752;",
];

export const getShuffledCards = (cards: string[], pairs: Level["pairs"]) => {
	const cardCopy = [...cards];
	const shuffled = cardCopy.sort(() => Math.random() - 0.5).slice(0, pairs);

	const allCards = [...shuffled, ...shuffled];
	return allCards
		.sort(() => Math.random() - 0.5)
		.map((c, i) => ({ id: i, value: c }));
};
