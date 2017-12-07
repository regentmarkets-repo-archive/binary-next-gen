# Using Travis on Your Personal Github Page

Unless you want to modify `.travis.yml`, it is simpler that you use the gulp deploy script ([as documented in the README](../README.md##deploy-to-your-personal-github-pages)) to push to your own personal github page. This guide is written for developers who want to test out their changes on `.travis.yml`.

If you are new to Travis, go through the [getting started guide](https://docs.travis-ci.com/user/getting-started/) first to setup Travis in your repository.

> Note: only git pushes to `dev` and `master` will trigger travis build. You can change this in `branches:` inside `.travis.yml` (remember to revert when you send PR to production!).

## Disable Coveralls

We use [Coveralls](https://coveralls.io/) for code coverage, but this will break your travis script if you run it anywhere other than in binary-com/binary-next-gen. You could sign up for an account and register your repository, but a simpler way is just to turn it off while you develop:

```
#  - yarn test:coveralls
```

## Turn Off Notifications

The travis script on the main branch sends notifications to Binary developers when the build completes. You may not want this behaviour when deploying to your personal github page. To disable them, remove or comment out the blocks with `notifications` (there are 2 of them in the script).

## Creating your Personal Access Token

The travis script uses an access token for [binary-com/binary-next-gen](https://github.com/binary-com/binary-next-gen) (we would not want *everyone* to have write access to that repo!). It is saved as a encrypted global environment variable `GIT_KEY`. To deploy to your own github pages, you will need to create your own personal access token for your repo. Refer to [github docs](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/#creating-a-token) to generate your access token.

Once you do that, we can use travis commandline tools (install via `gem install travis`) to encrypt your global environment variable `GIT_KEY`, where `GIT_KEY` is your secret access token:

```
travis encrypt GIT_KEY=abc123ThisIsYourTopSecretOAuthKeyYoYoYo
```

If prompted on username/repo_name, just enter `yes`. 

> Add [`-r owner/repo_name`](https://docs.travis-ci.com/user/encryption-keys/#Usage) to the `encrypt` command if you intend the cipher text to be visible in another repo. 

This will generate the cipher text `secure: Ui89adAcRyPtIcJiBbEr1sH...`. Use that to replace the one inside the `env: global:` block. Inside travis, that chunk of cipher text will be decrypted to `GIT_KEY=abc123...`.