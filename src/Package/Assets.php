<?php

namespace SayHello\IssueTracker;

class Assets
{

	public function run()
	{
		add_action('admin_enqueue_scripts', [$this, 'addAdminAssets']);
		add_filter(helloissuetracker()->prefix . '_admin_js_strings', [$this, 'strings']);
		add_filter(helloissuetracker()->prefix . '_admin_js_config', [$this, 'addIssueAttributes']);
	}

	public function addAdminAssets()
	{
		wp_enqueue_media();

		$scriptVersion = helloissuetracker()->version;
		$pluginPrefix  = helloissuetracker()->prefix;

		$min    = ! is_user_logged_in();
		$dirUri = plugin_dir_url(helloissuetracker()->file);

		wp_enqueue_style('tinyMCE', includes_url() . 'css/editor.min.css', [], '4.9.8');
		wp_enqueue_style($pluginPrefix . '-admin-style', $dirUri . 'assets/styles/admin' . ($min ? '.min' : '') . '.css', [], $scriptVersion);

		$deps = ['jquery'];
		wp_enqueue_script('tinyMCE', includes_url() . 'js/tinymce/tinymce.min.js', $deps, '4.8.0', true);
		$deps[] = 'tinyMCE';
		wp_enqueue_script('tinyMCE-theme', includes_url() . 'js/tinymce/themes/modern/theme.min.js', $deps, '4.8.0', true);
		$deps[] = 'tinyMCE-theme';
		wp_enqueue_script('tinyMCE-plugin-autoresize', $dirUri . 'assets/scripts/tinymce/autoresize/plugin.min.js', $deps);
		$deps[] = 'tinyMCE-plugin-autoresize';
		wp_enqueue_script($pluginPrefix . '-tinymce', $dirUri . 'assets/scripts/tinymce' . ($min ? '.min' : '') . '.js', $deps);
		$deps[] = $pluginPrefix . '-tinymce';
		wp_enqueue_script('React', $dirUri . 'assets/scripts/react.production.min.js', [], '16.10.2', true);
		$deps[] = 'React';
		wp_enqueue_script('ReactDOM', $dirUri . 'assets/scripts/react-dom.production.min.js', [], '16.10.2', true);
		$deps[] = 'ReactDOM';
		wp_enqueue_script($pluginPrefix . '-admin-script', $dirUri . 'assets/scripts/admin' . ($min ? '.min' : '') . '.js', $deps, $scriptVersion, true);

		/**
		 * JS Vars
		 */
		$defaults = [
			'ajax-url'   => admin_url('admin-ajax.php'),
			'home-url'   => get_site_url(),
			'rest-base'  => get_rest_url(),
			'plugin-url' => $dirUri,
			'strings'    => apply_filters("{$pluginPrefix}_admin_js_strings", []),
			//'nonce'      => wp_create_nonce('wp_rest'),
		];

		$vars       = json_encode(apply_filters("{$pluginPrefix}_admin_js_config", $defaults));
		$varsPrefix = str_replace('-', '', ucwords($pluginPrefix, '-'));
		wp_add_inline_script("{$pluginPrefix}-admin-script", "var {$varsPrefix}Config = {$vars};", 'before');

		/**
		 * TinyMCE Vars
		 */
		$tinymceVars      = json_encode(apply_filters("{$pluginPrefix}_tinymce_vars", [
			'hitimage' => [
				'image' => $dirUri . 'assets/img/hitimage.png',
				'texts' => [
					'title'          => __('Add Image', 'hello-issue-tracker'),
					'selectOrUpload' => __('Select or upload an image', 'hello-issue-tracker'),
					'select'         => __('Select image', 'hello-issue-tracker'),
				],
			]
		]));
		$tinymceVarsPrefx = str_replace('-', '', ucwords($pluginPrefix . 'TinyMCE', '-'));
		wp_add_inline_script("{$pluginPrefix}-tinymce", "var {$tinymceVarsPrefx}Vars = {$tinymceVars};", 'before');
	}

	public function strings($strings)
	{
		return $strings;
	}

	public function addIssueAttributes($vars)
	{
		$vars['issue-attributes'] = self::issueAttributes();

		return $vars;
	}

	public static function issueAttributes()
	{
		return [
			'state'    => [
				'opened' => __('Open', 'hello-issue-tracker'),
				'closed' => __('Closed', 'hello-issue-tracker'),
			],
			'priority' => apply_filters('SayHello\IssueTracker\Priorities', [
				'low'    => __('Low', 'hello-issue-tracker'),
				'normal' => __('Normal', 'hello-issue-tracker'),
				'high'   => __('High', 'hello-issue-tracker'),
			]),
			'type'     => apply_filters('SayHello\IssueTracker\Types', [
				'bug'     => __('Bug', 'hello-issue-tracker'),
				'feature' => __('Feature', 'hello-issue-tracker'),
			]),
		];
	}
}
