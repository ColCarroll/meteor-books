Books = new Meteor.Collection('books');

// When editing a book, ID of the book
Session.setDefault('editing_book', null);

// When viewing a book, ID of the book
Session.setDefault('viewing_book', null);

if (Meteor.isClient) {

  Template.books_index.books = function(){
    return Books.find();
  };

  Template.books_index.show_new_form = function(){
    return Session.get('showing_new_form');
  };

  Template.books_index.show_add_book = function(){
    return (!Session.get('showing_new_form') && (Session.get('editing_book') === null));
  };

  Template.book.editing = function () {
    return Session.equals('editing_book', this._id);
  };

  Template.view_book.viewing = function() {
    return Session.equals('viewing_book', this._id);
  };

  Template.books_index.events({
    'click #add-book': function(event, template){
      Session.set('showing_new_form', true);
      title="";
      author="";
      desc="";
    },
    'click #submit-book': function(event, template){
      Session.set('showing_new_form', false);
      title = template.find('[name=title]').value;
      author = template.find('[name=author]').value;
      desc = template.find('[name=desc]').value;
      Books.insert({title: title, author: author, desc: desc});
    },
    'click #cancel-book': function(event, template){
      Session.set('showing_new_form', false);
    }
  });

  Template.book.events({
    'click .edit-btn': function(evt, tmpl){
      Session.set('editing_book', this._id);
    },
    'click .book_holder': function(evt, tmpl){
      if (!Session.get('viewing_book')){
        Session.set('viewing_book', this._id);
      } else {
        Session.set('viewing_book', null)
      };
    }
  });

  Template.view_book.events({
    'click #done-viewing': function(event, template){
      Session.set('viewing_book',null);
    }
  });
  Template.edit_book.events({
    'click #submit-edit-book': function(event, template){
        title = template.find('[name=title]').value;
        author = template.find('[name=author]').value;
        desc = template.find('[name=desc]').value;
        Books.update(Session.get("editing_book"),{
          title: title,
          author: author,
          desc: desc});
        Session.set('editing_book', null);
    },
    'click #cancel-book': function(event, template){
      Session.set('editing_book', null);
    }
  });


}

