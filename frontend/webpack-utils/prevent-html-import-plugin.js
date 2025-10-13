// Custom webpack plugin to prevent Html imports
class PreventHtmlImportPlugin {
  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap('PreventHtmlImportPlugin', (nmf) => {
      nmf.hooks.beforeResolve.tap('PreventHtmlImportPlugin', (resolveData) => {
        if (resolveData.request && resolveData.request.includes('next/document')) {
          resolveData.request = './webpack-utils/empty-module.js';
        }
        if (resolveData.request && resolveData.request.includes('next/head')) {
          resolveData.request = './webpack-utils/empty-module.js';
        }
        if (resolveData.request && resolveData.request.includes('next/error')) {
          resolveData.request = './webpack-utils/empty-module.js';
        }
      });
    });
  }
}

module.exports = PreventHtmlImportPlugin;
