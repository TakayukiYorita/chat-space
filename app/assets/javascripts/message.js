$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="Message-box">
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
        </div>`
      return html;
    } else {
        let html =
          `<div class="Message-box">
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
   
  $('.class-form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,  
      type: 'POST',  
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.Message-list').append(html);      
      $('form')[0].reset();
      $('.Message-list').animate({ scrollTop: $('.Message-list')[0].scrollHeight});
      $('.form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});