import { cn } from "@/lib/utils";

interface PassportStampProps {
  children: React.ReactNode;
  tone?: "ink" | "primary";
  rotation?: "1" | "2" | "3";
  className?: string;
}

const rotationClass: Record<string, string> = {
  "1": "stamp-rotate-1",
  "2": "stamp-rotate-2",
  "3": "stamp-rotate-3",
};

export function PassportStamp({
  children,
  tone = "ink",
  rotation = "1",
  className,
}: PassportStampProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border-[1.5px] border-dashed px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.08em]",
        tone === "ink"
          ? "border-ink/40 text-ink"
          : "border-primary/50 text-primary",
        rotationClass[rotation],
        className
      )}
    >
      {children}
    </span>
  );
}
