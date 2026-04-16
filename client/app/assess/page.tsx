import AssessmentForm from '../components/AssessmentForm';

export default function AssessPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Cloud Cube Model Assessment</h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Please fill out your organizational details below. Our decision intelligence engine will classify your inputs using the Cloud Cube Model and recommend the most suitable cloud business model.
          </p>
        </div>
        <AssessmentForm />
      </div>
    </div>
  );
}
