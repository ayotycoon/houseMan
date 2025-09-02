import { DemoApi } from "@/api/services/demoService";
import { ResultStuts } from "@/types/enum";
import { http, HttpResponse } from "msw";

export const mockTokenExpired = http.post(`/api${DemoApi.TOKEN_EXPIRED}`, () => {
	return new HttpResponse(null, { status: ResultStuts.TIMEOUT });
});
export const mockMyListings = http.get(`/api${DemoApi.MY_LISTINGS}`, () => {
	const data = [
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


	return HttpResponse.json(
		{
			message: "",
			data,
			status: ResultStuts.SUCCESS, // business status
		},
		{
			status: 200, // http status
		},
	);
});
export const mocRecentInquiries = http.get(`/api${DemoApi.RECENT_INQUIRIES}`, () => {
	const data = [
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


	return HttpResponse.json(
		{
			message: "",
			data,
			status: ResultStuts.SUCCESS, // business status
		},
		{
			status: 200, // http status
		},
	);
});

export const mockQuickStats = http.get(`/api${DemoApi.QUICK_STATS}`, () => {
	const data = [
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

	return HttpResponse.json(
		{
			message: "",
			data,
			status: ResultStuts.SUCCESS,
		},
		{
			status: 200,
		},
	);
});

export const mockMonthlyOccupancy = http.get(`/api${DemoApi.MONTHLY_OCCUPANCY}`, () => {
	const data = {
		series: [
			{
				name: "Occupancy Rate",
				data: [85, 88, 92, 89, 95, 91, 87, 93, 96, 94, 90, 92],
			},
		],
		categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		percent: 3.2,
	};

	return HttpResponse.json(
		{
			message: "",
			data,
			status: ResultStuts.SUCCESS,
		},
		{
			status: 200,
		},
	);
});

export const mockPropertyTypes = http.get(`/api${DemoApi.PROPERTY_TYPES}`, () => {
	const data = [
		{ label: "Studio Apartments", color: "#3b82f6", count: 8 },
		{ label: "1BR Apartments", color: "#f59e42", count: 12 },
		{ label: "2BR Apartments", color: "#fbbf24", count: 6 },
		{ label: "3BR+ Apartments", color: "#10b981", count: 4 },
	];

	return HttpResponse.json(
		{
			message: "",
			data,
			status: ResultStuts.SUCCESS,
		},
		{
			status: 200,
		},
	);
});

export const mockOccupancyData = http.get(`/api${DemoApi.OCCUPANCY_DATA}`, () => {
	const data = {
		series: [65, 20, 10, 5],
		labels: ["Occupied", "Vacant", "Under Maintenance", "Reserved"],
		details: [
			{ label: "Occupied", value: 156, color: "#10b981" },
			{ label: "Vacant", value: 48, color: "#3b82f6" },
			{ label: "Under Maintenance", value: 24, color: "#f59e42" },
			{ label: "Reserved", value: 12, color: "#ef4444" },
		],
	};

	return HttpResponse.json(
		{
			message: "",
			data,
			status: ResultStuts.SUCCESS,
		},
		{
			status: 200,
		},
	);
});

