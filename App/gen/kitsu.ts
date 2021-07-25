import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date, expressed as an ISO8601 string */
  Date: any;
  /** An ISO 8601-encoded date */
  ISO8601Date: any;
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: any;
  /** Represents untyped JSON */
  JSON: any;
  /** A loose key-value map in GraphQL */
  Map: any;
  Upload: any;
};

/** A user account on Kitsu */
export type Account = WithTimestamps & {
  __typename?: 'Account';
  /** The country this user resides in */
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISO8601DateTime'];
  /** The email addresses associated with this account */
  email: Array<Scalars['String']>;
  /** Facebook account linked to the account */
  facebookId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Primary language for the account */
  language?: Maybe<Scalars['String']>;
  /** Longest period an account has had a PRO subscription for in seconds */
  maxProStreak?: Maybe<Scalars['Int']>;
  /** The PRO subscription for this account */
  proSubscription?: Maybe<ProSubscription>;
  /** The profile for this account */
  profile: Profile;
  /** Media rating system used for the account */
  ratingSystem: RatingSystemEnum;
  /** Whether Not Safe For Work content is accessible */
  sfwFilter?: Maybe<Scalars['Boolean']>;
  /** The site-wide permissions this user has access to */
  sitePermissions: Array<SitePermissionEnum>;
  /** Time zone of the account */
  timeZone?: Maybe<Scalars['String']>;
  /** Preferred language for media titles */
  titleLanguagePreference?: Maybe<TitleLanguagePreferenceEnum>;
  /** Twitter account linked to the account */
  twitterId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['ISO8601DateTime'];
};

export enum AgeRatingEnum {
  /** Acceptable for all ages */
  G = 'G',
  /** Parental guidance suggested; should be safe for preteens and older */
  Pg = 'PG',
  /** Possible lewd or intense themes; should be safe for teens and older */
  R = 'R',
  /** Contains adult content or themes; should only be viewed by adults */
  R18 = 'R18'
}

/** Generic Amount Consumed based on Media */
export type AmountConsumed = {
  /** Total media completed atleast once. */
  completed: Scalars['Int'];
  id: Scalars['ID'];
  /** Total amount of media. */
  media: Scalars['Int'];
  /** The profile related to the user for this stat. */
  profile: Profile;
  /** Last time we fully recalculated this stat. */
  recalculatedAt: Scalars['ISO8601Date'];
  /** Total progress of library including reconsuming. */
  units: Scalars['Int'];
};

export type Anime = Media & Episodic & WithTimestamps & {
  __typename?: 'Anime';
  /** The recommended minimum age group for this media */
  ageRating?: Maybe<AgeRatingEnum>;
  /** An explanation of why this received the age rating it did */
  ageRatingGuide?: Maybe<Scalars['String']>;
  /** The average rating of this media amongst all Kitsu users */
  averageRating?: Maybe<Scalars['Float']>;
  /** A large banner image for this media */
  bannerImage: Image;
  /** A list of categories for this media */
  categories: CategoryConnection;
  /** The characters who starred in this media */
  characters: MediaCharacterConnection;
  createdAt: Scalars['ISO8601DateTime'];
  /** A brief (mostly spoiler free) summary or description of the media. */
  description: Scalars['Map'];
  /** the day that this media made its final release */
  endDate?: Maybe<Scalars['Date']>;
  /** The number of episodes in this series */
  episodeCount?: Maybe<Scalars['Int']>;
  /** The general length (in seconds) of each episode */
  episodeLength?: Maybe<Scalars['Int']>;
  /** Episodes for this media */
  episodes: EpisodeConnection;
  /** The number of users with this in their favorites */
  favoritesCount?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  /** A list of mappings for this media */
  mappings: MappingConnection;
  /** A list of your wiki submissions for this media */
  myWikiSubmissions: WikiSubmissionConnection;
  /** The time of the next release of this media */
  nextRelease?: Maybe<Scalars['ISO8601DateTime']>;
  /** The country in which the media was primarily produced */
  originalLocale?: Maybe<Scalars['String']>;
  /** The poster image of this media */
  posterImage: Image;
  /** The companies which helped to produce this media */
  productions: MediaProductionConnection;
  /** A list of quotes from this media */
  quotes: QuoteConnection;
  /** A list of reactions for this media */
  reactions: MediaReactionConnection;
  /** The season this was released in */
  season?: Maybe<ReleaseSeasonEnum>;
  /** Whether the media is Safe-for-Work */
  sfw: Scalars['Boolean'];
  /** The URL-friendly identifier of this media */
  slug: Scalars['String'];
  /** The staff members who worked on this media */
  staff: MediaStaffConnection;
  /** The day that this media first released */
  startDate?: Maybe<Scalars['Date']>;
  /** The current releasing status of this media */
  status: ReleaseStatusEnum;
  /** The stream links. */
  streamingLinks: StreamingLinkConnection;
  /** A secondary type for categorizing Anime. */
  subtype: AnimeSubtypeEnum;
  /** Description of when this media is expected to release */
  tba?: Maybe<Scalars['String']>;
  /** The titles for this media in various locales */
  titles: TitlesList;
  /** The total length (in seconds) of the entire series */
  totalLength?: Maybe<Scalars['Int']>;
  /** Anime or Manga. */
  type: Scalars['String'];
  updatedAt: Scalars['ISO8601DateTime'];
  /** The number of users with this in their library */
  userCount?: Maybe<Scalars['Int']>;
  /** Video id for a trailer on YouTube */
  youtubeTrailerVideoId?: Maybe<Scalars['String']>;
};


export type AnimeCategoriesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type AnimeCharactersArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type AnimeDescriptionArgs = {
  locales?: Maybe<Array<Scalars['String']>>;
};


export type AnimeEpisodesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  number?: Maybe<Array<Scalars['Int']>>;
};


export type AnimeMappingsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type AnimeMyWikiSubmissionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Maybe<WikiSubmissionSortOption>>>;
};


export type AnimeProductionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type AnimeQuotesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type AnimeReactionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type AnimeStaffArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type AnimeStreamingLinksArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type AnimeAmountConsumed = AmountConsumed & {
  __typename?: 'AnimeAmountConsumed';
  /** Total media completed atleast once. */
  completed: Scalars['Int'];
  id: Scalars['ID'];
  /** Total amount of media. */
  media: Scalars['Int'];
  /** The profile related to the user for this stat. */
  profile: Profile;
  /** Last time we fully recalculated this stat. */
  recalculatedAt: Scalars['ISO8601Date'];
  /** Total time spent in minutes. */
  time: Scalars['Int'];
  /** Total progress of library including reconsuming. */
  units: Scalars['Int'];
};

export type AnimeCategoryBreakdown = CategoryBreakdown & {
  __typename?: 'AnimeCategoryBreakdown';
  /** A Map of category_id -> count for all categories present on the library entries */
  categories: Scalars['Map'];
  id: Scalars['ID'];
  /** The profile related to the user for this stat. */
  profile: Profile;
  /** Last time we fully recalculated this stat. */
  recalculatedAt: Scalars['ISO8601Date'];
  /** The total amount of library entries. */
  total: Scalars['Int'];
};

/** The connection type for Anime. */
export type AnimeConnection = {
  __typename?: 'AnimeConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<AnimeEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Anime>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total amount of nodes. */
  totalCount: Scalars['Int'];
};

export type AnimeCreateInput = {
  titles: TitlesListInput;
  description: Scalars['Map'];
  ageRating?: Maybe<AgeRatingEnum>;
  ageRatingGuide?: Maybe<Scalars['String']>;
  tba?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['Date']>;
  endDate?: Maybe<Scalars['Date']>;
  posterImage?: Maybe<Scalars['Upload']>;
  bannerImage?: Maybe<Scalars['Upload']>;
  youtubeTrailerVideoId?: Maybe<Scalars['String']>;
  episodeCount?: Maybe<Scalars['Int']>;
  episodeLength?: Maybe<Scalars['Int']>;
};

/** Autogenerated return type of AnimeCreate */
export type AnimeCreatePayload = {
  __typename?: 'AnimeCreatePayload';
  anime?: Maybe<Anime>;
  errors?: Maybe<Array<Error>>;
};

/** Autogenerated return type of AnimeDelete */
export type AnimeDeletePayload = {
  __typename?: 'AnimeDeletePayload';
  anime?: Maybe<GenericDelete>;
  errors?: Maybe<Array<Error>>;
};

/** An edge in a connection. */
export type AnimeEdge = {
  __typename?: 'AnimeEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Anime>;
};

export type AnimeMutations = {
  __typename?: 'AnimeMutations';
  /** Create an Anime. */
  create?: Maybe<AnimeCreatePayload>;
  /** Delete an Anime. */
  delete?: Maybe<AnimeDeletePayload>;
  /** Update an Anime. */
  update?: Maybe<AnimeUpdatePayload>;
};


export type AnimeMutationsCreateArgs = {
  input: AnimeCreateInput;
};


export type AnimeMutationsDeleteArgs = {
  input: GenericDeleteInput;
};


export type AnimeMutationsUpdateArgs = {
  input: AnimeUpdateInput;
};

export enum AnimeSubtypeEnum {
  Tv = 'TV',
  /** Spinoffs or Extras of the original. */
  Special = 'SPECIAL',
  /** Original Video Animation. Anime directly released to video market. */
  Ova = 'OVA',
  /** Original Net Animation (Web Anime). */
  Ona = 'ONA',
  Movie = 'MOVIE',
  Music = 'MUSIC'
}

export type AnimeUpdateInput = {
  id: Scalars['ID'];
  titles?: Maybe<TitlesListInput>;
  description?: Maybe<Scalars['Map']>;
  ageRating?: Maybe<AgeRatingEnum>;
  ageRatingGuide?: Maybe<Scalars['String']>;
  tba?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['Date']>;
  endDate?: Maybe<Scalars['Date']>;
  posterImage?: Maybe<Scalars['Upload']>;
  bannerImage?: Maybe<Scalars['Upload']>;
  youtubeTrailerVideoId?: Maybe<Scalars['String']>;
  episodeCount?: Maybe<Scalars['Int']>;
  episodeLength?: Maybe<Scalars['Int']>;
};

/** Autogenerated return type of AnimeUpdate */
export type AnimeUpdatePayload = {
  __typename?: 'AnimeUpdatePayload';
  anime?: Maybe<Anime>;
  errors?: Maybe<Array<Error>>;
};

/** Information about a specific Category */
export type Category = WithTimestamps & {
  __typename?: 'Category';
  /** The child categories. */
  children?: Maybe<CategoryConnection>;
  createdAt: Scalars['ISO8601DateTime'];
  /** A brief summary or description of the catgory. */
  description: Scalars['Map'];
  id: Scalars['ID'];
  /** Whether the category is Not-Safe-for-Work. */
  isNsfw: Scalars['Boolean'];
  /** The parent category. Each category can have one parent. */
  parent?: Maybe<Category>;
  /** The URL-friendly identifier of this Category. */
  slug: Scalars['String'];
  /** The name of the category. */
  title: Scalars['Map'];
  updatedAt: Scalars['ISO8601DateTime'];
};


/** Information about a specific Category */
export type CategoryChildrenArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** Information about a specific Category */
export type CategoryDescriptionArgs = {
  locales?: Maybe<Array<Scalars['String']>>;
};


