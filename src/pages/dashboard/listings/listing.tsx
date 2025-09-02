import { Chart, useChart } from "@/components/chart";
import Icon from "@/components/icon/icon";
import { GLOBAL_CONFIG } from "@/global-config";
import { Avatar, AvatarImage } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";
import { Progress } from "@/ui/progress";
import { Text, Title } from "@/ui/typography";
import { rgbAlpha } from "@/utils/theme";
import { useState } from "react";
import BannerCard from "./banner-card";
import RoomListingCard from "./room-listing-card";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/ui/collapsible.tsx";
import { cn } from "@/utils";
import {useQuery} from "@tanstack/react-query";
import demoService from "@/api/services/demoService.ts";
import Dropdown from "@/layouts/dashboard/Dropdown.tsx";
import {useNavigate, useParams} from "react-router";
import {Separator} from "@/ui/separator.tsx";

interface Room {
	id: string;
	title: string;
	location: string;
	price: number;
	size: number;
	bedrooms: number;
	bathrooms: number;
	amenities: string[];
	image: string;
	status: string;
	rating: number;
	reviews: number;
	description: string;
}

export default function RoomListing() {
	const { id } = useParams<{ id: string }>();
	const [activeTab, setActiveTab] = useState("All Rooms");
	const [open, setOpen] = useState(false)
	const navigate = useNavigate();


	const recentInquiries = useQuery({
		queryKey: ['recent-inquiries', { activeTab }],
		queryFn: ({ queryKey }) => {
			const [, variables] = queryKey;
			console.log('🔧 Recent Inquiries Query variables:', variables);
			return demoService.mockRecentInq();
		},
	});

	const quickStatsQuery = useQuery({
		queryKey: ['quick-stats'],
		queryFn: () => demoService.mockQuickStats(),
	});

	const monthlyOccupancyQuery = useQuery({
		queryKey: ['monthly-occupancy'],
		queryFn: () => demoService.mockMonthlyOccupancy(),
	});

	const propertyTypesQuery = useQuery({
		queryKey: ['property-types'],
		queryFn: () => demoService.mockPropertyTypes(),
	});

	const occupancyDataQuery = useQuery({
		queryKey: ['occupancy-data'],
		queryFn: () => demoService.mockOccupancyData(),
	});


	const chartOptions = useChart({
		xaxis: { categories: monthlyOccupancyQuery?.data?.categories || [] },
		chart: { toolbar: { show: false } },
		grid: { show: false },
		stroke: { curve: "smooth" },
		dataLabels: { enabled: false },
		yaxis: { show: false },
		legend: { show: false },
	});

	const donutOptions = useChart({
		labels: occupancyDataQuery?.data?.labels || [],
		legend: { show: false },
		dataLabels: { enabled: false },
		plotOptions: { pie: { donut: { size: "70%" } } },
	});

	// Create sparkline chart options for each color
	const blueSparklineOptions = useChart({
		chart: { sparkline: { enabled: true } },
		colors: ["#3b82f6"],
		grid: { show: false },
		yaxis: { show: false },
		tooltip: { enabled: false },
	});

	const orangeSparklineOptions = useChart({
		chart: { sparkline: { enabled: true } },
		colors: ["#f59e42"],
		grid: { show: false },
		yaxis: { show: false },
		tooltip: { enabled: false },
	});

	const greenSparklineOptions = useChart({
		chart: { sparkline: { enabled: true } },
		colors: ["#10b981"],
		grid: { show: false },
		yaxis: { show: false },
		tooltip: { enabled: false },
	});

	const redSparklineOptions = useChart({
		chart: { sparkline: { enabled: true } },
		colors: ["#ef4444"],
		grid: { show: false },
		yaxis: { show: false },
		tooltip: { enabled: false },
	});

	// Helper function to get the right sparkline options based on color
	const getSparklineOptions = (color: string) => {
		switch (color) {
			case "#3b82f6": return blueSparklineOptions;
			case "#f59e42": return orangeSparklineOptions;
			case "#10b981": return greenSparklineOptions;
			case "#ef4444": return redSparklineOptions;
			default: return blueSparklineOptions;
		}
	};


	const { data: listingsData } = useQuery({
		queryKey: ['listings'],
		queryFn: () => demoService.mockMyListings(),
	});

	// Find the specific listing by ID
	const room = listingsData?.find((listing: Room) => listing.id === id);

	if (!room) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
				<Icon icon="mdi:home-off" size={64} className="text-muted-foreground" />
				<Title as="h2" className="text-xl font-semibold">
					Listing Not Found
				</Title>
				<Text variant="body2" className="text-muted-foreground">
					The listing you're looking for doesn't exist.
				</Text>
				<Button onClick={() => navigate("/listings")}>
					Back to Listings
				</Button>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4 w-full">
			<div className="gap-3">
				<Button
					variant="outline"
					size="sm"
					onClick={() => navigate("/listings")}
					className="flex items-center gap-2"
				>
					<Icon icon="mdi:arrow-left" size={16} />
					Back to Listings
				</Button>

				<br />
				<div>
					<Title as="h1" className="text-2xl font-bold">
						{room.title}
					</Title>
					<Text variant="body2" className="text-muted-foreground">
						{room.location}
					</Text>
				</div>
			</div>

			<Collapsible open={open} onOpenChange={()=> setOpen(!open)}>
				<CollapsibleTrigger asChild>
					<Button
						variant="outline"
						className="w-full justify-between items-center p-4 h-auto hover:bg-muted/50 transition-colors"
					>
						<div className="flex items-center gap-3">
							<div className="rounded-lg p-2 bg-blue-50 dark:bg-blue-950/20">
								<Icon icon="solar:chart-outline" size={20} className="text-blue-600 dark:text-blue-400" />
							</div>
							<div className="text-left">
								<Text variant="body1" className="font-semibold">
									Statistics Dashboard
								</Text>
								<br />
								<Text variant="body2" className="text-muted-foreground">
									View detailed analytics and metrics
								</Text>

							</div>
						</div>
						<Icon
							icon="lucide:chevron-down"
							className={cn(
								"h-4 w-4 text-muted-foreground transition-transform duration-200",
								open && "rotate-180"
							)}
						/>
					</Button>
				</CollapsibleTrigger>
				{quickStatsQuery?.data && <CollapsibleContent>
					<div className="mt-4 space-y-4">
						{/* Quick Stats Cards */}
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
							{quickStatsQuery?.data?.map((stat) => {
								console.log('boss', stat)
								return (
									<Card key={stat.label} className="flex flex-col justify-between h-full">
										<CardContent className="flex flex-col gap-2 p-4">
											<div className="flex items-center gap-2">
												<div className="rounded-lg p-2"
													 style={{background: rgbAlpha(stat.color, 0.1)}}>
													<Icon icon={stat.icon} size={24} color={stat.color}/>
												</div>
												<Text variant="body2" className="font-semibold">
													{stat.label}
												</Text>
											</div>
											<div className="flex items-center gap-2 mt-2">
												<Title as="h3" className="text-2xl font-bold">
													{stat.value}
												</Title>
												<span
													className={`text-xs flex items-center gap-1 font-bold ${stat.percent > 0 ? "text-green-500" : stat.percent < 0 ? "text-red-500" : ""}`}
												>
									{stat.percent > 0 ? (
										<Icon icon="mdi:arrow-up" size={16}/>
									) : stat.percent < 0 ? (
										<Icon icon="mdi:arrow-down" size={16}/>
									) : null}
													{stat.percent !== 0 ? `${Math.abs(stat.percent)}%` : "New"}
								</span>
											</div>
											<div className="w-full h-10 mt-2">
												<Chart
													type="bar"
													height={40}
													options={getSparklineOptions(stat.color)}
													series={[{data: stat.chart}]}
												/>
											</div>
										</CardContent>
									</Card>
								)})}
						</div>

						{/* Monthly Occupancy + Property Types */}
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
							<Card className="lg:col-span-2">
								<CardContent className="p-6">
									<div className="flex items-center justify-between mb-2">
										<Text variant="body2" className="font-semibold">
											Monthly Occupancy Rate
										</Text>
										<span className="flex items-center gap-1 text-green-500 font-bold text-sm">
									<Icon icon="mdi:arrow-up" size={16}/>
											{monthlyOccupancyQuery?.data?.percent}%
								</span>
									</div>
									<Chart type="area" height={220} options={chartOptions}
										   series={monthlyOccupancyQuery?.data?.series}/>
								</CardContent>
							</Card>
							<Card className="flex flex-col gap-4 p-6">
								<Text variant="body2" className="font-semibold mb-2">
									Property Types - {GLOBAL_CONFIG.appName}
								</Text>
								<div className="flex items-center justify-between mb-2">
									<Text variant="body2">Total Properties</Text>
									<span className="text-xs font-bold text-blue-500">30</span>
								</div>
								<Progress value={85}/>
								<ul className="flex flex-col gap-2 mt-2 mb-4">
									{propertyTypesQuery?.data?.map((type) => (
										<li key={type.label} className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<span className="inline-block w-2 h-2 rounded-full"
													  style={{background: type.color}}/>
												<Text variant="body2">{type.label}</Text>
											</div>
											<span className="text-xs font-bold">{type.count}</span>
										</li>
									))}
								</ul>
								<Button className="w-full mt-auto" size="sm">
									<Icon icon="mdi:plus" size={18}/> Add Property
								</Button>
							</Card>
						</div>
					</div>
				</CollapsibleContent>}
			</Collapsible>

			{/* Room Listings */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				<Card className="lg:col-span-2 flex flex-col p-6">


					{/* Room Grid/List View */}
					<div className={`grid gap-4 grid-cols-1 md:grid-cols-2`}>
					hhh
					</div>

				</Card>

				{/* Recent Inquiries + Occupancy Chart */}
				<div className="flex flex-col gap-4">
					<Card className="flex flex-col p-6">
						<Text variant="body2" className="font-semibold mb-4">
							Recent Inquiries
						</Text>
						<div className="flex-1 overflow-y-auto max-h-64">
							{recentInquiries?.data?.map((inquiry) => (
								<div key={inquiry.email} className="flex items-center gap-3 py-2 border-b last:border-0">
									<Avatar className="w-8 h-8">
										<AvatarImage src={`https://ui-avatars.com/api/?name=${inquiry.name}&background=random`} />
									</Avatar>
									<div className="flex-1 min-w-0">
										<div className="font-semibold text-sm">{inquiry.name}</div>
										<div className="text-xs text-muted-foreground">{inquiry.room} • {inquiry.time}</div>
									</div>
									<span className={`text-xs px-2 py-1 rounded-full ${
										inquiry.status === "approved" ? "bg-green-100 text-green-800" :
											inquiry.status === "rejected" ? "bg-red-100 text-red-800" :
												"bg-yellow-100 text-yellow-800"
									}`}>
										{inquiry.status}
									</span>
								</div>
							))}
						</div>
					</Card>

					<Card className="flex flex-col p-6">
						<Text variant="body2" className="font-semibold mb-2">
							Property Occupancy
						</Text>
						<div className="flex-1 flex flex-col items-center justify-center">
							{occupancyDataQuery?.data?.series && <Chart type="donut" height={180} options={donutOptions}
																		series={occupancyDataQuery?.data?.series}/>}
							<div className="w-full mt-4">
								{occupancyDataQuery?.data?.details.map((item) => (
									<div key={item.label} className="flex items-center justify-between mb-2">
										<div className="flex items-center gap-2">
											<span
												className="inline-block w-3 h-3 rounded-full"
												style={{ background: item.color }}
											/>
											<Text variant="body2">{item.label}</Text>
										</div>
										<span className="font-bold">{item.value}</span>
									</div>
								))}
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
} 