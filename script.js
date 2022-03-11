"use strict"


const allCardHolder = document.querySelector(".all-card-holder")
const replyCommentsHolder = document.querySelector(".reply-comments-holder")
const replyBtn = document.querySelector(".reply")
const postCard = document.querySelector(".post-card")
const postData = document.querySelector(".input-comments")
const opacity = document.querySelector(".opacity")
const deleteConformation = document.querySelector(".delete-conformation")
const deleteYes = document.querySelector(".yes")
const deleteNo = document.querySelector(".no")


let apiDataCopy;

const storeData = function (data) {
    const apiData = data;
    apiDataCopy = apiData
    data.comments.forEach(el => {

        allCardHolder.innerHTML += `<div class="card">
        <div class="rating">
          <div class="plus-image">
            <img src="./images/icon-plus.svg" alt="icon plus" />
          </div>
          <p class="number">${el.score}</p>
          <div class="minus-image">
            <img src="./images/icon-minus.svg" alt="icon minus" />
          </div>
        </div>
        <div class="main-comments">
          <div class="header">
            <img class="user-image" src="${el.user.image.webp}" alt="image of amyrobson" />
            <p class="user-name">${el.user.username} </p>
            <p class="time-line">
              ${el.createdAt}
            </p>
            <div class="reply">
              <img src="./images/icon-reply.svg" />
              <span>Reply</span>
            </div>
          </div>
          <p class="comments">
            ${el.content}
          </p>
        </div>`

        if (el.replies.length > 0) {
            el.replies.forEach(el => {
                allCardHolder.innerHTML += ` <section class="reply-comments-holder">
        <div class="card reply-comments ">
          <div class="rating">
            <div class="plus-image">
              <img src="./images/icon-plus.svg" alt="icon plus" />
            </div>

            <p class="number">${el.score}</p>

            <div class="minus-image">
              <img src="./images/icon-minus.svg" alt="icon minus" />
            </div>
          </div>

          <div class="main-comments">
            <div class="header">
              <img class="user-image" src="${el.user.image.webp}" alt="image of amyrobson" />
              <p class="user-name">${el.user.username} </p>
              <p class="time-line">${el.createdAt}</p>
              <div class="reply">
                <img src="./images/icon-reply.svg" />
                <span>Reply</span>
              </div>
            </div>
            <p class="comments">
            <span class="replying-to">${el.replyingTo}</span> ${el.content}</p>
          </div>
        </div>
      </section>`
            })
        }
    })
}

const removeInputCards = function () {
    const replyCards = document.querySelectorAll(".inner-reply-comments")
    replyCards.forEach(el => {
        el.remove()
    })
}

// Toggle hidden
const toggleHidden = function () {
    opacity.classList.contains("hidden") ? opacity.classList.remove("hidden") : opacity.classList.add("hidden")
    deleteConformation.classList.toggle("hidden")
}
opacity.addEventListener("click", () => toggleHidden())


