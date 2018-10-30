<?php
/*
Plugin Name: PLUGIN_NAME
Plugin URI: PLUGIN_URI
Description: PLUGIN_DESCRIPTION
Author: PLUGIN_AUTHOR (AUTHOR_EMAIL)
Version: 0.0.1
Author URI: AUTHOR_URI
Text Domain: TEXT_DOMAIN
Domain Path: /languages
 */

defined( 'ABSPATH' ) or die();

add_action( 'init', function () {
	load_plugin_textdomain( 'TEXT_DOMAIN', false, basename( dirname( __FILE__ ) ) . '/languages' );
} );

require_once 'classes/class-plugin.php';
function PLUGIN_PREFIX_get_instance() {
	return AUTHOR_NAMESPACE\PLUGIN_NAMESPACE\Plugin::get_instance( __FILE__, 'PLUGIN_PREFIX' );
}

PLUGIN_PREFIX_get_instance();

require_once 'classes/class-assets.php';
add_action( 'wp_enqueue_scripts', [ 'SayHello\KaddzUMC\Assets', 'add_assets' ] );
add_action( 'admin_enqueue_scripts', [ 'SayHello\KaddzUMC\Assets', 'add_admin_assets' ] );

