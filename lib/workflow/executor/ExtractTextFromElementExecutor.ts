import { ExecutionEnvironment } from "@/ui/types/executor";
import { ExtractTextFromElementTask } from "../task/extract-text-from-element";
import * as cheerio from "cheerio";

export const ExtractTextFromElementExecutor = async (environment: ExecutionEnvironment<typeof ExtractTextFromElementTask>) => {
    try {
        const selector = environment.getInput("Selector");
        if (!selector) {
            console.error("[ExtractTextFromElementExecutor] No selector provided");
            return false;
        }

        const html = environment.getInput("Html");
        if (!html) {
            console.error("[ExtractTextFromElementExecutor] No html provided");
            return false;
        }

        const $ = cheerio.load(html);
        const element = $(selector);

        if (!element) {
            console.error(`[ExtractTextFromElementExecutor] Element "${selector}" not found`);
            return false;
        }

        const extractedText = $.text(element);
        if (!extractedText) {
            console.error(`[ExtractTextFromElementExecutor] No text found for element "${selector}"`);
            return false;
        }

        environment.setOutput("Extracted text", extractedText);

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}