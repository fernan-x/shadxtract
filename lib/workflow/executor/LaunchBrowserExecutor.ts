import { waitFor } from "@/lib/helpers/wait-for";
import { ExecutionEnvironment } from "@/ui/types/executor";
import puppeteer from "puppeteer";

export const LaunchBrowserExecutor = async (environment: ExecutionEnvironment) => {
    try {
        const websiteUrl = environment.getInput("Website Url");
        console.log(`Launching browser for ${websiteUrl}`);
        const browser = await puppeteer.launch({ headless: false });
        await waitFor(3000);
        await browser.close();
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}