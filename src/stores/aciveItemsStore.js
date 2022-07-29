import { writable } from 'svelte/store';

export const activeFeed = writable({ folder: false, id: null });
export const activeItem = writable(null);
