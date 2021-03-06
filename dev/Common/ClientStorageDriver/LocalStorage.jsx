
import {window, JSON} from 'common';
import {isUnd} from 'Common/Utils';
import {CLIENT_SIDE_STORAGE_INDEX_NAME} from 'Common/Consts';

class LocalStorageDriver
{
	/**
	 * @param {string} key
	 * @param {*} data
	 * @returns {boolean}
	 */
	set(key, data) {

		let
			result = false,
			storageResult = null;

		try
		{
			const storageValue = window.localStorage[CLIENT_SIDE_STORAGE_INDEX_NAME] || null;
			storageResult = null === storageValue ? null : JSON.parse(storageValue);
		}
		catch (e) {/* eslint-disable-line no-empty */}

		(storageResult || (storageResult = {}))[key] = data;

		try
		{
			window.localStorage[CLIENT_SIDE_STORAGE_INDEX_NAME] = JSON.stringify(storageResult);
			result = true;
		}
		catch (e) {/* eslint-disable-line no-empty */}

		return result;
	}

	/**
	 * @param {string} key
	 * @returns {*}
	 */
	get(key) {

		let result = null;

		try
		{
			const
				storageValue = window.localStorage[CLIENT_SIDE_STORAGE_INDEX_NAME] || null,
				storageResult = null === storageValue ? null : JSON.parse(storageValue);

			result = (storageResult && !isUnd(storageResult[key])) ? storageResult[key] : null;
		}
		catch (e) {/* eslint-disable-line no-empty */}

		return result;
	}

	/**
	 * @returns {boolean}
	 */
	static supported() {
		return !!window.localStorage;
	}
}

export {LocalStorageDriver, LocalStorageDriver as default};
