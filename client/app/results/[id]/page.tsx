import ResultsDisplay from "../../components/ResultsDisplay";

export default async function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="app-shell">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="space-y-4">
          <div className="eyebrow">Results Intelligence</div>
          <h1 className="section-heading">Assessment Results</h1>
          <p className="section-subtext">
            Based on your inputs, we have classified your organization using the Cloud Cube Model.
          </p>
        </div>
        <ResultsDisplay id={id} />
      </div>
    </div>
  );
}
