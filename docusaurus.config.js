/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Gura',
  tagline: '',
  url: 'https://gura.netlify.app/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'JWare',
  projectName: 'Gura',
  themeConfig: {
    navbar: {
      title: 'Gura',
      logo: {
        alt: 'Gura Logo',
        src: 'img/gura-thumbnail.png',
      },
      items: [
        { to: 'docs/gura', label: 'Docs', position: 'left' },
        { to: 'resources', label: 'Resources', position: 'left' },
        {
          type: 'docsVersionDropdown',
          position: 'right'
        },
        {
          href: 'https://discord.gg/Qs5AXPQpKd',
          position: 'right',
          className: 'header-discord-link header-icon-link',
          title: 'Discord server',
          'aria-label': 'Discord server',
        },
        {
          href: 'https://github.com/gura-conf/gura',
          position: 'right',
          className: 'header-github-link header-icon-link',
          title: 'GitHub repository',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} JWare Solutions`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          /**
           * Skip the next release docs when versioning is enabled.
           * This will not generate HTML files in the production build for documents
           * in `/docs/next` directory, only versioned docs.
           */
          includeCurrentVersion: false,
        },
        theme: {
          customCss: [
            require.resolve('./src/css/custom.scss'),
          ]
        },
      },
    ],
  ],
  plugins: ['docusaurus-plugin-sass'],
};
