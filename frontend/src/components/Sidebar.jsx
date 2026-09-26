import {
    ShieldCheck,
    FileText,
    Play,
    RotateCcw,
} from "lucide-react";

function Sidebar({
    document,
    setDocument,
    framework,
    setFramework,
    onCheck,
    onReset,
    loading,
}) {
    return (
        <aside className="sidebar">

            {/* Brand */}
            <div className="sidebar-brand">
                <div className="brand-logo">
                    <ShieldCheck size={26} />
                </div>

                <div>
                    <h1>ComplianceAI</h1>
                    <p>Agentic Compliance Auditor</p>
                </div>
            </div>

            <div className="sidebar-divider" />

            {/* Document Input */}
            <div className="sidebar-section">

                <div className="sidebar-label">
                    <FileText size={17} />
                    <span>Document</span>
                </div>

                <textarea
                    className="sidebar-textarea"
                    value={document}
                    onChange={(e) => setDocument(e.target.value)}
                    placeholder="Paste your privacy policy, security policy, contract, or other document here..."
                />

                <div className="character-count">
                    {document.length} characters
                </div>

            </div>

            {/* Framework */}
            <div className="sidebar-section">

                <label className="sidebar-label">
                    <ShieldCheck size={17} />
                    <span>Compliance Framework</span>
                </label>

                <select
                    className="framework-select"
                    value={framework}
                    onChange={(e) => setFramework(e.target.value)}
                >
                    <option value="GDPR">GDPR</option>
                    <option value="CCPA">CCPA</option>
                    <option value="HIPAA">HIPAA</option>
                    <option value="ISO27001">ISO 27001</option>
                </select>

            </div>

            {/* Analyze button */}
            <button
                className="analyze-btn"
                onClick={onCheck}
                disabled={loading}
            >
                <Play size={18} />

                {loading ? "Analyzing..." : "Check Compliance"}
            </button>

            {/* Reset */}
            <button
                className="reset-btn"
                onClick={onReset}
                disabled={loading}
            >
                <RotateCcw size={16} />
                Reset
            </button>

            <div className="sidebar-footer">
                <div className="status-dot" />
                <span>AI Agent Ready</span>
            </div>

        </aside>
    );
}

export default Sidebar;