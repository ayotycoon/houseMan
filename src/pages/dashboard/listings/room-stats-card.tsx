import { Chart, useChart } from "@/components/chart";
import Icon from "@/components/icon/icon";
import { Card, CardContent } from "@/ui/card";
import { Text, Title } from "@/ui/typography";
import { rgbAlpha } from "@/utils/theme";

interface RoomStatsCardProps {
	title: string;
	value: string;
	icon: string;
	color: string;
	chart: number[];
	percent: number;
}

export default function RoomStatsCard({ title, value, icon, color, chart, percent }: RoomStatsCardProps) {
	return (
		<Card className="flex flex-col justify-between h-full">
			<CardContent className="flex flex-col gap-2 p-4">
				<div className="flex items-center gap-2">
					<div className="rounded-lg p-2" style={{ background: rgbAlpha(color, 0.1) }}>
						<Icon icon={icon} size={24} color={color} />
					</div>
					<Text variant="body2" className="font-semibold">
						{title}
					</Text>
				</div>
				<div className="flex items-center gap-2 mt-2">
					<Title as="h3" className="text-2xl font-bold">
						{value}
					</Title>
					<span
						className={`text-xs flex items-center gap-1 font-bold ${percent > 0 ? "text-green-500" : percent < 0 ? "text-red-500" : ""}`}
					>
						{percent > 0 ? (
							<Icon icon="mdi:arrow-up" size={16} />
						) : percent < 0 ? (
							<Icon icon="mdi:arrow-down" size={16} />
						) : null}
						{percent !== 0 ? `${Math.abs(percent)}%` : "New"}
					</span>
				</div>
				<div className="w-full h-10 mt-2">
					<Chart
						type="bar"
						height={40}
						options={useChart({
							chart: { sparkline: { enabled: true } },
							colors: [color],
							grid: { show: false },
							yaxis: { show: false },
							tooltip: { enabled: false },
						})}
						series={[{ data: chart }]}
					/>
				</div>
			</CardContent>
		</Card>
	);
} 