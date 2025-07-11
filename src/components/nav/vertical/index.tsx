import { cn } from "@/utils";
import type { NavProps } from "../types";
import { NavGroup } from "./nav-group";
import Dropdown from "@/layouts/dashboard/Dropdown.tsx";

export function NavVertical({ data, className, ...props }: NavProps) {
	return (
		<nav className={cn("flex w-full flex-col gap-1", className)} {...props}>
			<Dropdown options={[
				{
					label:'Tenant',
					value:'tenent',
				},
				{
					label:'Landlord',
					value:'landlord',
				}
			]} />
			{data.map((group, index) => (
				<NavGroup key={group.name || index} name={group.name} items={group.items} />
			))}
		</nav>
	);
}