/** Information about a specific Category */
export type CategoryTitleArgs = {
  locales?: Maybe<Array<Scalars['String']>>;
};

/** Generic Category Breakdown based on Media */
export type CategoryBreakdown = {
  /** A Map of category_id -> count for all categories present on the library entries */
  categories: Scalars['Map'];
  id: Scalars['ID'];
  /** The profile related to the user for this stat. */
  profile: Profile;
  /** Last time we fully recalculated this stat. */
  recalculatedAt: Scalars['ISO8601Date'];
  /** The total amount of library entries. */
  total: Scalars['Int'];
};

/** The connection type for Category. */
export type CategoryConnection = {
  __typename?: 'CategoryConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<CategoryEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Category>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total amount of nodes. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type CategoryEdge = {
  __typename?: 'CategoryEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Category>;
};

/** A single chapter of a manga */
export type Chapter = Unit & WithTimestamps & {
  __typename?: 'Chapter';
  createdAt: Scalars['ISO8601DateTime'];
  /** A brief summary or description of the unit */
  description: Scalars['Map'];
  id: Scalars['ID'];
  /** The manga this chapter is in. */
  manga: Manga;
  /** The sequence number of this unit */
  number: Scalars['Int'];
  /** When this chapter was released */
  releasedAt?: Maybe<Scalars['ISO8601Date']>;
  /** A thumbnail image for the unit */
  thumbnail?: Maybe<Image>;
  /** The titles for this unit in various locales */
  titles: TitlesList;
  updatedAt: Scalars['ISO8601DateTime'];
  /** The volume this chapter is in. */
  volume?: Maybe<Volume>;
};


/** A single chapter of a manga */
export type ChapterDescriptionArgs = {
  locales?: Maybe<Array<Scalars['String']>>;
};

/** The connection type for Chapter. */
export type ChapterConnection = {
  __typename?: 'ChapterConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ChapterEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Chapter>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total amount of nodes. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type ChapterEdge = {
  __typename?: 'ChapterEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Chapter>;
};

/** Information about a Character in the Kitsu database */
export type Character = WithTimestamps & {
  __typename?: 'Character';
  createdAt: Scalars['ISO8601DateTime'];
  /** A brief summary or description of the character. */
  description: Scalars['Map'];
  id: Scalars['ID'];
  /** An image of the character */
  image?: Maybe<Image>;
  /** Media this character appears in. */
  media?: Maybe<MediaCharacterConnection>;
  /** The name for this character in various locales */
  names?: Maybe<TitlesList>;
  /** The original media this character showed up in */
  primaryMedia?: Maybe<Media>;
  /** The URL-friendly identifier of this character */
  slug: Scalars['String'];
  updatedAt: Scalars['ISO8601DateTime'];
};


/** Information about a Character in the Kitsu database */
export type CharacterDescriptionArgs = {
  locales?: Maybe<Array<Scalars['String']>>;
};


/** Information about a Character in the Kitsu database */
export type CharacterMediaArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export enum CharacterRoleEnum {
  /** A character who appears throughout a series and is a focal point of the media */
  Main = 'MAIN',
  /** A character who appears in multiple episodes but is not a main character */
  Recurring = 'RECURRING',
  /** A background character who generally only appears in a few episodes */
  Background = 'BACKGROUND',
  /** A character from a different franchise making a (usually brief) appearance */
  Cameo = 'CAMEO'
}

/** Information about a VA (Person) voicing a Character in a Media */
export type CharacterVoice = WithTimestamps & {
  __typename?: 'CharacterVoice';
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  /** The company who hired this voice actor to play this role */
  licensor?: Maybe<Producer>;
  /** The BCP47 locale tag for the voice acting role */
  locale: Scalars['String'];
  /** The MediaCharacter node */
  mediaCharacter: MediaCharacter;
  /** The person who voice acted this role */
  person: Person;
  updatedAt: Scalars['ISO8601DateTime'];
};

/** The connection type for CharacterVoice. */
export type CharacterVoiceConnection = {
  __typename?: 'CharacterVoiceConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<CharacterVoiceEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<CharacterVoice>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total amount of nodes. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type CharacterVoiceEdge = {
  __typename?: 'CharacterVoiceEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<CharacterVoice>;
};

/** A comment on a post */
export type Comment = WithTimestamps & {
  __typename?: 'Comment';
  /** The user who created this comment for the parent post. */
  author: Profile;
  /** Unmodified content. */
  content: Scalars['String'];
  /** Html formatted content. */
  contentFormatted: Scalars['String'];
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  /** Users who liked this comment */
  likes: ProfileConnection;
  /** The parent comment if this comment was a reply to another. */
  parent?: Maybe<Comment>;
  /** The post that this comment is attached to. */
  post: Post;
  /** Replies to this comment */
  replies: CommentConnection;
  updatedAt: Scalars['ISO8601DateTime'];
};


/** A comment on a post */
export type CommentLikesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Maybe<CommentLikeSortOption>>>;
};


/** A comment on a post */
export type CommentRepliesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Maybe<CommentSortOption>>>;
};

/** The connection type for Comment. */
export type CommentConnection = {
  __typename?: 'CommentConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<CommentEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Comment>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total amount of nodes. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type CommentEdge = {
  __typename?: 'CommentEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Comment>;
};

export enum CommentLikeSortEnum {
  Following = 'FOLLOWING',
  CreatedAt = 'CREATED_AT'
}

export type CommentLikeSortOption = {
  on: CommentLikeSortEnum;
  direction: SortDirection;
};

export enum CommentSortEnum {
  Following = 'FOLLOWING',
  CreatedAt = 'CREATED_AT',
  LikesCount = 'LIKES_COUNT'
}

export type CommentSortOption = {
  on: CommentSortEnum;
  direction: SortDirection;
};


/** An Episode of a Media */
export type Episode = Unit & WithTimestamps & {
  __typename?: 'Episode';
  /** The anime this episode is in */
  anime: Anime;
  createdAt: Scalars['ISO8601DateTime'];
  /** A brief summary or description of the unit */
  description: Scalars['Map'];
  id: Scalars['ID'];
  /** The length of the episode in seconds */
  length?: Maybe<Scalars['Int']>;
  /** The sequence number of this unit */
  number: Scalars['Int'];
  /** When this episode aired */
  releasedAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** A thumbnail image for the unit */
  thumbnail?: Maybe<Image>;
  /** The titles for this unit in various locales */
  titles: TitlesList;
  updatedAt: Scalars['ISO8601DateTime'];
};


/** An Episode of a Media */
export type EpisodeDescriptionArgs = {
  locales?: Maybe<Array<Scalars['String']>>;
};

/** The connection type for Episode. */
export type EpisodeConnection = {
  __typename?: 'EpisodeConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<EpisodeEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Episode>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total amount of nodes. */
  totalCount: Scalars['Int'];
};

export type EpisodeCreateInput = {
  mediaId: Scalars['ID'];
  mediaType: MediaTypeEnum;
  titles: TitlesListInput;
  number: Scalars['Int'];
  description?: Maybe<Scalars['Map']>;
  length?: Maybe<Scalars['Int']>;
  releasedAt?: Maybe<Scalars['Date']>;
  thumbnailImage?: Maybe<Scalars['Upload']>;
};

/** Autogenerated return type of EpisodeCreate */
export type EpisodeCreatePayload = {
  __typename?: 'EpisodeCreatePayload';
  episode?: Maybe<Episode>;
  errors?: Maybe<Array<Error>>;
};

/** Autogenerated return type of EpisodeDelete */
export type EpisodeDeletePayload = {
  __typename?: 'EpisodeDeletePayload';
  episode?: Maybe<GenericDelete>;
  errors?: Maybe<Array<Error>>;
};

/** An edge in a connection. */
export type EpisodeEdge = {
  __typename?: 'EpisodeEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Episode>;
};

export type EpisodeMutations = {
  __typename?: 'EpisodeMutations';
  /** Create an Episode. */
  create?: Maybe<EpisodeCreatePayload>;
  /** Delete an Episode. */
  delete?: Maybe<EpisodeDeletePayload>;
  /** Update an Episode. */
  update?: Maybe<EpisodeUpdatePayload>;
};


export type EpisodeMutationsCreateArgs = {
  input: EpisodeCreateInput;
};


export type EpisodeMutationsDeleteArgs = {
  input: GenericDeleteInput;
};


export type EpisodeMutationsUpdateArgs = {
  input: EpisodeUpdateInput;
};

export type EpisodeUpdateInput = {
  id: Scalars['ID'];
  titles?: Maybe<TitlesListInput>;
  number?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['Map']>;
  length?: Maybe<Scalars['Int']>;
  releasedAt?: Maybe<Scalars['Date']>;
  thumbnailImage?: Maybe<Scalars['Upload']>;
};

/** Autogenerated return type of EpisodeUpdate */
export type EpisodeUpdatePayload = {
  __typename?: 'EpisodeUpdatePayload';
  episode?: Maybe<Episode>;
  errors?: Maybe<Array<Error>>;
};

/** An episodic media in the Kitsu database */
export type Episodic = {
  /** The number of episodes in this series */
  episodeCount?: Maybe<Scalars['Int']>;
  /** The general length (in seconds) of each episode */
  episodeLength?: Maybe<Scalars['Int']>;
  /** Episodes for this media */
  episodes: EpisodeConnection;
  /** The total length (in seconds) of the entire series */
  totalLength?: Maybe<Scalars['Int']>;
};


/** An episodic media in the Kitsu database */
export type EpisodicEpisodesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  number?: Maybe<Array<Scalars['Int']>>;
};

/** Generic error fields used by all errors. */
export type Error = {
  /** The error code. */
  code?: Maybe<Scalars['String']>;
  /** A description of the error */
  message: Scalars['String'];
  /** Which input value this error came from */
  path?: Maybe<Array<Scalars['String']>>;
};

/** Favorite media, characters, and people for a user */
export type Favorite = WithTimestamps & {
  __typename?: 'Favorite';
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  /** The kitsu object that is mapped */
  item: FavoriteItemUnion;
  updatedAt: Scalars['ISO8601DateTime'];
  /** The user who favorited this item */
  user: Profile;
};

/** The connection type for Favorite. */
export type FavoriteConnection = {
  __typename?: 'FavoriteConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<FavoriteEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Favorite>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total amount of nodes. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type FavoriteEdge = {
  __typename?: 'FavoriteEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Favorite>;
};

/** Objects which are Favoritable */
export type FavoriteItemUnion = Anime | Character | Manga | Person;

export enum FollowSortEnum {
  FollowingFollowed = 'FOLLOWING_FOLLOWED',
  FollowingFollower = 'FOLLOWING_FOLLOWER',
  CreatedAt = 'CREATED_AT'
}

export type FollowSortOption = {
  on: FollowSortEnum;
  direction: SortDirection;
};

/** Related media grouped together */
export type Franchise = WithTimestamps & {
  __typename?: 'Franchise';
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  /** All media related to a franchise */
  installments?: Maybe<InstallmentConnection>;
  /** The name of this franchise in various languages */
  titles: TitlesList;
  updatedAt: Scalars['ISO8601DateTime'];
};


/** Related media grouped together */
export type FranchiseInstallmentsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Maybe<InstallmentSortOption>>>;
};

