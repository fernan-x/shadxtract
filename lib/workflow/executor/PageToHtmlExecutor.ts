import { ExecutionEnvironment } from "@/ui/types/executor";
import { PageToHtmlTask } from "../task/page-to-html";

export const PageToHtmlExecutor = async (environment: ExecutionEnvironment<typeof PageToHtmlTask>) => {
    try {
        const html = await environment.getPage()!.content();
        environment.setOutput("Html", html);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}