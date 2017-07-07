// authentication fn's

function testLogin() {
	var email = document.getElementById("username").value
	var pw = document.getElementById("userpassword").value
	firebase.auth().signInWithEmailAndPassword(email, pw).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  alert('Oops! You\'ve entered incorrect login information.')
	  // ...
	});
	document.getElementById("username").value = ""
	document.getElementById("userpassword").value = ""
}


function testLogout() {
	firebase.auth().signOut().then(function() {
	// Sign-out successful.
	}).catch(function(error) {
	// An error happened.
	});
}




// // sign in as anonymous
// firebase.auth().signInAnonymously().catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // ...
// });





////////// CREATE NEW USER

// After verification protocol, then qeue the following function, either through a new form
// or simply by selecting a link, ether of which is prompted to user via verficiation email.

// firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // ...
// });

// // add user to database

function writeUserData(userId, disp) {
  firebase.database().ref('users/' + userId).child('displayName').set(disp)
}


function updateUser() {
	var user = firebase.auth().currentUser;

	user.updateProfile({
	  providerData: "bah",
	  photoURL: "https://example.com/jane-q-user/profile.jpg"
	}).then(function() {
	  // Update successful.
	  console.log('yup ')
	}, function(error) {
	  // An error happened.
	  console.log('ho no')
	});
}



// acknowledge change
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    console.log('User is currently signed in as ' + displayName + '.')
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    // console.log('User is signed is as: ' + uid)
    // console.log('User is: ' + user.displayName)
    // console.log('Verified? ' + emailVerified)



    // clear the div
    $('#title-user').empty();

    // say: Welcome, user!
    var welcome_message = ('Welcome, ' + displayName + '!')
    $('<div/>', {
		  'id':'welcome-message',
		  'text':welcome_message
		}).appendTo('#title-user');

    // make: <input id="logoutbutton" type="button" value="logout" onclick="testLogout()">
		$('<input/>', {
		  'id':'logoutbutton',
		  'type':'button',
		  'value':'logout'
		}).on('click', function(){
			testLogout()
		}).appendTo('#title-user');

    // ...
	} else {
    // User is signed out.
    console.log('User is currently not signed in.')

    $('#title-user').empty()
    // ...


		//  <form action="" id="login-form">
		//    <label>username</label>
		//    <input id="username" type="text" placeholder="username" name="uname">

		//    <label>password</label>
		//    <input id="userpassword" type="password" placeholder="password" name="upw">

		//    <input id="loginbutton" type="button" value="login" onclick="testSubmit()">
		//    New? <a href="#">Create an account here </a>
		//  </form>

		// form
		$('<form/>', {
		  'id':'login-form',
		  'action':''
		}).appendTo('#title-user');

		// username
		$('<label/>', {
			'text':'username'
		}).appendTo('#login-form');
		$('<input/>', {
		  'id':'username',
		  'type':'text',
		  'placeholder':'username',
		  'name':'uname'
		}).appendTo('#login-form');

		// password
		$('<label/>', {
			'text':'password'
		}).appendTo('#login-form');
		$('<input/>', {
		  'id':'userpassword',
		  'type':'password',
		  'placeholder':'password',
		  'name':'upw'
		}).appendTo('#login-form');

		// button
		$('<input/>', {
			'id':'loginbutton',
			'type':'button',
			'value':'login'
		}).on('click', function() {
			testLogin()
		}).appendTo('#login-form')

	}
});