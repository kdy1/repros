import { Mdx } from "../../components/MDXComponents";
import { allDocs } from "contentlayer/generated";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { paramCase } from "param-case";

interface DocPageProps {
  params: {
    slug?: string[];
  };
}

// for info visit: https://nextjs.org/docs/messages/app-static-to-dynamic-error
export const dynamic = "force-dynamic";

const publishedDocs = allDocs.filter((doc) => !doc.unpublished);

export async function generateStaticParams() {
  const docsSlugs = publishedDocs.map((doc) => ({
    slug: [doc._raw.flattenedPath],
  }));

  return docsSlugs;
}

function getDocFromParams(params: DocPageProps["params"]) {
  const slug = params.slug?.join("/") || "";

  return publishedDocs.find((doc) => doc.slug === slug);
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = getDocFromParams(params);

  if (!doc) {
    return {};
  }

  return {
    title: doc.title,
    description: doc.description,
    twitter: {
      title: doc.title,
      description: doc.description,
    },
    openGraph: {
      title: doc.title,
      description: doc.description,
    },
    robots: {
      index: doc.no_index ? false : true,
    },
  };
}

export default async function DocPage({ params }: DocPageProps) {
  // Display homepage is no slug is provided
  if (!params.slug) {
    return notFound();
  }

  const doc = getDocFromParams(params);

  if (!doc) {
    return notFound();
  }

  return (
    <>
      <div className="page lg:gap-10">
        <article className="prose col-span-9 scroll-mt-4 dark:prose-invert">
          <div className="mb-6 max-w-none">
            {doc.slug && (
              <h1 className="mb-1 max-w-none text-5xl font-bold tracking-tight"
                id={paramCase(doc.title)}
              >
                {doc.title}
              </h1>
            )}
            <p className="mt-4 text-xl leading-relaxed">
              {doc.description}
            </p>
          </div>
          <Mdx code={doc.body.code} />
        </article>
      </div>
    </>
  );
}