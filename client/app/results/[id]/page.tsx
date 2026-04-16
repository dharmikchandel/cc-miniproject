import ResultsDisplay from '../../components/ResultsDisplay';

export default async function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="container mx-auto py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Assessment Results</h1>
          <p className="text-muted-foreground text-lg">
            Based on your inputs, we have classified your organization using the Cloud Cube Model.
          </p>
        </div>
        <ResultsDisplay id={id} />
      </div>
    </div>
  );
}
