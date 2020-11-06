[![npm](https://img.shields.io/npm/v/@wojtekmaj/react-hooks.svg)](https://www.npmjs.com/package/@wojtekmaj/react-hooks) ![downloads](https://img.shields.io/npm/dt/@wojtekmaj/react-hooks.svg) [![CI](https://github.com/wojtekmaj/react-hooks/workflows/CI/badge.svg)](https://github.com/wojtekmaj/react-hooks/actions) ![dependencies](https://img.shields.io/david/wojtekmaj/react-hooks.svg) ![dev dependencies](https://img.shields.io/david/dev/wojtekmaj/react-hooks.svg) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

# React-Hooks
A collection of React Hooks.

## tl;dr
* Install by executing `npm install @wojtekmaj/react-hooks` or `yarn add @wojtekmaj/react-hooks`.
* Import by adding `import { useTick } from '@wojtekmaj/react-hooks'`.
* Do stuff with it!
    ```js
    const tick = useTick();
    ```

## User guide

### Table of contents

* [`useCurrentPosition`](#useCurrentPosition)
* [`useEventListener`](#useEventListener)
* [`useIntersectionObserver`](#useIntersectionObserver)
* [`useMatchMedia`](#useMatchMedia)
* [`useMutationObserver`](#useMutationObserver)
* [`useResizeObserver`](#useResizeObserver)
* [`useScrollLeft`](#useScrollLeft)
* [`useScrollTop`](#useScrollTop)
* [`useSetInterval`](#useSetInterval)
* [`useSetTimeout`](#useSetTimeout)
* [`useTick`](#useTick)
* [`useToggle`](#useToggle)

### `useCurrentPosition`

Returns current position from Geolocation API.

#### Sample usage

```js
import { useCurrentPosition } from '@wojtekmaj/react-hooks';

useCurrentPosition(); // { latitude: 0, longitude: 0 }
```

### `useEventListener`

Adds event listener to a given element.

#### Sample usage

```js
import { useEventListener } from '@wojtekmaj/react-hooks';

useEventListener(element, 'click', onClick);
```

### `useIntersectionObserver`

Observes a given element using [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver).

#### Sample usage

```js
import { useIntersectionObserver } from '@wojtekmaj/react-hooks';

useIntersectionObserver(element, config, onIntersectionChange);
```

### `useMatchMedia`

Returns a flag which determines if the document matches the given [media query](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) string.

#### Sample usage

```js
import { useMatchMedia } from '@wojtekmaj/react-hooks';

const isDesktop = useMatchMedia('screen and (min-width: 1024px)'); // true / false
```

### `useMutationObserver`

Observes a given element using [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).

#### Sample usage

```js
import { useMutationObserver } from '@wojtekmaj/react-hooks';

useMutationObserver(element, config, onMutation);
```

### `useResizeObserver`

Observes a given element using [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).

#### Sample usage

```js
import { useResizeObserver } from '@wojtekmaj/react-hooks';

useResizeObserver(element, config, onResize);
```

### `useScrollLeft`

Returns current scroll left position in pixels.

#### Sample usage

```js
import { useScrollLeft } from '@wojtekmaj/react-hooks';

const scrollLeft = useScrollLeft(); // 0
```

### `useScrollTop`

Returns current scroll top position in pixels.

#### Sample usage

```js
import { useScrollTop } from '@wojtekmaj/react-hooks';

const scrollTop = useScrollTop(); // 0
```

### `useSetInterval`

Runs a given function every n milliseconds.

#### Sample usage

```js
import { useSetInterval } from '@wojtekmaj/react-hooks';

useSetInterval(fn, 1000);
```

### `useSetTimeout`

Runs a given function after n milliseconds.

#### Sample usage

```js
import { useSetTimeout } from '@wojtekmaj/react-hooks';

useSetTimeout(fn, 1000);
```

### `useTick`

Counts from 0, increasing the number returned every n milliseconds.

#### Sample usage

```js
import { useTick } from '@wojtekmaj/react-hooks';

const tick = useTick(1000); // 0 … 🕐 … 1 … 🕑 … 2 …
```

### `useToggle`

Returns a flag and a function to toggle it.

#### Sample usage

```js
import { useToggle } from '@wojtekmaj/react-hooks';

const [value, toggleValue] = useToggle(); // [false, Function]
```

## License

The MIT License.

## Author

<table>
  <tr>
    <td>
      <img src="https://github.com/wojtekmaj.png?s=100" width="100">
    </td>
    <td>
      Wojciech Maj<br />
      <a href="mailto:kontakt@wojtekmaj.pl">kontakt@wojtekmaj.pl</a><br />
      <a href="http://wojtekmaj.pl">http://wojtekmaj.pl</a>
    </td>
  </tr>
</table>
