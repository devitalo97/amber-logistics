import { Boxes, CheckCircle2, Store, Warehouse, XCircle } from "lucide-react";

export const operationalStatuses = [
	{
		value: "active",
		label: "Active",
		icon: CheckCircle2,
	},
	{
		value: "inactive",
		label: "Inactive",
		icon: XCircle,
	},
];

export const types = [
	{
		label: "Distribution Center",
		value: "distribution_center",
		icon: Boxes,
	},
	{
		label: "Warehouse",
		value: "warehouse",
		icon: Warehouse,
	},
	{
		label: "Retail Store",
		value: "retail_store",
		icon: Store,
	},
];
