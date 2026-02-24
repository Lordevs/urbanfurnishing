import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface LegalContentProps {
  content: string;
}

export function LegalContent({ content }: LegalContentProps) {
  return (
    <div className="min-h-screen py-16 md:py-24 px-4 sm:px-6 md:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-accent-foreground prose-p:text-muted-foreground prose-strong:text-accent-foreground prose-li:text-muted-foreground prose-a:text-primary hover:prose-a:underline">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
