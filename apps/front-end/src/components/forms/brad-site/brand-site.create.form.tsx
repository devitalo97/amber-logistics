"use client";

import {
	Building2,
	Check,
	ChevronLeft,
	ChevronRight,
	MapPin,
	Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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

const STEPS = [
	{
		id: 1,
		title: "Endereço",
		description: "Informações do waypoint e endereço",
		icon: MapPin,
	},
	{
		id: 2,
		title: "Geolocalização",
		description: "Coordenadas de latitude e longitude",
		icon: Building2,
	},
	{
		id: 3,
		title: "Operações",
		description: "Detalhes operacionais do site",
		icon: Settings,
	},
];

export function BrandSiteForm({ onCoordinatesChange }: BrandSiteFormProps) {
	const {
		handleLatitudeChange,
		handleLongitudeChange,
		isSubmitting,
		handleNext,
		handleBack,
		onSubmit,
		form,
		currentStep,
	} = useBrandSite({ onCoordinatesChange });

	return (
		<div className="flex h-full flex-col">
			{/* Step Indicator */}
			<div className="mb-6">
				<div className="flex items-center justify-between">
					{STEPS.map((step, index) => {
						const Icon = step.icon;
						const isActive = currentStep === step.id;
						const isCompleted = currentStep > step.id;

						return (
							<div key={step.id} className="flex flex-1 items-center">
								<div className="flex flex-col items-center">
									<div
										className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
											isActive
												? "border-primary bg-primary text-primary-foreground"
												: isCompleted
													? "border-primary bg-primary text-primary-foreground"
													: "border-muted-foreground/30 bg-background text-muted-foreground"
										}`}
									>
										{isCompleted ? (
											<Check className="h-5 w-5" />
										) : (
											<Icon className="h-5 w-5" />
										)}
									</div>
									<div className="mt-2 text-center">
										<p
											className={`text-sm font-medium ${
												isActive || isCompleted
													? "text-foreground"
													: "text-muted-foreground"
											}`}
										>
											{step.title}
										</p>
										<p className="hidden text-xs text-muted-foreground sm:block">
											{step.description}
										</p>
									</div>
								</div>
								{index < STEPS.length - 1 && (
									<div
										className={`mx-2 h-0.5 flex-1 transition-colors ${
											currentStep > step.id ? "bg-primary" : "bg-muted"
										}`}
									/>
								)}
							</div>
						);
					})}
				</div>
			</div>

			{/* Form Card */}
			<Card className="flex-1">
				<CardHeader>
					<CardTitle>{STEPS[currentStep - 1].title}</CardTitle>
					<CardDescription>
						{STEPS[currentStep - 1].description}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							{/* Step 1: Waypoint & Address Information */}
							{currentStep === 1 && (
								<div className="space-y-4">
									<FormField
										control={form.control}
										name="waypoint_description"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Descrição do Waypoint</FormLabel>
												<FormControl>
													<Input placeholder="Ex: Sede Principal" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<div className="grid grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name="country_code"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Código do País</FormLabel>
													<FormControl>
														<Input placeholder="BR" maxLength={3} {...field} />
													</FormControl>
													<FormDescription>
														ISO 3166-1 alpha-2/3
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="postal_code"
											render={({ field }) => (
												<FormItem>
													<FormLabel>CEP</FormLabel>
													<FormControl>
														<Input placeholder="01310-100" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<FormField
											control={form.control}
											name="state"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Estado</FormLabel>
													<FormControl>
														<Input placeholder="SP" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="city"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Cidade</FormLabel>
													<FormControl>
														<Input placeholder="São Paulo" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									<FormField
										control={form.control}
										name="address_line_1"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Endereço Linha 1</FormLabel>
												<FormControl>
													<Input placeholder="Av. Paulista, 1000" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="address_line_2"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Endereço Linha 2 (Opcional)</FormLabel>
												<FormControl>
													<Input placeholder="Sala 101, Bloco A" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="time_zone"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Fuso Horário (Opcional)</FormLabel>
												<FormControl>
													<Input placeholder="America/Sao_Paulo" {...field} />
												</FormControl>
												<FormDescription>Formato IANA timezone</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							)}

							{/* Step 2: Geolocation Alignment */}
							{currentStep === 2 && (
								<div className="space-y-4">
									<div className="rounded-lg border bg-muted/50 p-4">
										<p className="text-sm text-muted-foreground">
											Insira as coordenadas geográficas do local. O mapa ao lado
											será atualizado automaticamente para mostrar a
											localização.
										</p>
									</div>

									<FormField
										control={form.control}
										name="latitude"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Latitude</FormLabel>
												<FormControl>
													<Input
														type="number"
														step="any"
														placeholder="-23.5505"
														{...field}
														onChange={(e) => {
															field.onChange(e);
															handleLatitudeChange(e.target.value);
														}}
													/>
												</FormControl>
												<FormDescription>
													Valor entre -90 e 90 (ex: -23.5505 para São Paulo)
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="longitude"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Longitude</FormLabel>
												<FormControl>
													<Input
														type="number"
														step="any"
														placeholder="-46.6333"
														{...field}
														onChange={(e) => {
															field.onChange(e);
															handleLongitudeChange(e.target.value);
														}}
													/>
												</FormControl>
												<FormDescription>
													Valor entre -180 e 180 (ex: -46.6333 para São Paulo)
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							)}

							{/* Step 3: Brand Site Operations */}
							{currentStep === 3 && (
								<div className="space-y-4">
									<FormField
										control={form.control}
										name="brand_type"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Tipo de Unidade</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Selecione o tipo" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{Object.entries(BRAND_TYPE_LABELS).map(
															([value, label]) => (
																<SelectItem key={value} value={value}>
																	{label}
																</SelectItem>
															),
														)}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="storage_capacity_cbm"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Capacidade de Armazenamento (m³)</FormLabel>
												<FormControl>
													<Input
														type="number"
														step="any"
														placeholder="1000"
														{...field}
														value={field.value ?? ""}
													/>
												</FormControl>
												<FormDescription>
													Capacidade em metros cúbicos (opcional)
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="operational_status"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Status Operacional</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Selecione o status" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{Object.entries(OPERATION_STATUS_LABELS).map(
															([value, label]) => (
																<SelectItem key={value} value={value}>
																	{label}
																</SelectItem>
															),
														)}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="brand_site_description"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Descrição do Brand Site</FormLabel>
												<FormControl>
													<Textarea
														placeholder="Descreva as características e funcionalidades deste site..."
														className="min-h-24 resize-none"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							)}

							{/* Navigation Buttons */}
							<div className="flex justify-between pt-4">
								<Button
									type="button"
									variant="outline"
									onClick={handleBack}
									disabled={currentStep === 1}
								>
									<ChevronLeft className="mr-2 h-4 w-4" />
									Voltar
								</Button>

								{currentStep < 3 ? (
									<Button type="button" onClick={handleNext}>
										Próximo
										<ChevronRight className="ml-2 h-4 w-4" />
									</Button>
								) : (
									<Button type="submit" disabled={isSubmitting}>
										{isSubmitting ? "Criando..." : "Criar Brand Site"}
										<Check className="ml-2 h-4 w-4" />
									</Button>
								)}
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
