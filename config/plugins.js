module.exports = () => ({
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },

  "dash-board": {
    enabled: true,
    resolve: "./src/plugins/dash-board",
  },
});
