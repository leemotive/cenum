/* eslint no-use-before-define: ["error", {"classes": false}], max-classes-per-file: "off" */
type ObjectItem = {
  name: string;
  label?: string;
  value: unknown;
};
type ArrayItem = [string, unknown, string];

function adapter(data: Array<ObjectItem | ArrayItem | string> | object): Array<ObjectItem> {
  if (Array.isArray(data) && data.length) {
    const item0 = data[0];
    if (Array.isArray(item0)) {
      return (data as ArrayItem[]).map(([name, value, label]) => ({
        name,
        value,
        label: label ?? name,
      }));
    }
    if (typeof item0 === 'object') {
      return data as ObjectItem[];
    }
    return (data as string[]).map(name => ({ name, value: name }));
  }
  if (typeof data === 'object') {
    return Object.entries(data).map(([name, value]) => ({ name, value: value as unknown }));
  }
  return [];
}

// eslint-disable-next-line no-use-before-define
type FindType = number | string | Item;

class Enum {
  // eslint-disable-next-line no-use-before-define
  [k: string]: Item;

  // @ts-expect-error ignore incompatible width index signature;
  private enums: {
    // eslint-disable-next-line no-use-before-define
    [k: string]: Item;
  };

  constructor(items: Array<ObjectItem | ArrayItem | string> | object) {
    this.enums = {};
    adapter(items).forEach((data, index) => {
      const { label, name } = data;
      const key = name ?? label;
      const item = new Item({ ...data, ordinal: index }, this);
      this.enums[key] = item;

      if (!['get', 'has', 'enums'].includes(key)) {
        // support visit via enum name if the name is not same as reserved keys;
        this[key] = item;
      }
    });
  }

  // @ts-expect-error ignore incompatible width index signature;
  get(data: FindType): Item {
    const obj = Object.values(this.enums).find(item => item.is(data));
    if (!obj) {
      throw Error(`unknown enum value: ${data.toString()}`);
    }
    return obj;
  }

  // @ts-expect-error ignore incompatible width index signature;
  has(data: FindType): boolean {
    try {
      return !!this.get(data);
    } catch {
      return false;
    }
  }
}

class Item {
  label: string;

  name: string;

  value: unknown;

  isItem: boolean;

  private ordinal: number;

  // @ts-expect-error use Object.defineProperty in constructor
  original: object;

  // @ts-expect-error use Object.defineProperty in constructor
  enumer: Enum;

  constructor(data: ObjectItem & { ordinal: number }, enumer: Enum) {
    const { label, name, value, ordinal } = data;
    this.label = label ?? name;
    this.name = name ?? label;
    this.value = value;
    this.ordinal = ordinal;

    this.isItem = true;
    Object.defineProperties(this, {
      original: {
        value: data,
      },
      enumer: {
        enumerable: false,
        value: enumer,
      },
    });
    Object.freeze(this);
  }

  is(data: FindType) {
    return [this.label, this.name, this.value, this].includes(data);
  }

  equals(data: FindType) {
    return this.is(data);
  }

  in(...data: FindType[]) {
    return data.flat().some(v => this.is(v));
  }

  compare(data: FindType) {
    const item = this.enumer.get(data);

    return Math.sign(this.ordinal - item.ordinal);
  }
}

const enums: { [k: string]: Enum } = {};

export default Enum;

export function parse(json: object) {
  if (!json || typeof json !== 'object') {
    return enums;
  }
  Object.entries(json).forEach(([name, value]) => {
    if (typeof value === 'object') {
      enums[name] = new Enum(value as object);
    }
  });
  return enums;
}
export { enums };
