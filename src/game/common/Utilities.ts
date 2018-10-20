// #region math

// #region random numbers

/**
 * Returns a random integer within the inclusive range specified by the arguments.
 * @param min inclusive - lowest integer to generate.
 * @param max inclusive - highest integer to generate.
 */
function getInt_FromInclusiveRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const Random = { getInt_FromInclusiveRange };

// #endregion random numbers

// #endregion math
