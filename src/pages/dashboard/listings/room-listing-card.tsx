import Icon from "@/components/icon/icon";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";
import { Text, Title } from "@/ui/typography";
import { useNavigate } from "react-router";

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

interface RoomListingCardProps {
	room: Room;
	viewMode: "grid" | "list";
}

export default function RoomListingCard({ room, viewMode }: RoomListingCardProps) {
	const navigate = useNavigate();

	const handleCardClick = (e: React.MouseEvent) => {
		// Don't navigate if clicking on buttons
		if ((e.target as HTMLElement).closest('button')) {
			return;
		}
		navigate(`/listings/${room.id}`);
	};

	if (viewMode === "list") {
		return (
			<Card 
				className="flex flex-row overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
				onClick={handleCardClick}
			>
				<div className="w-48 h-32 flex-shrink-0">
					<img 
						src={room.image} 
						alt={room.title}
						className="w-full h-full object-cover"
					/>
				</div>
				<CardContent className="flex-1 p-4 flex flex-col justify-between">
					<div className="flex justify-between items-start">
						<div className="flex-1">
							<div className="flex items-center gap-2 mb-2">
								<Title as="h3" className="text-lg font-semibold">
									{room.title}
								</Title>
								<Badge variant="secondary" className="text-xs">
									{room.status}
								</Badge>
							</div>
							<div className="flex items-center gap-1 text-muted-foreground mb-2">
								<Icon icon="mdi:map-marker" size={16} />
								<Text variant="body2">{room.location}</Text>
							</div>
							<Text variant="body2" className="text-muted-foreground line-clamp-2">
								{room.description}
							</Text>
						</div>
						<div className="text-right ml-4">
							<Title as="h4" className="text-xl font-bold text-green-600">
								${room.price}/month
							</Title>
							<Text variant="body2" className="text-muted-foreground">
								{room.size} sq ft
							</Text>
						</div>
					</div>
					
					<div className="flex items-center justify-between mt-4">
						<div className="flex items-center gap-4 text-sm text-muted-foreground">
							<div className="flex items-center gap-1">
								<Icon icon="mdi:bed" size={16} />
								<span>{room.bedrooms} BR</span>
							</div>
							<div className="flex items-center gap-1">
								<Icon icon="mdi:shower" size={16} />
								<span>{room.bathrooms} BA</span>
							</div>
							<div className="flex items-center gap-1">
								<Icon icon="mdi:star" size={16} className="text-yellow-500" />
								<span>{room.rating} ({room.reviews})</span>
							</div>
						</div>
						<div className="flex gap-2">
							<Button size="sm" variant="outline">
								<Icon icon="mdi:eye" size={16} />
							</Button>
							<Button size="sm" variant="outline">
								<Icon icon="mdi:pencil" size={16} />
							</Button>
							<Button size="sm">
								<Icon icon="mdi:message" size={16} />
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card 
			className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
			onClick={handleCardClick}
		>
			<div className="relative">
				<img 
					src={room.image} 
					alt={room.title}
					className="w-full h-48 object-cover"
				/>
				<div className="absolute top-2 right-2">
					<Badge variant="secondary" className="text-xs">
						{room.status}
					</Badge>
				</div>
				<div className="absolute top-2 left-2">
					<div className="flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded text-xs">
						<Icon icon="mdi:star" size={14} className="text-yellow-400" />
						<span>{room.rating}</span>
						<span>({room.reviews})</span>
					</div>
				</div>
			</div>
			
			<CardContent className="p-4">
				<div className="flex items-center gap-1 text-muted-foreground mb-2">
					<Icon icon="mdi:map-marker" size={16} />
					<Text variant="body2">{room.location}</Text>
				</div>
				
				<Title as="h3" className="text-lg font-semibold mb-2 line-clamp-1">
					{room.title}
				</Title>
				
				<Text variant="body2" className="text-muted-foreground mb-3 line-clamp-2">
					{room.description}
				</Text>
				
				<div className="flex items-center justify-between mb-3">
					<div className="flex items-center gap-3 text-sm text-muted-foreground">
						<div className="flex items-center gap-1">
							<Icon icon="mdi:bed" size={16} />
							<span>{room.bedrooms}</span>
						</div>
						<div className="flex items-center gap-1">
							<Icon icon="mdi:shower" size={16} />
							<span>{room.bathrooms}</span>
						</div>
						<div className="flex items-center gap-1">
							<Icon icon="mdi:ruler" size={16} />
							<span>{room.size} sq ft</span>
						</div>
					</div>
				</div>
				
				<div className="flex flex-wrap gap-1 mb-3">
					{room.amenities.slice(0, 3).map((amenity) => (
						<Badge key={amenity} variant="outline" className="text-xs">
							{amenity}
						</Badge>
					))}
					{room.amenities.length > 3 && (
						<Badge variant="outline" className="text-xs">
							+{room.amenities.length - 3} more
						</Badge>
					)}
				</div>
				
				<div className="flex items-center justify-between">
					<Title as="h4" className="text-xl font-bold text-green-600">
						${room.price}/month
					</Title>
					<div className="flex gap-1">
						<Button size="sm" variant="outline">
							<Icon icon="mdi:eye" size={16} />
						</Button>
						<Button size="sm" variant="outline">
							<Icon icon="mdi:pencil" size={16} />
						</Button>
						<Button size="sm">
							<Icon icon="mdi:message" size={16} />
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
} 