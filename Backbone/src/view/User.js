MyApplication.View.User = Backbone.View.extend({
  initialize: function () {
    _.bindAll(this, 'render', 'click_leaveEditState');
    this.model.bind('change', this.render);
  },
  
  events:{
    'click .edit-button' : 'click_enterEditState',
    'click .cancel-button' : 'click_leaveEditState',
    'submit #edit-user' : 'click_submit'
  },
  
  render: function () {
    // ** this works by using function pointer to function template
    // var fnTemplate = this.model.isInEditState()
    //     ? ich.user_template_edit
    //     : ich.user_template
    //   , renderedContent = fnTemplate(this.model.toJSON());
    // 
    // 
    // ** model to json saved in var to keep stuff DRY
    // var modelJSON = this.model.toJSON()
    //   , renderedContent = this.model.isInEditState()
    //     ? ich.user_template_edit(modelJSON)
    //     : ich.user_template(modelJSON);

    var renderedContent = this.model.isInEditState()
      ? ich.user_edit_template(this.model.toJSON())
      : ich.user_template(this.model.toJSON());
        
    this.$el.html(renderedContent);                                 // attachs to parent? => [TC] attaches rendered HTML to the view's top-level DOM element
    return this;                                                    // enables chaining
  },
  
  click_enterEditState: function() {
    this.model.enterEditState();
  },
  
  click_leaveEditState: function() {
    this.model.leaveEditState();
  },
  
  click_submit: function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    var thisView = this
      , email = this.$("input[name='email']").val();
    
    this.model.set({email: email});
    this.model.save(null, {
        success: thisView.click_leaveEditState
    });
  }
  
});