/** The connection type for Franchise. */
export type FranchiseConnection = {
  __typename?: 'FranchiseConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<FranchiseEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Franchise>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total amount of nodes. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type FranchiseEdge = {
  __typename?: 'FranchiseEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Franchise>;
};

export type Generic = Error & {
  __typename?: 'Generic';
  /** The error code. */
  code?: Maybe<Scalars['String']>;
  /** A description of the error */
  message: Scalars['String'];
  /** Which input value this error came from */
  path?: Maybe<Array<Scalars['String']>>;
};

export type GenericDelete = {
  __typename?: 'GenericDelete';
  id: Scalars['ID'];
};

export type GenericDeleteInput = {
  id: Scalars['ID'];
};



export type Image = {
  __typename?: 'Image';
  /** A blurhash-encoded version of this image */
  blurhash?: Maybe<Scalars['String']>;
  /** The original image */
  original: ImageView;
  /** The various generated views of this image */
  views: Array<ImageView>;
};


export type ImageViewsArgs = {
  names?: Maybe<Array<Scalars['String']>>;
};

export type ImageView = {
  __typename?: 'ImageView';
  /** The height of the image */
  height?: Maybe<Scalars['Int']>;
  /** The name of this view of the image */
  name: Scalars['String'];
  /** The URL of this view of the image */
  url: Scalars['String'];
  /** The width of the image */
  width?: Maybe<Scalars['Int']>;
};

/** Individual media that belongs to a franchise */
export type Installment = WithTimestamps & {
  __typename?: 'Installment';
  /** Order based chronologically */
  alternativeOrder?: Maybe<Scalars['Int']>;
  createdAt: Scalars['ISO8601DateTime'];
  /** The franchise related to this installment */
  franchise: Franchise;
  id: Scalars['ID'];
  /** The media related to this installment */
  media: Media;
  /** Order based by date released */
  releaseOrder?: Maybe<Scalars['Int']>;
  /** Further explains the media relationship corresponding to a franchise */
  tag?: Maybe<InstallmentTagEnum>;
  updatedAt: Scalars['ISO8601DateTime'];
};

/** The connection type for Installment. */
export type InstallmentConnection = {
  __typename?: 'InstallmentConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<InstallmentEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Installment>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total amount of nodes. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type InstallmentEdge = {
  __typename?: 'InstallmentEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Installment>;
};

export enum InstallmentSortEnum {
  ReleaseOrder = 'RELEASE_ORDER',
  AlternativeOrder = 'ALTERNATIVE_ORDER'
}

export type InstallmentSortOption = {
  on: InstallmentSortEnum;
  direction: SortDirection;
};

export enum InstallmentTagEnum {
  /** The main story. */
  MainStory = 'MAIN_STORY',
  /** Takes place sometime during the main storyline. */
  SideStory = 'SIDE_STORY',
  /** Uses characters of a different series, but is not an alternate setting or story. */
  Spinoff = 'SPINOFF',
  /** Characters from different media meet in the same story. */
  Crossover = 'CROSSOVER',
  /** Same universe/world/reality/timeline, completely different characters. */
  AlternateSetting = 'ALTERNATE_SETTING',
  /** Same setting, same characters, story is told differently. */
  AlternateVersion = 'ALTERNATE_VERSION'
}


/** The user library filterable by media_type and status */
export type Library = {
  __typename?: 'Library';
  /** All Library Entries for a specific Media */
  all: LibraryEntryConnection;
  /** Library Entries for a specific Media filtered by the completed status */
  completed: LibraryEntryConnection;
  /** Library Entries for a specific Media filtered by the current status */
  current: LibraryEntryConnection;
  /** Library Entries for a specific Media filtered by the dropped status */
  dropped: LibraryEntryConnection;
  /** Library Entries for a specific Media filtered by the on_hold status */
  onHold: LibraryEntryConnection;
  /** Library Entries for a specific Media filtered by the planned status */
  planned: LibraryEntryConnection;
  /** Random anime or manga from this library */
  randomMedia?: Maybe<Media>;
};


/** The user library filterable by media_type and status */
export type LibraryAllArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  mediaType: MediaTypeEnum;
  status?: Maybe<Array<LibraryEntryStatusEnum>>;
};


/** The user library filterable by media_type and status */
export type LibraryCompletedArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  mediaType: MediaTypeEnum;
};


/** The user library filterable by media_type and status */
export type LibraryCurrentArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  mediaType: MediaTypeEnum;
};


/** The user library filterable by media_type and status */
export type LibraryDroppedArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  mediaType: MediaTypeEnum;
};


/** The user library filterable by media_type and status */
export type LibraryOnHoldArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  mediaType: MediaTypeEnum;
};


/** The user library filterable by media_type and status */
export type LibraryPlannedArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  mediaType: MediaTypeEnum;
};


/** The user library filterable by media_type and status */
export type LibraryRandomMediaArgs = {
  mediaType: MediaTypeEnum;
  status: Array<LibraryEntryStatusEnum>;
};

/** Information about a specific media entry for a user */
export type LibraryEntry = WithTimestamps & {
  __typename?: 'LibraryEntry';
  createdAt: Scalars['ISO8601DateTime'];
  /** History of user actions for this library entry. */
  events?: Maybe<LibraryEventConnection>;
  /** When the user finished this media. */
  finishedAt?: Maybe<Scalars['ISO8601DateTime']>;
  id: Scalars['ID'];
  /** The last unit consumed */
  lastUnit?: Maybe<Unit>;
  /** The media related to this library entry. */
  media: Media;
  /** The next unit to be consumed */
  nextUnit?: Maybe<Unit>;
  /** Notes left by the profile related to this library entry. */
  notes?: Maybe<Scalars['String']>;
  /** If the media related to the library entry is Not-Safe-for-Work. */
  nsfw: Scalars['Boolean'];
  /** If this library entry is publicly visibile from their profile, or hidden. */
  private: Scalars['Boolean'];
  /** The number of episodes/chapters this user has watched/read */
  progress: Scalars['Int'];
  /** When the user last watched an episode or read a chapter of this media. */
  progressedAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** How much you enjoyed this media (lower meaning not liking). */
  rating?: Maybe<Scalars['Int']>;
  /** The reaction based on the media of this library entry. */
  reaction?: Maybe<MediaReaction>;
  /** Amount of times this media has been rewatched. */
  reconsumeCount: Scalars['Int'];
  /** If the profile is currently rewatching this media. */
  reconsuming: Scalars['Boolean'];
  /** When the user started this media. */
  startedAt?: Maybe<Scalars['ISO8601DateTime']>;
  status: LibraryEntryStatusEnum;
  updatedAt: Scalars['ISO8601DateTime'];
  /** The user who created this library entry. */
  user: Profile;
  /** Volumes that the profile owns (physically or digital). */
  volumesOwned: Scalars['Int'];
};


/** Information about a specific media entry for a user */
export type LibraryEntryEventsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  mediaTypes?: Maybe<Array<MediaTypeEnum>>;
};

/** The connection type for LibraryEntry. */
export type LibraryEntryConnection = {
  __typename?: 'LibraryEntryConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<LibraryEntryEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<LibraryEntry>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total amount of nodes. */
  totalCount: Scalars['Int'];
};

export type LibraryEntryCreateInput = {
  userId: Scalars['ID'];
  mediaId: Scalars['ID'];
  mediaType: MediaTypeEnum;
  status: LibraryEntryStatusEnum;
  progress?: Maybe<Scalars['Int']>;
  private?: Maybe<Scalars['Boolean']>;
  notes?: Maybe<Scalars['String']>;
  reconsumeCount?: Maybe<Scalars['Int']>;
  reconsuming?: Maybe<Scalars['Boolean']>;
  volumesOwned?: Maybe<Scalars['Int']>;
  rating?: Maybe<Scalars['Int']>;
  startedAt?: Maybe<Scalars['ISO8601DateTime']>;
  finishedAt?: Maybe<Scalars['ISO8601DateTime']>;
};

/** Autogenerated return type of LibraryEntryCreate */
export type LibraryEntryCreatePayload = {
  __typename?: 'LibraryEntryCreatePayload';
  errors?: Maybe<Array<Error>>;
  libraryEntry?: Maybe<LibraryEntry>;
};

/** Autogenerated return type of LibraryEntryDelete */
export type LibraryEntryDeletePayload = {
  __typename?: 'LibraryEntryDeletePayload';
  errors?: Maybe<Array<Error>>;
  libraryEntry?: Maybe<GenericDelete>;
};

/** An edge in a connection. */
export type LibraryEntryEdge = {
  __typename?: 'LibraryEntryEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<LibraryEntry>;
};

export type LibraryEntryMutations = {
  __typename?: 'LibraryEntryMutations';
  /** Create a library entry */
  create?: Maybe<LibraryEntryCreatePayload>;
  /** Delete a library entry */
  delete?: Maybe<LibraryEntryDeletePayload>;
  /** Update a library entry */
  update?: Maybe<LibraryEntryUpdatePayload>;
  /** Update library entry progress by id */
  updateProgressById?: Maybe<LibraryEntryUpdateProgressByIdPayload>;
  /** Update library entry progress by media */
  updateProgressByMedia?: Maybe<LibraryEntryUpdateProgressByMediaPayload>;
  /** Update library entry rating by id */
  updateRatingById?: Maybe<LibraryEntryUpdateRatingByIdPayload>;
  /** Update library entry rating by media */
  updateRatingByMedia?: Maybe<LibraryEntryUpdateRatingByMediaPayload>;
  /** Update library entry status by id */
  updateStatusById?: Maybe<LibraryEntryUpdateStatusByIdPayload>;
  /** Update library entry status by media */
  updateStatusByMedia?: Maybe<LibraryEntryUpdateStatusByMediaPayload>;
};


export type LibraryEntryMutationsCreateArgs = {
  input: LibraryEntryCreateInput;
};


export type LibraryEntryMutationsDeleteArgs = {
  input: GenericDeleteInput;
};


export type LibraryEntryMutationsUpdateArgs = {
  input: LibraryEntryUpdateInput;
};


export type LibraryEntryMutationsUpdateProgressByIdArgs = {
  input: LibraryEntryUpdateProgressByIdInput;
};


export type LibraryEntryMutationsUpdateProgressByMediaArgs = {
  input: LibraryEntryUpdateProgressByMediaInput;
};


export type LibraryEntryMutationsUpdateRatingByIdArgs = {
  input: LibraryEntryUpdateRatingByIdInput;
};


export type LibraryEntryMutationsUpdateRatingByMediaArgs = {
  input: LibraryEntryUpdateRatingByMediaInput;
};


export type LibraryEntryMutationsUpdateStatusByIdArgs = {
  input: LibraryEntryUpdateStatusByIdInput;
};


export type LibraryEntryMutationsUpdateStatusByMediaArgs = {
  input: LibraryEntryUpdateStatusByMediaInput;
};

export enum LibraryEntryStatusEnum {
  /** The user is currently reading or watching this media. */
  Current = 'CURRENT',
  /** The user plans to read or watch this media in future. */
  Planned = 'PLANNED',
  /** The user completed this media. */
  Completed = 'COMPLETED',
  /** The user started but paused reading or watching this media. */
  OnHold = 'ON_HOLD',
  /** The user started but chose not to finish this media. */
  Dropped = 'DROPPED'
}

