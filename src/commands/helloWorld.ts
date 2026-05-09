import { app } from "../app.ts";

export const greetWorld = app
	.sub("H")
	.meta({ description: "Responds back with Hello World!" })
	.run(() => {
		console.log("Hello World!")
	});
