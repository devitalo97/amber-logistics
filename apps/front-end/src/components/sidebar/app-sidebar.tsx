"use client";

import {
	Atom,
	CheckSquare,
	Compass,
	Factory,
	FileCheckCorner,
	FileText,
	Inbox,
	Layers,
	Package,
	Settings,
	Ship,
	Sparkles,
	Sun,
	TrendingUp,
} from "lucide-react";
import * as React from "react";
import { NavLogo } from "#/components/sidebar/nav-logo";
import { NavMain } from "#/components/sidebar/nav-main";
import { NavSecondary } from "#/components/sidebar/nav-secundary";
import { NavUser } from "#/components/sidebar/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";

const data = {
	navMain: [
		{
			title: "Inbox",
			url: "/inbox",
			icon: Inbox,
		},
		{
			title: "Ask Amber",
			url: "/ask-amber",
			icon: Sparkles,
			isActive: true,
		},
		{
			title: "Discovery",
			url: "/discovery",
			icon: Compass,
		},
		{
			title: "My work",
			url: "/my-work",
			icon: CheckSquare,
		},
		{
			title: "Products",
			url: "/products",
			icon: Layers,
		},
		{
			title: "Suppliers",
			url: "/suppliers",
			icon: Factory,
		},
		{
			title: "Protos",
			url: "/protos",
			icon: Atom,
		},
		{
			title: "RFQs",
			url: "/rfqs",
			icon: FileText,
		},
		{
			title: "Orders",
			url: "/orders",
			icon: FileCheckCorner,
		},
		{
			title: "Forecast",
			url: "/forecast",
			icon: TrendingUp,
		},
		{
			title: "Shipments",
			url: "/shipments",
			icon: Ship,
		},
		{
			title: "Logistics",
			url: "/logistics",
			icon: Package,
			items: [
				{
					title: "Dashboard",
					url: "/logistics/dashboard",
				},
				{
					title: "Brand Sites",
					url: "/logistics/brand-sites",
				},
				{
					title: "Simulator",
					url: "/logistics/simulator",
				},
			],
		},
	],
	navSecondary: [
		{
			name: "Settings",
			url: "#",
			icon: Settings,
		},
		{
			name: "Light mode",
			url: "#",
			icon: Sun,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<NavLogo />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