export type LibraryEntryUpdateInput = {
  id: Scalars['ID'];
  status?: Maybe<LibraryEntryStatusEnum>;
  progress?: Maybe<Scalars['Int']>;
  private?: Maybe<Scalars['Boolean']>;
  notes?: Maybe<Scalars['String']>;
  reconsumeCount?: Maybe<Scalars['Int']>;
  reconsuming?: Maybe<Scalars['Boolean']>;
  volumesOwned?: Maybe<Scalars['Int']>;
  rating?: Maybe<Scalars['Int']>;
  startedAt?: Maybe<Scalars['ISO8601DateTime']>;
  finishedAt?: Maybe<Scalars['ISO8601DateTime']>;
};

/** Autogenerated return type of LibraryEntryUpdate */
export type LibraryEntryUpdatePayload = {
  __typename?: 'LibraryEntryUpdatePayload';
  errors?: Maybe<Array<Error>>;
  libraryEntry?: Maybe<LibraryEntry>;
};

export type LibraryEntryUpdateProgressByIdInput = {
  id: Scalars['ID'];
  progress: Scalars['Int'];
};

/** Autogenerated return type of LibraryEntryUpdateProgressById */
export type LibraryEntryUpdateProgressByIdPayload = {
  __typename?: 'LibraryEntryUpdateProgressByIdPayload';
  errors?: Maybe<Array<Error>>;
  libraryEntry?: Maybe<LibraryEntry>;
};

export type LibraryEntryUpdateProgressByMediaInput = {
  mediaId: Scalars['ID'];
  mediaType: MediaTypeEnum;
  progress: Scalars['Int'];
};

/** Autogenerated return type of LibraryEntryUpdateProgressByMedia */
export type LibraryEntryUpdateProgressByMediaPayload = {
  __typename?: 'LibraryEntryUpdateProgressByMediaPayload';
  errors?: Maybe<Array<Error>>;
  libraryEntry?: Maybe<LibraryEntry>;
};

export type LibraryEntryUpdateRatingByIdInput = {
  id: Scalars['ID'];
  /** A number between 2 - 20 */
  rating: Scalars['Int'];
};

/** Autogenerated return type of LibraryEntryUpdateRatingById */
export type LibraryEntryUpdateRatingByIdPayload = {
  __typename?: 'LibraryEntryUpdateRatingByIdPayload';
  errors?: Maybe<Array<Error>>;
  libraryEntry?: Maybe<LibraryEntry>;
};

export type LibraryEntryUpdateRatingByMediaInput = {
  mediaId: Scalars['ID'];
  mediaType: MediaTypeEnum;
  /** A number between 2 - 20 */
  rating: Scalars['Int'];
};

/** Autogenerated return type of LibraryEntryUpdateRatingByMedia */
export type LibraryEntryUpdateRatingByMediaPayload = {
  __typename?: 'LibraryEntryUpdateRatingByMediaPayload';
  errors?: Maybe<Array<Error>>;
  libraryEntry?: Maybe<LibraryEntry>;
};

export type LibraryEntryUpdateStatusByIdInput = {
  id: Scalars['ID'];
  status: LibraryEntryStatusEnum;
};

/** Autogenerated return type of LibraryEntryUpdateStatusById */
export type LibraryEntryUpdateStatusByIdPayload = {
  __typename?: 'LibraryEntryUpdateStatusByIdPayload';
  errors?: Maybe<Array<Error>>;
  libraryEntry?: Maybe<LibraryEntry>;
};

export type LibraryEntryUpdateStatusByMediaInput = {
  mediaId: Scalars['ID'];
  mediaType: MediaTypeEnum;
  status: LibraryEntryStatusEnum;
};

/** Autogenerated return type of LibraryEntryUpdateStatusByMedia */
export type LibraryEntryUpdateStatusByMediaPayload = {
  __typename?: 'LibraryEntryUpdateStatusByMediaPayload';
  errors?: Maybe<Array<Error>>;
  libraryEntry?: Maybe<LibraryEntry>;
};

/** History of user actions for a library entry. */
export type LibraryEvent = WithTimestamps & {
  __typename?: 'LibraryEvent';
  /** The data that was changed for this library event. */
  changedData: Scalars['Map'];
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  /** The type of library event. */
  kind: LibraryEventKindEnum;
  /** The library entry related to this library event. */
  libraryEntry: LibraryEntry;
  /** The media related to this library event. */
  media: Media;
  updatedAt: Scalars['ISO8601DateTime'];
  /** The user who created this library event */
  user: Profile;
};

/** The connection type for LibraryEvent. */
export type LibraryEventConnection = {
  __typename?: 'LibraryEventConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<LibraryEventEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<LibraryEvent>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total amount of nodes. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type LibraryEventEdge = {
  __typename?: 'LibraryEventEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<LibraryEvent>;
};

export enum LibraryEventKindEnum {
  /** Progress or Time Spent was added/updated. */
  Progressed = 'PROGRESSED',
  /** Status or Reconsuming was added/updated. */
  Updated = 'UPDATED',
  /** Reaction was added/updated. */
  Reacted = 'REACTED',
  /** Rating was added/updated. */
  Rated = 'RATED',
  /** Notes were added/updated. */
  Annotated = 'ANNOTATED'
}

export enum LockedReasonEnum {
  Spam = 'SPAM',
  TooHeated = 'TOO_HEATED',
  Closed = 'CLOSED'
}

export type Manga = Media & WithTimestamps & {
  __typename?: 'Manga';
  /** The recommended minimum age group for this media */
  ageRating?: Maybe<AgeRatingEnum>;
  /** An explanation of why this received the age rating it did */
  ageRatingGuide?: Maybe<Scalars['String']>;
  /** The average rating of this media amongst all Kitsu users */
  averageRating?: Maybe<Scalars['Float']>;
  /** A large banner image for this media */
  bannerImage: Image;
  /** A list of categories for this media */
  categories: CategoryConnection;
  /** The number of chapters in this manga. */
  chapterCount?: Maybe<Scalars['Int']>;
  /** The estimated number of chapters in this manga. */
  chapterCountGuess?: Maybe<Scalars['Int']>;
  /** The chapters in the manga. */
  chapters?: Maybe<ChapterConnection>;
  /** The characters who starred in this media */
  characters: MediaCharacterConnection;
  createdAt: Scalars['ISO8601DateTime'];
  /** A brief (mostly spoiler free) summary or description of the media. */
  description: Scalars['Map'];
  /** the day that this media made its final release */
  endDate?: Maybe<Scalars['Date']>;
  /** The number of users with this in their favorites */
  favoritesCount?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  /** A list of mappings for this media */
  mappings: MappingConnection;
  /** A list of your wiki submissions for this media */
  myWikiSubmissions: WikiSubmissionConnection;
  /** The time of the next release of this media */
  nextRelease?: Maybe<Scalars['ISO8601DateTime']>;
  /** The country in which the media was primarily produced */
  originalLocale?: Maybe<Scalars['String']>;
  /** The poster image of this media */
  posterImage: Image;
  /** The companies which helped to produce this media */
  productions: MediaProductionConnection;
  /** A list of quotes from this media */
  quotes: QuoteConnection;
  /** A list of reactions for this media */
  reactions: MediaReactionConnection;
  /** Whether the media is Safe-for-Work */
  sfw: Scalars['Boolean'];
  /** The URL-friendly identifier of this media */
  slug: Scalars['String'];
  /** The staff members who worked on this media */
  staff: MediaStaffConnection;
  /** The day that this media first released */
  startDate?: Maybe<Scalars['Date']>;
  /** The current releasing status of this media */
  status: ReleaseStatusEnum;
  /** A secondary type for categorizing Manga. */
  subtype: MangaSubtypeEnum;
  /** Description of when this media is expected to release */
  tba?: Maybe<Scalars['String']>;
  /** The titles for this media in various locales */
  titles: TitlesList;
  /** Anime or Manga. */
  type: Scalars['String'];
  updatedAt: Scalars['ISO8601DateTime'];
  /** The number of users with this in their library */
  userCount?: Maybe<Scalars['Int']>;
  /** The number of volumes in this manga. */
  volumeCount?: Maybe<Scalars['Int']>;
};


export type MangaCategoriesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type MangaChaptersArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type MangaCharactersArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type MangaDescriptionArgs = {
  locales?: Maybe<Array<Scalars['String']>>;
};


export type MangaMappingsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type MangaMyWikiSubmissionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Maybe<WikiSubmissionSortOption>>>;
};


export type MangaProductionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type MangaQuotesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type MangaReactionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type MangaStaffArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type MangaAmountConsumed = AmountConsumed & {
  __typename?: 'MangaAmountConsumed';
  /** Total media completed atleast once. */
  completed: Scalars['Int'];
  id: Scalars['ID'];
  /** Total amount of media. */
  media: Scalars['Int'];
  /** The profile related to the user for this stat. */
  profile: Profile;
  /** Last time we fully recalculated this stat. */
  recalculatedAt: Scalars['ISO8601Date'];
  /** Total progress of library including reconsuming. */
  units: Scalars['Int'];
};

export type MangaCategoryBreakdown = CategoryBreakdown & {
  __typename?: 'MangaCategoryBreakdown';
  /** A Map of category_id -> count for all categories present on the library entries */
  categories: Scalars['Map'];
  id: Scalars['ID'];
  /** The profile related to the user for this stat. */
  profile: Profile;
  /** Last time we fully recalculated this stat. */
  recalculatedAt: Scalars['ISO8601Date'];
  /** The total amount of library entries. */
  total: Scalars['Int'];
};

/** The connection type for Manga. */
export type MangaConnection = {
  __typename?: 'MangaConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<MangaEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Manga>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total amount of nodes. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type MangaEdge = {
  __typename?: 'MangaEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Manga>;
};

export enum MangaSubtypeEnum {
  Manga = 'MANGA',
  Novel = 'NOVEL',
  /** Chinese comics produced in China and in the Greater China region. */
  Manhua = 'MANHUA',
  Oneshot = 'ONESHOT',
  /** Self published work. */
  Doujin = 'DOUJIN',
  /** A style of South Korean comic books and graphic novels */
  Manhwa = 'MANHWA',
  /** Original English Language. */
  Oel = 'OEL'
}


/** Media Mappings from External Sites (MAL, Anilist, etc..) to Kitsu. */
export type Mapping = WithTimestamps & {
  __typename?: 'Mapping';
  createdAt: Scalars['ISO8601DateTime'];
  /** The ID of the media from the external site. */
  externalId: Scalars['ID'];
  /** The name of the site which kitsu media is being linked from. */
  externalSite: MappingExternalSiteEnum;
  id: Scalars['ID'];
  /** The kitsu object that is mapped. */
  item: MappingItemUnion;
  updatedAt: Scalars['ISO8601DateTime'];
};

/** The connection type for Mapping. */
export type MappingConnection = {
  __typename?: 'MappingConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<MappingEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Mapping>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total amount of nodes. */
  totalCount: Scalars['Int'];
};

export type MappingCreateInput = {
  externalSite: MappingExternalSiteEnum;
  externalId: Scalars['ID'];
  itemId: Scalars['ID'];
  itemType: MappingItemEnum;
};

/** Autogenerated return type of MappingCreate */
export type MappingCreatePayload = {
  __typename?: 'MappingCreatePayload';
  errors?: Maybe<Array<Error>>;
  mapping?: Maybe<Mapping>;
};

