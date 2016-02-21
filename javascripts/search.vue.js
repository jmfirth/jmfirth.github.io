(function() {
  var vueJekyll = JSON.parse(JSON.stringify(jekyll))

  new Vue({
    el: "#search",
    data: {
      term: '',
      min: 2
    },
    ready: function() {
      this.term = window.location.pathname.replace('/search/', '').replace('/search', '')
    },
    methods: {
      highlightString(str) {
        var regexp = this.getTermRegExp()
        return str.replace(regexp, `<span class="search-highlight">$1</span>`)
      },
      getTermRegExp() {
        return new RegExp('(' + this.term + ')', 'ig')
      }
    },
    computed: {
      formatDate: function(date) {
        return new Date(date)
      },
      tags: function() {
        if (this.term.length < this.min) return;
        var term = this.term;
        return jekyll.site.tags.map(function(tag) {
          var hasMatch = tag.toLowerCase().indexOf(term.toLowerCase())
          return hasMatch > -1 ? self.highlightString(tag) : null
        }).filter(Boolean);
      },
      posts: function() {
        if (this.term.length < this.min) return;
        var term = this.term;
        var self = this;
        return jekyll.site.posts.map(function(post) {
          var regexp = self.getTermRegExp()

          // determine if title matches
          var titleMatches = post.title.toLowerCase().indexOf(term) > -1;

          // get matching tags
          var tagHasMatch = false
          var tags = post.tags.map(function(tag) {
            var hasMatch = tag.toLowerCase().indexOf(term.toLowerCase()) > -1
            tagHasMatch = tagHasMatch || hasMatch
            return hasMatch ? self.highlightString(tag) : tag
          }).filter(Boolean);

          // get matching passages
          var passageHasMatch = false
          var passages = post.content.passages.map(function(passage) {
            var hasMatch = passage.toLowerCase().indexOf(term.toLowerCase()) > -1
            passageHasMatch = passageHasMatch || hasMatch
            return hasMatch ? self.highlightString(passage) : null;
          }).filter(Boolean);

          if (!titleMatches && !tagHasMatch && !passageHasMatch) return;

          var title = post.title.replace(regexp, `<span class="search-highlight">$1</span>`)
          return {
            title: title,
            url: post.url,
            date: post.date,
            tags: tags,
            content: {
              passages: passages
            }
          }
        }).filter(Boolean);
      }
    }
  })
})();
