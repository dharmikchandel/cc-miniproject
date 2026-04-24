import AssessmentForm from "../components/AssessmentForm";

export default function AssessPage() {
  return (
    <div className="app-shell">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-4">
          <div className="eyebrow">Assessment Console</div>
          <h1 className="section-heading">Cloud Cube Model Assessment</h1>
          <p className="section-subtext">
            Please fill out your organizational details below. Our decision intelligence engine will classify your inputs using the Cloud Cube Model and recommend the most suitable cloud business model.
          </p>
        </div>
        <AssessmentForm />
      </div>
    </div>
  );
}
