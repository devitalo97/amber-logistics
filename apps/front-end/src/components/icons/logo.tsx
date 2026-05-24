import { AmberIcon } from "./amber";

export function Logo() {
	return (
		<div className="flex items-center gap-2 select-none">
			<AmberIcon className="w-6 h-6 text-current flex-shrink-0" />

			<img
				src="https://framerusercontent.com/images/fXnfpkPjHWiRIOBJHOPbWG5N3Q.png"
				alt="Logo Text"
				className="h-5 w-auto object-contain dark:brightness-200"
				decoding="auto"
			/>
		</div>
	);
}
