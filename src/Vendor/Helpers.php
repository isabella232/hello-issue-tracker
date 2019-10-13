<?php

namespace SayHello\IssueTracker;

class Helpers
{
	private static $activeNotifications = [];

	public static function getRestJson($url)
	{
		$request = wp_remote_get($url);
		if (is_wp_error($request)) {
			return false;
		}

		return json_decode(wp_remote_retrieve_body($request), true);
	}

	public static function checkForFunction($func, $notification = true)
	{
		if ( ! function_exists($func)) {
			$message = 'The function <code>' . $func . '()</code> is not available. Some Parts of <b>' . helloissuetracker()->name . '</b> won\'t work as expected.';
			if ($notification) {
				self::showAdminNotification($message);
			}

			return false;
		}

		return true;
	}

	public static function showAdminNotification($message, $type = 'error')
	{
		$key = md5("{$type}: {$message}");
		if ( ! in_array($key, self::$activeNotifications)) {
			add_action('admin_notices', function () use ($message, $type) {
				$class = "notice notice-{$type}";
				printf('<div class="%1$s"><p>%2$s</p></div>', $class, $message);
			});
			self::$activeNotifications[] = $key;
		}
	}
}
