import { useState } from "react";
import axios from "axios";

import {
    ShieldCheck,
    BarChart3,
    AlertCircle,
} from "lucide-react";

import Sidebar from "./components/Sidebar";
import AgentActivity from "./components/AgentActivity";
import SummaryCards from "./components/SummaryCards";
import IssueCard from "./components/IssueCard";
import Recommendation from "./components/Recommendation";

import "./App.css";

function App() {

    const [document, setDocument] = useState("");
    const [framework, setFramework] = useState("GDPR");

    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const checkCompliance = async () => {

        if (!document.trim()) {
            setError("Please enter a document before starting the analysis.");
            return;
        }

        try {

            setLoading(true);
            setError("");
            setResult(null);

            const response = await axios.post(
                "http://localhost:5000/api/compliance/check",
                {
                    document,
                    framework,
                }
            );

            console.log("API RESPONSE:", response.data);

            setResult(response.data.data);

        } catch (error) {

            console.error("FULL ERROR:", error);

            setError(
                error.response?.data?.error ||
                error.response?.data?.message ||
                error.message ||
                "Compliance check failed."
            );

        } finally {

            setLoading(false);

        }
    };

    const resetProject = () => {

        setDocument("");

        setFramework("GDPR");

        setResult(null);

        setError("");
    };

    const issues = result?.issues || [];

    return (

        <div className="app-layout">

            {/* ================= SIDEBAR ================= */}

            <Sidebar
                document={document}
                setDocument={setDocument}
                framework={framework}
                setFramework={setFramework}
                onCheck={checkCompliance}
                onReset={resetProject}
                loading={loading}
            />

            {/* ================= MAIN CONTENT ================= */}

            <main className="main-content">

                {/* Top bar */}
                <header className="topbar">

                    <div>
                        <span className="eyebrow">
                            AI-POWERED ANALYSIS
                        </span>

                        <h2>
                            Compliance Dashboard
                        </h2>

                        <p>
                            Analyze organizational documents against selected
                            compliance requirements.
                        </p>
                    </div>

                    <div className="framework-pill">
                        <ShieldCheck size={16} />
                        {framework}
                    </div>

                </header>

                {/* Error */}
                {error && (

                    <div className="error-banner">

                        <AlertCircle size={19} />

                        <span>{error}</span>

                    </div>

                )}

                {/* ================= EMPTY STATE ================= */}

                {!result && !loading && (

                    <section className="welcome-panel">

                        <div className="welcome-icon">
                            <ShieldCheck size={42} />
                        </div>

                        <span className="welcome-label">
                            AGENTIC COMPLIANCE ENGINE
                        </span>

                        <h1>
                            Turn compliance review into an
                            <span> automated workflow.</span>
                        </h1>

                        <p>
                            Add a document from the sidebar, select a framework,
                            and let the AI agent identify risks, explain issues,
                            and recommend fixes.
                        </p>

                        <div className="welcome-features">

                            <div>
                                <ShieldCheck size={17} />
                                Framework-aware analysis
                            </div>

                            <div>
                                <BarChart3 size={17} />
                                Risk classification
                            </div>

                            <div>
                                <AlertCircle size={17} />
                                Actionable fixes
                            </div>

                        </div>

                    </section>

                )}

                {/* ================= LOADING ================= */}

                {loading && (

                    <section className="loading-panel">

                        <div className="loader-ring" />

                        <h3>
                            AI Agent is analyzing the document
                        </h3>

                        <p>
                            Checking the selected compliance framework and
                            generating the assessment...
                        </p>

                    </section>

                )}

                {/* ================= RESULTS ================= */}

                {result && !loading && (

                    <div className="results-container">

                        {/* Agent Activity */}
                        <AgentActivity
                            steps={result.agentSteps || []}
                            loading={loading}
                        />

                        {/* Summary */}
                        <SummaryCards
                            result={result}
                        />

                        {/* Issues */}
                        <section className="panel">

                            <div className="panel-header">

                                <div className="panel-title-wrap">

                                    <div className="panel-icon issue-icon">
                                        <AlertCircle size={20} />
                                    </div>

                                    <div>
                                        <h2>Compliance Issues</h2>

                                        <p>
                                            {issues.length} issue
                                            {issues.length !== 1 ? "s" : ""}
                                            {" "}identified by the agent
                                        </p>
                                    </div>

                                </div>

                                <div className="issue-count">
                                    {issues.length}
                                </div>

                            </div>

                            {issues.length > 0 ? (

                                <div className="issues-list">

                                    {issues.map((issue, index) => (

                                        <IssueCard
                                            key={index}
                                            issue={issue}
                                            index={index}
                                        />

                                    ))}

                                </div>

                            ) : (

                                <div className="no-issues">

                                    <ShieldCheck size={32} />

                                    <h3>
                                        No compliance issues found
                                    </h3>

                                    <p>
                                        The document passed the configured
                                        compliance checks.
                                    </p>

                                </div>

                            )}

                        </section>

                        {/* Recommendation */}
                        <Recommendation
                            text={result.overallRecommendation}
                        />

                    </div>

                )}

                <footer className="footer">
                    AI Compliance Checker • Agentic AI Prototype
                </footer>

            </main>

        </div>
    );
}

export default App;