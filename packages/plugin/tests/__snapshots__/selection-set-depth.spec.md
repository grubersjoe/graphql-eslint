// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Invalid #1 1`] = `
#### ⌨️ Code

      1 |         query deep2 {
      2 |           viewer {
      3 |             albums {
      4 |               title
      5 |             }
      6 |           }
      7 |         }

#### ⚙️ Options

    {
      "maxDepth": 1
    }

#### ❌ Error

      3 |             albums {
    > 4 |               title
        |               ^ 'deep2' exceeds maximum operation depth of 1
      5 |             }

#### 💡 Suggestion: Remove selections

    1 |         query deep2 {
    2 |           viewer {
    3 |             
    4 |           }
    5 |         }
`;

exports[`Invalid #2 1`] = `
#### ⌨️ Code

      1 |         query deep2 {
      2 |           viewer {
      3 |             albums {
      4 |               ...AlbumFields
      5 |             }
      6 |           }
      7 |         }

#### ⚙️ Options

    {
      "maxDepth": 1
    }

#### ❌ Error

      3 |             albums {
    > 4 |               ...AlbumFields
        |               ^ 'deep2' exceeds maximum operation depth of 1
      5 |             }

#### 💡 Suggestion: Remove selections

    1 |         query deep2 {
    2 |           viewer {
    3 |             
    4 |           }
    5 |         }
`;

exports[`suggestions should work with inline fragments 1`] = `
#### ⌨️ Code

      1 |         query {
      2 |           viewer {
      3 |             albums {
      4 |               ... on Album {
      5 |                 id
      6 |               }
      7 |             }
      8 |           }
      9 |         }

#### ⚙️ Options

    {
      "maxDepth": 1
    }

#### ❌ Error

      3 |             albums {
    > 4 |               ... on Album {
        |               ^ '' exceeds maximum operation depth of 1
      5 |                 id

#### 💡 Suggestion: Remove selections

    1 |         query {
    2 |           viewer {
    3 |             
    4 |           }
    5 |         }
`;
