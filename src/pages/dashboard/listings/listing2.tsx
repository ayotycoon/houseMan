import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Icon from "@/components/icon/icon";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Text, Title } from "@/ui/typography";
import { Separator } from "@/ui/separator";
import { Avatar, AvatarImage } from "@/ui/avatar";
import demoService from "@/api/services/demoService";

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

export default function SingleListingPage() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

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
		<div className="flex flex-col gap-6 w-full">
			{/* Header */}
			<div className="flex items-center justify-between">
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

					<Separator orientation="vertical" className="h-6" />
					<div>
						<Title as="h1" className="text-2xl font-bold">
							{room.title}
						</Title>
						<Text variant="body2" className="text-muted-foreground">
							{room.location}
						</Text>
					</div>
				</div>
				<div className="flex gap-2">
					<Button variant="outline">
						<Icon icon="mdi:pencil" size={16} className="mr-2" />
						Edit
					</Button>
					<Button>
						<Icon icon="mdi:message" size={16} className="mr-2" />
						Contact
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-6">
					{/* Image Gallery */}
					<Card>
						<div className="relative">
							<img
								src={room.image}
								alt={room.title}
								className="w-full h-80 object-cover rounded-t-lg"
							/>
							<div className="absolute top-4 left-4">
								<Badge variant="secondary" className="text-sm">
									{room.status}
								</Badge>
							</div>
							<div className="absolute top-4 right-4">
								<div className="flex items-center gap-1 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
									<Icon icon="mdi:star" size={16} className="text-yellow-400" />
									<span>{room.rating}</span>
									<span>({room.reviews} reviews)</span>
								</div>
							</div>
						</div>
					</Card>

					{/* Description */}
					<Card>
						<CardHeader>
							<CardTitle>Description</CardTitle>
						</CardHeader>
						<CardContent>
							<Text variant="body1" className="leading-relaxed">
								{room.description}
							</Text>
						</CardContent>
					</Card>

					{/* Amenities */}
					<Card>
						<CardHeader>
							<CardTitle>Amenities</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
								{room.amenities.map((amenity) => (
									<div key={amenity} className="flex items-center gap-2">
										<Icon icon="mdi:check-circle" size={16} className="text-green-500" />
										<Text variant="body2">{amenity}</Text>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					{/* Price Card */}
					<Card>
						<CardContent className="p-6">
							<div className="text-center">
								<Title as="h2" className="text-3xl font-bold text-green-600 mb-2">
									${room.price}
								</Title>
								<Text variant="body2" className="text-muted-foreground mb-4">
									per month
								</Text>
								<Button className="w-full" size="lg">
									<Icon icon="mdi:calendar-check" size={18} className="mr-2" />
									Schedule Viewing
								</Button>
							</div>
						</CardContent>
					</Card>

					{/* Property Details */}
					<Card>
						<CardHeader>
							<CardTitle>Property Details</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="flex items-center gap-3">
									<div className="rounded-lg p-2 bg-blue-50 dark:bg-blue-950/20">
										<Icon icon="mdi:bed" size={20} className="text-blue-600 dark:text-blue-400" />
									</div>
									<div>
										<Text variant="body2" className="text-muted-foreground">
											Bedrooms
										</Text>
										<Text variant="body1" className="font-semibold">
											{room.bedrooms}
										</Text>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<div className="rounded-lg p-2 bg-green-50 dark:bg-green-950/20">
										<Icon icon="mdi:shower" size={20} className="text-green-600 dark:text-green-400" />
									</div>
									<div>
										<Text variant="body2" className="text-muted-foreground">
											Bathrooms
										</Text>
										<Text variant="body1" className="font-semibold">
											{room.bathrooms}
										</Text>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<div className="rounded-lg p-2 bg-orange-50 dark:bg-orange-950/20">
										<Icon icon="mdi:ruler" size={20} className="text-orange-600 dark:text-orange-400" />
									</div>
									<div>
										<Text variant="body2" className="text-muted-foreground">
											Size
										</Text>
										<Text variant="body1" className="font-semibold">
											{room.size} sq ft
										</Text>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<div className="rounded-lg p-2 bg-purple-50 dark:bg-purple-950/20">
										<Icon icon="mdi:map-marker" size={20} className="text-purple-600 dark:text-purple-400" />
									</div>
									<div>
										<Text variant="body2" className="text-muted-foreground">
											Location
										</Text>
										<Text variant="body1" className="font-semibold">
											{room.location}
										</Text>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Contact Agent */}
					<Card>
						<CardHeader>
							<CardTitle>Contact Agent</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center gap-3">
								<Avatar className="w-12 h-12">
									<AvatarImage src="https://ui-avatars.com/api/?name=John+Doe&background=random" />
								</Avatar>
								<div>
									<Text variant="body1" className="font-semibold">
										John Doe
									</Text>
									<Text variant="body2" className="text-muted-foreground">
										Property Manager
									</Text>
								</div>
							</div>
							<div className="space-y-2">
								<Button variant="outline" className="w-full justify-start">
									<Icon icon="mdi:phone" size={16} className="mr-2" />
									+1 (555) 123-4567
								</Button>
								<Button variant="outline" className="w-full justify-start">
									<Icon icon="mdi:email" size={16} className="mr-2" />
									john.doe@example.com
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
} 