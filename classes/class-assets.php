<?php

namespace AUTHOR_NAMESPACE\PLUGIN_NAMESPACE;

class Assets {

	public function add_assets() {

		$script_version = PLUGIN_PREFIX_get_instance()->version;
		$plugin_prefix  = PLUGIN_PREFIX_get_instance()->prefix;

		$min     = ! is_user_logged_in();
		$dir_uri = plugin_dir_url( PLUGIN_PREFIX_get_instance()->file );

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

	public function add_admin_assets() {

		$script_version = PLUGIN_PREFIX_get_instance()->version;
		$plugin_prefix  = PLUGIN_PREFIX_get_instance()->prefix;

		$min     = ! is_user_logged_in();
		$dir_uri = plugin_dir_url( PLUGIN_PREFIX_get_instance()->file );

		wp_enqueue_style( "{$plugin_prefix}-admin-style", $dir_uri . 'assets/styles/admin' . ( $min ? '.min' : '' ) . '.css', [], $script_version );
		wp_enqueue_script( "{$plugin_prefix}-admin-script", $dir_uri . 'assets/scripts/admin' . ( $min ? '.min' : '' ) . '.js', [ 'jquery' ], $script_version, true );

		/**
		 * Admin JS Vars
		 */
		$defaults = [
			'AjaxURL'   => admin_url( 'admin-ajax.php' ),
			'homeurl'   => get_home_url(),
			'pluginurl' => $dir_uri,
		];

		$vars       = json_encode( apply_filters( "{$plugin_prefix}_admin_js_vars", $defaults ) );
		$vars_prefx = str_replace( '-', '', ucwords( $plugin_prefix, '-' ) );
		wp_add_inline_script( "{$plugin_prefix}-admin-script", "var {$vars_prefx}Vars = {$vars};", 'before' );
	}
}
