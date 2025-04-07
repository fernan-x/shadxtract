import { Browser, Page } from "puppeteer";
import { Task } from "./task";

export type Environment = {
    browser?: Browser;
    page?: Page;
    phases: {
        [key: string]: {
            inputs: Record<string, string>;
            outputs: Record<string, string>;
        }
    }
}

export type ExecutionEnvironment<T extends Task> = {
    getInput(name: T["inputs"][number]["name"]): string;
    getBrowser(): Browser | undefined;
    setBrowser(browser: Browser): void;
    getPage(): Page | undefined;
    setPage(page: Page): void;
}