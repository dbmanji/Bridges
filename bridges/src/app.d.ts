// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
// Don't remove the above gang, we may need it for documentation when confused...
import type PocketBase from 'pocketbase';

declare global {
	namespace App {
		interface Locals {
			pb: PocketBase;
			user: import('pocketbase').RecordModel | null;
		}
		
		interface PageData {
			user?: import('pocketbase').RecordModel | null;
		}
	}
}
export {};
