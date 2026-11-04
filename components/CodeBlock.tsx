type CodeBlockProps = { code: string };

export function CodeBlock({ code }: CodeBlockProps) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 font-mono text-sm leading-relaxed text-slate-100">
      <code>{code}</code>
    </pre>
  );
}
