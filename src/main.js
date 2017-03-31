(function($, window, document) {
	// "use strict";
	$(function() {
		var InfiniteScrollContainer = function(container, options) {
			this.options = Object.assign({
				paginationAttr: 'data-pagination',
				paginationNextAttr: 'data-pagination-next',
				loadMoreBtnAttr: 'data-load-more',
				itemClassAttr: 'data-item-class',
				defaults: {
					item_class: '.box-item',
					loading_text: 'Loading...',
					all_loaded_text: 'All loaded'
				}
			}, typeof options == 'object' ? options : {});
			this.container 					= container;
			this.button 					= $(this.container.attr(this.options.loadMoreBtnAttr));
			this.paginationHolderSelector 	= this.container.attr(this.options.paginationAttr);
			this.paginationNextSelector 	= this.container.attr(this.options.paginationNextAttr);
			this.loadMoreBtnSelector 		= this.container.attr(this.options.loadMoreBtnAttr);
			this.itemClass 					= this.container.attr(this.options.itemClassAttr) != undefined ? this.container.attr(this.options.itemClassAttr) : this.options.defaults.item_class;
			this.init = function() {
				if (this.totalPages() < 2) {
					this.allLoaded();
					return;
				}
				this.validate();
				var th = this;
				this.button.attr('data-load-more-text', this.button.text());
				this.destroy();
				this.container.infinitescroll({
					navSelector: this.paginationHolderSelector,
					nextSelector: this.paginationNextSelector,
					itemSelector: this.itemClass,
					loading: { finishedMsg: 'No more pages to load.'},
					animate: false,
					errorCallback: function() { th.allLoaded() },
				},
				function(newElements) {
					th.button
					.text(th.button.attr('data-load-more-text'))
					.removeClass('loading');
					if (th.totalPages() == th.container.data('infinitescroll').options.state.currPage) {
					    th.allLoaded();
					}
				});
				this.button.on('click', function() { th.onButtonClick() });
				$(window).unbind('.infscr');
			}
			this.destroy = function () {
				if (this.container.data('infinitescroll')) {
					this.container.infinitescroll('destroy');
					this.container.data('infinitescroll', undefined);
				}
			}
			this.allLoaded = function () {
				this.button
				.text(this.button.attr('data-all-loaded') ? this.button.attr('data-all-loaded') : this.options.defaults.all_loaded_text)
				.addClass('all-loaded')
				.removeAttr('id');
				this.destroy();
			}
			this.onButtonClick = function() {
				if (! this.button.hasClass('all-loaded')) {
					var loadingText = this.button.attr('data-loading') ? this.button.attr('data-loading') : this.options.defaults.loading_text;
					this.button.addClass('loading').text(loadingText);
					this.container.infinitescroll('retrieve');
				}
			}
			this.validate = function () {
				if ($(this.paginationHolderSelector).length == 0) {
					throw new Error("The pagination doesn't exist.");
				}
				if ($(this.paginationNextSelector).length == 0) {
					throw new Error("The pagination next link doesn't exist.");
				}
				if (this.button.length == 0) {
					throw new Error("The load more button doesn't exist.");
				}
			}
			this.totalPages = function () {
				return this.button.attr('data-totalPages');
			}
			this.init();
		}
		
		$.fn.initInfScroll = function(opts) {
			new InfiniteScrollContainer(this, opts);
		}

		if ($('.inf-scroll').length > 0) {
			$('.inf-scroll').initInfScroll();
		}
	});
}(window.jQuery, window, document));
