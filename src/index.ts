
/* IMPORT */

import {Options} from './types';

/* MAIN */

const json = ( options?: Options ) => {

  const limit = options?.limit ?? Infinity;

  return async ( req, res, next: ( error?: Error ) => void ): Promise<void> => {

    const {method} = req;

    if ( method !== 'POST' && method !== 'PUT' && method !== 'PATCH' ) return next ();

    try {

      let body = '';

      for await ( const chunk of req ) {

        body += chunk;

        if ( body.length > limit ) return res.sendStatus ( 413 );

      }

      req.body = JSON.parse ( body );

      next ();

    } catch ( error ) {

      next ( error );

    }

  }

};

/* EXPORT */

export default json;
