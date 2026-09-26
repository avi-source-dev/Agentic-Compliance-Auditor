import {
    AlertTriangle,
    CheckCircle2,
    ShieldAlert,
    FileWarning,
} from "lucide-react";

function SummaryCards({ result }) {

    const issues = result?.issues || [];

    const high = issues.filter(
        (issue) => issue.severity === "High"
    ).length;

    const medium = issues.filter(
        (issue) => issue.severity === "Medium"
    ).length;

    const low = issues.filter(
        (issue) => issue.severity === "Low"
    ).length;

    const compliant = result?.status === "Compliant";

    return (
        <section className="summary-grid">

            {/* Status */}
            <div className="summary-card">

                <div className="summary-card-icon status-icon">
                    {compliant ? (
                        <CheckCircle2 size={22} />
                    ) : (
                        <ShieldAlert size={22} />
                    )}
                </div>

                <div className="summary-card-info">
                    <span>Status</span>
                    <strong>
                        {result?.status || "—"}
                    </strong>
                </div>

            </div>

            {/* High */}
            <div className="summary-card">

                <div className="summary-card-icon high-icon">
                    <AlertTriangle size={22} />
                </div>

                <div className="summary-card-info">
                    <span>High Risk</span>
                    <strong>{high}</strong>
                </div>

            </div>

            {/* Medium */}
            <div className="summary-card">

                <div className="summary-card-icon medium-icon">
                    <FileWarning size={22} />
                </div>

                <div className="summary-card-info">
                    <span>Medium Risk</span>
                    <strong>{medium}</strong>
                </div>

            </div>

            {/* Low */}
            <div className="summary-card">

                <div className="summary-card-icon low-icon">
                    <CheckCircle2 size={22} />
                </div>

                <div className="summary-card-info">
                    <span>Low Risk</span>
                    <strong>{low}</strong>
                </div>

            </div>

        </section>
    );
}

export default SummaryCards;
