# astro blog

![Lighthouse](/lighthouse.png)

## How to create a new post with abbrlink

`generate.cjs` file will help to create a new post with params title and dir, the dir default is drafts.

```bash
 yarn run new --title='title-test' --dir="posts"
```

The command will generate a markdown file under _src/content/posts_ directory, and the markdown file content will look like this:

```yaml
---
title: title-test
date: 2024-04-18T02:50:36.418Z
abbrlink: 21cdefe2
---
```
