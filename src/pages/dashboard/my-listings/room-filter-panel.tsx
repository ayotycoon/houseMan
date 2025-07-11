import Icon from "@/components/icon/icon";
import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";
import { Input } from "@/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import { Text } from "@/ui/typography";
import { useState } from "react";

interface RoomFilterPanelProps {
	onFilterChange: (rooms: any[]) => void;
	viewMode: "grid" | "list";
	onViewModeChange: (mode: "grid" | "list") => void;
}

export default function RoomFilterPanel({ onFilterChange, viewMode, onViewModeChange }: RoomFilterPanelProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [priceRange, setPriceRange] = useState("");
	const [bedrooms, setBedrooms] = useState("");
	const [location, setLocation] = useState("");
	const [sortBy, setSortBy] = useState("");

	const handleFilter = () => {
		// This would typically filter the actual data
		// For now, we'll just trigger the callback
		onFilterChange([]);
	};

	const handleReset = () => {
		setSearchTerm("");
		setPriceRange("");
		setBedrooms("");
		setLocation("");
		setSortBy("");
		onFilterChange([]);
	};

	return (
		<Card>
			<CardContent className="p-4">
				<div className="flex flex-col lg:flex-row gap-4 items-center">
					{/* Search Input */}
					<div className="flex-1 w-full lg:w-auto">
						<div className="relative">
							<Icon 
								icon="mdi:magnify" 
								size={20} 
								className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
							/>
							<Input
								placeholder="Search rooms..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>
					</div>

					{/* Price Range Filter */}
					<div className="w-full lg:w-32">
						<Select value={priceRange} onValueChange={setPriceRange}>
							<SelectTrigger>
								<SelectValue placeholder="Price" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="0-1000">$0 - $1,000</SelectItem>
								<SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
								<SelectItem value="2000-3000">$2,000 - $3,000</SelectItem>
								<SelectItem value="3000+">$3,000+</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Bedrooms Filter */}
					<div className="w-full lg:w-32">
						<Select value={bedrooms} onValueChange={setBedrooms}>
							<SelectTrigger>
								<SelectValue placeholder="Bedrooms" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="1">1 BR</SelectItem>
								<SelectItem value="2">2 BR</SelectItem>
								<SelectItem value="3">3 BR</SelectItem>
								<SelectItem value="4+">4+ BR</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Location Filter */}
					<div className="w-full lg:w-40">
						<Select value={location} onValueChange={setLocation}>
							<SelectTrigger>
								<SelectValue placeholder="Location" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="downtown">Downtown</SelectItem>
								<SelectItem value="suburban">Suburban</SelectItem>
								<SelectItem value="city-center">City Center</SelectItem>
								<SelectItem value="arts-district">Arts District</SelectItem>
								<SelectItem value="business-district">Business District</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* Sort By */}
					<div className="w-full lg:w-32">
						<Select value={sortBy} onValueChange={setSortBy}>
							<SelectTrigger>
								<SelectValue placeholder="Sort by" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="price-low">Price: Low to High</SelectItem>
								<SelectItem value="price-high">Price: High to Low</SelectItem>
								<SelectItem value="rating">Rating</SelectItem>
								<SelectItem value="newest">Newest</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* View Mode Toggle */}
					<div className="flex border rounded-md">
						<Button
							variant={viewMode === "grid" ? "default" : "ghost"}
							size="sm"
							onClick={() => onViewModeChange("grid")}
							className="rounded-r-none"
						>
							<Icon icon="mdi:view-grid" size={18} />
						</Button>
						<Button
							variant={viewMode === "list" ? "default" : "ghost"}
							size="sm"
							onClick={() => onViewModeChange("list")}
							className="rounded-l-none"
						>
							<Icon icon="mdi:view-list" size={18} />
						</Button>
					</div>

					{/* Action Buttons */}
					<div className="flex gap-2">
						<Button onClick={handleFilter} size="sm">
							<Icon icon="mdi:filter" size={16} />
							<span className="ml-1">Filter</span>
						</Button>
						<Button onClick={handleReset} variant="outline" size="sm">
							<Icon icon="mdi:refresh" size={16} />
							<span className="ml-1">Reset</span>
						</Button>
					</div>
				</div>

				{/* Active Filters Display */}
				{(searchTerm || priceRange || bedrooms || location) && (
					<div className="flex items-center gap-2 mt-4 pt-4 border-t">
						<Text variant="body2" className="text-muted-foreground">
							Active filters:
						</Text>
						<div className="flex flex-wrap gap-2">
							{searchTerm && (
								<div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
									<span>Search: {searchTerm}</span>
									<button onClick={() => setSearchTerm("")}>
										<Icon icon="mdi:close" size={14} />
									</button>
								</div>
							)}
							{priceRange && (
								<div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
									<span>Price: {priceRange}</span>
									<button onClick={() => setPriceRange("")}>
										<Icon icon="mdi:close" size={14} />
									</button>
								</div>
							)}
							{bedrooms && (
								<div className="flex items-center gap-1 bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
									<span>Bedrooms: {bedrooms}</span>
									<button onClick={() => setBedrooms("")}>
										<Icon icon="mdi:close" size={14} />
									</button>
								</div>
							)}
							{location && (
								<div className="flex items-center gap-1 bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
									<span>Location: {location}</span>
									<button onClick={() => setLocation("")}>
										<Icon icon="mdi:close" size={14} />
									</button>
								</div>
							)}
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
} 