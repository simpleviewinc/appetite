# Overview

A node-js wrapper around the appetize api

## Example
```js
const { upsert } = require('@keg-hub/appetite')

// searches for an app build whose "note" is a json string with a "branch"
// field mapped to a value of "my-branch". If that build is found, it updates it 
// with the new build located at the url. Otherwise, it uploads a new app build.
const response = await upsert({
  noteFields: {
    branch: 'my-branch',
  },
  url: 'some.url.to.simulator.build.com'
  platform: 'ios',
  token: '123456',
  disabled: true
})
```

## Usage

### Install
`yarn add @keg-hub/appetite`

### Upload
```js
const { upload } = require('@keg-hub/appetite')

// set either url or filePath, not both
const response = await upload({
  url: <url to your simulator build>
  filePath: <system file path to your simulator build>,
  platform: <ios or android>,
  token: <your appetize developer token>
  ....rest: <any other fields to include in the post form>
})
```

### Update
```js
const { update } = require('@keg-hub/appetite')

// set either url or filePath, not both
const response = await update({
  publicKey: <public key of app build to update>,
  url: <url to your simulator build>
  filePath: <system file path to your simulator build>,
  platform: <ios or android>,
  token: <your appetize developer token>
  ....rest: <any other fields to include in the post form>
})
```

### Upsert
```js
const { upsert } = require('@keg-hub/appetite')

// set either url or filePath, not both
const response = await upsert({
  note: 'note field of an existing app build; if found, this will update that app build',
  noteFields: 'note fields of an existing app build; if matched, this will update that app build. Assumes the note is in json format.',
  url: <url to your simulator build>
  filePath: <system file path to your simulator build>,
  platform: <ios or android>,
  token: <your appetize developer token>
  ....rest: <any other fields to include in the post form>
})
```

### Find
```js
const { find } = require('@keg-hub/appetite')

// set either url or filePath, not both
const response = await find({
  note: 'note field of an existing app build to search by',
  noteFields: 'note fields of an existing app build to search by',
  platform: <ios or android>,
  token: <your appetize developer token>
})
```

### Get
```js
const { get } = require('@keg-hub/appetite')

// set either url or filePath, not both
const response = await get({
  publicKey: <public key of app build to get>,
  token: <your appetize developer token>
})
```

### Remove
```js
const { remove } = require('@keg-hub/appetite')

// set either url or filePath, not both
const response = await remove({
  publicKey: <public key of app build to delete>,
  token: <your appetize developer token>
})
```

## Testing
* Unit: `yarn test` 
* Functional: `yarn test:e2e`
  * this test will require you to create a `.env.` file in the repo's root directory
  * see the `example.env` file for the expected variables to put in your `.env`
  * this will test creating, finding, updating, and deleting a single app using your Appetize account, live