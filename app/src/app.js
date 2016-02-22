(function() {
  'use strict'

  function locationConfig($locationProvider) {
    $locationProvider.html5Mode(true)
  }

  locationConfig.$inject = ['$locationProvider']

  function htmlDecode() {
    return function(text) {
      return $('<div></div>').html(text).text()
    }
  }

  function highlight() {
    return function(text, term) {
      var regexp = new RegExp('(' + term + ')', 'ig');
      return text.replace(regexp, '<span class="highlight">$1</span>')
    }
  }

  function toTrusted($sce) {
    return function(text) {
      return $sce.trustAsHtml(text)
    }
  }

  toTrusted.$inject = ['$sce']

  function keyEnter() {
    return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
        if (event.which === 13) {
          scope.$apply(function () { scope.$eval(attrs.keyEnter) })
          event.preventDefault()
        }
      })
    }
  }

  function NavbarCtrl($log, $scope, $timeout) {
    $log.info('NavbarCtrl loading...')

    $scope.term = ''

    $scope.search = function() {
      window.location.href = '/search?q=' + $scope.term
    }
  }

  NavbarCtrl.$inject = ['$log', '$scope', '$timeout']

  function SearchCtrl($log, $scope, $timeout, $location) {
    $log.info('SearchCtrl loading...')

    $scope.term = $location.search().q || ''
    $scope.jekyll = JSON.parse(JSON.stringify(jekyll))

    function highlightString(str) {
      var regexp = getTermRegExp()
      return str.replace(regexp, `<span class="search-highlight">$1</span>`)
    }

    function getTermRegExp() {
      return new RegExp('(' + $scope.search.term + ')', 'ig')
    }
  }

  SearchCtrl.$inject = ['$log', '$scope', '$timeout', '$location']

  angular
    .module('app', [])
    .config(locationConfig)
    .filter('html_decode', htmlDecode)
    .filter('to_trusted', toTrusted)
    .filter('highlight', highlight)
    .directive('keyEnter', keyEnter)
    .controller('NavbarCtrl', NavbarCtrl)
    .controller('SearchCtrl', SearchCtrl)
})()


// (function() {
//   var vueJekyll = JSON.parse(JSON.stringify(jekyll))
//
//   new Vue({
//     el: "#search",
//     data: {
//       term: '',
//       min: 2
//     },
//     ready: function() {
//       this.term = window.location.pathname.replace('/search', '').replace('?q=')
//     },
//     methods: {
//       highlightString(str) {
//         var regexp = this.getTermRegExp()
//         return str.replace(regexp, `<span class="search-highlight">$1</span>`)
//       },
//       getTermRegExp() {
//         return new RegExp('(' + this.term + ')', 'ig')
//       }
//     },
//     computed: {
//       formatDate: function(date) {
//         return new Date(date)
//       },
//       tags: function() {
//         if (this.term.length < this.min) return;
//         var term = this.term;
//         return jekyll.site.tags.map(function(tag) {
//           var hasMatch = tag.toLowerCase().indexOf(term.toLowerCase())
//           return hasMatch > -1 ? self.highlightString(tag) : null
//         }).filter(Boolean);
//       },
//       posts: function() {
//         if (this.term.length < this.min) return;
//         var term = this.term;
//         var self = this;
//         return jekyll.site.posts.map(function(post) {
//           var regexp = self.getTermRegExp()
//
//           // determine if title matches
//           var titleMatches = post.title.toLowerCase().indexOf(term) > -1;
//
//           // get matching tags
//           var tagHasMatch = false
//           var tags = post.tags.map(function(tag) {
//             var hasMatch = tag.toLowerCase().indexOf(term.toLowerCase()) > -1
//             tagHasMatch = tagHasMatch || hasMatch
//             return hasMatch ? self.highlightString(tag) : tag
//           }).filter(Boolean);
//
//           // get matching passages
//           var passageHasMatch = false
//           var passages = post.content.passages.map(function(passage) {
//             var hasMatch = passage.toLowerCase().indexOf(term.toLowerCase()) > -1
//             passageHasMatch = passageHasMatch || hasMatch
//             return hasMatch ? self.highlightString(passage) : null;
//           }).filter(Boolean);
//
//           if (!titleMatches && !tagHasMatch && !passageHasMatch) return;
//
//           var title = post.title.replace(regexp, `<span class="search-highlight">$1</span>`)
//           return {
//             title: title,
//             url: post.url,
//             date: post.date,
//             tags: tags,
//             content: {
//               passages: passages
//             }
//           }
//         }).filter(Boolean);
//       }
//     }
//   })
// })();
