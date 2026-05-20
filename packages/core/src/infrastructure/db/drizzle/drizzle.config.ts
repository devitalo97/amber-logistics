import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/infrastructure/db/drizzle/schema/*.ts",
	out: "./src/infrastructure/db/drizzle/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
});
