interface Singleton {
  observer: Record<string, Array<(payload?: unknown) => void>>;
  windowParent: Window & typeof globalThis;
  isDestroyed: boolean;
}

type Keys = keyof Singleton;

const singleton = (<K extends Keys>() => new Map<K, Singleton[K]>())();

export function getInstance<T extends Keys>(instanceKey: T): Singleton[T] {
  if (singleton.has(instanceKey)) {
    // @ts-ignore
    return singleton.get<T, Singleton[T]>(instanceKey);
  }

  return undefined;
}

export function setInstanceValue<K extends Keys>(
  instanceKey: K,
  value: Singleton[K]
) {
  singleton.set(instanceKey, value);
}

export function destroyInstances() {
  singleton.forEach((_, instanceKey) => {
    singleton.delete(instanceKey);
  });
}
