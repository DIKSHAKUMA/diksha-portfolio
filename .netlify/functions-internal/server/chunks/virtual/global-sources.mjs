const sources = [
    {
        "context": {
            "name": "sitemap:urls",
            "description": "Set with the `sitemap.urls` config."
        },
        "urls": [
            {
                "loc": "/",
                "lastmod": "2026-02-08",
                "changefreq": "weekly",
                "priority": 1
            },
            {
                "loc": "/about",
                "lastmod": "2026-02-08",
                "changefreq": "monthly",
                "priority": 0.8
            },
            {
                "loc": "/projects",
                "lastmod": "2026-02-08",
                "changefreq": "weekly",
                "priority": 0.9
            },
            {
                "loc": "/blog",
                "lastmod": "2026-02-08",
                "changefreq": "weekly",
                "priority": 0.8
            },
            {
                "loc": "/contact",
                "lastmod": "2026-02-08",
                "changefreq": "monthly",
                "priority": 0.7
            }
        ],
        "sourceType": "user"
    },
    {
        "context": {
            "name": "nuxt:pages",
            "description": "Generated from your static page files.",
            "tips": [
                "Can be disabled with `{ excludeAppSources: ['nuxt:pages'] }`."
            ]
        },
        "urls": [
            {
                "loc": "/about"
            },
            {
                "loc": "/blog"
            },
            {
                "loc": "/contact"
            },
            {
                "loc": "/projects"
            },
            {
                "loc": "/"
            }
        ],
        "sourceType": "app"
    }
];

export { sources };
//# sourceMappingURL=global-sources.mjs.map
