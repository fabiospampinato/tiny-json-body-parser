
/* IMPORT */

import {isPrimitive, isString} from 'is';
import type {Options, Request, Response, Next} from './types';

/* MAIN */

const json = ( options?: Options ) => {

  const limit = options?.limit ?? Infinity;

  const setBody = ( req: Request, body: unknown ): void => {

    req.body = isPrimitive ( body ) ? {} : body;

  };

  return async ( req: Request, res: Response, next: Next ): Promise<void> => {

    const {headers, method} = req;

    if ( method !== 'POST' && method !== 'PUT' && method !== 'PATCH' ) return next ();

    const type = headers['content-type'];

    if ( !isString ( type ) || !type.includes ( 'application/json' ) ) return next ();

    try {

      let body = '';

      for await ( const chunk of req ) {

        body += chunk;

        if ( body.length > limit ) return res.sendStatus ( 413 );

      }

      setBody ( req, JSON.parse ( body ) );

      next ();

    } catch ( error: unknown ) {

      setBody ( req, {} );

      next ( error );

    }

  }

};

/* EXPORT */

export default json;
