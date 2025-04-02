import { ExecutionEnvironment } from "@/ui/types/executor";
import puppeteer from "puppeteer";

export const LaunchBrowserExecutor = async (environment: ExecutionEnvironment) => {
    try {
        const websiteUrl = environment.getInput("Website Url");
        console.log(`Launching browser for ${websiteUrl}`);
        const browser = await puppeteer.launch({
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-gpu",
            ],
        });
        const page = await browser.newPage();
        await page.goto("https://example.com");
        console.log("Page title:", await page.title());
        await browser.close();
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}