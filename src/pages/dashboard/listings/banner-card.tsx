import { Icon } from "@/components/icon";
import { GLOBAL_CONFIG } from "@/global-config";
import { Button } from "@/ui/button";
import { Text, Title } from "@/ui/typography";
import type { CSSProperties } from "react";

export default function BannerCard() {
	const bgStyle: CSSProperties = {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
		opacity: 0.9,
	};

	return (
		<div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg overflow-hidden">
			<div className="p-6 z-2 relative">
				<div className="grid grid-cols-2 gap-4">
					<div className="col-span-2 md:col-span-1">
						<div className="flex flex-col gap-4">
							<Title as="h2" className="text-white">
								Vacant Room Management
							</Title>
							<Text className="text-white/90">
								Manage and showcase your available properties. Track occupancy rates, handle inquiries, and optimize your rental portfolio with {GLOBAL_CONFIG.appName}.
							</Text>

							<div className="flex flex-col sm:flex-row gap-2">
								<Button
									variant="outline"
									className="w-full sm:w-fit bg-white text-blue-600 hover:bg-white/90"
								>
									<Icon icon="mdi:plus" size={20} />
									<span className="ml-2 font-semibold">Add New Listing</span>
								</Button>
								<Button
									variant="outline"
									className="w-full sm:w-fit bg-transparent text-white border-white hover:bg-white/10"
								>
									<Icon icon="mdi:chart-line" size={20} />
									<span className="ml-2 font-semibold">View Analytics</span>
								</Button>
							</div>
						</div>
					</div>

					<div className="hidden md:block col-span-2 md:col-span-1">
						<div className="w-full h-full flex items-center justify-end">
							<div className="text-white/20">
								<Icon icon="solar:home-outline" size={120} />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div style={bgStyle} className="z-1" />
		</div>
	);
} 