# Overview

A node-js wrapper around the appetize api

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
})
```

## Testing
* Unit: `yarn test` 
* Functional: `yarn apt:test`
  * this test will require you to create a `.env.` file in the repo's root directory
  * see the `example.env` file for the expected variables to put in your `.env`