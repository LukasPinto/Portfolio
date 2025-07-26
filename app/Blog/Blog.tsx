
import { Card } from "@chakra-ui/react";
import { getAllMdxFiles, getFileBySlug } from "../utils/mdxFiles"

export default async function Blog() {
  const filemdx = await getFileBySlug({ slug: 'hola.mdx' })
  const posts = await getAllMdxFiles();

  return (<>
    {console.log(posts)}
    {posts.map((item, index) => (
      <Card.Root key={index}>
        <Card.Body>
          <Card.Title>
            {item.matter.title}
          </Card.Title>
        </Card.Body>

      </Card.Root>
    ))}
  </>)
}
