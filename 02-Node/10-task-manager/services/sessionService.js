const uuid = require('uuid/v1');

var allSessions = {}

function createNew(){
	const newSessionId = uuid();
	allSessions[newSessionId] = {};
	return newSessionId;
}

function getSession(sessionId){
	if (allSessions.hasOwnProperty(sessionId))
		return allSessions[sessionId];
	return null;
}

function removeSession(sessionId){
	delete allSessions[sessionId];
}

module.exports = { createNew, getSession, removeSession };