export const json = (
	req: Request,
	body: object | null,
	status = 200,
	extra?: object,
) => {
	const res = body === null ? null : JSON.stringify(body);

	return new Response(res, {
		status,
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": req.headers.get("Origin") || "",
			"Access-Control-Allow-Credentials": "true",
			"Access-Control-Max-Age": "86400",
			...extra,
		},
	});
};
