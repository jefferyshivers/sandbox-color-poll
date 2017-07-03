
var database = firebase.database();

// // sign in as anonymous

// firebase.auth().signInAnonymously().catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // ...
// });
//
// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.
//     var isAnonymous = user.isAnonymous;
//     var uid = user.uid;
//     console.log('you are signed is as anonymous')
//     // ...
//   } else {
//     // User is signed out.
//     console.log('you are no longer signed in')
//     // ...
//   }
//   // ...
// });





////////////////////////////////////////////////////////////////////////////////

// // add user to database

// function writeUserData(userId, name, email, imageUrl) {
//   firebase.database().ref('users/' + userId).set({
//     username: name,
//     email: email,
//     profile_pictures : imageUrl
//   })
// }
//
// writeUserData("jefferyshivers", "Jeffery Shivers", "myemail@test.com", "http://test.com")

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



var db = firebase.database();
var colors = db.ref('colors');

function populatePage() {
  colors.on("value", function(snapshot) {
    var snap = snapshot.val()

    color_keys = Object.keys(snap)
    color_keys.forEach(function(color){
      // console.log(key)

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

