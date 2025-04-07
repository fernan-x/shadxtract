import { ExecutionEnvironment } from "@/ui/types/executor";
import puppeteer from "puppeteer";
import { LaunchBrowserTask } from "../task/launch-browser";

export const LaunchBrowserExecutor = async (environment: ExecutionEnvironment<typeof LaunchBrowserTask>) => {
    try {
        const websiteUrl = environment.getInput("Website Url");
        console.debug(`[LaunchBrowserExecutor] Launching browser for ${websiteUrl}`);
        const browser = await puppeteer.launch({
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-gpu",
            ],
        });
        environment.setBrowser(browser);
        const page = await browser.newPage();
        await page.goto(websiteUrl);
        environment.setPage(page);
        console.debug("[LaunchBrowserExecutor] Page title:", await page.title());
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}