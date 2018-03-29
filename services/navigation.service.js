class NavigationService {
	constructor() {
		this.tab = 'Feed';
	}

	navigate = (tab, params) => {
		this.tab = tab;
		this._navigate(tab, params);
	}

	login = () => { }
	logout = () => { }
	_navigate = () => { }
	resetAccount = () => { }
	resetCreate = () => { }
	resetFeed = () => { }
}

export default new NavigationService();
