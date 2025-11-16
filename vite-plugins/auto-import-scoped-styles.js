import * as fs from 'node:fs';
import * as path from 'node:path';

export default function autoStyleImport() {
  return {
    name: "auto-import-scoped-css",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith(".scoped.jsx")) {
        return;
      }

      const scopedCssFilePath = id.replace(/\.jsx$/, ".css");
      if (fs.existsSync(scopedCssFilePath)) {
        const relative = "./" + path.basename(scopedCssFilePath);
        if (!code.includes(relative)) {
          console.log(id, "missing css import\n" + `import "${relative}";\n`);
          return `\nimport "${relative}";\n` + code;
        }
      }
    },
  }
}
