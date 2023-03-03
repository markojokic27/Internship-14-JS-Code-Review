document.addEventListener("click", function (event) {
  let codeLine = document.getElementsByClassName("code-line-wrapper");
  for (let i = 0; i < codeLine.length; i++) {
    // New comment opener
    let newComment = codeLine[i].getElementsByClassName("new-comment");
    let buttonNumber = codeLine[i].getElementsByClassName("button-number");
    for (let i = 0; i < buttonNumber.length; i++) {
      if (buttonNumber[i] === event.target) {
        if (newComment[i].classList.contains("display-block"))
          newComment[i].classList.remove("display-block");
        else newComment[i].classList.add("display-block");
      }
    }

    //Button Send - local storage
    let saveButton = codeLine[i].getElementsByClassName("save-button");
    let commentWrapper = codeLine[i].getElementsByClassName("comments-wrapper");
    let comment = document.getElementsByClassName("comment");
    let NewCommentContent =
      codeLine[i].getElementsByClassName("NewCommentContent");
    for (let i = 0; i < saveButton.length; i++) {
      if (saveButton[i] === event.target) {
        if (NewCommentContent[i].value) {
          let newCom = comment[0].cloneNode(true);
          let ComContent = newCom.getElementsByClassName("comment-content");
          let CommentDate = newCom.getElementsByClassName("comment-date");
          const now = new Date();
          let DateNow =
            now.getHours() +
            ":" +
            now.getMinutes() +
            "&nbsp;&nbsp;&nbsp;&nbsp;" +
            now.getDay() +
            "." +
            now.getMonth() +
            "." +
            now.getFullYear() +
            ".";
          ComContent[0].innerHTML = NewCommentContent[i].value;
          newCom.removeAttribute("id");
          NewCommentContent[i].value = "";
          commentWrapper[i].appendChild(newCom);
          CommentDate[0].innerHTML = DateNow;
        } else alert("New comment is empty.");
      }
    }

    let comments = commentWrapper[0].getElementsByClassName("comment");
    if (comments.length) {
      for (let j = 0; j < comments.length; j++) {
        //Like button
        let likeButton = comments[j].getElementsByClassName("like-button");
        console.log(likeButton);
        for (let k = 0; k < likeButton.length; k++) {
          if (likeButton[k] === event.target) {
            if (likeButton[k].innerHTML === "Like") {
              likeButton[k].innerHTML = "Liked";
              likeButton[k].classList.add("liked-button");
              likeButton[k].classList.add("liked-button:hover");
            } else {
              likeButton[k].classList.remove("liked-button");
              likeButton[k].classList.remove("liked-button:hover");

              likeButton[k].innerHTML = "Like";
            }
          }
        }
        //Delete button
        let deleteButton = comments[j].getElementsByClassName("delete-button");
        //console.log(deleteButton);
        for (let d = 0; d < deleteButton.length; d++) {
          let b=j;
          if (deleteButton[d] === event.target) {
            if(i===0)
              b++;
          commentWrapper[0].removeChild(comments[b]);
        }}
      }
    }
  }
});
