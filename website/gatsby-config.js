module.exports = {
  siteMetadata: {
    siteUrl: "https://shahabyazdi.github.io/react-element-popper/",
    en: {
      title: "React Element Popper",
      description: "element popper component for react.",
      keywords: ["react", "element", "popper", "component", "position"],
      type: "website"
    },
    fa: {
      title: "ری اکت المنت پاپر",
      description: "کامپوننت المنت پاپر برای ری اکت",
      keywords: ["ری اکت", "المنت", "پاپر", "کاکپوننت"],
      type: "وب سایت"
    }
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
        }
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages/`,
      }
    }
  ],
};