/** Autogenerated return type of MappingDelete */
export type MappingDeletePayload = {
  __typename?: 'MappingDeletePayload';
  errors?: Maybe<Array<Error>>;
  mapping?: Maybe<GenericDelete>;
};

/** An edge in a connection. */
export type MappingEdge = {
  __typename?: 'MappingEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Mapping>;
};

export enum MappingExternalSiteEnum {
  MyanimelistAnime = 'MYANIMELIST_ANIME',
  MyanimelistManga = 'MYANIMELIST_MANGA',
  MyanimelistCharacters = 'MYANIMELIST_CHARACTERS',
  MyanimelistPeople = 'MYANIMELIST_PEOPLE',
  MyanimelistProducers = 'MYANIMELIST_PRODUCERS',
  AnilistAnime = 'ANILIST_ANIME',
  AnilistManga = 'ANILIST_MANGA',
  Thetvdb = 'THETVDB',
  ThetvdbSeries = 'THETVDB_SERIES',
  ThetvdbSeason = 'THETVDB_SEASON',
  Anidb = 'ANIDB',
  Animenewsnetwork = 'ANIMENEWSNETWORK',
  Mangaupdates = 'MANGAUPDATES',
  Hulu = 'HULU',
  ImdbEpisodes = 'IMDB_EPISODES',
  Aozora = 'AOZORA',
  Trakt = 'TRAKT',
  Mydramalist = 'MYDRAMALIST'
}

export enum MappingItemEnum {
  Anime = 'ANIME',
  Manga = 'MANGA',
  Category = 'CATEGORY',
  Character = 'CHARACTER',
  Episode = 'EPISODE',
  Person = 'PERSON',
  Producer = 'PRODUCER'
}

/** Objects which are Mappable */
export type MappingItemUnion = Anime | Category | Character | Episode | Manga | Person | Producer;

export type MappingMutations = {
  __typename?: 'MappingMutations';
  /** Create a Mapping */
  create?: Maybe<MappingCreatePayload>;
  /** Delete a Mapping */
  delete?: Maybe<MappingDeletePayload>;
  /** Update a Mapping */
  update?: Maybe<MappingUpdatePayload>;
};


export type MappingMutationsCreateArgs = {
  input: MappingCreateInput;
};


export type MappingMutationsDeleteArgs = {
  input: GenericDeleteInput;
};


export type MappingMutationsUpdateArgs = {
  input: MappingUpdateInput;
};

export type MappingUpdateInput = {
  id: Scalars['ID'];
  externalSite?: Maybe<MappingExternalSiteEnum>;
  externalId?: Maybe<Scalars['ID']>;
  itemId?: Maybe<Scalars['ID']>;
  itemType?: Maybe<MappingItemEnum>;
};

/** Autogenerated return type of MappingUpdate */
export type MappingUpdatePayload = {
  __typename?: 'MappingUpdatePayload';
  errors?: Maybe<Array<Error>>;
  mapping?: Maybe<Mapping>;
};

/** A media in the Kitsu database */
export type Media = {
  /** The recommended minimum age group for this media */
  ageRating?: Maybe<AgeRatingEnum>;
  /** An explanation of why this received the age rating it did */
  ageRatingGuide?: Maybe<Scalars['String']>;
  /** The average rating of this media amongst all Kitsu users */
  averageRating?: Maybe<Scalars['Float']>;
  /** A large banner image for this media */
  bannerImage: Image;
  /** A list of categories for this media */
  categories: CategoryConnection;
  /** The characters who starred in this media */
  characters: MediaCharacterConnection;
  /** A brief (mostly spoiler free) summary or description of the media. */
  description: Scalars['Map'];
  /** the day that this media made its final release */
  endDate?: Maybe<Scalars['Date']>;
  /** The number of users with this in their favorites */
  favoritesCount?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  /** A list of mappings for this media */
  mappings: MappingConnection;
  /** A list of your wiki submissions for this media */
  myWikiSubmissions: WikiSubmissionConnection;
  /** The time of the next release of this media */
  nextRelease?: Maybe<Scalars['ISO8601DateTime']>;
  /** The country in which the media was primarily produced */
  originalLocale?: Maybe<Scalars['String']>;
  /** The poster image of this media */
  posterImage: Image;
  /** The companies which helped to produce this media */
  productions: MediaProductionConnection;
  /** A list of quotes from this media */
  quotes: QuoteConnection;
  /** A list of reactions for this media */
  reactions: MediaReactionConnection;
  /** Whether the media is Safe-for-Work */
  sfw: Scalars['Boolean'];
  /** The URL-friendly identifier of this media */
  slug: Scalars['String'];
  /** The staff members who worked on this media */
  staff: MediaStaffConnection;
  /** The day that this media first released */
  startDate?: Maybe<Scalars['Date']>;
  /** The current releasing status of this media */
  status: ReleaseStatusEnum;
  /** Description of when this media is expected to release */
  tba?: Maybe<Scalars['String']>;
  /** The titles for this media in various locales */
  titles: TitlesList;
  /** Anime or Manga. */
  type: Scalars['String'];
  /** The number of users with this in their library */
  userCount?: Maybe<Scalars['Int']>;
};


/** A media in the Kitsu database */
export type MediaCategoriesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** A media in the Kitsu database */
export type MediaCharactersArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** A media in the Kitsu database */
export type MediaDescriptionArgs = {
  locales?: Maybe<Array<Scalars['String']>>;
};


/** A media in the Kitsu database */
export type MediaMappingsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** A media in the Kitsu database */
export type MediaMyWikiSubmissionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Maybe<WikiSubmissionSortOption>>>;
};


/** A media in the Kitsu database */
export type MediaProductionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** A media in the Kitsu database */
export type MediaQuotesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** A media in the Kitsu database */
export type MediaReactionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** A media in the Kitsu database */
export type MediaStaffArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** Information about a Character starring in a Media */
export type MediaCharacter = WithTimestamps & {
  __typename?: 'MediaCharacter';
  /** The character */
  character: Character;
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  /** The media */
  media: Media;
  /** The role this character had in the media */
  role: CharacterRoleEnum;
  updatedAt: Scalars['ISO8601DateTime'];
  /** The voices of this character */
  voices?: Maybe<CharacterVoiceConnection>;
};


/** Information about a Character starring in a Media */
export type MediaCharacterVoicesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  locale?: Maybe<Array<Scalars['String']>>;
};

/** The connection type for MediaCharacter. */
export type MediaCharacterConnection = {
  __typename?: 'MediaCharacterConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<MediaCharacterEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<MediaCharacter>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total amount of nodes. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type MediaCharacterEdge = {
  __typename?: 'MediaCharacterEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<MediaCharacter>;
};

/** The connection type for Media. */
export type MediaConnection = {
  __typename?: 'MediaConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<MediaEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Media>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type MediaEdge = {
  __typename?: 'MediaEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Media>;
};

/** The role a company played in the creation or localization of a media */
export type MediaProduction = WithTimestamps & {
  __typename?: 'MediaProduction';
  /** The production company */
  company: Producer;
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  /** The media */
  media: Media;
  /** The role this company played */
  role: MediaProductionRoleEnum;
  updatedAt: Scalars['ISO8601DateTime'];
};

/** The connection type for MediaProduction. */
export type MediaProductionConnection = {
  __typename?: 'MediaProductionConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<MediaProductionEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<MediaProduction>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total amount of nodes. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type MediaProductionEdge = {
  __typename?: 'MediaProductionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<MediaProduction>;
};

export enum MediaProductionRoleEnum {
  Producer = 'PRODUCER',
  Licensor = 'LICENSOR',
  Studio = 'STUDIO',
  Serialization = 'SERIALIZATION'
}

/** A simple review that is 140 characters long expressing how you felt about a media */
export type MediaReaction = WithTimestamps & {
  __typename?: 'MediaReaction';
  /** The author who wrote this reaction. */
  author: Profile;
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  /** The library entry related to this reaction. */
  libraryEntry: LibraryEntry;
  /** Users who liked this reaction. */
  likes: ProfileConnection;
  /** The media related to this reaction. */
  media: Media;
  /** When this media reaction was written based on media progress. */
  progress: Scalars['Int'];
  /** The reaction text related to a media. */
  reaction: Scalars['String'];
  updatedAt: Scalars['ISO8601DateTime'];
};


/** A simple review that is 140 characters long expressing how you felt about a media */
export type MediaReactionLikesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** The connection type for MediaReaction. */
export type MediaReactionConnection = {
  __typename?: 'MediaReactionConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<MediaReactionEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<MediaReaction>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total amount of nodes. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type MediaReactionEdge = {
  __typename?: 'MediaReactionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<MediaReaction>;
};

/** Information about a person working on an anime */
export type MediaStaff = WithTimestamps & {
  __typename?: 'MediaStaff';
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  /** The media */
  media: Media;
  /** The person */
  person: Person;
  /** The role this person had in the creation of this media */
  role: Scalars['String'];
  updatedAt: Scalars['ISO8601DateTime'];
};

/** The connection type for MediaStaff. */
export type MediaStaffConnection = {
  __typename?: 'MediaStaffConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<MediaStaffEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<MediaStaff>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total amount of nodes. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type MediaStaffEdge = {
  __typename?: 'MediaStaffEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<MediaStaff>;
};

/** これはアニメやマンガです */
export enum MediaTypeEnum {
  Anime = 'ANIME',
  Manga = 'MANGA'
}

export type Mutation = {
  __typename?: 'Mutation';
  anime: AnimeMutations;
  episode: EpisodeMutations;
  libraryEntry: LibraryEntryMutations;
  mapping: MappingMutations;
  post: PostMutations;
  pro: ProMutations;
  wikiSubmission: WikiSubmissionMutations;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

/** A Voice Actor, Director, Animator, or other person who works in the creation and localization of media */
export type Person = WithTimestamps & {
  __typename?: 'Person';
  /** The day when this person was born */
  birthday?: Maybe<Scalars['Date']>;
  createdAt: Scalars['ISO8601DateTime'];
  /** A brief biography or description of the person. */
  description: Scalars['Map'];
  id: Scalars['ID'];
  /** An image of the person */
  image?: Maybe<Image>;
  /** Information about the person working on specific media */
  mediaStaff?: Maybe<MediaStaffConnection>;
  /** The primary name of this person. */
  name: Scalars['String'];
  /** The name of this person in various languages */
  names: TitlesList;
  /** The URL-friendly identifier of this person. */
  slug: Scalars['String'];
  updatedAt: Scalars['ISO8601DateTime'];
  /** The voice-acting roles this person has had. */
  voices?: Maybe<CharacterVoiceConnection>;
};


/** A Voice Actor, Director, Animator, or other person who works in the creation and localization of media */
export type PersonDescriptionArgs = {
  locales?: Maybe<Array<Scalars['String']>>;
};


/** A Voice Actor, Director, Animator, or other person who works in the creation and localization of media */
export type PersonMediaStaffArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** A Voice Actor, Director, Animator, or other person who works in the creation and localization of media */
export type PersonVoicesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** A post that is visible to your followers and globally in the news-feed. */
export type Post = WithTimestamps & {
  __typename?: 'Post';
  /** The user who created this post. */
  author: Profile;
  /** All comments on this post */
  comments: CommentConnection;
  /** Unmodified content. */
  content: Scalars['String'];
  /** Html formatted content. */
  contentFormatted: Scalars['String'];
  createdAt: Scalars['ISO8601DateTime'];
  /** Users that are watching this post */
  follows: ProfileConnection;
  id: Scalars['ID'];
  /** If a post is Not-Safe-for-Work. */
  isNsfw: Scalars['Boolean'];
  /** If this post spoils the tagged media. */
  isSpoiler: Scalars['Boolean'];
  /** Users that have liked this post */
  likes: ProfileConnection;
  /** When this post was locked. */
  lockedAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** The user who locked this post. */
  lockedBy?: Maybe<Profile>;
  /** The reason why this post was locked. */
  lockedReason?: Maybe<LockedReasonEnum>;
  /** The media tagged in this post. */
  media?: Maybe<Media>;
  updatedAt: Scalars['ISO8601DateTime'];
};


/** A post that is visible to your followers and globally in the news-feed. */
export type PostCommentsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Maybe<CommentSortOption>>>;
};


