"use client";
import { Toc } from "@stefanprobst/remark-extract-toc";
import { TreeView, createTreeCollection, Box } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import useActiveSection from "@/app/hooks/useActiveSection";
import { FaRegCircle, FaCircle } from "react-icons/fa";

interface Node {
  id: string;
  name: string;
  children?: Node[];
}

function convertNode(originalNode: any): Node {
  const newNode: Node = {
    id: originalNode.id,
    name: originalNode.value, // 'value' en el original se convierte en 'name'
  };

  // Si el nodo original tiene hijos, los mapeamos recursivamente
  if (originalNode.children && originalNode.children.length > 0) {
    newNode.children = originalNode.children.map(convertNode);
  }

  return newNode;
}

function convertToNodes(originalNodes: Toc[]): Node[] {
  return originalNodes.map(convertNode);
}

const extractAllSectionIds = (nodes: any): string[] => {
  let ids: string[] = [];
  nodes.forEach((node: any) => {
    ids.push(node.id);
    if (node.children && node.children.length > 0) {
      ids = ids.concat(extractAllSectionIds(node.children));
    }
  });
  return ids;
};

export default function TableOfContent({ content, matter, slug }: any) {
  const tableOfContentsData: any[] = [];
  const allSectionsIds = useMemo(
    () => extractAllSectionIds(content),
    [content]
  );

  const activeSectionId = useActiveSection(allSectionsIds, "") as any | "";
  // useEffect(() => {
  //   console.log(matter, slug);
  // }, [activeSectionId]);
  const convertedData: Node[] = convertToNodes(content as any);

  const toc = createTreeCollection<Node>({
    nodeToValue: (node) => node.id,
    nodeToString: (node) => node.name,
    rootNode: { id: "ROOT", name: "", children: convertedData },
  });
  //el exanpedValue guarda los que estan abierto/expandidos
  const [expandedValue, setExpandedValue] = useState<string[]>(allSectionsIds);
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
          <TreeView.Label>{matter?.title}</TreeView.Label>
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
