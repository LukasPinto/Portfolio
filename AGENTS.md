# AGENTS.md — Portfolio de Lukas Pinto

Guía para agentes de IA que trabajan en este repositorio. Sigue estos lineamientos para mantener coherencia y evitar errores comunes (especialmente de hidratación SSR).

## Resumen del proyecto

- **Qué es:** Portfolio personal estático en español (Sobre Mí + Blog con writeups de CTF).
- **Deploy:** GitHub Pages vía `output: "export"` en `next.config.ts` → carpeta `out/`.
- **URL base:** `NEXT_PUBLIC_SITE_URL` (fallback: `https://lukaspinto.github.io/Portfolio`).
- **Idioma UI:** Español (`lang="es"` en el layout).

## Stack

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 16 (App Router) |
| UI | Chakra UI v3 + Emotion |
| Animaciones | Framer Motion (`app/ui/motion.tsx`) |
| Contenido | MDX en `data/` con `next-mdx-remote-client` |
| Tema | `theme/system.ts` (`createSystem` + tokens semánticos) |
| Color mode | Custom en `components/ui/color-mode.tsx` (localStorage + `useSyncExternalStore`) |

## Estructura de carpetas

```
app/                  # App Router (páginas, hooks, UI específica del sitio)
  ui/                 # Componentes de layout y presentación del portfolio
    mdx/              # Componentes MDX (MdxFigure, MdxPre, MdxCallout)
  hooks/              # Hooks compartidos (useMounted, useActiveSection)
  utils/              # Utilidades MDX (mdxFiles.tsx, searchIndex.ts)
  styles/             # CSS adicional (code.css, global.css, mdx-prose.css)
components/ui/        # Primitivos reutilizables (Provider, color-mode, tooltip)
theme/                # Sistema de diseño Chakra (system.ts)
data/                 # Archivos MDX del blog y experiencia
mdx-components.tsx    # Mapeo de elementos MDX → componentes Chakra
public/               # Assets estáticos
```

## Convenciones de código

### Imports

- Usar alias `@/` para rutas desde la raíz (`@/app/ui/...`, `@/theme/system`, etc.).
- Componentes de página: Server Components por defecto; añadir `"use client"` solo cuando haga falta (estado, hooks del navegador, Framer Motion directo).

### Chakra UI v3

- Usar **tokens semánticos** del tema: `bg`, `fg`, `border`, `accent` — no colores hardcodeados salvo gradientes decorativos puntuales.
- El sistema vive en `theme/system.ts`; extender ahí colores/fuentes antes de usar valores sueltos.
- El provider raíz es `components/ui/provider.tsx` → `ChakraProvider` + `ColorModeProvider`.
- Preferir primitivos Chakra (`Stack`, `Box`, `SimpleGrid`, `Card.Root`, etc.) sobre HTML crudo.

### Color mode

- **No** usar `next-themes` (está en dependencias pero el proyecto usa implementación propia).
- Leer/escribir tema con `useColorMode()` de `components/ui/color-mode.tsx`.
- Clave localStorage: `portfolio-theme`. Default SSR y sin JS: `"dark"`.
- El `<html>` lleva `className="dark"` en el layout; el provider sincroniza la clase en el cliente.

### Animaciones (Framer Motion)

- Usar wrappers de `app/ui/motion.tsx` (`FadeIn`, `StaggerContainer`, `StaggerItem`, `HoverLift`) en páginas Server.
- Para animaciones inline en Client Components, usar el patrón `useMounted()`:
  - **SSR / primera hidratación:** render estático (Chakra `Box` o `<motion.div>` equivalente).
  - **Tras montar:** render con `motion.div`.
- **No** envolver todo el layout en gates de `mounted`; solo elementos animados puntuales.

### MDX / Blog

- Posts en `data/*.mdx`; metadatos y listado en `app/utils/mdxFiles.tsx`.
- Componentes MDX personalizados en `mdx-components.tsx` (headings con ancla, `MdxFigure`, `MdxPre`, callouts).
- Estilos de prose en `app/styles/mdx-prose.css`; importar en páginas de post.
- Componentes MDX en `app/ui/mdx/` (`MdxFigure`, `MdxPre`, `MdxCallout`).
- `optimizePackageImports` incluye `@chakra-ui/react` en `next.config.ts`.

### Búsqueda del blog

