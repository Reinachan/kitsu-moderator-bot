import gql from 'graphql-tag';
export const User = gql`
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
export const Media = gql`
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
export const Report = gql`
  fragment Report on Report {
    createdAt
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
        post {
          id
        }
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
        reaction
        media {
          ...Media
        }
      }
      ... on Review {
        id
        author {
          ...User
        }
        reviewContent: content
        media {
          ...Media
        }
      }
    }
  }
  ${User}
  ${Media}
`;
export const ReportPartial = gql`
  fragment ReportPartial on Report {
    createdAt
    id
    status
    moderator {
      ...User
    }
  }
  ${User}
`;
export const GqlReports = gql`
  query Reports($first: Int!) {
    reports(first: $first) {
      nodes {
        ...Report
      }
    }
  }
  ${Report}
`;
export const GqlReportsPartial = gql`
  query ReportsPartial($first: Int!) {
    reports(first: $first) {
      nodes {
        createdAt
        id
        status
        moderator {
          ...User
        }
      }
    }
  }
  ${User}
`;
export const GqlTest = gql`
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
