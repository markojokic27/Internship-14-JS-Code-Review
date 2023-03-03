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
    for (let s = 0; s < sendButton.length; s++) {
      if (sendButton[s] === event.target) {
        if (NewCommentContent[s].value) {
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
          ComContent[0].innerHTML = NewCommentContent[s].value;
          newCom.removeAttribute("id");
          NewCommentContent[s].value = "";
          commentWrapper[s].appendChild(newCom);
          CommentDate[0].innerHTML = DateNow;
          AddCommentToServer(ComContent[0].innerHTML, i)
        } else alert("New comment is empty.");
      }
    }

    let comments = commentWrapper[0].getElementsByClassName("comment");
    
    if (comments.length) {
      for (let j = 0; j < comments.length; j++) {
        let contentOfComments=comments[j].getElementsByClassName("comment-content");
        let dateOfComments=comments[j].getElementsByClassName("comment-date");
        let comTitle=comments[j].getElementsByClassName("comment-title");
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
            console.log(comTitle[0].innerHTML);
            if(comTitle[0].innerHTML==="Local storage comment"){
            DeleteCommentFromLocalStorage(i,j,contentOfComments[0].innerHTML,dateOfComments[0].innerHTML);}
            else{
              DeleteCommentFromServer(i,contentOfComments[0].innerHTML);
            }
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
//SERVER
const baseUrl = "https://homework-server1.onrender.com";
const key = "markojokic27";

function AddCommentToServer(comContent, i) {
  const comment = {
    line: i,
    text: comContent,
  };
  (async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          key,
        },
        body: JSON.stringify(comment),
      };
      const response = await fetch(`${baseUrl}/create`, options);
      const json = await response.json();
      if (!response.ok) {
        throw json.message;
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
  })();
}

function DeleteCommentFromServer(i,contentOfComment){
  (async () => {
    try {
      const options = {
        headers: {
          key,
        },

      };
      const response = await fetch(`${baseUrl}/comments`, options);
      const json = await response.json();
      let coms=json.comments;
      const arrayOfComments = coms.map(item => {
        return {
          id:item.id,
          line:item.line,
          text:item.text,
          isLiked:item.isLiked,
          createdAt:item.createdAt
        };})
        for(let com of arrayOfComments){
          if(com.text===contentOfComment&&i===com.line){
            (async () => {
              try {
                const options = {
                  method: "DELETE",
                  headers: { key },
                };
                const response = await fetch(
                  `${baseUrl}/remove/${com.id}`,
                  options
                );
            
                if (!response.ok) {
                  const json = await response.json();
                  throw json.message;
                }
              } catch (err) {
                console.log("ERROR:", err);
                alert("Error", err);
              }
            })();
          }
      }
      if (!response.ok) {
        throw json.message;
      }
      console.log(json);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  })();
}

DisplayCommentsFromServer();
function DisplayCommentsFromServer() {
  (async () => {
    try {
      const options = {
        headers: {
          key,
        },

      };
      const response = await fetch(`${baseUrl}/comments`, options);
      const json = await response.json();
      let coms=json.comments;
      console.log(coms);
      const arrayOfComments = coms.map(item => {
        return {
          id:item.id,
          line:item.line,
          text:item.text,
          isLiked:item.isLiked,
          createdAt:item.createdAt
        };})
        for(let com of arrayOfComments){
          let codeLine = document.getElementsByClassName("code-line-wrapper");
          console.log(com.line);
          let commentWrapper = codeLine[com.line].getElementsByClassName("comments-wrapper");
          let comment = document.getElementsByClassName("comment");
          let newCom = comment[0].cloneNode(true);
          let ComContent = newCom.getElementsByClassName("comment-content");
          let CommentDate = newCom.getElementsByClassName("comment-date");
          let likeButton = newCom.getElementsByClassName("like-button");
          let newTitle = newCom.getElementsByClassName("comment-title");
          ComContent[0].innerHTML = com.text;
          newCom.removeAttribute("id");
          newTitle[0].innerHTML="Comment from server";
          const dateString =com.createdAt;
          const date = new Date(dateString);
          const hours = date.getHours().toString().padStart(2, "0");
          const minutes = date.getMinutes().toString().padStart(2, "0");
          const day = date.getDate().toString().padStart(2, "0");
          const month = (date.getMonth() + 1).toString().padStart(2, "0"); 
          const year = date.getFullYear().toString();
          const formattedDate = `${hours}:${minutes}   ${day}.${month}.${year}`;
          CommentDate[0].innerHTML = formattedDate;     
          if(com.isLiked){
            likeButton[0].innerHTML = "Liked";
            likeButton[0].classList.add("liked-button");
            likeButton[0].classList.add("liked-button:hover");
          }
          commentWrapper[0].appendChild(newCom);
      }
      if (!response.ok) {
        throw json.message;
      }
      console.log(json);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  })();
}