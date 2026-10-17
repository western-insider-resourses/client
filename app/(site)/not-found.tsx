import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="card mx-auto max-w-lg p-10 text-center">
      <h1 className="font-serif text-3xl font-bold">We couldn't find that page</h1>
      <p className="mt-2 text-mute">The story may have been moved or removed.</p>
      <Link href="/" className="btn btn-primary mt-6">Back to latest stories</Link>
    </div>
  );
}
