const newPostModal =() =>{
    $("#modal-container-input").append(  `
        <!--modal-->
        <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="newPostTitle">New Post</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <form>
                          <div class="form-group">
                            <label for="recipient-title" class="col-form-label">Title:</label>
                            <input type="text" class="form-control" id="title-input">
                          </div>
                          <div class="form-group">
                            <label for="recipient-subtitle" class="col-form-label">Subtitle:</label>
                            <input type="text" class="form-control form-control-sm" id="subtitle-input">
                            <div class="img-option my-1">
                             <div class="col-md-auto d-flex">
                                <div class="input-group-prepend">
                                   <div  id="inputGroupPrepend2">
                                      <img src="./assets/images/img-logo.png"/>
                                   </div>
                                </div>
                                   <input type="text" class="form-control form-control-sm" id="img-input">
                             </div>
                            </div>
                          </div>
                          <div class="form-group">
                            <label for="content-input" class="col-form-label">Content:</label>
                            <textarea class="form-control form-control-lg" id="content-text" type="text" ></textarea>
                          </div>
                          <div class="form-group">
                            <label for="references-input" class="col-form-label">References:</label>
                            <textarea class="form-control form-control-sm" id="references-text"></textarea>
                          </div>
                          <div class="form-group">
                            <label for="tags-input" class="col-form-label">Tags:</label>
                            <textarea class="form-control form-control-sm" id="tags-text"></textarea>
                          </div>
                        </form>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" data-dismiss="modal" id="add-entry">Add Entry</button>
                      </div>
                </div>
            </div>
        </div>
        <!--End modal-->
        ` )
        $("#add-entry").on("click", saveNewPost)
}

$("#new-post-button").on("click", newPostModal)
$("#new-post-button-md").on("click", newPostModal)

// id="title-input" id="subtitle-input" id="img-input" id="content-text" id="references-text" id="tags-text"

const saveNewPost=()=>{
    let titlePost = $("#title-input").val(),
        subtitlePost = $("#subtitle-input").val(),
        imgPost = $("#img-input").val(),
        contentPost = $("#content-text").val(),
        referencesPost = $("#references-text").val(),
        tagsPost = $("#tags-text").val(),

        postObject = {titlePost,subtitlePost,imgPost,contentPost,referencesPost,tagsPost};
        console.log(postObject)
        pushDataBase(postObject)
}

//Función que ingresa los datos
const pushDataBase = (postObject)=>{
    let postContent = JSON.stringify(postObject)
    $.post("https://javascript-ajax-d0ce6.firebaseio.com/toño/koders/.json",postContent, function(status){
        console.log(status)
        }) 
}

//Funcion que trae los datos de la base de datos
var postArray;
const getDataBase = ()=>{
    postArray = [];
    $.get("https://javascript-ajax-d0ce6.firebaseio.com/toño/koders/.json", function(data){
        $.each(data,(key,value)=>{
            postArray.push({...value,key})
    })
  //  console.log(postArray)
   // koderList(kodersArray)
    }) 
    
}
getDataBase()

const showModalContent =()=>{
    let article = postArray[0]
    console.log(article)
    $("#modal-container-article").append(`
    <div class="modal fade bd-example-modal-xl" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
            <div class="modal-container col-8 mx-auto">
                <div class="title text-center mt-4">
                    <h1>${article.titlePost}</h1>
                </div>
                <div class="subtitle text-center mb-4">
                    <h3>${article.subtitlePost}</h3>
                </div>
                <div class="profile-box mb-4 d-sm-flex flex-row-reverse justify-content-between">
                     <div class="social-networks d-flex mb-3">
                        <div class="network-logo mx-1">
                            <img src="./assets/images/twitter icon.png" alt="">
                        </div>
                        <div class="network-logo mx-1">
                            <img src="./assets/images/linkedin-icon.png" alt="">
                        </div>
                        <div class="network-logo mx-1">
                            <img src="./assets/images/fb-icon.png" alt="">
                        </div>
                        <div class="network-logo mx-1">
                            <img src="./assets/images/label-icon.png" alt="">
                        </div>
                        <div class="network-logo mx-1">
                            <button data-target="popover" id="doot-menu">
                                <img src="./assets/images/three-dots-icon.png" alt="">
                            </button>
                        </div>        
                    </div>
                    <div class="profile d-flex mb-sm-3">
                        <div class="img-profile"><img src="./assets/images/user-profile-icon.png" alt="user"></div>
                        <div class="name-profile col-10">
                            <div class="d-flex justify-content-between">
                                <a href="">User Name</a>
                                <button type="button" class="btn btn-outline-info d-none d-sm-block px-1 py-0">Follow</button>
                            </div>
                            <span>Fecha</span>
                        </div>
                    </div>
                </div>
                <div class="image">
                    <figure><img class="img-fluid" src=${article.imgPost} alt=""></figure>
                </div>
                <p class="text-justify">${article.contentPost}</p>
                <div class="references">
                    <h5>References</h5>
                    <p>${article.referencesPost}</p>
                </div>
                <div class="tags">
                    <h5>Tags</h5>
                    <p>${article.tagsPost}</p>
                </div>
            </div>                    
        </div>
     </div>
</div>
    `)
    $("#doot-menu").on("click",dootsMenu)
}

