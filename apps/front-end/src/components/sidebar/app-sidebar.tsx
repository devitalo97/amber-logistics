"use client";

import {
	AtomIcon,
	AudioLinesIcon,
	CheckSquareIcon,
	CompassIcon,
	FactoryIcon,
	FileCheckCornerIcon,
	FileTextIcon,
	GalleryVerticalEndIcon,
	InboxIcon,
	LayersIcon,
	SettingsIcon,
	ShipIcon,
	SparklesIcon,
	SunIcon,
	TerminalIcon,
	TrendingUpIcon,
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
	user: {
		name: "Dom Oliver",
		email: "dom@amber.ai",
		avatar: "/avatars/shadcn.jpg",
	},
	teams: [
		{
			name: "Acme Inc",
			logo: <GalleryVerticalEndIcon />,
			plan: "Enterprise",
		},
		{
			name: "Acme Corp.",
			logo: <AudioLinesIcon />,
			plan: "Startup",
		},
		{
			name: "Evil Corp.",
			logo: <TerminalIcon />,
			plan: "Free",
		},
	],
	navMain: [
		{
			title: "Inbox",
			url: "/inbox",
			icon: <InboxIcon />,
		},
		{
			title: "Ask Amber",
			url: "/ask-amber",
			icon: <SparklesIcon />,
			isActive: true, // Marcado como o item ativo/selecionado na imagem
		},
		{
			title: "Discovery",
			url: "/discovery",
			icon: <CompassIcon />,
		},
		{
			title: "My work",
			url: "/my-work",
			icon: <CheckSquareIcon />,
		},
		{
			title: "Products",
			url: "/products",
			icon: <LayersIcon />,
		},
		{
			title: "Suppliers",
			url: "/suppliers",
			icon: <FactoryIcon />,
		},
		{
			title: "Protos",
			url: "/protos",
			icon: <AtomIcon />,
		},
		{
			title: "RFQs",
			url: "/rfqs",
			icon: <FileTextIcon />,
		},
		{
			title: "Orders",
			url: "/orders",
			icon: <FileCheckCornerIcon />,
		},
		{
			title: "Forecast",
			url: "/forecast",
			icon: <TrendingUpIcon />,
		},
		{
			title: "Shipments",
			url: "/shipments",
			icon: <ShipIcon />,
		},
	],
	navSecondary: [
		{
			name: "Settings",
			url: "#",
			icon: <SettingsIcon />,
		},
		{
			name: "Light mode",
			url: "#",
			icon: <SunIcon />,
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
