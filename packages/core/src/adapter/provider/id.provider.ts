import { randomUUIDv7 } from "bun";
import type { IIdProvider } from "@/application/provider/uuid-provider.interface";

export class IdProvider implements IIdProvider {
	generate(): string {
		return randomUUIDv7();
	}
}
