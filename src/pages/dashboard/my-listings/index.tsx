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
import RoomFilterPanel from "./room-filter-panel";

// Mock data for vacant rooms
const vacantRooms = [
	{
		id: "RM001",
		title: "Luxury Studio Apartment",
		location: "Downtown District",
		price: 1200,
		size: 450,
		bedrooms: 1,
		bathrooms: 1,
		amenities: ["WiFi", "Gym", "Pool", "Parking"],
		image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
		status: "available",
		rating: 4.8,
		reviews: 24,
		description: "Modern studio apartment with city views, fully furnished with premium amenities.",
	},
	{
		id: "RM002",
		title: "2BR Family Apartment",
		location: "Suburban Area",
		price: 1800,
		size: 750,
		bedrooms: 2,
		bathrooms: 2,
		amenities: ["WiFi", "Garden", "Playground", "Security"],
		image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop",
		status: "available",
		rating: 4.6,
		reviews: 18,
		description: "Spacious family apartment with garden access and child-friendly facilities.",
	},
	{
		id: "RM003",
		title: "Premium 3BR Penthouse",
		location: "City Center",
		price: 3200,
		size: 1200,
		bedrooms: 3,
		bathrooms: 3,
		amenities: ["WiFi", "Gym", "Pool", "Concierge", "Rooftop"],
		image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop",
		status: "available",
		rating: 4.9,
		reviews: 32,
		description: "Luxury penthouse with panoramic city views and premium concierge services.",
	},
	{
		id: "RM004",
		title: "Cozy 1BR Loft",
		location: "Arts District",
		price: 950,
		size: 380,
		bedrooms: 1,
		bathrooms: 1,
		amenities: ["WiFi", "Art Studio", "Bike Storage"],
		image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
		status: "available",
		rating: 4.4,
		reviews: 15,
		description: "Charming loft space perfect for artists and creatives in the vibrant arts district.",
	},
	{
		id: "RM005",
		title: "Modern 2BR Townhouse",
		location: "Residential Zone",
		price: 2100,
		size: 850,
		bedrooms: 2,
		bathrooms: 2,
		amenities: ["WiFi", "Garden", "Garage", "Security"],
		image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=400&h=300&fit=crop",
		status: "available",
		rating: 4.7,
		reviews: 28,
		description: "Contemporary townhouse with private garden and attached garage.",
	},
	{
		id: "RM006",
		title: "Executive 1BR Suite",
		location: "Business District",
		price: 1500,
		size: 520,
		bedrooms: 1,
		bathrooms: 1,
		amenities: ["WiFi", "Business Center", "Gym", "Restaurant"],
		image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
		status: "available",
		rating: 4.5,
		reviews: 22,
		description: "Professional suite designed for business travelers and executives.",
	},
];

const quickStats = [
	{
		icon: "solar:home-outline",
		label: "Total Vacant Rooms",
		value: "24",
		percent: 12.5,
		color: "#3b82f6",
		chart: [12, 18, 14, 16, 12, 10, 14, 18, 16, 14, 12, 10],
	},
	{
		icon: "solar:chart-outline",
		label: "Average Rent",
		value: "$1,850",
		percent: 8.2,
		color: "#f59e42",
		chart: [8, 12, 10, 14, 18, 16, 14, 12, 10, 14, 18, 16],
	},
	{
		icon: "solar:eye-outline",
		label: "Total Views",
		value: "1,247",
		percent: 15.3,
		color: "#10b981",
		chart: [10, 14, 12, 16, 18, 14, 12, 10, 14, 18, 16, 12],
	},
	{
		icon: "solar:calendar-outline",
		label: "Inquiries This Month",
		value: "89",
		percent: -5.2,
		color: "#ef4444",
		chart: [16, 14, 12, 10, 14, 18, 16, 12, 10, 14, 18, 16],
	},
];

const monthlyOccupancy = {
	series: [
		{
			name: "Occupancy Rate",
			data: [85, 88, 92, 89, 95, 91, 87, 93, 96, 94, 90, 92],
		},
	],
	categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	percent: 3.2,
};

const propertyTypes = [
	{ label: "Studio Apartments", color: "#3b82f6", count: 8 },
	{ label: "1BR Apartments", color: "#f59e42", count: 12 },
	{ label: "2BR Apartments", color: "#fbbf24", count: 6 },
	{ label: "3BR+ Apartments", color: "#10b981", count: 4 },
];

const recentInquiries = [
	{ 
		name: "Sarah Johnson", 
		email: "sarah.j@email.com", 
		room: "RM001", 
		time: "2 hours ago", 
		status: "pending" 
	},
	{ 
		name: "Mike Chen", 
		email: "mike.c@email.com", 
		room: "RM003", 
		time: "4 hours ago", 
		status: "approved" 
	},
	{ 
		name: "Emma Davis", 
		email: "emma.d@email.com", 
		room: "RM002", 
		time: "6 hours ago", 
		status: "pending" 
	},
	{ 
		name: "Alex Rodriguez", 
		email: "alex.r@email.com", 
		room: "RM005", 
		time: "1 day ago", 
		status: "rejected" 
	},
];

