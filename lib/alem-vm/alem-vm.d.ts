// ALEM Items:

export type ChildrenProps = {
  children: JSX.Element | JSX.Element[] | string | number;
};

export type ModuleResponseData = { response: any; forCallId: number };

/**
 * Provides the necessary states to handle modules
 */
export declare const ModulesContext: () => void;

/**
 * Modules Provider
 */
export declare const ModulesProvider: () => JSX.Element;

/**
 * useModule hook
 */
export type UseModuleProps = {
  setupCode?: string;
  code: string;
  onComplete?: <D>(data: D) => void;
};

export declare const useModule: (inputs: UseModuleProps) => void;

// ======= Routes =======

/**
 * Provides the necessary states and props for Router.
 */
export declare const RouterProvider: () => JSX.Element;

/**
 * Provides the necessary states and props for Router.
 */
export declare const RouterContext: () => void;

type Route = {
  path: string;
  component: () => JSX.Element;
};

type RouterProps = {
  routes: Route[];
  /**
   * Defines how the routes will behave. Default is `URLBased`.
   *
   * `URLBased`: Update the URL and reload/load page;
   * `ContentBased`: Doesn't update the URL and doesn't reload page.
   *
   * Consider using `URLBased` if your project's URL paths are important to its functionality. E.g.: sharing a link for a specific page.
   */
  type?: RouteType;
  /**
   * Parameter name to store current route name. Default is "path".
   */
  parameterName?: string;
  /**
   * Initial route on which you want to start.
   */
  initialRoute?: string;
  alem?: any;
  alemRoutes?: any;
};

/**
 * Init routes usint complex and statefull Router system.
 * @param props
 * @returns
 */
export declare const Router: (props: RouterProps) => JSX.Element;

type LinkProps = {
  to: string;
  /** "href" has priority over "to" */
  href?: string | null;
  target?: string | null;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (event?: any) => void;
  children?: JSX.Element | JSX.Element[] | string | number;
  params?: Record<string, any>;
};

/**
 * Link to access routes.
 */
export declare const RouteLink: ({
  to,
  label,
  className,
  style,
  onClick,
}: LinkProps) => React.JSX.Element;

/**
 * Defines how the routes will behave
 *
 * `URLBased`: Update the URL and reload/load page
 * `ContentBased`: Doesn't update the URL and doesn't reload page
 *
 * E.g.:
 * ```
 * const HomeRoute = createRoute("home", HomePage);
 * const ProfileRoute = createRoute("profile", ProfilePage);
 * return <Routes routes={[HomeRoute, ProfileRoute]} type="URLBased" />;
 * ```
 */
export type RouteType = "URLBased" | "ContentBased";

/**
 * Go programmatically to the route ("route Path").
 *
 * This is NOT going to update the URL path.
 */
export declare const navigate: {
  /**
   * Go to new route
   * @param route
   * @param params
   */
  to: (route: string, params?: Record<string, any>) => void;
  /**
   * Go back to the previous route
   */
  back: () => void;
};

/**
 * Create Route child
 */
export declare const createRoute: (
  path: string,
  component: () => JSX.Element,
) => Route;

/**
 * Get URL params and returns an object of key/value pairs objects
 */
export declare const useParams: () => {
  [values: string]: any;
};

/**
 * This returns the current location object.
 */
export declare const getLocation: () => {
  /**
   * The path of the current Route.
   */
  pathname: string;
  /**
   * Routes available
   */
  routes: string[];
  /**
   * Is routes ready?
   */
  isRoutesReady: boolean;
};

export type History = {
  route: string;
  routeParams?: Record<string, any>;
};

export type UseRoutesProps = {
  routesInitialized: boolean;
  activeRoute: string;
  routeParameterName: string;
  routes: string[];
  routeType: string;
  routeParams: Record<string, any>;
  history: string[];
};

export type UseRoutes = Omit<UseRoutesProps, "routeBlocked">;

/**
 * Use Routes Context props. This can be useful if you'd like to perform some side effect whenever some context data changes.
 * @returns
 */
export declare const useRoutes: () => UseRoutes;

// ======= Context =======

/**
 * Create context for stateful component and send context props to its children
 * This can be useful if you'd like to perform some side effect whenever some context data changes.
 *
 * @param contextKey Context key name (must be unique)
 */
