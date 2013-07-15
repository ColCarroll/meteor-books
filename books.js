Books = new Meteor.Collection('books');
if (Meteor.isClient) {

  Template.books_index.books = function(){
    return Books.find();
  };

  Template.books_index.show_new_form = function(){
    return Session.get('showing_new_form');
  };

  Template.books_index.events({
    'click #add-book': function(event, template){
      Session.set('showing_new_form', true);
    },
    'click #submit-book': function(event, template){
      Session.set('showing_new_form', false);
      name = template.find('[name=title]').value;
      desc = template.find('[name=desc]').value;
      Books.insert({name: name, desc: desc});
    }
  });

  Template.book.events({
    'click .like-btn': function(evt){
      console.log('you clicked like on ' + this.name);
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
