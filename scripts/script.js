let a=document.getElementsByClassName("new-comment");
let b=document.getElementsByClassName("button-number");
console.log(b);

for (let i = 0; i < b.length; i++) {
  b[i].addEventListener('click', ()=>{
    if(a[i].classList.contains("display-block"))
      a[i].classList.remove("display-block");
    else
      a[i].classList.add("display-block");
  });
}
