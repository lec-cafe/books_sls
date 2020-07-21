module.exports = {
    "/tips/nuxtjs/": [
        "/lessons/",
        {
            title: 'Nuxt.js Tips',
            collapsable: false,
            path: "/tips/nuxtjs/",
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
        "/tips/vuejs/",
        "/tips/firebase/"
    ],
}
