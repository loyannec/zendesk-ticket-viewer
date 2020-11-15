# Inter Coding Challenge

![Inter%20Coding%20Challenge%208a236b63f43744c58bbfd3e3d478281d/zendesk-medium-black-1024x714.png](Inter%20Coding%20Challenge%208a236b63f43744c58bbfd3e3d478281d/zendesk-medium-black-1024x714.png)

## Zendesk Ticket Viewer

A simple interactive ticket viewer for the  [Zendesk](https://www.zendesk.com/) Ticket API. This web-application displays ticket information from a Zendesk account.

## About

Author: Loyanne Cristine da Costa Repolho
Server-side: Express.js (Node.js)
Front-end: Handlebars.js

## Installation

### Requirements

The application utilises the following technologies:

```
- NPM
- [Node.js](https://nodejs.org/)
- Express.js
- Handlebars.js
- SASS precompiler
```

### Process

Follow the following steps to run the application:

```
- Place the application folder in the desired directory.

- Execute npm install to install any outstanding technologies that are required by the application.

- Execute npm start in the base application folder to start the server.

- Access the running server by navigating to localhost:3000 in a browser.

```

## Usage

The workflow of the viewer is as follows:

```
- User authenticates API login details that are to be used to access the API

- On successful authentication, user proceeds to the ticket overview and requests tickets from the server
- The user will be delivered a list of their current tickets, displayed in pages of 100 tickets. The may be navigated with the arrow buttons at the top of the list.

- More details can be displayed for a ticket by clicking on either the ticket's ID or subject. This will take the user into the detailed view, where they can see more details of the ticket and return to the overview.

- If users desire to log into a different account, they can return to the login page by clicking on the link in the navigation bar at the top of the page. Once on the login page, they can log out and begin the workflow again.

```

## Testing

Tests are included to test the front-end and server-side functionality.

The front-end functionality may be tested on designated test views. These are accessible as follows:

```
- User Authentication Testing: localhost:3000/#/loginTest

- Ticket testing: localhost:3000/#/ticketsTest

```

The server-side functionality may be tested by using the bash scripts included in ~/tests . These are used as follows to test the interaction between the server and the zendesk API:

```
- User Authentication Testing: execute test_users.sh in the terminal. You may pass the username, password, and account-name as parameters. If they are not passed as parameters, the script will prompt you for them.

- Ticket Testing: execute test_tickets.sh in the terminal. You may pass the username, password, and account-name as parameters. If they are not passed as parameters, the script will prompt you for them.
```

# zendesk-ticket-viewer

An interactive command line application that connects to the [Zendesk](https://www.zendesk.com/) API and displays ticket information from a Zendesk account.

## Installation instructions

1. Clone this repository.
2. cd into the root directory of this repo.
3. Run `npm install`. (You need [Node.js](https://nodejs.org/), which includes npm, to do this and to run the app)

## Usage

Run with `node index.js` or with `npm start`.

Input **0** to edit your API details.

```
    url: <your Zendesk url>
  email: <your email>
  token: <your API token>

```

These values are saved in a file, so you don't need to reenter them every time you run the app.

Input **1** followed by ticket id to display information about one ticket.

Input **2** to display information about all tickets.

Stop the app by ending input (e.g. with `^C`).

### Example

```
$ node index.js
---------------------------------------------------------
Welcome to the Zendesk Ticket Viewer

Please enter one of the following commands:
    0     Edit the config
    1     Display a single ticket
    2     Display all tickets
    3     Display last created ticket
    4     Display tickets where subject contains query
    5     Create a new ticket with subject and description
    help  Display this message
---------------------------------------------------------
> 1 6
Searching for ticket with id 6...
---------------------------------------------------------
Ticket #6
    Subject: Why isn't it working?
Description: We're working on that.
 Updated at: 2017-11-23T04:51:50Z
---------------------------------------------------------
>

```