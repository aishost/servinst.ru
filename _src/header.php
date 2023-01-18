<?php if(!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title><?php $APPLICATION->ShowTitle(); ?></title>
		<?php $APPLICATION->SetAdditionalCSS(SITE_TEMPLATE_PATH . '/css/style.css'); ?>
		<?php $APPLICATION->ShowHead(); ?>
		<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
			<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
			<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		<![endif]-->
        <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
        <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
      </head>
<body>
<div id="panel">
	<?php $APPLICATION->ShowPanel();?>
</div>
<div id="app">
<section class="slider">
			<div class="block1___nav">
				<div class="block1___nav__logo">
					<a href="" class="block1___nav__logo_a">
						<img  scr="/local/templates/main/img/logo.webp" alt="Сервис инструмент - Медицинское оборудование">
					</a>
				</div>
				<div class="block1___nav__time">
			привет
				</div>
				<div class="block1___nav__email"></div>
				<div class="block1___nav__phone"></div>
			</div>
</section>
</div>
