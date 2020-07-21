module.exports = {
    "/nuxtjs/": [
        "/lessons/",
        {
            title: 'Nuxt.js Tips',
            collapsable: false,
            path: "/nuxtjs/",
            children: [
                'layout',
                'routes',
                'scss',
                'ssr',
                'dev-server',
                'eslint',
                'stylelint',
            ]
        },
        "/vuejs/",
        "/firebase/"
    ],
}
