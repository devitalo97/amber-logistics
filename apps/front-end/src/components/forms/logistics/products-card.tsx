import type { ProductData } from "@repo/core";
import { Plus, Trash2 } from "lucide-react";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { Input } from "#/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "#/components/ui/select";

interface ProductsCardProps {
	handleAddProduct: () => void;
	selectedProducts: any[];
	productsCatalog: ProductData[];
	getPartialCBM: (productId: string, quantity: number) => number;
	handleProductChange: (index: number, productId: string) => void;
	handleQuantityChange: (index: number, quantity: number) => void;
	handleRemoveProduct: (index: number) => void;
}

export function ProductsCard({
	handleAddProduct,
	selectedProducts,
	productsCatalog,
	getPartialCBM,
	handleProductChange,
	handleQuantityChange,
	handleRemoveProduct,
}: ProductsCardProps) {
	return (
		<Card className="border-slate-200 bg-white shadow-sm">
			<CardHeader className="border-b border-slate-200 flex flex-row items-center justify-between">
				<div>
					<CardTitle className="text-base font-semibold text-slate-800">
						Itens do Envio
					</CardTitle>
					<CardDescription>
						Adicione os produtos e quantidades para calcular o volume
						automaticamente
					</CardDescription>
				</div>
				<Button
					variant="outline"
					size="sm"
					onClick={handleAddProduct}
					className="border-slate-200 text-slate-700 hover:bg-slate-50"
				>
					<Plus className="mr-1 h-4 w-4" />
					Adicionar Produto
				</Button>
			</CardHeader>
			<CardContent>
				<div className="space-y-3">
					{selectedProducts.map((item, index) => {
						const product = productsCatalog.find(
							(p) => p.id === item.productId,
						);
						const partialCBM = getPartialCBM(item.productId, item.quantity);

						return (
							<div
								key={item.productId}
								className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/50 p-3"
							>
								{/* Product Select */}
								<div className="flex-1 min-w-0">
									<Select
										value={item.productId}
										onValueChange={(value) => handleProductChange(index, value)}
									>
										<SelectTrigger className="border-slate-200 bg-white">
											<SelectValue placeholder="Selecione um produto" />
										</SelectTrigger>
										<SelectContent>
											{productsCatalog.map((prod) => (
												<SelectItem key={prod.id} value={prod.id}>
													<span className="flex items-center gap-2">
														<span className="font-medium">{prod.name}</span>
														<span className="text-xs text-slate-500">
															({prod.sku})
														</span>
													</span>
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									{product && (
										<div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
											<span>{product.volume_cbm_per_unit} CBM/un</span>
											<span>{product.weight_kg_per_unit} kg/un</span>
										</div>
									)}
								</div>

								{/* Quantity Input */}
								<div className="w-24">
									<Input
										type="number"
										min={0}
										value={item.quantity}
										onChange={(e) =>
											handleQuantityChange(
												index,
												parseInt(e.target.value, 10) || 0, // Fixed radix bug here (from 2 to 10)
											)
										}
										placeholder="Qtd"
										className="border-slate-200 text-center"
									/>
								</div>

								{/* Partial CBM Badge */}
								<div className="w-24 text-right">
									{item.productId && item.quantity > 0 ? (
										<Badge
											variant="outline"
											className="border-slate-200 bg-white text-slate-600"
										>
											{partialCBM.toFixed(2)} CBM
										</Badge>
									) : (
										<span className="text-xs text-slate-400">-</span>
									)}
								</div>

								{/* Delete Button */}
								<Button
									variant="ghost"
									size="icon"
									onClick={() => handleRemoveProduct(index)}
									disabled={selectedProducts.length === 1}
									className="h-8 w-8 text-slate-400 hover:text-red-500 disabled:opacity-50"
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
}
