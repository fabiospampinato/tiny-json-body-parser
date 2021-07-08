# Tiny JSON Body Parser

A tiny middleware that parses JSON request bodies.

## Install

```sh
npm install --save tiny-json-body-parser
```

## Usage

```ts
import express from 'express';
import json from 'tiny-json-body-parser';

const app = express ();

app.use ( json ({ limit: 1_000_000 }) ); // 1MB limit

app.post ( '/', req => {

  console.log ( req.body ); // The result of JSON.parse-ing the body

});
```

## License

MIT © Fabio Spampinato
