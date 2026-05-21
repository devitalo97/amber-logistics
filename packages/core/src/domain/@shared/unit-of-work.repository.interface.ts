export interface IUnitOfWork<Context> {
	transaction<Output>(work: (uow: Context) => Promise<Output>): Promise<Output>;
}
