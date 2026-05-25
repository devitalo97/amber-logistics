import {
	ArrowDown,
	ArrowRight,
	ArrowUp,
	Circle,
	HelpCircle,
} from "lucide-react";

export const operationalStatuses = [
	{
		value: "active",
		label: "Active",
		icon: HelpCircle,
	},
	{
		value: "inactive",
		label: "Inactive",
		icon: Circle,
	},
];

export const types = [
	{
		label: "Distribution Center",
		value: "distribution_center",
		icon: ArrowDown,
	},
	{
		label: "Warehouse",
		value: "warehouse",
		icon: ArrowRight,
	},
	{
		label: "Retail Store",
		value: "retail_store",
		icon: ArrowUp,
	},
];