$("#article-button").on("click", showModalContent)

const dootsMenu =()=>{
 // let menudoot = document.createElement("div")
  alert("aloha")
  $("container").append(`
  <div class="popover"  role="tooltip">
  <div class="arrow"></div>
  <div class="popover-body">
      <ul>
          <li>
              <span>
                  <button>Mute this author</button>
              </span>
          </li>
          <li>
              <span>
                  <button>Mute this publication</button>
              </span>
          </li>
          <li>
              <span>
                  <button>Mute this story</button>
              </span>
          </li>
          <li>
              <span>
                  <button>Block this author</button>
              </span>
          </li>
      </ul>
  </div>
</div> 
  `)
}



const counter =()=>{
    let counter = 0;


}

//Edy

// duration of scroll animation
var scrollDuration = 300;
// paddles
var leftPaddle = document.getElementsByClassName('left-paddle');
var rightPaddle = document.getElementsByClassName('right-paddle');
// get items dimensions
var itemsLength = $('.item').length;
var itemSize = $('.item').outerWidth(true);
// get some relevant size for the paddle triggering point
var paddleMargin = 25;

// get wrapper width
var getMenuWrapperSize = function() {
	return $('.menu-wrapper').outerWidth();
}
var menuWrapperSize = getMenuWrapperSize();
// the wrapper is responsive
$(window).on('resize', function() {
	menuWrapperSize = getMenuWrapperSize();
});
// size of the visible part of the menu is equal as the wrapper size 
var menuVisibleSize = menuWrapperSize;

// get total width of all menu items
var getMenuSize = function() {
	return itemsLength * itemSize;
};
var menuSize = getMenuSize();
// get how much of menu is invisible
var menuInvisibleSize =   menuWrapperSize

// get how much have we scrolled to the left
var getMenuPosition = function() {
	return $('.menu').scrollLeft();
};

// finally, what happens when we are actually scrolling the menu
$('.menu').on('scroll', function() {

	// get how much of menu is invisible
	menuInvisibleSize = menuWrapperSize - menuWrapperSize ;
	// get how much have we scrolled so far
	var menuPosition = getMenuPosition();

	var menuEndOffset = menuInvisibleSize;//- paddleMargin


});

// scroll to left
$(rightPaddle).on('click', function() {
	$('.menu').animate( { scrollLeft: menuWrapperSize}, scrollDuration); 
});

// scroll to right
$(leftPaddle).on('click', function() {
	$('.menu').animate( { scrollLeft: '0' }, scrollDuration); //'0'
});

//Edy




//Agregar articles
/*
const principalArticle =()=>{
    let article = postArray[0]
    console.log(article)
    $("#pricipalArt").append(`
    <div type="button" class="">
    <figure>
        <img class="img-fluid" alt="imagen aleatoria" id="img_new_principal" src=${postArray[0].imgPost}> 
    </figure>
</div>
<div class="body_new_principal">
    <div class="info-article">
            <div class="title-article">
                <a href=""><h1>${article.titlePost}</h1></a>
                <a href=""><p>Lorem ipsum, dolor sit </p></a>
            </div>
    </div>
    <div class="d-flex justify-content-between">
        <div class="d-flex flex-column">
            <a href="">Author</a>
            <span>Fecha</span>
        </div>
        <button class="bg-transparent border-0"><img src="./assets/images/three-dots-icon.png" alt=""></button>
     </div>
</div>
    `)
}
principalArticle()


const sectionTwoArticle =()=>{
    let article = postArray[0]
    for(let i=0; i<2; i++){
        $("#asideSecondArt").append(`
        <article class="d-flex">
        <div type="buttons">
            <figure><img class="img-fluid" src=${article.imgPost} alt=""></figure>
        </div>
        <div class="body-aside-new">
            <div class="info-article">
                    <div class="title-article">
                        <a href=""><h2>${article.titlePost}</h2></a>
                        <a href=""><p>Lorem ipsum, dolor sit </p></a>
                    </div>
            </div>
            <div class="d-flex justify-content-between">
                <div class="d-flex flex-column">
                    <a href="">Author</a>
                    <span>Fecha</span>
                </div>
                <button class="bg-transparent border-0"><img src="./assets/images/three-dots-icon.png" alt=""></button>
            </div>
        </div>
    </article>
        `)
    }
}

const sectionThreeArticle=()=>{
    let article = postArray[0]
    $("#thirdArticle").append(`
    <div type="button" class="">
    <figure>
        <img class="img-fluid" alt="imagen aleatoria" id="img_new_principal" src=${article.imgPost}> 
    </figure>
</div>
<div class="body_new_principal">
    <div class="info-article">
            <div class="title-article">
                <a href=""><h1>${article.titlePost}</h1></a>
                <a href=""><p>Lorem ipsum, dolor sit </p></a>
            </div>
    </div>
    <div class="d-flex justify-content-between">
        <div class="d-flex flex-column">
            <a href="">Author</a>
            <span>Fecha</span>
        </div>
        <button class="bg-transparent border-0"><img src="./assets/images/three-dots-icon.png" alt=""></button>
     </div>
</div>
    `)
}
sectionThreeArticle()

*/