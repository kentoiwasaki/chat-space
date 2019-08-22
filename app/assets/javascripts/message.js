$(function(){
  function buildHTML(message){
    var html = `<div class="message">
                  <div class="message__upper">
                    <div class="message__upper__name">
                      ${message.name}
                    </div>
                    <div class="message__upper__time">
                      ${message.time}
                    </div>
                  </div>
                  <div class="message__text">
                    <p class="lower-message__content">
                      ${message.body}
                    </p>
                  </div>
                </div>`
    return html;
  }

  function buildImage(message){
    var html = `<div class="message">
                  <div class="message__upper">
                    <div class="message__upper__name">
                      ${message.name}
                    </div>
                    <div class="message__upper__time">
                      ${message.time}
                    </div>
                  </div>
                  <div class="message__text">
                    <p class="lower-message__content">
                      ${message.body}
                    </p>
                    <img src="${message.image}">
                  </div>
                </div>`
    return html;
  }

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
      if (message.image == null) {
        var html = buildHTML(message);
      }
      else {
        var html = buildImage(message);
      }
      $('.messages').append(html);
      $('.form__message').val('');
      $('.chat').animate({ scrollTop: $('.chat')[0].scrollHeight });
      $('.form__submit').attr('disabled', false);
    })
    .fail(function(){
      alert("error");
    })
  });
});