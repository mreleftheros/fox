type Coords = {
	x: number;
	y: number;
};

export default (() => {
	let initCoords: Coords | null = null;
	let isDragging = $state(false);

	const onPointerDown = (e: PointerEvent, el: HTMLElement) => {
		if (isDragging) {
			return;
		}
		isDragging = true;

		const target = e.target as HTMLElement;
		const rect = el.getBoundingClientRect();
		initCoords = {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		};

		const onPointerMove = (e: PointerEvent) => {
			if (!initCoords) {
				return;
			}

			let shiftX = e.pageX - initCoords.x;
			let shiftY = e.pageY - initCoords.y;

			if (shiftX < 0) {
				shiftX = 0;
			} else if (shiftX + rect.width > window.innerWidth) {
				shiftX = window.innerWidth - rect.width;
			}

			if (shiftY < 0) {
				shiftY = 0;
			} else if (shiftY + rect.height > window.innerHeight) {
				shiftY = window.innerHeight - rect.height;
			}

			el.style.left = shiftX + "px";
			el.style.top = shiftY + "px";
		};

		document.documentElement.addEventListener("pointermove", onPointerMove);

		target.onpointerup = () => {
			initCoords = null;
			document.documentElement.removeEventListener(
				"pointermove",
				onPointerMove,
			);
			document.body.style.userSelect = "auto";
			isDragging = false;
			target.onpointerup = null;
		};

		document.body.style.userSelect = "none";
	};

	return {
		onPointerDown,
	};
})();
