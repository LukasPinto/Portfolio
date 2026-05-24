"use client";

import {
  ButtonGroup,
  IconButton,
  Pagination,
  SimpleGrid,
  Box,
  Link,
  Card,
  Image,
  Badge,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { FaRegCalendar, FaThumbtack } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import type { PostSummary } from "@/app/types/mdx";
import type { BlogSearchDocument } from "@/app/types/mdx";
import { useMounted } from "@/app/hooks/useMounted";
import BlogSearch, { useBlogSearch } from "./BlogSearch";

const MotionCard = motion.create(Card.Root);

function formatDate(date: string) {
  return date.split(" ")[0].replaceAll("-", "/");
}

function BlogCard({
  item,
  index,
  animated,
}: {
  item: PostSummary;
  index: number;
  animated: boolean;
}) {
  const cardProps = {
    flexDirection: "column" as const,
    borderColor: "border",
    bg: "bg.subtle",
    overflow: "hidden" as const,
    height: "full",
    ...(animated
      ? {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: index * 0.08 },
          whileHover: {
            y: -4,
            boxShadow: "0 8px 32px rgba(34, 211, 238, 0.15)",
            borderColor: "var(--chakra-colors-cyan-700)",
          },
        }
      : {}),
  };

  const CardComponent = animated ? MotionCard : Card.Root;

  return (
    <CardComponent {...cardProps}>
      <Link
        variant="plain"
        textDecoration="none"
        href={`/Blog/${item.slug}`}
        width="full"
        height="full"
        display="flex"
        flexDirection="column"
        _hover={{ textDecoration: "none" }}
      >
        <Box position="relative" overflow="hidden">
          <Image
            height={{ base: "12rem", md: "14rem" }}
            width="full"
            objectFit="cover"
            src={item.matter.image.path}
            alt={item.matter.title}
            transition="transform 0.4s ease"
            _groupHover={{ transform: "scale(1.05)" }}
          />
          <Box
            position="absolute"
            inset={0}
            bgGradient="to-t"
            gradientFrom="rgba(0,0,0,0.7)"
            gradientVia="transparent"
            gradientTo="transparent"
            pointerEvents="none"
          />
          {item.matter.pin && (
            <Badge
              position="absolute"
              top={3}
              right={3}
              colorPalette="cyan"
              variant="solid"
            >
              <FaThumbtack />
              Destacado
            </Badge>
          )}
        </Box>
        <Card.Body gap={2} flex={1}>
          <Card.Title textWrap="wrap" colorPalette="cyan">
            {item.matter.title}
          </Card.Title>
          <Card.Description lineClamp="3" color="fg.muted">
            {item.matter.description}
          </Card.Description>
        </Card.Body>
        <Card.Footer flexWrap="wrap" gap={2}>
          <Badge colorPalette="cyan" variant="subtle">
            <FaRegCalendar />
            {formatDate(item.matter.date)}
          </Badge>
          {item.matter.categories.map((cat) => (
            <Badge key={cat} variant="outline">
              {cat}
            </Badge>
          ))}
          {item.matter.tags?.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="subtle" colorPalette="teal" size="sm">
              {tag}
            </Badge>
          ))}
        </Card.Footer>
      </Link>
    </CardComponent>
  );
}

function PostGrid({
  items,
  animated,
}: {
  items: PostSummary[];
  animated: boolean;
}) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} width="full">
      {items.map((item, index) => (
        <BlogCard key={item.slug} item={item} index={index} animated={animated} />
      ))}
    </SimpleGrid>
  );
}

type BlogListingProps = {
  posts: PostSummary[];
  searchDocuments: BlogSearchDocument[];
};

export default function BlogListing({ posts, searchDocuments }: BlogListingProps) {
  const mounted = useMounted();
  const pageSize = 4;
  const [page, setPage] = useState(1);
  const { query, category, setQuery, setCategory, filtered, resultCount } =
    useBlogSearch(searchDocuments);

  const handleQueryChange = (q: string) => {
    setQuery(q);
    setPage(1);
  };

  const handleCategoryChange = (c: string | null) => {
    setCategory(c);
    setPage(1);
  };

  const slugOrder = new Map(filtered.map((doc, i) => [doc.slug, i]));
  const filteredPosts = posts
    .filter((post) => slugOrder.has(post.slug))
    .sort((a, b) => (slugOrder.get(a.slug) ?? 0) - (slugOrder.get(b.slug) ?? 0));

  const isFiltering = Boolean(query.trim() || category);
  const pinnedPosts = isFiltering ? [] : filteredPosts.filter((p) => p.matter.pin);
  const gridPosts = isFiltering
    ? filteredPosts
    : filteredPosts.filter((p) => !p.matter.pin);

  const count = gridPosts.length;
  const startRange = (page - 1) * pageSize;
  const visibleItems = gridPosts.slice(startRange, startRange + pageSize);

  const grid = <PostGrid items={visibleItems} animated={mounted} />;

  return (
    <Stack paddingY={4} width="full" gap={6}>
      <BlogSearch
        documents={searchDocuments}
        query={query}
        category={category}
        onQueryChange={handleQueryChange}
        onCategoryChange={handleCategoryChange}
        resultCount={resultCount}
      />

      {pinnedPosts.length > 0 && (
        <Stack gap={3}>
          <Heading size="lg" colorPalette="cyan">
            Destacados
          </Heading>
          <PostGrid items={pinnedPosts} animated={mounted} />
        </Stack>
      )}

      {pinnedPosts.length > 0 && (
        <Heading size="lg" colorPalette="cyan">
          Todos los artículos
        </Heading>
      )}

      {count === 0 ? (
        <Box paddingY={8} textAlign="center">
          <Text color="fg.muted">No se encontraron artículos con esos criterios.</Text>
        </Box>
      ) : mounted ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {grid}
          </motion.div>
        </AnimatePresence>
      ) : (
        grid
      )}

      {count > pageSize && (
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
                <IconButton aria-label="Página anterior">
                  <HiChevronLeft />
                </IconButton>
              </Pagination.PrevTrigger>

              <Pagination.Items
                render={(pageItem) => (
                  <IconButton
                    variant={{ base: "outline", _selected: "solid" }}
                    colorPalette="cyan"
                  >
                    {pageItem.value}
                  </IconButton>
                )}
              />

              <Pagination.NextTrigger asChild>
                <IconButton aria-label="Página siguiente">
                  <HiChevronRight />
                </IconButton>
              </Pagination.NextTrigger>
            </ButtonGroup>
          </Pagination.Root>
        </Box>
      )}
    </Stack>
  );
}
