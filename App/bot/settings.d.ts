enum SettingName {
	Reports = 'reports',
	Logging = 'logging',
	Unbans = 'unbans',
}

interface StoredChannel {
	name: string;
	channelId: string;
	webhookToken: string;
	webhookId: string;
}
