// core firebase stuff

var db = firebase.database();
var dbref = db.ref()


////////////////////////////////////////////////////////////////////////////////



// var testObj = {
//   "One": "One value",
//   "Two": "Two value"
// }
// function submitClick() {
//   var firebaseRef = firebase.database().ref();
//   firebaseRef.child("Text").set("Some Value");
//   firebaseRef.child("test").set(testObj);
// }
//
// submitClick()




////////////////////////////////////////////////////////////////////////////////

// // add an artist to the database

// function submitArtist(name,data) {
//   var firebaseRef = firebase.database().ref();
//   firebaseRef.child("Artists").child(name).set(data);
// }
//
// submitArtist("Jeffery", {
//   "Label": "Sony",
//   "Favorite-Food": "Tomatoes"
// })
//
// submitArtist("test", { "Label": "Blabla" })

////////////////////////////////////////////////////////////////////////////////



var colors = db.ref('colors');

function populatePage() {
  colors.on("value", function(snapshot) {
    var snap = snapshot.val()

    var color_keys = Object.keys(snap)
    var color_array = []

    color_keys.forEach(function(color){
      color_array.push([color, snap[color]])
    })
    color_array.sort(function(a,b){
      return b[1] - a[1]
    })

    color_array.forEach(function(color_pair){
      var color = color_pair[0]

      // Make a div for the color

      var id = ('vote-obj-' + color)
      $('<div/>', {
          'id':id,
          'class':'vote-obj'
      }).appendTo('#main-table');

      // NAME of COLOR

      var name_id = (id + '-name')
      var textfield = (color + ': [score]')
      var score = (color + ": " + snap[color])

      $('<div/>', {
          'id':name_id,
          'class':'vote-obj-name',
          'text':score
      }).appendTo('#' + id);
      $('#' + name_id).css("background", color)

      // VOTE UP

      var up_id = (id + '-up')
      $('<a/>', {
          'id':up_id,
          'href':'#',
          'class':'vote-obj-up',
          'text':'vote UP',
          'key':color
      }).on('click', function(){

        colors.off()

        firebase.database().ref('colors').once('value').then(function(snapshot) {
          var vote = snapshot.val()[color]
          vote += 1
          var dbColors = firebase.database().ref('colors');
          dbColors.child(color).set(vote)
          // set a record of this vote to the user's account
          // - this currently doesn't actually block multiple votes
          // - this should first be checked, then only change (and add/subtract) if different
          var user = firebase.auth().currentUser.uid;
          firebase.database().ref('users/' + user).child('votes').child(color).set('UP')
        });

      }).appendTo('#' + id);

      // VOTE DOWN

      var down_id = (id + '-down')
      $('<a/>', {
          'id':down_id,
          'href':'#',
          'class':'vote-obj-down',
          'text':'vote DOWN'
      }).on('click', function(){

        colors.off()

        firebase.database().ref('colors').once('value').then(function(snapshot) {
          var vote = snapshot.val()[color]
          vote -= 1
          var dbColors = firebase.database().ref('colors');
          dbColors.child(color).set(vote)
          // set a record of this vote to the user's account
          // - this currently doesn't actually block multiple votes
          // - this should first be checked, then only change (and add/subtract) if different
          var user = firebase.auth().currentUser.uid;
          firebase.database().ref('users/' + user).child('votes').child(color).set('DOWN')
        });

      }).appendTo('#' + id);

    })
  })
}

populatePage();

db.ref().on("child_changed", function(snapshot){
  $('#main-table').empty()
  populatePage();
})
