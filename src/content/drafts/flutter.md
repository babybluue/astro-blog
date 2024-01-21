#### Effective Dart

##### Style

包导入顺序 dart:>package:>relative path，与 exports 分开，合理区分

##### Doc comments

///

##### Usage

- Null

  1. DON’T explicitly initialize variables to null. `int num?`
  2. DON’T use an explicit default value of null.
  3. DON’T use true or false in equality operations
  4. AVOID late variables if you need to check whether they are initialized.
  5. CONSIDER assigning a nullable field to a local variable to enable type promotion.

- String

  1. AVOID using curly braces in interpolation when not needed.

- Function

  1. DON’T create a lambda when a tear-off will do.

     ```dart
     var charCodes = [68, 97, 114, 116];
     charCodes.forEach(print);
     ```

- Variables

  1. DO follow a consistent rule for var and final on local variables.
     Most local variables shouldn’t have type annotations and should be declared using just var or final. There are two rules in wide use for when to use one or the other:

     - Use final for local variables that are not reassigned and var for those that are.

     - Use var for all local variables, even ones that aren’t reassigned. Never use final for locals. (Using final for fields and top-level variables is still encouraged, of course.)

#### [Effective Flutter](https://docs.flutter.dev/perf/best-practices)

##### Control build() cost

Here are some things to keep in mind when designing your UI:

Avoid repetitive and costly work in build() methods since build() can be invoked frequently when ancestor widgets rebuild.
Avoid overly large single widgets with a large build() function. Split them into different widgets based on encapsulation but also on how they change:
When setState() is called on a State object, all descendent widgets rebuild. Therefore, localize the setState() call to the part of the subtree whose UI actually needs to change. Avoid calling setState() high up in the tree if the change is contained to a small part of the tree.
The traversal to rebuild all descendents stops when the same instance of the child widget as the previous frame is re-encountered. This technique is heavily used inside the framework for optimizing animations where the animation doesn’t affect the child subtree. See the TransitionBuilder pattern and the source code for SlideTransition, which uses this principle to avoid rebuilding its descendents when animating. (“Same instance” is evaluated using operator ==, but see the pitfalls section at the end of this page for advice on when to avoid overriding operator ==.)
Use const constructors on widgets as much as possible, since they allow Flutter to short-circuit most of the rebuild work. To be automatically reminded to use const when possible, enable the recommended lints from the flutter_lints package. For more information, check out the flutter_lints migration guide.
To create reusable pieces of UIs, prefer using a StatelessWidget rather than a function.

#### [Flutter Architectural](https://docs.flutter.dev/resources/architectural-overview)

- 架构
  Framework(dart) 提供 API 封装，编写应用
  Engine(c++) 生成栅格化，封装核心 api，通过 dart:ui 暴漏给框架
  Embedder 协调底层操作系统服务

- Widget
  StatelessWidget
  StatefulWidget
  InheritedWidget `Theme.of(context).textTheme.titleLarge`

- 与其他代码集成

  MethodChannel 与 Android/IOS 原生语言交互
  dart:ffi(foreign function interface) 与基于 C 语言代码交互

#### State

state 分为 ephemeral(短暂的) state 与 app state。ephemeral state 指的是当前页面 ui 的一些变化，完全可以使用 setState 来控制;app state 表示整个 app 共享或者全局存在的状态，比如用户登录信息，不同组件共享内容，此时需要使用单独安装的状态管理工具。

