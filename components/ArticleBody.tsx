import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import type { Document } from "@contentful/rich-text-types";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

function assetUrl(url: string): string {
  if (url.startsWith("//")) return `https:${url}`;
  return url;
}

function imageAlt(title?: string, description?: string): string {
  const descriptionText = description?.trim();
  if (descriptionText) return descriptionText;
  const titleText = title?.trim();
  if (!titleText || /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(titleText)) return "";
  return titleText;
}

type EmbeddedAsset = {
  fields?: {
    title?: string;
    description?: string;
    file?: {
      url?: string;
      contentType?: string;
      details?: { image?: { width?: number; height?: number } };
    };
  };
};

function renderImage(asset: EmbeddedAsset) {
  const file = asset.fields?.file;
  const url = file?.url;
  if (!url || !file.contentType?.startsWith("image/")) return null;
  const alt = imageAlt(asset.fields?.title, asset.fields?.description);
  const width = file.details?.image?.width ?? 1200;
  const height = file.details?.image?.height ?? 675;
  return (
    <span className="my-8 block overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
      <Image
        src={assetUrl(url)}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full"
        sizes="(max-width: 768px) 100vw, 720px"
      />
    </span>
  );
}

const options = {
  renderMark: {
    [MARKS.BOLD]: (text: ReactNode) => <strong className="font-semibold">{text}</strong>,
    [MARKS.ITALIC]: (text: ReactNode) => <em>{text}</em>,
    [MARKS.UNDERLINE]: (text: ReactNode) => <span className="underline">{text}</span>,
    [MARKS.CODE]: (text: ReactNode) => (
      <code className="rounded bg-slate-100 px-1 py-0.5 text-[0.9em]">{text}</code>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node: unknown, children: ReactNode) => (
      <p className="mb-4 text-lg leading-relaxed text-slate-700 last:mb-0">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (_node: unknown, children: ReactNode) => (
      <h2 className="mt-10 text-2xl font-bold text-slate-900 first:mt-0">{children}</h2>
    ),
    [BLOCKS.HEADING_2]: (_node: unknown, children: ReactNode) => (
      <h2 className="mt-10 text-2xl font-bold text-slate-900 first:mt-0">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node: unknown, children: ReactNode) => (
      <h3 className="mt-8 text-xl font-bold text-slate-900">{children}</h3>
    ),
    [BLOCKS.HEADING_4]: (_node: unknown, children: ReactNode) => (
      <h4 className="mt-6 text-lg font-semibold text-slate-900">{children}</h4>
    ),
    [BLOCKS.HEADING_5]: (_node: unknown, children: ReactNode) => (
      <h5 className="mt-6 text-base font-semibold text-slate-900">{children}</h5>
    ),
    [BLOCKS.HEADING_6]: (_node: unknown, children: ReactNode) => (
      <h6 className="mt-4 text-base font-semibold text-slate-800">{children}</h6>
    ),
    [BLOCKS.UL_LIST]: (_node: unknown, children: ReactNode) => (
      <ul className="mb-4 list-disc space-y-2 pl-5 text-lg text-slate-700">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node: unknown, children: ReactNode) => (
      <ol className="mb-4 list-decimal space-y-2 pl-5 text-lg text-slate-700">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node: unknown, children: ReactNode) => <li>{children}</li>,
    [BLOCKS.QUOTE]: (_node: unknown, children: ReactNode) => (
      <blockquote className="my-6 border-l-4 border-primary-400 pl-4 text-lg text-slate-700">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="my-8 border-slate-200" />,
    [INLINES.HYPERLINK]: (node: { data?: { uri?: string } }, children: ReactNode) => {
      const uri = node.data?.uri ?? "#";
      if (uri.startsWith("/") && !uri.startsWith("//")) {
        return (
          <Link
            href={uri}
            className="font-medium text-primary-600 underline decoration-primary-600/30 underline-offset-2 hover:text-primary-700"
          >
            {children}
          </Link>
        );
      }
      const external = /^https?:\/\//i.test(uri);
      return (
        <a
          href={uri}
          className="font-medium text-primary-600 underline decoration-primary-600/30 underline-offset-2 hover:text-primary-700"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
    [INLINES.ENTRY_HYPERLINK]: (
      node: { data?: { target?: { fields?: { slug?: string; title?: string } } } },
      children: ReactNode
    ) => {
      const slug = node.data?.target?.fields?.slug?.trim().toLowerCase();
      if (!slug) return <>{children}</>;
      return (
        <Link
          href={`/resources/${slug}`}
          className="font-medium text-primary-600 underline decoration-primary-600/30 underline-offset-2 hover:text-primary-700"
        >
          {children}
        </Link>
      );
    },
    [BLOCKS.EMBEDDED_ASSET]: (node: { data?: { target?: EmbeddedAsset } }) => {
      const asset = node.data?.target;
      if (!asset) return null;
      const image = renderImage(asset);
      if (image) return image;
      const file = asset.fields?.file;
      if (!file?.url) return null;
      return (
        <p className="mb-4">
          <a
            href={assetUrl(file.url)}
            className="font-medium text-primary-600 underline hover:text-primary-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            {asset.fields?.title?.trim() || "Download"}
          </a>
        </p>
      );
    },
  },
};

export function ArticleBody({ document }: { document: Document }) {
  return (
    <div className="max-w-3xl text-left">{documentToReactComponents(document, options)}</div>
  );
}
