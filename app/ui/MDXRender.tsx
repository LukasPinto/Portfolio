import { MDXRemote } from "next-mdx-remote-client/rsc";
import { useMDXComponents } from "@/mdx-components";
import type { post } from "../utils/mdxFiles";
import { type MDXRemoteOptions } from "next-mdx-remote-client/rsc";
export default function MDXRender({
  file,
  opts,
}: {
  file: post;
  opts: MDXRemoteOptions;
}) {
  return (
    <MDXRemote
      source={file.source}
      components={useMDXComponents({})}
      options={opts}
    />
  );
}
