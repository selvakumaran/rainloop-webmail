
import {isUnd} from 'Common/Utils';
import {componentExportHelper} from 'Component/Abstract';
import {AbstractInput} from 'Component/AbstractInput';

class TextAreaComponent extends AbstractInput
{
	/**
	 * @constructor
	 * @param {Object} params
	 */
	constructor(params) {

		super(params);

		this.rows = params.rows || 5;
		this.spellcheck = isUnd(params.spellcheck) ? false : !!params.spellcheck;
	}
}

module.exports = componentExportHelper(TextAreaComponent, 'TextAreaComponent');
