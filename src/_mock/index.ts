import { setupWorker } from "msw/browser";
import {mockMyListings, mockTokenExpired, mockQuickStats, mockMonthlyOccupancy, mockPropertyTypes, mockOccupancyData, mocRecentInquiries} from "./handlers/_demo";
import { menuList } from "./handlers/_menu";
import { signIn, userList } from "./handlers/_user";

const handlers = [signIn, userList, mockTokenExpired, menuList, mockMyListings, mockQuickStats, mockMonthlyOccupancy, mockPropertyTypes, mockOccupancyData, mocRecentInquiries];
const worker = setupWorker(...handlers);

export { worker };
