const { description } = require('../../package')
const sidebar = require("./nav.js")

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'AWS Serverless Note',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: "AWS を利用した Servrless 開発の Tips 集を掲載していきます。",

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  markdown: {
    anchor: {
      level: [1, 2, 3],
      slugify: (s) => encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-')),
      permalink: true,
      permalinkBefore: true,
      permalinkSymbol: '#'
    },
    config: md => {
      md.use(require('markdown-it-playground'))
    },
    linkify: true
  },
  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'lec-cafe/books-nuxtjs',
    editLinks: true,
    docsDir: 'docs',
    editLinkText: 'ページに不明点や誤字等があれば、Github にて修正を提案してください！',
    lastUpdated: false,
    nav: [
      {text: 'Lec Café', link: 'https://leccafe.connpass.com/'},
    ],
    sidebar: {
      ...require('../lessons/restapi/sidebar'),
      ...require('../lessons/sidebar'),
      // ...require('../tips/nuxtjs/sidebar'),
      // ...require('../tips/vuejs/sidebar'),
      // ...require('../tips/firebase/sidebar'),
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    ['disqus',{
      'shortname': "leccafe-nuxtjs-tips"
    }]

  ]
}
