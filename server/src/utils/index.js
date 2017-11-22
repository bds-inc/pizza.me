module.exports = {
    random_word: function (n) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < n; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
      },

    sanitize: function (data) {
      // TODO: Implement. NOOP function atm
      return data
    }
}