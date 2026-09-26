import { tool } from "@langchain/core/tools";
import { z } from "zod";

 const checkCompliance = tool(
    async ({ document }) => {

        const rules = [
            "The purpose of collecting personal data should be clearly stated.",
            "Conditions for sharing personal data should be clearly stated.",
            "Data retention period should be clearly defined."
        ];

        return JSON.stringify({
            document,
            rules
        });
    },
    {
        name: "check_compliance",
        description:
            "Checks a document against basic compliance rules related to personal data collection, data sharing, and data retention.",
        schema: z.object({
            document: z
                .string()
                .describe("The document text that needs to be checked")
        })
    }
);

export { checkCompliance };