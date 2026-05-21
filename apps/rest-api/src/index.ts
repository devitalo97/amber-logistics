import { CompositionRoot } from "@repo/core";

const compositionRoot = new CompositionRoot({
	DATABASE_URL: process.env.DATABASE_URL!,
});
const app = compositionRoot.build();

const server = Bun.serve({
	port: 3333,
	routes: {
		"/": async () => {
			await app.brandSiteCreateUseCase.execute({
				brandSite: {} as any,
				waypoint: {} as any,
			});
			return new Response("Hello World!");
		},
	},
});

console.log(`Listening on ${server.url}`);
