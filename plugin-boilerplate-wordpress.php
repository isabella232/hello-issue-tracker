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

require_once 'includes/class-plugin.php';
PLUGIN_NAMESPACE\Plugin::initialize( __FILE__ );

require_once 'includes/class-assets.php';
add_action( 'wp_enqueue_scripts', [ 'PLUGIN_NAMESPACE\Assets', 'add_assets' ] );
add_action( 'admin_enqueue_scripts', [ 'PLUGIN_NAMESPACE\Assets', 'add_admin_assets' ] );
