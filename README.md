# Inter Coding Challenge

Zendesk is a customer service tool that allows the creation and management of support tickets.

<img align="center" src="https://github.com/loyannec/zendesk-ticket-viewer/blob/master/zendesk-logo.png" width="200" >

## Zendesk Ticket Viewer

A simple interactive ticket viewer for the [Zendesk](https://www.zendesk.com/) Ticket API using the TDD method for development. This web-application displays ticket information from a Zendesk account that will:

- Connect to the Zendesk API
- Request all the tickets for your account
- Display them in a list
- Display individual ticket details
- Page through tickets when more than 25 are returned

## About

Author: Loyanne Cristine da Costa Repolho

Server-side: Express.js (Node.js)

Front-end: Handlebars.js

## Installation

### Requirements

The application utilises the following technologies:

```
- NPM
- Node.js
- Express.js
- Javascript
- Handlebars.js
- CSS
```

### Process

Follow the following steps to run the application:

1. Clone this repository.
2. `$ cd` into the root directory of this repo.
3. Run `npm install` to install any outstanding technologies that are required by the application. (You need [Node.js](https://nodejs.org/), which includes `npm`, to do this and to run the app).
4. Execute `npm run watch` in the base application folder to start the server.
5. Access the running server by navigating to `localhost:3000` in a browser.

## Usage

You will need to edit your API details for `subdomain`, `email` , `token` found in the `app.js` file.

```
subdomain: <your Zendesk url>
email: <your email>
token: <your API token>
```

These values are saved in a file, so you don't need to reenter them every time you run the app.

The workflow of the viewer is as follows:

```
- User authenticates API login details that are to be used to access the API

- On successful authentication, the user proceeds to the ticket overview and requests tickets from the server

- The user will be delivered a list of their current tickets, displayed on a page with the first 25 tickets.

- New 25 tickets will be loaded as you browse the page (scroll) until you reach the end of the ticket list.

- More details can be displayed for a ticket by clicking on either the ticket's ID or subject.
  This will take the user into a detailed view, where they can see more details of the ticket and return to the overview.

- To hide the ticket, it is necessary to click again on the ID or subject.
```

## Testing

Tests are included to test the front-end and server-side functionality.

The functionalities may be tested on designated test views. These are accessible as follows:

- Run `npm test` to view test coverage.

The application has been tested and currently has 100% coverage.

## Static server with Livereload

The application embed for development a static connect server with livereload plugged. So each time you start the app, you get automatic refresh in the browser whenever you update a file.

## **Example**

<img align="center" src="https://github.com/loyannec/zendesk-ticket-viewer/blob/master/apresentation.gif" >

## License

This application script is released under the [MIT license](https://opensource.org/licenses/MIT).
