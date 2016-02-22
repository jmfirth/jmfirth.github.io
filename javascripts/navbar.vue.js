(function() {
  new Vue({
    el: '#navbar',
    data: {
      term: ''
    },
    methods: {
      search: function (event) {
        window.location.href = '/search/' + this.term
      }
    }
  })
})()