export declare const createContext: <S extends {}>(
  contextKey: string,
) => {
  setDefaultData: (defaultStateValue: S) => void;
  updateData: (updates: Partial<S>) => void;
  getSelf: () => S;
};

/**
 * Use context. This is helpful to get a previous created context's props.
 *
 * @param contextKey Context key name
 * @returns
 */
export declare const useContext: <D>(contextKey: string) => D;

// ======= APIs =======

/**
 * Load external fonts and css files using their URLs.
 *
 * You can use any fonts source.
 *
 * E.g.: Fonts source: https://www.cdnfonts.com/
 *
 *
 * Usage example:
 *
 * ```
 * const stylesLoaded = loadExternalStyles([
 * "https://fonts.cdnfonts.com/css/display",
 * "https://cdn.jsdelivr.net/gh/codemirror/codemirror5/lib/codemirror.css",
 * ]);
 *
 * console.log(stylesLoaded); // true / false
 * ```
 *
 * @returns {boolean} styles files loaded?
 */
export declare const loadExternalStyles: (fontURLs: string[]) => boolean;

/**
 * Call resolve or reject for a given caller
 * E.g:
 * ```
 * const getStorage = () => Storage.get('my-key');
 * const resolve = (storageData) => console.log(storageData);
 * const reject = () => console.log('Error');
 * const timeout = 5000; // 5sec
 * promisify(getStorage, resolve, reject, timeout);
 * ```
 *
 * Default timeout is 10 seconds
 */
export declare const promisify: (
  caller: () => any,
  resolve: (data: any) => void,
  reject?: () => void,
  _timeout?: number,
) => void;

/**
 * Flag saying if it's a development environment
 */
export declare const isDevelopment: boolean;

/**
 * Create a debounced method to obtain the data after the desired interval.
 * @param cb Callback
 * @param timeout Timeout. Default is 1 sec.
 * @returns
 */
export declare const createDebounce: <D>(
  cb: (data: D) => void,
  timeout?: number,
) => (args: any) => void;

// BOS Below:

// Bos
export declare interface BosContext {
  accountId?: string;
  networkId: NetworkId;
}

export declare var props: any;

export declare var context: BosContext;

export declare const Widget: (params: {
  loading?: JSX.Element | JSX.Element[] | string | number;
  code?: string;
  src?: string;
  props?: object;
}) => React.ReactNode;

export declare const Markdown: (params: {
  text: string | undefined;
}) => React.ReactNode;

type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);
export declare function useState<S>(
  initialState: S | (() => S),
): [S, Dispatch<SetStateAction<S>>];

declare const UNDEFINED_VOID_ONLY: unique symbol;
type Destructor = () => void | { [UNDEFINED_VOID_ONLY]: never };
type EffectCallback = () => void | Destructor;
type DependencyList = readonly unknown[];
export declare function useEffect(
  effect: EffectCallback,
  deps?: DependencyList,
): void;

export declare function useMemo<T>(factory: () => T, deps: DependencyList): T;

type FetchOptions = {
  responseType?:
    | "arraybuffer"
    | "blob"
    | "formdata"
    | "json"
    | "text"
    | "application/json";
  method?: string;
  headers?: Record<string, any>;
  body?: string;
  [key]?: any;
};

/**
 * `fetch` allows to fetch data from the URL. It acts like a hook. It's a wrapper around the fetch function from the browser behind the caching layer.
 *
 * Know more: https://docs.near.org/bos/api/web-methods#fetch
 */
export declare const fetch: (
  url: string,
  options?: FetchOptions,
) => { body: any };

/**
 * `asyncFetch` is the async version of `fetch`, meaning that it returns a promise instead of a value.
 *
 * Know more: https://docs.near.org/build/near-components/anatomy/web-methods#async-version
 */
export declare const asyncFetch: (
  url: string,
  options?: FetchOptions,
) => Promise<any>;

/**
 * The `useCache` hook takes a promise through a generator function, fetches the data and caches it. It can be used to easily use and cache data from async data sources.
 *
 * The cache is global for the VM, but each cached element is identified by a unique dataKey within each component.
 *
 * The possible values returned are:
 *
 * - `null` if the cache is cold and data is fetching;
 * - the `cached value` while the data is being fetched;
 * - A new `value` if new data is fetched.
 *
 * Know more: https://docs.near.org/bos/api/web-methods#cache
 */
