# Dealing with Translations
Translations is supported by [CrowdIn](https://crowdin.com/).

Translation branch is totally separated with master/dev branches, and is not being merged regularly as not necessary, it simply serves as a point for developers and translators to communicate.

### Add more strings for translation
1. Checkout a branch from `translations` branch
> ```
> git checkout origin translations
> git checkout -b xxx/translations
> ```

2. Add string into `build/translations/messages.pot`.
> ```
> msgid "Days"
> msgstr ""
> 
> msgid "N/A"
> msgstr ""
> ```

3. Submit your PR

### Get translated strings into next-gen project
This is simple, simply run `npm run translate` from master/dev branch, then you can verify by `git status` after the command finishes.

You should be able to see files in `src/_constant/po` being modified, double check if everything is fine, then commit. 

