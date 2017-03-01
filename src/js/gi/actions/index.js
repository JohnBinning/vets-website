import { api } from '../config';

export const DISPLAY_MODAL = 'DISPLAY_MODAL';
export const SET_PAGE_TITLE = 'SET_PAGE_TITLE';
export const ENTER_PREVIEW_MODE = 'ENTER_PREVIEW_MODE';
export const EXIT_PREVIEW_MODE = 'EXIT_PREVIEW_MODE';
export const FETCH_CONSTANTS_STARTED = 'FETCH_CONSTANTS_STARTED';
export const FETCH_CONSTANTS_FAILED = 'FETCH_CONSTANTS_FAILED';
export const FETCH_CONSTANTS_SUCCEEDED = 'FETCH_CONSTANTS_SUCCEEDED';
export const AUTOCOMPLETE_STARTED = 'AUTOCOMPLETE_STARTED';
export const AUTOCOMPLETE_FAILED = 'AUTOCOMPLETE_FAILED';
export const AUTOCOMPLETE_SUCCEEDED = 'AUTOCOMPLETE_SUCCEEDED';
export const AUTOCOMPLETE_CLEARED = 'AUTOCOMPLETE_CLEARED';
export const AUTOCOMPLETE_TERM_CHANGED = 'AUTOCOMPLETE_TERM_CHANGED';
export const ELIGIBILITY_CHANGED = 'ELIGIBILITY_CHANGED';
export const SEARCH_STARTED = 'SEARCH_STARTED';
export const SEARCH_FAILED = 'SEARCH_FAILED';
export const SEARCH_SUCCEEDED = 'SEARCH_SUCCEEDED';
export const FETCH_PROFILE_STARTED = 'FETCH_PROFILE_STARTED';
export const FETCH_PROFILE_FAILED = 'FETCH_PROFILE_FAILED';
export const FETCH_PROFILE_SUCCEEDED = 'FETCH_PROFILE_SUCCEEDED';
export const INSTITUTION_FILTER_CHANGED = 'INSTITUTION_FILTER_CHANGED';

export function showModal(modal) {
  return {
    type: DISPLAY_MODAL,
    modal
  };
}

export function hideModal() {
  return showModal(null);
}

export function setPageTitle(title) {
  return {
    type: SET_PAGE_TITLE,
    title
  };
}

export function enterPreviewMode(version) {
  return {
    type: ENTER_PREVIEW_MODE,
    version
  };
}

export function exitPreviewMode() {
  return {
    type: EXIT_PREVIEW_MODE
  };
}

function withPreview(dispatch, action) {
  const version = action.payload.meta.version;
  if (version.preview) {
    dispatch({
      type: ENTER_PREVIEW_MODE,
      version
    });
  }
  dispatch(action);
}

export function fetchConstants() {
  const previewVersion = ''; // TODO
  const url = `${api.url}/calculator_constants?preview=${previewVersion}`;

  return dispatch => {
    dispatch({ type: FETCH_CONSTANTS_STARTED });

    return fetch(url, api.settings)
      .then(res => res.json())
      .then(
        payload => dispatch({ type: FETCH_CONSTANTS_SUCCEEDED, payload }),
        err => dispatch({ type: FETCH_CONSTANTS_FAILED, err })
      );
  };
}

export function updateAutocompleteSearchTerm(searchTerm) {
  return {
    type: AUTOCOMPLETE_TERM_CHANGED,
    searchTerm,
  };
}

export function fetchAutocompleteSuggestions(text) {
  const previewVersion = '1'; // TODO
  const url = [
    `${api.url}/institutions/autocomplete?preview=${previewVersion}`,
    `term=${text}`
  ].join('&');

  return dispatch => {
    dispatch({ type: AUTOCOMPLETE_STARTED });

    return fetch(url, api.settings)
      .then(res => res.json())
      .then(
        payload => dispatch({ type: AUTOCOMPLETE_SUCCEEDED, payload }),
        err => dispatch({ type: AUTOCOMPLETE_FAILED, err })
      );
  };
}

export function clearAutocompleteSuggestions() {
  return { type: AUTOCOMPLETE_CLEARED };
}

export function eligibilityChange(e) {
  const field = e.target.name;
  const value = e.target.value;
  return {
    type: ELIGIBILITY_CHANGED,
    field,
    value
  };
}

export function institutionFilterChange(e) {
  const field = e.target.name;
  const value = e.target.value;
  return {
    type: INSTITUTION_FILTER_CHANGED,
    field,
    value
  };
}

export function institutionProgramFilterChange(e) {
  const field = e.target.name;
  const value = e.target.checked;
  return {
    type: INSTITUTION_FILTER_CHANGED,
    field,
    value
  };
}

export function fetchSearchResults(page = 1) {
  const url = `${api.url}/institutions/search?page=${page}&version=1`;

  return dispatch => {
    dispatch({ type: SEARCH_STARTED });

    return fetch(url, api.settings)
      .then(res => res.json())
      .then(
        payload => withPreview(dispatch, { type: SEARCH_SUCCEEDED, payload }),
        err => dispatch({ type: SEARCH_FAILED, err })
      );
  };
}

export function fetchProfile(facilityCode) {
  const url = `${api.url}/institutions/${facilityCode}?version=1`;

  return dispatch => {
    dispatch({ type: FETCH_PROFILE_STARTED });

    return fetch(url, api.settings)
      .then(res => res.json())
      .then(
        payload => withPreview(dispatch, { type: FETCH_PROFILE_SUCCEEDED, payload }),
        err => dispatch({ type: FETCH_PROFILE_FAILED, err })
      );
  };
}