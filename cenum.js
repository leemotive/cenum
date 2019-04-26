function adapter(data) {
  if (Array.isArray(data) && data.length) {
    const item0 = data[0];
    if (Array.isArray(item0)) {
      return data.map(([name, value, label]) => ({
        name,
        value,
        label: label ?? name,
      }));
    } else if (typeof item0 === 'object') {
      return data;
    } else {
      return data.map(name => ({ name, value: name }));
    }
  } else if (typeof data === 'object') {
    return Object.entries(data).map(([name, value]) => ({ name, value }));
  }
}

class Enum {
  constructor(data) {
    for (let item of adapter(data)) {
      const { label, name } = item;
      this[name ?? label] = new Item(item);
    }
  }
  get(data) {
    return Object.values(this).find(item => item.isItem && item.is(data));
  }

  has(data) {
    return !!this.get(data);
  }
}

class Item {
  constructor(data) {
    const { label, name, value } = data;
    this.label = label ?? name;
    this.name = name ?? label;
    this.value = value;

    Object.defineProperties(this, {
      isItem: {
        configurable: false,
        enumerable: false,
        value: true,
        writable: false,
      },
      __original: {
        configurable: false,
        enumerable: false,
        value: data,
        writable: false,
      },
    });
    Object.freeze(this);
  }

  is(data) {
    return [this.label, this.name, this.value, this].includes(data);
  }
  equals(data) {
    return this.is(data);
  }
}

const enums = {};

export default Enum;

export function parse(json) {
  if (!json || typeof json !== 'object') {
    return;
  }
  Object.entries(json).forEach(([name, value]) => {
    if (typeof value === 'object') {
      enums[name] = new Enum(value);
    }
  });
  return enums;
}
export { enums };
