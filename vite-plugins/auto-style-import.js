export default function autoStyleImport() {
  return {
    name: 'auto-import-scoped-css',
    enforce: 'pre',
    transform(code, id) {
      // Only process .jsx or .tsx files in your src directory
      if (!id.match(/src\/.*\.(jsx|tsx)$/)) return null;

      const cssPath = id.replace(/\.(jsx|tsx)$/, '.scoped.css');
      if (fs.existsSync(cssPath)) {
        const relative = './' + path.basename(cssPath);
        const importStatement = `\nimport "${relative}";\n`;
        // Inject CSS import at the top
        return importStatement + code;
      }

      return null;
    },
  }
}
