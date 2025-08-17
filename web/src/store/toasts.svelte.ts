export default (() => {
	const value: Toast[] = $state([]);
	const id = $derived(
		value.length > 0 ? Math.max(...value.map((t) => t.id)) + 1 : 0,
	);

	const set = (message: Toast["message"], kind: Toast["kind"]) => {
		value.push({ id, kind, message });
	};

	const remove = (id: Toast["id"]) => {
		const i = value.findIndex((t) => t.id === id);
		value.splice(i, 1);
	};

	return {
		get value() {
			return value;
		},
		set,
		remove,
	};
})();
