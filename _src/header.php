<?php
\Bitrix\Main\UI\Extension::load("ui.vue3");
?>
<?
/**
 * @global $APPLICATION;
 * @var $arTemplateParams - included from .settings.php
 */

if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
use Bitrix\Main\Localization\Loc as Loc;
use \Bitrix\Main\Page\Asset as Asset;
include $_SERVER["DOCUMENT_ROOT"] . SITE_TEMPLATE_PATH . "/.settings.php";
?>
<!DOCTYPE html>

<html lang="<?=$arTemplateParams["HTML_LANG"];?>">
	<head>
	
		<?Asset::getInstance()->addJs( SITE_TEMPLATE_PATH . '/js/init.js');?>

		<?Asset::getInstance()->addCss( SITE_TEMPLATE_PATH . '/css/main.css' );?>
		<link href="<?= SITE_TEMPLATE_PATH?>/css/style.css" type="text/css" rel="stylesheet" />
		<?$APPLICATION->ShowHead();?>

		<title><?$APPLICATION->ShowTitle()?></title>
	</head>
	<body>
		<div id="panel"><?$APPLICATION->ShowPanel();?></div>
		<section class="head">
			<div class="cont">
				<div class="shapka">
					<div class="logo"><a href="/"><img data-src="" src="<?= SITE_TEMPLATE_PATH?>/img/logo.svg" alt=""></a></div>
					<div class="social"></div>
					<div class="geo"></div>
					<div class="phone"></div>
					<div class="zak_zvon"></div>
					<div class="menu">
						@@include('components/menu/view.html')ввв
					</div>
				</div>
			</div>
		</section>
