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

status.get('ACTIVE').is(1); // true
status.get('ACTIVE').is('ACTIVE'); // true
status.get('ACTIVE').is('激活'); // true

status.has('INACTIVE'); // true
status.has(0); // true
status.has('未激活'); // true

status.get('ACTIVE').in(0, 1) // true
status.get('ACTIVE').in(['ACTIVE', '未激活']) // true

status.get('ACTIVE').label // 激活
status.get('ACTIVE').name // ACTIVE
status.get('ACTIVE').value // 0
```

除了通过 `get` 方法获取对应的枚举，还可以通过枚举名称直接获取，前提条件是枚举名称和内部变量不产生冲突，所以建议名称使用大写，因为内部变量都用的小写，保证不冲突
```javascript
status.ACTIVE.label // 激活
```

或者使用parse批量转换
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

构造方法的参数有四种格式
1. 以对象方式完整定义name, value, label  
  [{name, value, label}, ...] 
1. 以数组方式完整定义name, value, label  
  [[name, value, label], ...]
1. 只提供值, name和labe将和value保持一致  
  [value, ...]
1. 以键-值对的方式定义name和value  
  {name: value, ...}

>当缺失name或者label的时候，将自动用name表示label或者用label表示name  
当name和label都没有的时候，将默认等于value



请确保每一条的name, value, label互相之间都是不一样的
