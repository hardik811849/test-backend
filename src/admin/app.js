import fav from "./extensions/Frame 1618873746.png";

const config = {
  // Replace the favicon

  head: {
    favicon: fav,
  },
  auth: {
    logo: fav, // Replace with the path to your logo
  },
  menu: {
    logo: fav, // Replace with the path to your logo
  },
  // Extend the translations
  translations: {
    en: {
      "app.components.LeftMenu.navbrand.title": "Finix196 Dashboard",

      "app.components.LeftMenu.navbrand.workplace": "Testing",

      "Auth.form.welcome.title": "Welcom to Finix196 Dashboard",

      "Auth.form.welcome.subtitle": "Login to your account",

      "Settings.profile.form.section.experience.interfaceLanguageHelp":
        "Unlocking Liquidity & Opportunities",
    },
  },
  // Disable video tutorials
  tutorials: false,
  // Disable notifications about new Strapi releases
  notifications: { releases: false },
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config,
  bootstrap,
};
