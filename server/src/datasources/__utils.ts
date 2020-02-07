// encodeCursor and decodeCursor code borrowed from https://github.com/kirkbrauer/typeorm-graphql-pagination by Kirk Brauer.

import { encode, decode } from "opaqueid";

/**
 * A cursor object.
 */
export interface Cursor {
  /**
   * The ID of the entity.
   */
  id: string;
  /**
   * The entity type.
   */
  type: string;
  /**
   * The entity index in the results.
   */
  index: number;
}

/**
 * The invalid cursor error.
 */
export class InvalidCursorError extends Error {
  /**
   * Constructs a new InvalidCursorError.
   */
  constructor() {
    super();
    this.name = "Invalid Cursor Error";
    this.message = "Invalid cursor";
  }
}

/**
 * The invalid cursor type error.
 */
export class InvalidCursorTypeError extends Error {
  /**
   * The expected cursor type.
   */
  private expectedType: string;

  /**
   * The actual cursor type.
   */
  private actualType: string;

  /**
   * Constructs a new InvalidCursorTypeError
   * @param expectedType The expected cursor type.
   * @param actualType The actual cursor type.
   */
  constructor(expectedType: string, actualType: string) {
    super();
    this.name = "Invalid Cursor Type Error";
    this.expectedType = expectedType;
    this.actualType = actualType;
    this.message = `Invalid cursor, expected type ${expectedType}, but got type ${actualType}`;
  }
}

/**
 * Encodes a pagination cursor.
 * @param id The entity ID.
 * @param type The entity type.
 * @param index The entity index in the results.
 */
export function encodeCursor(id: string, type: string, index: number): string {
  return encode(`C|${type}|${id}|${index}`);
}

/**
 * Decodes a pagination cursor.
 * @param cursor The cursor to decode.
 * @param type The entity type.
 */
export function decodeCursor(cursor: string, type: string): Cursor {
  // Split the cursor
  const split: any[] = decode(cursor).split("|");
  // Verify that it is a valid cursor
  if (split[0] !== "C") throw new InvalidCursorError();
  // Throw an error if the cursor type is incorrect
  if (split[1] !== type) throw new InvalidCursorTypeError(type, split[1]);
  // Return the cursor data
  return {
    id: split[2],
    type: split[1],
    index: split[3] * 1
  };
}
