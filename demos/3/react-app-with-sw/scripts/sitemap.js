// adapted from https://github.com/stereobooster/react-snap/issues/38#issuecomment-487350403
require('dotenv').config();

const BASE_URL = process.env.REACT_APP_PUBLIC_URL || '';
const BLACKLIST = [];

const builder = require('xmlbuilder');
const { readdir, writeFile } = require('fs');
const { promisify } = require('util');

const readdirAsync = promisify(readdir);
const writeFileAsync = promisify(writeFile);

const allRoots = [];

const readSite = async (dir) => {
  const directory = await readdirAsync(dir, { withFileTypes: true });

  await Promise.all(
    directory.map(async (fileOrDirectory) => {
      const { name } = fileOrDirectory;

      const root = `${dir}/${name}`;
      if (fileOrDirectory.isDirectory()) {
        await readSite(root);
      } else if (name === 'index.html') {
        allRoots.push(root);
      }
    }),
  );
};

(async () => {
  await readSite('build');

  const siteUrls = allRoots.map((root) =>
    root.replace('build/', BASE_URL + '/').replace('/index.html', ''),
  );

  const urlset = builder.create('urlset', {
    encoding: 'UTF-8',
    version: '1.0',
  });

  urlset.attribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

  siteUrls
    .filter((url) => !BLACKLIST.includes(url))
    .sort((a, b) => a.length - b.length)
    .forEach((url) => {
      const u = urlset.ele('url');

      u.ele('loc', url);
      u.ele('priority', 0.5);
    });

  const sitemap = urlset.end({ pretty: true });

  await writeFileAsync('build/sitemap.xml', sitemap);
})();
