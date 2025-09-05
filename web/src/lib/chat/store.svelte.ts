import type { Category } from "./types";

const DEFAILT_SUBCATEGORIES: Category[] = [
	{
		name: "18+",
		icon: "18+",
	},
	{
		name: "24+",
		icon: "24+",
	},
	{
		name: "35+",
		icon: "35+",
	},
	{
		name: "Κύπρος",
		icon: "&#127464;&#127486;",
	},
];
const SESSION_CHAT_CATEGORY = "chat_category";
const SESSION_CHAT_SUBCATEGORY = "chat_subcategory";

export const CATEGORIES: Category[] = [
	{
		name: "Καφενείο",
		icon: "&#9749;",
		subCategories: [...DEFAILT_SUBCATEGORIES],
	},
	{
		name: "Γνωριμίες",
		icon: "&#128107;&#127995;",
		subCategories: [...DEFAILT_SUBCATEGORIES],
	},
];

export default (() => {
	let category = $state(
		sessionStorage.getItem(SESSION_CHAT_CATEGORY) || CATEGORIES[0].name,
	);

	const selectCategory = (i: number) => {
		const c = CATEGORIES[i].name;
		sessionStorage.setItem(SESSION_CHAT_CATEGORY, c);
		category = c;
	};

	return {
		get category() {
			return category;
		},
		selectCategory,
	};
})();
