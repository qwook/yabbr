![Yabbr](https://github.com/qwook/yabbr/blob/master/documents/yabbrlogo.png?raw=true)
  
# yabbr
App we're making over the summer.

# Terminology
* Directive - Describes what a view does.
* Screen - Entirely different screen changes.

# Views
![Views](https://github.com/qwook/yabbr/blob/master/documents/appconcept.png?raw=true)
## LoginScreenView
## RegistrationScreenView
## DashboardScreenView
## PostScreenView
## ProfileScreenView
## VoteView
Up/Downvote buttons, and score.
## PostView
Post content, user, and up and downvote.
## ChildPostView
Replies to a post.
## ReplyView
Textbox and send.
## UserView
Displays name, submission #, reply #, and karma.
## TopBarView
Displays karma.

# Models
## User
* ID (Unique Number)
* Username
* Password
* Email
* Karma (Number)

## Post
* ID (Unique Number)
* Likes (Number)
* Parent (Post.ID or NULL) -- Is this a reply?
* Owner (User.ID)
* Timestamp
* School (School.ID)

## Karma
Use this to keep track whether or not a user has already upvoted/downvoted.

* Value (1/-1)
* Owner (User.ID)
* Post (Post.ID) -- What post is this upvote/downvote for?

## School
* ID (Unique Number)
* Longitude
* Latitude
* Name

# Controllers
## DashboardController
* Refresh()
* ShowMore(offset)

## UserController
* LogOut()

## PostController
* NewPost(message)
