
 const baaseUrl = 'https://tarmeezacademy.com/api/v1/'


function loginBtnClick() {
        {
            let username = document.getElementById("username-input").value
            let password = document.getElementById("password-input").value

            let param =
            {
                "username": username,
                "password": password
            }
            const url = `${baaseUrl}login`
            togllaLoader(true)
            axios.post(url, param)
                .then(function (response) {
                    localStorage.setItem("token", response.data.token)
                    localStorage.setItem("user", JSON.stringify(response.data.user))
                
                    showAlert("user logged in successfuly", "success")
                    setupUI()
                }).catch((error) => {
                    showAlert(error.response.data.message, "danger")
                }).finally(()=>{
                   togllaLoader(false)
            })
            const modal = document.getElementById("login-modal")
            const modalInstance = bootstrap.Modal.getInstance(modal)
            modalInstance.hide()
        }

    }
   
   
    function logOutModal() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        showAlert(" user logged out successfuly", "success")
        setupUI()

    }

   
    function registerBtnClick() {

        let name = document.getElementById("register-name-input").value
        let username = document.getElementById("register-username-input").value
        let password = document.getElementById("register-password-input").value
        let image=document.getElementById("register-image-input").files[0]
        
        let formdata=new FormData()
        formdata.append("username", username)
        formdata.append("password", password)
        formdata.append("name",name)
        formdata.append( "image",image)

       
        const url = `${baaseUrl}register`
        togllaLoader(true)
        axios.post(url,formdata )
            .then(function (response) {
              
              
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("user", JSON.stringify(response.data.user))
                showAlert("New User Registered", "success")
                setupUI()
            }).catch((error) => {
                showAlert(error.response.data.message, "danger")
            }).finally(()=>{
                   togllaLoader(false)
            })
        const modal = document.getElementById("register-modal")
        const modalInstance = bootstrap.Modal.getInstance(modal)
        modalInstance.hide()

    }

function showAlert(viewMessag, type) {
    const alertPlaceholder = document.getElementById('show-alert');

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            <div>${viewMessag}</div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    alertPlaceholder.append(wrapper);
    setTimeout(() => {
        const alertElement = wrapper.querySelector('.alert');
        if (alertElement) {
          
            alertElement.classList.remove('show');

            setTimeout(() => {
                const alertInstance = bootstrap.Alert.getOrCreateInstance(alertElement);
                alertInstance.close();
            }, 300);
        }
    }, 2000);
}



    function setupUI() {
        const token = localStorage.getItem("token")
        const loginDive = document.getElementById("logged-in")
        const logoutDive = document.getElementById("logged-out")
        
        const addBtn= document.getElementById("add-button")
        const addCommentDive= document.getElementById("add-comment-div")


        if (token == null) {
            loginDive.style.setProperty("display", "flex", "important")
            logoutDive.style.setProperty("display", "none", "important")

            if(addBtn !=null)
            {
            addBtn.style.setProperty("display", "none", "important")
            }
              else if(addCommentDive!=null)
            {
            addCommentDive.style.setProperty("display", "none", "important")
            }

        } else {
            loginDive.style.setProperty("display", "none", "important")
            logoutDive.style.setProperty("display", "flex", "important")

            if(addBtn !=null)
            {
            addBtn.style.setProperty("display", "block", "important")
            }
             else  if(addCommentDive !=null)
             {
                
                  addCommentDive.style.setProperty("display", "flex", "important")
            } 
            const user=getCurrentUser()
            document.getElementById("nav-username").innerHTML=user.username
            document.getElementById("nav-image-user").src=user.profile_image
        }
    }



    function getCurrentUser()
{
  let user=null
    const storagUser=localStorage.getItem("user")
    if(storagUser !=null)
{
user=JSON.parse(storagUser)
}
return user
}


function editPostBtnClicked(postObject)
  {

    let post=JSON.parse(decodeURIComponent(postObject))

    document.getElementById("post-modal-submit-btn").innerHTML="Update"

    document.getElementById("post-id-input").value=post.id
    document.getElementById("post-modal-title").innerHTML="Edit post"
    document.getElementById("post-title-input").value=post.title
    document.getElementById("post-body-input").value=post.body

   let postModal=new bootstrap.Modal(document.getElementById("create-post-modal"),{})
        postModal.toggle()
  }

  function addBtnClicked()
  {
    
    document.getElementById("post-modal-submit-btn").innerHTML="Create"
    document.getElementById("post-id-input").value=""
    document.getElementById("post-modal-title").innerHTML="Creat A  New Post"
    document.getElementById("post-title-input").value=""
    document.getElementById("post-body-input").value=""

   let postModal=new bootstrap.Modal(document.getElementById("create-post-modal"),{})
        postModal.toggle()

  } 

   function deletPostBtnClicked(postObject)
  {
    let post=JSON.parse(decodeURIComponent(postObject))

      document.getElementById("delete-post-id-input").value=post.id
    
   let postModal=new bootstrap.Modal(document.getElementById("delet-post-modal"),{})
        postModal.toggle()
  }

  

  function confirmPostDelet()
  {
      const postId = document.getElementById("delete-post-id-input").value
        
      const url = `${baaseUrl}posts/${postId}`
      const toket=localStorage.getItem("token")
      const headers={
            "authorization":`Bearer ${toket}`
        }

      axios.delete(url,{
           headers:headers
      }).then((response)=>{

            const modal = document.getElementById("delet-post-modal")
            const modalInstance = bootstrap.Modal.getInstance(modal)
            modalInstance.hide()
             showAlert("The Post Has Been Deleted Successfully", "success") 
             getPosts()        
          }).catch((error)=>{
           showAlert(error.response.data.data.message, "danger")


          })
    
  }
    function CreateNewPostClicked()
    {
             
            let postId=document.getElementById("post-id-input").value

            let isCreate=postId ==null || postId ==""

             
            let title = document.getElementById("post-title-input").value
            let body = document.getElementById("post-body-input").value
            let image=document.getElementById("post-image-input").files[0]
             
            let formData=new FormData()
             
            formData.append("body",body)
            formData.append("title",title)
            formData.append("image",image)
            

            const toket=localStorage.getItem("token")
            const headers={
            "Content-Type":"multipart/form-data",
            "authorization":`Bearer ${toket}`
            }
            let url =""
            if (isCreate)
            {
               url=`${baaseUrl}posts`
            }else{
                formData.append("_method","put")
                url=`${baaseUrl}posts/${postId}`
            }
            togllaLoader(true)

            axios.post(url, formData,{
                headers:headers
            })
         .then(function (response) {
            const modal = document.getElementById("create-post-modal")
            const modalInstance = bootstrap.Modal.getInstance(modal)
            modalInstance.hide()
             showAlert("New Post Has Been Created", "success") 
             getPosts()     
        })
        .catch((error)=>{
             showAlert(error.response.data.data.message, "danger")

        }).finally(()=>{
            
                   togllaLoader(false)
         
        })

    }


    function ProfileClicked()
    {
       const user=JSON.parse(localStorage.getItem('user'))
      if(user!=null)
      {
            const id=user.id 
           window.location=`Profile.html?userId=${id}` 
      }
      else
    {
          showAlert("You are not login!","danger")
      }
      
    }

     function postClicked(postID)
  {
     window.location=`postDetails.html?postId=${postID}`
  }
  
  function togllaLoader(show=true)
  {
    if(show)
    {
     document.getElementById("loader").style.visibility='visible'
    }
    else{
         document.getElementById("loader").style.visibility='hidden'
    }
  }
 
