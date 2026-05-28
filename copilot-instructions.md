# Instrucciones para GitHub Copilot

## Stack
Next.js 16.2.4 (App Router) · React 19 · TypeScript 5 strict · TailwindCSS v4 · pnpm

---

## Arquitectura de capas — flujo unidireccional obligatorio

Cada capa habla SOLO con la inmediatamente inferior. Nunca saltes capas.

```
UI → Server Actions → Servicios (lib/services/) → Clientes/Repositorios (lib/clients/ o lib/db/)
```

- **UI**: renderiza y captura eventos. Sin lógica de negocio. Sin llamadas directas a servicios.
- **Server Actions** (`lib/actions/`): validan input con Zod, verifican sesión, delegan al servicio, revalidan caché. Sin lógica de negocio.
- **Servicios** (`lib/services/`): lógica de negocio pura. Sin imports de Next.js (`next/cache`, `headers`, `FormData`). Testeables de forma aislada.
- **Clientes** (`lib/clients/`): hablan con APIs externas o DB. Sin lógica de negocio. Lanzan `AppError` tipados.

Si el proyecto no tiene DB, `lib/clients/` reemplaza a `lib/db/`. La arquitectura es idéntica.

---

## Manejo de errores — siempre tipado

Nunca lances `new Error('mensaje')` ni strings. Usa siempre subclases de `AppError` de `types/errors.ts`.

```typescript
// Disponibles: UnauthorizedError, NotFoundError, ValidationError, ApiError, LimiteSuperadoError
throw new UnauthorizedError()
throw new NotFoundError('Producto')
throw new ApiError(res.status, await res.text())
```

Para errores esperados (not found, validación) usa `Result<T>` de `types/result.ts` en lugar de `throw`:

```typescript
import { ok, err } from '@/types/result'

// En servicios
if (!item) return err(new NotFoundError('Item'))
return ok(item)

// En Server Actions
const resultado = await miServicio(datos)
if (!resultado.ok) return { error: resultado.error.message }
return { data: resultado.data }
```

Logging: nunca uses `console.*` directo. Usa siempre `logger.*` de `lib/logger.ts`.

---

## Estado — orden de preferencia obligatorio

Antes de usar `useState`, pregunta: ¿puede vivir esto en otro lugar?

1. **Servidor** — datos que vienen de API/DB sin interacción del usuario → Server Component
2. **URL** — filtros, paginación, tabs compartibles → `useSearchParams` + `useRouter`
3. **`useState`** — UI efímera que se puede perder al recargar (modal abierto, campo antes de enviar)
4. **Zustand** — solo si el estado cruza múltiples rutas y no puede ir en URL
5. Sin prop drilling más de 2 niveles — usa Context o sube al servidor

Formularios con React 19:
```typescript
'use client'
import { useActionState } from 'react'

const [estado, accion, pendiente] = useActionState(miAction, null)
// usar <form action={accion}> — no onSubmit
```

---

## Reglas de calidad — aplica en cada sugerencia

### TypeScript
- Nunca `any` — usa `unknown` + type narrowing
- `type` sobre `interface` salvo declaration merging
- Tipos de retorno explícitos en funciones exportadas
- `satisfies` para literales con tipado seguro

### React & Next.js
- **Server Components por defecto** — `'use client'` solo para interactividad, hooks o APIs del navegador
- Sin `useEffect` para fetching — usa Server Components con `async/await`
- `next/image` siempre, nunca `<img>`
- `next/link` siempre, nunca `<a>` para rutas internas
- `generateMetadata()` para metadata, nunca `<Head>`
- Fetches independientes con `Promise.all()` — nunca en cascada si no hay dependencia

### TailwindCSS v4
- Sin `tailwind.config.js` — config en `app/globals.css` con `@theme {}`
- Clases utilitarias directas — sin `@apply` salvo resets base
- Mobile-first: `sm:`, `md:`, `lg:`

### Seguridad
- Zod en toda entrada externa antes de procesarla
- Verificar sesión al inicio de cada Server Action
- Secretos solo en variables sin prefijo `NEXT_PUBLIC_`
- Sin datos sensibles en `localStorage`

---

## Auto-corrección — antes de sugerir cualquier código

Copilot verifica y corrige automáticamente:

- Imports o variables sin usar → eliminar
- `any` sin justificación → reemplazar con tipo correcto
- `console.*` → reemplazar con `logger.*`
- Lógica duplicada (≥ 2 veces) → extraer a función
- Componente > 150 líneas → descomponer
- Función exportada sin JSDoc → añadir
- Fetches en cascada sin dependencia → `Promise.all`
- Input externo sin Zod → añadir schema
- Server Action sin verificación de sesión → añadir guard al inicio
- `new Error()` genérico → reemplazar con `AppError` tipado
- `useState` que debería estar en URL → mover a `useSearchParams`
- Capa que salta otra capa → refactorizar

---

## Documentación obligatoria

Todas las funciones exportadas llevan JSDoc:

```typescript
/**
 * Busca productos disponibles filtrados por texto.
 * Agnóstico al origen — funciona con DB o API externa.
 *
 * @param filtro - Texto de búsqueda (vacío devuelve todos)
 * @returns Result con lista de productos o NotFoundError si no hay resultados
 */
export async function buscarProductos(filtro: string): Promise<Result<Producto[]>> { ... }
```

---

## Nombres de archivos

| Tipo | Convención | Ejemplo |
|------|-----------|---------|
| Componente | PascalCase | `TarjetaProducto.tsx` |
| Hook | camelCase + `use` | `useAuth.ts` |
| Server Action | camelCase + `Action` | `crearPedidoAction.ts` |
| Servicio | camelCase | `procesarPedido.ts` |
| Cliente externo | camelCase | `clienteProductos.ts` |
| Utilidad | camelCase | `formatearFecha.ts` |
| Ruta | kebab-case | `perfil-usuario/` |
| Test | mismo nombre + `.test` | `TarjetaProducto.test.tsx` |

---

## Estructura del proyecto

```
app/
  (grupo)/
    page.tsx / layout.tsx / loading.tsx / error.tsx
    _components/
  globals.css        # @theme TailwindCSS v4
  layout.tsx
components/          # Componentes globales
lib/
  actions/           # Server Actions
  services/          # Lógica de negocio
  clients/           # APIs externas
  db/                # Repositorios (si hay DB)
  utils/             # Funciones puras
  logger.ts          # Logging centralizado
types/
  errors.ts          # AppError y subclases
  result.ts          # Result<T>
public/
```

---

## Anti-patrones — nunca generar

- `pages/` o `getServerSideProps` / `getStaticProps`
- `useEffect` para fetching
- `any` o `as Tipo` sin justificación
- `<img>` / `<a>` puros para recursos de Next.js
- `tailwind.config.js`
- Rutas enteras en `'use client'`
- `console.log` / `console.error` directo
- `new Error('string')` genérico
- Llamadas directas a DB desde Client Components
- Fetches en cascada cuando pueden ser paralelos
- Funciones exportadas sin JSDoc
