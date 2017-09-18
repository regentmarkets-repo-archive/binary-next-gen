/**
 * Created by Arnab Karmakar on 9/18/17.
 */
const exec = require('child-process-promise').exec;

const files = [
  './build/translations/de.po',
  './build/translations/en.po',
  './build/translations/es.po',
  './build/translations/fr.po',
  './build/translations/id.po',
  './build/translations/it.po',
  './build/translations/ja.po',
  './build/translations/nl_BE.po',
  './build/translations/pl.po',
  './build/translations/pt.po',
  './build/translations/ru.po',
  './build/translations/th.po',
  './build/translations/vi.po',
  './build/translations/zh_cn.po',
  './build/translations/zh_tw.po',
];

async function processFiles(file) {
  try {
    await exec(`msgmerge --update --no-fuzzy-matching --backup=off --backup=off ${file} ./build/translations/messages.pot`);
  } catch (e) {
    console.error(e);
  }
}
files.forEach(eFile => processFiles(eFile));
