function navigate() { }
function resetAccount() { }
function resetCreate() { }
function resetFeed() { }

function setNavigate(func) { navigate = func }
function setResetAccount(func) { resetAccount = func }
function setResetCreate(func) { resetCreate = func }
function setResetFeed(func) { resetFeed = func }

export default {
	navigate: navigate,
	resetAccount: resetAccount,
	resetCreate: resetCreate,
	resetFeed: resetFeed,
	setNavigate: setNavigate,
	setResetAccount: setResetAccount,
	setResetCreate: setResetCreate,
	setResetFeed: setResetFeed,
};