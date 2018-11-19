<?php

namespace HelloIssueTracker;

class Assets {

	public static function add_assets() {

		if ( ! isset( $_GET['page'] ) || Plugin::prefix() . '-admin-page.php' != $_GET['page'] ) {
			return;
		}

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

		wp_enqueue_media();

		$script_version = Plugin::version();
		$plugin_prefix  = Plugin::prefix();

		$min     = ! is_user_logged_in();
		$dir_uri = plugin_dir_url( Plugin::file() );

		/**
		 * CSS
		 */
		$deps = [];
		wp_enqueue_style( 'tinyMCE', includes_url() . 'css/editor.min.css', $deps, '4.9.8' );
		$deps[] = 'tinyMCE';
		wp_enqueue_style( "{$plugin_prefix}-admin-style", $dir_uri . 'assets/styles/admin' . ( $min ? '.min' : '' ) . '.css', $deps, $script_version );
		$deps[] = 'tinyMCE-lightgray';
		wp_enqueue_style( "{$plugin_prefix}-admin-style", $dir_uri . 'assets/styles/admin' . ( $min ? '.min' : '' ) . '.css', $deps, $script_version );

		/**
		 * JS
		 */
		$deps = [ 'jquery' ];
		wp_enqueue_script( 'tinyMCE', includes_url() . 'js/tinymce/tinymce.min.js', $deps, '4.8.0', true );
		$deps[] = 'tinyMCE';
		wp_enqueue_script( 'tinyMCE-theme', includes_url() . 'js/tinymce/themes/modern/theme.min.js', $deps, '4.8.0', true );
		$deps[] = 'tinyMCE-theme';

		foreach ( [ 'autoresize' ] as $plugin ) {
			wp_enqueue_script( "tinyMCE-plugin-{$plugin}", $dir_uri . "assets/scripts/tinymce/{$plugin}/plugin.min.js", $deps );
			$deps[] = "tinyMCE-plugin-{$plugin}";
		}

		wp_enqueue_script( "{$plugin_prefix}-tinymce", $dir_uri . "assets/scripts/tinymce.min.js", $deps );
		$deps[] = "{$plugin_prefix}-tinymce";

		wp_enqueue_script( "{$plugin_prefix}-admin-script", $dir_uri . 'assets/scripts/admin' . ( $min ? '.min' : '' ) . '.js', $deps, $script_version, true );

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

		/**
		 * TinyMCE Vars
		 */
		$tinymce_vars       = json_encode( apply_filters( "{$plugin_prefix}_tinymce_vars", [] ) );
		$tinymce_vars_prefx = str_replace( '-', '', ucwords( $plugin_prefix . 'TinyMCE', '-' ) );
		wp_add_inline_script( "{$plugin_prefix}-tinymce", "var {$tinymce_vars_prefx}Vars = {$tinymce_vars};", 'before' );
	}

	public static function add_vars( $vars ) {
		$vars['APIbase']     = Plugin::get_option( 'baseurl' );
		$vars['repo']        = Plugin::get_option( 'repo_id' );
		$vars['key']         = Plugin::get_option( 'key' );
		$vars['labelPrefix'] = apply_filters( 'hit_label_prefix', 'wp_' );
		$vars['user']        = wp_get_current_user()->user_email;
		$vars['issue']       = self::issue_vars();
		$vars['dateFormat']  = __( 'MMMM Do YYYY, h:mm a', 'hit' );

		return $vars;
	}

	public static function add_tinymce_vars( $vars ) {
		$vars['hitimage'] = [
			'image' => plugin_dir_url( Plugin::file() ) . 'assets/img/hitimage.png',
			'texts' => [
				'title'          => __( 'Add Image', 'hit' ),
				'selectOrUpload' => __( 'Select or upload an image', 'hit' ),
				'select'         => __( 'Select image', 'hit' ),
			],
		];

		return $vars;
	}

	public static function issue_vars() {
		return [
			'states'     => apply_filters( 'hit_status', [
				'opened' => __( 'Open', 'hit' ),
				'closed' => __( 'Closed', 'hit' ),
			] ),
			'priorities' => apply_filters( 'hit_priorities', [
				'low'    => __( 'Hat Zeit', 'hit' ),
				'normal' => __( 'Normal', 'hit' ),
				'high'   => __( 'Gestern!', 'hit' ),
			] ),
			'types'      => apply_filters( 'hit_types', [
				'bug'     => __( 'Bug', 'hit' ),
				'feature' => __( 'Feature', 'hit' ),
			] ),
		];
	}
}
