import type { ITimestampProvider } from "@/application/provider/timestamp-provider.interface";

export class TimestampProvider implements ITimestampProvider {
	generate(): number {
		return Date.now();
	}
}
