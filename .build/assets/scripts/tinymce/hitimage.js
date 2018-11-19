(function ($) {

	let frame;
	const vars = window.HelloIssueTrackerTinyMCEVars.hitimage;

	tinymce.create('tinymce.plugins.hitimage', {
		init: function (ed, url) {
			//spacer
			ed.addButton('hitimage', {
				title: vars.texts.title,
				image: vars.image,
				onclick: function () {
					frame = wp.media({
						title: vars.texts.selectOrUpload,
						button: {
							text: vars.texts.select
						},
						multiple: false,
					});

					frame.on('select', function () {
						const img = frame.state().get('selection').first().toJSON();
						let imgUrl = img.url;
						if ('large' in img.sizes) {
							console.log('large');
							imgUrl = img.sizes.large.url
						}
						ed.selection.setContent(`<img alt="${img.name}" src="${imgUrl}" />`);
					});

					frame.open();
				}
			});
		},
		createControl: function (n, cm) {
			return null;
		},
	});

	tinymce.PluginManager.add('hitimage', tinymce.plugins.hitimage);
})(jQuery);