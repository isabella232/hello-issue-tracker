<?php
/*
Plugin Name: Hello Issue Tracker
Plugin URI: https://github.com/nico-martin/hello-issue-tracker
Description: A WordPress Plugin to create, edit and delete Gitlab Issues right from the WP-Admin
Author: Nico Martin / Say Hello GmbH (nico@sayhello.chL)
Version: 0.0.1
Author URI: https://sayhello.ch
Text Domain: hit
Domain Path: /languages
 */

defined( 'ABSPATH' ) or die();

add_action( 'init', function () {
	load_plugin_textdomain( 'hit', false, basename( dirname( __FILE__ ) ) . '/languages' );
} );

require_once 'includes/class-plugin.php';
HelloIssueTracker\Plugin::initialize( __FILE__ );

require_once 'includes/class-assets.php';
add_action( 'wp_enqueue_scripts', [ 'HelloIssueTracker\Assets', 'add_assets' ] );
add_action( 'admin_enqueue_scripts', [ 'HelloIssueTracker\Assets', 'add_admin_assets' ] );
