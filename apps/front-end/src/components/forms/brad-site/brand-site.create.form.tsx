"use client";

import { Button } from "#/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
	BRAND_TYPE_LABELS,
	OPERATION_STATUS_LABELS,
} from "@/types/brand-site.types";
import {
	type BrandSiteFormProps,
	useBrandSite,
} from "./use-brand-site.create.form";

const MAX_DESCRIPTION_LENGTH = 1000;

export function BrandSiteForm({ handlePointChange }: BrandSiteFormProps) {
	const {
		handleLatitudeChange,
		handleLongitudeChange,
		descriptionLength,
		onSubmit,
		onCancel,
		form,
		isSubmitting,
	} = useBrandSite({ handlePointChange });

	return (
		<div className="flex h-full flex-col">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<div className="flex items-start justify-between pb-6">
						<div>
							<h1 className="text-lg font-semibold text-foreground">
								Criar Brand Site
							</h1>
							<p className="text-sm text-muted-foreground">
								Crie um novo Brand Site com informações de localização e
								operações.
							</p>
						</div>
						<div className="flex items-center gap-3">
							<Button type="button" variant="outline" onClick={onCancel}>
								Cancelar
							</Button>
							<Button type="submit" disabled={isSubmitting}>
								{isSubmitting ? "Criando..." : "Criar Brand Site"}
							</Button>
						</div>
					</div>
					<div className="space-y-8 divide-y divide-border border-border pb-6 sm:space-y-0 sm:pb-0">
						{/* Section: Basic Information */}

						{/* Waypoint Description */}
						<FormField
							control={form.control}
							name="waypoint_description"
							render={({ field }) => (
								<FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 space-y-0">
									<FormLabel className="text-sm font-medium text-foreground sm:pt-1.5">
										Nome do Site *
									</FormLabel>
									<div className="mt-2 sm:col-span-2 sm:mt-0">
										<FormControl>
											<Input
												{...field}
												placeholder="Ex: Centro de Distribuição SP"
												className="block w-full max-w-md border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
											/>
										</FormControl>
										<FormMessage className="mt-1 text-sm text-destructive" />
									</div>
								</FormItem>
							)}
						/>

						{/* Brand Type */}
						<FormField
							control={form.control}
							name="brand_type"
							render={({ field }) => (
								<FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 space-y-0">
									<FormLabel className="text-sm font-medium text-foreground sm:pt-1.5">
										Tipo de Unidade *
									</FormLabel>
									<div className="mt-2 sm:col-span-2 sm:mt-0">
										<Select
											onValueChange={field.onChange}
											value={field.value || ""}
										>
											<FormControl>
												<SelectTrigger className="w-full max-w-xs border-input bg-background text-foreground focus:ring-ring">
													<SelectValue placeholder="Selecione o tipo" />
												</SelectTrigger>
											</FormControl>
											<SelectContent className="border-border bg-popover text-popover-foreground">
												{Object.entries(BRAND_TYPE_LABELS).map(
													([value, label]) => (
														<SelectItem
															key={value}
															value={value}
															className="focus:bg-accent focus:text-accent-foreground"
														>
															{label}
														</SelectItem>
													),
												)}
											</SelectContent>
										</Select>
										<FormMessage className="mt-1 text-sm text-destructive" />
									</div>
								</FormItem>
							)}
						/>

						{/* Operational Status */}
						<FormField
							control={form.control}
							name="operational_status"
							render={({ field }) => (
								<FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 space-y-0">
									<FormLabel className="text-sm font-medium text-foreground sm:pt-1.5">
										Status Operacional *
									</FormLabel>
									<div className="mt-2 sm:col-span-2 sm:mt-0">
										<Select
											onValueChange={field.onChange}
											value={field.value || ""}
										>
											<FormControl>
												<SelectTrigger className="w-full max-w-xs border-input bg-background text-foreground focus:ring-ring">
													<SelectValue placeholder="Selecione o status" />
												</SelectTrigger>
											</FormControl>
											<SelectContent className="border-border bg-popover text-popover-foreground">
												{Object.entries(OPERATION_STATUS_LABELS).map(
													([value, label]) => (
														<SelectItem
															key={value}
															value={value}
															className="focus:bg-accent focus:text-accent-foreground"
														>
															{label}
														</SelectItem>
													),
												)}
											</SelectContent>
										</Select>
										<FormMessage className="mt-1 text-sm text-destructive" />
									</div>
								</FormItem>
							)}
						/>

						{/* Description */}
						<FormField
							control={form.control}
							name="brand_site_description"
							render={({ field }) => (
								<FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 space-y-0">
									<FormLabel className="text-sm font-medium text-foreground sm:pt-1.5">
										Descrição *
									</FormLabel>
									<div className="mt-2 sm:col-span-2 sm:mt-0">
										<FormControl>
											<Textarea
												{...field}
												rows={3}
												maxLength={MAX_DESCRIPTION_LENGTH}
												placeholder="Descreva as características e funcionalidades deste site..."
												className="block w-full max-w-2xl border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
											/>
										</FormControl>
										<FormDescription className="mt-3 text-sm text-muted-foreground">
											{MAX_DESCRIPTION_LENGTH - descriptionLength} caracteres
											restantes
										</FormDescription>
										<FormMessage className="mt-1 text-sm text-destructive" />
									</div>
								</FormItem>
							)}
						/>

						{/* Section: Address Information */}

						{/* Country Code */}
						<FormField
							control={form.control}
							name="country_code"
							render={({ field }) => (
								<FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 space-y-0">
									<FormLabel className="text-sm font-medium text-foreground sm:pt-1.5">
										País *
									</FormLabel>
									<div className="mt-2 sm:col-span-2 sm:mt-0">
										<FormControl>
											<Input
												{...field}
												maxLength={3}
												placeholder="BR"
												className="block w-full max-w-xs border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
											/>
										</FormControl>
										<FormMessage className="mt-1 text-sm text-destructive" />
									</div>
								</FormItem>
							)}
						/>

						{/* Address Line 1 */}
						<FormField
							control={form.control}
							name="address_line_1"
							render={({ field }) => (
								<FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 space-y-0">
									<FormLabel className="text-sm font-medium text-foreground sm:pt-1.5">
										Endereço *
									</FormLabel>
									<div className="mt-2 sm:col-span-2 sm:mt-0">
										<FormControl>
											<Input
												{...field}
												placeholder="Av. Paulista, 1000"
												className="block w-full max-w-xl border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
											/>
										</FormControl>
										<FormMessage className="mt-1 text-sm text-destructive" />
									</div>
								</FormItem>
							)}
						/>

						{/* Address Line 2 */}
						<FormField
							control={form.control}
							name="address_line_2"
							render={({ field }) => (
								<FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 space-y-0">
									<FormLabel className="text-sm font-medium text-foreground sm:pt-1.5">
										Complemento
									</FormLabel>
									<div className="mt-2 sm:col-span-2 sm:mt-0">
										<FormControl>
											<Input
												{...field}
												placeholder="Sala 101, Bloco A"
												className="block w-full max-w-xl border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
											/>
										</FormControl>
										<FormMessage className="mt-1 text-sm text-destructive" />
									</div>
								</FormItem>
							)}
						/>

						{/* City */}
						<FormField
							control={form.control}
							name="city"
							render={({ field }) => (
								<FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 space-y-0">
									<FormLabel className="text-sm font-medium text-foreground sm:pt-1.5">
										Cidade *
									</FormLabel>
									<div className="mt-2 sm:col-span-2 sm:mt-0">
										<FormControl>
											<Input
												{...field}
												placeholder="São Paulo"
												className="block w-full max-w-xs border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
											/>
										</FormControl>
										<FormMessage className="mt-1 text-sm text-destructive" />
									</div>
								</FormItem>
							)}
						/>

						{/* State */}
						<FormField
							control={form.control}
							name="state"
							render={({ field }) => (
								<FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 space-y-0">
									<FormLabel className="text-sm font-medium text-foreground sm:pt-1.5">
										Estado *
									</FormLabel>
									<div className="mt-2 sm:col-span-2 sm:mt-0">
										<FormControl>
											<Input
												{...field}
												placeholder="SP"
												className="block w-full max-w-xs border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
											/>
										</FormControl>
										<FormMessage className="mt-1 text-sm text-destructive" />
									</div>
								</FormItem>
							)}
						/>

						{/* Postal Code */}
						<FormField
							control={form.control}
							name="postal_code"
							render={({ field }) => (
								<FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 space-y-0">
									<FormLabel className="text-sm font-medium text-foreground sm:pt-1.5">
										CEP *
									</FormLabel>
									<div className="mt-2 sm:col-span-2 sm:mt-0">
										<FormControl>
											<Input
												{...field}
												placeholder="01310-100"
												className="block w-full max-w-xs border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
											/>
										</FormControl>
										<FormMessage className="mt-1 text-sm text-destructive" />
									</div>
								</FormItem>
							)}
						/>

						{/* Timezone */}
						<FormField
							control={form.control}
							name="time_zone"
							render={({ field }) => (
								<FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 space-y-0">
									<FormLabel className="text-sm font-medium text-foreground sm:pt-1.5">
										Fuso Horário
									</FormLabel>
									<div className="mt-2 sm:col-span-2 sm:mt-0">
										<FormControl>
											<Input
												{...field}
												placeholder="America/Sao_Paulo"
												className="block w-full max-w-md border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
											/>
										</FormControl>
										<FormMessage className="mt-1 text-sm text-destructive" />
									</div>
								</FormItem>
							)}
						/>

						{/* Latitude */}
						<FormField
							control={form.control}
							name="latitude"
							render={({ field }) => (
								<FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 space-y-0">
									<FormLabel className="text-sm font-medium text-foreground sm:pt-1.5">
										Latitude *
									</FormLabel>
									<div className="mt-2 sm:col-span-2 sm:mt-0">
										<FormControl>
											<Input
												type="number"
												step="any"
												placeholder="-23.5505"
												value={field.value ?? ""}
												onChange={(e) => {
													field.onChange(e);
													handleLatitudeChange(e.target.value);
												}}
												className="block w-full max-w-xs border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
											/>
										</FormControl>
										<FormDescription className="mt-3 text-sm text-muted-foreground">
											Valor entre -90 e 90.
										</FormDescription>
										<FormMessage className="mt-1 text-sm text-destructive" />
									</div>
								</FormItem>
							)}
						/>

						{/* Longitude */}
						<FormField
							control={form.control}
							name="longitude"
							render={({ field }) => (
								<FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 space-y-0">
									<FormLabel className="text-sm font-medium text-foreground sm:pt-1.5">
										Longitude *
									</FormLabel>
									<div className="mt-2 sm:col-span-2 sm:mt-0">
										<FormControl>
											<Input
												type="number"
												step="any"
												placeholder="-46.6333"
												value={field.value ?? ""}
												onChange={(e) => {
													field.onChange(e);
													handleLongitudeChange(e.target.value);
												}}
												className="block w-full max-w-xs border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
											/>
										</FormControl>
										<FormDescription className="mt-3 text-sm text-muted-foreground">
											Valor entre -180 e 180.
										</FormDescription>
										<FormMessage className="mt-1 text-sm text-destructive" />
									</div>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="storage_capacity_cbm"
							render={({ field }) => (
								<FormItem className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 space-y-0">
									<FormLabel className="text-sm font-medium text-foreground sm:pt-1.5">
										Capacidade de Armazenamento
									</FormLabel>
									<div className="mt-2 sm:col-span-2 sm:mt-0">
										<div className="relative flex items-center max-w-md">
											<FormControl>
												<Input
													type="number"
													step="any"
													placeholder="1000"
													value={field.value ?? ""}
													onChange={field.onChange}
													className="block w-full border-input bg-background pr-12 text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
												/>
											</FormControl>
											<div className="absolute right-3 pointer-events-none select-none text-sm text-muted-foreground">
												m³
											</div>
										</div>
										<FormDescription className="mt-3 text-sm text-muted-foreground">
											Capacidade em metros cúbicos (opcional).
										</FormDescription>
										<FormMessage className="mt-1 text-sm text-destructive" />
									</div>
								</FormItem>
							)}
						/>
					</div>
				</form>
			</Form>
		</div>
	);
}
