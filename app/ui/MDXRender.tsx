import { MDXRemote } from "next-mdx-remote-client/rsc";
import { useMDXComponents } from "@/mdx-components";
import type { Post } from "@/app/types/mdx";
import { type MDXRemoteOptions } from "next-mdx-remote-client/rsc";

export default function MDXRender({
  file,
  opts,
}: {
  file: Post;
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
