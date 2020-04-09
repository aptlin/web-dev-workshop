import * as localforage from 'localforage';
import { MoodieStorageObject } from '../../types/storage';
import * as Sentry from '@sentry/browser';

export class MoodieLocalStorage {
  static async create(key: string, object: MoodieStorageObject) {
    try {
      await localforage.setItem(key, object);
    } catch (err) {
      Sentry.captureException(err);
      console.log(err);
    }
  }

  static async read(key: string): Promise<MoodieStorageObject> {
    try {
      const value = await localforage.getItem<MoodieStorageObject>(key);
      return value;
    } catch (err) {
      Sentry.captureException(err);
      console.log(err);
    }
    return {};
  }

  static async update(key: string, patch: Partial<MoodieStorageObject>) {
    try {
      const object = (await this.read(key)) || {};
      await localforage.setItem(key, { ...object, ...patch });
    } catch (err) {
      Sentry.captureException(err);
      console.log(err);
    }
  }

  static async delete(key: string) {
    try {
      await localforage.removeItem(key);
    } catch (err) {
      Sentry.captureException(err);
      console.log(err);
    }
  }

  static async clear() {
    try {
      await localforage.clear();
    } catch (err) {
      Sentry.captureException(err);
      console.log(err);
    }
  }
}
