import { UIState } from './'

type UIActionType =
	| { type: '[UI] - Open Sidebar' }
	| { type: '[UI] - Close Sidebar' }
	| { type: '[UI] - Set is adding entry'; payload: boolean }
	| { type: '[UI] - Start entry dragging' }
	| { type: '[UI] - End entry dragging' }

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
	switch (action.type) {
		case '[UI] - Open Sidebar':
			return {
				...state,
				sidemenuOpen: true,
			}
		case '[UI] - Close Sidebar':
			return {
				...state,
				sidemenuOpen: false,
			}
		case '[UI] - Set is adding entry':
			return {
				...state,
				isAddingEntry: action.payload,
			}
		case '[UI] - Start entry dragging':
			return {
				...state,
				isEntryDragging: true,
			}
		case '[UI] - End entry dragging':
			return {
				...state,
				isEntryDragging: false,
			}
		default:
			return { ...state }
	}
}
