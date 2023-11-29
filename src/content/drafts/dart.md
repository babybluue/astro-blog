#### 变量

```dart
// 推断类型声明
var name='Li';

// 指定类型声明
String name='Li';
Object name='li';

// 未指定默认值时声明将默认是初始值 null
var abc;
int? abc; // ?允许 abc 是 null

// 声明一个非空的未初始化变量
late int abc;

// 常量
const number=100; // const 是编译时常量
final number=100;


final time = DateTime.now();//不会报错
const time = DateTime.now();//将会报错
```

#### 数据类型

- Numbers (int, double)

  ```dart
  int a = 100;
  double b = 2.1;
  ```

- Strings (String)

  ```dart
  String a= 'hello'
  ```

- Booleans (bool)

  ```dart
  //在 if 语句里，数值类型只能是布尔，其他类型报错
  if('true'){
  // 将会报错
  }
  ```

- Lists (List, also known as arrays)

  ```dart
  var list1=[1,2,3,4]

  var list2=[5,6,7]

  const list3=[...list1,...list2]

  ```

- Sets (Set)

  ```dart
  var ele = <String>{};
  ele.add('hello')

  ```

- Maps (Map)

  ```dart
  const student = {"name": "li", "age": 32};

  void test() {
    print(student['name']);
    print(student.length);
  }
  ```

```

- Runes (Runes; often replaced by the characters API)
- Symbols (Symbol)
- The value null (Null)
```

#### 函数

> Every app must have a top-level main() function, which serves as the entrypoint to the app. The main() function returns void and has an optional List<String> parameter for arguments.

#### 包管理 pub package manager

- 配置文件 pubspec.yaml
- 命令

  ```bash
  dart pub get #根据 pubspec 文件安装依赖

  dart pub add 'package' #安装指定包

  dart pub upgrade

  dart pub remove

  ```

- 引用
  ```dart
  import 'package:_name_.dart'
  import 'package:aaa.dart' as aaa
  ```
