import { join } from 'path';
import { GraphQLRuleTester, rules } from '../src';

const ruleTester = new GraphQLRuleTester();

ruleTester.runGraphQLTests('known-fragment-names', rules['known-fragment-names'], {
  valid: [
    {
      filename: join(__dirname, 'mocks/user.graphql'),
      code: ruleTester.fromMockFile('user.graphql'),
      parserOptions: {
        schema: join(__dirname, 'mocks/user-schema.graphql'),
        operations: join(__dirname, 'mocks/user-fields-with-variables.gql'),
      },
    },
    {
      filename: join(__dirname, 'mocks/known-fragment-names.ts/1_document.graphql'),
      code: /* GraphQL */ `
        query User {
          user {
            ...UserFields
          }
        }
      `,
      parserOptions: {
        schema: join(__dirname, 'mocks/user-schema.graphql'),
        operations: join(__dirname, 'mocks/known-fragment-names.ts'),
      },
    },
    {
      name: 'should import all fragments inside fragments',
      filename: join(__dirname, 'mocks/known-fragment-names/user.gql'),
      code: ruleTester.fromMockFile('known-fragment-names/user.gql'),
      parserOptions: {
        schema: join(__dirname, 'mocks/user-schema.graphql'),
        operations: [
          join(__dirname, 'mocks/known-fragment-names/user.gql'),
          join(__dirname, 'mocks/known-fragment-names/user-fields.gql'),
        ],
      },
    },
    {
      name: 'should work when interface implemented',
      code: /* GraphQL */ `
        fragment Introduction on Introduction {
          introText {
            ...ContentUnit
          }
        }
      `,
      parserOptions: {
        schema: /* GraphQL */ `
          interface ContentUnit {
            contentSets: Int
          }

          type IntroText implements ContentUnit {
            contentSets: Int
          }

          type Introduction {
            introText: IntroText
          }

          type Query {
            foo: Int
          }
        `,
        operations: /* GraphQL */ `
          fragment ContentUnit on ContentUnit {
            contentSets {
              id
            }
          }
        `,
      },
    },
    {
      name: 'should work when with union',
      code: /* GraphQL */ `
        query {
          animal {
            ...AnimalFields
          }
        }
      `,
      parserOptions: {
        schema: /* GraphQL */ `
          type Cat {
            name: String
          }

          type Dog {
            age: String
          }

          union AnimalUnion = Cat | Dog

          type Animal {
            animal: AnimalUnion
          }

          type Query {
            animal: Animal
          }
        `,
        operations: /* GraphQL */ `
          fragment CatFields on Cat {
            title
          }

          fragment DogFields on Dog {
            url
          }

          fragment AnimalFields on AnimalUnion {
            animal {
              ...CatFields
              ...DogFields
            }
          }
        `,
      },
    },
  ],
  invalid: [
    {
      name: 'should not throw an error on undefined fragment',
      filename: join(__dirname, 'mocks/known-fragment-names/operation-with-undefined-fragment.gql'),
      code: ruleTester.fromMockFile('known-fragment-names/operation-with-undefined-fragment.gql'),
      parserOptions: {
        schema: join(__dirname, 'mocks/user-schema.graphql'),
        operations: join(__dirname, 'mocks/known-fragment-names/operation-with-undefined-fragment.gql'),
      },
      errors: [{ message: 'Unknown fragment "DoesNotExist".' }],
    },
  ],
});
