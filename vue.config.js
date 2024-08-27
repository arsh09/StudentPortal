const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    resolve: {
      fallback: { path: require.resolve('path-browserify') },
    },
  },

  pluginOptions: {
    electronBuilder: {
      externals: [ "better-sqlite3"],
      preload: 'src/preload.js',

      nodeIntegration: true,
      __dirname: true,
      builderOptions : {
        asar : false,  
        appId: "com.buildingbugs.software.student.portal",
        productName: "Student Portal",

        publish: [
          {
            provider: "github",
            protocol: "https",
            private: false,
            owner: "arsh09",
            repo: "StudentPortal",
          },
        ],

        win: {
          target: ["nsis"], 
        },
        portable : {
          requestExecutionLevel: "user"
        },

        nsis: {
          oneClick: false,
          perMachine: false,
          allowToChangeInstallationDirectory: false,
        },

        linux: {
          target: ["deb", "rpm", "snap", "AppImage"],
          category: "app.public.app-category.healthcare-fitness",
        },

        mac: {
          category: "public.app-category.healthcare-fitness",
          gatekeeperAssess: false,
          hardenedRuntime: true,
          type : "distribution", 
          target : ["dmg", "pkg", "zip"]
        },

        dmg: {
          contents: [
            { x: 130, y: 210 },
            { x: 410, y: 220, type: "link", path: "/Applications" },
          ],
          sign: true,
        },

        pkg: {
          installLocation : "/Applications",
          allowAnywhere: false,
          allowCurrentUserHome: true,
          allowRootDirectory: true,
          isVersionChecked: true,
          isRelocatable: false,
          overwriteAction: "upgrade"
        },
      }
    }
  }

});
