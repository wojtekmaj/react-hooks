[![npm](https://img.shields.io/npm/v/@wojtekmaj/react-hooks.svg)](https://www.npmjs.com/package/@wojtekmaj/react-hooks) ![downloads](https://img.shields.io/npm/dt/@wojtekmaj/react-hooks.svg) [![CI](https://github.com/wojtekmaj/react-hooks/actions/workflows/ci.yml/badge.svg)](https://github.com/wojtekmaj/react-hooks/actions)

# React-Hooks

A collection of React Hooks.

## tl;dr

- Install by executing `npm install @wojtekmaj/react-hooks` or `yarn add @wojtekmaj/react-hooks`.
- Import by adding `import { useTick } from '@wojtekmaj/react-hooks'`.
- Do stuff with it!
  ```ts
  const tick = useTick();
  ```

## Server-side rendering

All hooks from this package support SSR. Some hooks use browser-only APIs, e.g. `useCurrentPosition`. Such hooks, if they are supposed to return a value, will return `null` instead.

## User guide

### Table of contents

#### Browser state and capabilities

- [`useCurrentPosition`](#useCurrentPosition)
- [`useDocumentVisibility`](#useDocumentVisibility)
- [`useOnLine`](#useOnLine)
- [`usePermissionState`](#usePermissionState)

#### Events and observers

- [`useEventListener`](#useEventListener)
- [`useIntersectionObserver`](#useIntersectionObserver)
- [`useMutationObserver`](#useMutationObserver)
- [`useResizeObserver`](#useResizeObserver)

#### Media queries and preferences

- [`useForcedColors`](#useForcedColors)
- [`useMatchMedia`](#useMatchMedia)
- [`usePrefersColorScheme`](#usePrefersColorScheme)
- [`usePrefersColorSchemeDark`](#usePrefersColorSchemeDark)
- [`usePrefersColorSchemeLight`](#usePrefersColorSchemeLight)
- [`usePrefersContrast`](#usePrefersContrast)
- [`usePrefersReducedMotion`](#usePrefersReducedMotion)
- [`usePrefersReducedTransparency`](#usePrefersReducedTransparency)

#### Scrolling and viewport

- [`useScrollLeft`](#useScrollLeft)
- [`useScrollLeftDirection`](#useScrollLeftDirection)
- [`useScrollLeftPercent`](#useScrollLeftPercent)
- [`useScrollTop`](#useScrollTop)
- [`useScrollTopDirection`](#useScrollTopDirection)
- [`useScrollTopPercent`](#useScrollTopPercent)
- [`useWindowHeight`](#useWindowHeight)
- [`useWindowSize`](#useWindowSize)
- [`useWindowWidth`](#useWindowWidth)

#### State and storage

- [`useDebouncedState`](#useDebouncedState)
- [`useDebouncedValue`](#useDebouncedValue)
- [`useLocalStorage`](#useLocalStorage)
- [`useSessionStorage`](#useSessionStorage)
- [`useToggle`](#useToggle)

#### Timing and effects

- [`useDebouncedEffect`](#useDebouncedEffect)
- [`useSetInterval`](#useSetInterval)
- [`useSetTimeout`](#useSetTimeout)
- [`useTick`](#useTick)

### Browser state and capabilities

#### `useCurrentPosition`

Returns current position from Geolocation API.

##### Sample usage

```ts
import { useCurrentPosition } from '@wojtekmaj/react-hooks';

useCurrentPosition(); // { latitude: 0, longitude: 0 }
```

#### `useDocumentVisibility`

Returns the document's current visibility state.

##### Sample usage

```ts
import { useDocumentVisibility } from '@wojtekmaj/react-hooks';

const visibilityState = useDocumentVisibility(); // 'visible' / 'hidden'
```

#### `useOnLine`

Returns the online status of the browser.

##### Sample usage

```ts
import { useOnLine } from '@wojtekmaj/react-hooks';

const onLine = useOnLine(); // true
```

#### `usePermissionState`

Returns permission state given permission name.

##### Sample usage

```ts
import { usePermissionState } from '@wojtekmaj/react-hooks';

const state = usePermissionState({ name: 'geolocation' }); // 'granted'
```

### Events and observers

#### `useEventListener`

Adds event listener to a given element.

##### Sample usage

```ts
import { useEventListener } from '@wojtekmaj/react-hooks';

useEventListener(element, 'click', onClick);
```

#### `useIntersectionObserver`

Observes a given element using [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver).

##### Sample usage

```ts
import { useIntersectionObserver } from '@wojtekmaj/react-hooks';

useIntersectionObserver(element, config, onIntersectionChange);
```

#### `useMutationObserver`

Observes a given element using [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).

##### Sample usage

```ts
import { useMutationObserver } from '@wojtekmaj/react-hooks';

useMutationObserver(element, config, onMutation);
```

#### `useResizeObserver`

Observes a given element using [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).

##### Sample usage

```ts
import { useResizeObserver } from '@wojtekmaj/react-hooks';

useResizeObserver(element, config, onResize);
```

### Media queries and preferences

#### `useForcedColors`

Returns a flag indicating whether the [`forced-colors`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors) media feature is `active`.

##### Sample usage

```ts
import { useForcedColors } from '@wojtekmaj/react-hooks';

const forcedColors = useForcedColors(); // true
```

#### `useMatchMedia`

Returns a flag which determines if the document matches the given [media query](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) string.

##### Sample usage

```ts
import { useMatchMedia } from '@wojtekmaj/react-hooks';

const isDesktop = useMatchMedia('screen and (min-width: 1024px)'); // true / false
```

#### `usePrefersColorScheme`

Returns the color scheme preference indicated by the [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media feature.

##### Sample usage

```ts
import { usePrefersColorScheme } from '@wojtekmaj/react-hooks';

const prefersColorScheme = usePrefersColorScheme(); // 'dark' / 'light'
```

#### `usePrefersColorSchemeDark`

Returns a flag indicating whether the [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media feature is `dark`.

##### Sample usage

```ts
import { usePrefersColorSchemeDark } from '@wojtekmaj/react-hooks';

const prefersColorSchemeDark = usePrefersColorSchemeDark(); // true
```

#### `usePrefersColorSchemeLight`

Returns a flag indicating whether the [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media feature is `light`.

##### Sample usage

```ts
import { usePrefersColorSchemeLight } from '@wojtekmaj/react-hooks';

const prefersColorSchemeLight = usePrefersColorSchemeLight(); // true
```

#### `usePrefersContrast`

Returns the contrast preference indicated by the [`prefers-contrast`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast) media feature.

##### Sample usage

```ts
import { usePrefersContrast } from '@wojtekmaj/react-hooks';

const prefersContrast = usePrefersContrast(); // 'more' / 'less' / 'custom' / 'no-preference'
```

#### `usePrefersReducedMotion`

Returns a flag indicating whether the [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) media feature is `reduce`.

##### Sample usage

```ts
import { usePrefersReducedMotion } from '@wojtekmaj/react-hooks';

const prefersReducedMotion = usePrefersReducedMotion(); // true
```

#### `usePrefersReducedTransparency`

Returns a flag indicating whether the [`prefers-reduced-transparency`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-transparency) media feature is `reduce`.

##### Sample usage

```ts
import { usePrefersReducedTransparency } from '@wojtekmaj/react-hooks';

const prefersReducedTransparency = usePrefersReducedTransparency(); // true
```

### Scrolling and viewport

#### `useScrollLeft`

Returns current scroll left position in pixels.

##### Sample usage

```ts
import { useScrollLeft } from '@wojtekmaj/react-hooks';

const scrollLeft = useScrollLeft(); // 0
```

#### `useScrollLeftDirection`

Returns current scroll left direction.

##### Sample usage

```ts
import { useScrollLeftDirection } from '@wojtekmaj/react-hooks';

const scrollLeftDirection = useScrollLeftDirection(); // 'still' / 'left' / 'right'
```

#### `useScrollLeftPercent`

Returns current scroll left position in percentage.

##### Sample usage

```ts
import { useScrollLeftPercent } from '@wojtekmaj/react-hooks';

const scrollLeftPercent = useScrollLeftPercent(); // 0.5
```

#### `useScrollTop`

Returns current scroll top position in pixels.

##### Sample usage

```ts
import { useScrollTop } from '@wojtekmaj/react-hooks';

const scrollTop = useScrollTop(); // 0
```

#### `useScrollTopDirection`

Returns current scroll top direction.

##### Sample usage

```ts
import { useScrollTopDirection } from '@wojtekmaj/react-hooks';

const scrollTopDirection = useScrollTopDirection(); // 'still' / 'up' / 'down'
```

#### `useScrollTopPercent`

Returns current scroll top position in percentage.

##### Sample usage

```ts
import { useScrollTopPercent } from '@wojtekmaj/react-hooks';

const scrollTopPercent = useScrollTopPercent(); // 0.5
```

#### `useWindowHeight`

Returns the interior height of the window in pixels.

##### Sample usage

```ts
import { useWindowHeight } from '@wojtekmaj/react-hooks';

const windowWidth = useWindowHeight(); // 900
```

#### `useWindowSize`

Returns the interior width and height of the window in pixels.

##### Sample usage

```ts
import { useWindowSize } from '@wojtekmaj/react-hooks';

const windowSize = useWindowSize(); // { width: 1440, height: 900 }
```

#### `useWindowWidth`

Returns the interior width of the window in pixels.

##### Sample usage

```ts
import { useWindowWidth } from '@wojtekmaj/react-hooks';

const windowWidth = useWindowWidth(); // 1440
```

### State and storage

#### `useDebouncedState`

Returns a debounced state and a function to update it.

##### Sample usage

```ts
import { useDebouncedState } from '@wojtekmaj/react-hooks';

const [value, setValue] = useDebouncedState('initialState', 1000); // ['initialState', Function]
```

#### `useDebouncedValue`

Returns a debounced value.

##### Sample usage

```ts
import { useDebouncedValue } from '@wojtekmaj/react-hooks';

const debouncedValue = useDebouncedValue(value, 1000); // This value will be updated after 1 second of value not changing.
```

#### `useLocalStorage`

Returns a stateful value synchronized with [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), and a function to update it.

##### Sample usage

```ts
import { useLocalStorage } from '@wojtekmaj/react-hooks';

const [value, setValue] = useLocalStorage('myKey', 'initialState'); // ['initialState', Function]
```

#### `useSessionStorage`

Returns a stateful value synchronized with [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage), and a function to update it.

##### Sample usage

```ts
import { useSessionStorage } from '@wojtekmaj/react-hooks';

const [value, setValue] = useSessionStorage('myKey', 'initialState'); // ['initialState', Function]
```

#### `useToggle`

Returns a flag and a function to toggle it.

##### Sample usage

```ts
import { useToggle } from '@wojtekmaj/react-hooks';

const [value, toggleValue] = useToggle(); // [false, Function]
```

### Timing and effects

#### `useDebouncedEffect`

Runs a given effect after a given delay.

##### Sample usage

```ts
import { useDebouncedEffect } from '@wojtekmaj/react-hooks';

useDebouncedEffect(
  () => {
    // This will run after 1 second of value not changing.
  },
  [value],
  1000,
);
```

#### `useSetInterval`

Runs a given function every n milliseconds.

##### Sample usage

```ts
import { useSetInterval } from '@wojtekmaj/react-hooks';

useSetInterval(fn, 1000);
```

#### `useSetTimeout`

Runs a given function after n milliseconds.

##### Sample usage

```ts
import { useSetTimeout } from '@wojtekmaj/react-hooks';

useSetTimeout(fn, 1000);
```

#### `useTick`

Counts from 0, increasing the number returned every n milliseconds.

##### Sample usage

```ts
import { useTick } from '@wojtekmaj/react-hooks';

const tick = useTick(1000); // 0 … 🕐 … 1 … 🕑 … 2 …
```

## License

The MIT License.

## Author

<table>
  <tr>
    <td >
      <img src="https://avatars.githubusercontent.com/u/5426427?v=4&s=128" width="64" height="64" alt="Wojciech Maj">
    </td>
    <td>
      <a href="https://github.com/wojtekmaj">Wojciech Maj</a>
    </td>
  </tr>
</table>
