module.exports = {
  siteMetadata: {
    siteUrl: "https://shahabyazdi.github.io/react-element-popper/",
    en: {
      title: "React Element Popper",
      description: "A small React component to create a variety of elements that require Popper, such as dropdown menus, modals, multi selects, and more.",
      keywords: ["react", "element", "popper", "component", "position", "dropdown", "modal"],
      type: "website"
    },
    fa: {
      title: "ری اکت المنت پاپر",
      description: "یک کامپوننت کم حجم ری اکت برای ساخت عناصر متنوعی که به Popper نیاز دارند ، مانند  dropdown ها، modal ها ، multi select ها و غیره .",
      keywords: ["ری اکت", "المنت", "پاپر", "کامپوننت", "منو", "منو کشویی"],
      type: "وب سایت"
    }
  },
  pathPrefix: "/react-element-popper",
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png"
      }
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/
        }
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages/`
      }
    }
  ]
}
