# Email functions for lockit

work in progress - come back later

## Installation

`npm install ...`

```js
var adapter = require('....');
```

## What's included

 - responsive email template (created by [mailchimp](https://github.com/mailchimp/Email-Blueprints))
 - inline css styles for proper formatting even in GMail and Outlook (CSS inlined with [juice](https://github.com/LearnBoost/juice))
 - html email templates for verify email address, email taken, forgot password and resend verification
 - works with the same configuration as [nodemailer](https://github.com/andris9/Nodemailer)

## Methods

### Verify email address

After user has signed up an email is sent to his email address.
A unique token is included within a link pointing back to our app.
When the user clicks on this link we know that the given email address exists und belongs to the right user.

`sendmail.emailVerification(username, email, token, callback)`

 - `username`: String - i.e. 'john' - used in the email body
 - `mail`: String - i.e. 'john@email.com' - recipient email address
 - `token`: String - i.e. 'abc123' - secret token for email address verification
 - `callback`: Function - callback(err, message) - callback function when email was sent

```js
var sendmail = require('sendmail');

sendmail.emailVerification('john', 'john@email', 'abc123', function(err, message) {
  if (err) console.log(err);
  // ...
});
```

You can configure the email's content through your `config.js`. Just modify the `emailSignup` object.
Here is a sample setup.

```js
exports.emailSignup = {
  subject: 'Welcome to <%- appname %>',
  title: 'Welcome to <%- appname %>',
  text: [
    '<h2>Hello <%- username %></h2>',
    'This is awesome',
    '<p>You should come and see this</p>',
    '<%- link %> to finish registration'
  ].join(''),
  linkText: 'Click here'
};
```

 - `subject` - the email's subject
 - `title` - the title of the html email. Doesn't have to be the same as `subject`
 - `text` - the email's body
 - `linkText` - the text of the link, which points back to our app

### Email taken when duplicate email address signs up

When a user tries to sign up with an email address that already exists we send a hint to the right owner to indicate
this happening. Never expose to a user whether an email address exists or not.

`sendmail.emailTaken(username, email, callback)`

 - `username`: String - i.e. 'john' - used in the email body
 - `email`: String - i.e. `john@email.com` - recipient email address
 - `callback`: String - callback(err, message) - callback function when email was sent

```js
var sendmail = require('sendmail');

sendmail.emailTaken('john', 'john@email', function(err, message) {
  if (err) console.log(err);
  // ...
});
```

You can configure the email's content through your `config.js`. Just modify the `emailSignupTaken` object.
Here is a sample setup.

```js
exports.emailSignupTaken = {
  subject: 'Email already registered',
  title: 'Email already registered',
  text: [
    '<h2>Hello</h2>',
    'you or someone else tried to sign up for <%- appname %>.',
    'Your email is already registered and you cannot sign up twice.',
    'If you haven\'t tried to sign up, please ignore this email. Everything is fine.',
    '<p>The <%- appname %> Team</p>'
  ].join('')
};
```

 - `subject` - the email's subject
 - `title` - the title of the html email. Doesn't have to be the same as `subject`
 - `text` - the email's body

### Send email address verification link again

A user signed up but lost or didn't receive the email containing the link for his email address verification.
Therefore he should be able to send the link again, with a different verification token.

`sendmail.resendVerification(username, email, token, callback)`

 - `username`: String - i.e. 'john' - used in the email body
 - `email`: String - i.e. 'john@email.com' - recipient email address
 - `token`: String - i.e. 'cde456' - secret token for email verification
 - `callback`: Function - callback(err, message) - callback function when email was sent

```js
var sendmail = require('sendmail');

sendmail.resendVerification('john', 'john@email', 'cde456', function(err, message) {
  if (err) console.log(err);
  // ...
});
```

## Setup

... config files

## Test

`grunt`

## License

Copyright (C) 2013 [Mirco Zeiss](mailto: mirco.zeiss@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.