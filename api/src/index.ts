import { DurableObject } from "cloudflare:workers";
import { handleApi } from "./handler";
import ApiError from "./util/error";
import { json } from "./util/response";

const CHAT_STUB_ALL = "ALL";

type WebSocketMetadata = {
	id: string;
};

export class Chat extends DurableObject<Env> {
	sessions: Map<WebSocket, WebSocketMetadata>;
	lastTimestamp: number;

	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);

		this.sessions = new Map();

		for (
			let i = 0, webSockets = this.ctx.getWebSockets();
			i < webSockets.length;
			i += 1
		) {
			this.sessions.set(webSockets[i], {
				...webSockets[i].deserializeAttachment(),
			});
		}
		// SAME AS ABOVE
		// this.ctx.getWebSockets().forEach((ws) => {
		// 	this.sessions.set(ws, { ...ws.deserializeAttachment() });
		// });

		// Sets an application level auto response that does not wake hibernated WebSockets.
		this.ctx.setWebSocketAutoResponse(
			new WebSocketRequestResponsePair("ping", "pong"),
		);
		this.lastTimestamp = 0;
	}

	async fetch(req: Request) {
		const upgradeHeader = req.headers.get("Upgrade");
		if (!upgradeHeader || upgradeHeader !== "websocket") {
			return new Response("expected websocket", {
				status: 426,
			});
		}
		if (req.method !== "GET") {
			return new Response("expected GET method", {
				status: 400,
			});
		}

		const [c, s] = Object.values(new WebSocketPair());
		this.ctx.acceptWebSocket(s);

		const id = crypto.randomUUID();

		s.serializeAttachment({ id });
		this.sessions.set(s, { id });

		return new Response(null, {
			status: 101,
			webSocket: c,
		});
	}

	async webSocketMessage(ws: WebSocket, msg: string) {
		try {
			const ses = this.sessions.get(ws);
			if (!ses) return;
			const data = JSON.parse(msg);
		} catch (e) {
			ws.send(JSON.stringify({ error: (e as Error).stack }));
		}
	}

	async webSocketError(ws: WebSocket, error: any) {
		this.sessions.delete(ws);
		ws.close();
	}

	async webSocketClose(
		ws: WebSocket,
		code: number,
		reason: string,
		wasClean: boolean,
	) {
		// If the client closes the connection, the runtime will invoke the webSocketClose() handler.
		this.sessions.delete(ws);
		ws.close(code, "Durable Object is closing WebSocket");
	}

	broadcast(data: string | object) {
		if (typeof data === "object") {
			data = JSON.stringify(data);
		}

		for (
			let i = 0, sockets = this.ctx.getWebSockets();
			i < sockets.length;
			i += 1
		) {
			sockets[i].send(data);
		}
	}
}

export default {
	async fetch(req, env, ctx): Promise<Response> {
		try {
			console.log(req.method);
			const originWhiteList = ["http://localhost:5173"];
			if (
				req.method === "OPTIONS" &&
				originWhiteList.includes(req.headers.get("Origin") || "")
			) {
				return json(req, null, 204, {
					"Access-Control-Allow-Headers":
						"Content-Type, Accept, X-Requested-with, X-HTTP-Method-Override",
					"Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, HEAD",
				});
			}

			const { pathname } = new URL(req.url);
			const path = pathname.slice(1).split("/");
			if (path[0] === "v1") {
				// handle api
				return handleApi(req, env, ctx, path.slice(1));
			} else if (path[path.length - 1] === "ws") {
				// handle ws
				if (path[0] === "chat") {
					return env.CHAT.getByName(CHAT_STUB_ALL).fetch(req);
				} else if (path[0] === "drawit") {
					//TODO: draw it do
				}
			} else {
				return json(req, { error: "route invalid" }, 400);
			}
		} catch (e) {
			if (e instanceof ApiError) {
				return json(
					req,
					{
						error: e.message,
						...(env.ENV !== "production" && {
							stack: e.stack,
						}),
					},
					e.status,
				);
			} else {
				return json(
					req,
					{
						error: (e as Error).message || e,
						...(env.ENV !== "production" && {
							stack: (e as Error).stack,
						}),
					},
					500,
				);
			}
		}
		return json(req, { error: "bad request" }, 400);
	},
} satisfies ExportedHandler<Env>;
