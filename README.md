# cenum

## 安装
Using npm:
```bash
$ npm install cenum
```
or using yarn:
```bash
$ yarn add cenum
```

## 用法

```javascript
import Enum from 'cenum';

const status = new Enum([
  {name: 'ACTIVE', value: 1, label: '激活'},
  {name: 'INACTIVE', value: 0, lable: '未激活'}
]);

status.ACTIVE.is(1); // true
status.ACTIVE.is('ACTIVE'); // true
status.ACTIVE.is('激活'); // true

status.has('INACTIVE'); // true
status.has(0); // true
status.has('未激活'); // true

status.ACTIVE.label // 激活
status.ACTIVE.name // ACTIVE
status.ACTIVE.value // 0
```

or use parse
```javascript
import { enums, parse } from 'cenum';

parse({
  role: [
    {name: 'ACTIVE', value: 1, label: '激活'},
    {name: 'INACTIVE', value: 0, lable: '未激活'}
  ],
  gender: [
    ['MALE', 1, '男'],
    ['FEMALE', 0, '女']
  ]
})

enums.role // 角色Enum
enums.gender // 性别Enum
```

请确保每一条的name, value, label互相之前都是不一样的
