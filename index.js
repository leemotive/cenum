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
  constructor(items) {
    adapter(items).forEach((data, index) => {
      const { label, name } = data;
      this[name ?? label] = new Item({ ...data, ordinal: index }, this);
    });
  }
  get(data) {
    return Object.values(this).find(item => item.isItem && item.is(data));
  }

  has(data) {
    return !!this.get(data);
  }
}

class Item {
  constructor(data, enumer) {
    const { label, name, value, ordinal } = data;
    this.label = label ?? name;
    this.name = name ?? label;
    this.value = value;
    this.ordinal = ordinal;

    this.isItem = true;
    Object.defineProperties(this, {
      __original: {
        value: data,
      },
      __enumer: {
        value: enumer,
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
  in(...data) {
    return data.flat().some(v => this.is(v));
  }
  compare(data) {
    const item = this.__enumer.get(data);
    if (!item) {
      throw new Error(`unknown enum value for: ${data}`);
    }

    return Math.sign(this.ordinal - item.ordinal);
  }
}

const enums = {};

export default Enum;

export function parse(json) {
  if (!json || typeof json !== 'object') {
    return enums;
  }
  Object.entries(json).forEach(([name, value]) => {
    if (typeof value === 'object') {
      enums[name] = new Enum(value);
    }
  });
  return enums;
}
export { enums };
