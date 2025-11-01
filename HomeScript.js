  let currentPage=1
     let lastPage=1


//        INVINITE SCROLE// 

   window.addEventListener("scroll", function(){
    const endOfPage = window.innerHeight + window.pageYOffset >= (document.body.scrollHeight-1);
    // console.log(window.innerHeight,window.pageYOffset,document.body.scrollHeight)
    if (endOfPage && currentPage < lastPage) {
         currentPage=currentPage+1
    getPosts(false,currentPage);
   
  }

   });

//    <//INVINITE SCROLE//>// 

    setupUI()
    

    getPosts()

   
 
     function getPosts(reload=true,page = 1)
        {
            togllaLoader(true)
         axios.get(`${baaseUrl}posts?limit=4&page=${page}`)
        .then(function (response) {

            togllaLoader(false)
            // handle success
            let posts = response.data.data;
             
            lastPage=response.data.meta.last_page

              
            if(reload)
            {
              document.getElementById("posts").innerHTML = ""

            }
            
            for (post of posts) {
                let titlePost = ""

                let user=getCurrentUser()
                let isMyPost=user!=null && post.author.id==user.id

                let editBtnContent=``


                if(isMyPost)
                {
                    editBtnContent=
                    `
                     
                     <button class='btn btn-secondary' style="float:right"  onclick="editPostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')">edit</button>
                    <button class='btn btn-danger mx-1' style="float:right;"  onclick="deletPostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')">delete</button>
                   
                    
                    `

                             
                                    
                }

                

                if (post.title != null) {
                    titlePost = post.title
                }

                let content =
                    `
            <div class="card shadow">
                <div class="row card-header align-items-center  m-0">
                <div class="col align-items-center justify-content-start " onclick="userClicked(${post.author.id})" style="cursor: pointer;">
                <img src="${post.author.profile_image}" alt="" style="width: 40px;height: 40px;"class="rounded-circle border border-2">
                    <b>${post.author.username}</b>
                    </div>
                     <div class="col d-flex align-items-center justify-content-end" style="dirction:rtl !importaint">
                    ${editBtnContent}
                     </div>
                </div>
                <div class="card-body" onclick="postClicked(${post.id})" style="cursor:pointer;">
                    <img src="${post.image}" class="w-100" alt="">


                    <h6 style="color:rgb(193, 193, 193) ;" class="mt-1">${post.created_at}</h6>


                    <h5>${titlePost}</h5>

                    <p>
                        ${post.body}
                    </p>

                    <hr>

                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                       <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                       </svg>


                        <span>
                            ${post.comments_count} Comments

                            <span id="post-tags-${post.id}">


                              </span>  
                        
                        </span>
                    </div>
                </div>
                </div>

     `

                document.getElementById("posts").innerHTML += content

                const currentPostTagsId = `post-tags-${post.id}`

                document.getElementById(currentPostTagsId).innerHTML = ""

                for (tag of post.tags) {

                    let TagsContent =
                        `

        <button class="btn btn-sm rounded-5" style="background-color: gray;color: white;">
                 ${tag.name}           
            </button>
        `

                    document.getElementById(currentPostTagsId).innerHTML += TagsContent
                }

            }

        })
        .catch(function (error) {
            // handle error
            showAlert(error, "danger")

        })
        }
   
  function userClicked(postID)
  {
    window.location=`profile.html?userId=${postID}`
  }

 
 