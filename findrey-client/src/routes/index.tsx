import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <div className="p-8 max-w-xl mx-auto text-center space-y-4">
      <h1 className="text-3xl font-extrabold tracking-tight">FinDrey</h1>
      <p className="text-muted-foreground">The premium personal finance app for your family.</p>
    </div>
  );
}
