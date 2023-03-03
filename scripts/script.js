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

    //Button Save - local storage
    let saveButton = codeLine[i].getElementsByClassName("save-button");
    let commentWrapper = codeLine[i].getElementsByClassName("comments-wrapper");
    let comment = document.getElementsByClassName("comment");
    let NewCommentContent =
      codeLine[i].getElementsByClassName("NewCommentContent");
    for (let s = 0; s < saveButton.length; s++) {
      if (saveButton[s] === event.target) {
        if (NewCommentContent[0].value) {
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
          ComContent[0].innerHTML = NewCommentContent[0].value;
          newCom.removeAttribute("id");
          NewCommentContent[0].value = "";
          commentWrapper[0].appendChild(newCom);
          CommentDate[0].innerHTML = DateNow;
          AddCommentToLocalStorage(
            i,
            s,
            "Local Storage Comment",
            ComContent[0].innerHTML,
            DateNow,
            false
          );
        } else alert("New comment is empty.");
      }
    }
    //Button Send - server
    let sendButton = codeLine[i].getElementsByClassName("send-button");
    for (let i = 0; i < sendButton.length; i++) {
      if (sendButton[i] === event.target) {
        if (NewCommentContent[i].value) {
          let newCom = comment[0].cloneNode(true);
          let titleCom = newCom.getElementsByClassName("comment-title");
          titleCom[0].innerHTML = "Comment from server";
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
        let contentOfComments=comments[j].getElementsByClassName("comment-content");
        let dateOfComments=comments[j].getElementsByClassName("comment-date");
        //Like button
        let likeButton = comments[j].getElementsByClassName("like-button");
        for (let k = 0; k < likeButton.length; k++) {
          if (likeButton[k] === event.target) {
            let IsLiked=false;
            if (likeButton[k].innerHTML === "Like") {
              likeButton[k].innerHTML = "Liked";
              likeButton[k].classList.add("liked-button");
              likeButton[k].classList.add("liked-button:hover");
              IsLiked=true;
            } else {
              likeButton[k].classList.remove("liked-button");
              likeButton[k].classList.remove("liked-button:hover");
              IsLiked=false;
              likeButton[k].innerHTML = "Like";
            }
            LikeCommentFromLocalStorage(i,j,contentOfComments[0].innerHTML,dateOfComments[0].innerHTML,IsLiked);
          }
        }
        //Delete button
        let deleteButton = comments[j].getElementsByClassName("delete-button");
        for (let d = 0; d < deleteButton.length; d++) {
          if (deleteButton[d] === event.target) {
            commentWrapper[0].removeChild(comments[j]);
            DeleteCommentFromLocalStorage(i,j,contentOfComments[0].innerHTML,dateOfComments[0].innerHTML);
          }
        }
      }
    }
  }
});

//LOCAL STORAGE
class Comment {
  constructor(line, position, title, content, date, like) {
    this.line = line;
    this.position = position;
    this.title = title;
    this.content = content;
    this.date = date;
    this.like = like;
  }
}
function AddCommentToLocalStorage(line, position, title, content, date, like) {
  var newCom = new Comment(line, position, title, content, date, like);
  const currentStorage = JSON.parse(localStorage.getItem("comment"));
  if (!currentStorage || !currentStorage.length) {
    localStorage.setItem("comment", JSON.stringify([newCom]));
  } else {
    localStorage.setItem(
      "comment",
      JSON.stringify([...currentStorage, newCom])
    );
  }
}
function DeleteCommentFromLocalStorage(line, position, content, date){
  let a=localStorage.getItem('comment');
  let b = JSON.parse(a);
  let c = b.map(classObj => new Comment(classObj.line, classObj.position, classObj.title, classObj.content, classObj.date, classObj.like));
  for(let com of c){
    if(com.content===content&&com.date===date&&com.line===line)
      c.splice(c.indexOf(com), 1);
      localStorage.setItem('comment', JSON.stringify(c));
  }
}
function LikeCommentFromLocalStorage(line, position, content, date,like){
  let a=localStorage.getItem('comment');
  let b = JSON.parse(a);
  let c = b.map(classObj => new Comment(classObj.line, classObj.position, classObj.title, classObj.content, classObj.date, classObj.like));
  for(let com of c){
    if(com.content===content&&com.date===date&&com.line===line)
      c[c.indexOf(com)].like=like;
      localStorage.setItem('comment', JSON.stringify(c));
  }
}
//Refresh - LOCAL STORAGE
DisplayCommentFromLocalStorage();
function DisplayCommentFromLocalStorage(){
  let a=localStorage.getItem('comment');
  let b = JSON.parse(a);
  let c = b.map(classObj => new Comment(classObj.line, classObj.position, classObj.title, classObj.content, classObj.date, classObj.like));
  for(let com of c){
      let codeLine = document.getElementsByClassName("code-line-wrapper");
      let commentWrapper = codeLine[com.line].getElementsByClassName("comments-wrapper");
      let comment = document.getElementsByClassName("comment");
      let newCom = comment[0].cloneNode(true);
      let ComContent = newCom.getElementsByClassName("comment-content");
      let CommentDate = newCom.getElementsByClassName("comment-date");
      let likeButton = newCom.getElementsByClassName("like-button");
      ComContent[0].innerHTML = com.content;
      newCom.removeAttribute("id");
      CommentDate[0].innerHTML = com.date;     
      if(com.like){
        likeButton[0].innerHTML = "Liked";
        likeButton[0].classList.add("liked-button");
        likeButton[0].classList.add("liked-button:hover");
      }
      commentWrapper[0].appendChild(newCom);
  }
    
}