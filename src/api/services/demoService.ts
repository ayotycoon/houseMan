import apiClient from "../apiClient";

export enum DemoApi {
	TOKEN_EXPIRED = "/user/tokenExpired",
	MY_LISTINGS = "/user/listings",
	RECENT_INQUIRIES = "/user/recent-inquiries",
	QUICK_STATS = "/user/quick-stats",
	MONTHLY_OCCUPANCY = "/user/monthly-occupancy",
	PROPERTY_TYPES = "/user/property-types",
	OCCUPANCY_DATA = "/user/occupancy-data",
}

const mockTokenExpired = () => apiClient.post({ url: DemoApi.TOKEN_EXPIRED });
const mockMyListings = () => apiClient.get<any[]>({ url: DemoApi.MY_LISTINGS });
const mockRecentInq = () => apiClient.get<any[]>({ url: DemoApi.RECENT_INQUIRIES });
const mockQuickStats = () => apiClient.get<any[]>({ url: DemoApi.QUICK_STATS });
const mockMonthlyOccupancy = () => apiClient.get<any>({ url: DemoApi.MONTHLY_OCCUPANCY });
const mockPropertyTypes = () => apiClient.get<any[]>({ url: DemoApi.PROPERTY_TYPES });
const mockOccupancyData = () => apiClient.get<any>({ url: DemoApi.OCCUPANCY_DATA });

export default {
	mockTokenExpired,
	mockMyListings,
	mockRecentInq,
	mockQuickStats,
	mockMonthlyOccupancy,
	mockPropertyTypes,
	mockOccupancyData
};
