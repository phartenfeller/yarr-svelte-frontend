import { writable } from 'svelte/store';

export const activeFeed = writable('');
export const activeItem = writable(null);
