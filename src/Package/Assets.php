<?php

namespace SayHello\IssueTracker;

class Assets
{

	public function run()
	{
		add_action('admin_enqueue_scripts', [$this, 'addAdminAssets']);
		add_filter(helloissuetracker()->prefix . '_admin_js_strings', [$this, 'strings']);
	}

	public function addAdminAssets()
	{

		$scriptVersion = helloissuetracker()->version;
		$pluginPrefix  = helloissuetracker()->prefix;

		$min    = ! is_user_logged_in();
		$dirUri = plugin_dir_url(helloissuetracker()->file);

		wp_enqueue_style($pluginPrefix . '-admin-style', $dirUri . 'assets/styles/admin' . ($min ? '.min' : '') . '.css', [], $scriptVersion);
		wp_enqueue_script('React', $dirUri . 'assets/scripts/react.production.min.js', [], '16.10.2', true);
		wp_enqueue_script('ReactDOM', $dirUri . 'assets/scripts/react-dom.production.min.js', [], '16.10.2', true);
		wp_enqueue_script($pluginPrefix . '-admin-script', $dirUri . 'assets/scripts/admin' . ($min ? '.min' : '') . '.js', ['jquery', 'vueJS'], $scriptVersion, true);

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
	}

	public function strings($strings)
	{
		return $strings;
	}
}
