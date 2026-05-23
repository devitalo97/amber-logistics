import { schema } from "@repo/core";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { db } from "./db";

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
	},
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: {
			user: schema.userTable,
			session: schema.sessionTable,
			account: schema.accountTable,
			verification: schema.verificationTable,
		},
	}),
	plugins: [tanstackStartCookies()],
});
