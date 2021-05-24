# Overview

A node-js wrapper around the appetize api

## Example
```js
const { upsert } = require('@keg-hub/appetite')

// Updates an existing build if one is found, otherwise uploads a new one
const response = await upsert({
  // appetize api token
  token: '123456',

  // upload or update a build using these parameters
  payload: {
    url: 'some.url.to.simulator.build.com'
    platform: 'ios',
    metadata: {
      branch: 'my-branch',
    },
    disabled: true,
  },

  // searches for a build where platform=ios and note='{"branch":"my-branch"}'
  search: {
    platform: 'ios',
    metadata: {
      branch: 'my-branch',
    }
  }
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
  token: <your appetize api token>
  note: <note field>,
  metadata: <object to be stringified for the note field, unless "note" param was defined>,
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
  token: <your appetize api token>
  note: <note field>,
  metadata: <object to be stringified for the note field, unless "note" param was defined>,
  ....rest: <any other fields to include in the post form>
})
```

### Upsert
```js
const { upsert } = require('@keg-hub/appetite')

// set either url or filePath, not both
const response = await upsert({
  token: <your appetize api token>,
  search: <fields to search for existing builds. Same as `search`>
  payload: <fields used for uploading/updating a build. Same params as `upload`>
})
```

### Search
```js
const { search } = require('@keg-hub/appetite')

// searches for all builds matching the parameters
const builds = await search({
  note: <note field of an existing app build to search by>,
  metadata: <note fields of an existing app build to search by>,
  platform: <ios or android>,
  token: <your appetize api token>
})
```

### Get
```js
const { get } = require('@keg-hub/appetite')

// set either url or filePath, not both
const response = await get({
  publicKey: <public key of app build to get>,
  token: <your appetize api token>
})
```

### Remove
```js
const { remove } = require('@keg-hub/appetite')

// set either url or filePath, not both
const response = await remove({
  publicKey: <public key of app build to delete>,
  token: <your appetize api token>
})
```

## Notes
* Methods like `search` accept an optional `metadata` parameter
* If this parameter is included, it will treat the "note" field as a json object string
* For example, `search` will look for an existing build whose "note" value is a json object string containing the fields included in `metadata`
* `upload` and `update` will stringify the `metadata` object and set that as the value of the "note" field in the uploaded/updated build

## Testing
* Unit: `yarn test` 
* Functional: `yarn test:e2e`
  * this test will require you to set some ENVS 
    * it's easiest to create a `.env` file in the repo's root directory
    * see the `example.env` file for the expected variables to put there
  * this will test creating, searching, updating, and deleting a single app using your Appetize account, live