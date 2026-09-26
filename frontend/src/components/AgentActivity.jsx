import {
    Bot,
    CheckCircle2,
    LoaderCircle,
} from "lucide-react";

function AgentActivity({ steps = [], loading = false }) {
    return (
        <section className="panel">

            <div className="panel-header">

                <div className="panel-title-wrap">

                    <div className="panel-icon agent-icon">
                        <Bot size={20} />
                    </div>

                    <div>
                        <h2>Agent Activity</h2>
                        <p>
                            Execution flow of the compliance agent
                        </p>
                    </div>

                </div>

                {loading && (
                    <LoaderCircle
                        className="spin"
                        size={20}
                    />
                )}

            </div>

            <div className="agent-timeline">

                {steps.length === 0 ? (
                    <div className="empty-activity">
                        <Bot size={28} />
                        <p>
                            Agent activity will appear here after analysis.
                        </p>
                    </div>
                ) : (
                    steps.map((step, index) => (
                        <div
                            className="timeline-step"
                            key={`${step}-${index}`}
                        >
                            <div className="timeline-check">
                                <CheckCircle2 size={17} />
                            </div>

                            <div className="timeline-content">

                                <span className="step-number">
                                    STEP {index + 1}
                                </span>

                                <p>{step}</p>

                            </div>
                        </div>
                    ))
                )}

            </div>

        </section>
    );
}

export default AgentActivity;