- Índice build-time: `getBlogSearchDocuments()` en `mdxFiles.tsx` extrae texto plano con `remark` + `remark-mdx` + `mdast-util-to-string`.
- Tipo `BlogSearchDocument` en `app/types/mdx.ts`.
- Cliente: `fuse.js` vía `createSearchIndex()` en `app/utils/searchIndex.ts`.
- UI: `BlogSearch.tsx` + `BlogListing.tsx` (reemplaza el antiguo `Pagination.tsx`).

## Layout y scroll — reglas críticas

El sitio usa **un único scroll en `document` (body)**. No crear contenedores de scroll anidados salvo excepciones locales (TOC lateral, bloques `pre`/tablas MDX).

### AppShell (`app/ui/AppShell.tsx`)

| ❌ Evitar | ✅ Correcto |
|----------|-------------|
| `overflow: hidden` en el root del layout | Sin overflow en el contenedor raíz |
| `maxHeight: 100dvh` + `overflow: auto` en columnas principales | Dejar que el body crezca con el contenido |
| Grid 5×5 con filas `1fr` | Flex: sidebar + columna main |
| Sidebar con `height: 100dvh` + `overflowY: auto` en desktop | Sidebar `sticky` + `alignSelf: flex-start`, sin altura fija ni scroll propio |

### CSS global (`app/globals.css`)

- `body { overflow-y: scroll }` — scroll principal del documento.
- `overflow-x: hidden` en body (no `clip` en contenedores que envuelvan todo el layout).
- No usar `overscroll-behavior-y: none` en body (bloquea gestos naturales en móvil).

### Sticky permitido

- **NavBar:** `position: sticky; top: 0` sobre el scroll del body.
- **Sidebar desktop:** sticky sin scroll propio.
- **TOC blog (desktop):** puede tener `overflow-y: auto` solo en el panel del índice, no en toda la página.

### Responsividad

- Un solo árbol de componentes con props responsive (`base` / `lg`); **no** duplicar mobile + desktop en DOM con `display: none` (evita doble hidratación de Framer Motion).
- Avatar y layout del perfil: un `AvatarRing` con `boxSize={{ base, lg }}`.

## HTML válido — evitar errores de renderizado

React avisa con `validateDOMNesting` cuando la estructura HTML es inválida. Revisar consola tras cambios en layout/MDX.

| ❌ Inválido | ✅ Correcto |
|------------|-------------|
| `<a>` envolviendo `<button>` (p. ej. TOC antiguo con TreeView) | Enlaces del TOC: `<Box as="a" href="...">` directo, sin TreeView |
| `<article>` dentro de `<article>` | `<article>` en la página; MDX wrapper = `<motion.div class="mdx-prose">` |
| `<p>` dentro de `<p>` (Chakra `Text` sin `as`) | `<p>` para párrafos MDX; `<strong>`/`<em>` nativos, no `Text as="strong"` dentro de `<p>` |
| `<figure>` / `<pre>` dentro de `<p>` (MDX envuelve `![img]()` en `<p>`) | `MdxParagraph` en `mdx-components.tsx`: desenvuelve si solo hay bloques; si hay mezcla, usa `<div>` en lugar de `<p>` |
| Múltiples instancias ocultas de componentes animados | Una instancia con estilos responsive |

### TOC (`app/ui/toc/`)

- Estructura: `Toc.tsx` (shell responsive) → `TocPanel` (card + progreso) → `TocNav` (árbol recursivo `<nav><ul><a>`).
- Utilidades en `utils.ts`: `collectSectionIds`, `sectionHref`, `readingProgress`.
- Enlaces con `<Box as="a">` — no usar `TreeView` (anidamiento inválido `<a>` > `<button>`).
- Sección activa vía `useActiveSection`; barra de progreso según posición en el índice.
- Desktop: columna lateral con `alignSelf: stretch` en la página del post (el sticky necesita un contenedor tan alto como el artículo); `aside` con `position: sticky`, `top: var(--app-nav-height)` y scroll interno si el índice es largo.

### MDX (`mdx-components.tsx`)

- `wrapper` → `<motion.div className="mdx-prose">` (no `<article>` si la página ya usa `<article>`).
- `strong` / `em` → elementos HTML nativos.
- `img` → `MdxFigure` (`<figure>`). MDX genera `<p><img /></p>` para imágenes sueltas; el componente `p` **no** puede envolver `<figure>`. Usar `MdxParagraph`, que detecta hijos con `mdxBlockTag` (`MdxFigure`) y desenvuelve o renderiza `<div>`.
- Tras tocar componentes MDX o estilos de prose, abrir un post con imágenes (p. ej. `/Blog/2023-12-15-HVM-Logan2`) y confirmar que la consola no muestra `validateDOMNesting` ni hydration errors.

## SSR e hidratación — reglas críticas

