---
title: 使用superagent获取豆瓣信息
abbrlink: 32164ea2
date: 2022-06-29T11:02:17.000Z
tags:
  - JavaScript
---

想到在博客上插入一个豆瓣卡片以显示豆瓣主页信息，记得在 Hexo 插件库里面有这种功能的插件，但仔细看了看发现它们又太复杂，于是对照着一个插件的源码自己试着写了一下。  
我的目的是想获取我的豆瓣上面书影音数量，使用 superagent 发起网络请求，cheerio 解析页面获取数据，这两个包我之前也没有了解过，于是在这里记录一下。

<!-- more -->

- BaseSpider.js

  ```JS
  const superagent = require('superagent');
  const cheerio = require('cheerio');
  class BaseSpider {
    constructor(id) {
        this.superagent = superagent;
        this.cheerio = cheerio;
        this.DOUBAN_PAGE = `douban.com/people/${id}`;
    }

    crawl() {}

    parsePlainText(plainText) {}
  }
  module.exports.BaseSpider = BaseSpider;
  ```

- DoubanSpider.js

  ```JS
  const { BaseSpider } = require('./baseSpider');
  class IndexSpider extends BaseSpider {
    constructor(id) {
        super(id);
    }
    crawl() {
        return new Promise((resolve, reject) => {
        this.superagent
            .get(this.DOUBAN_PAGE)
            .set({
            'User-Agent':
                'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:39.0) Gecko/20100101 Firefox/39.0',
            })
            .then((res) => {
            const indexInfo = this.parsePlainText(res.text);
            resolve(indexInfo);
            })
            .catch((err) => {
            reject(err);
            });
        });
    }

    parsePlainText(plainText) {
        const $ = this.cheerio.load(plainText);
        const content = {
            movies: ['在看', '看过', '想看'],
            books: ['在读', '读过', '想读'],
        };
        let info = {
            movies: {},
            books: {},
        };
        const movies = $('#content #movie').find('.pl a').toArray();
        const books = $('#content #book').find('.pl a').toArray();
        Object.keys(content).map((key) => {
            if (key === 'movies') {
                movies.forEach((item) => {
                    const text = $(item).text();
                    content[key].map((cate) => {
                        if (text.indexOf(cate) !== -1) info[key][cate] = text.replace(/\D/g, '');
                    });
                });
            }
            if (key === 'books') {
                books.forEach((item) => {
                const text = $(item).text();
                    content[key].map((cate) => {
                        if (text.indexOf(cate) !== -1) info[key][cate] = text.replace(/\D/g, '');
                    });
                });
            }
        });
        return info;
    }
  }
  module.exports.IndexSpider = IndexSpider;
  ```

- index.js

  ```JS
  const { IndexSpider } = require('./indexSpider');

  const id = 161208120;
  const doubanSpider = new IndexSpider(id);
  doubanSpider
    .crawl()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
  ```

- 最终输出结果

  ```bash
  info:{
    movies: { '在看': '5', '已看': '871', '想看': '268' },
    books: { '在读': '3', '已读': '89', '想读': '34' }
  }
  ```

  暂时还没有想到怎么合理地嵌到我的博客里面，先做出这个 demo，待日后再作研究。
