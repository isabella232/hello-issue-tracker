<?php

namespace HelloIssueTracker;

class MenuPage {

	public static function title() {
		return __( 'Issue Tracker', 'hit' );
	}

	public static function add_menu_item() {
		add_menu_page( self::title(), self::title(), 'manage_options', Plugin::prefix() . '-admin-page.php', [ 'HelloIssueTracker\MenuPage', 'add_page' ], 'dashicons-tickets-alt', 2 );
	}

	public static function add_page() {
		?>
		<div class="wrap <?php echo Plugin::prefix(); ?>">
			<h1><?php echo self::title(); ?></h1>
			<?php
			self::template_issues();
			self::template_credentials();
			?>
		</div>
		<?php
	}

	public static function template_issues() {
		if ( ! Plugin::options() ) {
			return;
		}

		?>
		<div class="hit-issues">
			<form class="hit-issues__options">
				<?php
				$options = [
					'state' => [
						'title'   => __( 'Status', 'hit' ),
						'choices' => [
							'opened' => __( 'Open', 'hit' ),
							'closed' => __( 'Closed', 'hit' ),
						]
					],
				];

				foreach ( $options as $option_key => $option ) {
					echo "<div class='hit-issues__option'>";
					echo "<label for='hit-issues-option-{$option_key}'>{$option['title']}</label>";
					echo "<select name='{$option_key}' id='hit-issues-option-{$option_key}'>";
					foreach ( $option['choices'] as $choice_key => $label ) {
						echo "<option value='{$choice_key}'>{$label}</option>";
					}
					echo '</select>';
					echo '</div>';
				}
				?>
			</form>
			<ul class="hit-issues__list"></ul>
			<div class="hit-issues__loader"></div>
		</div>
		<?php
	}

	public static function template_credentials() {

		$fields = [
			'repo' => __( 'Gitlab Repository URL', 'hit' ),
			'key'  => __( 'Private Key', 'hit' ),
		];

		$disabled = '';
		$datas    = [];
		if ( Plugin::options() ) {
			$disabled = 'disabled="disabled"';
			$datas    = Plugin::options();
		}

		?>
		<div class="hit-options" data-hidden="<?php echo( Plugin::options() ? 'true' : 'false' ); ?>">
			<h2 class="hit-options__title"><?php _e( 'Credentials', 'sht' ); ?></h2>
			<form class="hit-options__content" id="hit-credentials-form">
				<div class="hit-options__response" style="display: none;"></div>
				<?php
				foreach ( $fields as $key => $label ) {
					$value = '';
					if ( array_key_exists( $key, $datas ) ) {
						$value = $datas[ $key ];
					}
					echo '<div class="hit-input">';
					echo "<label class='hit-input__label' for='hit-gitlab-{$key}'>{$label}</label>";
					echo "<input class='hit-input__input' id='hit-gitlab-{$key}' name='hit-gitlab-{$key}' type='text' value='{$value}' {$disabled}/>";
					echo '</div>';
				}

				wp_nonce_field( 'hit-save-settings' );
				?>
				<input type="hidden" name="action" value="hit_save_settings"/>
				<div class="hit-input hit-input--align-right">
					<?php
					if ( Plugin::options() ) {
						echo '<a class="hit-input__reset" href="admin.php?action=hit_remove_settings&site=' . get_current_blog_id() . '">' . __( 'Reset credentials', 'hit' ) . '</a>';
					} else {
						echo '<button class="hit-input__button button button-primary" type="submit">' . __( 'Save credentials', 'hit' ) . '</button>';
					}
					?>
				</div>
			</form>
		</div>
		<?php
	}

	public static function save_settings() {
		if ( ! wp_verify_nonce( $_POST['_wpnonce'], 'hit-save-settings' ) ) {
			hit_exit_ajax( 'error' );
		}

		if ( ! array_key_exists( 'hit-gitlab-repo', $_POST ) || '' == $_POST['hit-gitlab-repo'] || ! wp_http_validate_url( $_POST['hit-gitlab-repo'] ) ) {
			hit_exit_ajax( 'error', __( 'Please enter a valid repository URL' ) );
		}
		$repo_url       = wp_http_validate_url( $_POST['hit-gitlab-repo'] );
		$repo_url_parts = parse_url( $repo_url );
		$repo_base_url  = trailingslashit( "{$repo_url_parts['scheme']}://{$repo_url_parts['host']}" );
		$repo_path      = untrailingslashit( substr( $repo_url_parts['path'], 1 ) );

		if ( ! array_key_exists( 'hit-gitlab-key', $_POST ) || '' == $_POST['hit-gitlab-key'] ) {
			hit_exit_ajax( 'error', __( 'Please enter a valid private Key' ) );
		}
		$private_key = sanitize_text_field( $_POST['hit-gitlab-key'] );

		$api_base = "{$repo_base_url}api/v4/projects/";
		$response = wp_remote_get( $api_base . urlencode( $repo_path ) . "/?private_token={$private_key}" );
		if ( is_wp_error( $response ) ) {
			hit_exit_ajax( 'error', sprintf( __( 'Could not connect to %s', 'hit' ), $api_base ) );
		}

		if ( 401 == $response['response']['code'] ) {
			hit_exit_ajax( 'error', __( 'Invalid Private Key', 'hit' ) );
		}

		if ( 404 == $response['response']['code'] ) {
			hit_exit_ajax( 'error', sprintf( __( 'The repository "%1s" could not be found or you don\'t have acess to it.', 'hit' ), $repo_path, $repo_base_url ) );
		}

		if ( 200 != $response['response']['code'] ) {
			hit_exit_ajax( 'error' );
		}

		$body   = wp_remote_retrieve_body( $response );
		$values = json_decode( $body, true );
		if ( ! $values || ! is_array( $values ) || ! array_key_exists( 'id', $values ) ) {
			hit_exit_ajax( 'error', __( 'Response could not be processed.', 'hit' ) );
		}

		$data = [
			'baseurl' => $repo_base_url,
			'repo'    => $repo_url,
			'repo_id' => $values['id'],
			'key'     => $private_key,
		];

		$set = Plugin::options( 'set', $data );
		hit_exit_ajax( 'success', $set );
	}

	public static function remove_settings() {
		if ( false === current_user_can( pwp_settings()->capability ) ) {
			wp_die( esc_html__( 'Access denied.', 'pwp' ) );
		}

		Plugin::options( 'delete' );
		$sendback = wp_get_referer();
		wp_redirect( esc_url_raw( $sendback ) );
		exit;
	}
}