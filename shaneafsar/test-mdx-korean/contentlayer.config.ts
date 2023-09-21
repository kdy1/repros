import {
    defineDocumentType,
    makeSource,
    defineNestedType,
  } from "contentlayer/source-files";
  import rehypeSlug from "rehype-slug";
  
  export const Doc = defineDocumentType(() => ({
    name: "Doc",
    description: "Base document type",
    filePathPattern: `pages/**/*.mdx`,
    contentType: "mdx",
    fields: {
      title: {
        type: "string",
        required: true,
        description: "Page h1 and title metadata.",
      },
      slug: {
        type: "string",
        required: true,
        description: "Page URL (independent from the filename).",
      },
      description: {
        type: "string",
        required: true,
        description: "Page lede and description metadata.",
      },
      navigation: {
        type: "string",
        default: "default",
        description: "Deprecated.",
      },
      gate: {
        type: "string",
        description:
          "The gate that must be passed to access this page needs to a string that matches the GateType", // see @ts/gate for the an enum of available gates
      },
      unpublished: {
        type: "boolean",
        default: false,
        description: "Indicates whether a page should NOT be published.",
      },
      no_index: {
        type: "boolean",
        default: false,
        description:
          "Indicates that a page is published but NOT present in sitemap and not indexed.",
      },
      redirect_from: {
        type: "list",
        of: {
          type: "string",
        },
        description: "List of old URLs that will be redirected to `slug`.",
      },
      // These are temporary extra fields that may occur in the UI libraries section
      // We should create separate collections for different types of content after cleaning up.
      flavor: {
        type: "enum",
        options: ["android", "angular", "flutter", "ios", "js", "react", "vue"],
        description: "The InstantSearch variant.",
      },
      short_description: {
        type: "string",
        description: "Deprecated. Use the `description` field instead.",
      },
      storybook_link: {
        type: "string",
        description: "URL to the Storybook page for an InstantSearch widget.",
      },
      demo_link: {
        type: "string",
        description: "URL to a demo for a widget or component.",
      },
      sandpack_link: {
        type: "string",
        description: "Link to an interactive code sandbox.",
      },
    },
  }));
  
  
  export default makeSource(async () => ({
    contentDirPath: "./content",
    documentTypes: [Doc],
    mdx: {
      rehypePlugins: [rehypeSlug],
    },
  }));
  