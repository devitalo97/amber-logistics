import type { IUnitOfWork } from "@/domain/@shared/unit-of-work.repository.interface";
import type { IBrandSiteRepository } from "@/domain/brand-site/brand-site.repository.interface";
import type { IWaypointRepository } from "@/domain/waypoint/waypoint.repository.interface";

export interface IUnitOfWorkContext {
	brandSiteRepository: IBrandSiteRepository;
	waypointRepository: IWaypointRepository;
}

interface ITransactionClient<TxClient> {
	transaction<Output>(cb: (tx: TxClient) => Promise<Output>): Promise<Output>;
}

export class UnitOfWork<TxClient> implements IUnitOfWork<IUnitOfWorkContext> {
	constructor(
		private readonly db: ITransactionClient<TxClient>,
		private readonly contextFactory: (tx: TxClient) => IUnitOfWorkContext,
	) {}

	async transaction<Output>(
		work: (context: IUnitOfWorkContext) => Promise<Output>,
	): Promise<Output> {
		return await this.db.transaction(async (tx) => {
			const context: IUnitOfWorkContext = this.contextFactory(tx);
			return await work(context);
		});
	}
}
