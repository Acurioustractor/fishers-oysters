interface QuoteBlockProps {
  quote: string;
  attribution: string;
}

export default function QuoteBlock({ quote, attribution }: QuoteBlockProps) {
  return (
    <div className="quote-block max-w-4xl mx-auto text-center">
      <blockquote>
        &ldquo;{quote}&rdquo;
      </blockquote>
      <p className="quote-attribution">
        &mdash; {attribution}
      </p>
    </div>
  );
}
