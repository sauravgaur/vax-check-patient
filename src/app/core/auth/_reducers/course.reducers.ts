// NGRX
import { createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
// Actions
import { CourseActions as UserActions, CourseActionTypes as UserActionTypes} from '../_actions/course.actions';
// CRUD
import { QueryParamsModel } from '../../_base/crud';
// Models
import { Course } from '../_models/course.model';

// tslint:disable-next-line:no-empty-interface
export interface CoursesState extends EntityState<Course> {
  listLoading: boolean;
  actionsloading: boolean;
  totalCount: number;
  lastCreatedUserId: number;
  lastQuery: QueryParamsModel;
  showInitWaitingMessage: boolean;
}

export const adapter: EntityAdapter<Course> = createEntityAdapter<Course>();

export const initialUsersState: CoursesState = adapter.getInitialState({
  listLoading: false,
  actionsloading: false,
  totalCount: 0,
  lastQuery: new QueryParamsModel({}),
  lastCreatedUserId: undefined,
  showInitWaitingMessage: true
});

export function coursesReducer(state = initialUsersState, action: UserActions): CoursesState {
  switch (action.type) {
    case UserActionTypes.UsersPageToggleLoading:
      return {
        ...state, listLoading: action.payload.isLoading, lastCreatedUserId: undefined
      };
    case UserActionTypes.UsersActionToggleLoading:
      return {
        ...state, actionsloading: action.payload.isLoading
      };
    case UserActionTypes.UserOnServerCreated:
      return {
        ...state
      };
    case UserActionTypes.UserCreated:
      return adapter.addOne(action.payload.user, {
        ...state, lastCreatedUserId: action.payload.user.coursesCode
      });
    case UserActionTypes.UserUpdated:
      return adapter.updateOne(action.payload.partialUser, state);
    case UserActionTypes.UserDeleted:
      return adapter.removeOne(action.payload.id, state);
    case UserActionTypes.UsersPageCancelled:
      return {
        ...state, listLoading: false, lastQuery: new QueryParamsModel({})
      };
    case UserActionTypes.UsersPageLoaded: {
      return adapter.addMany(action.payload.users, {
        ...initialUsersState,
        totalCount: action.payload.totalCount,
        lastQuery: action.payload.page,
        listLoading: false,
        showInitWaitingMessage: false
      });
    }
    default:
      return state;
  }
}

export const getUserState = createFeatureSelector<CoursesState>('users');

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
