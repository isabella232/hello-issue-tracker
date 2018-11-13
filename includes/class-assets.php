<?php

namespace HelloIssueTracker;

class Assets {

	public static function add_assets() {

		$script_version = Plugin::version();
		$plugin_prefix  = Plugin::prefix();

		$min     = ! is_user_logged_in();
		$dir_uri = plugin_dir_url( Plugin::file() );

		/**
		 * CSS
		 */
		$deps = [];
		wp_enqueue_style( "{$plugin_prefix}-style", $dir_uri . 'assets/styles/ui' . ( $min ? '.min' : '' ) . '.css', $deps, $script_version );

		/**
		 * JS
		 */
		$deps = [ 'jquery' ];
		wp_enqueue_script( "{$plugin_prefix}-script", $dir_uri . 'assets/scripts/ui' . ( $min ? '.min' : '' ) . '.js', $deps, $script_version, false );

		/**
		 * JS Vars
		 */
		$defaults = [
			'AjaxURL'   => admin_url( 'admin-ajax.php' ),
			'homeurl'   => get_home_url(),
			'pluginurl' => $dir_uri,
		];

		$vars       = json_encode( apply_filters( "{$plugin_prefix}_js_vars", $defaults ) );
		$vars_prefx = str_replace( '-', '', ucwords( $plugin_prefix, '-' ) );
		wp_add_inline_script( "{$plugin_prefix}-script", "var {$vars_prefx}Vars = {$vars};", 'before' );
	}

	public static function add_admin_assets() {

		$script_version = Plugin::version();
		$plugin_prefix  = Plugin::prefix();

		$min     = ! is_user_logged_in();
		$dir_uri = plugin_dir_url( Plugin::file() );

		wp_enqueue_style( "{$plugin_prefix}-admin-style", $dir_uri . 'assets/styles/admin' . ( $min ? '.min' : '' ) . '.css', [], $script_version );
		wp_enqueue_script( "{$plugin_prefix}-admin-script", $dir_uri . 'assets/scripts/admin' . ( $min ? '.min' : '' ) . '.js', [ 'jquery' ], $script_version, true );

		/**
		 * Admin JS Vars
		 */
		$defaults = [
			'AjaxURL'      => admin_url( 'admin-ajax.php' ),
			'homeurl'      => get_home_url(),
			'pluginurl'    => $dir_uri,
			'GeneralError' => __( 'An unexpected error occured.', 'hit' ),
		];

		$vars       = json_encode( apply_filters( "{$plugin_prefix}_admin_js_vars", $defaults ) );
		$vars_prefx = str_replace( '-', '', ucwords( $plugin_prefix, '-' ) );
		wp_add_inline_script( "{$plugin_prefix}-admin-script", "var {$vars_prefx}Vars = {$vars};", 'before' );
	}

	public static function add_vars( $vars ) {
		$vars['APIbase']      = Plugin::get_option( 'baseurl' );
		$vars['repo']         = Plugin::get_option( 'repo_id' );
		$vars['key']          = Plugin::get_option( 'key' );
		$vars['labelPrefix']  = apply_filters( 'hit_label_prefix', 'wp_' );
		$vars['translations'] = self::get_translations();

		return $vars;
	}

	public static function get_translations() {
		return [
			'opened' => __( 'Open', 'hit' ),
			'closed' => __( 'Closed', 'hit' ),
		];
	}
}
