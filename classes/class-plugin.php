<?php

namespace AUTHOR_NAMESPACE\PLUGIN_NAMESPACE;

class Plugin {

	private static $instance;

	public $name = '';
	public $prefix = '';
	public $version = '';
	public $file = '';

	/**
	 * Creates an instance if one isn't already available,
	 * then return the current instance.
	 *
	 * @param  string $file The file from which the class is being instantiated.
	 * @param  string $prefix The plugin prefix.
	 *
	 * @return object       The class instance.
	 */
	public static function get_instance( $file, $prefix ) {

		if ( ! isset( self::$instance ) && ! ( self::$instance instanceof Plugin ) ) {

			self::$instance = new Plugin;

			if ( get_option( PLUGIN_PREFIX_get_instance()->option_key ) ) {
				$data = get_option( PLUGIN_PREFIX_get_instance()->option_key );
			} elseif ( function_exists( 'get_plugin_data' ) ) {
				$data = get_plugin_data( $file );
			} else {
				require_once ABSPATH . 'wp-admin/includes/plugin.php';
				$data = get_plugin_data( $file );
			}

			self::$instance->name    = $data['Name'];
			self::$instance->version = $data['Version'];
			self::$instance->prefix  = $prefix;
			self::$instance->file    = $file;
		}

		return self::$instance;
	}
}
