import { ChatGroq } from "@langchain/groq";
import { ToolMessage } from "@langchain/core/messages";
import { checkCompliance } from "../tools/complianceTools.js";
import "dotenv/config";

// ==========================================
// BASE GROQ MODEL
// ==========================================

const baseModel = new ChatGroq({
    model: "openai/gpt-oss-120b",
    temperature: 0
});

// ==========================================
// MODEL WITH COMPLIANCE TOOL
// ==========================================

const model = baseModel.bindTools([checkCompliance]);


// ==========================================
// COMPLIANCE AGENT
// ==========================================

export const runComplianceAgent = async (
    documentText,
    framework = "GDPR"
) => {

    const steps = [];

    // ------------------------------------------
    // STEP 1: Document received
    // ------------------------------------------

    steps.push("Document received");

    // ------------------------------------------
    // STEP 2: Framework selected
    // ------------------------------------------

    steps.push(`Framework selected: ${framework}`);

    // ------------------------------------------
    // STEP 3: Ask AI to call compliance tool
    // ------------------------------------------

    const messages = [
        {
            role: "system",
            content: `
You are a compliance checking AI agent.

Selected compliance framework:
${framework}

Your task is to analyze the document using the
check_compliance tool.

You MUST call the check_compliance tool exactly once.

Pass:
- document
- framework

Do not generate the final report yet.
`
        },

        {
            role: "user",
            content: `
Check this document using the ${framework} framework.

Document:

${documentText}
`
        }
    ];

    const response = await model.invoke(messages);


    // ------------------------------------------
    // STEP 4: Check whether tool was called
    // ------------------------------------------

    if (!response.tool_calls?.length) {
        throw new Error(
            "Agent did not call compliance tool"
        );
    }

    steps.push("Compliance rules loaded");


    // ------------------------------------------
    // STEP 5: Get tool call
    // ------------------------------------------

    const toolCall = response.tool_calls[0];

    console.log("Tool call:", toolCall);


    // ------------------------------------------
    // STEP 6: Execute compliance tool
    // ------------------------------------------

    const toolArgs = {
        document: documentText,
        framework: framework
    };

    const toolResult =
        await checkCompliance.invoke(toolArgs);

    steps.push("Compliance tool executed");


    // ------------------------------------------
    // STEP 7: Create ToolMessage
    // ------------------------------------------

    const toolMessage = new ToolMessage({
        content:
            typeof toolResult === "string"
                ? toolResult
                : JSON.stringify(toolResult),

        tool_call_id: toolCall.id
    });


    // ------------------------------------------
    // STEP 8: Ask AI to create final report
    // ------------------------------------------

    const finalMessages = [

        ...messages,

        response,

        toolMessage,

        {
            role: "system",

            content: `
Now analyze the compliance tool result.

Return ONLY valid JSON.

Do NOT call any tool.

Do NOT use markdown.

Use exactly this structure:

{
  "status": "Compliant" or "Needs Revision",

  "issues": [
    {
      "issue": "string",
      "severity": "Low | Medium | High",
      "explanation": "string",
      "suggestedFix": "string"
    }
  ],

  "overallRecommendation": "string"
}
`
        }
    ];


    // ------------------------------------------
    // STEP 9: Final AI response
    // ------------------------------------------

    const finalResponse =
        await baseModel.invoke(finalMessages);

    steps.push("Risks analyzed");


    // ------------------------------------------
    // STEP 10: Extract content
    // ------------------------------------------

    let content = finalResponse.content;


    if (Array.isArray(content)) {

        content = content
            .map((item) => {

                if (typeof item === "string") {
                    return item;
                }

                return item?.text || "";

            })
            .join("");
    }


    content = String(content).trim();


    // ------------------------------------------
    // STEP 11: Remove markdown if AI adds it
    // ------------------------------------------

    const cleaned = content
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();


    // ------------------------------------------
    // STEP 12: Parse JSON
    // ------------------------------------------

    let report;

    try {

        report = JSON.parse(cleaned);

    } catch (error) {

        console.error(
            "AI returned invalid JSON:"
        );

        console.error(cleaned);

        throw new Error(
            "Model returned invalid JSON"
        );
    }


    // ------------------------------------------
    // STEP 13: Finish
    // ------------------------------------------

    steps.push("Final report generated");


    return {
        ...report,
        agentSteps: steps
    };
};