allCardHolder.addEventListener("click", function (e) {
    if (e.target.parentElement?.classList.contains("reply")) {

        removeInputCards()
        const closestCard = e.target.closest(".card")
        closestCard?.insertAdjacentHTML("afterend", `<section class="reply-card ${closestCard.classList.contains("reply-comments") ? "reply-comments-reply-card inner-reply-comments" : "inner-reply-comments"}">
        <img class="user-image" src="./images/avatars/image-juliusomo.webp" />
        <form class="text-box">
          <input class="input-comments" type="text"></input>
        </form>
        <div class=" reply reply-current">
          <span>Reply</span>
        </div>
      </section>`
        )

        // Replying-to
        const userNameToReply = e.target.closest(".card")?.querySelector(".user-name").textContent

        const form = document.querySelector(".text-box")
        const inputComment = document.querySelector(".input-comments")

        const sumbitReply = function () {
            closestCard.insertAdjacentHTML("afterend", `
            <section class="reply-comments-holder">
        <div class="card reply-comments current-user-reply">
          <div class="rating">
            <div class="plus-image">
              <img src="./images/icon-plus.svg" alt="icon plus" />
            </div>

            <p class="number">${"1"}</p>

            <div class="minus-image">
              <img src="./images/icon-minus.svg" alt="icon minus" />

            </div>
          </div>

          <div class="main-comments">
             <div class="header">
              <div class="user-details">
                <img class="user-image" src="${apiDataCopy.currentUser.image.webp}" alt="image of user" />
                <p class="user-name">${apiDataCopy.currentUser.username} </p><span class="mark">you</span>
                <p class="time-line">
                  1 month ago
                </p>
              </div>
              <div class="delete-edit">
                <div class="delete">
                  <img src="./images/icon-delete.svg" alt="delete icon" />
                  <span>Delete</span>
                </div>
                <div class="edit">
                  <img src="./images/icon-edit.svg" alt="edit icon" />
                  <span>Edit</span>
                </div>
              </div>
            </div>
            <p class="comments">
            <span class="replying-to"><strong>@${userNameToReply}</strong><span class="original-text">${inputComment.value}</span> </span></p>
          </div>
        </div>
      </section>`)


        }

        form.addEventListener("submit", function (e) {
            e.preventDefault()
            sumbitReply()
            e.target.closest(".reply-card").remove()
        })

        const replyCurrentComment = document.querySelector(".reply-current")

        replyCurrentComment.addEventListener("click", function (e) {
            sumbitReply()
            e.target.closest(".reply-card").remove()

        })

    }


    //EDIT COMMENTS

    if (e.target.parentElement?.classList.contains("edit")) {

        removeInputCards()
        const curretnCard = e.target.closest(".card")
        const currentComment = curretnCard.querySelector(".comments")
        const originalText = document.querySelector(".original-text")
        const inputField = document.createElement("input")
        const updateBtn = document.createElement("button")
        updateBtn.classList.add("update")
        updateBtn.textContent = "update"

        const keepTheTarget = currentComment.textContent.split(" ").filter(el => {
            return el !== ""
        })[1]
        inputField.setAttribute("value", `${originalText.textContent.trim()}`)
        currentComment.innerHTML = ""
        inputField.classList.add("input-comments")
        currentComment.appendChild(inputField)
        currentComment.appendChild(updateBtn)

        inputField.addEventListener("submit", function () {
        })

        updateBtn.addEventListener("click", function () {
            const updatedText = inputField.value;
            currentComment.innerHTML = `<p class="comments">
            ${curretnCard.classList.contains("reply-comments") ? ` <strong>${keepTheTarget}</strong>` : ""} ${updatedText}</p>`
        })

    }



    //DELETE COMMENTS
    if (e.target.parentElement?.classList.contains("delete")) {
        const closestCard = e.target.closest(".card")
        opacity.classList.remove("hidden")
        deleteConformation.classList.remove("hidden")
        deleteConformation.addEventListener("click", function (e) {

            if (e.target.classList.contains("yes")) {
                closestCard.remove()
                opacity.classList.add("hidden")
                deleteConformation.classList.add("hidden")
            }

            else if (e.target.classList.contains("no")) {
                opacity.classList.add("hidden")
                deleteConformation.classList.add("hidden")
            }
        })
    }


    // Inc and Dec rating
    const ratingNum = e.target.closest(".card")?.querySelector(".number")

    if (e.target.closest(".plus-image")?.classList.contains("plus-image")) {
        +ratingNum.textContent++
    }

    if (e.target.closest(".minus-image")?.classList.contains("minus-image")) {

        +ratingNum.textContent === 0 ? "0" : +ratingNum.textContent--
    }
})




//Post card

const createNewPost = function (newPostData) {
    allCardHolder.insertAdjacentHTML("beforeend",
        `
        <div class="card">
          <div class="rating">
            <div class="plus-image">
              <img src="./images/icon-plus.svg" alt="icon plus" />
              <img />
            </div>

            <p class="number">${"12"}</p>

            <div class="minus-image">
              <img src="./images/icon-minus.svg" alt="icon minus" />
              <img />
            </div>
          </div>

          <div class="main-comments">
             <div class="header">
              <div class="user-details">
                <img class="user-image" src="${apiDataCopy.currentUser.image.webp}" alt="image of amyrobson" />
                <p class="user-name">${apiDataCopy.currentUser.username} </p><span class="mark">you</span>
                <p class="time-line">
                  1 month ago
                </p>
              </div>
              <div class="delete-edit">
                <div class="delete">
                  <img src="./images/icon-delete.svg" alt="delete icon" />
                  <span>Delete</span>
                </div>
                <div class="edit">
                  <img src="./images/icon-edit.svg" alt="edit icon" />
                  <span>Edit</span>
                </div>
              </div>
            </div>
            <p class="comments original-text">
            ${newPostData}</p>
          </div>
        </div>`)
    postData.value = ""
}


postCard.addEventListener("submit", function (e) {
    e.preventDefault()
    createNewPost(postData.value)


})

replyBtn.addEventListener("click", function () {
    createNewPost(postData.value)

})





// Fetching the data fron data.json
fetch("./data.json").then(response => response.json()).then(el => {
    storeData(el)
}).catch(el => console.log(el))



