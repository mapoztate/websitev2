module.exports = {
  siteMetadata: {
    title: `Matthew Prado`,
    author: {
      name: `Matthew Prado`,
      summary: `Researcher in data science, cybersecurity, education, and Philippine development.`,
    },
    description: `Fun blogs about life, liberty, and the pursuit of data science.`,
    siteUrl: `https://www.mapoztate.com`,
    social: {
      twitter: `mapoztate`,
      instagram: `mapoztate`,
      github: `mapoztate`,
    },
    socialLinks: [
      {
        name: '_',
        url: '/',
      },
    ],
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `media`,
        path: `${__dirname}/static/media`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/content/pages`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-relative-images`,
            options: {
              staticFolderName: 'static',
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
              backgroundColor: 'transparent',
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/netlify-cms/index.js`,
        enableIdentityWidget: true,
        publicPath: 'admin',
        htmlTitle: 'Content Manager',
        includeRobots: false,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map((node) => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ 'content:encoded': node.html }],
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Source Sans Pro`, `Poppins\:400,400i,700`],
        display: 'swap',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Matthew Prado`,
        short_name: `mapoztate.com`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
};