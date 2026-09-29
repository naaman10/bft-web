import Link from "next/link";

export type BreadcrumbItem = {
  name: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: readonly BreadcrumbItem[];
  tone?: "on-dark" | "on-light";
};

export function Breadcrumbs({ items, tone = "on-dark" }: BreadcrumbsProps) {
  const linkClass =
    tone === "on-dark"
      ? "text-white/80 hover:text-white"
      : "text-slate-500 hover:text-primary-600";
  const currentClass = tone === "on-dark" ? "text-white" : "text-slate-800";
  const separatorClass = tone === "on-dark" ? "text-white/50" : "text-slate-300";

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.name}-${index}`} className="flex items-center gap-2">
              {index > 0 ? (
                <span className={separatorClass} aria-hidden>
                  /
                </span>
              ) : null}
              {item.href && !isLast ? (
                <Link href={item.href} className={linkClass}>
                  {item.name}
                </Link>
              ) : (
                <span className={currentClass} aria-current={isLast ? "page" : undefined}>
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
