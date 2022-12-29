import React, {
  useState,
  useRef,
  createContext,
  useContext,
  useCallback,
  useEffect,
  useSyncExternalStore, // meant to subscribe to a dataSource
} from "react";

export default function createFastContext(initialState) {
  function useStoreData() {
    const store = useRef(initialState);

    const get = () => store.current;

    const subscribers = useRef(new Set());

    const set = (value) => {
      store.current = { ...store.current, ...value };
      subscribers.current.forEach((callback) => callback());
    };

    const subscribe = (callback) => {
      subscribers.current.add(callback);
      return () => {
        subscribers.current.delete(callback);
      };
    };

    return { get, set, subscribe };
  }

  const StoreContext = createContext(null);

  const Provider = ({ children }) => {
    return (
      <StoreContext.Provider value={useStoreData()}>
        {children}
      </StoreContext.Provider>
    );
  };

  function useStore(selector) {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error("Store not found!");
    }

    // const [state, setState] = useState(() => selector(store.get()));
    // useEffect(() => {
    //   return store.subscribe(() => setState(selector(store.get())));
    // });
    const state = useSyncExternalStore(store.subscribe, () =>
      selector(store.get())
    );

    return [state, store.set];
  }

  return { Provider, useStore };
}
