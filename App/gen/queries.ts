import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export const MediaFragmentDoc = gql`
    fragment Media on Media {
  titles {
    canonical
  }
  posterImage {
    original {
      url
    }
  }
}
    `;
export const UserFragmentDoc = gql`
    fragment User on Profile {
  id
  name
  slug
  url
  avatarImage {
    original {
      url
    }
  }
}
    `;
export const ReportsDocument = gql`
    query Reports($first: Int!) {
  reports(first: $first) {
    nodes {
      id
      explanation
      reason
      status
      updatedAt
      reporter {
        ...User
      }
      moderator {
        ...User
      }
      naughty {
        __typename
        ... on Comment {
          id
          author {
            ...User
          }
          content
        }
        ... on Post {
          id
          author {
            ...User
          }
          content
          postMedia: media {
            ...Media
          }
        }
        ... on MediaReaction {
          id
          author {
            ...User
          }
          content: reaction
          media {
            ...Media
          }
        }
      }
    }
  }
}
    ${UserFragmentDoc}
${MediaFragmentDoc}`;
export const TestDocument = gql`
    query Test {
  anime(first: 10) {
    nodes {
      titles {
        canonical
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Reports(variables: ReportsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ReportsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ReportsQuery>(ReportsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Reports');
    },
    Test(variables?: TestQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TestQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TestQuery>(TestDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Test');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;