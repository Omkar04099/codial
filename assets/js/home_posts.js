{
    // Method to submit form data from post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })
        });
    }
    
    
    // Method to create a post in DOM
    let newPostDom = function(post){
        return $(
        `<li id="post-${ post._id }">
            <p>
                
                    <small>
                        <a class="delete-post-button" href="/posts/destroy/${ post._id }">X</a>
                    </small>
                    
                    ${post.content}
                            <br>
                            <small>
                                ${  post.user.name }
                            </small>
            </p>
            <div class="post-comments">
                
                    <form action="/comments/create" method="post">
                        <input type="text" name="content" placeholder="Type Here to add comment ..." required>
                        <input type="hidden" name="post" value=" ${  post._id }">
                        <input type="submit" value="Add comment">
                    </form>
                    
        
                        <div class="post-comments-list">
                            <ul id="post-comment-${ post._id }">
                                
                            </ul>
                        </div>
            </div>
        </li>`
        )
    }



    // Method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }


    // Method to submit form data from post using AJAX
    // let createComment = function(){
    //     let newCommentForm = $('#new-comment-form');

    //     newCommentForm.submit(function(e){
    //         e.preventDefault();

    //         $.ajax({
    //             type:'post',
    //             url:'/comments/create',
    //             data: newCommentForm.serialize(),
    //             success: function(data){
    //                 let newComment = newCommentDom(data.data.post);
    //                 deleteComment($(' .delete-comment-button', newComment));
    //             },
    //             error: function(error){
    //                 console.log(error.responseText);
    //             }
    //         })
    //     });
    // }


    // // Method to create a post in DOM
    // let newCommentDom = function(post){
    //     return $(
    //         `<li>
    //             <p>
                    
    //                     <small>
    //                         <a href="/comments/destroy/${ comment._id }">X</a>
    //                     </small>
                    
    //                 ${ comment.content }
    //                 <br>
    //                 <small>
    //                     ${ comment.user.name }
    //                 </small>
    //             </p> 
    //         </li>
    //         <div class="post-comments">
        
    //         <form action="/comments/create" id="new-comment-form" method="post">
    //             <input type="text" name="content" placeholder="Type Here to add comment ..." required>
    //             <input type="hidden" name="post" value="${ post._id }">
    //             <input type="submit" value="Add comment">
    //         </form>
            

    //             <div class="post-comments-list">
    //                 <ul id="post-comment-${ post._id }">
    //                     <% for (comment of post.comments){%>
    //                         <%- include('_comment') -%>
    //                             <%} %>
    //                 </ul>
    //             </div>
    // </div>
    //         `
    // )
    // }

    // // Method to delete a post from DOM
    // let deleteComment = function(deleteLink){
    //     $(deleteLink).click(function(e){
    //         e.preventDefault();

    //         $.ajax({
    //             type:'get',
    //             url: $(deleteLink).prop('href'),
    //             success: function(data){
    //                 $(`#comment-${data.data.comment_id}`).remove();
    //             },
    //             error: function(error){
    //                 console.log(error.responseText);
    //             }
    //         })
    //     })
    // }

    createPost();
    // createComment();
}