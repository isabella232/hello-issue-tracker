<?php
/*
Plugin Name: Hello Issue Tracker
Plugin URI: https://github.com/SayHelloGmbH/hello-issue-tracker
Description: A WordPress Plugin to create, edit and delete Gitlab Issues right from the WP-Admin
Author: Nico Martin / Say Hello GmbH (nico@sayhello.chL)
Version: 0.1.15
Author URI: https://sayhello.ch
Text Domain: hit
Domain Path: /languages
 */

defined( 'ABSPATH' ) or die();

add_action( 'init', function () {
	load_plugin_textdomain( 'hit', false, basename( dirname( __FILE__ ) ) . '/languages' );
} );

require_once 'includes/functions.php';
require_once 'includes/class-plugin.php';
HelloIssueTracker\Plugin::initialize( __FILE__ );

require_once 'includes/class-assets.php';
add_action( 'admin_enqueue_scripts', [ 'HelloIssueTracker\Assets', 'add_admin_assets' ] );
add_filter( HelloIssueTracker\Plugin::prefix() . '_admin_js_vars', [ 'HelloIssueTracker\Assets', 'add_vars' ] );
add_filter( HelloIssueTracker\Plugin::prefix() . '_tinymce_vars', [ 'HelloIssueTracker\Assets', 'add_tinymce_vars' ] );

require_once 'includes/class-menupage.php';
add_action( 'admin_menu', [ 'HelloIssueTracker\MenuPage', 'add_menu_item' ] );
add_action( 'wp_ajax_hit_save_settings', [ 'HelloIssueTracker\MenuPage', 'save_settings' ] );
add_action( 'admin_action_hit_remove_settings', [ 'HelloIssueTracker\MenuPage', 'remove_settings' ] );
add_action( 'admin_footer', [ 'HelloIssueTracker\MenuPage', 'edit_window' ], 500 );
