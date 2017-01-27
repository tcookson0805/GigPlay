# [GigPlay](https://gigplay.herokuapp.com/)

GigPlay is an app that informs its users of upcoming concerts for the bands they already love listening to.

# Overview

People love music. People love concerts. People especially love concerts featuring bands playing the music that they love. That is where GigPlay comes in. GigPlay takes the songs that people save in their Spotify Account and then uses TicketMaster's API to provide a list of all upcoming concerts for the bands that play those songs.

# Technical

The front-end is built using React Redux and styled with Boostrap, while the Back-end is built on NodeJS using an Express webserver and Firestack as the database.

# UX

User is is first directed to login in with Spotify. By doing so they will be directed to Spotify to enter their account email and password for authentication. After authentication, User is taken to their homepage. The homepage contains a list of all the artists that play the songs they have saved to the Spotify account, a list of all upcoming concerts by those artists, and a map with markers denoting the concert locations. By clicking on an artist name, the User is able to filter the concert and map results.  

# Development Roadmap

Future enhancements

* continue to make UI enhancements

* add search feature
	* search for new artists
	* search for concerts
		* by location
		* by time frame

* allow artist list manipulation
	* add artists
	* remove artists

* improve map feature
	* implement cluster/heat mapping feature

* allow users to share concert information
    * with other users directly
    * on social media feeds