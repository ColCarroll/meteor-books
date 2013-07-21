// Books -- {title: String,
//           author: String,
//           desc: String}
Books = new Meteor.Collection("books");
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
