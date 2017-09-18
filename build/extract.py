import subprocess

files = [
    './translations/de.po',
    './translations/en.po',
    './translations/es.po',
    './translations/fr.po',
    './translations/id.po',
    './translations/it.po',
    './translations/ja.po',
    './translations/nl_BE.po',
    './translations/pl.po',
    './translations/pt.po',
    './translations/ru.po',
    './translations/th.po',
    './translations/vi.po',
    './translations/zh_cn.po',
    './translations/zh_tw.po',
]

# More details https://stackoverflow.com/questions/739314/easiest-way-to-generate-localization-files

for f in files:
    subprocess.run(['msgmerge', '--update', '--no-fuzzy-matching', '--backup=off', f, './translations/messages.pot'])

