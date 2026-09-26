import {
    Lightbulb,
    ArrowRight,
} from "lucide-react";

function Recommendation({ text }) {

    return (
        <section className="recommendation-card">

            <div className="recommendation-icon">
                <Lightbulb size={23} />
            </div>

            <div className="recommendation-content">

                <div className="recommendation-heading">
                    <div>
                        <span>FINAL ASSESSMENT</span>
                        <h2>Overall Recommendation</h2>
                    </div>

                    <ArrowRight size={21} />
                </div>

                <p>
                    {text}
                </p>

            </div>

        </section>
    );
}

export default Recommendation;