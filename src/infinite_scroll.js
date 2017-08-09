(function($, window, document) {
	// "use strict";
	$(function() {
		var InfiniteScrollContainer = function(container, options) {
			this.options = Object.assign({
				paginationAttr: 'data-pagination',
				paginationNextAttr: 'data-pagination-next',
				loadMoreBtnAttr: 'data-load-more',
				itemClassAttr: 'data-item-class',
				itemsPerPageAttr: 'data-perPage',
				totalPagesAttr: 'data-totalPages',
				defaults: {
					item_class: '.box-item',
					loading_text: 'Loading...',
					all_loaded_text: 'All loaded'
				},
				events: {
					onInitialized: undefined,
					onDestroyed: undefined,
					onAllLoaded: undefined,
					onNewElements: undefined,
				}
			}, typeof options == 'object' ? options : {});
			
			this.container 					= container;
			this.button 					= $(this.container.attr(this.options.loadMoreBtnAttr));
			this.paginationHolderSelector 	= this.container.attr(this.options.paginationAttr);
			this.paginationNextSelector 	= this.container.attr(this.options.paginationNextAttr);
			this.loadMoreBtnSelector 		= this.container.attr(this.options.loadMoreBtnAttr);
			this.itemClass 					= this.container.attr(this.options.itemClassAttr) != undefined ? this.container.attr(this.options.itemClassAttr) : this.options.defaults.item_class;
			this.itemsPerPage				= this.container.attr(this.options.itemsPerPageAttr) != undefined ? Number(this.container.attr(this.options.itemsPerPageAttr)) : undefined;
			this.totalPages					= this.container.attr(this.options.totalPagesAttr) != undefined ? Number(this.container.attr(this.options.totalPagesAttr)) : undefined;

			this.init = function() {
				this.validate();

				if (this.totalPages < 2) {
					this.allLoaded();

					return;
				}

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
					th.doEvent('onNewElements', newElements)

					th.button.text(th.button.attr('data-load-more-text')).removeClass('loading');

					th.checkAllLoaded(newElements);
				});
				this.doEvent('onInitialized');

				this.button.on('click', function() { th.onButtonClick() });
				$(window).unbind('.infscr');
			}

			this.checkAllLoaded = function(newElements) {
				/**
				 * Check if the perPage attribute isset and the newElements are less than the perPage,
				 * or if the totalPages equals to the currentPage,
				 * and call the allLoaded method.
				 */
				if (
					(this.itemsPerPage && newElements.length < this.itemsPerPage) ||
					(this.totalPages == this.container.data('infinitescroll').options.state.currPage)
				) {
				    this.allLoaded();
				}
			}

			this.destroy = function () {
				if (this.container.data('infinitescroll')) {
					this.doEvent('onDestroyed');

					this.container.infinitescroll('destroy');
					this.container.data('infinitescroll', undefined);
				}
			}

			this.allLoaded = function () {
				this.doEvent('onAllLoaded');

				this.button
				.text(this.button.attr('data-all-loaded') ? this.button.attr('data-all-loaded') : this.options.defaults.all_loaded_text)
				.addClass('all-loaded')
				.removeAttr('id');
				this.destroy();
			}

			this.onButtonClick = function() {
				this.doEvent('onButtonClicked');

				if (! this.button.hasClass('all-loaded')) {
					this.button
					.addClass('loading')
					.text(this.button.attr('data-loading') ? this.button.attr('data-loading') : this.options.defaults.loading_text);
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

			this.doEvent = function(eventName) {
				if (typeof this.options.events[eventName] == 'function') {
					var args = Array.prototype.slice.call(arguments).splice(1);

					args.push(this);

					this.options.events[eventName].apply(this, args);
				}
			}

			this.init();

		}
		
		$.fn.initInfScroll = function(opts) {
			new InfiniteScrollContainer(this, opts);
		}

		if ($('.inf-scroll').length > 0) {
            $('.inf-scroll').each(function() {
                $(this).initInfScroll();
            });
        }
	});
}(window.jQuery, window, document));
