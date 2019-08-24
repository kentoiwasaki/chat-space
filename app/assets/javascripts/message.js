$(function(){
  var buildHTML = function(message){
    var image = message.image.url == null ? "" : `<img src="${message.image.url}">` 
    var html = `<div class="message" data-message-id='${message.id}'>
                  <div class="message__upper">
                    <div class="message__upper__name">
                      ${message.user_name}
                    </div>
                    <div class="message__upper__time">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="message__text">
                    <p class="lower-message__content">
                      ${message.body}
                    </p>
                    ${image}
                  </div>
                </div>`
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('.new_message')[0].reset();
      $('.chat').animate({ scrollTop: $('.chat')[0].scrollHeight });
      $('.form__submit').attr('disabled', false);
    })
    .fail(function(){
      alert("投稿に失敗しました");
    })
  });

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message').last().data("message-id");
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
        })
        $('.chat').animate({ scrollTop: $('.chat')[0].scrollHeight });
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 5000);
});