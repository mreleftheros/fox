import { PUBLIC_API_HOSTNAME } from "$env/static/public";

const CHAT_WS_URL = `ws://${PUBLIC_API_HOSTNAME}/chat/ws`;

export default (() => {
	let wsChat: WebSocket | null = null;
	let isLoading = $state(false);
	let error = $state("");

	const connectChatWs = async () => {
		try {
			isLoading = true;
			wsChat = new WebSocket(CHAT_WS_URL);
			return new Promise((res) => {
				const i = setInterval(() => {
					if (wsChat?.readyState === 1) {
						clearInterval(i);
						res(wsChat);
					}
				}, 10);
			});
		} catch (e) {
			console.error(e);
			error = (e as Error).message;
		} finally {
			isLoading = false;
		}
	};

	const closeChatWs = () => {
		wsChat?.close();
		wsChat = null;
	};

	return {
		wsChat,
		get isLoading() {
			return isLoading;
		},
		get error() {
			return error;
		},
		connectChatWs,
		closeChatWs,
	};
})();
