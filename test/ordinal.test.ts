import CEnum, { parse, enums } from '../index';

test('base', () => {
  const directions = new CEnum([
    { label: '上', value: 1, name: 'top' },
    { label: '右', value: 2, name: 'right' },
    { label: '下', value: 3, name: 'bottom' },
    { label: '左', value: 4, name: 'left' },
  ]);
  expect(directions.get(1).label).toBe('上');
  expect(directions.get(1).compare(directions.get(2))).toBe(-1);
  expect(directions.has(3)).toBeTruthy();
  expect(directions.has(5)).toBeFalsy();
  expect(directions.get('左').equals('left')).toBeTruthy();
  expect(directions.get('下').in(3, 'bottom')).toBeTruthy();
  expect(directions.get('下').in(1, 'top')).toBeFalsy();
});

test('对象构造', () => {
  const directions = new CEnum({
    man: 'male',
    woman: 'female',
  });
  expect(directions.get('man').equals('male'));
});

test('数组构造', () => {
  const directions = new CEnum([
    ['man', 'male', '男'],
    ['woman', 'female', '女'],
    ['unknown', 'unknown'],
  ]);
  expect(directions.get('woman').equals('female'));
});

test('字符串构造', () => {
  const directions = new CEnum(['east', 'south', 'west', 'north']);
  expect(directions.get('north').compare('south')).toBe(1);
});

test('内部持有', () => {
  parse({ gender: ['male', 'female'] });

  expect(enums.gender.get('male').compare('female')).toBe(-1);
});
