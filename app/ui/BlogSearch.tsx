"use client";

import { useMemo, useState, useCallback, useRef } from "react";
import {
  Input,
  InputGroup,
  Stack,
  Text,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import type { BlogSearchDocument } from "@/app/types/mdx";
import { createSearchIndex, getUniqueCategories } from "@/app/utils/searchIndex";

type BlogSearchProps = {
  documents: BlogSearchDocument[];
  query: string;
  category: string | null;
  onQueryChange: (query: string) => void;
  onCategoryChange: (category: string | null) => void;
  resultCount: number;
};

export default function BlogSearch({
  documents,
  query,
  category,
  onQueryChange,
  onCategoryChange,
  resultCount,
}: BlogSearchProps) {
  const categories = useMemo(() => getUniqueCategories(documents), [documents]);
  const [localQuery, setLocalQuery] = useState(query);
  const debounceRef = useRef<number | undefined>(undefined);

  const handleInput = useCallback(
    (value: string) => {
      setLocalQuery(value);
      window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => onQueryChange(value), 200);
    },
    [onQueryChange]
  );

  return (
    <Stack gap={4} width="full">
      <InputGroup startElement={<HiMagnifyingGlass />}>
        <Input
          placeholder="Buscar writeups, tags, contenido…"
          value={localQuery}
          onChange={(e) => handleInput(e.target.value)}
          aria-label="Buscar en el blog"
          bg="bg.subtle"
          borderColor="border"
          _focusVisible={{
            borderColor: "cyan.500",
            boxShadow: "0 0 0 1px var(--chakra-colors-cyan-500)",
          }}
        />
      </InputGroup>

      {categories.length > 0 && (
        <HStack gap={2} flexWrap="wrap">
          <Badge
            as="button"
            cursor="pointer"
            variant={category === null ? "solid" : "outline"}
            colorPalette="cyan"
            onClick={() => onCategoryChange(null)}
          >
            Todas
          </Badge>
          {categories.map((cat) => (
            <Badge
              key={cat}
              as="button"
              cursor="pointer"
              variant={category === cat ? "solid" : "outline"}
              colorPalette="cyan"
              onClick={() => onCategoryChange(category === cat ? null : cat)}
            >
              {cat}
            </Badge>
          ))}
        </HStack>
      )}

      <Text fontSize="sm" color="fg.muted">
        {query.trim() || category
          ? `${resultCount} resultado${resultCount === 1 ? "" : "s"}`
          : `${documents.length} artículo${documents.length === 1 ? "" : "s"}`}
      </Text>
    </Stack>
  );
}

export function useBlogSearch(documents: BlogSearchDocument[]) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const index = useMemo(() => createSearchIndex(documents), [documents]);

  const filtered = useMemo(() => {
    let results: BlogSearchDocument[];
    if (query.trim()) {
      results = index.search(query.trim()).map((r) => r.item);
    } else {
      results = [...documents];
    }

    if (category) {
      results = results.filter((doc) => doc.categories.includes(category));
    }

    return results;
  }, [index, documents, query, category]);

  const resetPage = useCallback(() => {
    /* placeholder for pagination reset — handled by BlogListing */
  }, []);

  return {
    query,
    category,
    setQuery: (q: string) => {
      setQuery(q);
      resetPage();
    },
    setCategory: (c: string | null) => {
      setCategory(c);
      resetPage();
    },
    filtered,
    resultCount: filtered.length,
  };
}
