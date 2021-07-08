
/* IMPORT */

import * as isPrimitive from 'is-primitive';
import {Options} from './types';

/* MAIN */

const json = ( options?: Options ) => {

  const limit = options?.limit ?? Infinity;

  const setBody = ( req, body ): void => {

    req.body = isPrimitive ( body ) ? {} : body;

  };

  return async ( req, res, next: ( error?: Error ) => void ): Promise<void> => {

    const {method} = req;

    if ( method !== 'POST' && method !== 'PUT' && method !== 'PATCH' ) return next ();

    const type = req.headers['content-type'];

    if ( typeof type !== 'string' || !type.includes ( 'application/json' ) ) return next ();

    try {

      let body = '';

      for await ( const chunk of req ) {

        body += chunk;

        if ( body.length > limit ) return res.sendStatus ( 413 );

      }

      setBody ( req, JSON.parse ( body ) );

      next ();

    } catch ( error ) {

      setBody ( req, {} );

      next ( error );

    }

  }

};

/* EXPORT */

export default json;
