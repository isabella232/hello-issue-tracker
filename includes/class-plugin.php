<?php

namespace HelloIssueTracker;

class Plugin {

	private static $name = '';
	private static $prefix = '';
	private static $version = '';
	private static $file = '';
	private static $plugin_option = '';

	public static function initialize( $file ) {

		if ( ! function_exists( 'get_plugin_data' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}
		$data = get_plugin_data( $file );

		$prefix              = basename( $file, '.php' );
		self::$prefix        = $prefix;
		self::$name          = $data['Name'];
		self::$version       = $data['Version'];
		self::$file          = $file;
		self::$plugin_option = self::prefix() . '_plugin_data';

		add_action( 'admin_init', function () {
			if ( ! get_option( self::$plugin_option ) ) {
				self::update_plugin_data();
				do_action( self::prefix() . '_on_activate', self::version() );

				return;
			}
			$db_data = get_option( self::$plugin_option );
			if ( self::version() != $db_data['version'] ) {
				self::update_plugin_data();
				do_action( self::prefix() . '_on_update', $db_data['version'], self::version() );
			}
		} );

		register_deactivation_hook( self::file(), function () {
			delete_option( self::$plugin_option );
			do_action( self::prefix() . '_on_deactivate' );
		} );
	}

	private static function update_plugin_data() {
		update_option( self::$plugin_option, [
			'name'    => self::name(),
			'version' => self::version(),
			'prefix'  => self::prefix(),
			'file'    => self::file(),
		] );
	}

	public static function name() {
		return self::$name;
	}

	public static function prefix() {
		return self::$prefix;
	}

	public static function version() {
		return self::$version;
	}

	public static function file() {
		return self::$file;
	}

	public static function options( $task = 'get', $values = [] ) {
		$key = Plugin::prefix() . '-credentials';
		if ( 'set' == $task ) {
			return update_option( $key, $values );
		} elseif ( 'delete' == $task ) {
			return delete_option( $key );
		}

		return get_option( $key );
	}

	public static function get_option( $key ) {
		$options = self::options();
		if ( ! is_array( $options ) || ! array_key_exists( $key, $options ) ) {
			return false;
		}

		return $options[ $key ];
	}
}
