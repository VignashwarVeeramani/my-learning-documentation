// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'My Learning Documentation',
  tagline: 'A personal knowledge base for my learning journey.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://VignashwarVeeramani.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/my-learning-documentation/',

  // GitHub pages deployment config.
  // You will need to update these for your own deployment.
  organizationName: 'VignashwarVeeramani', // Usually your GitHub org/user name.
  projectName: 'my-learning-documentation', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  trailingSlash: true,

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          editUrl:
            'https://github.com/VignashwarVeeramani/my-learning-documentation/tree/main/',
        },
        blog: false, // Disable the blog plugin
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'My Learning Docs',
        logo: {
          alt: 'My Site Logo',
          src: '/img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'javaSidebar',
            position: 'left',
            label: 'Java',
          },
          {
            type: 'docSidebar',
            sidebarId: 'springbootSidebar',
            position: 'left',
            label: 'Spring Boot',
          },
          {
            type: 'docSidebar',
            sidebarId: 'pythonSidebar',
            position: 'left',
            label: 'Python',
          },
          {
            type: 'docSidebar',
            sidebarId: 'datastructuresSideBar',
            position: 'left',
            label: 'Datastructures and Algorithms',
            },
          {
            type: 'docSidebar',
            sidebarId: 'dockerSidebar',
            position: 'left',
            label: 'Docker',
          },
          {
            type: 'docSidebar',
            sidebarId: 'asxSidebar',
            position: 'left',
            label: 'ASX Stocks',
          },
          {
            href: 'https://github.com/VignashwarVeeramani/my-learning-documentation',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} My Learning Documentation. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;