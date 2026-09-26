import { runComplianceAgent } from "../agents/complianceAgent.js";

export const checkDocumentCompliance = async (req, res) => {

    try {
        const { document, framework } = req.body;

        if (!document) {
            return res.status(400).json({
                success: false,
                message: "Document text is required"
            });
        }

        const selectedFramework = framework || "GDPR";

        const result = await runComplianceAgent(
            document,
            selectedFramework
        );

        return res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {

    console.error("===== COMPLIANCE ERROR =====");
    console.error(error);
    console.error(error.stack);

    return res.status(500).json({
        success: false,
        message: "Compliance checking failed",
        error: error.message
    });
}
}