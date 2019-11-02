<?php

namespace SayHello\IssueTracker;

class Plugin
{

	private static $instance;
	public $name = '';
	public $prefix = '';
	public $namespace = '';
	public $version = '';
	public $file = '';

	/**
	 * Creates an instance if one isn't already available,
	 * then return the current instance.
	 * @return object       The class instance.
	 */

	public static function getInstance($file)
	{
		if ( ! isset(self::$instance) && ! (self::$instance instanceof Plugin)) {
			self::$instance = new Plugin;

			if ( ! function_exists('get_plugin_data')) {
				require_once ABSPATH . 'wp-admin/includes/plugin.php';
			}
			$data = get_plugin_data($file);

			self::$instance->prefix    = basename($file, '.php');
			self::$instance->namespace = self::$instance->prefix . '/v1';
			self::$instance->name      = $data['Name'];
			self::$instance->version   = $data['Version'];
			self::$instance->file      = $file;
		}

		return self::$instance;
	}

	public function run()
	{
		add_action('admin_menu', [$this, 'menuPage']);
	}

	public function menuPage()
	{
		//$icon = trailingslashit(plugin_dir_url($this->file)) . 'assets/img/hello-menu-icon.png';
		$menu_name = str_replace('Hello ', '', $this->name);
		add_menu_page($this->name, $menu_name, 'administrator', $this->prefix, function () {
			echo '<div class="wrap">';
			echo '<h1>' . $this->name . '</h1>';
			echo '<div id="hello-issue-tracker"></div>';
			echo '<div id="hello-issue-tracker-shadowbox"></div>';
			echo '</div>';
		}, 'dashicons-tickets-alt', 2);
	}
}
