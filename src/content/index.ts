import rawSiteContent from "./site.json";
import { parseSiteContent } from "./schema";

export const siteContent = parseSiteContent(rawSiteContent);
