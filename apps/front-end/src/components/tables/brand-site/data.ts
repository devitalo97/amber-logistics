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
		label: "distribution_center",
		value: "Distribution Center",
		icon: ArrowDown,
	},
	{
		label: "warehouse",
		value: "Warehouse",
		icon: ArrowRight,
	},
	{
		label: "retail_store",
		value: "Retail Store",
		icon: ArrowUp,
	},
];
