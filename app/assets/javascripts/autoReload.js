$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="Message-box" data-message-id=${message.id}>
          <div class="Message-Info">
            <div class="chat-box-name">
              ${message.user_name}
            </div>
            <div class="chat-box-date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-box-message">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="Message-box" data-message-id=${message.id}>
        <div class="Message-Info">
          <div class="chat-box-name">
            ${message.user_name}
          </div>
          <div class="chat-box-date">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-box-message">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.Message-box:last').data("message-id") || 0;
    console.log(last_message_id)
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.Message-list').append(insertHTML);
        $('.Message-list').animate({ scrollTop: $('.Message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});