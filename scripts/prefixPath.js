import fs from 'fs';
import path from 'path';

export default function prefixPath(options = {}) {
  return {
    name: 'prefixPath',
    writeBundle(outputOptions, bundle){
      const dir = outputOptions.dir || path.dirname(outputOptions.file);
      const htmlFilePath = path.join(dir, 'index.html');
      if (fs.existsSync(htmlFilePath)){
        let htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');

        htmlContent = htmlContent.replace(/(href|src)="([^"]+)"/g, function(match, attr, url) {
          if (url.startsWith('/chat') || url.startsWith('http')) {
            return match;
          }
          return `${attr}="/chat${url}"`;
        });

        fs.writeFileSync(htmlFilePath, htmlContent);
      }
    },
  };
}
