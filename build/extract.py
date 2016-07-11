import subprocess, os, fnmatch, re

fromDir = '../src'
tempFile = './ref/messages.pot'
toFile = './translations/messages.pot'

# This function is not in used anymore since we do not use the <M/> component anymore
# def findStringAndExtract(path, to):
#     filePattern = "*.js"
#     for path, dirs, files in os.walk(path):
#         for fileName in fnmatch.filter(files, filePattern):
#             filePath = os.path.join(path, fileName)
#             with open(filePath) as f:
#                 s = f.read()
#                 matches = re.findall(r'<M\s*m="([^"]+)[^/>]', s)
#                 for msg in matches:
#                     with open(to, "a+") as wf:
#                         wf.write('\n' + 'msgid "' + msg + '"')
#                         wf.write('\nmsgstr "" \n')
#         for dir in dirs:
#             findStringAndExtract(os.path.join(path, dir), to)
#
#
# findStringAndExtract(fromDir, tempFile)
subprocess.run(['mkdir', 'ref'], stdout=subprocess.PIPE)
subprocess.run(['cp', toFile, tempFile], stdout=subprocess.PIPE)
subprocess.run(['msguniq', '--output-file=' + toFile, tempFile], stdout=subprocess.PIPE);
os.remove(tempFile);


files = [
    './translations/ar.po', 
    './translations/de.po',
    './translations/en.po',
    './translations/es.po',
    './translations/fr.po',
    './translations/id.po',
    './translations/it.po',
    './translations/ja.po',
    './translations/pl.po',
    './translations/pt.po',
    './translations/ru.po',
    './translations/vi.po',
    './translations/zh_cn.po',
    './translations/zh_tw.po',
]

for f in files:
    subprocess.run(['msgmerge', '--output-file=' + f, f, './translations/messages.pot'])




# to extract translated string from a to b
# msgmerge -N -o translations/zh_tw.po temp/zh_tw.po ref/zh_tw.po