const occupancyData = {
	series: [65, 20, 10, 5],
	labels: ["Occupied", "Vacant", "Under Maintenance", "Reserved"],
	details: [
		{ label: "Occupied", value: 156, color: "#10b981" },
		{ label: "Vacant", value: 48, color: "#3b82f6" },
		{ label: "Under Maintenance", value: 24, color: "#f59e42" },
		{ label: "Reserved", value: 12, color: "#ef4444" },
	],
};

export default function VacantRoomListing() {
	const [activeTab, setActiveTab] = useState("All Rooms");
	const [filteredRooms, setFilteredRooms] = useState(vacantRooms);
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

	const chartOptions = useChart({
		xaxis: { categories: monthlyOccupancy.categories },
		chart: { toolbar: { show: false } },
		grid: { show: false },
		stroke: { curve: "smooth" },
		dataLabels: { enabled: false },
		yaxis: { show: false },
		legend: { show: false },
	});

	const donutOptions = useChart({
		labels: occupancyData.labels,
		legend: { show: false },
		dataLabels: { enabled: false },
		plotOptions: { pie: { donut: { size: "70%" } } },
	});

	return (
		<div className="flex flex-col gap-4 w-full">
			<BannerCard />
			
			{/* Quick Stats Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{quickStats.map((stat) => (
					<Card key={stat.label} className="flex flex-col justify-between h-full">
						<CardContent className="flex flex-col gap-2 p-4">
							<div className="flex items-center gap-2">
								<div className="rounded-lg p-2" style={{ background: rgbAlpha(stat.color, 0.1) }}>
									<Icon icon={stat.icon} size={24} color={stat.color} />
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
										<Icon icon="mdi:arrow-up" size={16} />
									) : stat.percent < 0 ? (
										<Icon icon="mdi:arrow-down" size={16} />
									) : null}
									{stat.percent !== 0 ? `${Math.abs(stat.percent)}%` : "New"}
								</span>
							</div>
							<div className="w-full h-10 mt-2">
								<Chart
									type="bar"
									height={40}
									options={useChart({
										chart: { sparkline: { enabled: true } },
										colors: [stat.color],
										grid: { show: false },
										yaxis: { show: false },
										tooltip: { enabled: false },
									})}
									series={[{ data: stat.chart }]}
								/>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Filter Panel and View Controls */}
			<RoomFilterPanel 
				onFilterChange={setFilteredRooms}
				viewMode={viewMode}
				onViewModeChange={setViewMode}
			/>

			{/* Monthly Occupancy + Property Types */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				<Card className="lg:col-span-2">
					<CardContent className="p-6">
						<div className="flex items-center justify-between mb-2">
							<Text variant="body2" className="font-semibold">
								Monthly Occupancy Rate
							</Text>
							<span className="flex items-center gap-1 text-green-500 font-bold text-sm">
								<Icon icon="mdi:arrow-up" size={16} />
								{monthlyOccupancy.percent}%
							</span>
						</div>
						<Chart type="area" height={220} options={chartOptions} series={monthlyOccupancy.series} />
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
					<Progress value={85} />
					<ul className="flex flex-col gap-2 mt-2 mb-4">
						{propertyTypes.map((type) => (
							<li key={type.label} className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<span className="inline-block w-2 h-2 rounded-full" style={{ background: type.color }} />
									<Text variant="body2">{type.label}</Text>
								</div>
								<span className="text-xs font-bold">{type.count}</span>
							</li>
						))}
					</ul>
					<Button className="w-full mt-auto" size="sm">
						<Icon icon="mdi:plus" size={18} /> Add Property
					</Button>
				</Card>
			</div>

			{/* Room Listings */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				<Card className="lg:col-span-2 flex flex-col p-6">
					<div className="flex items-center justify-between mb-4">
						<Text variant="body2" className="font-semibold">
							Vacant Room Listings
						</Text>
						<div className="flex gap-2">
							{["All Rooms", "Available", "Under Review"].map((tab) => (
								<Button
									key={tab}
									size="sm"
									variant={activeTab === tab ? "default" : "ghost"}
									onClick={() => setActiveTab(tab)}
								>
									{tab}
								</Button>
							))}
						</div>
					</div>
					
					{/* Room Grid/List View */}
					<div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
						{filteredRooms.map((room) => (
							<RoomListingCard key={room.id} room={room} viewMode={viewMode} />
						))}
					</div>
					
					<div className="flex items-center justify-between mt-4 gap-2">
						<Button variant="outline" className="flex-1">
							View all properties
						</Button>
						<Button className="flex-1">
							<Icon icon="mdi:plus" size={18} /> Add new listing
						</Button>
					</div>
				</Card>
				
				{/* Recent Inquiries + Occupancy Chart */}
				<div className="flex flex-col gap-4">
					<Card className="flex flex-col p-6">
						<Text variant="body2" className="font-semibold mb-4">
							Recent Inquiries
						</Text>
						<div className="flex-1 overflow-y-auto max-h-64">
							{recentInquiries.map((inquiry) => (
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
							<Chart type="donut" height={180} options={donutOptions} series={occupancyData.series} />
							<div className="w-full mt-4">
								{occupancyData.details.map((item) => (
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