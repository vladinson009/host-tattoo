<a href="https://host-tattoo.vercel.app" target="_blank" rel="noopener noreferrer">https://host-tattoo.vercel.app</a>

# How it works

---

# Guest users:

### can:

- Home page by clicking on studio name(HØST TATTOO)

- Check news feed without functionality

- Check Gallery

- Search in Gallery by tattoo name

- Use Infinity pagination at the bottom of Gallery page

- Check Tattoo details by clicking on the tattoo image(or Artist Details by click on artist name)

- Check Artists

- Check Artist details by clicking on [info] button

- Login

- Register

---

# Authenticated users:

- username: george ; password: 123456
- username: vladimir ; password: 123456
- username: anja ; password: 123456

Feel free to register new one :)

### in additional to guest can:

- Book now button in homepage
- Private part (Wishlist in user dropdown menu)
- Add/remove tattoo to/from wishlist collection(tattoo is accesable from Gallery, or Artist Details and appear in Wishlist after adding to collection)

- Check only my posts (in user dropdown menu)

CRUD for Authenticated user:

- Create post (in Navigation)
- Like/unlike and write/read comments for posts in News Feed
- Edit/Delete posts if is author from News Feed or My Posts(user dropdown menu)

Other functionality

- Like/unlike artist in artists section(in Navigation)
- Check comments for users posts in News Feed(Drag-and-Drop modal)

- BOOK TIME form sending message to to targeted Artist
- Logout from user dropdown menu

---

# "Artist" role users:

- username: peter ; password: 123456
- username: vladinson009 ; password: 123456
- username: gabriela ; password: 123456

### in additional to Authenticated can:

- Create tattoo (in Navigation)
- Permission to delete/edit own tattoo but cant add ownt tattoo to wishlist(in Tattoo Details)
- Access own tattoo collection (in user dropdown menu)
- Access BOOK TIME messages from Authenticated Users sent to them ("My messages" in user dropdown menu)

---

# Project defense requirements:

---

## Public Part

- Home Page
- Login
- Register
- Check posts from another users in News feed without functinality
- Check artists and their portfolio without functionality
- Check tattoos gallery and tattoo details without functionality

## Private Part

- My Tattoos wishlist
- My Posts
- My messages (if role is an "Artist")

## General requirements

### At least 3 dynamic pages:

- Home Page
- News Feed
- Gallery
- Artists
- My Wishlist
- My Posts
- My Messages
- Tattoo details
- Artist details

  ### Must have specific views:

- list of all created records

  <strong>Gallery</strong>

  <strong>News feed</strong>

  <strong>Artists</strong>

- information about a specific record

  <strong>Tattoo details</strong>

  <strong>Artist details</strong>

### At least one collection, different from the User collection, with all CRUD operations

- <strong>Gallery collection</strong> can Create, Read, Update, Delete
- <strong>Post collection</strong> can Create, Read, Update, Delete
- <strong>Messages collection</strong> can Create, Read, Delete
- <strong>Wishlist collection</strong> can Create, Read, Delete

        Logged in users

- can like news feed post
- can dislike news feed post
- can comment news feed post
- can like artist
- can add to wishlist
- can reate post/tattoo

      Logged in users(Author)

- can edit and delete post (and tattoo if is an artist)

      Guest users

- Access to basic website information without functionality

### Use React.js for client-side

### Communicate to a remote service via REST

- back4app backend service

### Implement authentication

- Login/Register user (create session on the server)
- Logout user (delete session from the server)

### Implement client-side routing to at least 5 pages( at least 2 with parameters)

      Routing

- /login, /register, /logout, /create-post, /wishlist, /booking, /my-posts, /my-portfolio, /my-messages, /create-tattoo, /news-feed, /artists, /gallery, \*(Not Found)

      Routing with parameters

  - /artists/:artistId, /gallery/details/:tattooId

  ### Meaningful commits on small steps at GitHub control system

---

## Other requirements

### Error handling

- showing error message on toast if error
- data validation before send data to the server

### The application should be divided into components

- Divided on components to make code readable and reusable
- Dumb components to reuse them in different parts of the app
- Smart components to make architecture more easy for development
- Use good folder structure to avoid techincal debt when the project is growing

### Demonstrate use of the following programming concepts, specific to the React library

React Hooks

- useRef,useActionState, useLocation, useState, useParams, useContext, useEffect, useNavigate

Custom Hooks

- useArtistPorfolio, useArtistSection, useAuthForm, useCommentModal, useCreateForm, sueDetailsTattooSection, useFetchData, useMyArtistId, usePostCard, useSearchBar, useTattooDetailsButtons

Context API

- useContext
- context

Stateless and stateful components

Bound Forms

- demonstrating bound forms
- demonstrating form action state as well

Synthetic events

- demonstrating synthetic events instead of DOM events to make sure React app is consistent and fast

Component lifecycle (mount, update, unmount)

- Unmounting components with clean up function and abort evenets if neccessary

### Route Guards for Private and Public users

### Good usabillity. GOOD UI and UX

- custom design
- using best practices
- responsive on different devices

## Bonuses

- Using back4app file storage to store photos
- Deployed app at <a href="https://host-tattoo.vercel.app" target="_blank" rel="noopener noreferrer">https://host-tattoo.vercel.app</a>

Bonuses not described in the assignment but has practical use:

- Search bar in Gallery for better UX
- Infinity pagination to load data at small parts
- Drag and Drop modal for comments in News Feed
- Responsive design
