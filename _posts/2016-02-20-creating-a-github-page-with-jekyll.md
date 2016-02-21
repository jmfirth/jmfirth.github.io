---
layout: post
title: Creating A GitHub Page with Jekyll
tags: github jekyll static-site-generators
date: 2016-02-20 16:10:00 -0500
---

This guide will help you create a static site on [GitHub Pages][gh_pages_url] using [Jekyll][jekyll_url] with syntax highlighting support using [Rogue][rouge_url] and a custom domain.


## Initial Repository Configuration

GitHub Pages can be used either at a user or project level.  For user pages, create a GitHub repository named `<your_username>.github.io`.  For project pages, create a branch in your GitHub repository called `gh-pages`.


## Install Jekyll

_Note: At the time of writing, for Jekyll v2 you need Ruby >= v1.9.3, and for Jekyll v3 you need Ruby >= v2._

Install Jekyll from Rubygems:

```sh
$ gem install jekyll
```

_Note: Cygwin users on Windows may need to set aliases to make ruby binaries accessible by scripts. Add the following to your_ `.profile`:

```sh
alias gem='gem.bat'
alias rake='rake.bat'
alias erb='erb.bat'
alias irb='irb.bat'
alias rdoc='rdoc.bat'
alias ri='ri.bat'
alias rspec='rspec.bat'
alias cucumber='cucumber.bat'
alias bundle='bundle.bat'
```

Please see the official [documentation][jekyll_docs_url] for more information.


## Scaffolding Your Site

Navigate to the root of your repository.  If this is a project page, delete all existing files in your `gh_pages` branch and make a quick commit.

Create the initial site scaffolding:

```sh
$ jekyll new .
```

Test the site to make sure the initial scaffolding generation was successful.  The following command will serve your Jekyll site while watching for and building changes as you make them:

```sh
$ jekyll serve --watch
```


## Enable Syntax Highlighting with Rouge

Install Rouge from Rubygems:

```sh
$ gem install rouge
```

Create a file at the root of the repository named `_config.yml` and add the following:

```yaml
markdown: kramdown

kramdown:
  input: GFM
  syntax_highlighter: rouge
```

All that is left is to generate the syntax highlighting stylesheet with rouge.  There are a few [themes][rouge_themes_url] available.

```sh
$ rougify style molokai >> stylesheets/syntax.css
```

Include this in the header tag of your `index.html` file:

```html
<head>
  <!-- ... -->

  <link href="/stylesheets/syntax.css" rel="stylesheet">

  <!-- ... -->
</head>
```


## Add a Custom Domain

Add a custom domain to your project by creating a `CNAME` file at the root of your repository that contains the domain name you want.  For example:

```
www.example.com
```

Make sure to add a CNAME entry for your domain pointing to `<your_username>.github.io`.

Please see the official [documentation][gh_pages_custom_domain_url] for more information.


[jekyll_url]: https://github.com/jekyll/jekyll
[jekyll_docs_url]: http://jekyllrb.com/docs/
[rouge_url]: https://github.com/jneen/rouge
[rouge_themes_url]: http://www.rubydoc.info/gems/rouge/Rouge/Themes
[gh_pages_url]: https://pages.github.com/
[gh_pages_custom_domain_url]: https://help.github.com/articles/using-a-custom-domain-with-github-pages/
