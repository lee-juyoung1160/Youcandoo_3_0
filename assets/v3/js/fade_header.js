
	let lastScrollTop = 0;

	document.getElementById('btnBack')?.addEventListener('click', webviewClose);
	window.addEventListener('scroll', toggleFixedHeader);

	function toggleFixedHeader()
	{
		const scrollTop = window.pageYOffset;

		(scrollTop < 1 || scrollTop > lastScrollTop) ? removeClassFixed() : addClassFixed();

		lastScrollTop = scrollTop;
	}

	function addClassFixed()
	{
		document.querySelector('header.fade').classList.add('fixed');
	}

	function removeClassFixed()
	{
		document.querySelector('header.fade').classList.remove('fixed');
	}