/** A post that is visible to your followers and globally in the news-feed. */
export type PostFollowsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** A post that is visible to your followers and globally in the news-feed. */
export type PostLikesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Maybe<PostLikeSortOption>>>;
};

/** The connection type for Post. */
export type PostConnection = {
  __typename?: 'PostConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<PostEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Post>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total amount of nodes. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type PostEdge = {
  __typename?: 'PostEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Post>;
};

export enum PostLikeSortEnum {
  Following = 'FOLLOWING',
  CreatedAt = 'CREATED_AT'
}

export type PostLikeSortOption = {
  on: PostLikeSortEnum;
  direction: SortDirection;
};

export type PostLockInput = {
  id: Scalars['ID'];
  lockedReason: LockedReasonEnum;
};

/** Autogenerated return type of PostLock */
export type PostLockPayload = {
  __typename?: 'PostLockPayload';
  errors?: Maybe<Array<Error>>;
  post?: Maybe<Post>;
};

export type PostMutations = {
  __typename?: 'PostMutations';
  /** Lock a Post. */
  lock?: Maybe<PostLockPayload>;
  /** Unlock a Post. */
  unlock?: Maybe<PostUnlockPayload>;
};


export type PostMutationsLockArgs = {
  input: PostLockInput;
};


export type PostMutationsUnlockArgs = {
  input: PostUnlockInput;
};

export enum PostSortEnum {
  CreatedAt = 'CREATED_AT'
}

export type PostSortOption = {
  on: PostSortEnum;
  direction: SortDirection;
};

export type PostUnlockInput = {
  id: Scalars['ID'];
};

/** Autogenerated return type of PostUnlock */
export type PostUnlockPayload = {
  __typename?: 'PostUnlockPayload';
  errors?: Maybe<Array<Error>>;
  post?: Maybe<Post>;
};

export type ProMutations = {
  __typename?: 'ProMutations';
  /** Set the user's discord tag */
  setDiscord?: Maybe<ProSetDiscordPayload>;
  /** Set the user's Hall-of-Fame message */
  setMessage?: Maybe<ProSetMessagePayload>;
  /** End the user's pro subscription */
  unsubscribe?: Maybe<ProUnsubscribePayload>;
};


export type ProMutationsSetDiscordArgs = {
  discord: Scalars['String'];
};


export type ProMutationsSetMessageArgs = {
  message: Scalars['String'];
};

/** Autogenerated return type of ProSetDiscord */
export type ProSetDiscordPayload = {
  __typename?: 'ProSetDiscordPayload';
  discord: Scalars['String'];
};

/** Autogenerated return type of ProSetMessage */
export type ProSetMessagePayload = {
  __typename?: 'ProSetMessagePayload';
  message: Scalars['String'];
};

/** A subscription to Kitsu PRO */
export type ProSubscription = WithTimestamps & {
  __typename?: 'ProSubscription';
  /** The account which is subscribed to Pro benefits */
  account: Account;
  /** The billing service used for this subscription */
  billingService: RecurringBillingServiceEnum;
  createdAt: Scalars['ISO8601DateTime'];
  /** The tier of Pro the account is subscribed to */
  tier: ProTierEnum;
  updatedAt: Scalars['ISO8601DateTime'];
};

export enum ProTierEnum {
  /** Aozora Pro (only hides ads) */
  AoPro = 'AO_PRO',
  /** Aozora Pro+ (only hides ads) */
  AoProPlus = 'AO_PRO_PLUS',
  /** Basic tier of Kitsu Pro */
  Pro = 'PRO',
  /** Top tier of Kitsu Pro */
  Patron = 'PATRON'
}

/** Autogenerated return type of ProUnsubscribe */
export type ProUnsubscribePayload = {
  __typename?: 'ProUnsubscribePayload';
  expiresAt?: Maybe<Scalars['ISO8601DateTime']>;
};

/** A company involved in the creation or localization of media */
export type Producer = WithTimestamps & {
  __typename?: 'Producer';
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  /** The name of this production company */
  name: Scalars['String'];
  updatedAt: Scalars['ISO8601DateTime'];
};

/** A user profile on Kitsu */
export type Profile = WithTimestamps & {
  __typename?: 'Profile';
  /** A short biographical blurb about this profile */
  about?: Maybe<Scalars['String']>;
  /** An avatar image to easily identify this profile */
  avatarImage?: Maybe<Image>;
  /** A banner to display at the top of the profile */
  bannerImage?: Maybe<Image>;
  /** When the user was born */
  birthday?: Maybe<Scalars['ISO8601Date']>;
  /** All comments to any post this user has made. */
  comments: CommentConnection;
  createdAt: Scalars['ISO8601DateTime'];
  /** Favorite media, characters, and people */
  favorites: FavoriteConnection;
  /** People that follow the user */
  followers: ProfileConnection;
  /** People the user is following */
  following: ProfileConnection;
  /** What the user identifies as */
  gender?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** The user library of their media */
  library: Library;
  /** A list of library events for this user */
  libraryEvents: LibraryEventConnection;
  /** The user's general location */
  location?: Maybe<Scalars['String']>;
  /** Media reactions written by this user. */
  mediaReactions: MediaReactionConnection;
  /** A non-unique publicly visible name for the profile. Minimum of 3 characters and any valid Unicode character */
  name: Scalars['String'];
  /** Post pinned to the user profile */
  pinnedPost?: Maybe<Post>;
  /** All posts this profile has made. */
  posts: PostConnection;
  /** The message this user has submitted to the Hall of Fame */
  proMessage?: Maybe<Scalars['String']>;
  /** The PRO level the user currently has */
  proTier?: Maybe<ProTierEnum>;
  /** Reviews created by this user */
  reviews?: Maybe<ReviewConnection>;
  /** Links to the user on other (social media) sites. */
  siteLinks?: Maybe<SiteLinkConnection>;
  /** The URL-friendly identifier for this profile */
  slug?: Maybe<Scalars['String']>;
  /** The different stats we calculate for this user. */
  stats: ProfileStats;
  updatedAt: Scalars['ISO8601DateTime'];
  /** A fully qualified URL to the profile */
  url?: Maybe<Scalars['String']>;
  /** The character this profile has declared as their waifu or husbando */
  waifu?: Maybe<Character>;
  /** The properly-gendered term for the user's waifu. This should normally only be 'Waifu' or 'Husbando' but some people are jerks, including the person who wrote this... */
  waifuOrHusbando?: Maybe<Scalars['String']>;
  /** Wiki submissions created by this user */
  wikiSubmissions: WikiSubmissionConnection;
};


/** A user profile on Kitsu */
export type ProfileCommentsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** A user profile on Kitsu */
export type ProfileFavoritesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** A user profile on Kitsu */
export type ProfileFollowersArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Maybe<FollowSortOption>>>;
};


/** A user profile on Kitsu */
export type ProfileFollowingArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Maybe<FollowSortOption>>>;
};


/** A user profile on Kitsu */
export type ProfileLibraryEventsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  kind?: Maybe<Array<LibraryEventKindEnum>>;
};


/** A user profile on Kitsu */
export type ProfileMediaReactionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** A user profile on Kitsu */
export type ProfilePostsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Maybe<PostSortOption>>>;
};


/** A user profile on Kitsu */
export type ProfileReviewsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Maybe<WikiSubmissionSortOption>>>;
};


/** A user profile on Kitsu */
export type ProfileSiteLinksArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** A user profile on Kitsu */
export type ProfileWikiSubmissionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Maybe<WikiSubmissionSortOption>>>;
  statuses?: Maybe<Array<WikiSubmissionStatusEnum>>;
};

/** The connection type for Profile. */
export type ProfileConnection = {
  __typename?: 'ProfileConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ProfileEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Profile>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total amount of nodes. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type ProfileEdge = {
  __typename?: 'ProfileEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Profile>;
};

/** The different types of user stats that we calculate. */
export type ProfileStats = {
  __typename?: 'ProfileStats';
  /** The total amount of anime you have watched over your whole life. */
  animeAmountConsumed: AnimeAmountConsumed;
  /** The breakdown of the different categories related to the anime you have completed */
  animeCategoryBreakdown: AnimeCategoryBreakdown;
  /** The total amount of manga you ahve read over your whole life. */
  mangaAmountConsumed: MangaAmountConsumed;
  /** The breakdown of the different categories related to the manga you have completed */
  mangaCategoryBreakdown: MangaCategoryBreakdown;
};

export type Query = {
  __typename?: 'Query';
  /** All Anime in the Kitsu database */
  anime: AnimeConnection;
  /** All Anime with specific Status */
  animeByStatus?: Maybe<AnimeConnection>;
  /** All Categories in the Kitsu Database */
  categories?: Maybe<CategoryConnection>;
  /** Kitsu account details. You must supply an Authorization token in header. */
  currentAccount?: Maybe<Account>;
  /** Find a single Anime by ID */
  findAnimeById?: Maybe<Anime>;
  /** Find a single Anime by Slug */
  findAnimeBySlug?: Maybe<Anime>;
  /** Find a single Category by ID */
  findCategoryById?: Maybe<Category>;
  /** Find a single Category by Slug */
  findCategoryBySlug?: Maybe<Category>;
  /** Find a single Character by ID */
  findCharacterById?: Maybe<Character>;
  /** Find a single Character by Slug */
  findCharacterBySlug?: Maybe<Character>;
  /** Find a single Library Entry by ID */
  findLibraryEntryById?: Maybe<LibraryEntry>;
  /** Find a single Library Event by ID */
  findLibraryEventById?: Maybe<LibraryEvent>;
  /** Find a single Manga by ID */
  findMangaById?: Maybe<Manga>;
  /** Find a single Manga by Slug */
  findMangaBySlug?: Maybe<Manga>;
  /** Find a single Person by ID */
  findPersonById?: Maybe<Person>;
  /** Find a single Person by Slug */
  findPersonBySlug?: Maybe<Person>;
  /** Find a single Post by ID */
  findPostById?: Maybe<Post>;
  /** Find a single User by ID */
  findProfileById?: Maybe<Profile>;
  /** Find a single User by Slug */
  findProfileBySlug?: Maybe<Profile>;
  /** Find a single Report by ID */
  findReportById?: Maybe<Report>;
  /** Find a single Wiki Submission by ID */
  findWikiSubmissionById?: Maybe<WikiSubmission>;
  /** All Franchise in the Kitsu database */
  franchises?: Maybe<FranchiseConnection>;
  /** List trending media on Kitsu */
  globalTrending: MediaConnection;
  /** List of Library Entries by MediaType and MediaId */
  libraryEntriesByMedia?: Maybe<LibraryEntryConnection>;
  /** List of Library Entries by MediaType */
  libraryEntriesByMediaType?: Maybe<LibraryEntryConnection>;
  /** List trending media within your network */
  localTrending: MediaConnection;
  /** Find a specific Mapping Item by External ID and External Site. */
  lookupMapping?: Maybe<MappingItemUnion>;
  /** All Manga in the Kitsu database */
  manga: MangaConnection;
  /** All Manga with specific Status */
  mangaByStatus?: Maybe<MangaConnection>;
  /** Patrons sorted by a Proprietary Magic Algorithm */
  patrons: ProfileConnection;
  /** Random anime or manga */
  randomMedia: Media;
  /** All Reports in the Kitsu database */
  reports?: Maybe<ReportConnection>;
  /** Select all Reports that match with a supplied status. */
  reportsByStatus?: Maybe<ReportConnection>;
  /** Search for Anime by title using Algolia. The most relevant results will be at the top. */
  searchAnimeByTitle: AnimeConnection;
  /** Search for Manga by title using Algolia. The most relevant results will be at the top. */
  searchMangaByTitle: MangaConnection;
  /** Search for any media (Anime, Manga) by title using Algolia. If no media_type is supplied, it will search for both. The most relevant results will be at the top. */
  searchMediaByTitle: MediaConnection;
  /** Search for User by username using Algolia. The most relevant results will be at the top. */
  searchProfileByUsername?: Maybe<ProfileConnection>;
  /** Get your current session info */
  session: Session;
  /** Select all Wiki Submissions that match with a supplied status. */
  wikiSubmissionsByStatuses?: Maybe<WikiSubmissionConnection>;
};


