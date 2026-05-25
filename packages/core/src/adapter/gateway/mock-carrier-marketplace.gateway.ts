import type {
	CarrierQuoteInput,
	CarrierQuoteOutput,
	ICarrierMarketplaceGateway,
} from "@/application/gateway/carrier-marketplace.gateway.interface";

export class MockCarrierMarketplaceGateway
	implements ICarrierMarketplaceGateway
{
	private readonly carrierCatalog = {
		sea: [
			{
				id: "maersk",
				name: "Maersk Line",
				base_rate_cbm: 120,
				base_rate_kg: 0.15,
				days: 14,
			},
			{
				id: "cosco",
				name: "COSCO Shipping",
				base_rate_cbm: 105,
				base_rate_kg: 0.12,
				days: 16,
			},
		],
		air: [
			{
				id: "dhl",
				name: "DHL Express",
				base_rate_cbm: 850,
				base_rate_kg: 5.5,
				days: 3,
			},
			{
				id: "fedex-air",
				name: "FedEx International",
				base_rate_cbm: 800,
				base_rate_kg: 5.0,
				days: 4,
			},
		],
		land: [
			{
				id: "union-pacific",
				name: "Union Pacific Railroad",
				base_rate_cbm: 60,
				base_rate_kg: 0.08,
				days: 2,
			},
			{
				id: "fedex-freight",
				name: "FedEx Freight",
				base_rate_cbm: 95,
				base_rate_kg: 0.11,
				days: 1,
			},
			{
				id: "xpo",
				name: "XPO Logistics",
				base_rate_cbm: 75,
				base_rate_kg: 0.09,
				days: 2,
			},
		],
	};

	async quote(input: CarrierQuoteInput): Promise<CarrierQuoteOutput> {
		const options = this.carrierCatalog[input.mode];
		// Seleção determinística primária baseada na origem para variar respostas
		const carrier =
			options[
				input.origin.city?.length
					? input.origin.city.length % options.length
					: 0
			]!;

		// Precificação reativa ao payload: cobra-se o maior valor entre cubagem e peso bruto (peso cubado simplificado)
		const costByVolume = input.volume_cbm * carrier.base_rate_cbm;
		const costByWeight = input.weight_kg * carrier.base_rate_kg;
		const estimatedCost = Math.max(costByVolume, costByWeight) + 250; // + Taxa fixa de emissão

		return {
			carrier_id: carrier.id,
			carrier_name: carrier.name,
			mode: input.mode,
			estimated_freight_cost: Number(estimatedCost.toFixed(2)),
			estimated_transit_days: carrier.days,
		};
	}
}
