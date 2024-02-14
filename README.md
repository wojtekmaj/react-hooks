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

- [`useCurrentPosition`](#useCurrentPosition)
- [`useDebouncedEffect`](#useDebouncedEffect)
- [`useDebouncedState`](#useDebouncedState)
- [`useDebouncedValue`](#useDebouncedValue)
- [`useEventListener`](#useEventListener)
- [`useIntersectionObserver`](#useIntersectionObserver)
- [`useLocalStorage`](#useLocalStorage)
- [`useMatchMedia`](#useMatchMedia)
- [`useMutationObserver`](#useMutationObserver)
- [`useOnLine`](#useOnLine)
- [`usePermissionState`](#usePermissionState)
- [`usePrefersColorSchemeDark`](#usePrefersColorSchemeDark)
- [`usePrefersColorSchemeLight`](#usePrefersColorSchemeLight)
- [`usePrefersReducedMotion`](#usePrefersReducedMotion)
- [`usePrefersReducedTransparency`](#usePrefersReducedTransparency)
- [`useResizeObserver`](#useResizeObserver)
- [`useScrollLeft`](#useScrollLeft)
- [`useScrollLeftPercent`](#useScrollLeftPercent)
- [`useScrollTop`](#useScrollTop)
- [`useScrollTopPercent`](#useScrollTopPercent)
- [`useSetInterval`](#useSetInterval)
- [`useSetTimeout`](#useSetTimeout)
- [`useTick`](#useTick)
- [`useToggle`](#useToggle)
- [`useWindowHeight`](#useWindowHeight)
- [`useWindowWidth`](#useWindowWidth)

### `useCurrentPosition`

Returns current position from Geolocation API.

#### Sample usage

```ts
import { useCurrentPosition } from '@wojtekmaj/react-hooks';

useCurrentPosition(); // { latitude: 0, longitude: 0 }
```

### `useDebouncedEffect`

Runs a given effect after a given delay.

#### Sample usage

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

### `useDebouncedState`

Returns a debounced state and a function to update it.

#### Sample usage

```ts
import { useDebouncedState } from '@wojtekmaj/react-hooks';

const [value, setValue] = useDebouncedState('initialState', 1000); // ['initialState', Function]
```

### `useDebouncedValue`

Returns a debounced value.

#### Sample usage

```ts
import { useDebouncedValue } from '@wojtekmaj/react-hooks';

const debouncedValue = useDebouncedValue(value, 1000); // This value will be updated after 1 second of value not changing.
```

### `useEventListener`

Adds event listener to a given element.

#### Sample usage

```ts
import { useEventListener } from '@wojtekmaj/react-hooks';

useEventListener(element, 'click', onClick);
```

### `useIntersectionObserver`

Observes a given element using [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver).

#### Sample usage

```ts
import { useIntersectionObserver } from '@wojtekmaj/react-hooks';

useIntersectionObserver(element, config, onIntersectionChange);
```

### `useLocalStorage`

Returns a stateful value synchronized with [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), and a function to update it.

#### Sample usage

```ts
import { useLocalStorage } from '@wojtekmaj/react-hooks';

const [value, setValue] = useLocalStorage('myKey', 'initialState'); // ['initialState', Function]
```

### `useMatchMedia`

Returns a flag which determines if the document matches the given [media query](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) string.

#### Sample usage

```ts
import { useMatchMedia } from '@wojtekmaj/react-hooks';

const isDesktop = useMatchMedia('screen and (min-width: 1024px)'); // true / false
```

### `useMutationObserver`

Observes a given element using [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).

#### Sample usage

```ts
import { useMutationObserver } from '@wojtekmaj/react-hooks';

useMutationObserver(element, config, onMutation);
```

### `useOnLine`

Returns the online status of the browser.

#### Sample usage

```ts
import { useOnLine } from '@wojtekmaj/react-hooks';

const onLine = useOnLine(); // true
```

### `usePermissionState`

Returns permission state given permission name.

#### Sample usage

```ts
import { usePermissionState } from '@wojtekmaj/react-hooks';

const state = usePermissionState({ name: 'geolocation' }); // 'granted'
```

### `usePrefersColorSchemeDark`

Returns a flag which determines if the document matches `(prefers-color-scheme: dark)` [media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#media_features).

#### Sample usage

```ts
import { usePrefersColorSchemeDark } from '@wojtekmaj/react-hooks';

const prefersColorSchemeDark = usePrefersColorSchemeDark(); // true
```

### `usePrefersColorSchemeLight`

Returns a flag which determines if the document matches `(prefers-color-scheme: light)` [media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#media_features).

#### Sample usage

```ts
import { usePrefersColorSchemeLight } from '@wojtekmaj/react-hooks';

const prefersColorSchemeLight = usePrefersColorSchemeLight(); // true
```

### `usePrefersReducedMotion`

Returns a flag which determines if the document matches `(prefers-reduced-motion: reduce)` [media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#media_features).

#### Sample usage

```ts
import { usePrefersReducedMotion } from '@wojtekmaj/react-hooks';

const prefersReducedMotion = usePrefersReducedMotion(); // true
```

### `usePrefersReducedTransparency`

Returns a flag which determines if the document matches `(prefers-reduced-transparency: reduce)` [media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#media_features).

#### Sample usage

```ts
import { usePrefersReducedTransparency } from '@wojtekmaj/react-hooks';

const prefersReducedTransparency = usePrefersReducedTransparency(); // true
```

### `useResizeObserver`

Observes a given element using [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).

#### Sample usage

```ts
import { useResizeObserver } from '@wojtekmaj/react-hooks';

useResizeObserver(element, config, onResize);
```

### `useScrollLeft`

Returns current scroll left position in pixels.

#### Sample usage

```ts
import { useScrollLeft } from '@wojtekmaj/react-hooks';

const scrollLeft = useScrollLeft(); // 0
```

### `useScrollLeftPercent`

Returns current scroll left position in percentage.

#### Sample usage

```ts
import { useScrollLeftPercent } from '@wojtekmaj/react-hooks';

const scrollLeftPercent = useScrollLeftPercent(); // 0.5
```

### `useScrollTop`

Returns current scroll top position in pixels.

#### Sample usage

```ts
import { useScrollTop } from '@wojtekmaj/react-hooks';

const scrollTop = useScrollTop(); // 0
```

### `useScrollTopPercent`

Returns current scroll top position in percentage.

#### Sample usage

```ts
import { useScrollTopPercent } from '@wojtekmaj/react-hooks';

const scrollTopPercent = useScrollTopPercent(); // 0.5
```

### `useSetInterval`

Runs a given function every n milliseconds.

#### Sample usage

```ts
import { useSetInterval } from '@wojtekmaj/react-hooks';

useSetInterval(fn, 1000);
```

### `useSetTimeout`

Runs a given function after n milliseconds.

#### Sample usage

```ts
import { useSetTimeout } from '@wojtekmaj/react-hooks';

useSetTimeout(fn, 1000);
```

### `useTick`

Counts from 0, increasing the number returned every n milliseconds.

#### Sample usage

```ts
import { useTick } from '@wojtekmaj/react-hooks';

const tick = useTick(1000); // 0 … 🕐 … 1 … 🕑 … 2 …
```

### `useToggle`

Returns a flag and a function to toggle it.

#### Sample usage

```ts
import { useToggle } from '@wojtekmaj/react-hooks';

const [value, toggleValue] = useToggle(); // [false, Function]
```

### `useWindowHeight`

Returns the interior height of the window in pixels.

#### Sample usage

```ts
import { useWindowHeight } from '@wojtekmaj/react-hooks';

const windowWidth = useWindowHeight(); // 900
```

### `useWindowWidth`

Returns the interior width of the window in pixels.

#### Sample usage

```ts
import { useWindowWidth } from '@wojtekmaj/react-hooks';

const windowWidth = useWindowWidth(); // 1440
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
