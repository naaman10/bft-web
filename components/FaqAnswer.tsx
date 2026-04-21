import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import type { Document } from "@contentful/rich-text-types";
import type { ReactNode } from "react";
import Image from "next/image";

function assetUrl(url: string): string {
  if (url.startsWith("//")) return `https:${url}`;
  return url;
}

const options = {
  renderMark: {
    [MARKS.BOLD]: (text: ReactNode) => <strong className="font-semibold">{text}</strong>,
    [MARKS.ITALIC]: (text: ReactNode) => <em>{text}</em>,
    [MARKS.UNDERLINE]: (text: ReactNode) => (
      <span className="underline">{text}</span>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node: unknown, children: ReactNode) => (
      <p className="mb-3 text-slate-600 last:mb-0">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (_node: unknown, children: ReactNode) => (
      <h3 className="mt-4 text-lg font-semibold text-slate-900 first:mt-0">{children}</h3>
    ),
    [BLOCKS.HEADING_3]: (_node: unknown, children: ReactNode) => (
      <h4 className="mt-3 text-base font-semibold text-slate-900">{children}</h4>
    ),
    [BLOCKS.HEADING_4]: (_node: unknown, children: ReactNode) => (
      <h5 className="mt-3 text-sm font-semibold text-slate-900">{children}</h5>
    ),
    [BLOCKS.HEADING_5]: (_node: unknown, children: ReactNode) => (
      <h6 className="mt-2 text-sm font-semibold text-slate-800">{children}</h6>
    ),
    [BLOCKS.HEADING_6]: (_node: unknown, children: ReactNode) => (
      <h6 className="mt-2 text-sm font-medium text-slate-800">{children}</h6>
    ),
    [BLOCKS.UL_LIST]: (_node: unknown, children: ReactNode) => (
      <ul className="mb-3 list-disc space-y-1 pl-5 text-slate-600">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node: unknown, children: ReactNode) => (
      <ol className="mb-3 list-decimal space-y-1 pl-5 text-slate-600">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node: unknown, children: ReactNode) => (
      <li className="pl-0.5">{children}</li>
    ),
    [INLINES.HYPERLINK]: (node: { data?: { uri?: string } }, children: ReactNode) => {
      const uri = node.data?.uri ?? "#";
      const external = /^https?:\/\//i.test(uri);
      return (
        <a
          href={uri}
          className="font-medium text-primary-600 underline decoration-primary-600/30 underline-offset-2 hover:text-primary-700"
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
    [BLOCKS.EMBEDDED_ASSET]: (node: {
      data?: { target?: { fields?: { file?: { url?: string; contentType?: string }; title?: string; description?: string } } };
    }) => {
      const file = node.data?.target?.fields?.file;
      const url = file?.url;
      if (!url) return null;
      const href = assetUrl(url);
      const title = node.data?.target?.fields?.title ?? "";
      const isImage = file.contentType?.startsWith("image/");
      if (isImage) {
        return (
          <span className="my-4 block overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <Image
              src={href}
              alt={title || "FAQ image"}
              width={960}
              height={540}
              className="h-auto w-full object-cover"
            />
          </span>
        );
      }
      return (
        <p className="mb-3">
          <a
            href={href}
            className="font-medium text-primary-600 underline hover:text-primary-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            {title || "Download"}
          </a>
        </p>
      );
    },
  },
};

export function FaqAnswer({ document }: { document: Document }) {
  return (
    <div className="text-left text-base leading-relaxed">
      {documentToReactComponents(document, options)}
    </div>
  );
}
