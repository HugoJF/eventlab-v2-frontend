export type Id = string | number;

export type Timestamps = {
  updated_at: string;
  created_at: string;
}

export type ResourceResponse<T> = {
  data: T;
}

export type PaginatedResourceResponse<T> = ResourceResponse<T> & {
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  },
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  }
}

export type EventType = EventProperties & EventComputedProperties & EventRelationships & Timestamps;

export type EventRelationships = {
  user: UserType;
  users: UserType[];
}

export type EventProperties = {
  title: string;
  description: string;
  starts_at: string;
  ends_at: string;
}

export type EventComputedProperties = {
  id: number;
}

export type UserType = UserProperties & UserComputedProperties & Timestamps;

export type UserProperties = {
  name: string;
  email: string;
}

export type UserComputedProperties = {
  id: number;
  email_verified_at: string;
  two_factor_secret: string|null;
  two_factor_recovery_codes: string|null;
}