export declare const useCache: (
  promise: () => Promise<any>,
  key?: string,
) => any;

/**
 * Storage object to store data for widgets that is persistent across refreshes. Simulates localStorage access.
 */
export declare const Storage: {
  /**
   * Sets the public value for a given key under the current widget. The value will be public, so other widgets can read it.
   * @param key
   * @param value
   * @returns
   */
  set: (key: string, value: any) => void;
  /**
   * Returns the public value for a given key under the given widgetSrc or the current widget (if `widgetSrc` is omitted). Can only read public values.
   * @param key
   * @param widgetSrc
   * @returns
   */
  get: (key: string, widgetSrc?: string) => any;
  /**
   * Sets the private value for a given key under the current widget. The value is private, only the current widget can read it. Private and public values can share the same key and don't conflict.
   * @param key
   * @param value
   * @returns
   */
  privateSet: (key: string, value: any) => void;
  /**
   * Returns the private value for a given key under the current widget.
   * @param key
   * @param widgetSrc
   * @returns
   */
  privateGet: (key: string, widgetSrc?: string) => any;
};

/**
 * NEAR Components can **write** data to the system's clipboard through the `clipboard.writeText` method.
 */
export declare const clipboard: {
  /**
   * Copy text to clipboard
   *
   * Know more: https://docs.near.org/bos/api/web-methods#clipboard
   *
   * @param text
   * @returns
   */
  writeText: (text: string) => void;
};

type Call = <R extends {}>(
  contractName: string,
  methodName: string,
  args?: {},
  gas?: string | number,
  deposit?: string | number,
) => void;

type CallList = <R extends {}>(
  callList: {
    contractName: string;
    methodName: string;
    args?: {};
    gas?: string | number;
    deposit?: string | number;
  }[],
) => void;

/**
 * Use Near object to interact with smart contracts in the NEAR blockchain.
 */
export declare const Near: {
  /**
   * View
   *
   * Know more: https://docs.near.org/bos/api/near#nearview
   *
   * @param contractName Name of the smart contract
   * @param methodName Name of the method to call
   * @param args Arguments to pass to the method
   * @param blockId Block ID or finality of the transaction
   * @param subscribe This feature allows users to subscribe to a query, which automatically refreshes the data for all subscribers every 5 seconds.
   * @returns
   */
  view: <R extends {}>(
    contractName: string,
    methodName: string,
    args?: {},
    blockId?: string,
    subscribe?: boolean,
  ) => R;

  /**
   * Call
   *
   * Know more: https://docs.near.org/bos/api/near#nearcall
   *
   * @param contractName Name of the smart contract to call
   * @param methodName Name of the method to call on the smart contract
   * @param args Arguments to pass to the smart contract method as an object instance
   * @param gas Maximum amount of gas to be used for the transaction (default 300Tg)
   * @param deposit Amount of NEAR tokens to attach to the call as deposit (in yoctoNEAR units)
   */
  call: Call | CallList | any;

  /**
   * A list of calls
   * @param callList
   * @returns
   */
  // call: <R extends {}>(
  //   callList: {
  //     contractName: string;
  //     methodName: string;
  //     args?: {};
  //     gas?: string | number;
  //     deposit?: string | number;
  //   }[],
  // ) => R[];

  /**
   * Queries a block from the blockchain.
   *
   * Know more: https://docs.near.org/bos/api/near#nearblock
   *
   * @param blockHeightOrFinality
   * @returns
   */
  block: (blockHeightOrFinality?: "optimistic" | "final") => any;
};

/**
 * NEAR components can natively communicate with the [SocialDB smart contract](https://github.com/NearSocial/social-db) (currently deployed at [social.near](https://nearblocks.io/address/social.near)).
 *
 * The SocialDB is a contract that stores key-value pairs, and is used mostly to store social-related data, such as posts, likes, or profiles.
 */