export type QueryAnimeArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryAnimeByStatusArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  status: ReleaseStatusEnum;
};


export type QueryCategoriesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryFindAnimeByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindAnimeBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryFindCategoryByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindCategoryBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryFindCharacterByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindCharacterBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryFindLibraryEntryByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindLibraryEventByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindMangaByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindMangaBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryFindPersonByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindPersonBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryFindPostByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindProfileByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindProfileBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryFindReportByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindWikiSubmissionByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFranchisesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryGlobalTrendingArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  mediaType: MediaTypeEnum;
};


export type QueryLibraryEntriesByMediaArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  mediaType: MediaTypeEnum;
  mediaId: Scalars['ID'];
};


export type QueryLibraryEntriesByMediaTypeArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  mediaType: MediaTypeEnum;
};


export type QueryLocalTrendingArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  mediaType: MediaTypeEnum;
};


export type QueryLookupMappingArgs = {
  externalId: Scalars['ID'];
  externalSite: MappingExternalSiteEnum;
};


export type QueryMangaArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryMangaByStatusArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  status: ReleaseStatusEnum;
};


export type QueryPatronsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryRandomMediaArgs = {
  mediaType: MediaTypeEnum;
  ageRatings: Array<AgeRatingEnum>;
};


export type QueryReportsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryReportsByStatusArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  statuses?: Maybe<Array<ReportStatusEnum>>;
};


export type QuerySearchAnimeByTitleArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
};


export type QuerySearchMangaByTitleArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
};


export type QuerySearchMediaByTitleArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
  mediaType?: Maybe<MediaTypeEnum>;
};


export type QuerySearchProfileByUsernameArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  username: Scalars['String'];
};


export type QueryWikiSubmissionsByStatusesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Maybe<WikiSubmissionSortOption>>>;
  statuses?: Maybe<Array<WikiSubmissionStatusEnum>>;
};

/** A quote from a media */
export type Quote = WithTimestamps & {
  __typename?: 'Quote';
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  /** The lines of the quote */
  lines: QuoteLineConnection;
  /** The media this quote is excerpted from */
  media: Media;
  updatedAt: Scalars['ISO8601DateTime'];
};


/** A quote from a media */
export type QuoteLinesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** The connection type for Quote. */
export type QuoteConnection = {
  __typename?: 'QuoteConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<QuoteEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Quote>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total amount of nodes. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type QuoteEdge = {
  __typename?: 'QuoteEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Quote>;
};

/** A line in a quote */
export type QuoteLine = WithTimestamps & {
  __typename?: 'QuoteLine';
  /** The character who said this line */
  character: Character;
  /** The line that was spoken */
  content: Scalars['String'];
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  /** The quote this line is in */
  quote: Quote;
  updatedAt: Scalars['ISO8601DateTime'];
};

/** The connection type for QuoteLine. */
export type QuoteLineConnection = {
  __typename?: 'QuoteLineConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<QuoteLineEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<QuoteLine>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total amount of nodes. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type QuoteLineEdge = {
  __typename?: 'QuoteLineEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<QuoteLine>;
};

export enum RatingSystemEnum {
  /** 1-20 displayed as 4 smileys - Awful (1), Meh (8), Good (14) and Great (20) */
  Simple = 'SIMPLE',
  /** 1-20 in increments of 2 displayed as 5 stars in 0.5 star increments */
  Regular = 'REGULAR',
  /** 1-20 in increments of 1 displayed as 1-10 in 0.5 increments */
  Advanced = 'ADVANCED'
}

export enum RecurringBillingServiceEnum {
  /** Bill a credit card via Stripe */
  Stripe = 'STRIPE',
  /** Bill a PayPal account */
  Paypal = 'PAYPAL',
  /** Billed through Apple In-App Subscription */
  Apple = 'APPLE',
  /** Billed through Google Play Subscription */
  GooglePlay = 'GOOGLE_PLAY'
}

export enum ReleaseSeasonEnum {
  /** Released during the Winter season */
  Winter = 'WINTER',
  /** Released during the Spring season */
  Spring = 'SPRING',
  /** Released during the Summer season */
  Summer = 'SUMMER',
  /** Released during the Fall season */
  Fall = 'FALL'
}

export enum ReleaseStatusEnum {
  /** The release date has not been announced yet */
  Tba = 'TBA',
  /** This media is no longer releasing */
  Finished = 'FINISHED',
  /** This media is currently releasing */
  Current = 'CURRENT',
  /** This media is releasing soon */
  Upcoming = 'UPCOMING',
  /** This media is not released yet */
  Unreleased = 'UNRELEASED'
}

/** A report made by a user */
export type Report = WithTimestamps & {
  __typename?: 'Report';
  createdAt: Scalars['ISO8601DateTime'];
  /** Additional information related to why the report was made */
  explanation?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** The moderator who responded to this report */
  moderator?: Maybe<Profile>;
  /** The entity that the report is related to */
  naughty: ReportItemUnion;
  /** The reason for why the report was made */
  reason: ReportReasonEnum;
  /** The user who made this report */
  reporter: Profile;
  /** The resolution status for this report */
  status: ReportStatusEnum;
  updatedAt: Scalars['ISO8601DateTime'];
};

/** The connection type for Report. */
export type ReportConnection = {
  __typename?: 'ReportConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ReportEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Report>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total amount of nodes. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type ReportEdge = {
  __typename?: 'ReportEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Report>;
};

/** Objects which are Reportable */
export type ReportItemUnion = Comment | MediaReaction | Post | Review;

export enum ReportReasonEnum {
  /** Not Safe For Work */
  Nsfw = 'NSFW',
  Offensive = 'OFFENSIVE',
  Spoiler = 'SPOILER',
  /** No bulli! */
  Bullying = 'BULLYING',
  Spam = 'SPAM',
  Other = 'OTHER'
}

export enum ReportStatusEnum {
  Reported = 'REPORTED',
  Resolved = 'RESOLVED',
  Declined = 'DECLINED'
}

/** A media review made by a user */
export type Review = WithTimestamps & {
  __typename?: 'Review';
  /** The author who wrote this review. */
  author: Profile;
  /** The review data */
  content: Scalars['String'];
  createdAt: Scalars['ISO8601DateTime'];
  /** The review data formatted */
  formattedContent: Scalars['String'];
  id: Scalars['ID'];
  /** Does this review contain spoilers from the media */
  isSpoiler: Scalars['Boolean'];
  /** The library entry related to this review. */
  libraryEntry: LibraryEntry;
  /** Users who liked this review */
  likes: ProfileConnection;
  /** The media related to this review. */
  media: Media;
  /** When this review was written based on media progress. */
  progress: Scalars['Int'];
  /** The user rating for this media */
  rating: Scalars['Int'];
  /** Potentially migrated over from hummingbird. */
  source: Scalars['String'];
  updatedAt: Scalars['ISO8601DateTime'];
};


/** A media review made by a user */
export type ReviewLikesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** The connection type for Review. */
export type ReviewConnection = {
  __typename?: 'ReviewConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ReviewEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Review>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total amount of nodes. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type ReviewEdge = {
  __typename?: 'ReviewEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Review>;
};

/** Information about a user session */
export type Session = {
  __typename?: 'Session';
  /** The account associated with this session */
  account?: Maybe<Account>;
  /** Single sign-on token for Nolt */
  noltToken: Scalars['String'];
  /** The profile associated with this session */
  profile?: Maybe<Profile>;
};

/** A link to a user's profile on an external site. */
export type SiteLink = WithTimestamps & {
  __typename?: 'SiteLink';
  /** The user profile the site is linked to. */
  author: Profile;
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['ISO8601DateTime'];
  /** A fully qualified URL of the user profile on an external site. */
  url: Scalars['String'];
};

/** The connection type for SiteLink. */
export type SiteLinkConnection = {
  __typename?: 'SiteLinkConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<SiteLinkEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<SiteLink>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total amount of nodes. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type SiteLinkEdge = {
  __typename?: 'SiteLinkEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<SiteLink>;
};

export enum SitePermissionEnum {
  /** Administrator/staff member of Kitsu */
  Admin = 'ADMIN',
  /** Moderator of community behavior */
  CommunityMod = 'COMMUNITY_MOD',
  /** Maintainer of the Kitsu media database */
  DatabaseMod = 'DATABASE_MOD'
}

export enum SortDirection {
  Ascending = 'ASCENDING',
  Descending = 'DESCENDING'
}

/** Media that is streamable. */
export type Streamable = {
  /** Spoken language is replaced by language of choice. */
  dubs: Array<Scalars['String']>;
  /** Which regions this video is available in. */
  regions: Array<Scalars['String']>;
  /** The site that is streaming this media. */
  streamer: Streamer;
  /** Languages this is translated to. Usually placed at bottom of media. */
  subs: Array<Scalars['String']>;
};

/** The streaming company. */
export type Streamer = WithTimestamps & {
  __typename?: 'Streamer';
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  /** The name of the site that is streaming this media. */
  siteName: Scalars['String'];
  /** Additional media this site is streaming. */
  streamingLinks: StreamingLinkConnection;
  updatedAt: Scalars['ISO8601DateTime'];
  /** Videos of the media being streamed. */
  videos: VideoConnection;
};


/** The streaming company. */
export type StreamerStreamingLinksArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


