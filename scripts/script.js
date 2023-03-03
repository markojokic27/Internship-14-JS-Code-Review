// New comment opener
let newComment = document.getElementsByClassName("new-comment");
let buttonNumber = document.getElementsByClassName("button-number");
for (let i = 0; i < buttonNumber.length; i++) {
  buttonNumber[i].addEventListener("click", () => {
    if (newComment[i].classList.contains("display-block"))
      newComment[i].classList.remove("display-block");
    else newComment[i].classList.add("display-block");
  });
}
//Button Send - local storage
let sendButton = document.getElementsByClassName("send-button");
let commentWrapper = document.getElementsByClassName("comments-wrapper");
let comment = document.getElementsByClassName("comment");
let NewCommentContent = document.getElementsByClassName("NewCommentContent");
for (let i = 0; i < sendButton.length; i++) {
  sendButton[i].addEventListener("click", () => {
    if (NewCommentContent[i].value) {
      let newCom = comment[0].cloneNode(true);
      let ComContent = newCom.getElementsByClassName("comment-content");
      let CommentDate=newCom.getElementsByClassName("comment-date");
      const now=new Date();
      let DateNow=now.getHours()+":"+now.getMinutes()+"&nbsp;&nbsp;&nbsp;&nbsp;"+now.getDay()+"."+now.getMonth()+"."+now.getFullYear()+".";
      ComContent[0].innerHTML = NewCommentContent[i].value;
      NewCommentContent[i].value = "";
      console.log(CommentDate);
      commentWrapper[i].appendChild(newCom);
      CommentDate[0].innerHTML=DateNow;
      console.log(CommentDate.innerHTML);
    }
    else alert("New comment is empty.")
  });
}
