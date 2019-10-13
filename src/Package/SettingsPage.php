<?php

namespace SayHello\IssueTracker;

class SettingsPage
{

	public $settings_page = '';

	public function run()
	{
		add_action('shstaging_settings', [$this, 'settings']);
		add_filter(helloissuetracker()->prefix . '_admin_js_config', [$this, 'addReposToConfig']);
	}

	public function settings()
	{
		$section = helloissuetracker()->settings->addSection($this->getSettingsPage(), 'hello-issue-tracker-section', __('Einstellungen', 'hello-issue-tracker'));
		helloissuetracker()->settings->addInput($section, 'repo-url', __('Repository URL', 'hello-issue-tracker'));
		helloissuetracker()->settings->addInput($section, 'private-token', __('Gitlab Private Token', 'hello-issue-tracker'));
	}

	public function addReposToConfig($vars)
	{
		$vars[''] = [];

		return $vars;
	}

	private function getSettingsPage()
	{
		if ($this->settings_page) {
			return $this->settings_page;
		}
		$this->settings_page = helloissuetracker()->settings->addPage(helloissuetracker()->prefix . '-settings', __('Einstellungen', 'hello-issue-tracker'));

		return $this->settings_page;

	}
}
