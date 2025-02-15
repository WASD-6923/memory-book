import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: any; output: any; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  DateTimeTz: { input: any; output: any; }
  Email: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Mixed: { input: any; output: any; }
  Null: { input: any; output: any; }
  ShortTime: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type AdminStatistics = {
  __typename?: 'AdminStatistics';
  groups: Scalars['Int']['output'];
  meetings: Scalars['Int']['output'];
  users: Scalars['Int']['output'];
};

export type Attachment = {
  __typename?: 'Attachment';
  attached_id: Scalars['String']['output'];
  attached_type: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  path: Scalars['String']['output'];
  type: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type Auth = {
  __typename?: 'Auth';
  accessToken?: Maybe<Scalars['String']['output']>;
  authMethod?: Maybe<AuthMethod>;
  error: Scalars['Boolean']['output'];
  errorMessage?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export enum AuthMethod {
  Login = 'LOGIN',
  Register = 'REGISTER'
}

export enum AuthProvider {
  Smsup = 'SMSUP',
  Telegram = 'TELEGRAM'
}

export enum AuthStage {
  CheckCode = 'CHECK_CODE',
  Login = 'LOGIN',
  Register = 'REGISTER'
}

export type Book = {
  __typename?: 'Book';
  author: User;
  bookGroups: Array<BookGroup>;
  book_author?: Maybe<Scalars['String']['output']>;
  cover?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  created_by?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  groups: Array<Group>;
  id: Scalars['ID']['output'];
  isbn?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  pages?: Maybe<Scalars['Int']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  publisher?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
  updated_by?: Maybe<Scalars['String']['output']>;
  updater: User;
  year?: Maybe<Scalars['Int']['output']>;
};

export enum BookColumns {
  BookAuthor = 'BOOK_AUTHOR',
  CreatedAt = 'CREATED_AT',
  Id = 'ID',
  Isbn = 'ISBN',
  Price = 'PRICE',
  Title = 'TITLE',
  UpdatedAt = 'UPDATED_AT',
  Year = 'YEAR'
}

export type BookFilter = {
  id?: InputMaybe<Scalars['String']['input']>;
  priceGte?: InputMaybe<Scalars['Int']['input']>;
  priceLte?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  yearGte?: InputMaybe<Scalars['Int']['input']>;
  yearLte?: InputMaybe<Scalars['Int']['input']>;
};

export type BookGroup = {
  __typename?: 'BookGroup';
  author: User;
  book: Book;
  book_id: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  created_by: Scalars['String']['output'];
  group: Group;
  group_id: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  price?: Maybe<Scalars['Float']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  updated_at: Scalars['DateTime']['output'];
  updated_by: Scalars['String']['output'];
  updater: User;
};

export enum BookGroupColumns {
  BookId = 'BOOK_ID',
  CreatedAt = 'CREATED_AT',
  GroupId = 'GROUP_ID',
  Id = 'ID',
  Price = 'PRICE',
  Quantity = 'QUANTITY',
  UpdatedAt = 'UPDATED_AT'
}

export type BookGroupFilter = {
  book_id?: InputMaybe<Scalars['String']['input']>;
  group_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  priceGte?: InputMaybe<Scalars['Int']['input']>;
  priceLte?: InputMaybe<Scalars['Int']['input']>;
  quantityGte?: InputMaybe<Scalars['Int']['input']>;
  quantityLte?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

/** A paginated list of BookGroup items. */
export type BookGroupPaginator = {
  __typename?: 'BookGroupPaginator';
  /** A list of BookGroup items. */
  data: Array<BookGroup>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type BookGroupUpdateInput = {
  book_id?: InputMaybe<Scalars['String']['input']>;
  group_id?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

/** A paginated list of Book items. */
export type BookPaginator = {
  __typename?: 'BookPaginator';
  /** A list of Book items. */
  data: Array<Book>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type BookUpdateInput = {
  book_author?: InputMaybe<Scalars['String']['input']>;
  cover?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isbn?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  pages?: InputMaybe<Scalars['Int']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  publisher?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type City = {
  __typename?: 'City';
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  region: Region;
  region_id?: Maybe<Scalars['String']['output']>;
  time_zone?: Maybe<Scalars['String']['output']>;
};

export enum CityColumns {
  Id = 'ID',
  Name = 'NAME',
  RegionId = 'REGION_ID'
}

export type CityFilter = {
  region_id?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

/** A paginated list of City items. */
export type CityPaginator = {
  __typename?: 'CityPaginator';
  /** A list of City items. */
  data: Array<City>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type CityUpdateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  region_id?: InputMaybe<Scalars['String']['input']>;
};

export type Daily = {
  __typename?: 'Daily';
  content: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  date: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  sources: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export enum DailyColumns {
  CreatedAt = 'CREATED_AT',
  Date = 'DATE',
  Id = 'ID',
  Name = 'NAME',
  UpdatedAt = 'UPDATED_AT'
}

export type DailyFilter = {
  date?: InputMaybe<Scalars['Date']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

/** A paginated list of Daily items. */
export type DailyPaginator = {
  __typename?: 'DailyPaginator';
  /** A list of Daily items. */
  data: Array<Daily>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type DailyUpdateInput = {
  content: Scalars['String']['input'];
  date?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sources: Scalars['String']['input'];
};

export type ExportFile = {
  __typename?: 'ExportFile';
  path?: Maybe<Scalars['String']['output']>;
};

export type Group = {
  __typename?: 'Group';
  address?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  balance: Scalars['Float']['output'];
  birthday?: Maybe<Scalars['Date']['output']>;
  city?: Maybe<City>;
  city_id: Scalars['String']['output'];
  created_at?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  friday?: Maybe<Scalars['DateTimeTz']['output']>;
  id: Scalars['ID']['output'];
  lat?: Maybe<Scalars['Float']['output']>;
  lon?: Maybe<Scalars['Float']['output']>;
  monday?: Maybe<Scalars['DateTimeTz']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  saturday?: Maybe<Scalars['DateTimeTz']['output']>;
  sunday?: Maybe<Scalars['DateTimeTz']['output']>;
  telegram?: Maybe<Scalars['String']['output']>;
  thursday?: Maybe<Scalars['DateTimeTz']['output']>;
  tuesday?: Maybe<Scalars['DateTimeTz']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  user: User;
  wednesday?: Maybe<Scalars['DateTimeTz']['output']>;
};

export enum GroupColumns {
  Birthday = 'BIRTHDAY',
  CityId = 'CITY_ID',
  CreatedAt = 'CREATED_AT',
  Id = 'ID',
  Name = 'NAME',
  UpdatedAt = 'UPDATED_AT'
}

export type GroupFilter = {
  city_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

/** A paginated list of Group items. */
export type GroupPaginator = {
  __typename?: 'GroupPaginator';
  /** A list of Group items. */
  data: Array<Group>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type GroupUpdateInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  birthday?: InputMaybe<Scalars['String']['input']>;
  city_id?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  friday?: InputMaybe<Scalars['String']['input']>;
  lat?: InputMaybe<Scalars['Float']['input']>;
  lon?: InputMaybe<Scalars['Float']['input']>;
  monday?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  saturday?: InputMaybe<Scalars['String']['input']>;
  sunday?: InputMaybe<Scalars['String']['input']>;
  telegram?: InputMaybe<Scalars['String']['input']>;
  thursday?: InputMaybe<Scalars['String']['input']>;
  tuesday?: InputMaybe<Scalars['String']['input']>;
  wednesday?: InputMaybe<Scalars['String']['input']>;
};

export type InfoSource = {
  __typename?: 'InfoSource';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  created_by: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  updated_by: Scalars['String']['output'];
};

export enum InfoSourceColumns {
  CreatedAt = 'CREATED_AT',
  Id = 'ID',
  UpdatedAt = 'UPDATED_AT',
  Name = 'name'
}

export type InfoSourceFilter = {
  search?: InputMaybe<Scalars['String']['input']>;
};

/** A paginated list of InfoSource items. */
export type InfoSourcePaginator = {
  __typename?: 'InfoSourcePaginator';
  /** A list of InfoSource items. */
  data: Array<InfoSource>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type InfoSourceUpdateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type InfoSourcesBelongsToMany = {
  connect?: InputMaybe<Array<Scalars['ID']['input']>>;
  sync?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type Location = {
  __typename?: 'Location';
  address?: Maybe<Scalars['String']['output']>;
  attachments: Array<Attachment>;
  author: User;
  city: City;
  city_id: Scalars['String']['output'];
  contacts?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  created_by: Scalars['String']['output'];
  curator?: Maybe<User>;
  curator_id?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  installation_date?: Maybe<Scalars['Date']['output']>;
  is_required_maintenance?: Maybe<Scalars['Boolean']['output']>;
  last_maintenance?: Maybe<Scalars['Date']['output']>;
  lat?: Maybe<Scalars['Float']['output']>;
  lon?: Maybe<Scalars['Float']['output']>;
  maintenance_period?: Maybe<Scalars['Int']['output']>;
  status: LocationStatus;
  type: LocationType;
  updated_at: Scalars['DateTime']['output'];
  updated_by: Scalars['String']['output'];
  updater: User;
};

export enum LocationColumns {
  Address = 'ADDRESS',
  CityId = 'CITY_ID',
  CreatedAt = 'CREATED_AT',
  CuratorId = 'CURATOR_ID',
  Id = 'ID',
  InstallationDate = 'INSTALLATION_DATE',
  IsRequiredMaintenance = 'IS_REQUIRED_MAINTENANCE',
  LastMaintenance = 'LAST_MAINTENANCE',
  MaintenancePeriod = 'MAINTENANCE_PERIOD',
  Status = 'STATUS',
  Type = 'TYPE',
  UpdatedAt = 'UPDATED_AT'
}

export type LocationEvent = {
  __typename?: 'LocationEvent';
  author: User;
  created_at: Scalars['DateTime']['output'];
  created_by: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  location: Location;
  location_id: Scalars['String']['output'];
  status?: Maybe<LocationStatus>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  updated_by?: Maybe<Scalars['String']['output']>;
  updater: User;
};

export enum LocationEventColumns {
  Id = 'ID',
  LocationId = 'LOCATION_ID',
  Status = 'STATUS'
}

export type LocationEventFilter = {
  id?: InputMaybe<Scalars['String']['input']>;
  location_id?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

/** A paginated list of LocationEvent items. */
export type LocationEventPaginator = {
  __typename?: 'LocationEventPaginator';
  /** A list of LocationEvent items. */
  data: Array<LocationEvent>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type LocationEventUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  location_id?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<LocationStatus>;
};

export type LocationFilter = {
  city?: InputMaybe<Scalars['String']['input']>;
  curator_id?: InputMaybe<Scalars['String']['input']>;
  installation_date?: InputMaybe<Scalars['String']['input']>;
  is_required_maintenance?: InputMaybe<Scalars['String']['input']>;
  last_maintenance?: InputMaybe<Scalars['String']['input']>;
  maintenance_period?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** A paginated list of Location items. */
export type LocationPaginator = {
  __typename?: 'LocationPaginator';
  /** A list of Location items. */
  data: Array<Location>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export enum LocationStatus {
  Draft = 'DRAFT',
  Fail = 'FAIL',
  Success = 'SUCCESS',
  Terminated = 'TERMINATED'
}

export enum LocationType {
  Stand = 'STAND'
}

export type LocationUpdateInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  city_id?: InputMaybe<Scalars['String']['input']>;
  contacts?: InputMaybe<Scalars['String']['input']>;
  curator_id?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  files?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  installation_date?: InputMaybe<Scalars['Date']['input']>;
  is_required_maintenance?: InputMaybe<Scalars['Boolean']['input']>;
  last_maintenance?: InputMaybe<Scalars['Date']['input']>;
  lat?: InputMaybe<Scalars['Float']['input']>;
  lon?: InputMaybe<Scalars['Float']['input']>;
  maintenance_period?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<LocationStatus>;
  type?: InputMaybe<LocationType>;
};

export type LoginInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type Meeting = {
  __typename?: 'Meeting';
  author: User;
  cash?: Maybe<Scalars['Int']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  created_by: Scalars['String']['output'];
  date?: Maybe<Scalars['Date']['output']>;
  group: Group;
  group_id: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  moderator?: Maybe<User>;
  moderator_id?: Maybe<Scalars['String']['output']>;
  moderator_name?: Maybe<Scalars['String']['output']>;
  non_cash?: Maybe<Scalars['Int']['output']>;
  number_of_newcomers?: Maybe<Scalars['Int']['output']>;
  number_of_participants?: Maybe<Scalars['Int']['output']>;
  topic?: Maybe<Scalars['String']['output']>;
  topic_by_daily_planner?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  updated_by: Scalars['String']['output'];
  updater: User;
};

export enum MeetingColumns {
  CreatedAt = 'CREATED_AT',
  Date = 'DATE',
  GroupId = 'GROUP_ID',
  Id = 'ID',
  ModeratorId = 'MODERATOR_ID',
  UpdatedAt = 'UPDATED_AT'
}

export type MeetingFilter = {
  group_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

/** A paginated list of Meeting items. */
export type MeetingPaginator = {
  __typename?: 'MeetingPaginator';
  /** A list of Meeting items. */
  data: Array<Meeting>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type MeetingUpdateInput = {
  cash?: InputMaybe<Scalars['Int']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  group_id?: InputMaybe<Scalars['String']['input']>;
  moderator_id?: InputMaybe<Scalars['String']['input']>;
  moderator_name?: InputMaybe<Scalars['String']['input']>;
  non_cash?: InputMaybe<Scalars['Int']['input']>;
  number_of_newcomers?: InputMaybe<Scalars['Int']['input']>;
  number_of_participants?: InputMaybe<Scalars['Int']['input']>;
  topic?: InputMaybe<Scalars['String']['input']>;
  topic_by_daily_planner?: InputMaybe<Scalars['String']['input']>;
};

export type ModelPosition = {
  id?: InputMaybe<Scalars['ID']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  attachmentDelete?: Maybe<Attachment>;
  bookCreate?: Maybe<Book>;
  bookDelete?: Maybe<Book>;
  bookGroupCreate?: Maybe<BookGroup>;
  bookGroupDelete?: Maybe<BookGroup>;
  bookGroupUpdate?: Maybe<BookGroup>;
  bookUpdate?: Maybe<Book>;
  cityCreate?: Maybe<City>;
  cityDelete?: Maybe<City>;
  cityUpdate?: Maybe<City>;
  dailyCreate: Daily;
  dailyDelete?: Maybe<Daily>;
  dailyUpdate: Daily;
  groupCreate: Group;
  groupDelete?: Maybe<Group>;
  groupUpdate: Group;
  infoSourceCreate: InfoSource;
  infoSourceDelete?: Maybe<InfoSource>;
  infoSourceUpdate: InfoSource;
  locationCreate?: Maybe<Location>;
  locationDelete?: Maybe<Location>;
  locationEventCreate?: Maybe<LocationEvent>;
  locationEventDelete?: Maybe<LocationEvent>;
  locationEventUpdate?: Maybe<LocationEvent>;
  locationUpdate?: Maybe<Location>;
  markAllAsRead?: Maybe<Scalars['Boolean']['output']>;
  markAsRead?: Maybe<Scalars['Boolean']['output']>;
  meetingCreate?: Maybe<Meeting>;
  meetingDelete?: Maybe<Meeting>;
  meetingUpdate?: Maybe<Meeting>;
  modelReposition?: Maybe<Scalars['Boolean']['output']>;
  newcomerCreate?: Maybe<Newcomer>;
  newcomerDelete?: Maybe<Newcomer>;
  newcomerUpdate?: Maybe<Newcomer>;
  permissionCreate?: Maybe<Permission>;
  permissionDelete?: Maybe<Permission>;
  permissionUpdate?: Maybe<Permission>;
  profileUpdate?: Maybe<Profile>;
  roleCreate?: Maybe<Role>;
  roleDelete?: Maybe<Role>;
  roleUpdate?: Maybe<Role>;
  transactionCreate?: Maybe<Transaction>;
  transactionDelete?: Maybe<Transaction>;
  transactionUpdate?: Maybe<Transaction>;
  userCreate?: Maybe<User>;
  userDelete: User;
  userUpdate?: Maybe<User>;
};


export type MutationAttachmentDeleteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationBookCreateArgs = {
  input: BookUpdateInput;
};


export type MutationBookDeleteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationBookGroupCreateArgs = {
  input: BookGroupUpdateInput;
};


export type MutationBookGroupDeleteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationBookGroupUpdateArgs = {
  id: Scalars['ID']['input'];
  input: BookGroupUpdateInput;
};


export type MutationBookUpdateArgs = {
  id: Scalars['ID']['input'];
  input: BookUpdateInput;
};


export type MutationCityCreateArgs = {
  input: CityUpdateInput;
};


export type MutationCityDeleteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCityUpdateArgs = {
  id: Scalars['ID']['input'];
  input: CityUpdateInput;
};


export type MutationDailyCreateArgs = {
  input: DailyUpdateInput;
};


export type MutationDailyDeleteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDailyUpdateArgs = {
  id: Scalars['ID']['input'];
  input: DailyUpdateInput;
};


export type MutationGroupCreateArgs = {
  input: GroupUpdateInput;
};


export type MutationGroupDeleteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationGroupUpdateArgs = {
  id: Scalars['ID']['input'];
  input: GroupUpdateInput;
};


export type MutationInfoSourceCreateArgs = {
  input: InfoSourceUpdateInput;
};


export type MutationInfoSourceDeleteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationInfoSourceUpdateArgs = {
  id: Scalars['ID']['input'];
  input: InfoSourceUpdateInput;
};


export type MutationLocationCreateArgs = {
  input: LocationUpdateInput;
};


export type MutationLocationDeleteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLocationEventCreateArgs = {
  input: LocationEventUpdateInput;
};


export type MutationLocationEventDeleteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLocationEventUpdateArgs = {
  id: Scalars['ID']['input'];
  input: LocationEventUpdateInput;
};


export type MutationLocationUpdateArgs = {
  id: Scalars['ID']['input'];
  input: LocationUpdateInput;
};


export type MutationMarkAsReadArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationMeetingCreateArgs = {
  input: MeetingUpdateInput;
};


export type MutationMeetingDeleteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationMeetingUpdateArgs = {
  id: Scalars['ID']['input'];
  input: MeetingUpdateInput;
};


export type MutationModelRepositionArgs = {
  input: PositionInput;
};


export type MutationNewcomerCreateArgs = {
  input: NewcomerUpdateInput;
};


export type MutationNewcomerDeleteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationNewcomerUpdateArgs = {
  id: Scalars['ID']['input'];
  input: NewcomerUpdateInput;
};


export type MutationPermissionCreateArgs = {
  input: PermissionInput;
};


export type MutationPermissionDeleteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationPermissionUpdateArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  input: PermissionInput;
};


export type MutationProfileUpdateArgs = {
  id: Scalars['ID']['input'];
  input: ProfileUpdateInput;
};


export type MutationRoleCreateArgs = {
  input: RoleInput;
};


export type MutationRoleDeleteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRoleUpdateArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  input: RoleInput;
};


export type MutationTransactionCreateArgs = {
  input: TransactionUpdateInput;
};


export type MutationTransactionDeleteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationTransactionUpdateArgs = {
  id: Scalars['ID']['input'];
  input: TransactionUpdateInput;
};


export type MutationUserCreateArgs = {
  input: UserCreateInput;
};


export type MutationUserDeleteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUserUpdateArgs = {
  id: Scalars['ID']['input'];
  input: UserUpdateInput;
};

export type Newcomer = {
  __typename?: 'Newcomer';
  age?: Maybe<Scalars['Int']['output']>;
  author: User;
  comment?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  created_by: Scalars['String']['output'];
  curator?: Maybe<User>;
  curator_id?: Maybe<Scalars['String']['output']>;
  date: Scalars['Date']['output'];
  group: Group;
  group_id: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  infoSources: Array<InfoSource>;
  info_source_id?: Maybe<Scalars['String']['output']>;
  is_himself?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  relative?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  updated_by: Scalars['String']['output'];
  updater: User;
};

export enum NewcomerColumns {
  Age = 'AGE',
  CreatedAt = 'CREATED_AT',
  CuratorId = 'CURATOR_ID',
  Date = 'DATE',
  GroupId = 'GROUP_ID',
  Id = 'ID',
  InfoSourceId = 'INFO_SOURCE_ID',
  IsHimself = 'IS_HIMSELF',
  Name = 'NAME',
  Relative = 'RELATIVE',
  UpdatedAt = 'UPDATED_AT'
}

export type NewcomerFilter = {
  curator_id?: InputMaybe<Scalars['Int']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  group_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  info_source_ids?: InputMaybe<Array<Scalars['String']['input']>>;
  is_himself?: InputMaybe<Scalars['Boolean']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

/** A paginated list of Newcomer items. */
export type NewcomerPaginator = {
  __typename?: 'NewcomerPaginator';
  /** A list of Newcomer items. */
  data: Array<Newcomer>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type NewcomerUpdateInput = {
  age?: InputMaybe<Scalars['Int']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  curator_id?: InputMaybe<Scalars['String']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  group_id?: InputMaybe<Scalars['String']['input']>;
  infoSources?: InputMaybe<InfoSourcesBelongsToMany>;
  is_himself: Scalars['Boolean']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  relative?: InputMaybe<Scalars['String']['input']>;
};

export type Notification = {
  __typename?: 'Notification';
  created_at: Scalars['DateTime']['output'];
  data?: Maybe<NotificationDatum>;
  id: Scalars['ID']['output'];
  notifiable_id: Scalars['String']['output'];
  notifiable_type: Scalars['String']['output'];
  read_at?: Maybe<Scalars['DateTime']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export enum NotificationColumns {
  Id = 'ID',
  CreatedAt = 'created_at',
  NotifiableId = 'notifiable_id',
  NotifiableType = 'notifiable_type',
  ReadAt = 'read_at',
  Type = 'type',
  UpdatedAt = 'updated_at'
}

export type NotificationDatum = {
  __typename?: 'NotificationDatum';
  description?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  modelId?: Maybe<Scalars['ID']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type NotificationFilter = {
  read_at?: InputMaybe<Scalars['DateTime']['input']>;
  unRead?: InputMaybe<Scalars['Boolean']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

/** A paginated list of Notification items. */
export type NotificationPaginator = {
  __typename?: 'NotificationPaginator';
  /** A list of Notification items. */
  data: Array<Notification>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars['String']['input'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Aggregate functions when ordering by a relation without specifying a column. */
export enum OrderByRelationAggregateFunction {
  /** Amount of items. */
  Count = 'COUNT'
}

/** Aggregate functions when ordering by a relation that may specify a column. */
export enum OrderByRelationWithColumnAggregateFunction {
  /** Average. */
  Avg = 'AVG',
  /** Amount of items. */
  Count = 'COUNT',
  /** Maximum. */
  Max = 'MAX',
  /** Minimum. */
  Min = 'MIN',
  /** Sum. */
  Sum = 'SUM'
}

/** Information about pagination using a fully featured paginator. */
export type PaginatorInfo = {
  __typename?: 'PaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int']['output'];
  /** Index of the current page. */
  currentPage: Scalars['Int']['output'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']['output']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean']['output'];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']['output']>;
  /** Index of the last available page. */
  lastPage: Scalars['Int']['output'];
  /** Number of items per page. */
  perPage: Scalars['Int']['output'];
  /** Number of total available items. */
  total: Scalars['Int']['output'];
};

export type Permission = {
  __typename?: 'Permission';
  created_at: Scalars['DateTime']['output'];
  group: PermissionGroup;
  guard_name: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export enum PermissionColumns {
  GuardName = 'GUARD_NAME',
  Id = 'ID',
  Name = 'NAME'
}

export type PermissionFilter = {
  guard_name?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Группы пермишенов */
export enum PermissionGroup {
  /** Администрирование */
  Admin = 'ADMIN',
  /** Справочники */
  Dictionary = 'DICTIONARY',
  /** Доступ к пунктам меню */
  Menu = 'MENU'
}

export type PermissionInput = {
  group?: InputMaybe<PermissionGroup>;
  guard_name?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type PermissionsBelongsToMany = {
  connect?: InputMaybe<Array<Scalars['ID']['input']>>;
  sync?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type PositionInput = {
  model?: InputMaybe<Scalars['String']['input']>;
  positions: Array<ModelPosition>;
};

export type Profile = {
  __typename?: 'Profile';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  group?: Maybe<Group>;
  group_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  user: User;
  user_id: Scalars['String']['output'];
};

export enum ProfileColumns {
  CreatedAt = 'CREATED_AT',
  GroupId = 'GROUP_ID',
  Id = 'ID',
  UpdatedAt = 'UPDATED_AT',
  UserId = 'USER_ID'
}

export type ProfileFilter = {
  group_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

/** A paginated list of Profile items. */
export type ProfilePaginator = {
  __typename?: 'ProfilePaginator';
  /** A list of Profile items. */
  data: Array<Profile>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type ProfileUpdateInput = {
  group_id?: InputMaybe<Scalars['String']['input']>;
};

/** Indicates what fields are available at the top level of a query operation. */
export type Query = {
  __typename?: 'Query';
  adminStatistics?: Maybe<AdminStatistics>;
  book?: Maybe<Book>;
  bookGroup?: Maybe<BookGroup>;
  bookGroups: BookGroupPaginator;
  books: BookPaginator;
  cities: CityPaginator;
  city?: Maybe<City>;
  dailies: DailyPaginator;
  daily?: Maybe<Daily>;
  dailyByDate?: Maybe<Daily>;
  group?: Maybe<Group>;
  groups: GroupPaginator;
  infoSource?: Maybe<InfoSource>;
  infoSources: InfoSourcePaginator;
  location?: Maybe<Location>;
  locationEvent?: Maybe<LocationEvent>;
  locationEvents: LocationEventPaginator;
  locations: LocationPaginator;
  login?: Maybe<Auth>;
  logout?: Maybe<Scalars['Boolean']['output']>;
  me: User;
  meeting?: Maybe<Meeting>;
  meetings: MeetingPaginator;
  newcomer?: Maybe<Newcomer>;
  newcomers: NewcomerPaginator;
  notification?: Maybe<Notification>;
  notifications: NotificationPaginator;
  permission: Permission;
  permissions: Array<Permission>;
  profile?: Maybe<Profile>;
  profiles: ProfilePaginator;
  refreshToken: Auth;
  role: Role;
  roles: Array<Role>;
  transaction?: Maybe<Transaction>;
  transactions: TransactionPaginator;
  user?: Maybe<User>;
  users: UserPaginator;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryBookArgs = {
  id: Scalars['ID']['input'];
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryBookGroupArgs = {
  id: Scalars['ID']['input'];
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryBookGroupsArgs = {
  filter?: InputMaybe<BookGroupFilter>;
  first?: Scalars['Int']['input'];
  orderBy?: InputMaybe<Array<QueryBookGroupsOrderByOrderByClause>>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryBooksArgs = {
  filter?: InputMaybe<BookFilter>;
  first?: Scalars['Int']['input'];
  orderBy?: InputMaybe<Array<QueryBooksOrderByOrderByClause>>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryCitiesArgs = {
  filter?: InputMaybe<CityFilter>;
  first?: Scalars['Int']['input'];
  orderBy?: InputMaybe<Array<QueryCitiesOrderByOrderByClause>>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryCityArgs = {
  id: Scalars['ID']['input'];
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryDailiesArgs = {
  filter?: InputMaybe<DailyFilter>;
  first?: Scalars['Int']['input'];
  orderBy?: InputMaybe<Array<QueryDailiesOrderByOrderByClause>>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryDailyArgs = {
  id: Scalars['ID']['input'];
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryDailyByDateArgs = {
  date: Scalars['Date']['input'];
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryGroupArgs = {
  id: Scalars['ID']['input'];
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryGroupsArgs = {
  filter?: InputMaybe<GroupFilter>;
  first?: Scalars['Int']['input'];
  orderBy?: InputMaybe<Array<QueryGroupsOrderByOrderByClause>>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryInfoSourceArgs = {
  id: Scalars['ID']['input'];
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryInfoSourcesArgs = {
  filter?: InputMaybe<InfoSourceFilter>;
  first?: Scalars['Int']['input'];
  orderBy?: InputMaybe<Array<QueryInfoSourcesOrderByOrderByClause>>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryLocationArgs = {
  id: Scalars['ID']['input'];
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryLocationEventArgs = {
  id: Scalars['ID']['input'];
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryLocationEventsArgs = {
  filter?: InputMaybe<LocationEventFilter>;
  first?: Scalars['Int']['input'];
  orderBy?: InputMaybe<Array<QueryLocationEventsOrderByOrderByClause>>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryLocationsArgs = {
  filter?: InputMaybe<LocationFilter>;
  first?: Scalars['Int']['input'];
  orderBy?: InputMaybe<Array<QueryLocationsOrderByOrderByClause>>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryLoginArgs = {
  input: LoginInput;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryMeetingArgs = {
  id: Scalars['ID']['input'];
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryMeetingsArgs = {
  filter?: InputMaybe<MeetingFilter>;
  first?: Scalars['Int']['input'];
  orderBy?: InputMaybe<Array<QueryMeetingsOrderByOrderByClause>>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryNewcomerArgs = {
  id: Scalars['ID']['input'];
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryNewcomersArgs = {
  filter?: InputMaybe<NewcomerFilter>;
  first?: Scalars['Int']['input'];
  orderBy?: InputMaybe<Array<QueryNewcomersOrderByOrderByClause>>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryNotificationArgs = {
  id: Scalars['ID']['input'];
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryNotificationsArgs = {
  filter?: InputMaybe<NotificationFilter>;
  first?: Scalars['Int']['input'];
  orderBy?: InputMaybe<Array<QueryNotificationsOrderByOrderByClause>>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryPermissionArgs = {
  id: Scalars['ID']['input'];
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryPermissionsArgs = {
  orderBy?: InputMaybe<Array<QueryPermissionsOrderByOrderByClause>>;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryProfileArgs = {
  id: Scalars['ID']['input'];
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryProfilesArgs = {
  filter?: InputMaybe<ProfileFilter>;
  first?: Scalars['Int']['input'];
  orderBy?: InputMaybe<Array<QueryProfilesOrderByOrderByClause>>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryRoleArgs = {
  id: Scalars['ID']['input'];
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryRolesArgs = {
  filter?: InputMaybe<RoleFilter>;
  orderBy?: InputMaybe<Array<QueryRolesOrderByOrderByClause>>;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryTransactionArgs = {
  id: Scalars['ID']['input'];
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryTransactionsArgs = {
  filter?: InputMaybe<TransactionFilter>;
  first?: Scalars['Int']['input'];
  orderBy?: InputMaybe<Array<QueryTransactionsOrderByOrderByClause>>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryUsersArgs = {
  filter?: InputMaybe<UserFilter>;
  first?: Scalars['Int']['input'];
  orderBy?: InputMaybe<Array<QueryUsersOrderByOrderByClause>>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

/** Order by clause for Query.bookGroups.orderBy. */
export type QueryBookGroupsOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: BookGroupColumns;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Order by clause for Query.books.orderBy. */
export type QueryBooksOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: BookColumns;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Order by clause for Query.cities.orderBy. */
export type QueryCitiesOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: CityColumns;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Order by clause for Query.dailies.orderBy. */
export type QueryDailiesOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: DailyColumns;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Order by clause for Query.groups.orderBy. */
export type QueryGroupsOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: GroupColumns;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Order by clause for Query.infoSources.orderBy. */
export type QueryInfoSourcesOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: InfoSourceColumns;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Order by clause for Query.locationEvents.orderBy. */
export type QueryLocationEventsOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: LocationEventColumns;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Order by clause for Query.locations.orderBy. */
export type QueryLocationsOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: LocationColumns;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Order by clause for Query.meetings.orderBy. */
export type QueryMeetingsOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: MeetingColumns;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Order by clause for Query.newcomers.orderBy. */
export type QueryNewcomersOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: NewcomerColumns;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Order by clause for Query.notifications.orderBy. */
export type QueryNotificationsOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: NotificationColumns;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Order by clause for Query.permissions.orderBy. */
export type QueryPermissionsOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: PermissionColumns;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Order by clause for Query.profiles.orderBy. */
export type QueryProfilesOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: ProfileColumns;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Order by clause for Query.roles.orderBy. */
export type QueryRolesOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: RoleColumns;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Order by clause for Query.transactions.orderBy. */
export type QueryTransactionsOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: TransactionColumns;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Order by clause for Query.users.orderBy. */
export type QueryUsersOrderByOrderByClause = {
  /** The column that is used for ordering. */
  column: UserColumns;
  /** The direction that is used for ordering. */
  order: SortOrder;
};

export type Region = {
  __typename?: 'Region';
  cities: Array<City>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Role = {
  __typename?: 'Role';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  guard_name: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  permissions?: Maybe<Array<Maybe<Permission>>>;
  title: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export enum RoleColumns {
  Id = 'ID',
  Name = 'NAME',
  Title = 'TITLE'
}

export type RoleFilter = {
  name?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type RoleInput = {
  guard_name?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<PermissionsBelongsToMany>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

export type Subscription = {
  __typename?: 'Subscription';
  notificationCreated?: Maybe<Notification>;
  userCreated?: Maybe<User>;
};

export type Transaction = {
  __typename?: 'Transaction';
  amount?: Maybe<Scalars['Float']['output']>;
  author: User;
  category?: Maybe<TransactionCategory>;
  comment?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  created_by?: Maybe<Scalars['String']['output']>;
  group: Group;
  group_id: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  meeting?: Maybe<Meeting>;
  meeting_id?: Maybe<Scalars['String']['output']>;
  type?: Maybe<TransactionType>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  updated_by?: Maybe<Scalars['String']['output']>;
  updater: User;
};

/** ExpenseTransactionCategory */
export enum TransactionCategory {
  CashOnBook = 'CASH_ON_BOOK',
  CashOnMeeting = 'CASH_ON_MEETING',
  NonCashOnBook = 'NON_CASH_ON_BOOK',
  NonCashOnMeeting = 'NON_CASH_ON_MEETING',
  OfficeRent = 'OFFICE_RENT',
  Other = 'OTHER',
  TeaAndSugar = 'TEA_AND_SUGAR'
}

export enum TransactionColumns {
  Amount = 'AMOUNT',
  Category = 'CATEGORY',
  CreatedAt = 'CREATED_AT',
  GroupId = 'GROUP_ID',
  Id = 'ID',
  MeetingId = 'MEETING_ID',
  Type = 'TYPE',
  UpdatedAt = 'UPDATED_AT'
}

export type TransactionFilter = {
  amountGte?: InputMaybe<Scalars['Float']['input']>;
  amountLte?: InputMaybe<Scalars['Float']['input']>;
  category?: InputMaybe<TransactionCategory>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  groupId?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  meetingId?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<TransactionType>;
  updatedBy?: InputMaybe<Scalars['String']['input']>;
};

/** A paginated list of Transaction items. */
export type TransactionPaginator = {
  __typename?: 'TransactionPaginator';
  /** A list of Transaction items. */
  data: Array<Transaction>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** TransactionStatus */
export enum TransactionType {
  Expense = 'EXPENSE',
  Income = 'INCOME'
}

export type TransactionUpdateInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  category?: InputMaybe<TransactionCategory>;
  comment?: InputMaybe<Scalars['String']['input']>;
  group_id?: InputMaybe<Scalars['String']['input']>;
  meeting_id?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<TransactionType>;
};

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}

export type User = {
  __typename?: 'User';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  email_verified_at?: Maybe<Scalars['DateTime']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  last_name?: Maybe<Scalars['String']['output']>;
  middle_name?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  notification_email?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  profile: Profile;
  remember_token?: Maybe<Scalars['String']['output']>;
  roles: Array<Role>;
  status?: Maybe<UserStatus>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export enum UserColumns {
  CreatedAt = 'CREATED_AT',
  Email = 'EMAIL',
  Id = 'ID',
  Name = 'NAME',
  Phone = 'PHONE',
  UpdatedAt = 'UPDATED_AT'
}

export type UserCreateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  middle_name?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notification_email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<UserStatus>;
};

export type UserFilter = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

/** A paginated list of User items. */
export type UserPaginator = {
  __typename?: 'UserPaginator';
  /** A list of User items. */
  data: Array<User>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** Статусы пользователей */
export enum UserStatus {
  /** Активный */
  Active = 'ACTIVE',
  /** Бан */
  Banned = 'BANNED',
  /** Удален */
  Deleted = 'DELETED',
  /** К удалению */
  ToDelete = 'TO_DELETE'
}

export type UserUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  middle_name?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notification_email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<UserStatus>;
};

export type Version = {
  __typename?: 'Version';
  id: Scalars['ID']['output'];
};

export type CityQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CityQuery = { __typename?: 'Query', city?: { __typename?: 'City', id: string, name?: string | null } | null };

export type CitiesQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  filter?: InputMaybe<CityFilter>;
  orderBy?: InputMaybe<Array<QueryCitiesOrderByOrderByClause> | QueryCitiesOrderByOrderByClause>;
}>;


export type CitiesQuery = { __typename?: 'Query', cities: { __typename?: 'CityPaginator', data: Array<{ __typename?: 'City', id: string, name?: string | null }>, paginatorInfo: { __typename?: 'PaginatorInfo', currentPage: number, perPage: number, total: number } } };

export type CityCreateMutationVariables = Exact<{
  input: CityUpdateInput;
}>;


export type CityCreateMutation = { __typename?: 'Mutation', cityCreate?: { __typename?: 'City', id: string } | null };

export type CityUpdateMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: CityUpdateInput;
}>;


export type CityUpdateMutation = { __typename?: 'Mutation', cityUpdate?: { __typename?: 'City', id: string } | null };

export type CityDeleteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CityDeleteMutation = { __typename?: 'Mutation', cityDelete?: { __typename?: 'City', id: string } | null };

export type AttachmentDeleteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type AttachmentDeleteMutation = { __typename?: 'Mutation', attachmentDelete?: { __typename?: 'Attachment', id: string } | null };

export type LoginQueryVariables = Exact<{
  input: LoginInput;
}>;


export type LoginQuery = { __typename?: 'Query', login?: { __typename?: 'Auth', accessToken?: string | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, name?: string | null, email?: string | null, notification_email?: string | null, phone?: string | null, first_name?: string | null, last_name?: string | null, middle_name?: string | null, status?: UserStatus | null, roles: Array<{ __typename?: 'Role', id: string, name: string, title: string, permissions?: Array<{ __typename?: 'Permission', id: string, name: string } | null> | null }>, profile: { __typename?: 'Profile', id: string, user_id: string } } };

export type RefreshTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenQuery = { __typename?: 'Query', refreshToken: { __typename?: 'Auth', accessToken?: string | null } };

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = { __typename?: 'Query', logout?: boolean | null };

export type ModelRepositionMutationVariables = Exact<{
  input: PositionInput;
}>;


export type ModelRepositionMutation = { __typename?: 'Mutation', modelReposition?: boolean | null };

export type NotificationSubscriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NotificationSubscriptionSubscription = { __typename?: 'Subscription', notificationCreated?: { __typename?: 'Notification', id: string, type?: string | null, notifiable_id: string, notifiable_type: string, data?: { __typename?: 'NotificationDatum', modelId?: string | null, message?: string | null, url?: string | null, description?: string | null } | null } | null };

export type NotificationQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type NotificationQuery = { __typename?: 'Query', notification?: { __typename?: 'Notification', id: string, notifiable_id: string, notifiable_type: string, created_at: any, read_at?: any | null, data?: { __typename?: 'NotificationDatum', modelId?: string | null, message?: string | null, url?: string | null, description?: string | null } | null } | null };

export type NotificationsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  filter?: InputMaybe<NotificationFilter>;
  orderBy?: InputMaybe<Array<QueryNotificationsOrderByOrderByClause> | QueryNotificationsOrderByOrderByClause>;
}>;


export type NotificationsQuery = { __typename?: 'Query', notifications: { __typename?: 'NotificationPaginator', data: Array<{ __typename?: 'Notification', id: string, notifiable_id: string, notifiable_type: string, created_at: any, read_at?: any | null, data?: { __typename?: 'NotificationDatum', modelId?: string | null, message?: string | null, url?: string | null, description?: string | null } | null }>, paginatorInfo: { __typename?: 'PaginatorInfo', total: number, perPage: number, currentPage: number } } };

export type MarkAsReadMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type MarkAsReadMutation = { __typename?: 'Mutation', markAsRead?: boolean | null };

export type MarkAllAsReadMutationVariables = Exact<{ [key: string]: never; }>;


export type MarkAllAsReadMutation = { __typename?: 'Mutation', markAllAsRead?: boolean | null };

export type AdminStatisticsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminStatisticsQuery = { __typename?: 'Query', adminStatistics?: { __typename?: 'AdminStatistics', users: number, groups: number, meetings: number } | null };

export type PermissionsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<QueryPermissionsOrderByOrderByClause> | QueryPermissionsOrderByOrderByClause>;
}>;


export type PermissionsQuery = { __typename?: 'Query', permissions: Array<{ __typename?: 'Permission', id: string, name: string, group: PermissionGroup }> };

export type PermissionCreateMutationVariables = Exact<{
  input: PermissionInput;
}>;


export type PermissionCreateMutation = { __typename?: 'Mutation', permissionCreate?: { __typename?: 'Permission', id: string } | null };

export type PermissionUpdateMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: PermissionInput;
}>;


export type PermissionUpdateMutation = { __typename?: 'Mutation', permissionUpdate?: { __typename?: 'Permission', id: string } | null };

export type PermissionDeleteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type PermissionDeleteMutation = { __typename?: 'Mutation', permissionDelete?: { __typename?: 'Permission', id: string } | null };

export type ProfileQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ProfileQuery = { __typename?: 'Query', profile?: { __typename?: 'Profile', id: string, user_id: string, user: { __typename?: 'User', email?: string | null, phone?: string | null, first_name?: string | null, last_name?: string | null } } | null };

export type ProfilesQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  filter?: InputMaybe<ProfileFilter>;
  orderBy?: InputMaybe<Array<QueryProfilesOrderByOrderByClause> | QueryProfilesOrderByOrderByClause>;
}>;


export type ProfilesQuery = { __typename?: 'Query', profiles: { __typename?: 'ProfilePaginator', data: Array<{ __typename?: 'Profile', id: string, user_id: string, group_id?: string | null, user: { __typename?: 'User', first_name?: string | null, last_name?: string | null, email?: string | null, phone?: string | null }, group?: { __typename?: 'Group', name?: string | null } | null }>, paginatorInfo: { __typename?: 'PaginatorInfo', perPage: number, total: number, currentPage: number } } };

export type ProfileUpdateMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: ProfileUpdateInput;
}>;


export type ProfileUpdateMutation = { __typename?: 'Mutation', profileUpdate?: { __typename?: 'Profile', id: string } | null };

export type RolesQueryVariables = Exact<{
  filter?: InputMaybe<RoleFilter>;
  orderBy?: InputMaybe<Array<QueryRolesOrderByOrderByClause> | QueryRolesOrderByOrderByClause>;
}>;


export type RolesQuery = { __typename?: 'Query', roles: Array<{ __typename?: 'Role', id: string, name: string, title: string }> };

export type RoleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RoleQuery = { __typename?: 'Query', role: { __typename?: 'Role', id: string, name: string, title: string, permissions?: Array<{ __typename?: 'Permission', id: string, name: string } | null> | null } };

export type RoleCreateMutationVariables = Exact<{
  input: RoleInput;
}>;


export type RoleCreateMutation = { __typename?: 'Mutation', roleCreate?: { __typename?: 'Role', id: string } | null };

export type RoleUpdateMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: RoleInput;
}>;


export type RoleUpdateMutation = { __typename?: 'Mutation', roleUpdate?: { __typename?: 'Role', id: string } | null };

export type RoleDeleteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RoleDeleteMutation = { __typename?: 'Mutation', roleDelete?: { __typename?: 'Role', id: string } | null };

export type UserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, name?: string | null, email?: string | null, notification_email?: string | null, phone?: string | null, first_name?: string | null, last_name?: string | null, middle_name?: string | null, email_verified_at?: any | null, remember_token?: string | null, status?: UserStatus | null, created_at?: any | null, updated_at?: any | null, roles: Array<{ __typename?: 'Role', id: string, name: string }>, profile: { __typename?: 'Profile', id: string, user_id: string } } | null };

export type UserForAdminQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type UserForAdminQuery = { __typename?: 'Query', user?: { __typename?: 'User', email?: string | null, id: string, name?: string | null, phone?: string | null, status?: UserStatus | null, first_name?: string | null, last_name?: string | null, created_at?: any | null, roles: Array<{ __typename?: 'Role', name: string, title: string }>, profile: { __typename?: 'Profile', group_id?: string | null } } | null };

export type ShortUsersForSelectorQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  filter?: InputMaybe<UserFilter>;
  orderBy?: InputMaybe<Array<QueryUsersOrderByOrderByClause> | QueryUsersOrderByOrderByClause>;
}>;


export type ShortUsersForSelectorQuery = { __typename?: 'Query', users: { __typename?: 'UserPaginator', data: Array<{ __typename?: 'User', id: string, fullName?: string | null }>, paginatorInfo: { __typename?: 'PaginatorInfo', perPage: number, total: number, currentPage: number } } };

export type UsersQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  filter?: InputMaybe<UserFilter>;
  orderBy?: InputMaybe<Array<QueryUsersOrderByOrderByClause> | QueryUsersOrderByOrderByClause>;
}>;


export type UsersQuery = { __typename?: 'Query', users: { __typename?: 'UserPaginator', data: Array<{ __typename?: 'User', email?: string | null, id: string, name?: string | null, phone?: string | null, status?: UserStatus | null, first_name?: string | null, last_name?: string | null, created_at?: any | null, updated_at?: any | null, roles: Array<{ __typename?: 'Role', name: string, title: string }>, profile: { __typename?: 'Profile', id: string, user_id: string } }>, paginatorInfo: { __typename?: 'PaginatorInfo', perPage: number, total: number, currentPage: number } } };

export type UserCreateMutationVariables = Exact<{
  input: UserCreateInput;
}>;


export type UserCreateMutation = { __typename?: 'Mutation', userCreate?: { __typename?: 'User', id: string } | null };

export type UserUpdateMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UserUpdateInput;
}>;


export type UserUpdateMutation = { __typename?: 'Mutation', userUpdate?: { __typename?: 'User', id: string } | null };

export type UserDeleteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type UserDeleteMutation = { __typename?: 'Mutation', userDelete: { __typename?: 'User', id: string } };


export const CityDocument = gql`
    query city($id: ID!) {
  city(id: $id) {
    id
    name
  }
}
    `;

/**
 * __useCityQuery__
 *
 * To run a query within a Vue component, call `useCityQuery` and pass it any options that fit your needs.
 * When your component renders, `useCityQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCityQuery({
 *   id: // value for 'id'
 * });
 */
export function useCityQuery(variables: CityQueryVariables | VueCompositionApi.Ref<CityQueryVariables> | ReactiveFunction<CityQueryVariables>, options: VueApolloComposable.UseQueryOptions<CityQuery, CityQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CityQuery, CityQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CityQuery, CityQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<CityQuery, CityQueryVariables>(CityDocument, variables, options);
}
export function useCityLazyQuery(variables?: CityQueryVariables | VueCompositionApi.Ref<CityQueryVariables> | ReactiveFunction<CityQueryVariables>, options: VueApolloComposable.UseQueryOptions<CityQuery, CityQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CityQuery, CityQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CityQuery, CityQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<CityQuery, CityQueryVariables>(CityDocument, variables, options);
}
export type CityQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<CityQuery, CityQueryVariables>;
export const CitiesDocument = gql`
    query cities($first: Int!, $page: Int!, $filter: CityFilter, $orderBy: [QueryCitiesOrderByOrderByClause!]) {
  cities(first: $first, page: $page, filter: $filter, orderBy: $orderBy) {
    data {
      id
      name
    }
    paginatorInfo {
      currentPage
      perPage
      total
    }
  }
}
    `;

/**
 * __useCitiesQuery__
 *
 * To run a query within a Vue component, call `useCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCitiesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCitiesQuery({
 *   first: // value for 'first'
 *   page: // value for 'page'
 *   filter: // value for 'filter'
 *   orderBy: // value for 'orderBy'
 * });
 */
export function useCitiesQuery(variables: CitiesQueryVariables | VueCompositionApi.Ref<CitiesQueryVariables> | ReactiveFunction<CitiesQueryVariables>, options: VueApolloComposable.UseQueryOptions<CitiesQuery, CitiesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CitiesQuery, CitiesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CitiesQuery, CitiesQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<CitiesQuery, CitiesQueryVariables>(CitiesDocument, variables, options);
}
export function useCitiesLazyQuery(variables?: CitiesQueryVariables | VueCompositionApi.Ref<CitiesQueryVariables> | ReactiveFunction<CitiesQueryVariables>, options: VueApolloComposable.UseQueryOptions<CitiesQuery, CitiesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CitiesQuery, CitiesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CitiesQuery, CitiesQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<CitiesQuery, CitiesQueryVariables>(CitiesDocument, variables, options);
}
export type CitiesQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<CitiesQuery, CitiesQueryVariables>;
export const CityCreateDocument = gql`
    mutation cityCreate($input: CityUpdateInput!) {
  cityCreate(input: $input) {
    id
  }
}
    `;

/**
 * __useCityCreateMutation__
 *
 * To run a mutation, you first call `useCityCreateMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCityCreateMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCityCreateMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCityCreateMutation(options: VueApolloComposable.UseMutationOptions<CityCreateMutation, CityCreateMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CityCreateMutation, CityCreateMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CityCreateMutation, CityCreateMutationVariables>(CityCreateDocument, options);
}
export type CityCreateMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CityCreateMutation, CityCreateMutationVariables>;
export const CityUpdateDocument = gql`
    mutation cityUpdate($id: ID!, $input: CityUpdateInput!) {
  cityUpdate(id: $id, input: $input) {
    id
  }
}
    `;

/**
 * __useCityUpdateMutation__
 *
 * To run a mutation, you first call `useCityUpdateMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCityUpdateMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCityUpdateMutation({
 *   variables: {
 *     id: // value for 'id'
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCityUpdateMutation(options: VueApolloComposable.UseMutationOptions<CityUpdateMutation, CityUpdateMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CityUpdateMutation, CityUpdateMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CityUpdateMutation, CityUpdateMutationVariables>(CityUpdateDocument, options);
}
export type CityUpdateMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CityUpdateMutation, CityUpdateMutationVariables>;
export const CityDeleteDocument = gql`
    mutation cityDelete($id: ID!) {
  cityDelete(id: $id) {
    id
  }
}
    `;

/**
 * __useCityDeleteMutation__
 *
 * To run a mutation, you first call `useCityDeleteMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCityDeleteMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCityDeleteMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useCityDeleteMutation(options: VueApolloComposable.UseMutationOptions<CityDeleteMutation, CityDeleteMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CityDeleteMutation, CityDeleteMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CityDeleteMutation, CityDeleteMutationVariables>(CityDeleteDocument, options);
}
export type CityDeleteMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CityDeleteMutation, CityDeleteMutationVariables>;
export const AttachmentDeleteDocument = gql`
    mutation attachmentDelete($id: ID!) {
  attachmentDelete(id: $id) {
    id
  }
}
    `;

/**
 * __useAttachmentDeleteMutation__
 *
 * To run a mutation, you first call `useAttachmentDeleteMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useAttachmentDeleteMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useAttachmentDeleteMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useAttachmentDeleteMutation(options: VueApolloComposable.UseMutationOptions<AttachmentDeleteMutation, AttachmentDeleteMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<AttachmentDeleteMutation, AttachmentDeleteMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<AttachmentDeleteMutation, AttachmentDeleteMutationVariables>(AttachmentDeleteDocument, options);
}
export type AttachmentDeleteMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<AttachmentDeleteMutation, AttachmentDeleteMutationVariables>;
export const LoginDocument = gql`
    query login($input: LoginInput!) {
  login(input: $input) {
    accessToken
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a Vue component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useLoginQuery({
 *   input: // value for 'input'
 * });
 */
export function useLoginQuery(variables: LoginQueryVariables | VueCompositionApi.Ref<LoginQueryVariables> | ReactiveFunction<LoginQueryVariables>, options: VueApolloComposable.UseQueryOptions<LoginQuery, LoginQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<LoginQuery, LoginQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<LoginQuery, LoginQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, variables, options);
}
export function useLoginLazyQuery(variables?: LoginQueryVariables | VueCompositionApi.Ref<LoginQueryVariables> | ReactiveFunction<LoginQueryVariables>, options: VueApolloComposable.UseQueryOptions<LoginQuery, LoginQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<LoginQuery, LoginQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<LoginQuery, LoginQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, variables, options);
}
export type LoginQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<LoginQuery, LoginQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    id
    name
    email
    notification_email
    phone
    first_name
    last_name
    middle_name
    status
    roles {
      id
      name
      title
      permissions {
        id
        name
      }
    }
    profile {
      id
      user_id
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a Vue component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMeQuery();
 */
export function useMeQuery(options: VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<MeQuery, MeQueryVariables>(MeDocument, {}, options);
}
export function useMeLazyQuery(options: VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<MeQuery, MeQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, {}, options);
}
export type MeQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<MeQuery, MeQueryVariables>;
export const RefreshTokenDocument = gql`
    query refreshToken {
  refreshToken {
    accessToken
  }
}
    `;

/**
 * __useRefreshTokenQuery__
 *
 * To run a query within a Vue component, call `useRefreshTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useRefreshTokenQuery();
 */
export function useRefreshTokenQuery(options: VueApolloComposable.UseQueryOptions<RefreshTokenQuery, RefreshTokenQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<RefreshTokenQuery, RefreshTokenQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<RefreshTokenQuery, RefreshTokenQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<RefreshTokenQuery, RefreshTokenQueryVariables>(RefreshTokenDocument, {}, options);
}
export function useRefreshTokenLazyQuery(options: VueApolloComposable.UseQueryOptions<RefreshTokenQuery, RefreshTokenQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<RefreshTokenQuery, RefreshTokenQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<RefreshTokenQuery, RefreshTokenQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<RefreshTokenQuery, RefreshTokenQueryVariables>(RefreshTokenDocument, {}, options);
}
export type RefreshTokenQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<RefreshTokenQuery, RefreshTokenQueryVariables>;
export const LogoutDocument = gql`
    query logout {
  logout
}
    `;

/**
 * __useLogoutQuery__
 *
 * To run a query within a Vue component, call `useLogoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useLogoutQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useLogoutQuery();
 */
export function useLogoutQuery(options: VueApolloComposable.UseQueryOptions<LogoutQuery, LogoutQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<LogoutQuery, LogoutQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<LogoutQuery, LogoutQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, {}, options);
}
export function useLogoutLazyQuery(options: VueApolloComposable.UseQueryOptions<LogoutQuery, LogoutQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<LogoutQuery, LogoutQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<LogoutQuery, LogoutQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, {}, options);
}
export type LogoutQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<LogoutQuery, LogoutQueryVariables>;
export const ModelRepositionDocument = gql`
    mutation modelReposition($input: PositionInput!) {
  modelReposition(input: $input)
}
    `;

/**
 * __useModelRepositionMutation__
 *
 * To run a mutation, you first call `useModelRepositionMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useModelRepositionMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useModelRepositionMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useModelRepositionMutation(options: VueApolloComposable.UseMutationOptions<ModelRepositionMutation, ModelRepositionMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ModelRepositionMutation, ModelRepositionMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<ModelRepositionMutation, ModelRepositionMutationVariables>(ModelRepositionDocument, options);
}
export type ModelRepositionMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ModelRepositionMutation, ModelRepositionMutationVariables>;
export const NotificationSubscriptionDocument = gql`
    subscription NotificationSubscription {
  notificationCreated {
    id
    type
    notifiable_id
    notifiable_type
    data {
      modelId
      message
      url
      description
    }
  }
}
    `;

/**
 * __useNotificationSubscriptionSubscription__
 *
 * To run a query within a Vue component, call `useNotificationSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNotificationSubscriptionSubscription` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the subscription, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/subscription.html#options;
 *
 * @example
 * const { result, loading, error } = useNotificationSubscriptionSubscription();
 */
export function useNotificationSubscriptionSubscription(options: VueApolloComposable.UseSubscriptionOptions<NotificationSubscriptionSubscription, NotificationSubscriptionSubscriptionVariables> | VueCompositionApi.Ref<VueApolloComposable.UseSubscriptionOptions<NotificationSubscriptionSubscription, NotificationSubscriptionSubscriptionVariables>> | ReactiveFunction<VueApolloComposable.UseSubscriptionOptions<NotificationSubscriptionSubscription, NotificationSubscriptionSubscriptionVariables>> = {}) {
  return VueApolloComposable.useSubscription<NotificationSubscriptionSubscription, NotificationSubscriptionSubscriptionVariables>(NotificationSubscriptionDocument, {}, options);
}
export type NotificationSubscriptionSubscriptionCompositionFunctionResult = VueApolloComposable.UseSubscriptionReturn<NotificationSubscriptionSubscription, NotificationSubscriptionSubscriptionVariables>;
export const NotificationDocument = gql`
    query notification($id: ID!) {
  notification(id: $id) {
    id
    notifiable_id
    notifiable_type
    data {
      modelId
      message
      url
      description
    }
    created_at
    read_at
  }
}
    `;

/**
 * __useNotificationQuery__
 *
 * To run a query within a Vue component, call `useNotificationQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useNotificationQuery({
 *   id: // value for 'id'
 * });
 */
export function useNotificationQuery(variables: NotificationQueryVariables | VueCompositionApi.Ref<NotificationQueryVariables> | ReactiveFunction<NotificationQueryVariables>, options: VueApolloComposable.UseQueryOptions<NotificationQuery, NotificationQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<NotificationQuery, NotificationQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<NotificationQuery, NotificationQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<NotificationQuery, NotificationQueryVariables>(NotificationDocument, variables, options);
}
export function useNotificationLazyQuery(variables?: NotificationQueryVariables | VueCompositionApi.Ref<NotificationQueryVariables> | ReactiveFunction<NotificationQueryVariables>, options: VueApolloComposable.UseQueryOptions<NotificationQuery, NotificationQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<NotificationQuery, NotificationQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<NotificationQuery, NotificationQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<NotificationQuery, NotificationQueryVariables>(NotificationDocument, variables, options);
}
export type NotificationQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<NotificationQuery, NotificationQueryVariables>;
export const NotificationsDocument = gql`
    query notifications($first: Int!, $page: Int!, $filter: NotificationFilter, $orderBy: [QueryNotificationsOrderByOrderByClause!]) {
  notifications(first: $first, page: $page, filter: $filter, orderBy: $orderBy) {
    data {
      id
      notifiable_id
      notifiable_type
      data {
        modelId
        message
        url
        description
      }
      created_at
      read_at
    }
    paginatorInfo {
      total
      perPage
      currentPage
    }
  }
}
    `;

/**
 * __useNotificationsQuery__
 *
 * To run a query within a Vue component, call `useNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useNotificationsQuery({
 *   first: // value for 'first'
 *   page: // value for 'page'
 *   filter: // value for 'filter'
 *   orderBy: // value for 'orderBy'
 * });
 */
export function useNotificationsQuery(variables: NotificationsQueryVariables | VueCompositionApi.Ref<NotificationsQueryVariables> | ReactiveFunction<NotificationsQueryVariables>, options: VueApolloComposable.UseQueryOptions<NotificationsQuery, NotificationsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<NotificationsQuery, NotificationsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<NotificationsQuery, NotificationsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, variables, options);
}
export function useNotificationsLazyQuery(variables?: NotificationsQueryVariables | VueCompositionApi.Ref<NotificationsQueryVariables> | ReactiveFunction<NotificationsQueryVariables>, options: VueApolloComposable.UseQueryOptions<NotificationsQuery, NotificationsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<NotificationsQuery, NotificationsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<NotificationsQuery, NotificationsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, variables, options);
}
export type NotificationsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<NotificationsQuery, NotificationsQueryVariables>;
export const MarkAsReadDocument = gql`
    mutation markAsRead($id: ID!) {
  markAsRead(id: $id)
}
    `;

/**
 * __useMarkAsReadMutation__
 *
 * To run a mutation, you first call `useMarkAsReadMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useMarkAsReadMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useMarkAsReadMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useMarkAsReadMutation(options: VueApolloComposable.UseMutationOptions<MarkAsReadMutation, MarkAsReadMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<MarkAsReadMutation, MarkAsReadMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<MarkAsReadMutation, MarkAsReadMutationVariables>(MarkAsReadDocument, options);
}
export type MarkAsReadMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<MarkAsReadMutation, MarkAsReadMutationVariables>;
export const MarkAllAsReadDocument = gql`
    mutation markAllAsRead {
  markAllAsRead
}
    `;

/**
 * __useMarkAllAsReadMutation__
 *
 * To run a mutation, you first call `useMarkAllAsReadMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useMarkAllAsReadMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useMarkAllAsReadMutation();
 */
export function useMarkAllAsReadMutation(options: VueApolloComposable.UseMutationOptions<MarkAllAsReadMutation, MarkAllAsReadMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<MarkAllAsReadMutation, MarkAllAsReadMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<MarkAllAsReadMutation, MarkAllAsReadMutationVariables>(MarkAllAsReadDocument, options);
}
export type MarkAllAsReadMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<MarkAllAsReadMutation, MarkAllAsReadMutationVariables>;
export const AdminStatisticsDocument = gql`
    query adminStatistics {
  adminStatistics {
    users
    groups
    meetings
  }
}
    `;

/**
 * __useAdminStatisticsQuery__
 *
 * To run a query within a Vue component, call `useAdminStatisticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminStatisticsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useAdminStatisticsQuery();
 */
export function useAdminStatisticsQuery(options: VueApolloComposable.UseQueryOptions<AdminStatisticsQuery, AdminStatisticsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<AdminStatisticsQuery, AdminStatisticsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<AdminStatisticsQuery, AdminStatisticsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<AdminStatisticsQuery, AdminStatisticsQueryVariables>(AdminStatisticsDocument, {}, options);
}
export function useAdminStatisticsLazyQuery(options: VueApolloComposable.UseQueryOptions<AdminStatisticsQuery, AdminStatisticsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<AdminStatisticsQuery, AdminStatisticsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<AdminStatisticsQuery, AdminStatisticsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<AdminStatisticsQuery, AdminStatisticsQueryVariables>(AdminStatisticsDocument, {}, options);
}
export type AdminStatisticsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<AdminStatisticsQuery, AdminStatisticsQueryVariables>;
export const PermissionsDocument = gql`
    query permissions($orderBy: [QueryPermissionsOrderByOrderByClause!]) {
  permissions(orderBy: $orderBy) {
    id
    name
    group
  }
}
    `;

/**
 * __usePermissionsQuery__
 *
 * To run a query within a Vue component, call `usePermissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePermissionsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = usePermissionsQuery({
 *   orderBy: // value for 'orderBy'
 * });
 */
export function usePermissionsQuery(variables: PermissionsQueryVariables | VueCompositionApi.Ref<PermissionsQueryVariables> | ReactiveFunction<PermissionsQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<PermissionsQuery, PermissionsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<PermissionsQuery, PermissionsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<PermissionsQuery, PermissionsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<PermissionsQuery, PermissionsQueryVariables>(PermissionsDocument, variables, options);
}
export function usePermissionsLazyQuery(variables: PermissionsQueryVariables | VueCompositionApi.Ref<PermissionsQueryVariables> | ReactiveFunction<PermissionsQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<PermissionsQuery, PermissionsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<PermissionsQuery, PermissionsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<PermissionsQuery, PermissionsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<PermissionsQuery, PermissionsQueryVariables>(PermissionsDocument, variables, options);
}
export type PermissionsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<PermissionsQuery, PermissionsQueryVariables>;
export const PermissionCreateDocument = gql`
    mutation permissionCreate($input: PermissionInput!) {
  permissionCreate(input: $input) {
    id
  }
}
    `;

/**
 * __usePermissionCreateMutation__
 *
 * To run a mutation, you first call `usePermissionCreateMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `usePermissionCreateMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = usePermissionCreateMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function usePermissionCreateMutation(options: VueApolloComposable.UseMutationOptions<PermissionCreateMutation, PermissionCreateMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<PermissionCreateMutation, PermissionCreateMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<PermissionCreateMutation, PermissionCreateMutationVariables>(PermissionCreateDocument, options);
}
export type PermissionCreateMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<PermissionCreateMutation, PermissionCreateMutationVariables>;
export const PermissionUpdateDocument = gql`
    mutation permissionUpdate($id: ID!, $input: PermissionInput!) {
  permissionUpdate(id: $id, input: $input) {
    id
  }
}
    `;

/**
 * __usePermissionUpdateMutation__
 *
 * To run a mutation, you first call `usePermissionUpdateMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `usePermissionUpdateMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = usePermissionUpdateMutation({
 *   variables: {
 *     id: // value for 'id'
 *     input: // value for 'input'
 *   },
 * });
 */
export function usePermissionUpdateMutation(options: VueApolloComposable.UseMutationOptions<PermissionUpdateMutation, PermissionUpdateMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<PermissionUpdateMutation, PermissionUpdateMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<PermissionUpdateMutation, PermissionUpdateMutationVariables>(PermissionUpdateDocument, options);
}
export type PermissionUpdateMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<PermissionUpdateMutation, PermissionUpdateMutationVariables>;
export const PermissionDeleteDocument = gql`
    mutation permissionDelete($id: ID!) {
  permissionDelete(id: $id) {
    id
  }
}
    `;

/**
 * __usePermissionDeleteMutation__
 *
 * To run a mutation, you first call `usePermissionDeleteMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `usePermissionDeleteMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = usePermissionDeleteMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function usePermissionDeleteMutation(options: VueApolloComposable.UseMutationOptions<PermissionDeleteMutation, PermissionDeleteMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<PermissionDeleteMutation, PermissionDeleteMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<PermissionDeleteMutation, PermissionDeleteMutationVariables>(PermissionDeleteDocument, options);
}
export type PermissionDeleteMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<PermissionDeleteMutation, PermissionDeleteMutationVariables>;
export const ProfileDocument = gql`
    query profile($id: ID!) {
  profile(id: $id) {
    id
    user_id
    user {
      email
      phone
      first_name
      last_name
    }
  }
}
    `;

/**
 * __useProfileQuery__
 *
 * To run a query within a Vue component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useProfileQuery({
 *   id: // value for 'id'
 * });
 */
export function useProfileQuery(variables: ProfileQueryVariables | VueCompositionApi.Ref<ProfileQueryVariables> | ReactiveFunction<ProfileQueryVariables>, options: VueApolloComposable.UseQueryOptions<ProfileQuery, ProfileQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ProfileQuery, ProfileQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ProfileQuery, ProfileQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, variables, options);
}
export function useProfileLazyQuery(variables?: ProfileQueryVariables | VueCompositionApi.Ref<ProfileQueryVariables> | ReactiveFunction<ProfileQueryVariables>, options: VueApolloComposable.UseQueryOptions<ProfileQuery, ProfileQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ProfileQuery, ProfileQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ProfileQuery, ProfileQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, variables, options);
}
export type ProfileQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<ProfileQuery, ProfileQueryVariables>;
export const ProfilesDocument = gql`
    query profiles($first: Int!, $page: Int!, $filter: ProfileFilter, $orderBy: [QueryProfilesOrderByOrderByClause!]) {
  profiles(first: $first, page: $page, filter: $filter, orderBy: $orderBy) {
    data {
      id
      user_id
      user {
        first_name
        last_name
        email
        phone
      }
      group_id
      group {
        name
      }
    }
    paginatorInfo {
      perPage
      total
      currentPage
    }
  }
}
    `;

/**
 * __useProfilesQuery__
 *
 * To run a query within a Vue component, call `useProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfilesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useProfilesQuery({
 *   first: // value for 'first'
 *   page: // value for 'page'
 *   filter: // value for 'filter'
 *   orderBy: // value for 'orderBy'
 * });
 */
export function useProfilesQuery(variables: ProfilesQueryVariables | VueCompositionApi.Ref<ProfilesQueryVariables> | ReactiveFunction<ProfilesQueryVariables>, options: VueApolloComposable.UseQueryOptions<ProfilesQuery, ProfilesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ProfilesQuery, ProfilesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ProfilesQuery, ProfilesQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<ProfilesQuery, ProfilesQueryVariables>(ProfilesDocument, variables, options);
}
export function useProfilesLazyQuery(variables?: ProfilesQueryVariables | VueCompositionApi.Ref<ProfilesQueryVariables> | ReactiveFunction<ProfilesQueryVariables>, options: VueApolloComposable.UseQueryOptions<ProfilesQuery, ProfilesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ProfilesQuery, ProfilesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ProfilesQuery, ProfilesQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<ProfilesQuery, ProfilesQueryVariables>(ProfilesDocument, variables, options);
}
export type ProfilesQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<ProfilesQuery, ProfilesQueryVariables>;
export const ProfileUpdateDocument = gql`
    mutation profileUpdate($id: ID!, $input: ProfileUpdateInput!) {
  profileUpdate(id: $id, input: $input) {
    id
  }
}
    `;

/**
 * __useProfileUpdateMutation__
 *
 * To run a mutation, you first call `useProfileUpdateMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useProfileUpdateMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useProfileUpdateMutation({
 *   variables: {
 *     id: // value for 'id'
 *     input: // value for 'input'
 *   },
 * });
 */
export function useProfileUpdateMutation(options: VueApolloComposable.UseMutationOptions<ProfileUpdateMutation, ProfileUpdateMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ProfileUpdateMutation, ProfileUpdateMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<ProfileUpdateMutation, ProfileUpdateMutationVariables>(ProfileUpdateDocument, options);
}
export type ProfileUpdateMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ProfileUpdateMutation, ProfileUpdateMutationVariables>;
export const RolesDocument = gql`
    query roles($filter: RoleFilter, $orderBy: [QueryRolesOrderByOrderByClause!]) {
  roles(filter: $filter, orderBy: $orderBy) {
    id
    name
    title
  }
}
    `;

/**
 * __useRolesQuery__
 *
 * To run a query within a Vue component, call `useRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useRolesQuery({
 *   filter: // value for 'filter'
 *   orderBy: // value for 'orderBy'
 * });
 */
export function useRolesQuery(variables: RolesQueryVariables | VueCompositionApi.Ref<RolesQueryVariables> | ReactiveFunction<RolesQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<RolesQuery, RolesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<RolesQuery, RolesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<RolesQuery, RolesQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<RolesQuery, RolesQueryVariables>(RolesDocument, variables, options);
}
export function useRolesLazyQuery(variables: RolesQueryVariables | VueCompositionApi.Ref<RolesQueryVariables> | ReactiveFunction<RolesQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<RolesQuery, RolesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<RolesQuery, RolesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<RolesQuery, RolesQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<RolesQuery, RolesQueryVariables>(RolesDocument, variables, options);
}
export type RolesQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<RolesQuery, RolesQueryVariables>;
export const RoleDocument = gql`
    query role($id: ID!) {
  role(id: $id) {
    id
    name
    title
    permissions {
      id
      name
    }
  }
}
    `;

/**
 * __useRoleQuery__
 *
 * To run a query within a Vue component, call `useRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoleQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useRoleQuery({
 *   id: // value for 'id'
 * });
 */
export function useRoleQuery(variables: RoleQueryVariables | VueCompositionApi.Ref<RoleQueryVariables> | ReactiveFunction<RoleQueryVariables>, options: VueApolloComposable.UseQueryOptions<RoleQuery, RoleQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<RoleQuery, RoleQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<RoleQuery, RoleQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<RoleQuery, RoleQueryVariables>(RoleDocument, variables, options);
}
export function useRoleLazyQuery(variables?: RoleQueryVariables | VueCompositionApi.Ref<RoleQueryVariables> | ReactiveFunction<RoleQueryVariables>, options: VueApolloComposable.UseQueryOptions<RoleQuery, RoleQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<RoleQuery, RoleQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<RoleQuery, RoleQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<RoleQuery, RoleQueryVariables>(RoleDocument, variables, options);
}
export type RoleQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<RoleQuery, RoleQueryVariables>;
export const RoleCreateDocument = gql`
    mutation roleCreate($input: RoleInput!) {
  roleCreate(input: $input) {
    id
  }
}
    `;

/**
 * __useRoleCreateMutation__
 *
 * To run a mutation, you first call `useRoleCreateMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRoleCreateMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRoleCreateMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useRoleCreateMutation(options: VueApolloComposable.UseMutationOptions<RoleCreateMutation, RoleCreateMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RoleCreateMutation, RoleCreateMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<RoleCreateMutation, RoleCreateMutationVariables>(RoleCreateDocument, options);
}
export type RoleCreateMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RoleCreateMutation, RoleCreateMutationVariables>;
export const RoleUpdateDocument = gql`
    mutation roleUpdate($id: ID!, $input: RoleInput!) {
  roleUpdate(id: $id, input: $input) {
    id
  }
}
    `;

/**
 * __useRoleUpdateMutation__
 *
 * To run a mutation, you first call `useRoleUpdateMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRoleUpdateMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRoleUpdateMutation({
 *   variables: {
 *     id: // value for 'id'
 *     input: // value for 'input'
 *   },
 * });
 */
export function useRoleUpdateMutation(options: VueApolloComposable.UseMutationOptions<RoleUpdateMutation, RoleUpdateMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RoleUpdateMutation, RoleUpdateMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<RoleUpdateMutation, RoleUpdateMutationVariables>(RoleUpdateDocument, options);
}
export type RoleUpdateMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RoleUpdateMutation, RoleUpdateMutationVariables>;
export const RoleDeleteDocument = gql`
    mutation roleDelete($id: ID!) {
  roleDelete(id: $id) {
    id
  }
}
    `;

/**
 * __useRoleDeleteMutation__
 *
 * To run a mutation, you first call `useRoleDeleteMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRoleDeleteMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRoleDeleteMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useRoleDeleteMutation(options: VueApolloComposable.UseMutationOptions<RoleDeleteMutation, RoleDeleteMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RoleDeleteMutation, RoleDeleteMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<RoleDeleteMutation, RoleDeleteMutationVariables>(RoleDeleteDocument, options);
}
export type RoleDeleteMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RoleDeleteMutation, RoleDeleteMutationVariables>;
export const UserDocument = gql`
    query user($id: ID!) {
  user(id: $id) {
    id
    name
    email
    notification_email
    phone
    first_name
    last_name
    middle_name
    email_verified_at
    remember_token
    status
    created_at
    updated_at
    roles {
      id
      name
    }
    profile {
      id
      user_id
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a Vue component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useUserQuery({
 *   id: // value for 'id'
 * });
 */
export function useUserQuery(variables: UserQueryVariables | VueCompositionApi.Ref<UserQueryVariables> | ReactiveFunction<UserQueryVariables>, options: VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<UserQuery, UserQueryVariables>(UserDocument, variables, options);
}
export function useUserLazyQuery(variables?: UserQueryVariables | VueCompositionApi.Ref<UserQueryVariables> | ReactiveFunction<UserQueryVariables>, options: VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, variables, options);
}
export type UserQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<UserQuery, UserQueryVariables>;
export const UserForAdminDocument = gql`
    query userForAdmin($id: ID!) {
  user(id: $id) {
    email
    id
    name
    phone
    status
    first_name
    last_name
    roles {
      name
      title
    }
    created_at
    profile {
      group_id
    }
  }
}
    `;

/**
 * __useUserForAdminQuery__
 *
 * To run a query within a Vue component, call `useUserForAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserForAdminQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useUserForAdminQuery({
 *   id: // value for 'id'
 * });
 */
export function useUserForAdminQuery(variables: UserForAdminQueryVariables | VueCompositionApi.Ref<UserForAdminQueryVariables> | ReactiveFunction<UserForAdminQueryVariables>, options: VueApolloComposable.UseQueryOptions<UserForAdminQuery, UserForAdminQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UserForAdminQuery, UserForAdminQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<UserForAdminQuery, UserForAdminQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<UserForAdminQuery, UserForAdminQueryVariables>(UserForAdminDocument, variables, options);
}
export function useUserForAdminLazyQuery(variables?: UserForAdminQueryVariables | VueCompositionApi.Ref<UserForAdminQueryVariables> | ReactiveFunction<UserForAdminQueryVariables>, options: VueApolloComposable.UseQueryOptions<UserForAdminQuery, UserForAdminQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UserForAdminQuery, UserForAdminQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<UserForAdminQuery, UserForAdminQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<UserForAdminQuery, UserForAdminQueryVariables>(UserForAdminDocument, variables, options);
}
export type UserForAdminQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<UserForAdminQuery, UserForAdminQueryVariables>;
export const ShortUsersForSelectorDocument = gql`
    query shortUsersForSelector($first: Int!, $page: Int!, $filter: UserFilter, $orderBy: [QueryUsersOrderByOrderByClause!]) {
  users(first: $first, page: $page, filter: $filter, orderBy: $orderBy) {
    data {
      id
      fullName
    }
    paginatorInfo {
      perPage
      total
      currentPage
    }
  }
}
    `;

/**
 * __useShortUsersForSelectorQuery__
 *
 * To run a query within a Vue component, call `useShortUsersForSelectorQuery` and pass it any options that fit your needs.
 * When your component renders, `useShortUsersForSelectorQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useShortUsersForSelectorQuery({
 *   first: // value for 'first'
 *   page: // value for 'page'
 *   filter: // value for 'filter'
 *   orderBy: // value for 'orderBy'
 * });
 */
export function useShortUsersForSelectorQuery(variables: ShortUsersForSelectorQueryVariables | VueCompositionApi.Ref<ShortUsersForSelectorQueryVariables> | ReactiveFunction<ShortUsersForSelectorQueryVariables>, options: VueApolloComposable.UseQueryOptions<ShortUsersForSelectorQuery, ShortUsersForSelectorQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ShortUsersForSelectorQuery, ShortUsersForSelectorQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ShortUsersForSelectorQuery, ShortUsersForSelectorQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<ShortUsersForSelectorQuery, ShortUsersForSelectorQueryVariables>(ShortUsersForSelectorDocument, variables, options);
}
export function useShortUsersForSelectorLazyQuery(variables?: ShortUsersForSelectorQueryVariables | VueCompositionApi.Ref<ShortUsersForSelectorQueryVariables> | ReactiveFunction<ShortUsersForSelectorQueryVariables>, options: VueApolloComposable.UseQueryOptions<ShortUsersForSelectorQuery, ShortUsersForSelectorQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ShortUsersForSelectorQuery, ShortUsersForSelectorQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ShortUsersForSelectorQuery, ShortUsersForSelectorQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<ShortUsersForSelectorQuery, ShortUsersForSelectorQueryVariables>(ShortUsersForSelectorDocument, variables, options);
}
export type ShortUsersForSelectorQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<ShortUsersForSelectorQuery, ShortUsersForSelectorQueryVariables>;
export const UsersDocument = gql`
    query users($first: Int!, $page: Int!, $filter: UserFilter, $orderBy: [QueryUsersOrderByOrderByClause!]) {
  users(first: $first, page: $page, filter: $filter, orderBy: $orderBy) {
    data {
      email
      id
      name
      phone
      status
      first_name
      last_name
      roles {
        name
        title
      }
      profile {
        id
        user_id
      }
      created_at
      updated_at
    }
    paginatorInfo {
      perPage
      total
      currentPage
    }
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a Vue component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useUsersQuery({
 *   first: // value for 'first'
 *   page: // value for 'page'
 *   filter: // value for 'filter'
 *   orderBy: // value for 'orderBy'
 * });
 */
export function useUsersQuery(variables: UsersQueryVariables | VueCompositionApi.Ref<UsersQueryVariables> | ReactiveFunction<UsersQueryVariables>, options: VueApolloComposable.UseQueryOptions<UsersQuery, UsersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UsersQuery, UsersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<UsersQuery, UsersQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, variables, options);
}
export function useUsersLazyQuery(variables?: UsersQueryVariables | VueCompositionApi.Ref<UsersQueryVariables> | ReactiveFunction<UsersQueryVariables>, options: VueApolloComposable.UseQueryOptions<UsersQuery, UsersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UsersQuery, UsersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<UsersQuery, UsersQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, variables, options);
}
export type UsersQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<UsersQuery, UsersQueryVariables>;
export const UserCreateDocument = gql`
    mutation userCreate($input: UserCreateInput!) {
  userCreate(input: $input) {
    id
  }
}
    `;

/**
 * __useUserCreateMutation__
 *
 * To run a mutation, you first call `useUserCreateMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUserCreateMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUserCreateMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useUserCreateMutation(options: VueApolloComposable.UseMutationOptions<UserCreateMutation, UserCreateMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UserCreateMutation, UserCreateMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UserCreateMutation, UserCreateMutationVariables>(UserCreateDocument, options);
}
export type UserCreateMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UserCreateMutation, UserCreateMutationVariables>;
export const UserUpdateDocument = gql`
    mutation userUpdate($id: ID!, $input: UserUpdateInput!) {
  userUpdate(id: $id, input: $input) {
    id
  }
}
    `;

/**
 * __useUserUpdateMutation__
 *
 * To run a mutation, you first call `useUserUpdateMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUserUpdateMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUserUpdateMutation({
 *   variables: {
 *     id: // value for 'id'
 *     input: // value for 'input'
 *   },
 * });
 */
export function useUserUpdateMutation(options: VueApolloComposable.UseMutationOptions<UserUpdateMutation, UserUpdateMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UserUpdateMutation, UserUpdateMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UserUpdateMutation, UserUpdateMutationVariables>(UserUpdateDocument, options);
}
export type UserUpdateMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UserUpdateMutation, UserUpdateMutationVariables>;
export const UserDeleteDocument = gql`
    mutation userDelete($id: ID!) {
  userDelete(id: $id) {
    id
  }
}
    `;

/**
 * __useUserDeleteMutation__
 *
 * To run a mutation, you first call `useUserDeleteMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUserDeleteMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUserDeleteMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useUserDeleteMutation(options: VueApolloComposable.UseMutationOptions<UserDeleteMutation, UserDeleteMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UserDeleteMutation, UserDeleteMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UserDeleteMutation, UserDeleteMutationVariables>(UserDeleteDocument, options);
}
export type UserDeleteMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UserDeleteMutation, UserDeleteMutationVariables>;