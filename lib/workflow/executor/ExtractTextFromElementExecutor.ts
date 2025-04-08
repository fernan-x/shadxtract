import { ExecutionEnvironment } from "@/ui/types/executor";
import { ExtractTextFromElementTask } from "../task/extract-text-from-element";
import * as cheerio from "cheerio";

export const ExtractTextFromElementExecutor = async (
  environment: ExecutionEnvironment<typeof ExtractTextFromElementTask>,
) => {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      console.error("[ExtractTextFromElementExecutor] No selector provided");
      environment.log.error("No selector provided");
      return false;
    }

    const html = environment.getInput("Html");
    if (!html) {
      console.error("[ExtractTextFromElementExecutor] No html provided");
      environment.log.error("No html provided");
      return false;
    }

    const $ = cheerio.load(html);
    const element = $(selector);

    if (!element) {
      console.error(
        `[ExtractTextFromElementExecutor] Element "${selector}" not found`,
      );
      environment.log.error(`Element "${selector}" not found`);
      return false;
    }

    const extractedText = $.text(element);
    if (!extractedText) {
      console.error(
        `[ExtractTextFromElementExecutor] No text found for element "${selector}"`,
      );
      environment.log.error(`No text found for element "${selector}"`);
      return false;
    }

    environment.setOutput("Extracted text", extractedText);

    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      environment.log.error(error.message);
    } else {
      environment.log.error("Unknown error");
    }
    console.error(error);
    return false;
  }
};
