const {tinymce} = window;
const options = {
	toolbar: 'formatselect | bold italic link image | bullist numlist | hitimage',
	menubar: false,
	block_formats: 'Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;',
	plugins: 'lists autoresize link hitimage',
	autoresize_bottom_margin: 5,
	content_style: "body {margin-left: 0px; margin-right: 0px; font-size: 12px;} img {max-width: 99% !important;}",
	relative_urls: false,
	remove_script_host: false,
	convert_urls: true
};

export const init = (selector: string) => {
	tinymce.init(Object.assign({selector}, options));
};

export const remove = (id: string) => {
	tinymce.remove(id);
};
