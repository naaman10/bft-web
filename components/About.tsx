interface AboutProps {
  headline: string;
  body: string;
}

export function About({ headline, body }: AboutProps) {
  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-800/50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
          {headline}
        </h2>
        <div className="mt-8 prose prose-slate dark:prose-invert prose-lg mx-auto">
          <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line">
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}
