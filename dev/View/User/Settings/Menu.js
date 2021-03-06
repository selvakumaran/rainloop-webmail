
var
	_ = require('_'),
	key = require('key'),

	Enums = require('Common/Enums'),
	Globals = require('Common/Globals'),
	Links = require('Common/Links'),

	Cache = require('Common/Cache'),
	Settings = require('Storage/Settings'),

	kn = require('Knoin/Knoin'),
	AbstractView = require('Knoin/AbstractView');

/**
 * @constructor
 * @param {Object} oScreen
 */
function MenuSettingsUserView(oScreen)
{
	AbstractView.call(this, 'Left', 'SettingsMenu');

	this.leftPanelDisabled = Globals.leftPanelDisabled;

	this.mobile = Settings.appSettingsGet('mobile');

	this.menu = oScreen.menu;

	kn.constructorEnd(this);
}

kn.extendAsViewModel(['View/User/Settings/Menu', 'View/App/Settings/Menu', 'SettingsMenuViewModel'], MenuSettingsUserView);
_.extend(MenuSettingsUserView.prototype, AbstractView.prototype);

MenuSettingsUserView.prototype.onBuild = function(oDom)
{
//		var self = this;
//		key('esc', Enums.KeyState.Settings, function() {
//			self.backToMailBoxClick();
//		});

	if (this.mobile)
	{
		oDom
			.on('click', '.b-settings-menu .e-item.selectable', function() {
				Globals.leftPanelDisabled(true);
			});
	}

	key('up, down', Enums.KeyState.Settings, _.throttle(function(event, handler) {

		var
			sH = '',
			iIndex = -1,
			bUp = handler && 'up' === handler.shortcut,
			$items = $('.b-settings-menu .e-item', oDom);

		if (event && $items.length)
		{
			iIndex = $items.index($items.filter('.selected'));
			if (bUp && 0 < iIndex)
			{
				iIndex -= 1;
			}
			else if (!bUp && iIndex < $items.length - 1)
			{
				iIndex += 1;
			}

			sH = $items.eq(iIndex).attr('href');
			if (sH)
			{
				kn.setHash(sH, false, true);
			}
		}

	}, 200));
};

MenuSettingsUserView.prototype.link = function(sRoute)
{
	return Links.settings(sRoute);
};

MenuSettingsUserView.prototype.backToMailBoxClick = function()
{
	kn.setHash(Links.inbox(Cache.getFolderInboxName()));
};

module.exports = MenuSettingsUserView;
