interface ValidatorProvider<Input = unknown> {
	validate(input: Input): void;
}

export type { ValidatorProvider };
