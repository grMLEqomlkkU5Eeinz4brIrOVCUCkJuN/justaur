import { helpPlugin, versionPlugin } from "@crustjs/plugins";
import pkg from "../package.json";
import { app } from "./app.ts";
import { greetWorld } from "./commands/helloWorld.ts";

await app
	.use(versionPlugin(pkg.version))
	.use(helpPlugin())
	.command(greetWorld)
	.execute();