[State Management](https://docs.flutter.dev/data-and-backend/state-mgmt/intro)

[List of state management approaches](https://docs.flutter.dev/data-and-backend/state-mgmt/options)

#### Isolate

[concurrency in flutter](https://dart.dev/language/concurrency)

#### Native platform

原生平台指的是针对特定的操作系统或者设备，比如移动设备和桌面，相应地原生应用指的是针对特定平台开发的应用，能够充分利用平台提供的特性和功能。

Dart 分成 Native platform 和 Web platform，因此 Dart 中 Native 指的是针对特定平台开发，与 web 相对。

例如 compute 和 Isolate.run 的区别

> Flutter note: If you’re using Flutter, consider using Flutter’s compute() function instead of Isolate.run(). The compute function allows your code to work on both native and non-native platforms. Use Isolate.run() when targeting native platforms only for a more ergonomic API.

#### [Widget](https://docs.flutter.dev/ui/widgets)

- Text style 属性给文字添加样式
- Row/Column 创建 flex 布局
- Stack 相对定位布局，在 Stack 子元素中添加 Positioned widget 可以设置绝对定位
- Container 矩形元素，可以通过 boxDecoration 修饰 (颜色/背景/边框等)
- Flexible 子元素尺寸可以根据 flex 布局灵活调整
- Expanded 强制子元素填充空白

> Tip: What’s the difference between Flexible and Expanded? Use Flexible to resize widgets in a Row or Column. That way, you can adjust a child widget’s spacing while keeping its size in relation to its parent widget. Expanded changes the constraints of a child widget, so it fills any empty space.

- SizedBox 通过 height/width 属性调整尺寸，不包含任何子元素时可以用来创建空白元素
- Spacer 创建空白
- Icon
- Image

> Tip: What’s the difference between SizedBox and Spacer? Use Spacer when you want to create space using a flex property. Use SizedBox when you want to create space using a specific number of logical pixels.

- [Slivers](https://docs.flutter.dev/ui/advanced/slivers)

  在 Flutter 中，Slivers 是一种特殊的 Widget 类型，用于构建可滚动视图。Sliver 可以理解为页面上的一个小片段或区域，在可滚动视图中可以独立地进行滚动和渲染。

  使用 Slivers 能够提供更加灵活和高效的控制方式，因为它们允许开发人员将大型布局切分成多个小块，并对每个小块进行优化处理。例如，当用户向下滑动时，只需要重新计算并更新当前显示内容所对应的那些 sliver 即可，而不必重新绘制整个屏幕上所有的元素。

  常见的 slivers 包括：

  SliverAppBar：类似于普通 AppBar 但是支持悬停、折叠等效果。
  SliverList：用于展示单一列表数据项。
  SliverGrid：用于展示网格布局数据项。
  SliverToBoxAdapter：将任意 Widget 转换为一个 sliver 来使用。

#### 导航

- 具名路由

  ```dart
  // router model
    class Route {
      final String name;
      final String route;
      final WidgetBuilder builder;

      const Route({
        required this.name,
        required this.route,
        required this.builder,
      });
    }

  ```

  ```dart
  final routes = [
  Route(
      name: 'page-one',
      route: PageOne.routeName,
      builder: (context) => const PageOne()),
  Route(
      name: 'page-two',
      route: PageTwo.routeName,
      builder: (context) => const PageTwo()),
  Route(
      name: 'page-three',
      route: PageThree.routeName,
      builder: (context) => const PageThree()),
  Route(
      name: 'page-four',
      route: PageFour.routeName,
      builder: (context) => const PageFour()),
  ];

    final router = GoRouter(
      routes: [
        GoRoute(
          path: '/',
          builder: (context, state) => const HomePage(),
          routes: [
            for (final route in routes)
              GoRoute(
                  name: route.name,
                  path: route.route,
                  builder: (context, state) => route.builder(context)),
          ],
        ),
      ],
    );

  ```

  ```dart
  context.go('/${r.route}');
  ```

- 栈路由

  ```dart
  TextButton(
    onPressed: () {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) {
          return const PageTwo();
        }),
      );
    },
    child: const Text('jump two'),
  )
  ```

#### QA

- 修改 flutter 组件 (Material/Cuppertino) 默认语言 [Flutter International](https://docs.flutter.dev/accessibility-and-localization/internationalization)

  ```bash
   flutter pub add flutter_localizations --sdk=flutter
  ```

  ```yaml
  dependencies:
    flutter:
      sdk: flutter
    flutter_localizations:
      sdk: flutter
  ```

  ```dart
  MaterialApp(
    title: 'Flutter Demo',
    localizationsDelegates: const [
      GlobalMaterialLocalizations.delegate,
      GlobalCupertinoLocalizations.delegate,
      GlobalWidgetsLocalizations.delegate
    ],
    supportedLocales: const [Locale('zh', 'HK')],
  )
  ```

- Do not use BuildContexts across async gaps

  ```dart
    if (context.mounted) {
      if (menuVal == SampleItem.itemOne) {
        Navigator.pushNamed(context, '/changePassword');
      }
      if (menuVal == SampleItem.itemTwo) {
        // 点击退出后的事件处理函数
        showDialog<String>(
            builder: (context) => const LogOutDialogScreen(), context: context);
      }
    }
  ```

- 移动设备唤起键盘时，ModalBottomSheet 响应性地悬浮于键盘上面
  对子元素添加 padding 属性，其值为 EdgeInsets.only(bottom: MediaQuery.of(context).viewInsets.bottom)

  > ## viewInsets
  >
  > When a mobile device's keyboard is visible viewInsets.bottom corresponds to the top of the keyboard.

  ```dart
    showBottomSheet() {
      showModalBottomSheet(
        backgroundColor: Colors.white,
        isScrollControlled: true,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8.0),
        ),
        context: context,
        builder: (context) => Container(
          padding: EdgeInsets.only(bottom: MediaQuery.of(context).viewInsets.bottom),
          child: body,
        ),
      );
  }
  ```

- Text overflow 属性

  ```dart
    Expanded(
      child: Text(
      projectItems[index],
      overflow: TextOverflow.ellipsis,
      style: TextStyle(
        color: _activeProjectIndex == index
              ? Colors.white
              : const Color(0xff171717),
              fontSize: 15),
        ),
    ),
  ```

- riverpod 自动代码生成

  `flutter pub run build_runner watch`

  ```dart
  //@riverpod 注释默认生成 autoDispose 类型，停止监听时自动销毁
  @Riverpod(keepAlive: true)
  class Me extends _$Me {
    @override
    UserModel? build() => null;

    void initMe(
      UserModel user,
    ) {
      state = user;
    }

    void removeMe() {
      state = null;
    }
  }

  ```

- The binary version of its metadata is 1.8.0, expected version is 1.6.0.

  ```bash
  flutter pub cache clean
  delete pubspec.lock
  flutter pub get
  ```

- 关闭键盘
  `FocusScope.of(context).requestFocus(FocusNode());`