Estas reglas evitan el error `Hydration failed because the server rendered HTML didn't match the client`.

### 1. Usar Webpack, no Turbopack

Next.js 16 usa Turbopack por defecto en dev. Chakra + Emotion tienen un bug conocido de hidratación con Turbopack (`<style data-emotion>` vs `<div className="css-xxx">`).

```json
"dev": "next dev --webpack",
"build": "next build --webpack"
```

**Nunca quitar `--webpack`** de los scripts sin verificar que el error de Emotion no reaparezca.

### 2. `suppressHydrationWarning` en `<html>` y `<body>`

Ya configurado en `app/layout.tsx`. Mantenerlo por el color mode y clases dinámicas en `<html>`.

### 3. Evitar divergencia servidor/cliente

| ❌ Evitar | ✅ Usar en su lugar |
|----------|---------------------|
| `if (typeof window !== "undefined")` en render | `useMounted()` o `useSyncExternalStore` |
| `Date.now()`, `Math.random()` en render | Valores fijos o efectos post-mount |
| `localStorage` / `window` en render inicial | `useSyncExternalStore` con snapshot SSR (ver `color-mode.tsx`) |
| Render condicional distinto sin snapshot SSR | Mismo markup en server y primer paint del client |

### 4. `useMounted()` — patrón correcto

```tsx
// app/hooks/useMounted.tsx — getServerSnapshot devuelve false
const mounted = useMounted();
return mounted ? <motion.div ...> : <div>...</div>;
```

Server y cliente coinciden en el primer render (`mounted === false`).

### 5. EmotionRegistry obligatorio

Chakra v3 usa Emotion para estilos globales y de componentes. Sin un cache compartido con `useServerInsertedHTML`, Next.js inserta `<style>` en el body durante SSR pero el cliente hidrata con `<motion.div>` — mismatch exacto del error.

El proyecto usa `components/ui/emotion-registry.tsx`, envuelto en `Provider`. **No quitar** ni mover debajo de `ChakraProvider`.

### 6. No usar `@chakra-ui/next-js` CacheProvider

Está deprecado en Chakra v3; usar `EmotionRegistry` propio en su lugar.

## Comandos

```bash
npm run dev      # Desarrollo (con --webpack)
npm run build    # Build estático → out/
npm run lint     # ESLint
```

## Checklist antes de entregar cambios

- [ ] `npm run build` pasa sin errores.
- [ ] Scroll funciona en toda la página (no solo sidebar o columna derecha).
- [ ] Consola sin warnings `validateDOMNesting` en `/Blog/[slug]` (probar al menos un post con imágenes MDX).
- [ ] Componentes nuevos usan tokens semánticos del tema.
- [ ] Páginas nuevas exportan `metadata` cuando corresponda.
- [ ] Texto de UI en español.
- [ ] Client Components tienen `"use client"` explícito.
- [ ] Animaciones respetan el patrón `useMounted` o los wrappers de `motion.tsx`.

## Errores frecuentes y soluciones

| Síntoma | Causa probable | Solución |
|---------|----------------|----------|
| `+ <motion.div className="css-xxx">` / `- <style data-emotion>` | Emotion SSR sin registry | `EmotionRegistry` en Provider + `--webpack` en scripts |
| Scroll solo funciona en un lateral | Sidebar/columna con scroll propio | Un scroll en `body`; quitar `overflow: auto` del layout |
| 5× `validateDOMNesting` en TOC (TreeView) | `<a>` > `<button>` en ramas | `TocNav` con `<Box as="a">` plano, sin TreeView |
| `article` cannot contain `article` | MDX wrapper + página | Wrapper MDX = `motion.div`, article solo en page |
| `<figure>` cannot be descendant of `<p>` | `img` → `MdxFigure` dentro de `<p>` MDX | `MdxParagraph` desenvuelve bloques; marcar componentes bloque con `mdxBlockTag` |
| Botón de tema parpadea | Render distinto pre/post mount | Skeleton en `ColorModeButton` (ya implementado) |
| Tabs activos incorrectos en SSR | `usePathname()` solo en client | NavBar es Client Component — OK |
| Imágenes rotas en producción | Falta `unoptimized: true` | Ya en `next.config.ts` para static export |

## Qué no hacer

- No cambiar `output: "export"` sin coordinar con el workflow de GitHub Pages.
- No introducir otro sistema de temas (p. ej. `next-themes`) sin migrar `color-mode.tsx`.
- No commitear `.env` con secretos.
- No crear commits ni PRs salvo que el usuario lo pida explícitamente.