export declare const Social: {
  /**
   * `Social.get` fetches the data from the SocialDB contract by calling get and returns the data.
   * While the data is fetching the returned value equals to null.
   *
   * Know more: https://docs.near.org/bos/api/social#socialget
   *
   * @param patterns the path pattern(s)
   * @param finality the block height or finality
   * @param options the `options` object.
   * @returns
   */
  get: <R extends {}>(
    patterns: string | string[],
    finality?: "final" | number,
    options?: {
      /**
       * if true, the data will be refreshed every 5 seconds.
       */
      subscribe?: boolean;
      /**
       * whether to return deleted values (as `null`). Default is `false`.
       */
      return_deleted?: boolean;
    },
  ) => R;

  /**
   * `Social.getr` is just a wrapper helper for Social.get, it appends ** to each of the path pattern.
   *
   * Know more: https://docs.near.org/bos/api/social#socialgetr
   *
   * @param patterns the path pattern(s)
   * @param finality the block height or finality
   * @param options the `options` object.
   * @returns
   */
  getr: <R extends {}>(
    patterns: string | string[],
    finality?: "final" | number,
    options?: {
      /**
       * if true, the data will be refreshed every 5 seconds.
       */
      subscribe?: boolean;
      /**
       * whether to return deleted values (as `null`). Default is `false`.
       */
      return_deleted?: boolean;
    },
  ) => R;

  /**
   * It calls the SocialDB's `keys` API and returns the data. While the data is fetching the returned value equals to `null`.
   * The keys contract doesn't unwrap the object, so the returned data is the same as the SocialDB's `keys` API.
   *
   * Know more: https://docs.near.org/bos/api/social#socialkeys
   * @param patterns the path pattern(s)
   * @param finality the block height or finality
   * @param options the `options` object.
   * @returns
   */
  keys: <R extends {}>(
    patterns: string | string[],
    finality?: "final" | number,
    options?: {
      /**
       * if true, the data will be refreshed every 5 seconds.
       */
      subscribe?: boolean;
      /**
       * either `"History"`, `"True"`, or `"BlockHeight"`. If not specified, it will return the `"True"`.
       */
      return_type?: "History" | "True" | "BlockHeight";
      /**
       * whether to return only values (don't include objects). Default is `false`.
       */
      values_only?: boolean;
      /**
       * whether to return deleted values (as `null`). Default is `false`.
       */
      return_deleted?: boolean;
    },
    cacheOptions?: {
      ignoreCache: boolean;
    },
  ) => R;

  /**
   * Takes a `data` object and commits it to SocialDB. It works similarly to the `CommitButton` by spawning the modal window prompt
   * to save data, but it doesn't have to be triggered through the commit button component.
   * It allows you to write more flexible code that relies on async promises and use other events and components.
   * Overall it enables more flexibility when committing to SocialDB. For example, you can commit when Enter key pressed.
   *
   * Know more: https://docs.near.org/bos/api/social#socialset
   *
   * @param data the data object to be committed. Similar to `CommitButton`, it shouldn't start with an account ID.
   * @param options the `options` object.
   * @returns
   */
  set: <R extends {}>(
    data: {},
    options?: {
      force?: boolean;
      /**
       * Function to trigger on successful commit. Will pass the data that was written (including `accountID`).
       * @param data
       * @returns
       */
      onCommit?: (data: any) => void;
      /**
       * Function to trigger if the user cancels the commit.
       * @returns
       */
      onCancel?: () => void;
    },
  ) => R;

  /**
   * Returns the array of matched indexed values. Ordered by `blockHeight`.
   *
   * Know more: https://docs.near.org/bos/api/social#socialindex
   *
   * @param action is the `index_type` from the standard, e.g. in the path `index/like` the action is `like`.
   * @param key is the inner indexed value from the standard.
   * @param options the `options` object.
   * @returns
   */
  index: <R extends {}>(
    action: string,
    key: string,
    options?: {
      /**
       * if true, the data will be refreshed every 5 seconds.
       */
      subscribe?: boolean;
      /**
       * If given, it should either be a string or an array of account IDs to filter values by them. Otherwise, not filters by account Id.
       */
      accountId?: string | string[];
      /**
       * Either `asc` or `desc`. Defaults to `asc`.
       */
      order?: "asc" | "desc";
      /**
       * Defaults to `100`. The number of values to return. Index may return more than index values, if the last elements have the same block height.
       */
      limit?: number;
      /**
       * Defaults to `0` or `Max` depending on order.
       */
      from?: 0 | "Max";
    },
    cacheOptions?: {},
  ) => R;
};

