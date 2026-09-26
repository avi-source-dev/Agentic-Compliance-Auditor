import {
    AlertCircle,
    Lightbulb,
    ShieldAlert,
} from "lucide-react";

function IssueCard({ issue, index }) {

    const severity = issue?.severity?.toLowerCase() || "low";

    return (
        <article className={`issue-card issue-${severity}`}>

            <div className="issue-top">

                <div className="issue-id">
                    ISSUE {String(index + 1).padStart(2, "0")}
                </div>

                <div className={`severity-badge ${severity}`}>
                    <ShieldAlert size={14} />
                    {issue.severity}
                </div>

            </div>

            <h3 className="issue-title">
                {issue.issue}
            </h3>

            {/* Explanation */}
            <div className="issue-block">

                <div className="issue-block-title">
                    <AlertCircle size={16} />
                    Explanation
                </div>

                <p>
                    {issue.explanation}
                </p>

            </div>

            {/* Suggested Fix */}
            <div className="issue-block fix-block">

                <div className="issue-block-title">
                    <Lightbulb size={16} />
                    Suggested Fix
                </div>

                <p>
                    {issue.suggestedFix}
                </p>

            </div>

        </article>
    );
}

export default IssueCard;