"use client";
import {
  ButtonGroup,
  IconButton,
  Pagination,
  Stack,
  Box,
  Link,
  Card,
  Image,
  Badge,
} from "@chakra-ui/react";
import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import { FaRegCalendar } from "react-icons/fa";
import { post } from "../utils/mdxFiles";

export default function PaginationUI({ posts }: { posts: post[] }) {
  const pageSize = 4;
  const count = posts.length;
  const [page, setPage] = useState(1);

  const startRange = (page - 1) * pageSize;
  const endRange = startRange + pageSize;

  const visibleItems = posts.slice(startRange, endRange);

  return (
    <>
      <Stack
        paddingY={{ base: "2" }}
        maxWidth="lvw"
        width="lvw"
        overflowX="scroll"
        paddingX={10}
      >
        <Stack gap={4} alignContent="start" minHeight="52rem">
          {visibleItems.map((item: post) => (
            <Card.Root
              margin={0}
              zIndex={2} // si es negativo no hace hover
              key={item.slug}
              flexDirection="row"
              transition="all 0.2s ease-in-out" // Aplica la transición a todas las propiedades que cambien
              _hover={{
                bg: "gray.900", // Cambia el color de fondo
                transform: "scale(1.02)", // Escala el componente
                boxShadow: "lg", // Agrega una sombra
              }}
              minWidth="32rem"
              width="full"
              minHeight="11rem"
              maxHeight="12rem"
              overflow="clip"
              textWrap="pretty"
            >
              <Link
                variant="plain"
                textDecoration="none"
                href={`/Blog/${item.slug}`}
                width="full"
                maxHeight="11rem"
                overflowX="clip"
                margin="2"
              >
                <Image
                  h="full"
                  width="32rem"
                  minWidth="12rem"
                  objectFit="fill"
                  src={`${item.matter.image.path}`}
                  alt="Caffe Latte"
                  borderRadius="md"
                />
                <Box width="60%" minWidth="60%">
                  <Card.Body minHeight="100%">
                    <Card.Title textWrap="wrap">{item.matter.title}</Card.Title>
                    <Card.Description lineClamp="3">
                      {item.matter.description}
                    </Card.Description>
                  </Card.Body>
                  <Card.Footer maxHeight="100%">
                    <Box display="flex" gap="2" minHeight="full">
                      <Badge>
                        <FaRegCalendar />
                        {item.matter.date.split(" ")[0].replaceAll("-", "/")}
                      </Badge>

                      {item.matter.categories.map((category: string) => (
                        <Badge key={category}>{category}</Badge>
                      ))}
                    </Box>
                  </Card.Footer>
                </Box>
              </Link>
            </Card.Root>
          ))}
        </Stack>
        <Box>
          <Pagination.Root
            count={count}
            pageSize={pageSize}
            page={page}
            onPageChange={(e) => setPage(e.page)}
            display="flex"
            justifyContent="center"
          >
            <ButtonGroup variant="ghost" size="sm">
              <Pagination.PrevTrigger asChild>
                <IconButton>
                  <HiChevronLeft />
                </IconButton>
              </Pagination.PrevTrigger>

              <Pagination.Items
                render={(page) => (
                  <IconButton variant={{ base: "outline", _selected: "solid" }}>
                    {page.value}
                  </IconButton>
                )}
              />

              <Pagination.NextTrigger asChild>
                <IconButton>
                  <HiChevronRight />
                </IconButton>
              </Pagination.NextTrigger>
            </ButtonGroup>
          </Pagination.Root>
        </Box>
      </Stack>
    </>
  );
}
