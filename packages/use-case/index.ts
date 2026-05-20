interface IUseCase<Input, Output> {
	execute(input: Input): Output | Promise<Output>;
}

abstract class UseCase<Input, Output> implements IUseCase<Input, Output> {
	abstract execute(input: Input): Output | Promise<Output>;
}

export { type IUseCase, UseCase };
