<?php

namespace SayHello\IssueTracker;

class SettingsPage
{

	public $settings_page = '';

	public function run()
	{
		add_action('helloissuetracker_settings', [$this, 'settings']);
		add_filter('helloissuetracker_sanitize', [$this, 'fetchRepoSettings']);

		add_filter(helloissuetracker()->prefix . '_admin_js_config', [$this, 'addReposToConfig']);
		add_filter(helloissuetracker()->prefix . '_admin_js_strings', [$this, 'addTranslations']);
	}

	public function settings()
	{
		$section = '';
		$error   = get_option(helloissuetracker()->prefix . '-repo-error');
		if (is_wp_error($error)) {
			$section = "<div class='hit-notice hit-notice--error'><p>{$error->get_error_message()}</p></div>";
		}
		$section = helloissuetracker()->settings->addSection($this->getSettingsPage(), 'hello-issue-tracker-section', __('Settings', 'hello-issue-tracker'), $section);
		helloissuetracker()->settings->addInput($section, 'repo-url', __('Repository URL', 'hello-issue-tracker'));
		helloissuetracker()->settings->addInput($section, 'private-token', __('Gitlab Private Token', 'hello-issue-tracker'));
	}

	public function fetchRepoSettings($data)
	{
		$data['repo-url'] = wp_http_validate_url($data['repo-url']);
		$repoUrl          = $data['repo-url'];
		$repoUrlParts     = parse_url($repoUrl);
		$repoBaseUrl      = trailingslashit("{$repoUrlParts['scheme']}://{$repoUrlParts['host']}");
		$repoPath         = untrailingslashit(substr($repoUrlParts['path'], 1));
		$token            = $data['private-token'];

		$apiBase  = "{$repoBaseUrl}api/v4/";
		$response = wp_remote_get($apiBase . 'projects/' . urlencode($repoPath) . "/?private_token={$token}");
		if (is_wp_error($response) || 200 != $response['response']['code']) {
			update_option(helloissuetracker()->prefix . '-repo-error', new \WP_Error('hit-repo-error', __('Repository could not be verified', 'hello-issue-tracker')));

			return $data;
		}

		$body   = wp_remote_retrieve_body($response);
		$values = json_decode($body, true);
		if ( ! $values || ! is_array($values) || ! array_key_exists('id', $values)) {
			update_option(helloissuetracker()->prefix . '-repo-error', new \WP_Error('hit-repo-error', __('Repository could not be verified', 'hello-issue-tracker')));

			return $data;
		}

		update_option(helloissuetracker()->prefix . '-repo-error', false);
		update_option(helloissuetracker()->prefix . '-repo-api-base', $apiBase);
		update_option(helloissuetracker()->prefix . '-repo-id', $values['id']);

		return $data;
	}

	public function addReposToConfig($vars)
	{
		$vars['gitlab'] = [
			'repoUrl'      => helloissuetracker()->settings->get('repo-url'),
			'privateToken' => helloissuetracker()->settings->get('private-token'),
			'repoId'       => intval(get_option(helloissuetracker()->prefix . '-repo-id')),
			'apiBase'      => get_option(helloissuetracker()->prefix . '-repo-api-base'),
		];

		$vars['labelPrefix'] = apply_filters('hit_label_prefix', 'wp_');
		$vars['user']        = wp_get_current_user()->user_email;
		$vars['dateFormat']  = __('MMMM Do YYYY, h:mm a', 'hello-issue-tracker');

		return $vars;
	}

	public function addTranslations($strings)
	{
		$strings = array_merge($strings, [
			'repo-url-not-set' => __('Repository could not be verified', 'hello-issue-tracker'),
			'state'            => __('Status', 'hello-issue-tracker'),
			'create-issue'     => __('Create Issue', 'hello-issue-tracker'),
			'edit-issue'       => __('Edit Issue', 'hello-issue-tracker'),
			'close-issue'      => __('Close Issue', 'hello-issue-tracker'),
			'id'               => __('ID', 'hello-issue-tracker'),
			'title'            => __('Title', 'hello-issue-tracker'),
			'type'             => __('Type', 'hello-issue-tracker'),
			'priority'         => __('Priority', 'hello-issue-tracker'),
			'author'           => __('Author', 'hello-issue-tracker'),
			'add-new-comment'  => __('Add new comment', 'hello-issue-tracker'),
			'add-comment'      => __('Add new comment', 'hello-issue-tracker'),
		]);

		return $strings;
	}

	/**
	 * Helpers
	 */

	private function getSettingsPage()
	{
		if ($this->settings_page) {
			return $this->settings_page;
		}
		$this->settings_page = helloissuetracker()->settings->addPage(helloissuetracker()->prefix . '-settings', __('Einstellungen', 'hello-issue-tracker'));

		return $this->settings_page;

	}
}
