"use client";

import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Logo } from "../icons/logo";

export function NavLogo() {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton>
					<Logo />
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