/** The streaming company. */
export type StreamerVideosArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** The stream link. */
export type StreamingLink = Streamable & WithTimestamps & {
  __typename?: 'StreamingLink';
  createdAt: Scalars['ISO8601DateTime'];
  /** Spoken language is replaced by language of choice. */
  dubs: Array<Scalars['String']>;
  id: Scalars['ID'];
  /** The media being streamed */
  media: Media;
  /** Which regions this video is available in. */
  regions: Array<Scalars['String']>;
  /** The site that is streaming this media. */
  streamer: Streamer;
  /** Languages this is translated to. Usually placed at bottom of media. */
  subs: Array<Scalars['String']>;
  updatedAt: Scalars['ISO8601DateTime'];
  /** Fully qualified URL for the streaming link. */
  url: Scalars['String'];
};

/** The connection type for StreamingLink. */
export type StreamingLinkConnection = {
  __typename?: 'StreamingLinkConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<StreamingLinkEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<StreamingLink>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total amount of nodes. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type StreamingLinkEdge = {
  __typename?: 'StreamingLinkEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<StreamingLink>;
};

export enum TitleLanguagePreferenceEnum {
  /** Prefer the most commonly-used title for media */
  Canonical = 'CANONICAL',
  /** Prefer the romanized title for media */
  Romanized = 'ROMANIZED',
  /** Prefer the localized title for media */
  Localized = 'LOCALIZED'
}

export type TitlesList = {
  __typename?: 'TitlesList';
  /** A list of additional, alternative, abbreviated, or unofficial titles */
  alternatives?: Maybe<Array<Scalars['String']>>;
  /** The official or de facto international title */
  canonical?: Maybe<Scalars['String']>;
  /** The locale code that identifies which title is used as the canonical title */
  canonicalLocale?: Maybe<Scalars['String']>;
  /** The list of localized titles keyed by locale */
  localized: Scalars['Map'];
};


export type TitlesListLocalizedArgs = {
  locales?: Maybe<Array<Scalars['String']>>;
};

export type TitlesListInput = {
  canonical?: Maybe<Scalars['String']>;
  localized?: Maybe<Scalars['Map']>;
  alternatives?: Maybe<Array<Scalars['String']>>;
  canonicalLocale?: Maybe<Scalars['String']>;
};

/** Media units such as episodes or chapters */
export type Unit = {
  /** A brief summary or description of the unit */
  description: Scalars['Map'];
  id: Scalars['ID'];
  /** The sequence number of this unit */
  number: Scalars['Int'];
  /** A thumbnail image for the unit */
  thumbnail?: Maybe<Image>;
  /** The titles for this unit in various locales */
  titles: TitlesList;
};


/** Media units such as episodes or chapters */
export type UnitDescriptionArgs = {
  locales?: Maybe<Array<Scalars['String']>>;
};


/** The media video. */
export type Video = Streamable & WithTimestamps & {
  __typename?: 'Video';
  createdAt: Scalars['ISO8601DateTime'];
  /** Spoken language is replaced by language of choice. */
  dubs: Array<Scalars['String']>;
  /** The episode of this video */
  episode: Episode;
  id: Scalars['ID'];
  /** Which regions this video is available in. */
  regions: Array<Scalars['String']>;
  /** The site that is streaming this media. */
  streamer: Streamer;
  /** Languages this is translated to. Usually placed at bottom of media. */
  subs: Array<Scalars['String']>;
  updatedAt: Scalars['ISO8601DateTime'];
  /** The url of the video. */
  url: Scalars['String'];
};

/** The connection type for Video. */
export type VideoConnection = {
  __typename?: 'VideoConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<VideoEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Video>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total amount of nodes. */
  totalCount: Scalars['Int'];
};

/** An edge in a connection. */
export type VideoEdge = {
  __typename?: 'VideoEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Video>;
};

/** A manga volume which can contain multiple chapters. */
export type Volume = WithTimestamps & {
  __typename?: 'Volume';
  /** The chapters in this volume. */
  chapters?: Maybe<ChapterConnection>;
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  /** The isbn number of this volume. */
  isbn: Array<Scalars['String']>;
  /** The manga this volume is in. */
  manga: Manga;
  /** The volume number. */
  number: Scalars['Int'];
  /** The date when this chapter was released. */
  published?: Maybe<Scalars['ISO8601Date']>;
  /** The titles for this chapter in various locales */
  titles: TitlesList;
  updatedAt: Scalars['ISO8601DateTime'];
};


/** A manga volume which can contain multiple chapters. */
export type VolumeChaptersArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** A Wiki Submission is used to either create or edit existing data in our database. This will allow a simple and convient way for users to submit issues/corrections without all the work being left to the mods. */
export type WikiSubmission = WithTimestamps & {
  __typename?: 'WikiSubmission';
  /** The user who created this draft */
  author: Profile;
  createdAt: Scalars['ISO8601DateTime'];
  /** The full object that holds all the details for any modifications/additions/deletions made to the entity you are editing. This will be validated using JSON Schema. */
  data?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  /** Any additional information that may need to be provided related to the Wiki Submission */
  notes?: Maybe<Scalars['String']>;
  /** The status of the Wiki Submission */
  status: WikiSubmissionStatusEnum;
  /** The title given to the Wiki Submission. This will default to the title of what is being edited. */
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['ISO8601DateTime'];
};

/** The connection type for WikiSubmission. */
export type WikiSubmissionConnection = {
  __typename?: 'WikiSubmissionConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<WikiSubmissionEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<WikiSubmission>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The total amount of nodes. */
  totalCount: Scalars['Int'];
};

export type WikiSubmissionCreateDraftInput = {
  data: Scalars['JSON'];
  title?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of WikiSubmissionCreateDraft */
export type WikiSubmissionCreateDraftPayload = {
  __typename?: 'WikiSubmissionCreateDraftPayload';
  errors?: Maybe<Array<Error>>;
  wikiSubmission?: Maybe<WikiSubmission>;
};

/** An edge in a connection. */
export type WikiSubmissionEdge = {
  __typename?: 'WikiSubmissionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<WikiSubmission>;
};

export type WikiSubmissionMutations = {
  __typename?: 'WikiSubmissionMutations';
  /** Create a wiki submission draft */
  createDraft?: Maybe<WikiSubmissionCreateDraftPayload>;
  /** Submit a wiki submission draft */
  submitDraft?: Maybe<WikiSubmissionSubmitDraftPayload>;
  /** Update a wiki submission draft */
  updateDraft?: Maybe<WikiSubmissionUpdateDraftPayload>;
};


export type WikiSubmissionMutationsCreateDraftArgs = {
  input: WikiSubmissionCreateDraftInput;
};


export type WikiSubmissionMutationsSubmitDraftArgs = {
  input: WikiSubmissionSubmitDraftInput;
};


export type WikiSubmissionMutationsUpdateDraftArgs = {
  input: WikiSubmissionUpdateDraftInput;
};

export enum WikiSubmissionSortEnum {
  CreatedAt = 'CREATED_AT',
  UpdatedAt = 'UPDATED_AT'
}

export type WikiSubmissionSortOption = {
  on: WikiSubmissionSortEnum;
  direction: SortDirection;
};

export enum WikiSubmissionStatusEnum {
  Draft = 'DRAFT',
  Pending = 'PENDING',
  Approved = 'APPROVED',
  Rejected = 'REJECTED'
}

export type WikiSubmissionSubmitDraftInput = {
  id: Scalars['ID'];
  data: Scalars['JSON'];
  title?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of WikiSubmissionSubmitDraft */
export type WikiSubmissionSubmitDraftPayload = {
  __typename?: 'WikiSubmissionSubmitDraftPayload';
  errors?: Maybe<Array<Error>>;
  wikiSubmission?: Maybe<WikiSubmission>;
};

export type WikiSubmissionUpdateDraftInput = {
  id: Scalars['ID'];
  data: Scalars['JSON'];
  notes?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of WikiSubmissionUpdateDraft */
export type WikiSubmissionUpdateDraftPayload = {
  __typename?: 'WikiSubmissionUpdateDraftPayload';
  errors?: Maybe<Array<Error>>;
  wikiSubmission?: Maybe<WikiSubmission>;
};

export type WithTimestamps = {
  createdAt: Scalars['ISO8601DateTime'];
  updatedAt: Scalars['ISO8601DateTime'];
};

export type ReportsQueryVariables = Exact<{
  first: Scalars['Int'];
}>;


export type ReportsQuery = (
  { __typename?: 'Query' }
  & { reports?: Maybe<(
    { __typename?: 'ReportConnection' }
    & { nodes?: Maybe<Array<Maybe<(
      { __typename?: 'Report' }
      & Pick<Report, 'createdAt' | 'id' | 'explanation' | 'reason' | 'status' | 'updatedAt'>
      & { reporter: (
        { __typename?: 'Profile' }
        & UserFragment
      ), moderator?: Maybe<(
        { __typename?: 'Profile' }
        & UserFragment
      )>, naughty: (
        { __typename: 'Comment' }
        & Pick<Comment, 'id' | 'content'>
        & { author: (
          { __typename?: 'Profile' }
          & UserFragment
        ) }
      ) | (
        { __typename: 'MediaReaction' }
        & Pick<MediaReaction, 'id' | 'reaction'>
        & { author: (
          { __typename?: 'Profile' }
          & UserFragment
        ), media: (
          { __typename?: 'Anime' }
          & Media_Anime_Fragment
        ) | (
          { __typename?: 'Manga' }
          & Media_Manga_Fragment
        ) }
      ) | (
        { __typename: 'Post' }
        & Pick<Post, 'id' | 'content'>
        & { author: (
          { __typename?: 'Profile' }
          & UserFragment
        ), postMedia?: Maybe<(
          { __typename?: 'Anime' }
          & Media_Anime_Fragment
        ) | (
          { __typename?: 'Manga' }
          & Media_Manga_Fragment
        )> }
      ) | { __typename: 'Review' } }
    )>>> }
  )> }
);

type Media_Anime_Fragment = (
  { __typename?: 'Anime' }
  & { titles: (
    { __typename?: 'TitlesList' }
    & Pick<TitlesList, 'canonical'>
  ), posterImage: (
    { __typename?: 'Image' }
    & { original: (
      { __typename?: 'ImageView' }
      & Pick<ImageView, 'url'>
    ) }
  ) }
);

type Media_Manga_Fragment = (
  { __typename?: 'Manga' }
  & { titles: (
    { __typename?: 'TitlesList' }
    & Pick<TitlesList, 'canonical'>
  ), posterImage: (
    { __typename?: 'Image' }
    & { original: (
      { __typename?: 'ImageView' }
      & Pick<ImageView, 'url'>
    ) }
  ) }
);

export type MediaFragment = Media_Anime_Fragment | Media_Manga_Fragment;

export type UserFragment = (
  { __typename?: 'Profile' }
  & Pick<Profile, 'id' | 'name' | 'slug' | 'url'>
  & { avatarImage?: Maybe<(
    { __typename?: 'Image' }
    & { original: (
      { __typename?: 'ImageView' }
      & Pick<ImageView, 'url'>
    ) }
  )> }
);

export type TestQueryVariables = Exact<{ [key: string]: never; }>;


export type TestQuery = (
  { __typename?: 'Query' }
  & { anime: (
    { __typename?: 'AnimeConnection' }
    & { nodes?: Maybe<Array<Maybe<(
      { __typename?: 'Anime' }
      & { titles: (
        { __typename?: 'TitlesList' }
        & Pick<TitlesList, 'canonical'>
      ) }
    )>>> }
  ) }
);

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