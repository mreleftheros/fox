import { resources_get } from "../service/api/resources.svelte";

export default (() => {
	let value = $state<Resources | null>(null);
	let isLoading = $state(false);
	let error = $state("");

	const reset = () => {
		value = null;
		isLoading = false;
		error = "";
	};

	const getAll = async () => {
		const { error: err, data } = await resources_get();
		if (err) {
			error = err;
		} else if (data) {
			value = data;
		}
	};

	return {
		get value() {
			return value;
		},
		get isLoading() {
			return isLoading;
		},
		get error() {
			return error;
		},
		reset,
		getAll,
	};
})();
