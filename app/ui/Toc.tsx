"use client";
import { TreeView, createTreeCollection, Box } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import useActiveSection from "@/app/hooks/useActiveSection";
import { FaRegCircle, FaCircle } from "react-icons/fa";
import { Node } from "@/app/utils/mdxFiles";
import { matter } from "@/app/utils/mdxFiles";
const extractAllSectionIds = (nodes: Node[]): string[] => {
  let ids: string[] = [];
  nodes.forEach((node: Node) => {
    ids.push(node.id);
    if (node.children && node.children.length > 0) {
      ids = ids.concat(extractAllSectionIds(node.children));
    }
  });
  return ids;
};

export default function TableOfContent({
  content,
  matter,
  slug,
}: {
  content: Node[];
  matter: matter;
  slug: string;
}) {
  const allSectionsIds = useMemo(
    () => extractAllSectionIds(content),
    [content]
  );
  const activeSectionId = useActiveSection(allSectionsIds) as string;
  // useEffect(() => {
  //   console.log(matter, slug);
  // }, [activeSectionId]);

  const toc = createTreeCollection<Node>({
    nodeToValue: (node) => node.id,
    nodeToString: (node) => node.name,
    rootNode: { id: "ROOT", name: "", children: content },
  });
  //el exanpedValue guarda los que estan abierto/expandidos
  const [expandedValue] = useState<string[]>(allSectionsIds);
  return (
    <>
      <Box
        alignSelf="start"
        display={{
          base: "none",
          sm: "none",
          md: "none",
          lg: "block",
        }}
        position="sticky"
        top="4rem"
        paddingY={2}
      >
        <TreeView.Root
          collection={toc}
          maxW="sm"
          selectedValue={[activeSectionId]}
          expandedValue={expandedValue}
        >
          <TreeView.Label>{matter?.title as string}</TreeView.Label>
          <TreeView.Tree>
            <TreeView.Node
              indentGuide={<TreeView.BranchIndentGuide />}
              render={({ node, nodeState }) =>
                nodeState.isBranch ? (
                  <a href={`/Blog/${slug}#${node.id}`}>
                    <TreeView.BranchControl>
                      {node.id == activeSectionId.toString() ? (
                        <FaCircle></FaCircle>
                      ) : (
                        <FaRegCircle />
                      )}
                      <TreeView.BranchText>{node.name}</TreeView.BranchText>
                    </TreeView.BranchControl>
                  </a>
                ) : (
                  <TreeView.Item asChild>
                    <a href={`/Blog/${slug}#${node.id}`}>
                      {node.id == activeSectionId.toString() ? (
                        <FaCircle></FaCircle>
                      ) : (
                        <FaRegCircle />
                      )}
                      <TreeView.ItemText>{node.name}</TreeView.ItemText>
                    </a>
                  </TreeView.Item>
                )
              }
            />
          </TreeView.Tree>
        </TreeView.Root>
      </Box>
    </>
  );
}
