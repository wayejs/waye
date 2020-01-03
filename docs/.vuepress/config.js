const path = require('path')
function resolve (dir) {
  return path.join(__dirname, '.', dir)
}
module.exports = {
  title: 'WayeJs',
  description: '基于 Element UI 扩展的组件',
  base: '/',
  // head: [
  //   ['link', { rel: 'stylesheet', href: 'https://unpkg.com/element-ui/lib/theme-chalk/index.css' }],
  //   ['script', { src: 'https://unpkg.com/element-ui/lib/index.js' }]
  //   ['script', { src: 'https://unpkg.com/moment@2.24.0/moment.js' }]
  // ],
  themeConfig: {
    locales: {
      '/': {
        label: '中文',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: [
          {
            text: '组件',
            link: '/components'
          }
        ],
        sidebar: {
          '/components/': [
            {
              title: '组件',
              collapsable: false,
              children: [
                '',
                'badge-status',
                'button-confirm',
                'card',
                'card-list',
                'circle',
                'date-picker',
                'dialog',
                'form',
                'frame-viewer',
                'icon',
                'resubmit-prevent',
                'search',
                'select',
                'select-region',
                'table',
                'tag'
              ]
            }
          ]
        }
      }
    }
  },

  configureWebpack: {
    // externals: {
    //   moment: 'moment',
    //   'element-ui': 'element-ui'
    // },
    resolve: {
      alias: {
        'main': path.resolve(__dirname, '../../src'),
        packages: path.resolve(__dirname, '../../packages')
      }
    }
  }
}