/**
 * A built-in component that enables users to directly upload an image to the InterPlanetary File System (IPFS).
 *
 * Know more: https://docs.near.org/bos/api/builtin-components#ipfsimageupload
 */
export declare const IpfsImageUpload: (params: {
  image: string;
}) => React.ReactNode;

/**
 * CommitButton
 */
export declare const CommitButton: (params: {
  disabled?: boolean;
  force?: boolean;
  className?: string;
  data?: {};
  onCommit?: () => void;
  children?: JSX.Element | JSX.Element[] | string | number;
}) => React.ReactNode;

/**
 * A built-in component that enables to input files with drag and drop support. Read more about the `Files` component [here](https://www.npmjs.com/package/react-files).
 *
 * Know more: https://docs.near.org/bos/api/builtin-components#files
 */
export declare const Files: (params: {
  children?: JSX.Element;
  multiple?: boolean;
  accepts: string[];
  clickable?: boolean;
  className?: string;
  minFileSize?: number;
  style?: React.CSSProperties;
  onChange: (files: File[]) => void;
}) => React.ReactNode;

/**
 * Used to display a message or icon when the mouse is over a DOM element.
 *
 * Know more: https://docs.near.org/bos/api/builtin-components#overlaytrigger
 */
export declare const OverlayTrigger: (params: {
  /**
   * A boolean value that determines whether the overlay is currently visible or not.
   */
  show: string;
  /**
   * An array of events that trigger the display of the overlay. In this example, the `trigger` prop is set to `["hover", "focus"]`, which means that the overlay will be displayed when the user hovers over or focuses on the element.
   */
  trigger: string[];
  /**
   * An object that specifies the delay before the overlay is displayed or hidden. In this example, the `delay` prop is set to `{ show: 250, hide: 300 }`, which means that the overlay will be displayed after a 250-millisecond delay and hidden after a 300-millisecond delay.
   */
  delay: { show: number; hide: number };
  /**
   * A string that specifies the position of the overlay relative to the trigger element. In this example, the `placement` prop is set to `"auto"`, which means that the position will be automatically determined based on available space.
   */
  placement: string;
  /**
   * The content that will be displayed in the overlay.
   */
  overlay: any;
}) => React.ReactNode;

/**
 * Infinitely load a grid or list of items. This component allows you to create a simple, lightweight infinite scrolling page or element by supporting both window and scrollable elements.
 *
 * Read more about the [react-infinite-scroller](https://www.npmjs.com/package/react-infinite-scroller) package.
 *
 * Know more: https://docs.near.org/bos/api/builtin-components#infinitescroll
 */
export declare const InfiniteScroll: (params: {
  loadMore: (page: number) => void;
  hasMore: boolean;
  useWindow?: boolean;
  pageStart?: number;
  threshold?: number;
  loader?: JSX.Element | JSX.Element[] | string | number;
  children?: JSX.Element | JSX.Element[] | string | number;
}) => React.ReactNode;

/**
 * Provides a type-ahead input field for selecting an option from a list of choices. More information about the component can be found [here](https://github.com/ericgio/react-bootstrap-typeahead).
 *
 * Know more: https://docs.near.org/bos/api/builtin-components#typeahead
 */
export declare const TypeAhead: (params: {
  options: string[];
  multiple?: boolean;
  placeholder?: string;
  onChange?: (selectedValue: string) => void;
}) => React.ReactNode;

/**
 * Displays a message once the mouse hovers over a particular item. This component was imported from [React-Bootstrap](https://react-bootstrap-v3.netlify.app/components/tooltips/).
 */
export declare const Tooltip: (params: {
  id?: string;
  children: JSX.Element;
}) => React.ReactNode;

/**
 * Components can import functions from other components. This is useful to reuse code and to create libraries of components.
 *
 * Know more: https://docs.near.org/bos/api/state#import
 */
export declare const VM: {
  require: (source: string) => any;
};

/**
 * BOS State - handle the global component's state
 *
 * Know more: https://docs.near.org/bos/api/state
 */
export declare const State: {
  init: (defaultValue: {}) => void;
  update: (updatedValues: {}) => void;
};

/**
 * BOS State - access all state items
 */
export declare const state: Record<string, any>;
