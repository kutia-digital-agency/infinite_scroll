<!DOCTYPE html>
<html>
<head>
	<title>Infinite scroll Examples</title>
</head>
<body>

<div 
	class="inf-scroll"
	data-load-more="#load_more"
	data-item-class=".item"
	data-pagination=".pagination"
	data-pagination-next=".pagination .next"
>
<?php $paged = isset($_GET['paged']) ? $_GET['paged'] : 1; ?>

<?php if ($paged < 3) { ?>
	<li class="item">test 1</li>
	<li class="item">test 2</li>
	<li class="item">test 3</li>
	<li class="item">test 4</li>
	<li class="item">test 5</li>
	<li class="item">test 6</li>
	<li class="item">test 7</li>
	<li class="item">test 8</li>
	<li class="item">test 9</li>
	<li class="item">test 10</li>
<?php } else if ($paged == 3) { ?>
	<li class="item">test 10</li>
	<li class="item">test 10</li>
<?php } ?>
</div>

<div class="pagination">
	<a href="<?php echo "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"; ?>?paged=<?php echo isset($_GET['paged']) ? $_GET['paged'] + 1 : 2 ?>" class="next">next</a>
</div>

<a href="javascript:void(0)" id="load_more">Load more</a>

<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
<script type="text/javascript" src="../src/infinite_scroll.min.js"></script>
<script type="text/javascript">
	$('.inf-scroll').initInfScroll();
</script>
</body>
</html>
